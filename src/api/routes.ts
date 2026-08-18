// VeilDrop - API Routes

import { Hono } from 'hono';
import type { Env, Inbox, Message, CreateInboxResponse } from '../types';
import { sendViaSendPulse } from '../smtp';
import { generateMnemonic, inboxIdFromMnemonic, normalizeMnemonic } from '../crypto/mnemonic';
import { decryptMessageFields } from '../crypto/atrest';
import { createE2eeKeypair } from '../crypto/e2ee';
import { logSecurityEvent, sanitizeHeaderValue } from './security';

const app = new Hono<{ Bindings: Env }>();

// Minimal request telemetry: one counter per day (counters.req:YYYY-MM-DD).
// No per-request rows, no PII — just a daily total of API calls.
app.use('*', async (c, next) => {
  await next();
  if (c.req.path.startsWith('/api/')) {
    try {
      const day = new Date().toISOString().slice(0, 10);
      await c.env.DB.prepare(
        "INSERT INTO counters (key, val) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET val = val + 1"
      ).bind(`req:${day}`).run();
    } catch (e) { /* telemetry must never break requests */ }
  }
});

const SEND_DOMAINS = ['veildrop.fr'];
const SMTP_DAILY_LIMIT = 200;
const SITE_URL = 'https://veildrop.fr';
const REPORT_URL = 'https://report.veildrop.fr';

const RESERVED_ADDRESSES = [
  'contact', 'report', 'abuse', 'system', 'admin', 'support', 'help',
  'info', 'postmaster', 'hostmaster', 'webmaster', 'noreply', 'no-reply',
  'billing', 'security', 'privacy', 'legal', 'team', 'staff', 'office',
  'mail', 'mailer', 'daemon', 'bounce', 'root', 'null', 'dev', 'test',
  'demo', 'example', 'user', 'users', 'accounts', 'auth', 'login',
  'register', 'signup', 'welcome', 'hello', 'hi', 'hey',
];

function randomSendDomain(): string {
  const arr = new Uint8Array(1);
  crypto.getRandomValues(arr);
  return SEND_DOMAINS[arr[0] % SEND_DOMAINS.length];
}

const TTL_OPTIONS: Record<string, number> = {
  '10m': 10 * 60,
  '1h': 60 * 60,
  '1d': 24 * 60 * 60,
  '20d': 20 * 24 * 60 * 60,
};

const RL = {
  createInbox: { max: 50, window: 3600 },
  restoreInbox: { max: 30, window: 3600 },
  sendMessage: { max: 200, window: 3600 },
  getMessages: { max: 300, window: 3600 },
  abuseReport: { max: 5, window: 3600 },
};

function randomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => chars[b % chars.length]).join('');
}

function isReservedAddress(name: string): boolean {
  const lower = name.toLowerCase().split('@')[0].split('.')[0];
  return RESERVED_ADDRESSES.includes(lower);
}

async function isBlockedAddress(env: Env, address: string): Promise<boolean> {
  const local = address.toLowerCase().split('@')[0];
  if (isReservedAddress(local)) return true;
  const row = await env.DB.prepare('SELECT address FROM blocked_addresses WHERE address = ?').bind(local).first<{ address: string }>();
  return !!row;
}

function getClientIp(c: any): string {
  return c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
}

async function checkRateLimit(env: Env, key: string, max: number, windowSec: number, ctx?: { waitUntil(p: Promise<any>): void }, ip?: string): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const cutoff = now - windowSec;
  await env.DB.prepare('DELETE FROM rate_limits WHERE timestamp < ?').bind(cutoff).run();
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as cnt FROM rate_limits WHERE key = ? AND timestamp > ?'
  ).bind(key, cutoff).first<{ cnt: number }>();
  if (result && result.cnt >= max) {
    if (ctx && ip) await logSecurityEvent(env, ctx, 'rate_limited', `Rate limit hit on ${key.split(':')[0]}`, ip);
    return false;
  }
  await env.DB.prepare('INSERT INTO rate_limits (id, key, timestamp) VALUES (?, ?, ?)').bind(crypto.randomUUID(), key, now).run();
  return true;
}

async function cleanupInbox(env: Env, inboxId: string): Promise<{ active: boolean; expiresAt: number }> {
  const inbox = await env.DB.prepare(
    'SELECT id, expires_at FROM inboxes WHERE id = ?'
  ).bind(inboxId).first<{ id: string; expires_at: number }>();

  if (!inbox) return { active: false, expiresAt: 0 };

  const now = Math.floor(Date.now() / 1000);

  if (inbox.expires_at <= now) {
    await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inboxId).run();
    await env.DB.prepare('UPDATE inboxes SET is_active = 0 WHERE id = ?').bind(inboxId).run();
    return { active: false, expiresAt: inbox.expires_at };
  }

  await env.DB.prepare(
    'DELETE FROM messages WHERE inbox_id = ? AND is_read = 1 AND received_at < ?'
  ).bind(inboxId, inbox.expires_at).run();

  return { active: true, expiresAt: inbox.expires_at };
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

// Request telemetry: daily totals, last 7 days (one row per day in counters).
async function getRequestStats(env: Env): Promise<{ today: number; days: { date: string; count: number }[] }> {
  const rows = await env.DB.prepare('SELECT key, val FROM counters WHERE key LIKE ? ORDER BY key DESC LIMIT 7').bind('req:%').all<{ key: string; val: number }>();
  const today = getTodayKey();
  const days = rows.results
    .filter(r => r.key.startsWith('req:'))
    .map(r => ({ date: r.key.slice(4), count: r.val }));
  const todayCount = days.find(d => d.date === today)?.count || 0;
  return { today: todayCount, days };
}

async function getCreatedToday(env: Env): Promise<number> {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const row = await env.DB.prepare('SELECT COUNT(*) as cnt FROM inboxes WHERE created_at >= ?').bind(Math.floor(start.getTime() / 1000)).first<{ cnt: number }>();
  return row?.cnt || 0;
}

async function getMessagesToday(env: Env): Promise<number> {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const row = await env.DB.prepare('SELECT COUNT(*) as cnt FROM messages WHERE received_at >= ?').bind(Math.floor(start.getTime() / 1000)).first<{ cnt: number }>();
  return row?.cnt || 0;
}

async function getSentToday(env: Env): Promise<number> {
  const key = `smtp-sent:${getTodayKey()}`;
  const row = await env.DB.prepare('SELECT val FROM counters WHERE key = ?').bind(key).first<{ val: number }>();
  return row?.val || 0;
}

async function getSentTodayByProvider(env: Env): Promise<Record<string, number>> {
  const today = getTodayKey();
  const rows = await env.DB.prepare('SELECT key, val FROM counters WHERE key LIKE ?').bind(`smtp-sent-provider:%:${today}`).all<{ key: string; val: number }>();
  const out: Record<string, number> = {};
  for (const r of rows.results) {
    const provider = r.key.split(':')[1];
    if (provider) out[provider] = (out[provider] || 0) + r.val;
  }
  return out;
}

async function incrementSentToday(env: Env, provider?: string): Promise<void> {
  const key = `smtp-sent:${getTodayKey()}`;
  await env.DB.prepare('INSERT OR IGNORE INTO counters (key, val) VALUES (?, 0)').bind(key).run();
  await env.DB.prepare('UPDATE counters SET val = val + 1 WHERE key = ?').bind(key).run();
  if (provider) {
    const pKey = `smtp-sent-provider:${provider}:${getTodayKey()}`;
    await env.DB.prepare('INSERT OR IGNORE INTO counters (key, val) VALUES (?, 0)').bind(pKey).run();
    await env.DB.prepare('UPDATE counters SET val = val + 1 WHERE key = ?').bind(pKey).run();
  }
}

async function hashInboxId(env: Env, inboxId: string): Promise<void> {
  const encoder = new TextEncoder();
  const data = encoder.encode(inboxId);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare('INSERT OR IGNORE INTO inbox_hashes (hash, created_at) VALUES (?, ?)').bind(hash, now).run();
}

