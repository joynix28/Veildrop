#!/usr/bin/env node
// VeilDrop configuration injector.
// Replaces the YOUR_... placeholders in wrangler.toml with real values.
// Usage:
//   node scripts/configure.mjs \
//     --account-id  <id> \
//     --d1-id      <id> \
//     --domains    "veildrop.fr,link2me.info" \
//     --smtp-user  <user> \
//     --smtp-pass  <pass> \
//     --admin-key  <keyword> \
//     --webhook    <discord-webhook-url> \
//     --operator   <operator@mailbox>
// Any flag may be omitted; its placeholder is left untouched.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOML = path.join(ROOT, 'wrangler.toml');

const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : undefined;
};

const replacements = {
  YOUR_ACCOUNT_ID: get('--account-id'),
  YOUR_D1_DATABASE_ID: get('--d1-id'),
  YOUR_SENDPULSE_SMTP_USER: get('--smtp-user'),
  YOUR_SENDPULSE_SMTP_PASS: get('--smtp-pass'),
  YOUR_ADMIN_KEYWORD: get('--admin-key'),
  YOUR_DISCORD_WEBHOOK_URL: get('--webhook'),
  YOUR_REAL_MAILBOX: get('--operator'),
};

let content = readFileSync(TOML, 'utf8');
let changed = 0;

for (const [placeholder, value] of Object.entries(replacements)) {
  if (value === undefined) continue;
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const before = content;
  content = content.split(placeholder).join(escaped);
  if (content !== before) changed++;
}

writeFileSync(TOML, content);

const remaining = content.match(/YOUR_[A-Z_]+/g) || [];
console.log(`wrangler.toml updated: ${changed} value(s) injected.`);
if (remaining.length) {
  console.log(`Placeholders still remaining: ${[...new Set(remaining)].join(', ')}`);
} else {
  console.log('All placeholders filled — ready to deploy.');
}