-- VeilDrop Database Schema

CREATE TABLE IF NOT EXISTS inboxes (
  id TEXT PRIMARY KEY,
  address TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  expires_at INTEGER NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  pubkey TEXT,
  privkey_enc TEXT,
  e2ee INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  inbox_id TEXT NOT NULL,
  from_address TEXT NOT NULL,
  subject_enc TEXT,
  body_enc TEXT NOT NULL,
  body_html TEXT,
  attachments_json TEXT,
  received_at INTEGER NOT NULL DEFAULT (unixepoch()),
  is_read INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (inbox_id) REFERENCES inboxes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rate_limits (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS counters (
  key TEXT PRIMARY KEY,
  val INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS inbox_hashes (
  hash TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS blocked_addresses (
  address TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS blocked_ips (
  ip TEXT PRIMARY KEY,
  reason TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS inbox_tokens (
  token_hash TEXT PRIMARY KEY,
  inbox_id TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_messages_inbox ON messages(inbox_id);
CREATE INDEX IF NOT EXISTS idx_inboxes_address ON inboxes(address);
CREATE INDEX IF NOT EXISTS idx_inboxes_expires ON inboxes(expires_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_key ON rate_limits(key, timestamp);