// Admin auth middleware - checks X-Admin-Key header (constant-time-ish compare)
async function isAdminAuthenticated(c: any): Promise<boolean> {
  const adminKey = c.req.header('X-Admin-Key');
  const ip = getClientIp(c);
  if (!adminKey) {
    await logSecurityEvent(c.env, c.executionCtx, 'admin_missing_key', 'Admin endpoint without key', ip);
    return false;
  }
  // Failed attempts only are throttled (60/h per IP) — brute force protection
  // without any risk of false positives for the real admin.
  if (!await checkRateLimit(c.env, 'adminbad:' + ip, 60, 3600, c.executionCtx, ip)) {
    return false;
  }
  const normalized = adminKey.toLowerCase().trim();
  const hash = await sha256Hex(normalized);
  const allowed = c.env.ADMIN_KEYWORD ? await sha256Hex(c.env.ADMIN_KEYWORD.toLowerCase().trim()) : null;
  if (!allowed || hash !== allowed) {
    await logSecurityEvent(c.env, c.executionCtx, 'admin_bad_key', 'Failed admin key attempt', ip);
    return false;
  }
  // Authenticated requests are not rate limited — only the legit admin reaches this point.
  return true;
}

async function requireAdmin(c: any, next: any) {
  if (!await isAdminAuthenticated(c)) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  // Authenticated admin actions: real per-second throttle (10/s per IP).
  // Tenable for a human operator, effective against runaway/automated use.
  if (!await throttleAdmin(c)) {
    return c.json({ error: 'Too many admin actions. Slow down.' }, 429);
  }
  await next();
}

// 10 actions/second per IP for authenticated admin calls
async function throttleAdmin(c: any): Promise<boolean> {
  const ip = getClientIp(c);
  return checkRateLimit(c.env, 'adminok:' + ip, 10, 1, c.executionCtx, ip);
}

// POST /api/admin/nuke-all — wipe the entire service (all inboxes, messages, tokens, hashes).
// Requires a typed confirmation to prevent accidental full erasure.
app.post('/api/admin/nuke-all', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  if (!await isAdminAuthenticated(c)) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  if (!await throttleAdmin(c)) {
    return c.json({ error: 'Too many admin actions. Slow down.' }, 429);
  }
  const { confirm } = await c.req.json<{ confirm?: string }>().catch(() => ({} as any));
  if (confirm !== 'NUKE ALL') {
    await logSecurityEvent(env, c.executionCtx, 'admin_nuke_aborted', 'Nuke-all confirmation mismatch', ip);
    return c.json({ error: 'Type NUKE ALL to confirm' }, 400);
  }
  const msgs = await env.DB.prepare('DELETE FROM messages').run();
  const inboxes = await env.DB.prepare('DELETE FROM inboxes').run();
  await env.DB.prepare('DELETE FROM inbox_tokens').run();
  await env.DB.prepare('DELETE FROM inbox_hashes').run();
  await env.DB.prepare("DELETE FROM counters WHERE key LIKE 'smtp-sent%'").run();
  await env.DB.prepare("DELETE FROM counters WHERE key LIKE 'req:%'").run();
  await logSecurityEvent(env, c.executionCtx, 'admin_nuke_all', `Full wipe: ${inboxes.meta.changes} inboxes, ${msgs.meta.changes} messages`, ip);
  return c.json({ ok: true, inboxes: inboxes.meta.changes, messages: msgs.meta.changes });
});

// ---- ROUTES ----

// POST /api/inbox/:id/restore — restore access to existing inbox by mnemonic-derived ID
// Creates inbox if not exists with deterministic address from inboxId
app.post('/api/inbox/:id/restore', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const ip = getClientIp(c);

  if (!await checkRateLimit(env, 'restore:' + ip, RL.restoreInbox.max, RL.restoreInbox.window, c.executionCtx, ip)) {
    return c.json({ error: 'Rate limit exceeded. Try again later.' }, 429);
  }

  const serviceRow = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();
  if (serviceRow && serviceRow.val === 0) {
    return c.json({ error: 'Service is temporarily disabled' }, 503);
  }

  // Validate inboxId format (64 hex chars from SHA256)
  if (!/^[a-f0-9]{64}$/.test(inboxId)) {
    return c.json({ error: 'Invalid inbox ID format' }, 400);
  }

  const now = Math.floor(Date.now() / 1000);
  const ttlSeconds = TTL_OPTIONS['10m'] || 600;
  const newExpiry = now + ttlSeconds;

  const { address: savedAddress } = await c.req.json<{ address?: string }>().catch(() => ({} as any));

  // Derive deterministic local-part from inboxId (first 16 hex chars)
  const localPart = inboxId.slice(0, 16);

  // Check if inbox exists
  const existing = await env.DB.prepare(
    'SELECT id, address, expires_at, is_active FROM inboxes WHERE id = ?'
  ).bind(inboxId).first<{ id: string; address: string; expires_at: number; is_active: number }>();

  const allowedDomains = env.DOMAINS.split(',').map((d: string) => d.trim());
  const targetDomain = allowedDomains[0]; // Use first domain
  const deterministicAddress = `${localPart}@${targetDomain}`;

  // Prefer the address saved in the .vdr file (restores custom usernames after nuke)
  const targetAddress = savedAddress && /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(savedAddress)
    ? savedAddress.toLowerCase()
    : deterministicAddress;

  if (existing) {
    // Inbox exists - check if permanently deleted
    if (existing.is_active === 0 && existing.expires_at < now - 86400) {
      return c.json({ error: 'Inbox permanently deleted after 24h of expiration.', expired: true }, 410);
    }
    // Extend TTL
    await env.DB.prepare(
      'UPDATE inboxes SET is_active = 1, expires_at = ? WHERE id = ?'
    ).bind(Math.max(existing.expires_at, newExpiry), inboxId).run();

    const sentToday = await getSentToday(env);
    const smtpRemaining = Math.max(0, SMTP_DAILY_LIMIT - sentToday);

    return c.json({
      inbox_id: existing.id,
      address: existing.address,
      expires_at: Math.max(existing.expires_at, newExpiry),
      ttl_seconds: Math.max(existing.expires_at, newExpiry) - now,
      smtp_remaining: smtpRemaining,
    });
  }

  // Inbox doesn't exist - CREATE it (deterministic address, or saved custom address from .vdr)
  // If the saved address is taken by another inbox, fall back to the deterministic one
  let finalAddress = targetAddress;
  const addrTaken = await env.DB.prepare('SELECT id FROM inboxes WHERE address = ?').bind(finalAddress).first<{ id: string }>();
  if (addrTaken) {
    finalAddress = deterministicAddress;
  }
  const taken = await env.DB.prepare('SELECT id FROM inboxes WHERE address = ?').bind(finalAddress).first<{ id: string }>();
  if (taken) {
    return c.json({ error: 'Address conflict. Please use a different mnemonic.' }, 409);
  }

  await env.DB.prepare(
    'INSERT INTO inboxes (id, address, created_at, expires_at, is_active) VALUES (?, ?, ?, ?, 1)'
  ).bind(inboxId, finalAddress, now, newExpiry).run();

  // Hash the inbox_id for legal cooperation
  await hashInboxId(env, inboxId);

  const sentToday = await getSentToday(env);
  const smtpRemaining = Math.max(0, SMTP_DAILY_LIMIT - sentToday);

  return c.json({
    inbox_id: inboxId,
    address: finalAddress,
    expires_at: newExpiry,
    ttl_seconds: ttlSeconds,
    smtp_remaining: smtpRemaining,
  });
});

