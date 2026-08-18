// VeilDrop - Server-side crypto helpers (mirror of src/web/crypto.js)

import { BIP39_WORDS } from './bip39-words';

export function generateMnemonic(): string[] {
  const words: string[] = [];
  const randomValues = new Uint32Array(15);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < 15; i++) {
    words.push(BIP39_WORDS[randomValues[i] % BIP39_WORDS.length]);
  }
  return words;
}

export async function inboxIdFromMnemonic(words: string[]): Promise<string> {
  const data = new TextEncoder().encode(words.join('-'));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function isValidMnemonic(words: string[]): boolean {
  if (!Array.isArray(words) || words.length !== 15) return false;
  return words.every((w) => BIP39_WORDS.includes(w));
}

export function normalizeMnemonic(phrase: string): string[] | null {
  if (!phrase) return null;
  const words = phrase.trim().toLowerCase().split(/\s+/);
  if (words.length !== 15) return null;
  if (!isValidMnemonic(words)) return null;
  return words;
}