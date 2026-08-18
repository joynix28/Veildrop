// VeilDrop - End-to-end encryption (Proton-style)
// Asymmetric scheme: the worker encrypts incoming mail with the inbox PUBLIC key
// (public keys cannot decrypt). The private key is stored wrapped with a key
// derived from the user's mnemonic (SHA-256). The server never sees the mnemonic
// and can therefore never decrypt e2ee messages — even with full DB access.
//
// Field format: "encv2:<b64(rsa_wrapped_data_key)>:<b64(iv)>:<b64(ciphertext)>"

const E2EE_PREFIX = 'encv2:';

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

export function isE2eeField(s: string | null): boolean {
  return !!s && s.startsWith(E2EE_PREFIX);
}

export function hasE2eeField(fields: Record<string, string | null>): boolean {
  return isE2eeField(fields.subject_enc) || isE2eeField(fields.body_enc) || isE2eeField(fields.body_html) || isE2eeField(fields.attachments_json);
}

export async function e2eeEncryptField(pubkeyB64: string, plaintext: string): Promise<string> {
  const spki = b64decode(pubkeyB64);
  const publicKey = await crypto.subtle.importKey(
    'spki',
    spki,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );

  const dataKey = crypto.getRandomValues(new Uint8Array(32));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await crypto.subtle.importKey('raw', dataKey, { name: 'AES-GCM' }, false, ['encrypt']), encoded);
  const wrappedKey = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, dataKey);

  return E2EE_PREFIX + b64encode(wrappedKey) + ':' + b64encode(iv) + ':' + b64encode(ciphertext);
}

export async function e2eeEncryptFields(
  pubkeyB64: string,
  fields: { subject_enc: string | null; body_enc: string; body_html: string | null; attachments_json: string | null }
): Promise<{ subject_enc: string | null; body_enc: string; body_html: string | null; attachments_json: string | null }> {
  const [subject, body, html, atts] = await Promise.all([
    fields.subject_enc ? e2eeEncryptField(pubkeyB64, fields.subject_enc) : Promise.resolve(null),
    e2eeEncryptField(pubkeyB64, fields.body_enc),
    fields.body_html ? e2eeEncryptField(pubkeyB64, fields.body_html) : Promise.resolve(null),
    fields.attachments_json ? e2eeEncryptField(pubkeyB64, fields.attachments_json) : Promise.resolve(null),
  ]);
  return { subject_enc: subject, body_enc: body, body_html: html, attachments_json: atts };
}

async function kekFromMnemonic(mnemonic: string): Promise<CryptoKey> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(mnemonic));
  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

// Used for API-created inboxes: the server generates the keypair and wraps the
// private key with a key derived from the mnemonic it just created. The mnemonic
// is returned once to the user and never stored.
export async function createE2eeKeypair(mnemonic: string): Promise<{ pubkey: string; privkey_enc: string }> {
  const pair = (await crypto.subtle.generateKey(
    { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['encrypt', 'decrypt']
  )) as CryptoKeyPair;
  const spki = (await crypto.subtle.exportKey('spki', pair.publicKey)) as ArrayBuffer;
  const pkcs8 = (await crypto.subtle.exportKey('pkcs8', pair.privateKey)) as ArrayBuffer;

  const kek = await kekFromMnemonic(mnemonic);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const wrapped = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, kek, pkcs8);

  return { pubkey: b64encode(spki), privkey_enc: b64encode(iv) + ':' + b64encode(wrapped) };
}