// POST /api/inbox
app.post('/api/inbox', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);

  if (!await checkRateLimit(env, 'inbox:' + ip, RL.createInbox.max, RL.createInbox.window, c.executionCtx, ip)) {
    return c.json({ error: 'Rate limit exceeded. Try again later.' }, 429);
  }

  const serviceRow = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();
  if (serviceRow && serviceRow.val === 0) {
    return c.json({ error: 'Service is temporarily disabled' }, 503);
  }

  const { domain, inbox_id, ttl, custom_address, pubkey, privkey_enc } = await c.req.json<{ domain?: string; inbox_id?: string; ttl?: string; custom_address?: string; pubkey?: string; privkey_enc?: string }>().catch(() => ({} as any));
  const allowedDomains = env.DOMAINS.split(',').map((d: string) => d.trim());
  
  // Check if inbox_id is a SHA256 hash (64 hex chars) - deterministic mnemonic-derived
  const isDeterministicId = inbox_id && /^[a-f0-9]{64}$/.test(inbox_id);
  
  let targetDomain = domain;
  if (!targetDomain || !allowedDomains.includes(targetDomain)) {
    // For deterministic IDs, always use first domain (veildrop.fr) for consistency
    if (isDeterministicId) {
      targetDomain = allowedDomains[0];
    } else {
      const arr = new Uint8Array(1);
      crypto.getRandomValues(arr);
      targetDomain = allowedDomains[arr[0] % allowedDomains.length];
    }
  }

  const ttlSeconds = TTL_OPTIONS[ttl || '10m'] || TTL_OPTIONS['10m'];

  if (inbox_id) {
    const existing = await env.DB.prepare(
      'SELECT id, address, expires_at FROM inboxes WHERE id = ?'
    ).bind(inbox_id).first<Inbox>();

    if (existing) {
      const newExpiry = Math.floor(Date.now() / 1000) + ttlSeconds;
      if (pubkey && privkey_enc) {
        await env.DB.prepare(
          'UPDATE inboxes SET is_active = 1, expires_at = MAX(expires_at, ?), pubkey = ?, privkey_enc = ?, e2ee = 1 WHERE id = ?'
        ).bind(newExpiry, pubkey, privkey_enc, inbox_id).run();
      } else {
        await env.DB.prepare(
          'UPDATE inboxes SET is_active = 1, expires_at = MAX(expires_at, ?) WHERE id = ?'
        ).bind(newExpiry, inbox_id).run();
      }
      return c.json<CreateInboxResponse>({
        inbox_id: existing.id,
        address: existing.address,
        expires_at: Math.max(existing.expires_at, newExpiry),
        ttl_seconds: ttlSeconds,
        e2ee: !!(pubkey && privkey_enc),
        pubkey: pubkey || undefined,
        privkey_enc: privkey_enc || undefined,
      });
    }
  }

  let localPart: string;
  if (custom_address) {
    localPart = custom_address.toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 64);
    if (localPart.length < 3) return c.json({ error: 'Username too short (min 3 chars)' }, 400);
    if (localPart.includes('..')) return c.json({ error: 'Invalid username' }, 400);
    if (isReservedAddress(localPart)) return c.json({ error: 'This address is reserved' }, 403);
    if (await isBlockedAddress(env, localPart)) return c.json({ error: 'This address is not available' }, 403);
    const newAddress = `${localPart}@${targetDomain}`;
    const taken = await env.DB.prepare('SELECT id FROM inboxes WHERE address = ?').bind(newAddress).first<{ id: string }>();
    if (taken) return c.json({ error: 'This address is already taken' }, 409);
  } else if (isDeterministicId && inbox_id) {
    // Deterministic mnemonic-derived ID: derive local-part from the inboxId itself
    localPart = inbox_id.slice(0, 16);
    const newAddress = `${localPart}@${targetDomain}`;
    const taken = await env.DB.prepare('SELECT id FROM inboxes WHERE address = ?').bind(newAddress).first<{ id: string }>();
    if (taken) return c.json({ error: 'This address is already taken' }, 409);
  } else {
    localPart = randomString(20);
  }
  const address = `${localPart}@${targetDomain}`;
  const newId = inbox_id || crypto.randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;

  const e2ee = !!(pubkey && privkey_enc);
  await env.DB.prepare(
    'INSERT INTO inboxes (id, address, created_at, expires_at, is_active, pubkey, privkey_enc, e2ee) VALUES (?, ?, ?, ?, 1, ?, ?, ?)'
  ).bind(newId, address, Math.floor(Date.now() / 1000), expiresAt, pubkey || null, privkey_enc || null, e2ee ? 1 : 0).run();

  // Hash the inbox_id for legal cooperation
  if (inbox_id) await hashInboxId(env, inbox_id);

  return c.json<CreateInboxResponse>({
    inbox_id: newId,
    address,
    expires_at: expiresAt,
    ttl_seconds: ttlSeconds,
    e2ee: e2ee || undefined,
    pubkey: e2ee ? pubkey : undefined,
    privkey_enc: e2ee ? privkey_enc : undefined,
  });
});

// GET /api/inbox/:id/messages
app.get('/api/inbox/:id/messages', async (c) => {
  const inboxId = c.req.param('id');
  const env = c.env;

  if (!await checkRateLimit(env, 'msg:' + inboxId, RL.getMessages.max, RL.getMessages.window, c.executionCtx, getClientIp(c))) {
    return c.json({ error: 'Rate limit exceeded' }, 429);
  }

  const { active, expiresAt } = await cleanupInbox(env, inboxId);
  if (!active) return c.json({ error: 'Inbox expired', expired: true }, 404);

  const inbox = await env.DB.prepare(
    'SELECT address, e2ee, privkey_enc FROM inboxes WHERE id = ?'
  ).bind(inboxId).first<{ address: string; e2ee: number; privkey_enc: string | null }>();

  if (!inbox) return c.json({ error: 'Inbox not found' }, 404);

  const messages = await env.DB.prepare(
    'SELECT id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at, is_read FROM messages WHERE inbox_id = ? ORDER BY received_at DESC'
  ).bind(inboxId).all<Message>();
  if (inbox.e2ee !== 1) {
    for (const m of messages.results) {
      const d = await decryptMessageFields(env, m);
      m.subject_enc = d.subject_enc;
      m.body_enc = d.body_enc;
      m.body_html = d.body_html;
      m.attachments_json = d.attachments_json;
    }
  }

  const sentToday = await getSentToday(env);
  const smtpRemaining = Math.max(0, SMTP_DAILY_LIMIT - sentToday);

  return c.json({
    address: inbox.address,
    messages: messages.results.map((m: any) => ({
      id: m.id,
      from: m.from_address,
      subject: m.subject_enc,
      body_enc: m.body_enc,
      body_html: m.body_html || null,
      attachments: m.attachments_json ? (() => { try { return JSON.parse(m.attachments_json); } catch { return []; } })() : [],
      received_at: m.received_at,
      is_read: !!m.is_read
    })),
    expires_at: expiresAt,
    remaining_seconds: Math.max(0, expiresAt - Math.floor(Date.now() / 1000)),
    smtp_remaining: smtpRemaining,
    e2ee: inbox.e2ee === 1,
    privkey_enc: inbox.e2ee === 1 ? inbox.privkey_enc : null,
  });
});

// POST /api/inbox/:id/read
app.post('/api/inbox/:id/read', async (c) => {
  const inboxId = c.req.param('id');
  const env = c.env;
  const { message_id } = await c.req.json<{ message_id: string }>();
  await env.DB.prepare(
    'UPDATE messages SET is_read = 1 WHERE id = ? AND inbox_id = ?'
  ).bind(message_id, inboxId).run();
  return c.json({ ok: true });
});

// GET /api/inbox/:id/message/:messageId — full message (marks it read, does NOT delete)
app.get('/api/inbox/:id/message/:messageId', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const messageId = c.req.param('messageId');
  const msg = await env.DB.prepare(
    'SELECT id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at, is_read FROM messages WHERE id = ? AND inbox_id = ?'
  ).bind(messageId, inboxId).first<any>();
  if (!msg) return c.json({ error: 'Message not found' }, 404);

  const inboxRow = await env.DB.prepare('SELECT e2ee, privkey_enc FROM inboxes WHERE id = ?').bind(inboxId).first<{ e2ee: number; privkey_enc: string | null }>();

  let subject = msg.subject_enc, body = msg.body_enc, html = msg.body_html || null, attachments = null;
  const e2ee = !!(inboxRow && inboxRow.e2ee === 1);
  if (e2ee) {
    try { attachments = msg.attachments_json ? JSON.parse(msg.attachments_json) : null; } catch { attachments = null; }
  } else {
    const decB = await decryptMessageFields(env, msg);
    subject = decB.subject_enc;
    body = decB.body_enc;
    html = decB.body_html;
    attachments = msg.attachments_json ? JSON.parse(decB.attachments_json as string) : [];
  }
  await env.DB.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').bind(messageId).run();
  return c.json({
    id: msg.id,
    from: msg.from_address,
    subject,
    body,
    body_html: html,
    attachments: attachments || [],
    received_at: msg.received_at,
    is_read: true,
    e2ee,
    privkey_enc: e2ee ? (inboxRow ? inboxRow.privkey_enc : null) : null,
  });
});

