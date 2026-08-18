#!/usr/bin/env bash
# =============================================================================
#  VeilDrop — step-by-step setup (Linux / macOS)
#  Install, configure, and deploy your own instance in a few minutes.
#  Usage: ./scripts/setup.sh
# =============================================================================
set -euo pipefail

BLUE='\033[1;34m'; GREEN='\033[1;32m'; YELLOW='\033[1;33m'; RED='\033[1;31m'; NC='\033[0m'
step()  { echo -e "\n${BLUE}▶ $1${NC}"; }
ok()    { echo -e "${GREEN}✔ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠ $1${NC}"; }
fail()  { echo -e "${RED}✘ $1${NC}"; exit 1; }

cd "$(dirname "$0")/.."
echo "======================================================"
echo "  VeilDrop — setup (Linux/macOS)"
echo "======================================================"

# --- 1. Node.js -------------------------------------------------------------
step "1/8 — Checking Node.js (>= 18)"
if ! command -v node >/dev/null 2>&1; then
  warn "Node.js not found."
  echo "  Install it: https://nodejs.org (LTS 20 or 22) — or use your package manager:"
  echo "    Debian/Ubuntu:  sudo apt install nodejs npm"
  echo "    macOS:          brew install node"
  fail "Node.js is required. Install it, then re-run this script."
fi
NODE_MAJOR=$(node -e "console.log(process.versions.node.split('.')[0])")
[ "$NODE_MAJOR" -lt 18 ] && fail "Node.js >= 18 required (found $(node --version)). Upgrade and re-run."
ok "Node $(node --version) / npm $(npm --version)"

# --- 2. Dependencies ---------------------------------------------------------
step "2/8 — Installing dependencies (npm install)"
npm install || fail "npm install failed."
ok "Dependencies installed."

# --- 3. Cloudflare authentication ----------------------------------------------
step "3/8 — Cloudflare login (wrangler)"
if ! npx wrangler whoami >/dev/null 2>&1; then
  warn "You are not logged in to Cloudflare yet."
  echo "A browser window will open — log in, then come back here."
  npx wrangler login || fail "Cloudflare login failed."
fi
ok "Cloudflare account connected."

# --- 4. D1 database -------------------------------------------------------------
step "4/8 — Creating the D1 database (veildrop-db)"
DB_ID=""
if grep -q "YOUR_D1_DATABASE_ID" wrangler.toml; then
  OUT=$(npx wrangler d1 create veildrop-db 2>&1) || fail "Could not create D1 database."
  DB_ID=$(echo "$OUT" | grep -o 'database_id = "[a-f0-9-]*"' | grep -o '[a-f0-9-]\{16,\}')
  [ -z "$DB_ID" ] && fail "Could not read database_id from wrangler output:\n$OUT"
  ok "D1 database created: $DB_ID"
else
  DB_ID=$(grep -o 'database_id = "[a-f0-9-]*"' wrangler.toml | grep -o '[a-f0-9-]\{16,\}' | head -1)
  ok "D1 database already configured: $DB_ID"
fi

# --- 5. Account ID -----------------------------------------------------------------
step "5/8 — Cloudflare account ID"
ACCOUNT_ID=""
if grep -q "YOUR_ACCOUNT_ID" wrangler.toml; then
  ACCOUNT_ID=$(npx wrangler whoami 2>/dev/null | grep -o 'Account ID.*' | grep -o '[a-f0-9]\{32\}' | head -1 || true)
  if [ -z "$ACCOUNT_ID" ]; then
    read -rp "  Paste your Cloudflare account ID (dash.cloudflare.com → top-left of the dashboard, or the URL /account/<ID>): " ACCOUNT_ID
  fi
  [ -z "$ACCOUNT_ID" ] && fail "Account ID required."
  ok "Account ID: $ACCOUNT_ID"
fi

# --- 6. Configuration ---------------------------------------------------------------
step "6/8 — Configuration"
DEFAULT_DOMAINS="veildrop.fr,link2me.info,link2me.online,link2me.store"
read -rp "  Domains (comma-separated) [$DEFAULT_DOMAINS]: " DOMAINS; DOMAINS=${DOMAINS:-$DEFAULT_DOMAINS}
read -rp "  SendPulse SMTP user (or your SMTP login): " SMTP_USER
read -rp "  SendPulse SMTP password: " SMTP_PASS
read -rp "  Admin keyword (secret passphrase for /admin): " ADMIN_KEY
read -rp "  Discord webhook URL (optional, security alerts): " WEBHOOK
read -rp "  Operator mailbox (receives contact@/abuse@ forwards, optional) [contact@veildrop.fr]: " OPERATOR; OPERATOR=${OPERATOR:-contact@veildrop.fr}
[ -z "$SMTP_PASS" ] && warn "Empty SMTP password — sending will fail until configured."
[ -z "$ADMIN_KEY" ] && warn "Empty admin keyword — admin panel will be unavailable."

node scripts/configure.mjs \
  --account-id "$ACCOUNT_ID" --d1-id "$DB_ID" \
  --domains "$DOMAINS" \
  --smtp-user "$SMTP_USER" --smtp-pass "$SMTP_PASS" \
  --admin-key "$ADMIN_KEY" --webhook "$WEBHOOK" --operator "$OPERATOR"
ok "wrangler.toml configured."

# --- 7. Schema ----------------------------------------------------------------------
step "7/8 — Applying database schema"
npx wrangler d1 execute veildrop-db --remote --file=./schema.sql || fail "Schema application failed."
ok "Schema applied."

# --- 8. Deploy ----------------------------------------------------------------------
step "8/8 — Deploying"
npx wrangler deploy || fail "Deployment failed."
ok "VeilDrop is deployed!"

echo ""
echo "======================================================"
echo "  NEXT STEPS"
echo "======================================================"
echo "  1. Receiving mail: Cloudflare dashboard → your domain →"
echo "     Email → Email Routing:"
echo "       - catch-all rule → Send to Worker → veildrop"
echo "       - literal rules (contact@, abuse@, ...) → forward to your mailbox"
echo "  2. Your worker URL: https://<your-subdomain>.workers.dev"
echo "  3. Custom domain: Workers → veildrop → Settings → Domains"
echo ""
echo "  Documentation: README.md — Discord: https://discord.gg/BxDXa8c2vE"
echo "======================================================"