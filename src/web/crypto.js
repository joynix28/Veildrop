// VeilDrop - Crypto Module
// Client-side E2E encryption using Web Crypto API
// Zero-knowledge: keys NEVER leave the browser

const VeilCrypto = {
  wordlist: BIP39_WORDS,

  async loadWordlist() {
    return this.wordlist;
  },

  async generateMnemonic() {
    const wordlist = await this.loadWordlist();
    const words = [];
    const randomValues = new Uint32Array(15);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < 15; i++) {
      words.push(wordlist[randomValues[i] % wordlist.length]);
    }
    return words;
  },

  async deriveKey(mnemonic, salt) {
    const passphrase = mnemonic.join(' ');
    const encoder = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt || 'veildrop-salt-v1'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  },

  async encrypt(plaintext, key) {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encoder.encode(plaintext)
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode.apply(null, combined));
  },

  async decrypt(ciphertext, key) {
    var raw = atob(ciphertext);
    var combined = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
      combined[i] = raw.charCodeAt(i);
    }

    var iv = combined.slice(0, 12);
    var data = combined.slice(12);

    var decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );

    return new TextDecoder().decode(decrypted);
  },

  async inboxIdFromMnemonic(mnemonic) {
    var encoder = new TextEncoder();
    var data = encoder.encode(mnemonic.join('-'));
    var hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(function(b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  },

  async localPartFromMnemonic(mnemonic) {
    const inboxId = await this.inboxIdFromMnemonic(mnemonic);
    // Use first 16 chars of inboxId as username (deterministic, alphanumeric)
    return inboxId.slice(0, 16);
  },

  async hashForAuth(mnemonic) {
    var encoder = new TextEncoder();
    var data = encoder.encode('veildrop-auth-' + mnemonic.join('-'));
    var hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(function(b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  },

  b64(u8) {
    var bin = '';
    var chunk = 0x8000;
    for (var i = 0; i < u8.length; i += chunk) {
      bin += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
    }
    return btoa(bin);
  },

  fromB64(str) {
    var bin = atob(str);
    var u8 = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  },

  async kekFromMnemonic(mnemonic) {
    var hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(mnemonic.join(' ')));
    return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  },

  // Generate an RSA keypair for an E2EE inbox. The private key is wrapped with
  // a key derived from the mnemonic (SHA-256) and only the wrapped form is sent
  // to the server — the server can never unwrap it.
  async generateE2eeKeys(mnemonic) {
    var pair = await crypto.subtle.generateKey(
      { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['encrypt', 'decrypt']
    );
    var spki = new Uint8Array(await crypto.subtle.exportKey('spki', pair.publicKey));
    var pkcs8 = new Uint8Array(await crypto.subtle.exportKey('pkcs8', pair.privateKey));
    var kek = await this.kekFromMnemonic(mnemonic);
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var wrapped = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, kek, pkcs8));
    return {
      pubkey: this.b64(spki),
      privkey_enc: this.b64(iv) + ':' + this.b64(wrapped)
    };
  },

  async unwrapPrivateKey(privkey_enc, mnemonic) {
    var parts = privkey_enc.split(':');
    if (parts.length !== 2) throw new Error('Invalid wrapped private key');
    var kek = await this.kekFromMnemonic(mnemonic);
    var pkcs8 = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: this.fromB64(parts[0]) },
      kek,
      this.fromB64(parts[1])
    );
    return crypto.subtle.importKey('pkcs8', pkcs8, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt']);
  },

  // Decrypt a single encv2: field. Returns the field unchanged if it is not
  // encrypted (e.g. plaintext legacy fields), null if it cannot be decrypted.
  async e2eeDecryptField(privKey, field) {
    if (!field || typeof field !== 'string') return field;
    if (!field.startsWith('encv2:')) return field;
    if (!privKey) return null;
    var parts = field.split(':');
    if (parts.length !== 4) return null;
    var dk = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privKey,
      this.fromB64(parts[1])
    );
    var aesKey = await crypto.subtle.importKey('raw', dk, { name: 'AES-GCM' }, false, ['decrypt']);
    var plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: this.fromB64(parts[2]) },
      aesKey,
      this.fromB64(parts[3])
    );
    return new TextDecoder().decode(plain);
  },

  // Decrypt the fields of a message object { subject, body, body_html, attachments }
  // returned by the API for an E2EE inbox. Returns a copy with decrypted fields.
  async e2eeDecryptMessage(privKey, msg) {
    var out = Object.assign({}, msg);
    out.subject = await this.e2eeDecryptField(privKey, msg.subject);
    out.body = await this.e2eeDecryptField(privKey, msg.body);
    out.body_html = await this.e2eeDecryptField(privKey, msg.body_html);
    var atts = await this.e2eeDecryptField(privKey, msg.attachments);
    if (atts !== null && typeof atts === 'string') {
      try { out.attachments = JSON.parse(atts); } catch (e) { out.attachments = null; }
    }
    return out;
  }
};

window.VeilCrypto = VeilCrypto;