// POST /api/send
app.post('/api/send', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);

  const sentToday = await getSentToday(env);
  if (sentToday >= SMTP_DAILY_LIMIT) {
    return c.json({ error: `Daily send limit reached (${SMTP_DAILY_LIMIT}/day). Try again tomorrow.`, quota_reached: true }, 429);
  }

  const serviceRow = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();
  if (serviceRow && serviceRow.val === 0) {
    return c.json({ error: 'Service is temporarily disabled' }, 503);
  }

  if (!await checkRateLimit(env, 'send:' + ip, RL.sendMessage.max, RL.sendMessage.window, c.executionCtx, ip)) {
    return c.json({ error: 'Rate limit exceeded.' }, 429);
  }

  const body = await c.req.json<any>();
  if (!body || typeof body !== 'object') return c.json({ error: 'Missing required fields' }, 400);
  if (!body.to || !body.subject || !body.body) {
    return c.json({ error: 'Missing required fields' }, 400);
  }
  if (typeof body.subject !== 'string' || typeof body.body !== 'string') {
    return c.json({ error: 'Invalid field types' }, 400);
  }

  let recipients: string[];
  if (Array.isArray(body.to)) {
    recipients = body.to.map((r: any) => String(r).trim()).filter(Boolean);
  } else if (typeof body.to === 'string') {
    recipients = body.to.split(',').map((r: string) => r.trim()).filter(Boolean);
  } else {
    return c.json({ error: 'Invalid recipients' }, 400);
  }

  if (recipients.length === 0) return c.json({ error: 'No valid recipients' }, 400);
  if (recipients.length > 10) return c.json({ error: 'Max 10 recipients' }, 400);
  const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  for (const r of recipients) {
    if (r.length > 254 || !EMAIL_RE.test(r)) return c.json({ error: 'Invalid email address' }, 400);
  }

  const subject = sanitizeHeaderValue(body.subject, 998);
  if (!subject) return c.json({ error: 'Invalid subject' }, 400);
  if (body.body.length > 500000) return c.json({ error: 'Body too large' }, 400);

  const replyTo = body.reply_to || body.inbox_address || '';
  const inReplyTo = sanitizeHeaderValue(String(body.in_reply_to || ''), 998);
  const sendDomain = randomSendDomain();

  const reportUrl = REPORT_URL;
  const textDisclaimer = `\n\n---\nThis email was sent anonymously via VeilDrop (${SITE_URL}).\nTo reply, send an email to: ${replyTo || 'the Reply-To address in the email headers'}\nTo report abuse: ${reportUrl}\n`;
  const htmlDisclaimer = `<br><br><hr style="border:none;border-top:1px solid #eee;margin:24px 0 8px"><p style="font-size:11px;color:#999;text-align:center;line-height:1.6">This email was sent anonymously via <a href="${SITE_URL}" style="color:#999">VeilDrop</a>.<br>To reply, send an email to: <strong>${replyTo || 'the Reply-To address in the email headers'}</strong><br>To report abuse: <a href="${reportUrl}" style="color:#999">Report Abuse</a></p>`;

  const smtpPayload: any = {
    to: recipients,
    sender: `anonymous@${sendDomain}`,
    subject,
    text_body: body.body + textDisclaimer,
  };

  if (body.body_html) {
    if (typeof body.body_html !== 'string' || body.body_html.length > 1000000) {
      return c.json({ error: 'Invalid HTML body' }, 400);
    }
    smtpPayload.html_body = body.body_html + htmlDisclaimer;
  }

  const customHeaders: any[] = [];
  if (replyTo) customHeaders.push({ header: 'Reply-To', value: sanitizeHeaderValue(replyTo, 998) });
  if (inReplyTo) {
    customHeaders.push({ header: 'In-Reply-To', value: inReplyTo });
    customHeaders.push({ header: 'References', value: inReplyTo });
  }
  if (customHeaders.length > 0) smtpPayload.custom_headers = customHeaders;

  if (body.attachments && body.attachments.length > 0) {
    if (body.attachments.length > 10) return c.json({ error: 'Max 10 attachments' }, 400);
    smtpPayload.attachments = body.attachments.slice(0, 10).map((att: any) => ({
      filename: sanitizeHeaderValue(String(att.filename || 'unnamed'), 255) || 'unnamed',
      fileblob: String(att.content || att.fileblob || '').slice(0, 7 * 1024 * 1024),
      mimetype: sanitizeHeaderValue(String(att.mimeType || att.mimetype || 'application/octet-stream'), 100)
    }));
  }

  let smtpResult: any;
  let sendpulseUsed = false;
  try {
    // Primary: SendPulse SMTP (raw socket), fallback: SMTP2GO REST API
    const spEmail = {
      to: recipients,
      from: `anonymous@${sendDomain}`,
      subject,
      text: body.body + textDisclaimer,
      html: body.body_html ? body.body_html + htmlDisclaimer : undefined,
      replyTo: replyTo || undefined,
      inReplyTo: inReplyTo || undefined,
      references: inReplyTo || undefined,
      attachments: body.attachments?.slice(0, 10).map((att: any) => ({
        filename: sanitizeHeaderValue(String(att.filename || 'unnamed'), 255) || 'unnamed',
        contentBase64: String(att.content || att.fileblob || '').slice(0, 7 * 1024 * 1024),
        mimetype: sanitizeHeaderValue(String(att.mimeType || att.mimetype || 'application/octet-stream'), 100),
      })),
    };
    const spResult = await sendViaSendPulse(
      {
        host: env.SENDPULSE_SMTP_HOST || 'smtp-pulse.com',
        port: parseInt(env.SENDPULSE_SMTP_PORT || '465', 10),
        user: env.SENDPULSE_SMTP_USER,
        pass: env.SENDPULSE_SMTP_PASS,
      },
      spEmail
    );

    if (spResult.ok) {
      sendpulseUsed = true;
      smtpResult = { data: { succeeded: recipients.length, email_id: 'sendpulse-' + crypto.randomUUID() } };
    } else {
      console.error('SendPulse failed, falling back to SMTP2GO:', spResult.detail);
      const smtpResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Smtp2go-Api-Key': env.SMTP2GO_API_KEY
        },
        body: JSON.stringify(smtpPayload)
      });
      smtpResult = await smtpResponse.json<any>();
    }
  } catch (err) {
    return c.json({ error: 'SMTP request failed' }, 500);
  }

  if (!smtpResult?.data?.succeeded || smtpResult.data.succeeded === 0) {
    await logSecurityEvent(env, c.executionCtx, 'send_failed', 'Outbound send rejected by provider', ip);
    return c.json({ error: 'Failed to send email' }, 500);
  }

  await incrementSentToday(env, sendpulseUsed ? 'sendpulse' : 'smtp2go');
  const remaining = Math.max(0, SMTP_DAILY_LIMIT - sentToday - 1);

  return c.json({ ok: true, email_id: smtpResult.data.email_id, smtp_remaining: remaining, provider: sendpulseUsed ? 'sendpulse' : 'smtp2go' });
});

// ---- PUBLIC API v1 (no API key — the 15-word mnemonic IS the key) ----

// Verify that a mnemonic OR access token unlocks a given inbox
async function verifyMnemonicAccess(env: Env, inboxId: string, mnemonic?: string | null): Promise<boolean> {
  if (!mnemonic) return false;
  const words = normalizeMnemonic(mnemonic);
  if (words) {
    const derived = await inboxIdFromMnemonic(words);
    if (derived !== inboxId) return false;
    const row = await env.DB.prepare('SELECT id FROM inboxes WHERE id = ?').bind(inboxId).first<{ id: string }>();
    return !!row;
  }
  const tokenHash = await sha256Hex(mnemonic);
  const row = await env.DB.prepare('SELECT inbox_id FROM inbox_tokens WHERE token_hash = ?').bind(tokenHash).first<{ inbox_id: string }>();
  return !!row && row.inbox_id === inboxId;
}

