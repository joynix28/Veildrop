// VeilDrop - Type definitions

export interface Env {
  DB: D1Database;
  CACHE: KVNamespace;
  ASSETS: { fetch: typeof fetch };
  DOMAINS: string;
  DEFAULT_TTL_SECONDS: string;
  MAX_MESSAGE_SIZE: string;
  SMTP2GO_API_KEY: string;
  SENDPULSE_SMTP_HOST: string;
  SENDPULSE_SMTP_PORT: string;
  SENDPULSE_SMTP_USER: string;
  SENDPULSE_SMTP_PASS: string;
  DATA_ENCRYPTION_KEY?: string;
  ADMIN_KEYWORD?: string;
  DISCORD_WEBHOOK?: string;
  OPERATOR_EMAIL?: string;
}

export interface Inbox {
  id: string;
  address: string;
  created_at: number;
  expires_at: number;
  is_active: number;
}

export interface Message {
  id: string;
  inbox_id: string;
  from_address: string;
  subject_enc: string | null;
  body_enc: string;
  body_html: string | null;
  attachments_json: string | null;
  received_at: number;
  is_read: number;
}

export interface CreateInboxResponse {
  inbox_id: string;
  address: string;
  expires_at: number;
  ttl_seconds: number;
  e2ee?: boolean;
  pubkey?: string;
  privkey_enc?: string;
}

export interface ApiMessage {
  id: string;
  from: string;
  subject: string | null;
  body_enc: string;
  body_html: string | null;
  attachments: any[];
  received_at: number;
  is_read: boolean;
}

export interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;  // encrypted by client
  reply_to?: string;
}
