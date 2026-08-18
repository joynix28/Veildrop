// VeilDrop - SMTP client (SendPulse primary, SMTP2GO REST fallback handled in routes)

import { connect } from 'cloudflare:sockets';

export interface SmtpAttachment {
  filename: string;
  contentBase64: string;
  mimetype: string;
}

export interface SmtpEmail {
  to: string[];
  from: string;
  fromName?: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string;
  attachments?: SmtpAttachment[];
}

function b64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  const chunk = 8192;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

function encodeSubject(subject: string): string {
  // RFC 2047 encoded-word for non-ASCII subjects
  const clean = sanitizeHeaderValue(subject);
  if (/^[\x20-\x7e]*$/.test(clean)) return clean;
  return `=?UTF-8?B?${b64(clean)}?=`;
}

// Header-injection guard: CR/LF and control chars are never allowed in headers
function sanitizeHeaderValue(value: string, maxLength = 998): string {
  return value
    .replace(/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function buildMime(email: SmtpEmail): string {
  const boundary = 'vd_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  const lines: string[] = [];
  lines.push('From: ' + (email.fromName ? `${sanitizeHeaderValue(email.fromName, 200)} <${email.from}>` : email.from));
  lines.push('To: ' + email.to.map(t => sanitizeHeaderValue(t, 254)).join(', '));
  lines.push('Subject: ' + encodeSubject(email.subject));
  lines.push('Date: ' + new Date().toUTCString());
  lines.push(`Message-ID: <${crypto.randomUUID()}@veildrop.fr>`);
  lines.push('MIME-Version: 1.0');
  if (email.replyTo) lines.push('Reply-To: ' + sanitizeHeaderValue(email.replyTo, 254));
  if (email.inReplyTo) lines.push('In-Reply-To: ' + sanitizeHeaderValue(email.inReplyTo, 998));
  if (email.references) lines.push('References: ' + sanitizeHeaderValue(email.references, 998));
  lines.push('X-Mailer: VeilDrop');

  const hasAttachments = email.attachments && email.attachments.length > 0;
  const hasHtml = !!email.html;
  const bodyParts: string[] = [];

  if (hasHtml) {
    const altBoundary = 'vd_alt_' + Math.random().toString(36).slice(2);
    const altParts: string[] = [];
    if (email.text) {
      altParts.push(`--${altBoundary}\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64(email.text)}\r\n`);
    }
    altParts.push(`--${altBoundary}\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64(email.html || '')}\r\n`);
    altParts.push(`--${altBoundary}--\r\n`);
    bodyParts.push(`--${boundary}\r\nContent-Type: multipart/alternative; boundary="${altBoundary}"\r\n\r\n${altParts.join('')}\r\n`);
  } else if (email.text) {
    bodyParts.push(`--${boundary}\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64(email.text)}\r\n`);
  }

  if (hasAttachments && email.attachments) {
    for (const att of email.attachments) {
      const cleanName = sanitizeHeaderValue(att.filename || 'attachment', 255) || 'attachment';
      const safeName = cleanName.replace(/[^a-zA-Z0-9._ ()[\]-]/g, '_');
      const encodedName = /^[\x20-\x7e]*$/.test(cleanName) ? safeName : `=?UTF-8?B?${b64(cleanName)}?=`;
      const mimeType = sanitizeHeaderValue(att.mimetype || 'application/octet-stream', 100);
      bodyParts.push(`--${boundary}\r\nContent-Type: ${mimeType}; name="${encodedName}"\r\nContent-Disposition: attachment; filename="${encodedName}"\r\nContent-Transfer-Encoding: base64\r\n\r\n${att.contentBase64}\r\n`);
    }
  }

  if (hasAttachments || hasHtml) {
    lines.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
    lines.push('');
    lines.push(`This is a multi-part message in MIME format.`);
    lines.push(bodyParts.join(''));
    lines.push(`--${boundary}--`);
  } else {
    lines.push('Content-Type: text/plain; charset=utf-8');
    lines.push('Content-Transfer-Encoding: base64');
    lines.push('');
    lines.push(b64(email.text || ''));
  }
  return lines.join('\r\n');
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

interface SmtpSession {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  writer: WritableStreamDefaultWriter<Uint8Array>;
  decoder: TextDecoder;
  buffer: string;
}

async function smtpReadLine(session: SmtpSession, timeoutMs: number): Promise<string | null> {
  const deadline = Date.now() + timeoutMs;
  while (true) {
    const idx = session.buffer.indexOf('\n');
    if (idx !== -1) {
      const line = session.buffer.slice(0, idx).replace(/\r$/, '');
      session.buffer = session.buffer.slice(idx + 1);
      return line;
    }
    if (Date.now() > deadline) return null;
    const remaining = deadline - Date.now();
    const result = await Promise.race([
      session.reader.read(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('SMTP read timeout')), Math.max(remaining, 1))),
    ]);
    if (result.done) return null;
    session.buffer += session.decoder.decode(result.value, { stream: true });
  }
}

class SmtpClient {
  private socket: any;
  private session: SmtpSession | null = null;

  constructor(host: string, port: number, secureTransport: string) {
    this.socket = connect({ hostname: host, port, secureTransport } as any);
  }

  async open(): Promise<void> {
    const writer = this.socket.writable.getWriter();
    const reader = this.socket.readable.getReader();
    this.session = {
      reader,
      writer,
      decoder: new TextDecoder(),
      buffer: '',
    };
  }

  async send(cmd: string): Promise<void> {
    if (!this.session) throw new Error('no session');
    await this.session.writer.write(new TextEncoder().encode(cmd + '\r\n'));
  }

  async expect(codes: number[], timeoutMs = 20000): Promise<string> {
    if (!this.session) throw new Error('no session');
    let line = await smtpReadLine(this.session, timeoutMs);
    if (line === null) throw new Error('SMTP connection closed');
    // SMTP multi-line responses: continuation lines start with "250-" (dash).
    // Consume them all until the final line "250 <text>".
    while (line.length >= 4 && line[3] === '-') {
      const next = await smtpReadLine(this.session, timeoutMs);
      if (next === null) throw new Error('SMTP connection closed (multi-line)');
      line = next;
    }
    const code = parseInt(line.slice(0, 3), 10);
    if (!codes.includes(code)) throw new Error(`SMTP ${code}: ${line}`);
    return line;
  }

  async startTlsUpgrade(): Promise<void> {
    if (!this.session) throw new Error('no session');
    this.socket = this.socket.startTls();
    await this.open();
  }

  async authenticate(user: string, pass: string): Promise<void> {
    await this.send('AUTH LOGIN');
    await this.expect([334]);
    await this.send(b64(user));
    await this.expect([334]);
    await this.send(b64(pass));
    await this.expect([235]);
  }

  async sendEmail(email: SmtpEmail): Promise<void> {
    if (!this.session) throw new Error('no session');
    await this.send(`MAIL FROM:<${email.from}>`);
    await this.expect([250]);

    for (const to of email.to) {
      await this.send(`RCPT TO:<${to}>`);
      await this.expect([250, 251]);
    }

    const mime = buildMime(email);
    await this.send('DATA');
    await this.expect([354]);
    await this.session.writer.write(new TextEncoder().encode(mime + '\r\n.\r\n'));
    await this.expect([250]);

    await this.send('QUIT');
    try { await this.session.reader.cancel(); } catch { /* ignore */ }
    try { await this.session.writer.close(); } catch { /* ignore */ }
  }

  async close(): Promise<void> {
    try { this.socket.close(); } catch { /* ignore */ }
  }
}

export async function sendViaSendPulse(cfg: SmtpConfig, email: SmtpEmail): Promise<{ ok: boolean; detail?: string }> {
  const attempts: string[] = [];

  // Try STARTTLS on 587, then implicit TLS on 465, then plaintext on 2525
  const strategies: Array<{ port: number; secureTransport: string; starttls: boolean }> = [
    { port: 587, secureTransport: 'starttls', starttls: true },
    { port: 465, secureTransport: 'on', starttls: false },
    { port: 2525, secureTransport: 'off', starttls: false },
  ];

  for (const strat of strategies) {
    let client: SmtpClient | null = null;
    try {
      client = new SmtpClient(cfg.host, strat.port, strat.secureTransport);
      await client.open();

      const greeting = await client.expect([220], 15000);
      if (!greeting.startsWith('220')) throw new Error('bad greeting: ' + greeting);

      await client.send(`EHLO ${cfg.host}`);
      await client.expect([250], 20000);

      if (strat.starttls) {
        await client.send('STARTTLS');
        const stls = await client.expect([220], 20000);
        if (!stls.startsWith('220')) throw new Error('STARTTLS rejected: ' + stls);
        await client.startTlsUpgrade();
        await client.send(`EHLO ${cfg.host}`);
        await client.expect([250], 20000);
      }

      await client.authenticate(cfg.user, cfg.pass);
      await client.sendEmail(email);
      await client.close();
      return { ok: true };
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e);
      attempts.push(`port ${strat.port} (${strat.secureTransport}): ${detail}`);
      if (client) { try { await client.close(); } catch { /* ignore */ } }
    }
  }

  return { ok: false, detail: attempts.join(' | ') };
}