// Resolve a key (mnemonic OR access token) to an inbox_id. Returns null if invalid.
async function resolveInboxIdFromKey(env: Env, key?: string | null): Promise<string | null> {
  if (!key) return null;
  const words = normalizeMnemonic(key);
  if (words) return await inboxIdFromMnemonic(words);
  const tokenHash = await sha256Hex(key);
  const row = await env.DB.prepare('SELECT inbox_id FROM inbox_tokens WHERE token_hash = ?').bind(tokenHash).first<{ inbox_id: string }>();
  return row ? row.inbox_id : null;
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Store an access token (hashed) for an inbox. Returns the raw token.
async function issueAccessToken(env: Env, inboxId: string): Promise<string> {
  const raw = crypto.randomUUID().replace(/-/g, '');
  await env.DB.prepare('INSERT OR REPLACE INTO inbox_tokens (token_hash, inbox_id) VALUES (?, ?)').bind(await sha256Hex(raw), inboxId).run();
  return raw;
}

// POST /api/v1/inbox — create a new inbox. Pass mnemonic (15 words) to restore/derive a fixed address, or omit for a random one.
app.post('/api/v1/inbox', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);

  if (!await checkRateLimit(env, 'apiinbox:' + ip, RL.createInbox.max, RL.createInbox.window, c.executionCtx, ip)) {
    return c.json({ error: 'Rate limit exceeded. Try again later.' }, 429);
  }

  const body = await c.req.json<{ mnemonic?: string; ttl?: string; e2ee?: boolean }>().catch(() => ({} as any));
  const ttlSeconds = TTL_OPTIONS[body.ttl || '10m'] || TTL_OPTIONS['10m'];

  // If a mnemonic is provided, derive the deterministic inbox_id from it.
  // Otherwise, generate a fresh mnemonic server-side — the API always returns
  // a key so the inbox can be read back.
  let inboxId: string | undefined;
  let words: string[] | undefined;
  if (body.mnemonic) {
    const parsed = normalizeMnemonic(body.mnemonic);
    if (!parsed) return c.json({ error: 'Invalid mnemonic: must be exactly 15 valid words' }, 400);
    words = parsed;
    inboxId = await inboxIdFromMnemonic(parsed);
  } else {
    words = generateMnemonic();
    inboxId = await inboxIdFromMnemonic(words);
  }

  // Optional end-to-end encryption: generate an RSA keypair, wrap the private
  // key with a key derived from the mnemonic (SHA-256). The mnemonic is returned
  // once and never stored — with full DB access, nothing can be decrypted.
  let e2eeKeys: { pubkey: string; privkey_enc: string } | null = null;
  if (body.e2ee) {
    e2eeKeys = await createE2eeKeypair(words.join(' '));
  }

  // Reuse the main create logic via an internal request
  const internalUrl = c.req.url.replace('/api/v1/inbox', '/api/inbox');
  const res = await app.fetch(new Request(internalUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inbox_id: inboxId,
      ttl: body.ttl,
      pubkey: e2eeKeys ? e2eeKeys.pubkey : undefined,
      privkey_enc: e2eeKeys ? e2eeKeys.privkey_enc : undefined,
    }),
  }), c.env, c.executionCtx);
  const data = await res.json<any>();
  if (!res.ok) return c.json(data, res.status as any);

  return c.json({
      inbox_id: data.inbox_id,
      address: data.address,
      mnemonic: words.join(' '),
      token: await issueAccessToken(env, data.inbox_id),
      expires_at: data.expires_at,
      ttl_seconds: ttlSeconds,
      auth: 'mnemonic',
      key: words.join(' '),
      e2ee: !!e2eeKeys,
      pubkey: e2eeKeys ? e2eeKeys.pubkey : undefined,
      privkey_enc: e2eeKeys ? e2eeKeys.privkey_enc : undefined,
    });
});

// GET /api/v1/inbox/:id/messages — list messages (key = mnemonic via ?key= or X-API-Key header)
// Read-once policy: the list contains NO body — open a message to read it, it is deleted right after.
app.get('/api/v1/inbox/:id/messages', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';

  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    await logSecurityEvent(env, c.executionCtx, 'api_bad_key', 'v1 list with invalid key', getClientIp(c));
    return c.json({ error: 'Invalid or missing key. Pass your 15-word mnemonic as ?key= or X-API-Key header.' }, 401);
  }

  const res = await app.fetch(new Request(c.req.url.replace(`/api/v1/inbox/${inboxId}/messages`, `/api/inbox/${inboxId}/messages`), { method: 'GET' }), c.env, c.executionCtx);
  const data = await res.json<any>();
  if (!res.ok) return c.json(data, res.status as any);
  data.messages = (data.messages || []).map((m: any) => ({
    id: m.id,
    from: m.from,
    subject: m.subject,
    has_attachments: data.e2ee ? null : (m.attachments || []).length > 0,
    attachments: (m.attachments || []).map((a: any) => ({ filename: a.filename, mimeType: a.mimeType, size: a.size })),
    received_at: m.received_at,
    is_read: m.is_read,
  }));
  return c.json(data);
});

// GET /api/v1/inbox/:id/message/:messageId — read-once: returns the full message, then deletes it.
app.get('/api/v1/inbox/:id/message/:messageId', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const messageId = c.req.param('messageId');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';

  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    await logSecurityEvent(env, c.executionCtx, 'api_bad_key', 'v1 read with invalid key', getClientIp(c));
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }

  const msg = await env.DB.prepare(
    'SELECT id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at FROM messages WHERE id = ? AND inbox_id = ?'
  ).bind(messageId, inboxId).first<any>();
  if (!msg) return c.json({ error: 'Message not found' }, 404);
  const inboxRowC = await env.DB.prepare('SELECT e2ee, privkey_enc FROM inboxes WHERE id = ?').bind(inboxId).first<{ e2ee: number; privkey_enc: string | null }>();
  let e2eeMsg = !!(inboxRowC && inboxRowC.e2ee === 1);
  if (!e2eeMsg) {
    const decC = await decryptMessageFields(env, msg);
    msg.subject_enc = decC.subject_enc;
    msg.body_enc = decC.body_enc;
    msg.body_html = decC.body_html;
    msg.attachments_json = decC.attachments_json;
  }

  // Read-once: message is destroyed immediately after being delivered
  await env.DB.prepare('DELETE FROM messages WHERE id = ? AND inbox_id = ?').bind(messageId, inboxId).run();

  return c.json({
    id: msg.id,
    from: msg.from_address,
    subject: msg.subject_enc,
    body: msg.body_enc,
    body_html: msg.body_html || null,
    attachments: msg.attachments_json ? JSON.parse(msg.attachments_json) : [],
    received_at: msg.received_at,
    deleted_after_read: true,
    e2ee: e2eeMsg,
    privkey_enc: e2eeMsg ? (inboxRowC ? inboxRowC.privkey_enc : null) : null,
  });
});

// DELETE /api/inbox/:id/message/:messageId — used by the site: deletes a message after it was read
app.delete('/api/inbox/:id/message/:messageId', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const messageId = c.req.param('messageId');
  const res = await env.DB.prepare('DELETE FROM messages WHERE id = ? AND inbox_id = ?').bind(messageId, inboxId).run();
  if (!res.meta.changes) return c.json({ error: 'Message not found' }, 404);
  return c.json({ ok: true });
});

// POST /api/v1/inbox/:id/send — send an email from this inbox's address (Reply-To = inbox address)
app.post('/api/v1/inbox/:id/send', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';

  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }

  const body = await c.req.json<any>().catch(() => null);
  if (!body) return c.json({ error: 'Invalid JSON body' }, 400);
  if (!body.to || !body.subject || !body.body) {
    return c.json({ error: 'Missing required fields: to, subject, body' }, 400);
  }

  const inbox = await env.DB.prepare('SELECT address FROM inboxes WHERE id = ?').bind(inboxId).first<{ address: string }>();
  if (!inbox) return c.json({ error: 'Inbox not found' }, 404);

  const sendRes = await app.fetch(new Request(c.req.url.replace(`/api/v1/inbox/${inboxId}/send`, '/api/send'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, reply_to: inbox.address, inbox_address: inbox.address }),
  }), c.env, c.executionCtx);
  const data = await sendRes.json<any>();
  if (!sendRes.ok) return c.json(data, sendRes.status as any);
  return c.json(data);
});

// DELETE /api/v1/inbox/:id — burn the inbox permanently (key required)
app.delete('/api/v1/inbox/:id', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';

  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }

  await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inboxes WHERE id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inbox_tokens WHERE inbox_id = ?').bind(inboxId).run();
  return c.json({ ok: true, message: 'Inbox permanently deleted' });
});

// POST /api/v1/inbox/:id/extend — extend the inbox TTL (key required)
app.post('/api/v1/inbox/:id/extend', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('id');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';
  const body = await c.req.json<{ ttl?: string }>().catch(() => ({} as any));

  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }

  const ttlSeconds = TTL_OPTIONS[body.ttl || '10m'] || TTL_OPTIONS['10m'];
  const row = await env.DB.prepare('SELECT expires_at FROM inboxes WHERE id = ?').bind(inboxId).first<{ expires_at: number }>();
  if (!row) return c.json({ error: 'Inbox not found' }, 404);

  const newExpiry = Math.floor(Date.now() / 1000) + ttlSeconds;
  await env.DB.prepare('UPDATE inboxes SET is_active = 1, expires_at = MAX(expires_at, ?) WHERE id = ?').bind(newExpiry, inboxId).run();

  return c.json({
    ok: true,
    expires_at: Math.max(row.expires_at, newExpiry),
    ttl_seconds: ttlSeconds,
  });
});

