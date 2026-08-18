// VeilDrop - AES-256-GCM encryption at rest
// Key lives ONLY in worker secrets (DATA_ENCRYPTION_KEY), never in the database.
// Stored format: "enc:v1:<iv_base64>:<ciphertext_base64>" — anything else is legacy plaintext.

const PREFIX = 'enc:v1:';

function importKey(env: { DATA_ENCRYPTION_KEY?: string }): Promise<CryptoKey> {
  const hex = env.DATA_ENCRYPTION_KEY || '';
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return crypto.subtle.importKey('raw', bytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

function b64encode(buf: ArrayBuffer | Uint8Array): string {
  let bin = '';
  const arr = new Uint8Array(buf);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin);
}

function b64decode(s: string): Uint8Array {
  const bin = atob(s);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export async function encryptAtRest(env: { DATA_ENCRYPTION_KEY?: string }, plaintext: string): Promise<string> {
  if (!env.DATA_ENCRYPTION_KEY) return plaintext;
  const key = await importKey(env);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return PREFIX + b64encode(iv) + ':' + b64encode(ciphertext);
}

export async function decryptAtRest(env: { DATA_ENCRYPTION_KEY?: string }, stored: string): Promise<string> {
  if (!stored || !stored.startsWith(PREFIX)) return stored;
  const parts = stored.slice(PREFIX.length).split(':');
  if (parts.length !== 2) return stored;
  const key = await importKey(env);
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: b64decode(parts[0]) },
    key,
    b64decode(parts[1])
  );
  return new TextDecoder().decode(plaintext);
}

export async function encryptMessageFields(
  env: { DATA_ENCRYPTION_KEY?: string },
  m: { subject_enc: string | null; body_enc: string; body_html: string | null; attachments_json: string | null }
): Promise<{ subject_enc: string | null; body_enc: string; body_html: string | null; attachments_json: string | null }> {
  const [subject, body, html, atts] = await Promise.all([
    m.subject_enc ? encryptAtRest(env, m.subject_enc) : Promise.resolve(null),
    encryptAtRest(env, m.body_enc),
    m.body_html ? encryptAtRest(env, m.body_html) : Promise.resolve(null),
    m.attachments_json ? encryptAtRest(env, m.attachments_json) : Promise.resolve(null),
  ]);
  return { subject_enc: subject, body_enc: body, body_html: html, attachments_json: atts };
}

export async function decryptMessageFields(
  env: { DATA_ENCRYPTION_KEY?: string },
  m: { subject_enc: string | null; body_enc: string; body_html: string | null; attachments_json: string | null }
): Promise<{ subject_enc: string | null; body_enc: string; body_html: string | null; attachments_json: string | null }> {
  const [subject, body, html, atts] = await Promise.all([
    m.subject_enc ? decryptAtRest(env, m.subject_enc) : Promise.resolve(null),
    decryptAtRest(env, m.body_enc),
    m.body_html ? decryptAtRest(env, m.body_html) : Promise.resolve(null),
    m.attachments_json ? decryptAtRest(env, m.attachments_json) : Promise.resolve(null),
  ]);
  return { subject_enc: subject, body_enc: body, body_html: html, attachments_json: atts };
}