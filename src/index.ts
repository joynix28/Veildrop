// VeilDrop - Main Entry Point

import { Hono } from 'hono';
import PostalMime from 'postal-mime';
import type { Env } from './types';
import apiRoutes from './api/routes';
import { logSecurityEvent } from './api/security';
import { encryptMessageFields } from './crypto/atrest';
import { e2eeEncryptFields } from './crypto/e2ee';
import { sendViaSendPulse } from './smtp';

const app = new Hono<{ Bindings: Env }>();

const MAX_REQUEST_BODY = 25 * 1024 * 1024; // 25 MB cap for /api/* bodies

// Legal contact addresses (LCEN art. 6-III / DSA art. 11): emails sent to these
// are forwarded to the operator's real mailbox instead of being dropped.
// Set OPERATOR_EMAIL in your wrangler.toml [vars] (your real mailbox).
const OPERATOR_EMAIL = (env: Env) => env.OPERATOR_EMAIL || 'contact@veildrop.fr';
const LEGAL_CONTACT_ADDRESSES = new Set([
  'contact', 'abuse', 'report', 'legal', 'security', 'support',
  'postmaster', 'hostmaster', 'admin', 'privacy'
]);

const ALLOWED_ORIGINS = [
  'https://veildrop.fr',
  'https://report.veildrop.fr',
  'https://link2me.info',
  'https://link2me.online',
  'https://link2me.store',
  'https://veildrop.pages.dev',
];

// Security headers
app.use('*', async (c, next) => {
  await next();
  const origin = c.req.header('Origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    c.res.headers.set('Access-Control-Allow-Origin', origin);
    c.res.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
  c.res.headers.set('Access-Control-Max-Age', '86400');
  c.res.headers.set('X-Content-Type-Options', 'nosniff');
  c.res.headers.set('X-Frame-Options', 'DENY');
  c.res.headers.set('Referrer-Policy', 'no-referrer');
  c.res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  c.res.headers.set('X-XSS-Protection', '1; mode=block');
  c.res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  c.res.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  c.res.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://raw.githubusercontent.com; frame-ancestors 'none';");
});

// Block banned IPs (admin-managed) + body size limit
app.use('/api/*', async (c, next) => {
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || '';
  if (ip) {
    const banned = await c.env.DB.prepare('SELECT ip, reason FROM blocked_ips WHERE ip = ?').bind(ip).first<{ ip: string; reason: string | null }>();
    if (banned) {
      await logSecurityEvent(c.env, c.executionCtx, 'blocked_ip_hit', `Blocked IP attempted request (${banned.reason || 'no reason'})`, ip);
      return c.json({ error: 'Access denied' }, 403);
    }
  }
  const contentLength = Number(c.req.header('content-length') || 0);
  if (contentLength > MAX_REQUEST_BODY) {
    return c.json({ error: 'Request body too large' }, 413);
  }
  await next();
});

app.options('*', (c) => {
  const origin = c.req.header('Origin');
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : '';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin || ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Credentials': 'true',
    }
  });
});

app.route('/', apiRoutes);