// GET /api/v1/status — public service status
app.get('/api/v1/status', async (c) => {
  const env = c.env;
  const row = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();
  const enabled = !row || row.val === 1;
  return c.json({
    service: 'veildrop',
    version: '1',
    enabled,
    sent_today: await getSentToday(env),
    daily_limit: SMTP_DAILY_LIMIT,
    domains: env.DOMAINS.split(',').map((d: string) => d.trim()),
    endpoints: {
      create_inbox: 'POST /api/v1/inbox',
      list_messages: 'GET /api/v1/mail?key=',
      read_message: 'GET /api/v1/mail/:messageId?key=',
      send_email: 'POST /api/v1/send?key=',
      burn_inbox: 'DELETE /api/v1/mail?key=',
      extend_inbox: 'POST /api/v1/extend?key=',
      status: 'GET /api/v1/status',
    },
  });
});

// ---- PUBLIC API v1 SHORT FORM — the key (mnemonic or token) is everything.
//      The server derives the inbox from the key: no inbox_id in the URL. ----

// GET /api/v1/mail?key=... — list messages (metadata only, no body — read-once policy)
app.get('/api/v1/mail', async (c) => {
  const env = c.env;
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';
  const inboxId = await resolveInboxIdFromKey(env, key);
  if (!inboxId) {
    await logSecurityEvent(env, c.executionCtx, 'api_bad_key', 'v1 mail list with invalid key', getClientIp(c));
    return c.json({ error: 'Invalid or missing key. Pass your mnemonic or token as ?key= or X-API-Key header.' }, 401);
  }
  const res = await app.fetch(new Request(c.req.url.replace('/api/v1/mail', `/api/inbox/${inboxId}/messages`), { method: 'GET' }), c.env, c.executionCtx);
  const data = await res.json<any>();
  if (!res.ok) return c.json(data, res.status as any);
  data.messages = (data.messages || []).map((m: any) => ({
    id: m.id,
    from: m.from,
    subject: m.subject,
    has_attachments: data.e2ee ? null : (m.attachments || []).length > 0,
    attachments: (m.attachments || []).map((a: any) => ({ filename: a.filename, mimeType: a.mimeType, size: a.size })),
    received_at: m.received_at,
    is_read: m.is_read,
  }));
  return c.json(data);
});

// GET /api/v1/mail/:messageId?key=... — read-once: full message delivered, then deleted immediately.
app.get('/api/v1/mail/:messageId', async (c) => {
  const env = c.env;
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';
  const inboxId = await resolveInboxIdFromKey(env, key);
  if (!inboxId) {
    await logSecurityEvent(env, c.executionCtx, 'api_bad_key', 'v1 mail read with invalid key', getClientIp(c));
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }
  const messageId = c.req.param('messageId');
  const msg = await env.DB.prepare(
    'SELECT id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at FROM messages WHERE id = ? AND inbox_id = ?'
  ).bind(messageId, inboxId).first<any>();
  if (!msg) return c.json({ error: 'Message not found' }, 404);
  const inboxRowC = await env.DB.prepare('SELECT e2ee, privkey_enc FROM inboxes WHERE id = ?').bind(inboxId).first<{ e2ee: number; privkey_enc: string | null }>();
  let e2eeMsg = !!(inboxRowC && inboxRowC.e2ee === 1);
  if (!e2eeMsg) {
    const decC = await decryptMessageFields(env, msg);
    msg.subject_enc = decC.subject_enc;
    msg.body_enc = decC.body_enc;
    msg.body_html = decC.body_html;
    msg.attachments_json = decC.attachments_json;
  }

  // Read-once: message is destroyed immediately after being delivered
  await env.DB.prepare('DELETE FROM messages WHERE id = ? AND inbox_id = ?').bind(messageId, inboxId).run();
  return c.json({
    id: msg.id,
    from: msg.from_address,
    subject: msg.subject_enc,
    body: msg.body_enc,
    body_html: msg.body_html || null,
    attachments: msg.attachments_json ? JSON.parse(msg.attachments_json) : [],
    received_at: msg.received_at,
    deleted_after_read: true,
    e2ee: e2eeMsg,
    privkey_enc: e2eeMsg ? (inboxRowC ? inboxRowC.privkey_enc : null) : null,
  });
});

// POST /api/v1/send?key=... — send an email from this inbox's address
app.post('/api/v1/send', async (c) => {
  const env = c.env;
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';
  const inboxId = await resolveInboxIdFromKey(env, key);
  if (!inboxId) return c.json({ error: 'Invalid or missing key.' }, 401);
  const body = await c.req.json<any>().catch(() => null);
  if (!body) return c.json({ error: 'Invalid JSON body' }, 400);
  if (!body.to || !body.subject || !body.body) {
    return c.json({ error: 'Missing required fields: to, subject, body' }, 400);
  }
  const inbox = await env.DB.prepare('SELECT address FROM inboxes WHERE id = ?').bind(inboxId).first<{ address: string }>();
  if (!inbox) return c.json({ error: 'Inbox not found' }, 404);
  const sendRes = await app.fetch(new Request(c.req.url.replace('/api/v1/send', '/api/send'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, reply_to: inbox.address, inbox_address: inbox.address }),
  }), c.env, c.executionCtx);
  const data = await sendRes.json<any>();
  if (!sendRes.ok) return c.json(data, sendRes.status as any);
  return c.json(data);
});

// POST /api/v1/extend?key=... — extend the inbox TTL
app.post('/api/v1/extend', async (c) => {
  const env = c.env;
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';
  const inboxId = await resolveInboxIdFromKey(env, key);
  if (!inboxId) return c.json({ error: 'Invalid or missing key.' }, 401);
  const body = await c.req.json<{ ttl?: string }>().catch(() => ({} as any));
  const ttlSeconds = TTL_OPTIONS[body?.ttl || '10m'] || TTL_OPTIONS['10m'];
  const row = await env.DB.prepare('SELECT expires_at FROM inboxes WHERE id = ?').bind(inboxId).first<{ expires_at: number }>();
  if (!row) return c.json({ error: 'Inbox not found' }, 404);
  const newExpiry = Math.floor(Date.now() / 1000) + ttlSeconds;
  await env.DB.prepare('UPDATE inboxes SET is_active = 1, expires_at = MAX(expires_at, ?) WHERE id = ?').bind(newExpiry, inboxId).run();
  return c.json({ ok: true, expires_at: Math.max(row.expires_at, newExpiry), ttl_seconds: ttlSeconds });
});

// DELETE /api/v1/mail?key=... — burn the inbox permanently
app.delete('/api/v1/mail', async (c) => {
  const env = c.env;
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';
  const inboxId = await resolveInboxIdFromKey(env, key);
  if (!inboxId) return c.json({ error: 'Invalid or missing key.' }, 401);
  await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inboxes WHERE id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inbox_tokens WHERE inbox_id = ?').bind(inboxId).run();
  return c.json({ ok: true, message: 'Inbox permanently deleted' });
});

