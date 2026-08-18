# 🛡️ VeilDrop — End-to-End Encrypted Temporary Email

**Votre Vie Privée, Livrée.** / **Your Privacy, Delivered.**

VeilDrop is a **100% free, open source, end-to-end encrypted temporary email service**. Create a disposable inbox in one second — no registration, no cookies, no trackers — receive AND send emails, and let everything self-destruct (10 minutes by default, up to 20 days).

The operator **cannot read your messages**: encryption keys are generated in your browser and never leave it. The server only ever stores ciphertext.

🔗 **Live site:** https://veildrop.fr · 🐛 **Report abuse:** https://report.veildrop.fr · 📖 **API docs:** https://veildrop.fr/api · 💬 **Discord:** https://discord.gg/BxDXa8c2vE

---

## ⚡ Deploy in 2 clicks

### Cloudflare Workers (recommended — full worker + D1 + assets)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/joynix28/Veildrop)

1. Click the button → log in with your Cloudflare account
2. Let it clone, install, and deploy — done

Then follow [Configuration](#configuration) (D1 database, variables, SMTP, domain).

### Cloudflare Pages

Pages can serve this project too (the Worker runs as a Pages Function):

```bash
git clone https://github.com/joynix28/Veildrop.git
cd Veildrop
npm install
npx wrangler pages deploy src/web --project-name veildrop
```

> Note: the worker code (API + Email Routing handler) requires a **Workers** deployment for full functionality (Email Routing catch-all → worker). For Pages-only, see [Pages mode](#pages-mode).

### GitHub Actions (auto-deploy on push)

The repository includes `.github/workflows/deploy.yml`: fork it, add your `CLOUDFLARE_API_TOKEN` secret, and every push to `main` deploys automatically.

---

## 🧠 The concept

Every online signup costs you a piece of your data — or a mailbox drowning in spam. VeilDrop fixes that:

- **Create** a disposable address in one second (random, or your own custom username).
- **Use** it to sign up anywhere, receive emails, read them, even send replies with attachments.
- **Vanish** — messages are destroyed **the moment you read them** (read-once), and the whole inbox self-destructs after its lifespan: **10 minutes by default**, up to 20 days (extendable at any time).

No account. No password. Your **15-word BIP39 recovery phrase** (generated in your browser with cryptographic randomness) is the key to your inbox — exactly like a hardware wallet. Lose the phrase, lose the inbox: that's the point.

**Why the default is 10 minutes:** the shorter the data lives, the less there is to leak. You can extend to 1 hour, 1 day or 20 days whenever you need more time.

---

## ✨ Features

| Feature | Details |
|---|---|
| 💯 Free forever | No ads, no paid tiers, no hidden limits |
| 🔑 No registration | No account, no password, no email — a 15-word mnemonic is your key |
| 🍪 No cookies / no trackers | Zero analytics, zero fingerprinting, `Cache-Control: no-store` |
| 🔐 End-to-end encryption | RSA-OAEP-2048/SHA-256 + AES-256-GCM, keys generated in your browser (WebCrypto) |
| 🕐 Auto-destruct | Messages erased **on read**; inbox expires after 10 min (default) / 1 h / 1 d / 20 d |
| 📤 Send & receive | Real SMTP (SendPulse primary, SMTP2GO fallback), 10 recipients, rich editor, 10 attachments (7 MB) |
| 📬 Custom address | Choose your own username (min 3 chars) on any of the 4 domains |
| 🌐 4 domains | `veildrop.fr`, `link2me.info`, `link2me.online`, `link2me.store` |
| 🇫🇷🇬🇧 Bilingual | Full FR/EN interface (371 i18n keys) |
| 📡 Free API | REST, keyless — your mnemonic IS the key (see [API](#-api)) |
| ⚖️ Legal-ready | LCEN (6-I-2, 6-II, 6.I.7), DSA (EU 2022/2065 art. 16), GDPR — EU-hosted data (Cloudflare D1, London) |
| 🛡️ Abuse handling | report.veildrop.fr form, abuse@/anonymous@veildrop.fr, moderation, judicial cooperation |
| 🚦 Anti-abuse | Per-IP rate limits, daily SMTP quota, zip-bomb detection, reserved addresses, IP blocking, global kill-switch |

---

## 🔐 Security model (exact protocol)

```
Browser (WebCrypto)                  Server (Cloudflare Workers)
─────────────────────                ────────────────────────────
1. Generate RSA-OAEP-2048 keypair    ◄── pubkey (SPKI) sent, stored
2. Wrap private key:                  │
   AES-256-GCM(KEK = SHA-256(mnemonic))
   → privkey_enc = b64(iv):b64(ct)  ──► stored, server can't unlock it
                                      │
3. Incoming email arrives via SMTP    │
   → worker encrypts with PUBKEY:     │   (public keys can't decrypt!)
   encv2:<b64(rsa_wrapped_dk)>:<b64(iv)>
        :<b64(aes-256-gcm_ct)>
   → stored as ciphertext            ──► even full DB access = useless
```

- **Mnemonic:** 15 words from the BIP39 list (2048 words). `inbox_id = SHA-256(words.join('-'))` — deterministic, so the phrase finds the inbox with no server lookup.
- **Non-E2EE inboxes:** fields are encrypted at rest server-side (AES-256-GCM).
- **Read-once:** opening a message deletes it from the server instantly (web UI and API).
- **Transport:** TLS 1.3 (Cloudflare edge), HSTS preload, strict CSP, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, COOP/CORP same-origin.
- **Every outgoing email** carries an automatic anti-abuse notice: sent anonymously via VeilDrop, reply path, abuse link.

---

## ⚖️ Legal & compliance

- **Status:** non-professional individual project by an independent developer (France, EU).
- **LCEN:** hosting provider within the meaning of art. 6-I-2 (no editorial control), no general monitoring obligation (6-II), removal of manifestly illegal content (6.I.7).
- **DSA (EU Regulation 2022/2065):** electronic point of contact, notice-and-action procedure, typical response 24–48 h (art. 16).
- **GDPR:** data minimization (no accounts), data retention limited to the chosen TTL, automated **export** (`GET /api/gdpr/export/:inboxId`) and **erasure** (`POST /api/gdpr/delete/:inboxId`), EU-region storage (Cloudflare D1, London).
- **Legal addresses:** `contact@veildrop.fr`, `abuse@veildrop.fr`, `anonymous@veildrop.fr` — plus 7 contact points listed on the /legal page.
- **E2EE limitation (assumed):** encrypted inboxes cannot be inspected (that's the principle); abuse reports then rely on sender address, subject and context.
- **Forbidden uses:** fraud, phishing, deliberate spam, illegal content — enforced by moderation (blocked addresses, banned IPs) and judicial cooperation.

Full legal pages are served on the site: `/terms`, `/privacy`, `/legal`, `/faq`, `/help`, `/contact`, `/abuse`.

---

## 📡 API

Keyless REST API — your 15-word mnemonic (or an access token) IS the key, passed as `?key=` or `X-API-Key`.

| Method | Endpoint | Effect |
|---|---|---|
| POST | `/api/v1/inbox` | Create an inbox (optional `mnemonic` → fixed address/restore, `ttl`, `custom_address`, `pubkey`/`privkey_enc` for E2EE) |
| GET | `/api/v1/mail?key=` | List messages (metadata only) |
| GET | `/api/v1/mail/:messageId?key=` | Read full message — **read-once: deleted after delivery** |
| POST | `/api/v1/send?key=` | Send email from the inbox address (`to`, `subject`, `body`, `body_html`, `attachments`) |
| POST | `/api/v1/extend?key=` | Extend TTL (`ttl`: `10m` / `1h` / `1d` / `20d`) |
| DELETE | `/api/v1/mail?key=` | Burn the inbox permanently |
| GET | `/api/v1/status` | Service status, quotas, domains, endpoints |

Legacy endpoints (`inbox_id` in URL): `POST /api/inbox`, `POST /api/inbox/:id/restore`, `GET /api/inbox/:id/messages`, `GET /api/inbox/:id/message/:messageId`, `POST /api/inbox/:id/read`, `POST /api/send`, `DELETE /api/inbox/:id/message/:messageId`.

Utilities: `GET /api/status`, `/api/health`, `/api/smtp-status`, `/api/domains`, `/api/ttl-options`, `POST /api/abuse`.

Full documentation: https://veildrop.fr/api

---

## 🚀 Local development

**Prerequisites:** Node.js ≥ 18, npm ≥ 9, a Cloudflare account (free), optionally a SendPulse (or SMTP2GO) SMTP account.

### One-command setup (recommended)

| OS | Command |
|---|---|
| Linux / macOS | `./scripts/setup.sh` |
| macOS (double-click) | `setup.command` |
| Windows (PowerShell) | `.\scripts\setup.ps1` |
| Windows (legacy) | `scripts\setup.bat` |

Each script walks you through everything step by step: checks Node/npm, installs dependencies, creates the D1 database, applies the schema, asks for your configuration values (domains, SMTP, admin keyword, Discord webhook, operator mailbox), and deploys.

### Manual setup

```bash
git clone https://github.com/joynix28/Veildrop.git
cd Veildrop
npm install

# 1. Create the D1 database
npx wrangler d1 create veildrop-db
# → copy the database_id into wrangler.toml ([[d1_databases]])

# 2. Apply the schema
npm run db:init

# 3. Fill [vars] in wrangler.toml (see Configuration below)

# 4. Test locally
npm run dev          # http://localhost:8787

# 5. Deploy
npm run deploy
```

### Configuration

| Variable | Description | Required |
|---|---|---|
| `account_id` | Your Cloudflare account ID | ✅ |
| `database_id` | Your D1 database ID (from `wrangler d1 create`) | ✅ |
| `DOMAINS` | Comma-separated domains for inbox generation | ✅ |
| `SENDPULSE_SMTP_USER` / `SENDPULSE_SMTP_PASS` | SMTP credentials for outbound email (SendPulse; SMTP2GO as fallback) | ✅ |
| `ADMIN_KEYWORD` | Secret passphrase for the /admin panel | ✅ |
| `DISCORD_WEBHOOK` | Discord webhook for security events & abuse reports | optional |
| `OPERATOR_EMAIL` | Your real mailbox receiving emails sent to legal addresses (contact@, abuse@…) | optional |
| `DEFAULT_TTL_SECONDS` / `MAX_MESSAGE_SIZE` | Defaults (3600 / 5242880) | optional |

> ⚠️ **Never commit your real secrets.** The repository's `wrangler.toml` contains placeholders (`YOUR_...`). Keep your real config in a gitignored file (e.g. `wrangler.toml.production`) if you manage several environments.

### Email Routing (receiving mail)

In the Cloudflare dashboard: your domain → **Email** → **Email Routing**:
1. Enable Email Routing.
2. Add a **catch-all rule → Send to Worker → `veildrop`** (this is how inbound mail reaches the worker).
3. Add literal rules for your legal addresses (`contact@`, `abuse@`, `anonymous@`) → forward directly to your real mailbox (the worker also handles them as fallback).

### Pages mode

If you deploy only the static front-end to Pages (no Email Routing, no API), the site still renders and the in-browser demo flows work against any deployed API:

```bash
npx wrangler pages deploy src/web --project-name veildrop
```

The repo also includes `src/web/functions/api/[[path]].js`, a Pages Functions stub, if you want to proxy API calls through Pages (adapt the upstream URL to your worker).

---

## 📁 Project structure

```
Veildrop/
├── src/
│   ├── index.ts              # Worker entry: Email Routing handler, SPA fallback, CORS, security
│   ├── api/
│   │   ├── routes.ts         # All API routes (v1 + legacy + admin + GDPR + abuse)
│   │   └── security.ts       # Security events, Discord notifications, admin auth
│   ├── crypto/
│   │   ├── e2ee.ts           # E2EE: RSA-OAEP-2048 + AES-256-GCM (encv2 format)
│   │   ├── atrest.ts         # Server-side at-rest encryption
│   │   ├── mnemonic.ts       # 15-word BIP39 mnemonics → inbox IDs
│   │   └── bip39-words.ts    # BIP39 wordlist (2048 words)
│   ├── smtp.ts               # Raw SMTP client (SendPulse)
│   ├── email-handler.ts      # (legacy) inbound parsing — superseded by index.ts
│   ├── types.ts              # Env bindings & types
│   └── web/                  # Static assets (SPA front-end)
│       ├── index.html        # SEO meta, JSON-LD, OG tags
│       ├── app.js            # The whole SPA (i18n EN/FR, crypto, UI)
│       ├── crypto.js         # Browser-side WebCrypto (client E2EE)
│       ├── wordlist.js       # BIP39 wordlist (browser)
│       ├── styles.css, _headers, robots.txt, sitemap.xml, manifest.json
│       ├── og-image.png, icon-512.png, favicon.ico
│       ├── api.html          # API documentation page
│       └── functions/        # Pages Functions stub
├── report-site/              # report.veildrop.fr (abuse reporting form, Cloudflare Pages)
├── scripts/
│   ├── setup.sh              # Linux/macOS step-by-step setup
│   ├── setup.ps1             # Windows PowerShell setup
│   ├── setup.bat             # Windows batch setup
│   └── setup.command         # macOS double-click launcher
├── .github/workflows/deploy.yml  # Auto-deploy on push
├── schema.sql                # D1 database schema
├── wrangler.toml             # Worker configuration (placeholders)
├── LICENSE                   # VeilDrop Open Source License v1.0
├── VEILDROP-PRESENTATION.md  # Full factual presentation (EN/FR) + ready-made ads
└── PUBLICITE.md              # Promotional copy
```

---

## 📄 Documentation files

- **`VEILDROP-PRESENTATION.md`** — the complete factual presentation: architecture, exact limits, crypto protocol, legal texts, API table, 7 ready-to-post ad variants, an AI rewrite prompt, and a precise FAQ. **Hand this to anyone — human or AI — nothing is invented in it.**
- **`PUBLICITE.md`** — shorter promotional copy for social media, Discord, press.

---

## 🤝 Contributing

Open source, community-driven. PRs, issues and ideas welcome on GitHub or on the Discord server.

Rules: read the LICENSE first (attribution mandatory, no commercial use without written consent). No feature that weakens privacy or anonymity will be merged.

---

## 📜 License

**VeilDrop Open Source License v1.0** — see [LICENSE](LICENSE).

TL;DR:
1. **Attribution is mandatory** — credit "VeilDrop — by joynix28 — https://veildrop.fr" in any use/fork/derivative.
2. **No commercial use without written consent** — no selling, no paid service, no ads, no monetization of any kind built on this code without the author's explicit written approval (contact@veildrop.fr).
3. Free, personal, educational and community use is always allowed (with attribution).
4. Provided as-is, no warranty.

---

*VeilDrop — Your Privacy, Delivered. · Votre Vie Privée, Livrée.*