app.get('*', async (c) => {
  const path = new URL(c.req.url).pathname;
  if (path === '/api' || path === '/api/') {
    return c.env.ASSETS.fetch(new Request(c.req.url.replace(/\/api\/?$/, '/api.html')));
  }
  try {
    const res = await c.env.ASSETS.fetch(c.req.raw);
    return new Response(res.body, { status: res.status, headers: res.headers });
  } catch (e) {
    return new Response('not found', { status: 404 });
  }
});

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize) as any);
  }
  return btoa(binary);
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\son\w+\s*=\s*\S+/gi, '')
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
    .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""')
    .replace(/(href|action)\s*=\s*["']data:[^"']*["']/gi, 'href="#"')
    .replace(/<(iframe|object|embed|form|input|button|select|textarea)\b[^>]*>/gi, '')
    .replace(/<\/(iframe|object|embed|form|input|button|select|textarea)>/gi, '')
    .replace(/<base\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*http-equiv\s*=\s*["']refresh["'][^>]*>/gi, '');
}

function isZipBombDetected(filename: string, contentBase64: string, mimeType: string): boolean {
  const decodedSize = Math.ceil(contentBase64.length * 0.75);
  const ARCHIVE_TYPES = ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/gzip', 'application/x-tar'];
  if (ARCHIVE_TYPES.includes(mimeType) && decodedSize > 5 * 1024 * 1024) return true;
  if (decodedSize > 10 * 1024 * 1024) return true;
  return false;
}

async function handleEmail(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
  const to = message.to;
  if (!to) { message.reject('No recipient'); return; }

  // Global service OFF: drop incoming mail silently (no bounce, no storage).
  const svcRow = await env.DB.prepare("SELECT val FROM counters WHERE key = 'service_enabled'").first<{ val: number }>();
  if (svcRow && svcRow.val === 0) {
    console.log('Email dropped: service disabled');
    return;
  }

  const rawBuffer = await new Response(message.raw).arrayBuffer();
  const parser = new PostalMime();
  const parsed = await parser.parse(rawBuffer);

  // Legal contact point: forward contact@/abuse@/etc. to the operator's mailbox
  const localPart = to.split('@')[0].toLowerCase();
  const toDomain = to.split('@')[1] ? to.split('@')[1].toLowerCase() : '';
  const allowedDomains = env.DOMAINS ? env.DOMAINS.split(',').map((d: string) => d.trim()) : [];
  if (LEGAL_CONTACT_ADDRESSES.has(localPart) && allowedDomains.includes(toDomain)) {
    const fwdSubject = `[VeilDrop ${localPart}@${toDomain}] ${parsed.subject || '(no subject)'}`;
    const fwdText = `From: ${message.from || 'unknown'}\nSubject: ${parsed.subject || ''}\n\n${parsed.text || '(empty body)'}\n\n--\nAttachments are not forwarded. Please use the report form at https://report.veildrop.fr for file uploads.`;
    try {
      const fwd = await sendViaSendPulse(
        {
          host: env.SENDPULSE_SMTP_HOST || 'smtp-pulse.com',
          port: parseInt(env.SENDPULSE_SMTP_PORT || '465', 10),
          user: env.SENDPULSE_SMTP_USER,
          pass: env.SENDPULSE_SMTP_PASS,
        },
        {
          to: [OPERATOR_EMAIL(env)],
          from: `noreply@${toDomain}`,
          subject: fwdSubject.slice(0, 998),
          text: fwdText.slice(0, 100000),
          replyTo: message.from || undefined,
        }
      );
      console.log(`Legal contact forward ${localPart}@${toDomain} -> ${fwd.ok ? 'ok' : 'failed'}`);
      await logSecurityEvent(env, ctx, 'contact_email', `Forwarded ${localPart}@${toDomain} from ${message.from || 'unknown'}`, '');
    } catch (e) {
      console.error('Legal contact forward error:', e);
    }
    return;
  }

  const inbox = await env.DB.prepare(
    'SELECT id, is_active, expires_at, e2ee, pubkey FROM inboxes WHERE address = ? AND is_active = 1'
  ).bind(to.toLowerCase()).first<{ id: string; is_active: number; expires_at: number; e2ee: number; pubkey: string | null }>();

  if (!inbox) return;

  const messageId = crypto.randomUUID();
  const bodyText = parsed.text || '';
  const bodyHtml = parsed.html ? sanitizeHtml(parsed.html) : null;
  const subjectContent = parsed.subject || null;

  let attachmentsJson = null;
  if (parsed.attachments && parsed.attachments.length > 0) {
    const attachments: any[] = [];
    let totalDecodedSize = 0;
    const MAX_TOTAL_DECODED = 15 * 1024 * 1024;
    for (const att of parsed.attachments) {
      const contentBase64 = att.content ? arrayBufferToBase64(att.content) : null;
      const sizeBytes = att.content ? att.content.byteLength : 0;
      if (sizeBytes > 5 * 1024 * 1024) continue;
      if (contentBase64 && isZipBombDetected(att.filename || 'unknown', contentBase64, att.mimeType || '')) {
        console.warn(`Zip bomb detected: ${att.filename || 'unknown'} (${att.mimeType || 'unknown'}, decoded ~${Math.ceil(contentBase64.length * 0.75)} bytes)`);
        continue;
      }
      totalDecodedSize += sizeBytes;
      if (totalDecodedSize > MAX_TOTAL_DECODED) break;
      attachments.push({
        filename: att.filename || 'unnamed',
        mimeType: att.mimeType || 'application/octet-stream',
        size: sizeBytes,
        contentId: att.contentId || null,
        content: contentBase64
      });
    }
    if (attachments.length > 0) attachmentsJson = JSON.stringify(attachments);
  }

  const encrypted = inbox.e2ee && inbox.pubkey
    ? await e2eeEncryptFields(inbox.pubkey, {
        subject_enc: subjectContent,
        body_enc: bodyText,
        body_html: bodyHtml,
        attachments_json: attachmentsJson
      })
    : await encryptMessageFields(env, {
        subject_enc: subjectContent,
        body_enc: bodyText,
        body_html: bodyHtml,
        attachments_json: attachmentsJson
      });
  const { subject_enc, body_enc, body_html, attachments_json } = encrypted;

  try {
    await env.DB.prepare(
      'INSERT INTO messages (id, inbox_id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)'
    ).bind(messageId, inbox.id, message.from || 'unknown', subject_enc, body_enc, body_html, attachments_json, Math.floor(Date.now() / 1000)).run();
  } catch (e) {
    console.error('Failed to store message:', e);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return app.fetch(request, env, ctx);
  },
  async email(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
    return handleEmail(message, env, ctx);
  },
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    // Cron: purge expired inboxes + orphaned messages every hour
    const now = Math.floor(Date.now() / 1000);

    // 1. Delete messages of expired inboxes
    const expiredInboxes = await env.DB.prepare(
      'SELECT id FROM inboxes WHERE expires_at < ? AND is_active = 1'
    ).bind(now).all<{ id: string }>();

    for (const inbox of expiredInboxes.results) {
      await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inbox.id).run();
      await env.DB.prepare('UPDATE inboxes SET is_active = 0 WHERE id = ?').bind(inbox.id).run();
    }

    // 2. Hard-delete inboxes inactive for more than 24h (fully purge from DB)
    const staleThreshold = now - 86400;
    const staleInboxes = await env.DB.prepare(
      'SELECT id FROM inboxes WHERE is_active = 0 AND expires_at < ?'
    ).bind(staleThreshold).all<{ id: string }>();

    for (const inbox of staleInboxes.results) {
      await env.DB.prepare('DELETE FROM messages WHERE inbox_id = ?').bind(inbox.id).run();
      await env.DB.prepare('DELETE FROM inboxes WHERE id = ?').bind(inbox.id).run();
      await env.DB.prepare('DELETE FROM inbox_tokens WHERE inbox_id = ?').bind(inbox.id).run();
      await env.DB.prepare('DELETE FROM inbox_hashes WHERE hash IN (SELECT hash FROM inbox_hashes WHERE created_at < ?)').bind(staleThreshold).run();
    }

    // 3. Purge old rate limits (>2h) and old counters (>2 days)
    await env.DB.prepare('DELETE FROM rate_limits WHERE timestamp < ?').bind(now - 7200).run();

    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0, 10);
    await env.DB.prepare('DELETE FROM counters WHERE key LIKE ? AND key < ?').bind('smtp-sent:%', `smtp-sent:${twoDaysAgo}`).run();

    console.log(`Cleanup: ${expiredInboxes.results.length} expired, ${staleInboxes.results.length} hard-deleted`);
  }
};