// POST /api/abuse — report abuse via Discord webhook (supports file uploads)
app.post('/api/abuse', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);

  if (!await checkRateLimit(env, 'abuse:' + ip, RL.abuseReport.max, RL.abuseReport.window, c.executionCtx, ip)) {
    return c.json({ error: 'Rate limit exceeded. Max 5 reports per hour.' }, 429);
  }

  const contentType = c.req.header('content-type') || '';

  let reporterEmail = '';
  let inboxAddress = '';
  let reason = '';
  let description = '';
  let date = '';
  let messageId = '';
  const files: { name: string; type: string; data: ArrayBuffer }[] = [];

  if (contentType.includes('multipart/form-data')) {
    // File upload mode
    const formData = await c.req.formData();
    reporterEmail = (formData.get('reporter_email') as string) || '';
    inboxAddress = (formData.get('inbox_address') as string) || '';
    reason = (formData.get('reason') as string) || '';
    description = (formData.get('description') as string) || '';
    date = (formData.get('date') as string) || '';
    messageId = (formData.get('message_id') as string) || '';

    // Extract files (up to 5, max 8MB each)
    for (let i = 0; i < 5; i++) {
      const file = formData.get(`files[${i}]`) as File | null;
      if (!file) break;
      if (file.size > 8 * 1024 * 1024) continue;
      const buf = await file.arrayBuffer();
      files.push({ name: file.name || `attachment_${i}`, type: file.type || 'application/octet-stream', data: buf });
    }
  } else {
    // JSON mode (no files)
    const body = await c.req.json<{
      reporter_email?: string;
      message_id?: string;
      inbox_address?: string;
      reason: string;
      description: string;
      date?: string;
    }>().catch(() => null);
    if (!body) return c.json({ error: 'Invalid request' }, 400);
    reporterEmail = body.reporter_email || '';
    inboxAddress = body.inbox_address || '';
    reason = body.reason || '';
    description = body.description || '';
    date = body.date || '';
    messageId = body.message_id || '';
  }

  if (!reason || !description) {
    return c.json({ error: 'Reason and description are required' }, 400);
  }
  reason = sanitizeHeaderValue(reason, 200) || 'unspecified';
  description = description.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '').trim().slice(0, 5000);
  if (!description) return c.json({ error: 'Description is required' }, 400);
  reporterEmail = sanitizeHeaderValue(reporterEmail, 254);
  inboxAddress = sanitizeHeaderValue(inboxAddress, 320);
  date = sanitizeHeaderValue(date, 64);
  messageId = sanitizeHeaderValue(messageId, 128);

  // Build Discord embed
  const embed = {
    title: '⚠️ Abuse Report — VeilDrop',
    color: 0xdc3545,
    fields: [
      { name: 'Reason', value: reason, inline: true },
      { name: 'Date of incident', value: date || 'Not specified', inline: true },
      { name: 'Reporter email', value: reporterEmail || 'Anonymous', inline: true },
      { name: 'Inbox address', value: inboxAddress || 'Not provided', inline: true },
      { name: 'Message ID', value: messageId || 'Not provided', inline: true },
      { name: 'Description', value: description.slice(0, 1024), inline: false },
    ],
    footer: { text: `Reported from IP: ${ip} • ${new Date().toISOString()}` },
    timestamp: new Date().toISOString(),
  };

  // Send to Discord with file attachments
  try {
    if (!env.DISCORD_WEBHOOK) {
      console.error('DISCORD_WEBHOOK not configured');
      return c.json({ ok: false, error: 'Reporting temporarily unavailable' }, 503);
    }
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('payload_json', JSON.stringify({ embeds: [embed] }));
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        formData.append(`files[${i}]`, new Blob([f.data], { type: f.type }), f.name);
      }
      await fetch(env.DISCORD_WEBHOOK, { method: 'POST', body: formData });
    } else {
      await fetch(env.DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });
    }
  } catch (e) {
    console.error('Discord webhook failed:', e);
  }

  return c.json({ ok: true, message: 'Report submitted. Thank you.', attachments: files.length });
});

// ---- ADMIN ----

// POST /api/admin/check — verify keyword access (no auth required, this IS the login)
app.post('/api/admin/check', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  if (!await checkRateLimit(env, 'admincheck:' + ip, 60, 3600, c.executionCtx, ip)) {
    return c.json({ error: 'Rate limit exceeded' }, 429);
  }
  const { keyword } = await c.req.json<{ keyword?: string }>().catch(() => ({} as any));
  if (!keyword) return c.json({ access: false });
  const normalizedKw = keyword.toLowerCase().trim();
  const access = !!env.ADMIN_KEYWORD && normalizedKw === env.ADMIN_KEYWORD.toLowerCase().trim();
  if (!access) await logSecurityEvent(env, c.executionCtx, 'admin_login_fail', 'Admin login attempt failed', ip);
  return c.json({ access });
});

// All other admin endpoints require X-Admin-Key header
app.use('/api/admin/*', async (c, next) => {
  // Skip auth for /check endpoint
  if (c.req.path === '/api/admin/check') return next();
  return requireAdmin(c, next);
});

// GET /api/admin/inboxes — list active inboxes (admin only)
app.get('/api/admin/inboxes', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const inboxes = await env.DB.prepare(
    `SELECT i.id, i.address, i.created_at, i.expires_at, i.is_active, i.e2ee,
       (SELECT COUNT(*) FROM messages m WHERE m.inbox_id = i.id) as message_count
     FROM inboxes i ORDER BY i.created_at DESC LIMIT 100`
  ).all<any>();

  const sentToday = await getSentToday(env);
  const byProvider = await getSentTodayByProvider(env);

  const msgCount = await env.DB.prepare('SELECT COUNT(*) as cnt FROM messages').first<{ cnt: number }>();
  const hashCount = await env.DB.prepare('SELECT COUNT(*) as cnt FROM inbox_hashes').first<{ cnt: number }>();
  const blockedCount = await env.DB.prepare('SELECT COUNT(*) as cnt FROM blocked_addresses').first<{ cnt: number }>();
  const serviceRow = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();

  return c.json({
    inboxes: inboxes.results.map((i: any) => ({
      id: i.id,
      address: i.address,
      created_at: i.created_at,
      expires_at: i.expires_at,
      is_active: !!i.is_active,
      expired: i.expires_at < Math.floor(Date.now() / 1000),
      message_count: i.message_count || 0,
      e2ee: i.e2ee === 1,
    })),
    stats: {
      total_inboxes: inboxes.results.length,
      active_inboxes: inboxes.results.filter((i: any) => i.is_active && i.expires_at > Math.floor(Date.now() / 1000)).length,
      sent_today: sentToday,
      daily_limit: SMTP_DAILY_LIMIT,
      total_messages: msgCount?.cnt || 0,
      total_hashes: hashCount?.cnt || 0,
      blocked_addresses: blockedCount?.cnt || 0,
      service_enabled: !serviceRow || serviceRow.val === 1,
      sends_by_provider: byProvider,
      providers: {
        sendpulse_configured: !!(env.SENDPULSE_SMTP_USER && env.SENDPULSE_SMTP_PASS),
        smtp2go_configured: !!env.SMTP2GO_API_KEY,
      },
      e2ee_inboxes: inboxes.results.filter((i: any) => i.e2ee).length,
    },
    requests: await getRequestStats(env),
    created_today: await getCreatedToday(env),
    messages_today: await getMessagesToday(env),
  });
});

// POST /api/admin/nuke — force-delete any inbox (admin)
app.post('/api/admin/nuke', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const { inbox_id } = await c.req.json<{ inbox_id: string }>();
  if (!inbox_id) return c.json({ error: 'Missing inbox_id' }, 400);

  await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inbox_id).run();
  await env.DB.prepare('DELETE FROM inboxes WHERE id = ?').bind(inbox_id).run();
  await env.DB.prepare('DELETE FROM inbox_tokens WHERE inbox_id = ?').bind(inbox_id).run();

  return c.json({ ok: true, message: `Inbox ${inbox_id} permanently deleted` });
});

// GET /api/admin/inbox/:id/messages — view a mailbox content (admin). E2EE bodies shown as stored (encv2 ciphertext).
app.get('/api/admin/inbox/:id/messages', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const inboxId = c.req.param('id');
  if (!/^[a-f0-9]{64}$/.test(inboxId) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(inboxId)) return c.json({ error: 'Invalid inbox id' }, 400);
  const inbox = await env.DB.prepare('SELECT * FROM inboxes WHERE id = ?').bind(inboxId).first<any>();
  if (!inbox) return c.json({ error: 'Inbox not found' }, 404);
  const msgs = await env.DB.prepare(
    'SELECT id, from_address, subject_enc, body_enc, body_html, received_at, is_read FROM messages WHERE inbox_id = ? ORDER BY received_at DESC LIMIT 200'
  ).bind(inboxId).all<any>();
  return c.json({
    inbox: {
      id: inbox.id,
      address: inbox.address,
      created_at: inbox.created_at,
      expires_at: inbox.expires_at,
      is_active: !!inbox.is_active,
      e2ee: inbox.e2ee === 1,
    },
    messages: msgs.results,
  });
});

// POST /api/admin/inbox/:id/delete — permanently delete an inbox account (admin)
app.post('/api/admin/inbox/:id/delete', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const inboxId = c.req.param('id');
  if (!/^[a-f0-9]{64}$/.test(inboxId) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(inboxId)) return c.json({ error: 'Invalid inbox id' }, 400);
  const inbox = await env.DB.prepare('SELECT address FROM inboxes WHERE id = ?').bind(inboxId).first<any>();
  if (!inbox) return c.json({ error: 'Inbox not found' }, 404);
  await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inboxes WHERE id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inbox_tokens WHERE inbox_id = ?').bind(inboxId).run();
  const hash = await sha256Hex(inbox.address);
  await env.DB.prepare('DELETE FROM inbox_hashes WHERE hash = ?').bind(hash).run();
  await logSecurityEvent(env, c.executionCtx, 'admin_delete_inbox', `Inbox ${inbox.address} permanently deleted by admin`, ip);
  return c.json({ ok: true });
});

