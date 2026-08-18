// VeilDrop - Security event logging (attack telemetry → Discord webhook)

import type { Env } from '../types';

// Never log sensitive content — only event type, IP and a short detail.
export async function logSecurityEvent(
  env: Env,
  ctx: { waitUntil(p: Promise<any>): void },
  type: string,
  detail: string,
  ip: string
): Promise<void> {
  try {
    const key = `seclog:${type}:${ip}`;
    const now = Math.floor(Date.now() / 1000);
    // At most one event per type+IP per 10 minutes (prevents webhook spam during attacks)
    const existing = await env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM rate_limits WHERE key = ? AND timestamp > ?'
    ).bind(key, now - 600).first<{ cnt: number }>();
    if (existing && existing.cnt >= 1) return;
    await env.DB.prepare('INSERT INTO rate_limits (id, key, timestamp) VALUES (?, ?, ?)')
      .bind(crypto.randomUUID(), key, now).run();

    const embed = {
      title: '🛡️ Security Event — VeilDrop',
      color: 0xe67e22,
      fields: [
        { name: 'Type', value: type.slice(0, 200), inline: true },
        { name: 'IP', value: ip.slice(0, 64), inline: true },
        { name: 'Detail', value: detail.slice(0, 1024), inline: false },
      ],
      footer: { text: new Date().toISOString() },
      timestamp: new Date().toISOString(),
    };

    ctx.waitUntil(fetch(env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    }).catch(() => {}));
  } catch (e) {
    console.error('Security log failed:', e);
  }
}

// Header-injection guard: strip CR/LF and control chars from any value that
// will be placed into an email header or a Discord embed.
export function sanitizeHeaderValue(value: string, maxLength = 998): string {
  return value
    .replace(/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}