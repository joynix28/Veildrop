// VeilDrop - Email Handler

import PostalMime from 'postal-mime';
import type { Env } from './types';
import { encryptMessageFields } from './crypto/atrest';

async function handleEmail(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
  const to = message.to;
  if (!to) {
    message.reject('No recipient');
    return;
  }

  const rawBuffer = await new Response(message.raw).arrayBuffer();
  const parser = new PostalMime();
  const parsed = await parser.parse(rawBuffer);

  const inbox = await env.DB.prepare(
    'SELECT id, is_active, expires_at FROM inboxes WHERE address = ? AND is_active = 1'
  ).bind(to.toLowerCase()).first<{ id: string; is_active: number; expires_at: number }>();

  if (!inbox) return;

  if (inbox.expires_at < Math.floor(Date.now() / 1000)) {
    await env.DB.prepare('UPDATE inboxes SET is_active = 0 WHERE id = ?').bind(inbox.id).run();
    return;
  }

  const messageId = crypto.randomUUID();
  const bodyText = parsed.text || '';
  const bodyHtml = parsed.html || null;
  const subjectContent = parsed.subject || null;

  // Handle attachments
  let attachmentsJson = null;
  if (parsed.attachments && parsed.attachments.length > 0) {
    const attachments = parsed.attachments.map((att: any) => ({
      filename: att.filename || 'unnamed',
      mimeType: att.mimeType || 'application/octet-stream',
      size: att.content ? att.content.byteLength : 0,
      contentId: att.contentId || null,
      content: att.content ? btoa(String.fromCharCode(...new Uint8Array(att.content))) : null
    }));
    attachmentsJson = JSON.stringify(attachments);
  }

  const { subject_enc, body_enc, body_html, attachments_json } = await encryptMessageFields(env, {
    subject_enc: subjectContent,
    body_enc: bodyText,
    body_html: bodyHtml,
    attachments_json: attachmentsJson
  });

  await env.DB.prepare(
    'INSERT INTO messages (id, inbox_id, from_address, subject_enc, body_enc, body_html, attachments_json, received_at, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)'
  ).bind(
    messageId,
    inbox.id,
    message.from || 'unknown',
    subject_enc,
    body_enc,
    body_html,
    attachments_json,
    Math.floor(Date.now() / 1000)
  ).run();

  await env.DB.prepare(
    'UPDATE inboxes SET expires_at = MAX(expires_at, ?) WHERE id = ?'
  ).bind(
    Math.floor(Date.now() / 1000) + parseInt(env.DEFAULT_TTL_SECONDS || '3600'),
    inbox.id
  ).run();
}

export default { email: handleEmail };