// GET /api/admin/blocked — list blocked addresses (admin)
app.get('/api/admin/blocked', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const rows = await env.DB.prepare('SELECT address, created_at FROM blocked_addresses ORDER BY created_at DESC').all<{ address: string; created_at: number }>();
  return c.json({
    reserved: RESERVED_ADDRESSES,
    blocked: rows.results.map(r => ({ address: r.address, created_at: r.created_at })),
  });
});

// POST /api/admin/blocked — add blocked address (admin)
app.post('/api/admin/blocked', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const { address } = await c.req.json<{ address?: string }>().catch(() => ({} as any));
  if (!address) return c.json({ error: 'Missing address' }, 400);
  const clean = address.toLowerCase().replace(/[^a-z0-9._-]/g, '').split('@')[0].split('.')[0];
  if (clean.length < 1) return c.json({ error: 'Invalid address' }, 400);
  if (RESERVED_ADDRESSES.includes(clean)) return c.json({ error: 'Address is already permanently reserved' }, 409);
  await env.DB.prepare('INSERT OR IGNORE INTO blocked_addresses (address) VALUES (?)').bind(clean).run();
  return c.json({ ok: true, address: clean });
});

// DELETE /api/admin/blocked — remove blocked address (admin)
app.delete('/api/admin/blocked', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const { address } = await c.req.json<{ address?: string }>().catch(() => ({} as any));
  if (!address) return c.json({ error: 'Missing address' }, 400);
  const clean = address.toLowerCase().split('@')[0];
  await env.DB.prepare('DELETE FROM blocked_addresses WHERE address = ?').bind(clean).run();
  return c.json({ ok: true, address: clean });
});

// GET /api/admin/ips — list blocked IPs (admin)
app.get('/api/admin/ips', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const rows = await env.DB.prepare('SELECT ip, reason, created_at FROM blocked_ips ORDER BY created_at DESC LIMIT 500').all<{ ip: string; reason: string | null; created_at: number }>();
  return c.json({ blocked_ips: rows.results.map(r => ({ ip: r.ip, reason: r.reason || '', created_at: r.created_at })) });
});

// POST /api/admin/ips — block an IP (admin)
app.post('/api/admin/ips', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const { ip: targetIp, reason } = await c.req.json<{ ip?: string; reason?: string }>().catch(() => ({} as any));
  if (!targetIp || !/^[\d.:a-fA-Fx]{3,64}$/.test(targetIp)) return c.json({ error: 'Invalid IP' }, 400);
  await env.DB.prepare('INSERT OR REPLACE INTO blocked_ips (ip, reason) VALUES (?, ?)').bind(targetIp, reason?.slice(0, 200) || null).run();
  return c.json({ ok: true, ip: targetIp });
});

// DELETE /api/admin/ips — unblock an IP (admin)
app.delete('/api/admin/ips', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const { ip: targetIp } = await c.req.json<{ ip?: string }>().catch(() => ({} as any));
  if (!targetIp) return c.json({ error: 'Missing ip' }, 400);
  await env.DB.prepare('DELETE FROM blocked_ips WHERE ip = ?').bind(targetIp).run();
  return c.json({ ok: true, ip: targetIp });
});

// ---- SERVICE STATUS ----

// GET /api/status — public service status
app.get('/api/status', async (c) => {
  const env = c.env;
  const row = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();
  const enabled = !row || row.val === 1;
  return c.json({ enabled, sent_today: await getSentToday(env), daily_limit: SMTP_DAILY_LIMIT });
});

// POST /api/admin/toggle-service — toggle service on/off (admin)
app.post('/api/admin/toggle-service', async (c) => {
  const env = c.env;
  const ip = getClientIp(c);
  const { enabled } = await c.req.json<{ enabled?: boolean }>().catch(() => ({} as any));
  const val = enabled ? 1 : 0;
  await env.DB.prepare("INSERT OR REPLACE INTO counters (key, val) VALUES ('service_enabled', ?)").bind(val).run();
  return c.json({ ok: true, enabled: !!val });
});

// ---- GDPR ----
// Both endpoints require the inbox key (mnemonic or token): no unauthenticated access to any record.

app.get('/api/gdpr/export/:inboxId', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('inboxId');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';

  if (!/^[a-f0-9-]{16,64}$/i.test(inboxId)) return c.json({ error: 'Invalid inbox ID' }, 400);
  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    await logSecurityEvent(env, c.executionCtx, 'gdpr_unauthorized', 'GDPR export without valid key', getClientIp(c));
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }

  const inbox = await env.DB.prepare(
    'SELECT id, address, created_at, expires_at, e2ee, pubkey, privkey_enc FROM inboxes WHERE id = ?'
  ).bind(inboxId).first<any>();

  if (!inbox) return c.json({ error: 'Inbox not found' }, 404);

  const messages = await env.DB.prepare(
    'SELECT id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at, is_read FROM messages WHERE inbox_id = ?'
  ).bind(inboxId).all<any>();
  if (inbox.e2ee !== 1) {
    for (const m of messages.results) {
      const d = await decryptMessageFields(env, m);
      m.subject_enc = d.subject_enc;
      m.body_enc = d.body_enc;
      m.body_html = d.body_html;
      m.attachments_json = d.attachments_json;
    }
  }

  return c.json({
    export_date: new Date().toISOString(),
    service: 'VeilDrop',
    gdpr_notice: 'This export contains all data associated with this inbox.',
    inbox: {
      id: inbox.id,
      address: inbox.address,
      created_at: inbox.created_at,
      expires_at: inbox.expires_at,
      remaining_seconds: Math.max(0, inbox.expires_at - Math.floor(Date.now() / 1000)),
      e2ee: inbox.e2ee === 1,
      pubkey: inbox.pubkey || null,
      privkey_enc: inbox.privkey_enc || null,
      e2ee_note: inbox.e2ee === 1 ? 'This inbox is end-to-end encrypted. Message fields are stored encrypted with your public key (encv2: format). Only the holder of the mnemonic (or a client holding the unwrapped private key) can decrypt them. See https://veildrop.fr for the web client.' : null,
    },
    messages: messages.results.map((m: any) => ({
      id: m.id,
      from: m.from_address,
      subject: m.subject_enc,
      body_text: m.body_enc,
      body_html: m.body_html,
      attachments: m.attachments_json ? (() => { try { return JSON.parse(m.attachments_json).map((a: any) => ({ filename: a.filename, mimeType: a.mimeType, size: a.size, content_excluded: true })); } catch { return []; } })() : [],
      received_at: m.received_at,
      is_read: !!m.is_read,
    })),
    message_count: messages.results.length,
  });
});

app.post('/api/gdpr/delete/:inboxId', async (c) => {
  const env = c.env;
  const inboxId = c.req.param('inboxId');
  const key = c.req.query('key') || c.req.header('X-API-Key') || '';

  if (!/^[a-f0-9-]{16,64}$/i.test(inboxId)) return c.json({ error: 'Invalid inbox ID' }, 400);
  if (!await verifyMnemonicAccess(env, inboxId, key)) {
    await logSecurityEvent(env, c.executionCtx, 'gdpr_unauthorized', 'GDPR delete without valid key', getClientIp(c));
    return c.json({ error: 'Invalid or missing key.' }, 401);
  }
  const msgResult = await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inboxId).run();
  const inboxResult = await env.DB.prepare('DELETE FROM inboxes WHERE id = ?').bind(inboxId).run();
  await env.DB.prepare('DELETE FROM inbox_tokens WHERE inbox_id = ?').bind(inboxId).run();
  return c.json({
    ok: true,
    deleted_messages: msgResult.meta?.changes || 0,
    deleted_inbox: inboxResult.meta?.changes || 0,
    notice: 'All data has been permanently and irreversibly deleted.',
  });
});

// ---- MISC ----

app.get('/api/smtp-status', async (c) => {
  const env = c.env;
  const sentToday = await getSentToday(env);
  return c.json({
    sent_today: sentToday,
    daily_limit: SMTP_DAILY_LIMIT,
    remaining: Math.max(0, SMTP_DAILY_LIMIT - sentToday),
  });
});

app.get('/api/domains', (c) => {
  return c.json({ domains: c.env.DOMAINS.split(',').map((d: string) => d.trim()) });
});

app.get('/api/ttl-options', (c) => {
  return c.json({
    default: '10m',
    options: [
      { value: '10m', label: '10 minutes', seconds: 600 },
      { value: '1h', label: '1 hour', seconds: 3600 },
      { value: '1d', label: '1 day', seconds: 86400 },
      { value: '20d', label: '20 days', seconds: 1728000 },
    ]
  });
});

app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

export default app;
