# =============================================================================
#  VeilDrop — step-by-step setup (Windows PowerShell)
#  Install, configure, and deploy your own instance in a few minutes.
#  Usage (right-click → "Run with PowerShell"):
#     Set-ExecutionPolicy -Scope Process Bypass; .\scripts\setup.ps1
# =============================================================================
$ErrorActionPreference = "Stop"
$Host.UI.RawUI.ForegroundColor = "Cyan"

function Step($msg) { Write-Host "`n>> $msg" -ForegroundColor Cyan }
function Ok($msg)   { Write-Host "OK: $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "WARNING: $msg" -ForegroundColor Yellow }
function Fail($msg) { Write-Host "ERROR: $msg" -ForegroundColor Red; exit 1 }

Set-Location (Join-Path $PSScriptRoot "..")
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  VeilDrop — setup (Windows)"
Write-Host "======================================================" -ForegroundColor Cyan

# --- 1. Node.js -----------------------------------------------------------
Step "1/8 - Checking Node.js (>= 18)"
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Warn "Node.js not found."
    Write-Host "  Download and install it: https://nodejs.org (LTS 20 or 22)"
    Fail "Node.js is required. Install it, then re-run this script."
}
$nodeMajor = [int]((node --version) -replace "[^0-9].*$", "")
if ($nodeMajor -lt 18) { Fail "Node.js >= 18 required (found $(node --version)). Upgrade and re-run." }
Ok "Node $(node --version) / npm $((npm --version))"

# --- 2. Dependencies --------------------------------------------------------
Step "2/8 - Installing dependencies (npm install)"
npm install
if ($LASTEXITCODE -ne 0) { Fail "npm install failed." }
Ok "Dependencies installed."

# --- 3. Cloudflare login ------------------------------------------------------
Step "3/8 - Cloudflare login (wrangler)"
npx wrangler whoami | Out-Null
if ($LASTEXITCODE -ne 0) {
    Warn "You are not logged in to Cloudflare yet. A browser window will open."
    npx wrangler login
    if ($LASTEXITCODE -ne 0) { Fail "Cloudflare login failed." }
}
Ok "Cloudflare account connected."

# --- 4. D1 database -------------------------------------------------------------
Step "4/8 - Creating the D1 database (veildrop-db)"
$dbId = ""
$toml = Get-Content wrangler.toml -Raw
if ($toml -match "YOUR_D1_DATABASE_ID") {
    $out = npx wrangler d1 create veildrop-db 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) { Fail "Could not create D1 database.`n$out" }
    if ($out -match 'database_id = "([a-f0-9-]{16,})"') { $dbId = $Matches[1] }
    if (-not $dbId) { Fail "Could not read database_id from wrangler output.`n$out" }
    Ok "D1 database created: $dbId"
} else {
    if ($toml -match 'database_id = "([a-f0-9-]{16,})"') { $dbId = $Matches[1] }
    Ok "D1 database already configured: $dbId"
}

# --- 5. Account ID ----------------------------------------------------------------
Step "5/8 - Cloudflare account ID"
$accountId = ""
if ($toml -match "YOUR_ACCOUNT_ID") {
    $whoami = npx wrangler whoami 2>&1 | Out-String
    if ($whoami -match "\b[a-f0-9]{32}\b") { $accountId = $Matches[0] }
    if (-not $accountId) {
        $accountId = Read-Host "Paste your Cloudflare account ID (dash.cloudflare.com URL: /account/<ID>)"
    }
    if (-not $accountId) { Fail "Account ID required." }
    Ok "Account ID: $accountId"
}

# --- 6. Configuration ---------------------------------------------------------------
Step "6/8 - Configuration"
$defaultDomains = "veildrop.fr,link2me.info,link2me.online,link2me.store"
$domains  = Read-Host "Domains (comma-separated) [$defaultDomains]"
if (-not $domains) { $domains = $defaultDomains }
$smtpUser = Read-Host "SendPulse SMTP user"
$smtpPass = Read-Host -AsSecureString "SendPulse SMTP password"
$smtpPassPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($smtpPass))
$adminKey = Read-Host "Admin keyword (secret passphrase for /admin)"
$webhook  = Read-Host "Discord webhook URL (optional, security alerts)"
$operator = Read-Host "Operator mailbox (receives contact@/abuse@ forwards, optional)"
if (-not $operator) { $operator = "contact@veildrop.fr" }

node scripts/configure.mjs `
    --account-id $accountId --d1-id $dbId `
    --domains $domains `
    --smtp-user $smtpUser --smtp-pass $smtpPassPlain `
    --admin-key $adminKey --webhook $webhook --operator $operator
if ($LASTEXITCODE -ne 0) { Fail "Configuration failed." }
Ok "wrangler.toml configured."

# --- 7. Schema ------------------------------------------------------------------------
Step "7/8 - Applying database schema"
npx wrangler d1 execute veildrop-db --remote --file=./schema.sql
if ($LASTEXITCODE -ne 0) { Fail "Schema application failed." }
Ok "Schema applied."

# --- 8. Deploy --------------------------------------------------------------------------
Step "8/8 - Deploying"
npx wrangler deploy
if ($LASTEXITCODE -ne 0) { Fail "Deployment failed." }
Ok "VeilDrop is deployed!"

Write-Host "`n======================================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  1. Receiving mail: Cloudflare dashboard -> your domain ->"
Write-Host "     Email -> Email Routing:"
Write-Host "       - catch-all rule -> Send to Worker -> veildrop"
Write-Host "       - literal rules (contact@, abuse@, ...) -> forward to your mailbox"
Write-Host "  2. Your worker URL: https://<your-subdomain>.workers.dev"
Write-Host "  3. Custom domain: Workers -> veildrop -> Settings -> Domains"
Write-Host "  Docs: README.md - Discord: https://discord.gg/BxDXa8c2vE"
Write-Host "======================================================" -ForegroundColor Cyan