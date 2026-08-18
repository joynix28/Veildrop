// VeilDrop - Complete Frontend Application

const API = '';

// ===== I18N =====
const I18N = {
  en: {
    lang_name: 'English',
    lang_toggle: 'FR',
    landing_hero_title: 'Your Privacy, Delivered.',
    landing_hero_sub: 'Disposable email, encrypted by design. Messages are erased the moment you read them.',
    landing_cta_continue: 'Continue to Service',
    landing_how_title: 'How It Works',
    landing_how_1_title: 'Create',
    landing_how_1_desc: 'Generate a disposable inbox in one click. Choose a custom address or let us assign one.',
    landing_how_2_title: 'Use',
    landing_how_2_desc: 'Share your temporary address. Receive emails, read them, even send replies — all from your browser.',
    landing_how_3_title: 'Vanish',
    landing_how_3_desc: 'Messages are destroyed the moment you open them. The inbox itself self-destructs after its lifespan — 10 minutes by default, up to 20 days. No traces left.',
    landing_features_title: 'Why VeilDrop?',
    landing_concept_title: 'How VeilDrop Protects You',
    landing_concept_p1: 'VeilDrop provides disposable email addresses that self-destruct after a set period. Your real email stays hidden from spam, phishing, and data breaches.',
    landing_concept_p2: 'Messages are read-once: opening one deletes it from the server instantly. Everything lives for a lifespan you choose — 10 minutes by default, up to 20 days — then is permanently erased. No backups, no logs, no traces. Whatever technical residue may remain is AES-256-GCM ciphertext without the key — no exploitable data. Your privacy is guaranteed by design.',
    landing_concept_p3: 'VeilDrop is fully compliant with GDPR and French LCEN law. We collect zero personal data. Recovery phrases are generated locally in your browser using cryptographic randomness.',
    landing_feat_no_reg_title: 'No Registration',
    landing_feat_no_reg_desc: 'No sign-up, no passwords, no personal data required.',
    landing_feat_auto_title: 'Erase on Read',
    landing_feat_auto_desc: 'Messages are destroyed the moment you open them. Inboxes expire after 10 minutes by default, up to 20 days.',
    landing_feat_encrypted_title: 'Encrypted',
    landing_feat_encrypted_desc: 'End-to-end encryption: keys are generated in your browser and never leave it. The server only stores ciphertext.',
    landing_feat_send_title: 'Send & Receive',
    landing_feat_send_desc: 'Full SMTP support with rich text editor and attachments.',
    landing_feat_custom_title: 'Custom Address',
    landing_feat_custom_desc: 'Choose your own username at veildrop.fr.',
    landing_feat_gdpr_title: 'GDPR Compliant',
    landing_feat_gdpr_desc: 'Full data export and deletion rights. EU-hosted.',
    landing_feat_multi_title: 'Multi-language',
    landing_feat_multi_desc: 'Available in English and French.',
    landing_feat_pwa_title: 'PWA',
    landing_feat_pwa_desc: 'Install on any device. Works like a native app.',
    landing_discord_title: 'Join Our Community',
    landing_discord_desc: 'Have questions? Need help? Join our Discord server.',
    landing_discord_btn: 'Join Discord',
    landing_footer_terms: 'Terms',
    landing_footer_privacy: 'Privacy',
    landing_footer_legal: 'Legal',
    sidebar_legal_help: 'Legal & Help',
    landing_footer_report: 'Report Abuse',
    landing_footer_contact: 'Contact',
    landing_footer_api: 'API',
    landing_footer_tagline: 'Made with privacy in mind',
    auth_title: 'VeilDrop',
    auth_subtitle: 'Temporary email — gone in minutes',
    auth_accept_tos: 'I accept the',
    auth_terms: 'Terms of Service',
    auth_and: 'and',
    auth_privacy: 'Privacy Policy',
    auth_new: 'New Mailbox',
    auth_or: 'or',
    auth_restore: 'Restore with Recovery Phrase',
    auth_upload: 'Upload .vdr File',
    auth_ttl_label: 'Mailbox lifetime:',
    auth_ttl_hint: 'Default: 10 minutes. All messages are deleted when the mailbox expires.',
    auth_custom_label: 'Custom address (optional)',
    auth_custom_hint: 'Saved in your .vdr file. Restoring the file brings back the same address.',
    auth_create: 'Create Mailbox',
    auth_back: 'Back',
    auth_connect: 'Connect',
    auth_restore_address: 'Address (auto-filled from .vdr file)',
    auth_cancel: 'Cancel',
    auth_creating: 'Creating...',
    auth_phrase_placeholder: 'Enter your 15-word recovery phrase',
    mailbox_title: 'Inbox',
    mailbox_empty_title: 'No messages yet',
    mailbox_empty_desc: 'Waiting for incoming email at',
    mailbox_copy: 'Copy address',
    mailbox_refresh: 'Refresh',
    mailbox_compose: 'Compose',
    msg_from: 'From',
    msg_to: 'To',
    msg_date: 'Date',
    msg_reply: 'Reply',
    msg_forward: 'Forward',
    msg_no_subject: '(no subject)',
    msg_attachments: 'Attachments',
    msg_not_found: 'Message not found',
    msg_forward_header: 'Forwarded message',
    msg_forward_on: 'On',
    msg_forward_wrote: 'wrote:',
    compose_title: 'Compose',
    compose_to: 'To',
    compose_to_placeholder: 'email@example.com',
    compose_add: 'Add',
    compose_subject: 'Subject',
    compose_body: 'Write your message...',
    compose_send: 'Send',
    compose_sending: 'Sending...',
    compose_attach: 'Attach',
    compose_format: 'Format',
    compose_plain: 'Plain text',
    compose_rich: 'Rich text',
    compose_limit_reached: 'Daily send limit reached (200/day). Try again tomorrow.',
    compose_fill_all: 'Fill in all fields',
    compose_sent: 'Email sent!',
    compose_too_large: 'too large (max 5MB)',
    modal_phrase_title: 'Recovery Phrase',
    modal_phrase_desc: 'Write these 15 words on paper and store them safely. They are the only way to access this mailbox again.',
    modal_phrase_done: 'Done',
    modal_phrase_download: 'Download .vdr',
    modal_extend_title: 'Extend Mailbox',
    modal_extend_desc: 'Choose a new expiry duration from now.',
    modal_extend_btn: 'Extend',
    modal_nuke_title: 'Nuke Mailbox?',
    modal_nuke_desc: 'This will permanently and immediately delete all messages and expire the mailbox. This cannot be undone.',
    modal_nuke_confirm: 'Yes, delete everything',
    modal_nuke_cancel: 'Cancel',
    legal_back: 'Back to Inbox',
    abuse_back: 'Back to VeilDrop',
    abuse_title: 'Report Abuse',
    abuse_desc: 'If you received a threatening, illegal, or abusive email via VeilDrop, please report it here.',
    abuse_submit: 'Submit Report',
    abuse_success_title: 'Report Submitted',
    abuse_success_desc: 'Thank you. Your report has been sent to our team.',
    contact_title: 'Contact Us',
    contact_discord_title: 'Join our Discord',
    contact_discord_desc: 'The fastest way to reach us. Get help, suggest features, or just chat.',
    contact_discord_btn: 'Join Discord Server',
    contact_email_title: 'Email',
    contact_email_addr: 'contact@veildrop.fr',
    contact_email_desc: 'For legal inquiries, abuse reports, or general questions.',
    contact_report_title: 'Report Abuse',
    contact_report_desc: 'Use our dedicated abuse report form with file uploads.',
    contact_report_btn: 'Go to Report Form',
    admin_title: 'Admin Panel',
    admin_access: 'Admin Access',
    admin_keyword: 'Keyword',
    admin_login: 'Access',
    countdown_expires: 'Expires in',
    countdown_expired: 'EXPIRED',
    smtp_sent: 'Emails sent today',
    action_extend: 'Extend',
    action_recovery: 'Recovery',
    admin_logout: 'Logout',
    action_nuke: 'Nuke',
    toast_copied: 'Address copied',
    toast_extended: 'Extended',
    toast_nuked: 'All data permanently deleted',
    toast_phrase_downloaded: 'Recovery file downloaded',
    toast_invalid_phrase: 'Enter exactly 15 words',
    toast_expired: 'Mailbox expired',
    toast_admin_invalid: 'Invalid keyword',
    toast_msg_deleted: 'Message destroyed',
    msg_back: 'Back',
    editor_bold: 'Bold',
    editor_italic: 'Italic',
    editor_underline: 'Underline',
    editor_strike: 'Strikethrough',
    editor_font: 'Font',
    editor_size: 'Size',
    abuse_email_ph: 'you@example.com',
    abuse_inbox_ph: 'xxxxxxxxxxxx@veildrop.fr',
    abuse_desc_ph: 'Describe what happened in detail.',
    admin_keyword_ph: 'Enter keyword',
    admin_ip_ph: 'IP to block (e.g. 1.2.3.4)',
    admin_search_ph: 'Search by address...',
    admin_loading: 'Loading messages...',
    admin_failed_msgs: 'Failed to load messages',
    admin_failed_msg: 'Failed to load message',
    admin_close: 'Close',
    admin_failed_ip: 'Failed to load blocked IPs',
    admin_overview: 'Overview',
    admin_stat_total: 'Total Inboxes',
    admin_stat_active: 'Active Inboxes',
    admin_stat_msgs: 'Messages',
    admin_stat_sent: 'Sends Today',
    admin_stat_e2ee: 'E2EE Inboxes',
    admin_stat_blocked_users: 'Blocked Usernames',
    admin_providers: 'SMTP Providers',
    admin_providers_sub: 'Outbound delivery & per-provider usage today',
    admin_sends: 'sent',
    admin_service: 'Toggle service on/off',
    admin_service_on: 'Service ON',
    admin_service_off: 'Service OFF',
    admin_blocked_usernames: 'Blocked Usernames',
    admin_blocked_usernames_ph: 'Username to block (e.g. spammer01)',
    admin_blocked_ips: 'Blocked IPs',
    admin_inboxes: 'Inboxes',
    admin_search_btn: 'Search',
    admin_block: 'Block',
    admin_unblock: 'Unblock',
    admin_none_blocked: 'No blocked usernames',
    admin_reserved_note: 'Permanently reserved (cannot be unblocked)',
    admin_requests: 'API Requests Today',
    admin_req7d: 'Requests last 7 days',
    admin_inboxes_today: 'Inboxes Today',
    admin_msgs_today: 'Messages Today',
    admin_view: 'View',
    admin_delete: 'Delete',
    admin_no_msgs: 'No messages',
    admin_e2ee_note: 'E2EE mailbox: content is stored encrypted and cannot be decrypted by VeilDrop (only the owner holds the phrase).',
    admin_confirm_delete: 'Permanently delete this account and all its messages? This cannot be undone.',
    admin_deleted: 'Account deleted',
    admin_service_global: 'Global service',
    admin_service_global_sub: 'Turning the service OFF blocks creation, sending and incoming mail instantly. Admin panel stays available.',
    admin_danger: 'Danger Zone',
    admin_nuke_all: 'Erase everything',
    admin_nuke_all_sub: 'Permanently delete ALL inboxes, messages, tokens and hashes. Also resets daily counters. This cannot be undone.',
    admin_nuke_confirm1: 'This will permanently erase the ENTIRE service: all inboxes, all messages. Irreversible. Continue?',
    admin_nuke_confirm2: 'Final confirmation: type NUKE ALL',
    admin_nuke_placeholder: 'Type NUKE ALL',
    admin_nuke_done: 'Service wiped clean',
    help_title: 'Help',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'What is VeilDrop?',
    faq_1_a: 'VeilDrop is a free temporary email service. You get a disposable email address that receives and sends messages. Everything auto-deletes after your chosen duration (10 minutes to 20 days).',
    faq_2_q: 'Is my data safe?',
    faq_2_a: 'Yes. All data is stored in the EU (Cloudflare D1, London region). No personal data is collected. Everything auto-deletes. You can nuke your mailbox at any time. Even residual bytes are AES-256-GCM ciphertext — no exploitable data ever remains.',
    faq_3_q: 'How does GDPR protect me?',
    faq_3_a: 'VeilDrop is fully GDPR compliant. You have the right to export all your data, delete it permanently, and everything auto-expires. No cookies, no tracking, no analytics.',
    faq_4_q: 'What is LCEN?',
    faq_4_a: 'LCEN (Loi pour la Confiance dans l\'Economie Numerique) is French law governing digital services. VeilDrop complies with all requirements including legal notices, hosting provider identification, and abuse reporting mechanisms.',
    faq_5_q: 'Can I be traced?',
    faq_5_a: 'VeilDrop does not log IP addresses, use cookies, or collect any personal identifiers. Recovery phrases are generated locally in your browser. There is no server-side logging of user activity.',
    faq_6_q: 'What happens when my mailbox expires?',
    faq_6_a: 'All messages are permanently deleted from our database. The address becomes inactive. No backup or archive is maintained, and whatever technical residue could persist is AES-256-GCM ciphertext — no exploitable data.',
    faq_7_q: 'How do I report abuse?',
    faq_7_a: 'Visit report.veildrop.fr or Contact page. You can attach screenshots and evidence. Reports are sent to our team via Discord.',
    faq_8_q: 'Can I send emails?',
    faq_8_a: 'Yes. You can send emails with a rich text editor, attachments, and up to 10 recipients. There is a shared daily limit of 200 emails across all users.',
    faq_9_q: 'How do I recover my mailbox?',
    faq_9_a: 'Save your 15-word recovery phrase or download the .vdr file when you create the mailbox. These are the only ways to restore access.',
    faq_10_q: 'Is VeilDrop free?',
    faq_10_a: 'Yes, completely free. No premium tiers, no hidden costs. There is a shared daily send limit of 200 emails.',
    faq_11_q: 'What happens under a legal requisition? Can my identity be revealed?',
    faq_11_a: 'There is no identity to reveal. VeilDrop has no accounts, no registration, no IP logging and stores no personal data. Under a requisition (French Code of Criminal Procedure, LCEN), the operator can only hand over what technically exists — which is nothing identifying. No name, no email, no IP, no message older than 20 days. Privacy by impossibility, not by promise.',
    faq_12_q: 'Why is VeilDrop better than Proton Mail or other private providers?',
    faq_12_a: 'Private providers still create accounts: they know who you are, keep your address forever and hold years of metadata they may be forced to disclose. VeilDrop is architecturally incapable of identifying you: no account, no signup, no stored IP, messages destroyed at expiry or after a single read, zero cookies, zero tracking. With Proton you trust promises; with VeilDrop there is nothing left to seize.',
    faq_13_q: 'How long is my data really kept, exactly?',
    faq_13_a: 'Hard maximum of 20 days plus 24 hours: messages are deleted when your mailbox expires and hard-purged from EU storage within 24 hours. Rate-limit counters purge within 2 hours, daily counters within 2 days. Access tokens are destroyed with the inbox. Every message is additionally encrypted at rest with AES-256-GCM — the key lives in the server secrets, never in the database. Nothing user-generated is ever retained longer.',
    faq_14_q: 'What is end-to-end encryption (E2EE) and how does it work on VeilDrop?',
    faq_14_a: 'E2EE means your mailbox is locked with a public key that only you can unlock. When you create a mailbox, your browser generates an RSA key pair. The private key is wrapped with a key derived from your 15-word recovery phrase and only the wrapped form is sent to the server — the server never sees the unwrapped private key. Incoming emails are then encrypted with your public key before they touch our database, so nobody — not even the operator, a leaked database, or a legal requisition — can read them without your recovery phrase. Messages are stored in the encv2: format and can only be decrypted in your browser. The trade-off: we cannot scan emails for abuse, spam or malware, and the GDPR export returns the raw encrypted data with your keys. Outgoing email remains unencrypted because it must travel over standard SMTP.',
    faq_15_q: 'Is my custom username protected? Why do some usernames get blocked?',
    faq_15_a: 'Your custom username (e.g., your-name@veildrop.fr) is reserved for you from the moment it is created, but no password protects it: anyone with the 15-word recovery phrase has access. Certain usernames are reserved (contact, admin, support, etc.) and others are blocked by moderation because they impersonate a brand, a public figure, or a service (e.g., paypal, protonmail, police, dhl). Blocked usernames cannot be created and are removed from use.',
    faq_16_q: 'What is the daily sending limit and what happens when it is reached?',
    faq_16_a: 'Outgoing mail is shared across all users: 200 emails per day through SendPulse (primary) and SMTP2GO (fallback). When the limit is reached, sending is automatically disabled until the next day — receiving is never affected. The limit resets daily and the counters are deleted after 2 days. There is no queue: a message submitted after the limit is rejected with an explicit error.',
    faq_17_q: 'Can I use VeilDrop for my own business or on my own website?',
    faq_17_a: 'VeilDrop is designed for temporary, disposable uses — signups, verifications, anonymous one-shot communication. Using it as your primary inbox, for business correspondence, for transactional email (confirmations, invoices, alerts) or at high volume is against the intended use and the daily sending limit makes it technically impossible. Automated abuse (bots, bulk signups, scraping) is detected and blocked by IP and username.',
    faq_18_q: 'What happens if I lose my recovery phrase?',
    faq_18_a: 'The phrase is generated locally in your browser and never stored or sent to the server. If you lose it and your browser data is cleared, access to the mailbox is permanently lost. The inbox remains encrypted (encv2:) and the data is unreadable — for you and for us alike. It will simply expire on its own and be purged. There is no recovery: do not lose it. Download the .vdr file as a backup.',
    faq_19_q: 'How do you handle abuse reports? Can I report an email?',
    faq_19_a: 'Abuse reports go through report.veildrop.fr or the official Discord. Every report is reviewed by moderation: reserved or malicious usernames are blocked, offending IPs are banned, and clearly illegal content is removed in line with the LCEN (article 6.I.7) and the DSA regulation (article 16). For E2EE mailboxes we cannot inspect content — that is the point of the encryption — so reports rely on the sender address, subject, and context. We cooperate with judicial authorities in accordance with the law.',
    faq_20_q: 'Is this really free? What is the business model?',
    faq_20_a: 'VeilDrop is completely free, with no ads, no tracking, no premium tier, and no account. The service is financed by its operators. Costs are kept low by design: single-employee operations, free-tier hosting, and a shared sending quota. There is no data to sell: VeilDrop collects nothing identifiable and cannot read the encrypted content of your inbox.',
    faq_21_q: 'Can the police / authorities recover my emails? Will they be readable?',
    faq_21_a: 'As a hosting provider under French law (LCEN art. 6.I-2), VeilDrop must cooperate with judicial authorities: on a legal requisition (perquisition, réquisition judiciaire), we would hand over everything we hold — metadata, sender addresses, subjects, and message bodies as stored. But for E2EE inboxes, everything stored is encrypted (encv2:) with a key only you hold: the requisition would yield only unreadable ciphertext, unexploitable by anyone — the authorities, us, and you (without your recovery phrase). The recovery phrase itself is never stored, never transmitted, and no usable private key exists on our servers (only a private key wrapped by a key derived from your phrase — unbreakable without the phrase). Important caveat: OUTGOING emails travel over standard SMTP in clear text and ARE readable by the authorities (and by the email providers involved). Incoming emails are also received in clear text over SMTP before being encrypted at rest. So: contents at rest in an E2EE inbox = unreadable to everyone; emails in transit or sent out = readable. Retention is also very short by design: 10 minutes to 20 days, then hard-deleted.',
    legal_title: 'Legal Notices',
    legal_updated: 'Last updated: August 18, 2026',
    legal_1_title: 'Service Provider',
    legal_1_desc: 'VeilDrop is operated as a non-professional individual project. Contact: <a href="mailto:contact@veildrop.fr">contact@veildrop.fr</a>',
    legal_1_anon: 'Under Article 6-III of French Law No. 2004-575 (LCEN), the identity of a non-professional publisher is not disclosed to the public; it is communicated to the hosting provider and made available to judicial authorities on request.',
    legal_2_title: 'Hosting Provider',
    legal_2_desc: 'Cloudflare provides CDN, DDoS protection, DNS, email routing and serverless compute (Workers). Data is stored in Cloudflare D1, EU region (London). Messages are encrypted at rest with AES-256-GCM.',
    legal_3_title: 'Email Delivery Providers',
    legal_3_primary: 'primary outbound email provider',
    legal_3_fallback: 'backup provider',
    legal_3_desc: 'Outbound email delivery only, transmitted via TLS encryption. SendPulse handles email routing, SMTP2GO is the fallback.',
    legal_4_title: 'Applicable Law',
    legal_4_lcen: 'French Law No. 2004-575 of 21 June 2004 (LCEN)',
    legal_4_lcen_desc: 'on confidence in the digital economy',
    legal_5_title: 'Liability',
    legal_5_desc: 'VeilDrop is a hosting provider within the meaning of Article 6-I-2 of the LCEN: it stores content automatically provided by third parties (email routing), without editorial control, and has no general obligation to monitor stored content (Article 6-II). Liability is limited to cases where the operator, having actual knowledge of unlawful content, fails to act promptly.',
    legal_5_commit: 'Upon notification, VeilDrop commits to removing or disabling access to reported content as quickly as possible.',
    legal_6_title: 'Abuse Reporting',
    legal_6_desc: 'To report illegal content or activity transmitted via VeilDrop, use the',
    legal_7_title: 'DSA Point of Contact',
    legal_7_desc: 'Electronic point of contact for EU authorities and users under Regulation (EU) 2022/2065 (Digital Services Act): notices are processed under the notice-and-action procedure, typically within 24-48 hours.',
    legal_7_contact: 'Contact: <a href="mailto:contact@veildrop.fr">contact@veildrop.fr</a>',
    legal_abuse_form: 'Abuse Report Form',
    warn_send_title: 'Before sending: this email will not be end-to-end encrypted',
    warn_send_p1: 'Outgoing emails leave VeilDrop in plaintext: transport is TLS-protected, but the content remains readable by our SMTP relays (SendPulse / SMTP2GO) and by the recipient\'s mail provider. VeilDrop cannot encrypt outgoing email end-to-end.',
    warn_send_p2: 'Why it cannot be otherwise: end-to-end encryption requires both sides to exchange a secret key before any message. Here, the recipient is an arbitrary third party (a website, a newsletter, a contact) that knows nothing about your 15-word recovery phrase. Incoming mail also arrives in plaintext via SMTP — before any key could apply — and must be processed by the service to reach your inbox.',
    warn_send_p3: 'Even if we wanted to make stored messages unreadable by anyone — including the operator — the email protocol physically prevents it: encrypting incoming mail with a key only you hold would require the server to hold that key, which defeats the purpose.',
    warn_send_p4: 'What VeilDrop guarantees instead: incoming messages are stored encrypted (AES-256-GCM), auto-delete within 20 days max, are read-once, and no identity is ever recorded. Still, never send passwords, credentials or sensitive data through any email service — ours included.',
    warn_send_dontshow: 'Don\'t show this explanation again',
    warn_send_confirm: 'I understand — send anyway',
    warn_send_cancel: 'Cancel',
    compose_note_not_e2ee: '⚠️ Outgoing email is sent via standard SMTP (TLS) — it is NOT end-to-end encrypted. Only incoming mail in your inbox is E2EE. Never send passwords or sensitive data via email.',
    ob_step1_t: '1. Copy your address',
    ob_step1_d: 'Use it anywhere a form asks for an email — signups, verification codes, newsletters.',
    ob_step2_t: '2. Send yourself a test',
    ob_step2_d: 'Click Compose and write to your own VeilDrop address. Only you can read it (E2EE).',
    ob_step3_t: '3. Keep your recovery phrase',
    ob_step3_d: 'The 15 words shown at creation are the ONLY way to restore this mailbox. Save them now, or download the .vdr file.',
  },
  fr: {
    lang_name: 'Français',
    lang_toggle: 'EN',
    landing_hero_title: 'Votre Vie Privée, Livrée.',
    landing_hero_sub: 'Email jetable chiffré par conception. Les messages sont effacés dès que vous les lisez.',
    landing_cta_continue: 'Continuer sur le Service',
    landing_how_title: 'Comment ça Marche',
    landing_how_1_title: 'Créer',
    landing_how_1_desc: 'Générez une boîte jetable en un clic. Choisissez une adresse personnalisée ou laissez-nous en assigner une.',
    landing_how_2_title: 'Utiliser',
    landing_how_2_desc: 'Partagez votre adresse temporaire. Recevez des emails, lisez-les, répondez — tout depuis votre navigateur.',
    landing_how_3_title: 'Disparaître',
    landing_how_3_desc: 'Les messages sont détruits dès que vous les ouvrez. La boîte elle-même s\'auto-détruit après sa durée de vie — 10 minutes par défaut, jusqu\'à 20 jours. Aucune trace.',
    landing_features_title: 'Pourquoi VeilDrop ?',
    landing_concept_title: 'Comment VeilDrop Vous Protège',
    landing_concept_p1: 'VeilDrop fournit des adresses email jetables qui s\'auto-détruisent après une durée choisie. Votre vrai email reste caché des spams, du phishing et des fuites de données.',
    landing_concept_p2: 'Les messages sont à lecture unique : les ouvrir les supprime immédiatement du serveur. Tout vit pendant la durée que vous choisissez — 10 minutes par défaut, jusqu\'à 20 jours — puis est effacé définitivement. Pas de sauvegarde, pas de logs, pas de traces. Votre vie privée est garantie par conception.',
    landing_concept_p3: 'VeilDrop est pleinement conforme au RGPD et à la loi LCEN française. Nous ne collectons aucune donnée personnelle. Les phrases de récupération sont générées localement dans votre navigateur avec une aléatoire cryptographique.',
    landing_feat_no_reg_title: 'Sans Inscription',
    landing_feat_no_reg_desc: 'Aucun compte, aucun mot de passe, aucune donnée personnelle.',
    landing_feat_auto_title: 'Effacé dès la Lecture',
    landing_feat_auto_desc: 'Les messages sont détruits dès que vous les ouvrez. Les boîtes expirent après 10 minutes par défaut, jusqu\'à 20 jours.',
    landing_feat_encrypted_title: 'Chiffré',
    landing_feat_encrypted_desc: 'Chiffrement de bout en bout : les clés naissent dans votre navigateur et n\'en sortent jamais. Le serveur ne stocke que du chiffré.',
    landing_feat_send_title: 'Envoyer & Recevoir',
    landing_feat_send_desc: 'Support SMTP complet avec éditeur riche et pièces jointes.',
    landing_feat_custom_title: 'Adresse Personnalisée',
    landing_feat_custom_desc: 'Choisissez votre nom d\'utilisateur sur veildrop.fr.',
    landing_feat_gdpr_title: 'Conforme RGPD',
    landing_feat_gdpr_desc: 'Export et suppression complets des données. Hébergé en UE.',
    landing_feat_multi_title: 'Multi-langue',
    landing_feat_multi_desc: 'Disponible en anglais et en français.',
    landing_feat_pwa_title: 'PWA',
    landing_feat_pwa_desc: 'Installez sur n\'importe quel appareil. Fonctionne comme une app native.',
    landing_discord_title: 'Rejoignez notre Communauté',
    landing_discord_desc: 'Des questions ? Besoin d\'aide ? Rejoignez notre serveur Discord.',
    landing_discord_btn: 'Rejoindre Discord',
    landing_footer_terms: 'CGU',
    landing_footer_privacy: 'Confidentialité',
    landing_footer_legal: 'Mentions Légales',
    sidebar_legal_help: 'Aide & Légal',
    landing_footer_report: 'Signaler un Abus',
    landing_footer_contact: 'Contact',
    landing_footer_api: 'API',
    landing_footer_tagline: 'Fait avec la vie privée en tête',
    auth_title: 'VeilDrop',
    auth_subtitle: 'Email temporaire — disparaît en quelques minutes',
    auth_accept_tos: 'J\'accepte les',
    auth_terms: 'Conditions d\'Utilisation',
    auth_and: 'et la',
    auth_privacy: 'Politique de Confidentialité',
    auth_new: 'Nouvelle Boîte',
    auth_or: 'ou',
    auth_restore: 'Restaurer avec la Phrase de Récupération',
    auth_upload: 'Charger un Fichier .vdr',
    auth_ttl_label: 'Durée de vie :',
    auth_ttl_hint: 'Par défaut : 10 minutes. Tous les messages sont supprimés à l\'expiration.',
    auth_custom_label: 'Adresse personnalisée (optionnel)',
    auth_custom_hint: 'Enregistrée dans votre fichier .vdr. Restaurer le fichier redonne la même adresse.',
    auth_create: 'Créer la Boîte',
    auth_back: 'Retour',
    auth_connect: 'Connecter',
    auth_restore_address: 'Adresse (remplie automatiquement par le fichier .vdr)',
    auth_cancel: 'Annuler',
    auth_creating: 'Création...',
    auth_phrase_placeholder: 'Entrez votre phrase de récupération de 15 mots',
    mailbox_title: 'Boîte de Réception',
    mailbox_empty_title: 'Aucun message',
    mailbox_empty_desc: 'En attente d\'emails à',
    mailbox_copy: 'Copier l\'adresse',
    mailbox_refresh: 'Rafraîchir',
    ob_step1_t: '1. Copiez votre adresse',
    ob_step1_d: 'Utilisez-la partout où un formulaire demande un email — inscriptions, codes de vérification, newsletters.',
    ob_step2_t: '2. Envoyez-vous un test',
    ob_step2_d: 'Cliquez sur Composer et écrivez à votre propre adresse VeilDrop. Vous êtes le seul à pouvoir la lire (E2EE).',
    ob_step3_t: '3. Gardez votre phrase de récupération',
    ob_step3_d: 'Les 15 mots affichés à la création sont le SEUL moyen de restaurer cette boîte. Enregistrez-les maintenant, ou téléchargez le fichier .vdr.',
    mailbox_compose: 'Rédiger',
    msg_from: 'De',
    msg_to: 'À',
    msg_date: 'Date',
    msg_reply: 'Répondre',
    msg_forward: 'Transférer',
    msg_no_subject: '(sans objet)',
    msg_attachments: 'Pièces jointes',
    msg_not_found: 'Message introuvable',
    msg_forward_header: 'Message transféré',
    msg_forward_on: 'Le',
    msg_forward_wrote: 'a écrit :',
    compose_title: 'Rédiger',
    compose_to: 'À',
    compose_to_placeholder: 'email@exemple.com',
    compose_add: 'Ajouter',
    compose_subject: 'Objet',
    compose_body: 'Écrivez votre message...',
    compose_send: 'Envoyer',
    compose_sending: 'Envoi...',
    compose_attach: 'Joindre',
    compose_format: 'Formatage',
    compose_plain: 'Texte brut',
    compose_rich: 'Texte enrichi',
    compose_limit_reached: 'Limite quotidienne atteinte (200/jour). Réessayez demain.',
    compose_fill_all: 'Remplissez tous les champs',
    compose_sent: 'Email envoyé !',
    compose_too_large: 'trop volumineux (max 5MB)',
    modal_phrase_title: 'Phrase de Récupération',
    modal_phrase_desc: 'Écrivez ces 15 mots sur papier et conservez-les en sécurité. C\'est la seule façon d\'accéder à cette boîte.',
    modal_phrase_done: 'Terminé',
    modal_phrase_download: 'Télécharger .vdr',
    modal_extend_title: 'Prolonger la Boîte',
    modal_extend_desc: 'Choisissez une nouvelle durée d\'expiration.',
    modal_extend_btn: 'Prolonger',
    modal_nuke_title: 'Détruire la Boîte ?',
    modal_nuke_desc: 'Cela supprimera définitivement et immédiatement tous les messages et expirera la boîte. Impossible d\'annuler.',
    modal_nuke_confirm: 'Oui, tout supprimer',
    modal_nuke_cancel: 'Annuler',
    legal_back: 'Retour à la Boîte',
    abuse_back: 'Retour à VeilDrop',
    abuse_title: 'Signaler un Abus',
    abuse_desc: 'Si vous avez reçu un email menaçant, illégal ou abusif via VeilDrop, signalez-le ici.',
    abuse_submit: 'Envoyer le Rapport',
    abuse_success_title: 'Rapport Envoyé',
    abuse_success_desc: 'Merci. Votre rapport a été envoyé à notre équipe.',
    contact_title: 'Contactez-nous',
    contact_discord_title: 'Rejoignez notre Discord',
    contact_discord_desc: 'Le moyen le plus rapide de nous joindre. Obtenez de l\'aide, suggérez des features, ou discutez.',
    contact_discord_btn: 'Rejoindre le Serveur Discord',
    contact_email_title: 'Email',
    contact_email_addr: 'contact@veildrop.fr',
    contact_email_desc: 'Pour les inquiries légales, les rapports d\'abus, ou les questions générales.',
    contact_report_title: 'Signaler un Abus',
    contact_report_desc: 'Utilisez notre formulaire dédié avec upload de fichiers.',
    contact_report_btn: 'Aller au Formulaire',
    admin_title: 'Panneau Admin',
    admin_access: 'Accès Admin',
    admin_keyword: 'Mot-clé',
    admin_login: 'Accéder',
    countdown_expires: 'Expire dans',
    countdown_expired: 'EXPIRÉ',
    smtp_sent: 'Emails envoyés aujourd\'hui',
    action_extend: 'Prolonger',
    action_recovery: 'Récupération',
    admin_logout: 'Déconnexion',
    action_nuke: 'Détruire',
    toast_copied: 'Adresse copiée',
    toast_extended: 'Prolongé',
    toast_nuked: 'Toutes les données supprimées',
    toast_phrase_downloaded: 'Fichier de récupération téléchargé',
    toast_invalid_phrase: 'Entrez exactement 15 mots',
    toast_expired: 'Boîte expirée',
    toast_admin_invalid: 'Mot-clé invalide',
    toast_msg_deleted: 'Message détruit',
    msg_back: 'Retour',
    editor_bold: 'Gras',
    editor_italic: 'Italique',
    editor_underline: 'Souligné',
    editor_strike: 'Barré',
    editor_font: 'Police',
    editor_size: 'Taille',
    abuse_email_ph: 'vous@exemple.com',
    abuse_inbox_ph: 'xxxxxxxxxxxx@veildrop.fr',
    abuse_desc_ph: 'Décrivez ce qui s\'est passé en détail.',
    admin_keyword_ph: 'Entrez le mot-clé',
    admin_ip_ph: 'IP à bloquer (ex. 1.2.3.4)',
    admin_search_ph: 'Rechercher par adresse...',
    admin_loading: 'Chargement des messages...',
    admin_failed_msgs: 'Échec du chargement des messages',
    admin_failed_msg: 'Échec du chargement du message',
    admin_close: 'Fermer',
    admin_failed_ip: 'Échec du chargement des IP bloquées',
    admin_overview: 'Vue d\'ensemble',
    admin_stat_total: 'Boîtes totales',
    admin_stat_active: 'Boîtes actives',
    admin_stat_msgs: 'Messages',
    admin_stat_sent: 'Envois aujourd\'hui',
    admin_stat_e2ee: 'Boîtes E2EE',
    admin_stat_blocked_users: 'Usernames bloqués',
    admin_providers: 'Fournisseurs SMTP',
    admin_providers_sub: 'Envoi sortant et usage par fournisseur aujourd\'hui',
    admin_sends: 'envoyés',
    admin_service: 'Activer/désactiver le service',
    admin_service_on: 'Service ACTIF',
    admin_service_off: 'Service COUPÉ',
    admin_blocked_usernames: 'Usernames bloqués',
    admin_blocked_usernames_ph: 'Username à bloquer (ex. spammer01)',
    admin_blocked_ips: 'IP bloquées',
    admin_inboxes: 'Boîtes',
    admin_search_btn: 'Rechercher',
    admin_block: 'Bloquer',
    admin_unblock: 'Débloquer',
    admin_none_blocked: 'Aucun username bloqué',
    admin_reserved_note: 'Réservés en permanence (ne peuvent pas être débloqués)',
    admin_requests: 'Requêtes API aujourd\'hui',
    admin_req7d: 'Requêtes 7 derniers jours',
    admin_inboxes_today: 'Boîtes créées aujourd\'hui',
    admin_msgs_today: 'Messages reçus aujourd\'hui',
    admin_view: 'Voir',
    admin_delete: 'Supprimer',
    admin_no_msgs: 'Aucun message',
    admin_e2ee_note: 'Boîte E2EE : le contenu est stocké chiffré et ne peut pas être déchiffré par VeilDrop (seul le propriétaire possède la phrase).',
    admin_confirm_delete: 'Supprimer définitivement ce compte et tous ses messages ? Irréversible.',
    admin_deleted: 'Compte supprimé',
    admin_service_global: 'Service global',
    admin_service_global_sub: 'Couper le service bloque instantanément création, envoi et réception. Le panneau admin reste accessible.',
    admin_danger: 'Zone dangereuse',
    admin_nuke_all: 'Tout effacer',
    admin_nuke_all_sub: 'Supprime définitivement TOUTES les boîtes, messages, tokens et hashes. Réinitialise aussi les compteurs quotidiens. Irréversible.',
    admin_nuke_confirm1: 'Cela effacera définitivement tout le service : toutes les boîtes, tous les messages. Irréversible. Continuer ?',
    admin_nuke_confirm2: 'Confirmation finale : tapez NUKE ALL',
    admin_nuke_placeholder: 'Tapez NUKE ALL',
    admin_nuke_done: 'Service nettoyé',
    help_title: 'Aide',
    faq_title: 'Questions Fréquentes',
    faq_1_q: 'Qu\'est-ce que VeilDrop ?',
    faq_1_a: 'VeilDrop est un service d\'email temporaire gratuit. Vous obtenez une adresse jetable qui reçoit et envoie des messages. Tout se supprime automatiquement après la durée choisie.',
    faq_2_q: 'Mes données sont-elles sécurisées ?',
    faq_2_a: 'Oui. Toutes les données sont stockées en UE (Cloudflare D1, Londres). Aucune donnée personnelle n\'est collectée. Tout s\'auto-supprime. Vous pouvez tout détruire à tout moment.',
    faq_3_q: 'Comment le RGPD me protège-t-il ?',
    faq_3_a: 'VeilDrop est conforme au RGPD. Vous avez le droit d\'exporter, supprimer vos données, et tout expire automatiquement. Pas de cookies, pas de tracking, pas d\'analytics.',
    faq_4_q: 'Qu\'est-ce que la LCEN ?',
    faq_4_a: 'La LCEN est la loi française régissant les services numériques. VeilDrop respecte toutes les obligations légales incluant mentions légales, identification hébergeur et signalement d\'abus.',
    faq_5_q: 'Puis-je être tracé ?',
    faq_5_a: 'VeilDrop ne journalise pas les adresses IP, n\'utilise pas de cookies et ne collecte aucun identifiant personnel. Les phrases de récupération sont générées localement.',
    faq_6_q: 'Qu\'arrive-t-il quand ma boîte expire ?',
    faq_6_a: 'Tous les messages sont définitivement supprimés. L\'adresse devient inactive. Aucune sauvegarde n\'est maintenue, et tout résidu technique éventuel est un ciphertext AES-256-GCM — aucune donnée exploitable.',
    faq_7_q: 'Comment signaler un abus ?',
    faq_7_a: 'Visitez report.veildrop.fr ou la page Contact. Vous pouvez joindre des captures d\'écran. Les signalements sont envoyés à notre équipe via Discord.',
    faq_8_q: 'Puis-je envoyer des emails ?',
    faq_8_a: 'Oui. Éditeur riche, pièces jointes, jusqu\'à 10 destinataires. Limite partagée de 200 emails/jour.',
    faq_9_q: 'Comment récupérer ma boîte ?',
    faq_9_a: 'Sauvegardez votre phrase de 15 mots ou téléchargez le fichier .vdr lors de la création. Ce sont les seuls moyens de restaurer l\'accès.',
    faq_10_q: 'VeilDrop est-il gratuit ?',
    faq_10_a: 'Oui, entièrement gratuit. Pas de tarif premium, pas de cachés. Limite partagée de 200 emails/jour.',
    faq_11_q: 'Que se passe-t-il en cas de réquisition ? Mon identité peut-elle être révélée ?',
    faq_11_a: 'Il n\'y a aucune identité à révéler. VeilDrop n\'a ni comptes, ni inscription, ni journalisation d\'IP, et ne stocke aucune donnée personnelle. En cas de réquisition (Code de procédure pénale français, LCEN), l\'opérateur ne peut remettre que ce qui existe techniquement — c\'est-à-dire rien d\'identifiant. Pas de nom, pas d\'email, pas d\'IP, pas de message de plus de 20 jours. La vie privée par impossibilité, pas par promesse.',
    faq_12_q: 'Pourquoi VeilDrop est-il meilleur que Proton Mail ou d\'autres fournisseurs privés ?',
    faq_12_a: 'Les fournisseurs privés créent quand même des comptes : ils savent qui vous êtes, conservent votre adresse pour toujours et détiennent des années de métadonnées qu\'ils peuvent être contraints de divulguer. VeilDrop est architecturalement incapable de vous identifier : pas de compte, pas d\'inscription, pas d\'IP stockée, messages détruits à l\'expiration ou après une lecture unique, zéro cookie, zéro tracking. Avec Proton, vous faites confiance à des promesses ; avec VeilDrop, il n\'y a rien à saisir.',
    faq_13_q: 'Combien de temps mes données sont-elles réellement conservées, précisément ?',
    faq_13_a: 'Maximum strict de 20 jours plus 24 heures : les messages sont supprimés à l\'expiration de la boîte et définitivement purgés du stockage UE sous 24 heures. Les compteurs de limites sont purgés en 2 heures, les compteurs quotidiens en 2 jours. Les jetons d\'accès sont détruits avec la boîte. Chaque message est en outre chiffré au repos en AES-256-GCM — la clé vit dans les secrets du serveur, jamais dans la base. Aucune donnée générée par l\'utilisateur n\'est conservée plus longtemps.',
    faq_14_q: 'Qu\'est-ce que le chiffrement de bout en bout (E2EE) et comment fonctionne-t-il sur VeilDrop ?',
    faq_14_a: 'L\'E2EE signifie que votre boîte est verrouillée par une clé publique que vous seul pouvez déverrouiller. À la création de votre boîte, votre navigateur génère une paire de clés RSA. La clé privée est enveloppée par une clé dérivée de votre phrase de récupération de 15 mots et seule la forme enveloppée est envoyée au serveur — le serveur ne voit jamais la clé privée en clair. Les courriels entrants sont ensuite chiffrés avec votre clé publique avant de toucher notre base de données : personne — ni l\'opérateur, ni une base volée, ni une réquisition — ne peut les lire sans votre phrase de récupération. Les messages sont stockés au format encv2: et ne peuvent être déchiffrés que dans votre navigateur. La contrepartie : nous ne pouvons pas analyser les courriels pour détecter abus, spam ou logiciels malveillants, et l\'export RGPD renvoie les données chiffrées brutes avec vos clés. Les courriels sortants restent non chiffrés car ils doivent transiter par le SMTP standard.',
    faq_15_q: 'Mon nom d\'utilisateur personnalisé est-il protégé ? Pourquoi certains noms sont-ils bloqués ?',
    faq_15_a: 'Votre nom d\'utilisateur personnalisé (ex. votre-nom@veildrop.fr) vous est réservé dès sa création, mais aucun mot de passe ne le protège : toute personne possédant la phrase de récupération de 15 mots y a accès. Certains noms sont réservés (contact, admin, support, etc.) et d\'autres sont bloqués par modération car ils usurpent une marque, une personnalité ou un service (ex. paypal, protonmail, police, dhl). Les noms bloqués ne peuvent pas être créés et sont retirés de l\'usage.',
    faq_16_q: 'Quelle est la limite d\'envoi quotidienne et que se passe-t-il quand elle est atteinte ?',
    faq_16_a: 'L\'envoi sortant est partagé entre tous les utilisateurs : 200 emails par jour via SendPulse (principal) et SMTP2GO (secours). Quand la limite est atteinte, l\'envoi est automatiquement désactivé jusqu\'au lendemain — la réception n\'est jamais affectée. La limite est réinitialisée chaque jour et les compteurs sont supprimés après 2 jours. Il n\'y a pas de file d\'attente : un message soumis après la limite est rejeté avec une erreur explicite.',
    faq_17_q: 'Puis-je utiliser VeilDrop pour mon activité professionnelle ou sur mon propre site ?',
    faq_17_a: 'VeilDrop est conçu pour les usages temporaires et jetables — inscriptions, validations, communication anonyme ponctuelle. L\'utiliser comme boîte principale, pour une correspondance professionnelle, pour des emails transactionnels (confirmations, factures, alertes) ou à haut volume est contraire à l\'usage prévu et techniquement impossible avec la limite d\'envoi quotidienne. Les usages automatisés abusifs (bots, inscriptions en masse, scraping) sont détectés et bloqués par IP et par nom d\'utilisateur.',
    faq_18_q: 'Que se passe-t-il si je perds ma phrase de récupération ?',
    faq_18_a: 'La phrase est générée localement dans votre navigateur et n\'est jamais stockée ni envoyée au serveur. Si vous la perdez et que les données du navigateur sont effacées, l\'accès à la boîte est perdu définitivement. La boîte reste chiffrée (encv2:) et les données sont illisibles — pour vous comme pour nous. Elles expireront d\'elles-mêmes et seront purgées. Il n\'existe aucun moyen de récupération : ne la perdez pas. Téléchargez le fichier .vdr en sauvegarde.',
    faq_19_q: 'Comment traitez-vous les signalements d\'abus ? Puis-je signaler un email ?',
    faq_19_a: 'Les signalements passent par report.veildrop.fr ou le Discord officiel. Chaque signalement est examiné par la modération : les noms d\'utilisateur malveillants ou réservés sont bloqués, les IP fautives sont bannies, et les contenus manifestement illicites sont retirés conformément à la LCEN (article 6.I.7) et au règlement DSA (article 16). Pour les boîtes E2EE, nous ne pouvons pas inspecter le contenu — c\'est le but du chiffrement — le signalement s\'appuie donc sur l\'adresse de l\'expéditeur, l\'objet et le contexte. Nous coopérons avec les autorités judiciaires dans le respect de la loi.',
    faq_20_q: 'C\'est vraiment gratuit ? Quel est le modèle économique ?',
    faq_20_a: 'VeilDrop est entièrement gratuit, sans publicité, sans suivi, sans offre premium et sans compte. Le service est financé par ses opérateurs. Les coûts sont maîtrisés par conception : fonctionnement à échelle réduite, hébergement sur plan gratuit, quota d\'envoi partagé. Il n\'y a aucune donnée à vendre : VeilDrop ne collecte rien d\'identifiable et ne peut pas lire le contenu chiffré de votre boîte.',
    faq_21_q: 'Les policiers / autorités peuvent-ils récupérer mes emails ? Seront-ils lisibles ?',
    faq_21_a: 'En tant qu\'hébergeur au sens de la loi française (LCEN art. 6.I-2), VeilDrop doit coopérer avec les autorités judiciaires : sur réquisition judiciaire, nous remettons tout ce que nous détenons — métadonnées, adresses d\'expéditeurs, sujets et corps des messages tels que stockés. Mais pour les boîtes E2EE, tout ce qui est stocké est chiffré (encv2:) avec une clé que vous seul détenez : la réquisition ne produirait que du texte chiffré illisible, inexploitable par quiconque — les autorités, nous, et vous-même (sans votre phrase de récupération). La phrase de récupération n\'est jamais stockée, jamais transmise, et aucune clé privée utilisable n\'existe sur nos serveurs (seule une clé privée enveloppée par une clé dérivée de votre phrase — incassable sans elle). Avertissement important : les emails SORTANTS transitent par le SMTP standard en clair et SONT lisibles par les autorités (et par les fournisseurs de messagerie concernés). Les emails entrants sont aussi reçus en clair via SMTP avant d\'être chiffrés au repos. En résumé : contenu au repos dans une boîte E2EE = illisible par tous ; emails en transit ou envoyés = lisibles. La rétention est aussi très courte par conception : 10 minutes à 20 jours, puis suppression définitive.',
    legal_title: 'Mentions légales',
    legal_updated: 'Dernière mise à jour : 18 août 2026',
    legal_1_title: 'Éditeur du service',
    legal_1_desc: 'VeilDrop est un projet individuel à titre non professionnel. Contact : <a href="mailto:contact@veildrop.fr">contact@veildrop.fr</a>',
    legal_1_anon: 'Conformément à l\'article 6-III de la loi n° 2004-575 (LCEN), l\'identité de l\'éditeur non professionnel n\'est pas divulguée au public ; elle est communiquée à l\'hébergeur et tenue à disposition des autorités judiciaires.',
    legal_2_title: 'Hébergeur',
    legal_2_desc: 'Cloudflare fournit CDN, protection DDoS, DNS, routage email et calcul serverless (Workers). Les données sont stockées dans Cloudflare D1, région UE (Londres). Les messages sont chiffrés au repos en AES-256-GCM.',
    legal_3_title: 'Fournisseurs d\'envoi email',
    legal_3_primary: 'fournisseur principal d\'envoi',
    legal_3_fallback: 'fournisseur de secours',
    legal_3_desc: 'Envoi sortant uniquement, transmis via TLS. SendPulse assure le routage email, SMTP2GO en secours.',
    legal_4_title: 'Droit applicable',
    legal_4_lcen: 'Loi n° 2004-575 du 21 juin 2004 (LCEN)',
    legal_4_lcen_desc: 'pour la confiance dans l\'économie numérique',
    legal_5_title: 'Responsabilité',
    legal_5_desc: 'VeilDrop est un hébergeur au sens de l\'article 6-I-2 de la LCEN : il stocke des contenus fournis automatiquement par des tiers (routage email), sans contrôle éditorial, et n\'a pas d\'obligation générale de surveillance des contenus stockés (article 6-II). La responsabilité est limitée aux cas où l\'opérateur, ayant eu connaissance de contenus illicites, n\'agit pas promptement.',
    legal_5_commit: 'Sur notification, VeilDrop s\'engage à retirer ou rendre inaccessible le contenu signalé dans les meilleurs délais.',
    legal_6_title: 'Signalement des abus',
    legal_6_desc: 'Pour signaler un contenu ou une activité illicite via VeilDrop, utilisez le',
    legal_7_title: 'Point de contact DSA',
    legal_7_desc: 'Point de contact électronique pour les autorités européennes et les utilisateurs au titre du règlement (UE) 2022/2065 (Digital Services Act) : les signalements sont traités selon la procédure notice-and-action, généralement sous 24-48 heures.',
    legal_7_contact: 'Contact : <a href="mailto:contact@veildrop.fr">contact@veildrop.fr</a>',
    legal_abuse_form: 'Formulaire de signalement',
    warn_send_title: 'Avant l\'envoi : cet email ne sera pas chiffré de bout en bout',
    warn_send_p1: 'Les emails sortants quittent VeilDrop en clair : le transport est protégé par TLS, mais le contenu reste lisible par nos relais SMTP (SendPulse / SMTP2GO) et par le fournisseur mail du destinataire. VeilDrop ne peut pas chiffrer un envoi de bout en bout.',
    warn_send_p2: 'Pourquoi c\'est impossible autrement : le chiffrement de bout en bout exige que les deux parties échangent une clé secrète avant tout message. Ici, le destinataire est un tiers quelconque (un site, une newsletter, un contact) qui ne connaît rien de votre phrase de 15 mots. L\'email entrant arrive aussi en clair via SMTP — avant qu\'aucune clé ne puisse s\'appliquer — et doit être traité par le service pour atteindre votre boîte.',
    warn_send_p3: 'Même si nous le voulions, rendre les messages stockés illisibles par quiconque — y compris l\'opérateur — est physiquement impossible avec le protocole email : chiffrer le courrier entrant avec une clé que vous seul détenez exigerait que le serveur détienne cette clé, ce qui annulerait le but.',
    warn_send_p4: 'Ce que VeilDrop garantit à la place : les messages entrants sont stockés chiffrés (AES-256-GCM), auto-supprimés sous 20 jours maximum, en lecture unique, et aucune identité n\'est jamais enregistrée. Ne transmettez jamais de mots de passe, identifiants ou données sensibles par email — chez nous comme ailleurs.',
    warn_send_dontshow: 'Ne plus afficher cette explication',
    warn_send_confirm: 'J\'ai compris — envoyer quand même',
    warn_send_cancel: 'Annuler',
    compose_note_not_e2ee: '⚠️ L\'email sortant est envoyé via SMTP standard (TLS) — il n\'est PAS chiffré de bout en bout. Seul le courrier entrant de votre boîte est E2EE. N\'envoyez jamais de mots de passe ou de données sensibles par email.',
  }
};

let currentLang = localStorage.getItem('veildrop_lang') || navigator.language?.startsWith('fr') ? 'fr' : 'en';
if (!I18N[currentLang]) currentLang = 'en';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  localStorage.setItem('veildrop_lang', currentLang);
  render();
}

// ===== STATE =====
let state = {
  mnemonic: null,
  inboxId: null,
  address: null,
  expiresAt: null,
  smtpRemaining: 200,
  messages: [],
  currentMessage: null,
  currentTtl: '10m',
  toRecipients: [],
  attachedFiles: [],
  adminKey: null,
};

let countdownTimer = null;
let refreshTimer = null;

// ===== UTILS =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function formatDate(ts) {
  return new Date(ts * 1000).toLocaleString();
}

function formatDateShort(ts) {
  return new Date(ts * 1000).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function toast(msg, type = 'success') {
  let container = $('#toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ===== API =====
async function apiGet(path, adminKey) {
  const headers = {};
  if (adminKey) headers['X-Admin-Key'] = adminKey;
  const r = await fetch(`${API}${path}`, { headers });
  return r.json();
}

async function apiPost(path, body, adminKey) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminKey) headers['X-Admin-Key'] = adminKey;
  const r = await fetch(`${API}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return r.json();
}

async function apiDelete(path, body, adminKey) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminKey) headers['X-Admin-Key'] = adminKey;
  const r = await fetch(`${API}${path}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body),
  });
  return r.json();
}

// ===== ROUTER =====
function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash.slice(1) || '';
  if (hash && hash !== '/') {
    if (hash === '/home') return { page: 'landing' };
    if (hash === '/auth') return { page: 'auth' };
    if (hash === '/inbox') return { page: 'inbox' };
    if (hash.startsWith('/message/')) return { page: 'message', id: hash.split('/message/')[1] };
    if (hash === '/compose') return { page: 'compose' };
    if (hash === '/terms') return { page: 'terms' };
    if (hash === '/privacy') return { page: 'privacy' };
    if (hash === '/legal') return { page: 'legal' };
    if (hash === '/abuse') return { page: 'abuse' };
    if (hash === '/admin') return { page: 'admin' };
    if (hash === '/contact') return { page: 'contact' };
    if (hash === '/faq') return { page: 'faq' };
    if (hash === '/help') return { page: 'help' };
    return { page: 'landing' };
  }
  // Real paths (SEO): /terms, /privacy, ... — served by the SPA fallback
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/terms') return { page: 'terms' };
  if (path === '/privacy') return { page: 'privacy' };
  if (path === '/legal') return { page: 'legal' };
  if (path === '/abuse') return { page: 'abuse' };
  if (path === '/faq') return { page: 'faq' };
  if (path === '/help') return { page: 'help' };
  if (path === '/contact') return { page: 'contact' };
  if (path === '/admin') return { page: 'admin' };
  return { page: 'landing' };
}

// Per-page SEO: title, description and canonical for real-path URLs
const PAGE_META = {
  landing: {
    title: 'VeilDrop — Free Temporary Email | Disposable Inbox',
    desc: 'VeilDrop is a 100% free temporary email service. Create a disposable anonymous inbox in seconds. No registration, no tracking, no cookies. Messages are erased as soon as you read them; inboxes expire after 10 minutes by default (up to 20 days). End-to-end encrypted. GDPR and LCEN compliant.',
  },
  terms: { title: 'Terms of Service — VeilDrop', desc: 'VeilDrop Terms of Service: free temporary email, acceptable use, liability, GDPR rights, abuse reporting and legal information for the operator.' },
  privacy: { title: 'Privacy Policy — VeilDrop', desc: 'VeilDrop Privacy Policy: no personal data collected, no cookies, no tracking, data stored in the EU, auto-deletion, end-to-end encryption, GDPR rights and international transfers.' },
  legal: { title: 'Legal Notice (Mentions légales) — VeilDrop', desc: 'Legal information about VeilDrop: publisher, host (Cloudflare), EU jurisdiction, GDPR and French LCEN compliance.' },
  abuse: { title: 'Report Abuse — VeilDrop', desc: 'Report abuse of the VeilDrop temporary email service: spam, phishing, illegal content or harassment. Complaints are reviewed and acted on.' },
  faq: { title: 'FAQ — VeilDrop Temporary Email', desc: 'Frequently asked questions about VeilDrop: how it works, privacy, encryption, GDPR, recovery phrases, sending emails, and what happens on legal requisition.' },
  help: { title: 'Help & Tutorials — VeilDrop', desc: 'Guides for VeilDrop: create a temporary mailbox, restore it with your 15-word phrase, send emails, use the API, and stay anonymous.' },
  contact: { title: 'Contact — VeilDrop', desc: 'Contact the VeilDrop team: send an email to contact@veildrop.fr for support, legal matters or press inquiries.' },
  admin: { title: 'Admin — VeilDrop', desc: 'VeilDrop administration panel.' },
};

function applyPageMeta(route) {
  const m = PAGE_META[route.page];
  if (!m) return;
  document.title = m.title;
  let el = document.querySelector('meta[name="description"]');
  if (el) el.setAttribute('content', m.desc);
  let canon = document.querySelector('link[rel="canonical"]');
  const href = 'https://veildrop.fr/' + (route.page === 'landing' ? '' : route.page);
  if (canon) canon.setAttribute('href', href);
  else {
    canon = document.createElement('link');
    canon.rel = 'canonical';
    canon.href = href;
    document.head.appendChild(canon);
  }
}

function requireAuth(route) {
  const protectedPages = ['inbox', 'message', 'compose'];
  if (protectedPages.includes(route.page) && !state.inboxId) return false;
  // Allow /admin route always - renderAdmin handles login form
  return true;
}

// ===== RENDER ENGINE =====
function render() {
  const route = getRoute();
  const app = $('#app');
  applyPageMeta(route);

  if (!requireAuth(route)) {
    if (route.page === 'admin') {
      navigate('/auth');
    } else {
      navigate('/');
    }
    return;
  }

  switch (route.page) {
    case 'landing': app.innerHTML = renderLanding(); bindLanding(); break;
    case 'auth': app.innerHTML = renderAuth(); bindAuth(); break;
    case 'inbox': renderMailbox('list'); break;
    case 'message': renderMailbox('message', route.id); break;
    case 'compose': renderMailbox('compose'); break;
    case 'terms': app.innerHTML = renderLegalPage(renderTerms()); bindLegalPage(); break;
    case 'privacy': app.innerHTML = renderLegalPage(renderPrivacy()); bindLegalPage(); break;
    case 'legal': app.innerHTML = renderLegalPage(renderLegal()); bindLegalPage(); break;
    case 'abuse': app.innerHTML = renderAbuse(); bindAbuse(); break;
    case 'admin': app.innerHTML = renderAdmin(); bindAdmin(); break;
    case 'contact': app.innerHTML = renderContact(); bindContact(); break;
    case 'faq': app.innerHTML = renderLegalPage(renderFaq()); bindLegalPage(); break;
    case 'help': app.innerHTML = renderLegalPage(renderHelp()); bindLegalPage(); break;
  }
}

// ===== LANGUAGE TOGGLE BUTTON =====
function langToggleBtn(extraClass) {
  const isEn = currentLang === 'en';
  return `<button class="lang-toggle ${extraClass || ''}" id="lang-toggle" title="${isEn ? 'Français' : 'English'}">${isEn ? '🇬🇧&nbsp;EN' : '🇫🇷&nbsp;FR'}</button>`;
}

// ===== LANDING PAGE =====
function renderLanding() {
  const isLoggedIn = !!state.inboxId;
  return `
    <div class="landing-page">
      <nav class="landing-nav">
        <a href="#/" style="text-decoration:none;color:var(--text);display:flex;align-items:center;gap:10px">
          <div class="nav-logo"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <strong style="font-size:18px;letter-spacing:-0.5px">VeilDrop</strong>
        </a>
        <div style="display:flex;align-items:center;gap:12px">
          <a href="#/contact" class="landing-nav-link">${t('landing_footer_contact')}</a>
          ${langToggleBtn()}
        </div>
      </nav>

      <section class="landing-hero">
        <div class="hero-badge">Temporary Email Service</div>
        <h1>${t('landing_hero_title')}</h1>
        <p class="hero-sub">${t('landing_hero_sub')}</p>
        <div class="landing-cta">
          <button class="btn btn-primary btn-lg" id="landing-cta-continue">${t('landing_cta_continue')}</button>
        </div>
      </section>

      <section class="landing-section">
        <h2 class="section-title">${t('landing_concept_title')}</h2>
        <div class="concept-grid">
          <div class="concept-text">
            <p>${t('landing_concept_p1')}</p>
            <p>${t('landing_concept_p2')}</p>
            <p>${t('landing_concept_p3')}</p>
          </div>
          <div class="concept-visual">
            <div class="concept-step"><span class="step-num">1</span><span>${t('landing_how_1_title')}</span></div>
            <div class="concept-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>
            <div class="concept-step"><span class="step-num">2</span><span>${t('landing_how_2_title')}</span></div>
            <div class="concept-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>
            <div class="concept-step"><span class="step-num">3</span><span>${t('landing_how_3_title')}</span></div>
          </div>
        </div>
      </section>

      <section class="landing-section">
        <h2 class="section-title">${t('landing_features_title')}</h2>
        <div class="features-grid">
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div><div><h4>${t('landing_feat_no_reg_title')}</h4><p>${t('landing_feat_no_reg_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></div><div><h4>${t('landing_feat_auto_title')}</h4><p>${t('landing_feat_auto_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div><div><h4>${t('landing_feat_encrypted_title')}</h4><p>${t('landing_feat_encrypted_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><h4>${t('landing_feat_send_title')}</h4><p>${t('landing_feat_send_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div><div><h4>${t('landing_feat_custom_title')}</h4><p>${t('landing_feat_custom_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><h4>${t('landing_feat_gdpr_title')}</h4><p>${t('landing_feat_gdpr_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div><h4>${t('landing_feat_multi_title')}</h4><p>${t('landing_feat_multi_desc')}</p></div></div>
          <div class="feature-card"><div class="feat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div><div><h4>${t('landing_feat_pwa_title')}</h4><p>${t('landing_feat_pwa_desc')}</p></div></div>
        </div>
      </section>

      <section class="landing-section">
        <div class="discord-banner">
          <h2>${t('landing_discord_title')}</h2>
          <p>${t('landing_discord_desc')}</p>
          <a href="https://discord.gg/BxDXa8c2vE" target="_blank" rel="noopener" class="btn btn-discord">${t('landing_discord_btn')}</a>
        </div>
      </section>

      <footer class="landing-footer">
        <div class="landing-footer-links">
          <a href="#/terms">${t('landing_footer_terms')}</a>
          <a href="#/privacy">${t('landing_footer_privacy')}</a>
          <a href="#/legal">${t('landing_footer_legal')}</a>
          <a href="#/abuse">${t('landing_footer_report')}</a>
          <a href="#/contact">${t('landing_footer_contact')}</a>
          <a href="/api" target="_blank">${t('landing_footer_api')}</a>
        </div>
        <p class="tagline">${t('landing_footer_tagline')}</p>
      </footer>
    </div>
  `;
}

function bindLanding() {
  $('#lang-toggle')?.addEventListener('click', toggleLang);
  $('#landing-cta-continue')?.addEventListener('click', () => navigate(state.inboxId ? '/inbox' : '/auth'));
  $$('.landing-footer-links a, .landing-nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#/')) {
        e.preventDefault();
        navigate(href.slice(1));
      }
    });
  });
}

// ===== CONTACT PAGE =====
function renderContact() {
  return `
    <div class="landing-page">
      <nav class="landing-nav">
        <div style="display:flex;align-items:center;gap:8px">
          <a href="#/" style="text-decoration:none;color:var(--text);display:flex;align-items:center;gap:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:var(--accent);display:inline-block"></span>
            <strong style="font-size:18px">VeilDrop</strong>
          </a>
        </div>
        ${langToggleBtn()}
      </nav>
      <div class="contact-page">
        <h1 style="font-size:28px;font-weight:700;margin-bottom:24px;text-align:center">${t('contact_title')}</h1>

        <div class="contact-card">
          <div class="contact-card-icon discord"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          <div class="contact-card-content">
            <h3>${t('contact_discord_title')}</h3>
            <p>${t('contact_discord_desc')}</p>
            <a href="https://discord.gg/BxDXa8c2vE" target="_blank" rel="noopener" class="btn btn-primary">${t('contact_discord_btn')}</a>
          </div>
        </div>

        <div class="contact-card">
          <div class="contact-card-icon email"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <div class="contact-card-content">
            <h3>${t('contact_email_title')}</h3>
            <p>${t('contact_email_desc')}</p>
            <a href="mailto:contact@veildrop.fr" class="btn btn-secondary">${t('contact_email_addr')}</a>
          </div>
        </div>

        <div class="contact-card">
          <div class="contact-card-icon report"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <div class="contact-card-content">
            <h3>${t('contact_report_title')}</h3>
            <p>${t('contact_report_desc')}</p>
            <a href="https://report.veildrop.fr" target="_blank" rel="noopener" class="btn btn-danger">${t('contact_report_btn')}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindContact() {
  $('#lang-toggle')?.addEventListener('click', toggleLang);
}

// ===== LEGAL PAGES (standalone, scrollable) =====
function renderLegalPage(mainContent) {
  return `
    <div class="legal-page-wrapper">
      <nav class="landing-nav">
        <div style="display:flex;align-items:center;gap:8px">
          <a href="#/" style="text-decoration:none;color:var(--text);display:flex;align-items:center;gap:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:var(--accent);display:inline-block"></span>
            <strong style="font-size:18px">VeilDrop</strong>
          </a>
        </div>
        ${langToggleBtn()}
      </nav>
      <main class="legal-main">${mainContent}</main>
    </div>
  `;
}

function bindLegalPage() {
  $('#lang-toggle')?.addEventListener('click', toggleLang);
  $$('.legal-page a[href^="#/"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.getAttribute('href').slice(1));
    });
  });
}

// ===== SHELL (sidebar + main) =====
function renderShell(mainContent) {
  const unreadCount = state.messages.filter(m => !m.is_read).length;
  const smtpPct = Math.round((state.smtpRemaining / 200) * 100);
  const smtpClass = state.smtpRemaining <= 0 ? 'full' : state.smtpRemaining < 50 ? 'warn' : '';
  const remaining = state.expiresAt ? Math.max(0, state.expiresAt - Math.floor(Date.now() / 1000)) : 0;
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const countdownText = remaining > 3600 ? `${h}h ${m}m` : remaining > 60 ? `${m}m ${s}s` : `${s}s`;
  const urgentClass = remaining < 300 ? ' urgent' : '';

  return `
    <div class="shell">
      <div class="sidebar">
        <div class="sidebar-header">
          <h1><span class="dot"></span> VeilDrop</h1>
          <p>${t('auth_subtitle')}</p>
        </div>
        <div class="sidebar-nav">
          <div class="sidebar-section">
            <div class="sidebar-section-title">${t('mailbox_title')}</div>
            <div class="sidebar-item" data-nav="home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Home
            </div>
            <div class="sidebar-item active" data-nav="inbox">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              ${t('mailbox_title')}
              ${unreadCount > 0 ? `<span class="badge">${unreadCount}</span>` : ''}
            </div>
            <div class="sidebar-item" data-nav="compose">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              ${t('mailbox_compose')}
            </div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-section-title">${t('sidebar_legal_help')}</div>
            <div class="sidebar-item" data-nav="terms">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              ${t('auth_terms')}
            </div>
            <div class="sidebar-item" data-nav="privacy">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              ${t('auth_privacy')}
            </div>
            <div class="sidebar-item" data-nav="abuse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              ${t('landing_footer_report')}
            </div>
            <div class="sidebar-item" data-nav="contact">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              ${t('landing_footer_contact')}
            </div>
<div class="sidebar-item" data-nav="faq">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              ${t('faq_title')}
            </div>
            <div class="sidebar-item" data-nav="help">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              ${t('help_title')}
            </div>
          </div>
        </div>
        <div class="sidebar-lang">${langToggleBtn()}</div>
        <div class="sidebar-footer">
          <div class="countdown-row">
            <span class="countdown-label">${t('countdown_expires')}</span>
            <span class="countdown-value${urgentClass}" id="countdown">${countdownText}</span>
          </div>
          <div class="smtp-row">
            <span>${t('smtp_sent')}</span>
            <span>${200 - state.smtpRemaining}/200</span>
          </div>
          <div class="smtp-bar"><div class="smtp-bar-fill ${smtpClass}" style="width:${smtpPct}%"></div></div>
          <div class="sidebar-footer-btns">
            <button class="btn btn-secondary btn-sm" style="flex:1" id="btn-extend">${t('action_extend')}</button>
            <button class="btn btn-ghost btn-sm" style="flex:1" id="btn-phrase">${t('action_recovery')}</button>
            <button class="btn btn-danger btn-sm" style="flex:1" id="btn-nuke">${t('action_nuke')}</button>
          </div>
        </div>
      </div>
      <div class="main">
        ${mainContent}
      </div>
    </div>
    ${renderModals()}
  `;
}

function renderModals() {
  return `
    <div class="modal-overlay hidden" id="modal-phrase">
      <div class="modal">
        <h3>${t('modal_phrase_title')}</h3>
        <p>${t('modal_phrase_desc')}</p>
        <div class="phrase-grid" id="phrase-grid"></div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-secondary" style="flex:1" id="btn-dl-vdr">${t('modal_phrase_download')}</button>
          <button class="btn btn-primary" style="flex:1" id="btn-close-phrase">${t('modal_phrase_done')}</button>
        </div>
      </div>
    </div>
    <div class="modal-overlay hidden" id="modal-extend">
      <div class="modal">
        <h3>${t('modal_extend_title')}</h3>
        <p>${t('modal_extend_desc')}</p>
        <div class="ttl-grid" style="margin:16px 0">
          <div class="ttl-chip" data-ttl="10m">10 min</div>
          <div class="ttl-chip" data-ttl="1h">1 hour</div>
          <div class="ttl-chip" data-ttl="1d">1 day</div>
          <div class="ttl-chip active" data-ttl="20d">20 days</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" style="flex:1" id="btn-confirm-extend">${t('modal_extend_btn')}</button>
          <button class="btn btn-secondary" style="flex:1" id="btn-close-extend">${t('auth_cancel')}</button>
        </div>
      </div>
    </div>
    <div class="modal-overlay hidden" id="modal-nuke">
      <div class="modal">
        <h3>${t('modal_nuke_title')}</h3>
        <p>${t('modal_nuke_desc')}</p>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-danger" style="flex:1" id="btn-confirm-nuke">${t('modal_nuke_confirm')}</button>
          <button class="btn btn-secondary" style="flex:1" id="btn-close-nuke">${t('modal_nuke_cancel')}</button>
        </div>
      </div>
    </div>
    <div class="modal-overlay hidden" id="modal-send-warning">
      <div class="modal" style="max-width:560px">
        <h3>${t('warn_send_title')}</h3>
        <p style="font-size:13px;line-height:1.6;color:#94a3b8;margin:10px 0">${t('warn_send_p1')}</p>
        <p style="font-size:13px;line-height:1.6;color:#94a3b8;margin:10px 0">${t('warn_send_p2')}</p>
        <p style="font-size:13px;line-height:1.6;color:#94a3b8;margin:10px 0">${t('warn_send_p3')}</p>
        <p style="font-size:13px;line-height:1.6;color:#fbbf24;margin:10px 0">${t('warn_send_p4')}</p>
        <label style="display:flex;align-items:center;gap:8px;font-size:13px;margin:12px 0;cursor:pointer">
          <input type="checkbox" id="send-warning-dontshow" style="accent-color:#6366f1">
          ${t('warn_send_dontshow')}
        </label>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" style="flex:1" id="btn-confirm-send">${t('warn_send_confirm')}</button>
          <button class="btn btn-secondary" style="flex:1" id="btn-close-send">${t('warn_send_cancel')}</button>
        </div>
      </div>
    </div>
  `;
}

function bindShell() {
  $$('.sidebar-item[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      const nav = el.dataset.nav;
      if (nav === 'home') navigate('/home');
      else if (nav === 'inbox') navigate('/inbox');
      else if (nav === 'compose') navigate('/compose');
      else if (nav === 'terms') navigate('/terms');
      else if (nav === 'privacy') navigate('/privacy');
      else if (nav === 'legal') navigate('/legal');
      else if (nav === 'abuse') navigate('/abuse');
      else if (nav === 'contact') navigate('/contact');
      else if (nav === 'faq') navigate('/faq');
      else if (nav === 'help') navigate('/help');
    });
  });

  $('#lang-toggle')?.addEventListener('click', toggleLang);

  startCountdown();

  const btnExtend = $('#btn-extend');
  const btnPhrase = $('#btn-phrase');
  const btnNuke = $('#btn-nuke');
  if (btnExtend) btnExtend.addEventListener('click', () => $('#modal-extend')?.classList.remove('hidden'));
  if (btnPhrase) btnPhrase.addEventListener('click', showPhrase);
  if (btnNuke) btnNuke.addEventListener('click', () => $('#modal-nuke')?.classList.remove('hidden'));

  const btnClosePhrase = $('#btn-close-phrase');
  const btnDlVdr = $('#btn-dl-vdr');
  if (btnClosePhrase) btnClosePhrase.addEventListener('click', () => $('#modal-phrase')?.classList.add('hidden'));
  if (btnDlVdr) btnDlVdr.addEventListener('click', downloadVdr);

  $$('#modal-extend .ttl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('#modal-extend .ttl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
  const btnConfirmExtend = $('#btn-confirm-extend');
  const btnCloseExtend = $('#btn-close-extend');
  if (btnConfirmExtend) btnConfirmExtend.addEventListener('click', doExtend);
  if (btnCloseExtend) btnCloseExtend.addEventListener('click', () => $('#modal-extend')?.classList.add('hidden'));

  const btnConfirmNuke = $('#btn-confirm-nuke');
  const btnCloseNuke = $('#btn-close-nuke');
  if (btnConfirmNuke) btnConfirmNuke.addEventListener('click', doNuke);
  if (btnCloseNuke) btnCloseNuke.addEventListener('click', () => $('#modal-nuke')?.classList.add('hidden'));

  const btnConfirmSend = $('#btn-confirm-send');
  const btnCloseSend = $('#btn-close-send');
  if (btnConfirmSend) btnConfirmSend.addEventListener('click', () => {
    if ($('#send-warning-dontshow')?.checked) localStorage.setItem('veildrop_send_warning_ok', '1');
    $('#modal-send-warning')?.classList.add('hidden');
    performSend();
  });
  if (btnCloseSend) btnCloseSend.addEventListener('click', () => $('#modal-send-warning')?.classList.add('hidden'));

  $$('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', (e) => { if (e.target === ov) ov.classList.add('hidden'); });
  });
}

// ===== COUNTDOWN =====
function startCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    if (!state.expiresAt) return;
    const remaining = Math.max(0, state.expiresAt - Math.floor(Date.now() / 1000));
    const badge = $('#countdown');
    if (!badge) return;
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    badge.textContent = remaining > 3600 ? `${h}h ${m}m` : remaining > 60 ? `${m}m ${s}s` : `${s}s`;
    badge.className = 'countdown-value' + (remaining < 300 ? ' urgent' : '');
    if (remaining <= 0) {
      clearInterval(countdownTimer);
      badge.textContent = t('countdown_expired');
      badge.className = 'countdown-value urgent';
    }
  }, 1000);
}

// ===== AUTH PAGE =====
function renderAuth() {
  return `
    <div class="auth-page">
      ${langToggleBtn('auth-lang')}
      <div class="auth-card">
        <div class="auth-logo">
          <h1>${t('auth_title')}</h1>
          <p>${t('auth_subtitle')}</p>
        </div>
        <div class="auth-legal">
          <label class="check-row">
            <input type="checkbox" id="accept-tos">
            <span>${t('auth_accept_tos')} <a href="#/terms">${t('auth_terms')}</a> ${t('auth_and')} <a href="#/privacy">${t('auth_privacy')}</a></span>
          </label>
        </div>
        <div class="auth-btns disabled" id="auth-btns">
          <button class="btn btn-primary" id="btn-create" style="width:100%">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ${t('auth_new')}
          </button>
          <div style="text-align:center;font-size:12px;color:var(--text-dim);margin:4px 0">${t('auth_or')}</div>
          <button class="btn btn-secondary" id="btn-restore" style="width:100%">${t('auth_restore')}</button>
          <button class="btn btn-secondary" id="btn-upload" style="width:100%">${t('auth_upload')}</button>
          <input type="file" id="vdr-input" accept=".vdr,.txt" hidden>
        </div>
        <div id="ttl-area" style="display:none">
          <div class="ttl-section">
            <span class="ttl-label">${t('auth_ttl_label')}</span>
            <div class="ttl-grid">
              <div class="ttl-chip active" data-ttl="10m">10 min</div>
              <div class="ttl-chip" data-ttl="1h">1 hour</div>
              <div class="ttl-chip" data-ttl="1d">1 day</div>
              <div class="ttl-chip" data-ttl="20d">20 days</div>
            </div>
            <div class="ttl-hint">${t('auth_ttl_hint')}</div>
          </div>
          <div style="margin-top:12px">
            <label style="font-size:13px;color:var(--text-sec);display:block;margin-bottom:4px">${t('auth_custom_label')}</label>
            <div style="display:flex;align-items:center;gap:4px">
              <input type="text" id="custom-username" placeholder="yourname" style="flex:1;padding:8px 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-family:var(--mono);font-size:13px">
              <button type="button" class="btn btn-secondary btn-sm" id="btn-random-username" title="Generate random address" style="padding:8px 10px">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
              </button>
              <span style="color:var(--text-dim);font-size:13px">@veildrop.fr</span>
            </div>
            <div class="hint">${t('auth_custom_hint')}</div>
          </div>
          <button class="btn btn-primary" id="btn-create-confirm" style="width:100%;margin-top:12px">${t('auth_create')}</button>
          <button class="btn btn-ghost" id="btn-back-auth" style="width:100%;margin-top:6px">${t('auth_back')}</button>
        </div>
        <div id="restore-area" style="display:none" class="restore-area">
          <textarea id="mnemonic-input" placeholder="${t('auth_phrase_placeholder')}" rows="3"></textarea>
          <input type="text" id="restore-address" placeholder="${t('auth_restore_address')}" style="width:100%;padding:8px 10px;margin-top:8px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-family:var(--mono);font-size:13px">
          <div class="restore-row">
            <button class="btn btn-primary" style="flex:1" id="btn-connect">${t('auth_connect')}</button>
            <button class="btn btn-secondary" style="flex:1" id="btn-cancel-restore">${t('auth_cancel')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindAuth() {
  $('#lang-toggle')?.addEventListener('click', toggleLang);

  const acceptTos = $('#accept-tos');
  const authBtns = $('#auth-btns');
  const ttlArea = $('#ttl-area');
  const restoreArea = $('#restore-area');

  acceptTos.addEventListener('change', () => {
    authBtns.classList.toggle('disabled', !acceptTos.checked);
  });

  $('#btn-create').addEventListener('click', () => {
    authBtns.style.display = 'none';
    ttlArea.style.display = 'block';
  });

  $('#btn-back-auth').addEventListener('click', () => {
    authBtns.style.display = '';
    ttlArea.style.display = 'none';
  });

  $$('#ttl-area .ttl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('#ttl-area .ttl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentTtl = chip.dataset.ttl;
    });
  });

  // Random username generator
  $('#btn-random-username')?.addEventListener('click', () => {
    const words = ['swift','blue','dark','nova','star','flux','echo','vox','zen','arc','neo','hex','ion','bit','jet','sky','owl','fox','gem','ash','oak','elm'];
    const adj = ['rapid','vivid','prime','noble','vast','pure','bold','calm','keen','cool','deep','fair','wise','free','safe','true','wild','soft'];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const num = Math.floor(Math.random() * 999);
    const name = `${pick(adj)}${pick(words)}${num}`;
    const inp = $('#custom-username');
    if (inp) inp.value = name;
  });

  $('#btn-create-confirm').addEventListener('click', doCreate);

  $('#btn-restore').addEventListener('click', () => {
    authBtns.style.display = 'none';
    restoreArea.style.display = 'block';
  });
  $('#btn-cancel-restore').addEventListener('click', () => {
    authBtns.style.display = '';
    restoreArea.style.display = 'none';
  });
  $('#btn-connect').addEventListener('click', doRestore);

  $('#btn-upload').addEventListener('click', () => $('#vdr-input').click());
  $('#vdr-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    $('#mnemonic-input').value = lines[0] || '';
    const addrEl = $('#restore-address');
    if (addrEl) addrEl.value = lines[1] || '';
    authBtns.style.display = 'none';
    restoreArea.style.display = 'block';
  });
}

async function doCreate() {
  const btn = $('#btn-create-confirm');
  btn.disabled = true;
  btn.textContent = t('auth_creating');
  try {
    const words = await VeilCrypto.generateMnemonic();
    const mnemonic = words.join(' ');
    const inboxId = await VeilCrypto.inboxIdFromMnemonic(words);
    const localPart = await VeilCrypto.localPartFromMnemonic(words);
    const customAddr = $('#custom-username')?.value?.trim() || localPart;
    const e2eeKeys = await VeilCrypto.generateE2eeKeys(words);
    const result = await apiPost('/api/inbox', { inbox_id: inboxId, ttl: state.currentTtl, custom_address: customAddr, pubkey: e2eeKeys.pubkey, privkey_enc: e2eeKeys.privkey_enc });
    if (result.error) { toast(result.error, 'error'); return; }

    state.mnemonic = mnemonic;
    state.inboxId = result.inbox_id;
    state.address = result.address;
    state.expiresAt = result.expires_at;
    state.smtpRemaining = result.smtp_remaining || 200;
    localStorage.setItem('veildrop_inboxId', state.inboxId);

    await refreshMessages();
    navigate('/inbox');
    setTimeout(() => showPhrase(words), 300);
  } catch (e) {
    toast('Failed to create mailbox: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = t('auth_create');
  }
}

async function doRestore() {
  const phrase = $('#mnemonic-input').value.trim();

  if (phrase.split(/\s+/).length === 1) {
    const r = await apiPost('/api/admin/check', { keyword: phrase });
    if (r && r.access) {
      localStorage.setItem('veildrop_admin', '1');
      state.adminKey = phrase;
      navigate('/admin');
      return;
    }
  }

  const words = phrase.split(/\s+/);
  if (words.length !== 15) { toast(t('toast_invalid_phrase'), 'error'); return; }

  // Validate words are from the BIP39 wordlist (rejects garbage from failed fetches)
  const validWords = await VeilCrypto.loadWordlist();
  const badWord = words.find(w => !validWords.includes(w.toLowerCase()));
  if (badWord) { toast(`Invalid recovery word: "${badWord}"`, 'error'); return; }

  const btn = $('#btn-connect');
  btn.disabled = true;
  try {
    const mnemonic = words.join(' ');
    const inboxId = await VeilCrypto.inboxIdFromMnemonic(words);
    const savedAddress = $('#restore-address')?.value?.trim() || '';
    const result = await apiPost(`/api/inbox/${inboxId}/restore`, { address: savedAddress });
    if (result.error) { toast(result.error, 'error'); return; }

    state.mnemonic = mnemonic;
    state.inboxId = result.inbox_id;
    state.address = result.address;
    state.expiresAt = result.expires_at;
    state.smtpRemaining = result.smtp_remaining || 200;
    localStorage.setItem('veildrop_inboxId', state.inboxId);

    await refreshMessages();
    navigate('/inbox');
  } catch (e) {
    toast('Failed to restore: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
  }
}

// ===== MAILBOX =====
async function refreshMessages() {
  if (!state.inboxId) return;
  try {
    const data = await apiGet(`/api/inbox/${state.inboxId}/messages`);
    if (data.expired) { toast(t('toast_expired'), 'error'); logout(); return; }
    state.messages = data.messages || [];
    state.smtpRemaining = data.smtp_remaining ?? 200;
    if (data.expires_at) state.expiresAt = data.expires_at;

    if (data.e2ee === 1 || data.e2ee === true) {
      state.e2ee = true;
      state.privkeyEnc = data.privkey_enc || null;
      if (state.privkeyEnc && state.mnemonic) {
        let privKey = state.privKey;
        if (!privKey) {
          privKey = await VeilCrypto.unwrapPrivateKey(state.privkeyEnc, state.mnemonic.split(' '));
          state.privKey = privKey;
        }
        for (const m of state.messages) {
          const dec = await VeilCrypto.e2eeDecryptMessage(privKey, {
            subject: m.subject, body: m.body_enc, body_html: m.body_html, attachments: m.attachments
          });
          m.subject = dec.subject;
          m.body_enc = dec.body;
          m.body_html = dec.body_html;
          m.attachments = dec.attachments;
          if (dec.attachments === null) m.attachments = [];
        }
      }
    } else {
      state.e2ee = false;
      state.privkeyEnc = null;
      state.privKey = null;
    }
  } catch (e) { console.error(e); }
}

function renderMailbox(view, messageId) {
  refreshMessages().then(() => {
    const app = $('#app');
    let mainContent = '';

    if (view === 'list') {
      mainContent = renderMessageList();
    } else if (view === 'message') {
      const msg = state.messages.find(m => m.id === messageId);
      mainContent = renderMessageView(msg);
    } else if (view === 'compose') {
      mainContent = renderCompose();
    }

    app.innerHTML = renderShell(mainContent);
    bindShell();

    if (view === 'list') bindMessageList();
    if (view === 'message') bindMessageView();
    if (view === 'compose') bindCompose();

    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(async () => {
      await refreshMessages();
      if (getRoute().page === 'inbox') {
        const main = $('.main');
        if (main) { main.innerHTML = renderMessageList(); bindMessageList(); }
      }
    }, 30000);
  });
}

function renderMessageList() {
  if (state.messages.length === 0) {
    return `
      <div class="main-header">
        <h2>${t('mailbox_title')}</h2>
        <span style="font-size:13px;color:var(--text-dim);font-family:var(--mono)">${escapeHtml(state.address || '')}</span>
      </div>
      <div class="main-content">
        <div class="empty-state">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <h3>${t('mailbox_empty_title')}</h3>
          <p>${t('mailbox_empty_desc')} <strong>${escapeHtml(state.address || '')}</strong></p>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:12px">
            <button class="btn btn-secondary btn-sm" id="btn-copy-addr">${t('mailbox_copy')}</button>
            <button class="btn btn-secondary btn-sm" id="btn-refresh-empty">${t('mailbox_refresh')}</button>
          </div>
          <div style="max-width:460px;margin:28px auto 0;text-align:left;display:flex;flex-direction:column;gap:14px">
            <div style="display:flex;gap:10px;align-items:flex-start">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">1</span>
              <div><strong>${t('ob_step1_t')}</strong><div style="font-size:13px;color:var(--text-dim)">${t('ob_step1_d')}</div></div>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">2</span>
              <div><strong>${t('ob_step2_t')}</strong><div style="font-size:13px;color:var(--text-dim)">${t('ob_step2_d')}</div></div>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">3</span>
              <div><strong>${t('ob_step3_t')}</strong><div style="font-size:13px;color:var(--text-dim)">${t('ob_step3_d')}</div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="main-header">
      <h2>${t('mailbox_title')}</h2>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-icon" id="btn-copy-addr" title="${t('mailbox_copy')}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
        <button class="btn-icon" id="btn-refresh" title="${t('mailbox_refresh')}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </button>
      </div>
    </div>
    <div class="main-content">
      <div class="msg-list">
        ${state.messages.map(m => {
          const d = new Date(m.received_at * 1000);
          const isToday = new Date().toDateString() === d.toDateString();
          const dateStr = isToday ? d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : d.toLocaleDateString([], {month:'short', day:'numeric'});
          const hasAttach = m.attachments?.length > 0;
          const preview = (m.body_enc || '').slice(0, 80).replace(/\n/g, ' ');
          return `
            <div class="msg-item ${m.is_read ? '' : 'unread'}" data-id="${m.id}">
              <span class="msg-from">${escapeHtml(m.from)}</span>
              <span class="msg-subject">${escapeHtml(m.subject || t('msg_no_subject'))}</span>
              <span class="msg-preview">${escapeHtml(preview)}</span>
              ${hasAttach ? '<span class="msg-attach-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></span>' : ''}
              <span class="msg-date">${dateStr}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function bindMessageList() {
  $$('.msg-item').forEach(el => {
    el.addEventListener('click', () => navigate('/message/' + el.dataset.id));
  });
  const btnCopy = $('#btn-copy-addr');
  if (btnCopy) btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(state.address).then(() => toast(t('toast_copied')));
  });
  const btnRefresh = $('#btn-refresh');
  if (btnRefresh) btnRefresh.addEventListener('click', () => renderMailbox('list'));
  const btnRefreshEmpty = $('#btn-refresh-empty');
  if (btnRefreshEmpty) btnRefreshEmpty.addEventListener('click', () => renderMailbox('list'));
}

// ===== CID IMAGE RESOLUTION =====
function resolveCidAttachments(html, attachments) {
  if (!html || !attachments?.length) return html;
  let resolved = html;
  for (const att of attachments) {
    if (att.contentId && att.content) {
      const cid = att.contentId.replace(/^<|>$/g, '');
      const dataUrl = `data:${att.mimeType};base64,${att.content}`;
      resolved = resolved.replace(new RegExp(`cid:${cid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), dataUrl);
    }
  }
  return resolved;
}

// ===== MESSAGE VIEW (Gmail-like) =====
function renderMessageView(msg) {
  if (!msg) return `<div class="main-content"><div class="empty-state"><h3>${t('msg_not_found')}</h3></div></div>`;

  const fromName = (msg.from || '').split('@')[0];
  const avatarLetter = fromName.charAt(0).toUpperCase();
  const dateFormatted = formatDateShort(msg.received_at);
  const subject = msg.subject || t('msg_no_subject');
  const toAddr = state.address || '';

  const attachHtml = msg.attachments?.length > 0 ? `
    <div class="msg-view-attachments">
      <div class="msg-view-attachments-title">${t('msg_attachments')} (${msg.attachments.length})</div>
      ${msg.attachments.map((att, i) => `
        <div class="attach-chip" data-attach="${i}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <div class="attach-chip-info">
            <span class="attach-chip-name">${escapeHtml(att.filename)}</span>
            <span class="attach-chip-size">${formatSize(att.size)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="msg-view">
      <div class="msg-view-topbar">
        <button class="btn-icon" id="btn-back-list" title="${t('msg_back')}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <div class="msg-view-subject-line">${escapeHtml(subject)}</div>
      </div>
      <div class="msg-view-header">
        <div class="msg-avatar">${avatarLetter}</div>
        <div class="msg-header-meta">
          <div class="msg-header-from">${escapeHtml(msg.from)}</div>
          <div class="msg-header-details">
            <span>${t('msg_to')}: ${escapeHtml(toAddr)}</span>
            <span>&middot;</span>
            <span>${dateFormatted}</span>
          </div>
        </div>
      </div>
      <div class="msg-view-body-content" id="msg-body"></div>
      ${attachHtml}
      <div class="msg-view-actions">
        <button class="btn btn-secondary btn-sm" id="btn-reply">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
          ${t('msg_reply')}
        </button>
        <button class="btn btn-secondary btn-sm" id="btn-forward">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
          ${t('msg_forward')}
        </button>
      </div>
    </div>
  `;
}

function bindMessageView() {
  const route = getRoute();
  const msg = state.messages.find(m => m.id === route.id);

  $('#btn-back-list')?.addEventListener('click', () => {
    // Delete-on-back: going back from a read message destroys it (site policy)
    if (msg && state.inboxId) {
      fetch(`${API}/api/inbox/${state.inboxId}/message/${msg.id}`, { method: 'DELETE' })
        .catch(() => {});
      state.messages = state.messages.filter(m => m.id !== msg.id);
    }
    navigate('/inbox');
  });

  if (msg) {
    const bodyEl = $('#msg-body');
    const resolvedHtml = resolveCidAttachments(msg.body_html, msg.attachments);
    if (resolvedHtml) {
      const iframe = document.createElement('iframe');
      iframe.sandbox = 'allow-same-origin';
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      bodyEl.appendChild(iframe);
      const doc = iframe.contentDocument;
      doc.open();
      doc.write('<html><body style="margin:0;font-family:Inter,-apple-system,sans-serif;font-size:14px;line-height:1.6;color:#1c1e21">' + resolvedHtml + '</body></html>');
      doc.close();
      setTimeout(() => {
        try { iframe.style.height = Math.max(300, doc.body.scrollHeight + 20) + 'px'; } catch(e) {}
      }, 500);
    } else {
      bodyEl.innerHTML = `<pre style="white-space:pre-wrap;word-wrap:break-word;font-size:14px;line-height:1.7;color:var(--text)">${escapeHtml(msg.body_enc || '')}</pre>`;
    }

    $$('.attach-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const att = msg.attachments[parseInt(chip.dataset.attach)];
        if (!att?.content) return;
        const bin = atob(att.content);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const blob = new Blob([bytes], { type: att.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = att.filename;
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
      });
    });

    $('#btn-reply')?.addEventListener('click', () => {
      state.composeDraft = {
        to: [msg.from],
        attachments: [],
        subject: (msg.subject || '').startsWith('Re:') ? msg.subject : `Re: ${msg.subject || ''}`,
        body: ''
      };
      navigate('/compose');
    });

    $('#btn-forward')?.addEventListener('click', () => {
      const fromLabel = t('msg_forward_on');
      const wroteLabel = t('msg_forward_wrote');
      state.composeDraft = {
        to: [],
        attachments: (msg.attachments || []).map(att => ({
          name: att.filename,
          size: att.size,
          type: att.mimeType,
          _base64: att.content,
        })),
        subject: (msg.subject || '').startsWith('Fwd:') ? msg.subject : `Fwd: ${msg.subject || ''}`,
        body: `\n\n--- ${t('msg_forward_header')} ---\n${fromLabel} ${formatDateShort(msg.received_at)}, ${msg.from} ${wroteLabel}\n> ${(msg.body_enc || '').split('\n').join('\n> ')}`
      };
      navigate('/compose');
    });

    apiPost(`/api/inbox/${state.inboxId}/read`, { message_id: msg.id });
  }
}

// ===== COMPOSE =====
function renderCompose() {
  const canSend = state.smtpRemaining > 0;
  const draft = state.composeDraft;
  if (draft) {
    state.toRecipients = draft.to || [];
    state.attachedFiles = draft.attachments || [];
    state.composeDraft = null;
  }
  const draftSubject = draft ? draft.subject : '';
  const draftBody = draft ? draft.body : '';
  const recipientTags = state.toRecipients.map((r, i) =>
    `<span class="to-tag">${escapeHtml(r)} <button data-idx="${i}">&times;</button></span>`
  ).join('');

  const attachChips = state.attachedFiles.map((f, i) =>
    `<span class="compose-attach-chip">${escapeHtml(f.name)} <button data-idx="${i}">&times;</button></span>`
  ).join('');

  return `
    <div class="compose-page">
      <div class="main-header">
        <h2>${t('compose_title')}</h2>
        <button class="btn-icon" id="btn-back-compose" title="${t('msg_back')}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
      </div>
      ${!canSend ? `<div style="padding:12px 24px;background:var(--danger-light);color:var(--danger);font-size:13px;font-weight:500">${t('compose_limit_reached')}</div>` : ''}
      <div style="padding:10px 24px;background:var(--info-light,rgba(255,193,7,.12));color:#b8860b;font-size:12px;line-height:1.5">${t('compose_note_not_e2ee')}</div>
      <div class="compose-fields">
        <div class="compose-field">
          <label>${t('compose_to')}</label>
          <div class="compose-to-tags" id="to-tags">
            ${recipientTags}
            <input type="email" class="compose-to-input" id="compose-to" placeholder="${state.toRecipients.length ? '' : t('compose_to_placeholder')}" ${!canSend ? 'disabled' : ''}>
            <button class="btn btn-sm btn-secondary" id="btn-add-recipient" ${!canSend ? 'disabled' : ''}>${t('compose_add')}</button>
          </div>
        </div>
        <div class="compose-field">
          <label>${t('compose_subject')}</label>
          <input type="text" id="compose-subject" placeholder="${t('compose_subject')}" value="${escapeHtml(draftSubject)}" ${!canSend ? 'disabled' : ''}>
        </div>
      </div>
      <div class="compose-editor-toolbar" id="editor-toolbar" style="display:none">
        <div class="toolbar-group">
          <button class="toolbar-btn" data-cmd="bold" title="${t('editor_bold')}"><b>B</b></button>
          <button class="toolbar-btn" data-cmd="italic" title="${t('editor_italic')}"><i>I</i></button>
          <button class="toolbar-btn" data-cmd="underline" title="${t('editor_underline')}"><u>U</u></button>
          <button class="toolbar-btn" data-cmd="strikeThrough" title="${t('editor_strike')}"><s>S</s></button>
        </div>
        <div class="toolbar-sep"></div>
        <div class="toolbar-group">
          <select class="toolbar-select" id="toolbar-font" title="${t('editor_font')}">
            <option value="">Font</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times</option>
            <option value="Courier New">Courier</option>
            <option value="Verdana">Verdana</option>
            <option value="Trebuchet MS">Trebuchet</option>
          </select>
          <select class="toolbar-select" id="toolbar-size" title="${t('editor_size')}">
            <option value="">Size</option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
        </div>
        <div class="toolbar-sep"></div>
        <div class="toolbar-group">
          <input type="color" class="toolbar-color" id="toolbar-color" value="#000000" title="Text color">
          <input type="color" class="toolbar-color" id="toolbar-bg" value="#ffffff" title="Highlight color">
        </div>
        <div class="toolbar-sep"></div>
        <div class="toolbar-group">
          <button class="toolbar-btn" data-cmd="insertUnorderedList" title="Bullet list">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button class="toolbar-btn" data-cmd="insertOrderedList" title="Numbered list">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="8" font-size="8" fill="currentColor" stroke="none">1</text><text x="2" y="14" font-size="8" fill="currentColor" stroke="none">2</text><text x="2" y="20" font-size="8" fill="currentColor" stroke="none">3</text></svg>
          </button>
        </div>
        <div class="toolbar-sep"></div>
        <div class="toolbar-group">
          <button class="toolbar-btn" id="toolbar-link" title="Insert link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </button>
          <button class="toolbar-btn" id="toolbar-quote" title="Block quote">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 17h3l2-4V7H5v6h3"/><path d="M15 17h3l2-4V7h-6v6h3"/></svg>
          </button>
          <button class="toolbar-btn" id="toolbar-hr" title="Horizontal rule">&mdash;</button>
          <button class="toolbar-btn" id="toolbar-clear" title="Clear formatting">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="compose-body-area">
        <div class="compose-editor-toggle">
          <button class="btn btn-sm btn-ghost" id="btn-toggle-editor" title="Toggle rich text editor">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            ${t('compose_format')}
          </button>
          <span class="editor-mode-label" id="editor-mode-label">${t('compose_plain')}</span>
        </div>
        <div id="compose-richtext" class="compose-richtext" contenteditable="false" style="display:none"></div>
        <textarea id="compose-text" placeholder="${t('compose_body')}" ${!canSend ? 'disabled' : ''}>${escapeHtml(draftBody)}</textarea>
      </div>
      <div class="compose-attachments" id="compose-attachments">${attachChips}</div>
      <div class="compose-footer">
        <div class="compose-footer-left">
          <label class="compose-attach-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            ${t('compose_attach')}
            <input type="file" id="compose-file-input" multiple hidden>
          </label>
        </div>
        <button class="btn btn-primary" id="btn-send" ${!canSend ? 'disabled' : ''}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          ${t('compose_send')}
        </button>
      </div>
    </div>
  `;
}

function bindCompose() {
  $('#btn-back-compose')?.addEventListener('click', () => navigate('/inbox'));

  let richMode = false;
  const textarea = $('#compose-text');
  const richtext = $('#compose-richtext');
  const toolbar = $('#editor-toolbar');
  const modeLabel = $('#editor-mode-label');

  $('#btn-toggle-editor')?.addEventListener('click', () => {
    richMode = !richMode;
    if (richMode) {
      richtext.innerHTML = (textarea.value || '').replace(/\n/g, '<br>');
      richtext.contentEditable = 'true';
      richtext.style.display = 'block';
      textarea.style.display = 'none';
      toolbar.style.display = 'flex';
      modeLabel.textContent = t('compose_rich');
      richtext.focus();
    } else {
      textarea.value = richtext.innerText || '';
      richtext.contentEditable = 'false';
      richtext.style.display = 'none';
      textarea.style.display = 'block';
      toolbar.style.display = 'none';
      modeLabel.textContent = t('compose_plain');
    }
  });

  toolbar?.querySelectorAll('.toolbar-btn[data-cmd]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.execCommand(btn.dataset.cmd, false, null);
      richtext.focus();
    });
  });

  $('#toolbar-font')?.addEventListener('change', (e) => {
    if (e.target.value) { document.execCommand('fontName', false, e.target.value); richtext.focus(); }
  });

  $('#toolbar-size')?.addEventListener('change', (e) => {
    if (e.target.value) { document.execCommand('fontSize', false, e.target.value); richtext.focus(); }
  });

  $('#toolbar-color')?.addEventListener('input', (e) => {
    document.execCommand('foreColor', false, e.target.value);
    richtext.focus();
  });

  $('#toolbar-bg')?.addEventListener('input', (e) => {
    document.execCommand('hiliteColor', false, e.target.value);
    richtext.focus();
  });

  $('#toolbar-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    const url = prompt('Enter URL:', 'https://');
    if (url) { document.execCommand('createLink', false, url); richtext.focus(); }
  });

  $('#toolbar-quote')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('formatBlock', false, 'blockquote');
    richtext.focus();
  });

  $('#toolbar-hr')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('insertHorizontalRule', false, null);
    richtext.focus();
  });

  $('#toolbar-clear')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('removeFormat', false, null);
    richtext.focus();
  });

  function addRecipient() {
    const input = $('#compose-to');
    if (!input) return;
    const val = input.value.trim();
    if (val && val.includes('@') && !state.toRecipients.includes(val)) {
      state.toRecipients.push(val);
      input.value = '';
      renderComposeTags();
    }
  }

  $('#btn-add-recipient')?.addEventListener('click', addRecipient);

  const toInput = $('#compose-to');
  toInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addRecipient(); }
    if (e.key === 'Backspace' && !toInput.value && state.toRecipients.length) {
      state.toRecipients.pop();
      renderComposeTags();
    }
  });

  $$('#to-tags .to-tag button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.toRecipients.splice(parseInt(btn.dataset.idx), 1);
      renderComposeTags();
    });
  });

  $$('#compose-attachments .compose-attach-chip button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.attachedFiles.splice(parseInt(btn.dataset.idx), 1);
      renderComposeAttachChips();
    });
  });

  $('#compose-file-input')?.addEventListener('change', (e) => {
    state.attachedFiles.push(...Array.from(e.target.files));
    renderComposeAttachChips();
  });

  $('#btn-send')?.addEventListener('click', doSend);
}

function renderComposeTags() {
  const container = $('#to-tags');
  if (!container) return;
  const tags = state.toRecipients.map((r, i) =>
    `<span class="to-tag">${escapeHtml(r)} <button data-idx="${i}">&times;</button></span>`
  ).join('');
  container.innerHTML = tags + `<input type="email" class="compose-to-input" id="compose-to" placeholder="${state.toRecipients.length ? '' : t('compose_to_placeholder')}"><button class="btn btn-sm btn-secondary" id="btn-add-recipient">${t('compose_add')}</button>`;
  function addRecipient() {
    const input = $('#compose-to');
    if (!input) return;
    const val = input.value.trim();
    if (val && val.includes('@') && !state.toRecipients.includes(val)) {
      state.toRecipients.push(val);
      input.value = '';
      renderComposeTags();
    }
  }
  $('#btn-add-recipient')?.addEventListener('click', addRecipient);
  const newInput = $('#compose-to');
  newInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addRecipient(); }
    if (e.key === 'Backspace' && !newInput.value && state.toRecipients.length) {
      state.toRecipients.pop();
      renderComposeTags();
    }
  });
  container.querySelectorAll('.to-tag button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.toRecipients.splice(parseInt(btn.dataset.idx), 1);
      renderComposeTags();
    });
  });
  newInput.focus();
}

function renderComposeAttachChips() {
  const container = $('#compose-attachments');
  if (!container) return;
  container.innerHTML = state.attachedFiles.map((f, i) =>
    `<span class="compose-attach-chip">${escapeHtml(f.name)} <button data-idx="${i}">&times;</button></span>`
  ).join('');
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.attachedFiles.splice(parseInt(btn.dataset.idx), 1);
      renderComposeAttachChips();
    });
  });
}

async function fileToBase64(file) {
  if (file._base64) return { filename: file.name, content: file._base64, mimeType: file.type || 'application/octet-stream', size: file.size };
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        filename: file.name,
        content: reader.result.split(',')[1],
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  });
}

async function doSend() {
  if (localStorage.getItem('veildrop_send_warning_ok') === '1') {
    return performSend();
  }
  $('#modal-send-warning')?.classList.remove('hidden');
}

async function performSend() {
  const to = state.toRecipients;
  const subject = $('#compose-subject')?.value.trim();
  const richtext = $('#compose-richtext');
  const textarea = $('#compose-text');
  const isRich = richtext && richtext.style.display !== 'none';

  let body = '';
  let bodyHtml = '';

  if (isRich) {
    body = richtext.innerText || '';
    bodyHtml = richtext.innerHTML || '';
  } else {
    body = textarea?.value.trim() || '';
  }

  if (!to.length || !subject || !body) { toast(t('compose_fill_all'), 'error'); return; }

  const btn = $('#btn-send');
  btn.disabled = true;
  btn.innerHTML = t('compose_sending');

  try {
    const attachments = [];
    for (const f of state.attachedFiles) {
      if (f.size > 5 * 1024 * 1024) { toast(`${f.name} ${t('compose_too_large')}`, 'error'); return; }
      attachments.push(await fileToBase64(f));
    }

    const payload = {
      to: to.join(', '),
      subject, body,
      reply_to: state.address,
      attachments,
    };
    if (bodyHtml) payload.body_html = bodyHtml;

    const result = await apiPost('/api/send', payload);

    if (result.error) {
      if (result.quota_reached) {
        state.smtpRemaining = 0;
        toast(result.error, 'error');
        renderMailbox('compose');
        return;
      }
      toast(result.error, 'error');
      return;
    }

    state.smtpRemaining = result.smtp_remaining ?? state.smtpRemaining;
    toast(t('compose_sent'));
    state.toRecipients = [];
    state.attachedFiles = [];
    navigate('/inbox');
  } catch (e) {
    toast('Failed to send: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> ${t('compose_send')}`;
  }
}

// ===== ACTIONS =====
function showPhrase(words) {
  const grid = $('#phrase-grid');
  if (grid) {
    grid.innerHTML = words.map((w, i) =>
      `<div class="phrase-word"><span class="num">${i + 1}</span><span class="word">${w}</span></div>`
    ).join('');
  }
  $('#modal-phrase')?.classList.remove('hidden');
}

function downloadVdr() {
  if (!state.mnemonic) return;
  const lines = [state.mnemonic];
  if (state.address) lines.push(state.address);
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `veildrop-recovery-${Date.now()}.vdr`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast(t('toast_phrase_downloaded'));
}

async function doExtend() {
  const active = $('#modal-extend .ttl-chip.active');
  if (!active) return;
  const ttl = active.dataset.ttl;
  const result = await apiPost('/api/inbox', { inbox_id: state.inboxId, ttl });
  if (result.error) { toast(result.error, 'error'); return; }
  state.expiresAt = result.expires_at;
  toast(t('toast_extended'));
  $('#modal-extend')?.classList.add('hidden');
}

async function doNuke() {
  try {
    await apiPost(`/api/gdpr/delete/${state.inboxId}`);
    toast(t('toast_nuked'));
    logout();
  } catch (e) {
    toast('Failed to nuke: ' + e.message, 'error');
  }
}

function logout() {
  if (countdownTimer) clearInterval(countdownTimer);
  if (refreshTimer) clearInterval(refreshTimer);
  state = { mnemonic: null, inboxId: null, address: null, expiresAt: null, smtpRemaining: 200, messages: [], currentMessage: null, currentTtl: '10m', toRecipients: [], attachedFiles: [], composeDraft: null, e2ee: false, privkeyEnc: null, privKey: null };
  navigate('/');
}

// ===== LEGAL PAGES =====
function renderTerms() {
  const isFr = currentLang === 'fr';
    const T = isFr ? {
    title: 'Conditions Générales d\'Utilisation',
    updated: 'Dernière mise à jour : 18 août 2026',
    s1t: '1. Description du service',
    s1: 'VeilDrop est un service de courriel jetable et temporaire. Il fournit une adresse électronique à durée de vie courte, capable de recevoir et d\'envoyer des emails. Toutes les données sont automatiquement supprimées à l\'expiration de la boîte. Le service est fourni à titre gratuit, sans inscription, sur le domaine veildrop.fr et ses domaines annexes.',
    s2t: '2. Absence de compte',
    s2: 'VeilDrop ne requiert ni inscription, ni mot de passe, ni donnée personnelle identifiable. L\'accès à une boîte se fait exclusivement par une phrase de récupération de 15 mots générée localement dans le navigateur de l\'utilisateur, ou par un jeton d\'accès court associé. VeilDrop ne connaît pas l\'identité de ses utilisateurs et ne conserve aucune donnée permettant de l\'établir.',
    s3t: '3. Chiffrement de bout en bout (E2EE)',
    s3: 'Depuis le 18 août 2026, chaque nouvelle boîte créée sur le site est chiffrée de bout en bout : une paire de clés RSA est générée dans votre navigateur, la clé privée est enveloppée par une clé dérivée de votre phrase de récupération (SHA-256), et le serveur ne stocke que la clé publique et la clé privée enveloppée. Les emails reçus sont chiffrés avec votre clé publique (format encv2:) avant d\'être stockés : ni l\'opérateur, ni un accès à la base de données, ni une réquisition ne peuvent lire leur contenu sans votre phrase. Les courriels sortants transitent par des relais SMTP standard et ne sont PAS chiffrés de bout en bout (voir article 6).',
    s4t: '4. Conservation des données',
    s4p: 'Par défaut, les boîtes expirent après <strong>10 minutes</strong>. L\'utilisateur peut étendre cette durée à 1 heure, 1 jour ou jusqu\'à 20 jours. À l\'expiration :',
    s4a: 'Tous les messages reçus sont définitivement et irréversiblement supprimés de nos serveurs',
    s4b: 'L\'adresse devient inactive',
    s4c: 'Aucune sauvegarde ni archive n\'est conservée — les résidus techniques sont chiffrés (AES-256-GCM) : aucune donnée exploitable',
    s4d: 'La purge matérielle est effectuée depuis le stockage européen sous 24 heures',
    s5t: '5. Lecture unique',
    s5: 'Les messages sont à lecture unique : une fois ouverts, ils sont définitivement supprimés. Revenir à la liste après avoir lu un message le détruit également. Une boîte vide peut être réutilisée pour recevoir de nouveaux emails.',
    s6t: '6. Envoi de courriels — limites et transparence',
    s6p: 'L\'envoi sortant est assuré par <strong>SendPulse</strong> (relais principal, smtp-pulse.com) avec <strong>SMTP2GO</strong> en secours, dans le cadre d\'une limite partagée de <strong>200 emails par jour</strong> pour l\'ensemble des utilisateurs. Au-delà, l\'envoi est automatiquement désactivé jusqu\'au lendemain. Les courriels sortants :',
    s6a: 'sont transmis en TLS, mais restent lisibles par les relais SMTP et par le fournisseur du destinataire : ils ne sont PAS chiffrés de bout en bout',
    s6b: 'expédiés avec une adresse d\'expéditeur anonyme et une note d\'avertissement légale en pied de message',
    s6c: 'ne contiennent aucune donnée d\'identification personnelle de l\'utilisateur',
    s7t: '7. Usage interdit',
    s7p: 'L\'utilisateur s\'interdit d\'utiliser VeilDrop pour :',
    s7a: 'l\'envoi de spam, pourriels ou sollicitations non consenties',
    s7b: 'l\'hameçonnage (phishing), la fraude, l\'escroquerie ou tout délit financier',
    s7c: 'l\'usurpation d\'identité ou la collecte frauduleuse de données',
    s7d: 'la diffusion de contenus illicites (pédopornographie, terrorisme, incitation à la haine, etc.)',
    s7e: 'le contournement de mesures de sécurité ou de conditions d\'utilisation de services tiers',
    s7f: 'toute activité contraire aux lois françaises et européennes',
    s7g: 'toute violation des présentes conditions est susceptible d\'entraîner la suppression immédiate de la boîte concernée, le blocage des usernames ou adresses IP en cause, et le signalement aux autorités compétentes.',
    s8t: '8. Signalement et coopération',
    s8: 'Tout utilisateur peut signaler un contenu ou un usage abusif via le formulaire de signalement (report.veildrop.fr) ou contact@veildrop.fr. Conformément à l\'article 6.I.7 de la LCEN (L.32-3-3 du Code des postes et des communications électroniques) et au règlement DSA (art. 16), les contenus manifestement illicites signalés sont retirés et les données requises sont transmises aux autorités judiciaires qui en font la demande.',
    s9t: '9. Absence de garantie',
    s9: 'VeilDrop est fourni « en l\'état », sans garantie d\'aucune sorte. Nous ne garantissons ni une disponibilité de 100 %, ni la délivrabilité des courriels, ni l\'absence d\'interception des contenus transmis. Le service est proposé gratuitement et sans engagement de niveau de service.',
    s10t: '10. Limitation de responsabilité',
    s10: 'VeilDrop ne pourra en aucun cas être tenu responsable de dommages indirects, accessoires, spéciaux ou consécutifs résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le service, y compris la perte de courriels, de données ou d\'opportunités. La responsabilité totale de VeilDrop, toutes causes confondues, est limitée au montant reçu de l\'utilisateur, soit zéro euro.',
    s11t: '11. Droit applicable et juridiction',
    s11: 'Les présentes conditions sont soumises au droit français. Le service est hébergé par Cloudflare, Inc. dans l\'Union européenne (région Londres, D1). Tout litige relève des juridictions compétentes françaises, sous réserve des dispositions d\'ordre public applicables.',
    s12t: '12. Modifications',
    s12: 'Nous pouvons modifier les présentes conditions à tout moment. La version en vigueur est celle publiée sur cette page, avec sa date de mise à jour. L\'utilisation continue du service vaut acceptation des conditions en vigueur.',
    s13t: '13. Contact',
    s13: 'Questions générales : Discord officiel (discord.gg/BxDXa8c2vE). Questions légales : contact@veildrop.fr.',
  } : {
    title: 'Terms of Service',
    updated: 'Last updated: August 18, 2026',
    s1t: '1. Description of Service',
    s1: 'VeilDrop is a temporary, disposable email service. It provides users with a short-lived email address capable of receiving and sending emails. All data is automatically deleted after the mailbox expires. The service is free, requires no registration, and operates on veildrop.fr and its related domains.',
    s2t: '2. No Account Required',
    s2: 'VeilDrop does not require registration, passwords, or any personally identifiable information. Users access their mailbox using a 15-word recovery phrase generated locally in their browser, or a short access token. VeilDrop does not know the identity of its users and stores no data that could establish it.',
    s3t: '3. End-to-End Encryption (E2EE)',
    s3: 'Since August 18, 2026, every mailbox created on the website is end-to-end encrypted: an RSA key pair is generated in your browser, the private key is wrapped with a key derived from your recovery phrase (SHA-256), and the server stores only the public key and the wrapped private key. Received emails are encrypted with your public key (encv2: format) before storage: neither the operator, nor database access, nor a legal requisition can read them without your phrase. Outgoing emails travel through standard SMTP relays and are NOT end-to-end encrypted (see Section 6).',
    s4t: '4. Data Retention',
    s4p: 'By default, mailboxes expire after <strong>10 minutes</strong>. Users may extend this duration to 1 hour, 1 day, or up to 20 days. Upon expiry:',
    s4a: 'All received messages are permanently and irreversibly deleted from our servers',
    s4b: 'The mailbox address becomes inactive',
    s4c: 'No backup or archive is maintained — residual bytes are encrypted (AES-256-GCM): no exploitable data',
    s4d: 'Hard purge from EU storage is performed within 24 hours',
    s5t: '5. Read-Once Messages',
    s5: 'Messages are read-once: once opened, they are permanently deleted. Going back to the list after reading a message also destroys it. An emptied mailbox can be reused to receive new emails.',
    s6t: '6. Sending Emails — Limits & Transparency',
    s6p: 'Outbound email delivery is handled by <strong>SendPulse</strong> (primary relay, smtp-pulse.com) with <strong>SMTP2GO</strong> as backup, under a shared daily limit of <strong>200 emails per day</strong> across all users. When the limit is reached, sending is automatically disabled until the next day. Outgoing emails:',
    s6a: 'are transmitted over TLS but remain readable by SMTP relays and by the recipient\'s provider: they are NOT end-to-end encrypted',
    s6b: 'are sent from an anonymous sender address with a legal disclaimer footer',
    s6c: 'carry no personal identification data about the user',
    s7t: '7. Prohibited Use',
    s7p: 'Users may not use VeilDrop for:',
    s7a: 'sending spam, junk mail, or unsolicited solicitations',
    s7b: 'phishing, fraud, scams, or any financial crime',
    s7c: 'identity theft or fraudulent data collection',
    s7d: 'distributing illicit content (child sexual abuse material, terrorism, hate speech, etc.)',
    s7e: 'circumventing security controls or terms of service of third-party services',
    s7f: 'any activity contrary to French and European law',
    s7g: 'any breach of these terms may result in immediate deletion of the mailbox, blocking of the offending usernames or IP addresses, and reporting to the competent authorities.',
    s8t: '8. Reporting & Cooperation',
    s8: 'Any user can report abusive content or usage via the reporting form (report.veildrop.fr) or contact@veildrop.fr. In accordance with Article 6.I.7 of the French LCEN (L.32-3-3 of the Post and Electronic Communications Code) and the DSA Regulation (Art. 16), manifestly illicit reported content is removed and requested data is transmitted to judicial authorities upon lawful demand.',
    s9t: '9. No Warranty',
    s9: 'VeilDrop is provided "as is" without warranty of any kind. We do not guarantee 100% uptime, email deliverability, or freedom from interception of transmitted content. The service is free of charge with no service-level commitment.',
    s10t: '10. Limitation of Liability',
    s10: 'In no event shall VeilDrop be liable for any indirect, incidental, special, or consequential damages arising out of the use or inability to use the service, including loss of emails, data, or opportunities. The total liability of VeilDrop, from all causes, is limited to the amount received from the user, which is zero.',
    s11t: '11. Governing Law & Jurisdiction',
    s11: 'These terms are governed by French law. The service is hosted by Cloudflare, Inc. within the European Union (London region, D1). Any dispute falls under the jurisdiction of competent French courts, subject to applicable public policy provisions.',
    s12t: '12. Changes',
    s12: 'We may amend these terms at any time. The version in force is the one published on this page, with its update date. Continued use of the service constitutes acceptance of the terms in force.',
    s13t: '13. Contact',
    s13: 'General questions: official Discord (discord.gg/BxDXa8c2vE). Legal inquiries: contact@veildrop.fr.',
  };
  return `
    <div class="legal-page">
      <a href="#/inbox" style="font-size:13px">&larr; ${t('legal_back')}</a>
      <h1 style="margin-top:12px">${T.title}</h1>
      <div class="legal-updated">${T.updated}</div>

      <h2>${T.s1t}</h2>
      <p>${T.s1}</p>

      <h2>${T.s2t}</h2>
      <p>${T.s2}</p>

      <h2>${T.s3t}</h2>
      <p>${T.s3}</p>

      <h2>${T.s4t}</h2>
      <p>${T.s4p}</p>
      <ul>
        <li>${T.s4a}</li>
        <li>${T.s4b}</li>
        <li>${T.s4c}</li>
        <li>${T.s4d}</li>
      </ul>

      <h2>${T.s5t}</h2>
      <p>${T.s5}</p>

      <h2>${T.s6t}</h2>
      <p>${T.s6p}</p>
      <ul>
        <li>${T.s6a}</li>
        <li>${T.s6b}</li>
        <li>${T.s6c}</li>
      </ul>

      <h2>${T.s7t}</h2>
      <p>${T.s7p}</p>
      <ul>
        <li>${T.s7a}</li>
        <li>${T.s7b}</li>
        <li>${T.s7c}</li>
        <li>${T.s7d}</li>
        <li>${T.s7e}</li>
        <li>${T.s7f}</li>
      </ul>
      <p>${T.s7g}</p>

      <h2>${T.s8t}</h2>
      <p>${T.s8}</p>

      <h2>${T.s9t}</h2>
      <p>${T.s9}</p>

      <h2>${T.s10t}</h2>
      <p>${T.s10}</p>

      <h2>${T.s11t}</h2>
      <p>${T.s11}</p>

      <h2>${T.s12t}</h2>
      <p>${T.s12}</p>

      <h2>${T.s13t}</h2>
      <p>${T.s13}</p>
    </div>
  `;
}

function renderPrivacy() {
  const isFr = currentLang === 'fr';
  const T = isFr ? {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 18 août 2026',
    s1t: '1. Vue d\'ensemble',
    s1: 'VeilDrop est conçu autour de la confidentialité et du minimalisme des données. Cette politique décrit précisément ce que le service manipule et comment ces données sont traitées. Principe directeur : VeilDrop ne peut pas identifier ses utilisateurs, et le chiffrement de bout en bout rend les contenus illisibles même pour l\'opérateur.',
    s2t: '2. Ce que nous ne collectons pas',
    s2: '<strong>Aucune donnée identifiable.</strong> VeilDrop ne collecte pas : les adresses IP (non journalisées), les noms, les emails personnels, aucun identifiant personnel, aucun cookie de suivi, aucun empreinte de navigateur (fingerprinting), aucune statistique d\'audience ou d\'analyse.',
    s3t: '3. Ce qui est stocké (temporairement)',
    s3p: 'Les données suivantes sont stockées dans une base située dans l\'<strong>Union européenne</strong> (Cloudflare D1, région Londres) pour le seul fonctionnement du service :',
    s3a: '<strong>Métadonnées de boîte :</strong> adresse générée aléatoirement, date de création et d\'expiration, clé publique E2EE et clé privée enveloppée (illisibles sans votre phrase)',
    s3b: '<strong>Emails reçus :</strong> adresse de l\'expéditeur, sujet, corps (texte et HTML assaini), pièces jointes — stockés uniquement pour la durée de vie de la boîte, chiffrés (encv2: pour les boîtes E2EE, encv1: AES-256-GCM sinon)',
    s3c: '<strong>Limitation de débit :</strong> compteurs de requêtes (supprimés après 2 heures) et compteurs quotidiens (supprimés après 2 jours)',
    s3d: '<strong>Empreinte légale :</strong> un hachage unidirectionnel (SHA-256) de l\'identifiant de boîte, utilisé uniquement pour répondre à une demande judiciaire — il ne permet de remonter à aucune identité',
    s4t: '4. Suppression automatique',
    s4p: 'Toutes les données sont <strong>supprimées automatiquement et définitivement</strong> :',
    s4a: 'à l\'expiration de la boîte (défaut : 10 minutes, maximum : 20 jours)',
    s4b: 'purge matérielle du stockage UE sous 24 heures après expiration',
    s4c: 'compteurs de débit purgés en 2 heures, compteurs quotidiens en 2 jours',
    s4d: 'jetons d\'accès détruits avec la boîte',
    s4e: 'aucune sauvegarde ni archive n\'existe : les résidus techniques sont du chiffré AES-256-GCM — aucune donnée exploitable',
    s5t: '5. Chiffrement de bout en bout',
    s5: 'Les boîtes créées sur le site sont chiffrées de bout en bout : votre navigateur génère une paire de clés RSA, enveloppe la clé privée avec une clé dérivée de votre phrase de récupération (SHA-256), et n\'envoie au serveur que la clé publique et la clé privée enveloppée. Les emails reçus sont chiffrés avec votre clé publique avant d\'atteindre la base de données. VeilDrop, un employé, une fuite de base ou une réquisition ne peuvent lire leur contenu sans votre phrase. La phrase elle-même n\'est jamais stockée ni transmise (sauf dans le flux API explicite qui la gère).',
    s6t: '6. Vos droits (RGPD)',
    s6p: 'Vous disposez des droits suivants, sans démarche administrative :',
    s6a: '<strong>Export :</strong> l\'export RGPD (veildrop.fr/api/gdpr/export/:inbox) télécharge toutes les données associées à votre boîte ; pour une boîte E2EE, l\'export renvoie les messages tels que stockés (chiffrés encv2:) ainsi que la clé publique et la clé privée <em>enveloppée</em>. Aucune clé utilisable n\'est jamais fournie : la clé privée enveloppée est cryptographiquement inutilisable sans votre phrase de récupération (que nous ne détenons pas et n\'avons jamais détenue). Vous seul pouvez déchiffrer, avec votre phrase, localement, dans votre navigateur.',
    s6b: '<strong>Suppression :</strong> le bouton « Nuke » ou l\'endpoint de suppression supprime immédiatement et définitivement toutes vos données',
    s6c: '<strong>Auto-suppression :</strong> toutes les données expirent automatiquement — aucune action n\'est requise',
    s6d: 'Étant donné qu\'aucune donnée personnelle identifiable n\'est collectée, les droits d\'accès, de rectification ou d\'opposition n\'ont pas d\'objet concret : il n\'existe aucune donnée vous concernant en tant que personne.',
    s6e: '<strong>Limite à connaître :</strong> les emails <em>sortants</em> transitent par le SMTP standard en clair et peuvent être lus par les autorités judiciaires sur réquisition (ainsi que par les relais et le fournisseur du destinataire). Leur contenu n\'est pas stocké chez nous. En revanche, le contenu des boîtes E2EE (emails entrants au repos) est illisible et inexploitable par quiconque, autorités comprises, sans votre phrase.',
    s7t: '7. Services tiers (sous-traitants, art. 28 RGPD)',
    s7a: '<strong>Cloudflare, Inc.</strong> (États-Unis / UE) : hébergement — Workers, Pages, base D1 (région UE), Email Routing, protection réseau',
    s7b: '<strong>SendPulse</strong> (smtp-pulse.com) : acheminement des emails sortants uniquement',
    s7c: '<strong>SMTP2GO</strong> (Nouvelle-Zélande) : acheminement de secours des emails sortants uniquement',
    s7d: '<strong>Transferts hors UE (RGPD art. 44-49) :</strong> Cloudflare s\'appuie sur le Data Privacy Framework UE-États-Unis et/ou les clauses contractuelles types ; SMTP2GO sur les clauses contractuelles types. Aucune donnée de contenu n\'est stockée hors UE : seul le contenu des emails sortants transite par les fournisseurs de livraison, chiffré en TLS, pendant le temps strictement nécessaire à la livraison.',
    s8t: '8. Mesures de sécurité',
    s8a: 'Toutes les communications chiffrées en TLS 1.3',
    s8b: 'Phrases de récupération générées par générateur cryptographiquement sûr (CSPRNG)',
    s8c: 'Assainissement des emails HTML contre les attaques XSS',
    s8d: 'Chiffrement au repos AES-256-GCM et chiffrement de bout en bout RSA-OAEP',
    s8e: 'Limitation de débit et détection d\'abus, blocage des adresses et IP en cause',
    s8f: 'Politique de sécurité de contenu (CSP) et en-têtes de sécurité',
    s8g: 'Aucun script d\'analyse ni de suivi JavaScript',
    s9t: '9. Cookies et stockage local',
    s9: 'Le site n\'utilise <strong>aucun cookie</strong>. Seul le stockage local de votre navigateur (localStorage) conserve votre langue préférée et votre préférence d\'avertissement ; aucune de ces valeurs n\'est transmise à nos serveurs.',
    s10t: '10. Contact',
    s10: 'Pour toute question relative à cette politique : contact@veildrop.fr. Formulaire de signalement : report.veildrop.fr. Discord officiel : discord.gg/BxDXa8c2vE.',
  } : {
    title: 'Privacy Policy',
    updated: 'Last updated: August 18, 2026',
    s1t: '1. Overview',
    s1: 'VeilDrop is designed around privacy and data minimalism. This policy describes exactly what the service handles and how it is treated. Guiding principle: VeilDrop cannot identify its users, and end-to-end encryption makes content unreadable even to the operator.',
    s2t: '2. What We Do Not Collect',
    s2: '<strong>Nothing identifiable.</strong> VeilDrop does not collect: IP addresses (not logged), names, personal emails, any personal identifier, tracking cookies, browser fingerprinting data, or analytics statistics.',
    s3t: '3. What Is Stored (Temporarily)',
    s3p: 'The following data is stored in a database located in the <strong>European Union</strong> (Cloudflare D1, London region) for the sole purpose of operating the service:',
    s3a: '<strong>Inbox metadata:</strong> randomly generated address, creation and expiry times, E2EE public key and wrapped private key (unreadable without your phrase)',
    s3b: '<strong>Received emails:</strong> sender address, subject, body (text and sanitized HTML), and attachments — stored only for the mailbox lifetime, encrypted (encv2: for E2EE inboxes, encv1: AES-256-GCM otherwise)',
    s3c: '<strong>Rate limiting:</strong> request counters (deleted after 2 hours) and daily counters (deleted after 2 days)',
    s3d: '<strong>Legal footprint:</strong> a one-way hash (SHA-256) of the inbox identifier, used only to answer a judicial demand — it cannot be traced back to any identity',
    s4t: '4. Automatic Deletion',
    s4p: 'All data is <strong>automatically and permanently deleted</strong>:',
    s4a: 'upon mailbox expiry (default: 10 minutes, max: 20 days)',
    s4b: 'hard purge from EU storage within 24 hours after expiry',
    s4c: 'rate-limit counters purged within 2 hours, daily counters within 2 days',
    s4d: 'access tokens destroyed with the mailbox',
    s4e: 'no backup or archive exists: technical residue is AES-256-GCM ciphertext — no exploitable data',
    s5t: '5. End-to-End Encryption',
    s5: 'Mailboxes created on the website are end-to-end encrypted: your browser generates an RSA key pair, wraps the private key with a key derived from your recovery phrase (SHA-256), and sends the server only the public key and the wrapped private key. Received emails are encrypted with your public key before reaching the database. VeilDrop, an employee, a database leak, or a legal requisition cannot read their content without your phrase. The phrase itself is never stored or transmitted (except in the explicit API flow that handles it).',
    s6t: '6. Your Rights (GDPR)',
    s6p: 'You have the following rights, with no administrative procedure:',
    s6a: '<strong>Export:</strong> the GDPR export (veildrop.fr/api/gdpr/export/:inbox) downloads all data associated with your inbox; for an E2EE inbox, the export returns the messages as stored (encv2: encrypted) together with the public key and the <em>wrapped</em> private key. No usable key is ever provided: the wrapped private key is cryptographically unusable without your recovery phrase (which we do not hold and never held). Only you can decrypt, with your phrase, locally, in your browser.',
    s6b: '<strong>Deletion:</strong> the "Nuke" button or the deletion endpoint immediately and permanently removes all your data',
    s6c: '<strong>Auto-deletion:</strong> all data expires automatically — no action required',
    s6d: 'Since no identifiable personal data is collected, the rights of access, rectification, or objection have no concrete object: no data about you as a person exists.',
    s6e: '<strong>Important caveat:</strong> <em>outgoing</em> emails travel over standard SMTP in clear text and can be read by judicial authorities under a legal requisition (as well as by the relays and the recipient\'s provider). Their content is not stored on our side. By contrast, the content of E2EE inboxes (incoming emails at rest) is unreadable and unexploitable by anyone, authorities included, without your phrase.',
    s7t: '7. Third-Party Services (Processors, GDPR Art. 28)',
    s7a: '<strong>Cloudflare, Inc.</strong> (USA / EU): hosting — Workers, Pages, D1 database (EU region), Email Routing, network protection',
    s7b: '<strong>SendPulse</strong> (smtp-pulse.com): outbound email delivery only',
    s7c: '<strong>SMTP2GO</strong> (New Zealand): outbound email delivery fallback only',
    s7d: '<strong>International transfers (GDPR Art. 44-49):</strong> Cloudflare relies on the EU-US Data Privacy Framework and/or Standard Contractual Clauses; SMTP2GO relies on Standard Contractual Clauses. No content data is stored outside the EU: only outbound email content transits through the delivery providers, encrypted in TLS, for the time strictly necessary for delivery.',
    s8t: '8. Security Measures',
    s8a: 'All communications encrypted with TLS 1.3',
    s8b: 'Recovery phrases generated with a cryptographically secure random number generator (CSPRNG)',
    s8c: 'HTML email sanitization against XSS attacks',
    s8d: 'AES-256-GCM encryption at rest and RSA-OAEP end-to-end encryption',
    s8e: 'Rate limiting and abuse detection, blocking of offending addresses and IPs',
    s8f: 'Content Security Policy (CSP) and security headers',
    s8g: 'No analytics or tracking JavaScript',
    s9t: '9. Cookies & Local Storage',
    s9: 'The website uses <strong>no cookies</strong>. Only your browser local storage (localStorage) keeps your language preference and warning preference; none of these values are transmitted to our servers.',
    s10t: '10. Contact',
    s10: 'For any question about this policy: contact@veildrop.fr. Reporting form: report.veildrop.fr. Official Discord: discord.gg/BxDXa8c2vE.',
  };
  return `
    <div class="legal-page">
      <a href="#/inbox" style="font-size:13px">&larr; ${t('legal_back')}</a>
      <h1 style="margin-top:12px">${T.title}</h1>
      <div class="legal-updated">${T.updated}</div>

      <h2>${T.s1t}</h2>
      <p>${T.s1}</p>

      <h2>${T.s2t}</h2>
      <p>${T.s2}</p>

      <h2>${T.s3t}</h2>
      <p>${T.s3p}</p>
      <ul>
        <li>${T.s3a}</li>
        <li>${T.s3b}</li>
        <li>${T.s3c}</li>
        <li>${T.s3d}</li>
      </ul>

      <h2>${T.s4t}</h2>
      <p>${T.s4p}</p>
      <ul>
        <li>${T.s4a}</li>
        <li>${T.s4b}</li>
        <li>${T.s4c}</li>
        <li>${T.s4d}</li>
        <li>${T.s4e}</li>
      </ul>

      <h2>${T.s5t}</h2>
      <p>${T.s5}</p>

      <h2>${T.s6t}</h2>
      <p>${T.s6p}</p>
      <ul>
        <li>${T.s6a}</li>
        <li>${T.s6b}</li>
        <li>${T.s6c}</li>
        <li>${T.s6d}</li>
        <li>${T.s6e}</li>
      </ul>

      <h2>${T.s7t}</h2>
      <ul>
        <li>${T.s7a}</li>
        <li>${T.s7b}</li>
        <li>${T.s7c}</li>
        <li>${T.s7d}</li>
      </ul>

      <h2>${T.s8t}</h2>
      <ul>
        <li>${T.s8a}</li>
        <li>${T.s8b}</li>
        <li>${T.s8c}</li>
        <li>${T.s8d}</li>
        <li>${T.s8e}</li>
        <li>${T.s8f}</li>
        <li>${T.s8g}</li>
      </ul>

      <h2>${T.s9t}</h2>
      <p>${T.s9}</p>

      <h2>${T.s10t}</h2>
      <p>${T.s10}</p>
    </div>
  `;
}

function renderLegal() {
  return `
    <div class="legal-page">
      <a href="#/" style="font-size:13px">&larr; ${t('legal_back')}</a>
      <h1 style="margin-top:12px">${t('legal_title')}</h1>
      <div class="legal-updated">${t('legal_updated')}</div>

      <h2>1. ${t('legal_1_title')}</h2>
      <p>${t('legal_1_desc')}</p>
      <p>${t('legal_1_anon')}</p>

      <h2>2. ${t('legal_2_title')}</h2>
      <p><strong>Cloudflare, Inc.</strong></p>
      <ul>
        <li>101 Townsend Street</li>
        <li>San Francisco, CA 94107</li>
        <li>United States</li>
        <li>Website: <a href="https://www.cloudflare.com" target="_blank">cloudflare.com</a></li>
      </ul>
      <p><strong>Cloudflare France SAS</strong> — 6 place de la Madeleine, 75008 Paris, France</p>
      <p>${t('legal_2_desc')}</p>

      <h2>3. ${t('legal_3_title')}</h2>
      <p><strong>SendPulse</strong> — smtp-pulse.com (${t('legal_3_primary')})</p>
      <p><strong>SMTP2GO Limited</strong> — Level 2, 125 The Strand, Parnell, Auckland 1010, New Zealand (${t('legal_3_fallback')})</p>
      <p>${t('legal_3_desc')}</p>

      <h2>4. ${t('legal_4_title')}</h2>
      <ul>
        <li><strong>${t('legal_4_lcen')}</strong> ${t('legal_4_lcen_desc')}</li>
        <li><strong>Regulation (EU) 2016/679</strong> (GDPR)</li>
        <li><strong>Regulation (EU) 2022/2065</strong> (DSA)</li>
      </ul>

      <h2>5. ${t('legal_5_title')}</h2>
      <p>${t('legal_5_desc')}</p>
      <p>${t('legal_5_commit')}</p>

      <h2>6. ${t('legal_6_title')}</h2>
      <p>${t('legal_6_desc')} <a href="#/abuse">${t('legal_abuse_form')}</a> — <a href="mailto:contact@veildrop.fr">contact@veildrop.fr</a></p>

      <h2>7. ${t('legal_7_title')}</h2>
      <p>${t('legal_7_desc')}</p>
      <p>${t('legal_7_contact')}</p>
    </div>
  `;
}

// ===== FAQ PAGE =====
function renderFaq() {
  const faqs = [];
  for (let i = 1; i <= 21; i++) {
    const q = t(`faq_${i}_q`);
    const a = t(`faq_${i}_a`);
    if (q !== `faq_${i}_q`) faqs.push({ q, a });
  }
  return `
    <div class="legal-page">
      <a href="#/" style="font-size:13px;color:var(--text-sec)">&larr; Home</a>
      <h1 style="margin-top:12px">${t('faq_title')}</h1>
      ${faqs.map((f, i) => `
        <details class="faq-item" ${i < 3 ? 'open' : ''}>
          <summary class="faq-q">${f.q}</summary>
          <div class="faq-a">${f.a}</div>
        </details>
      `).join('')}
    </div>
  `;
}

// ===== HELP PAGE =====
function renderHelp() {
  const isFr = currentLang === 'fr';
  const T = isFr ? {
    title: 'Guide et tutoriels',
    home: 'Accueil',
    getting: 'Premiers pas',
    g1: 'Cliquez sur « Créer une boîte gratuite » sur la page d\'accueil, puis acceptez les conditions d\'utilisation.',
    g2: 'Sauvegardez votre phrase de récupération : 15 mots sont générés dans votre navigateur. Notez-les ou téléchargez le fichier .vdr. C\'est le seul moyen de retrouver votre boîte plus tard.',
    g3: 'Utilisez votre adresse temporaire pour vous inscrire sur des sites, valider un compte ou tout autre usage jetable.',
    g4: 'Les messages entrants apparaissent dans votre boîte. Cliquez pour lire : l\'email est affiché dans un bac à sable sécurisé.',
    g5: 'Cliquez sur « Nouveau message » pour envoyer : destinataires, objet, contenu, mise en forme et pièces jointes.',
    e2eeTitle: 'Chiffrement de bout en bout',
    e2ee: 'Depuis le 18 août 2026, toute boîte créée sur le site est chiffrée de bout en bout. Votre navigateur génère une paire de clés RSA, enveloppe la clé privée avec votre phrase (SHA-256) et ne transmet au serveur que la clé publique et la clé privée enveloppée. Chaque email reçu est chiffré avec votre clé publique : il est techniquement impossible à VeilDrop (comme à une réquisition) de lire son contenu. Les emails sortants, eux, transitent par des relais SMTP classiques et ne sont pas chiffrés de bout en bout.',
    restoreTitle: 'Restauration',
    restore: 'Depuis la page d\'accueil, cliquez « Restaurer » et entrez votre phrase de 15 mots (ou importez votre fichier .vdr). La phrase est traitée localement : elle n\'est jamais transmise au serveur. Si vous perdez votre phrase et que les données du navigateur sont effacées, l\'accès à la boîte est perdu définitivement.',
    addrTitle: 'Adresse personnalisée',
    addr: 'À la création, vous pouvez choisir un nom d\'utilisateur personnalisé (ex. votre-nom@veildrop.fr). Certaines adresses sont réservées (contact, admin, etc.) et certaines sont bloquées par modération.',
    expiryTitle: 'Expiration de la boîte',
    expiry: 'Défaut : 10 minutes. Options : 1 heure, 1 jour, 20 jours maximum. Prolongez à tout moment depuis la barre latérale. À l\'expiration, tous les messages sont définitivement supprimés, sans sauvegarde.',
    readTitle: 'Lecture et lecture unique',
    read: 'Les messages sont à lecture unique : une fois ouverts, ils sont supprimés du serveur. Revenir à la liste après lecture détruit aussi le message. Une boîte vide peut recevoir de nouveaux emails.',
    sendTitle: 'Envoyer un email',
    send: 'L\'envoi passe par SendPulse (relais principal) avec SMTP2GO en secours, dans la limite partagée de 200 emails par jour. Les emails sortants partent d\'une adresse d\'expéditeur anonyme avec une mention légale. Ce sont les seules données transmises à des tiers lors de l\'envoi.',
    replyTitle: 'Répondre et transférer',
    reply: 'Les boutons Répondre / Répondre à tous / Transférer pré-remplissent le formulaire avec les destinataires et le contenu. La pièce jointe est reprise pour un transfert.',
    apiTitle: 'Utiliser l\'API',
    api: 'L\'API REST est documentée sur la page API (lien en pied de page) : création, récupération, envoi, suppression, export RGPD, et le chiffrement E2EE de bout en bout (champs e2ee, pubkey, privkey_enc). Les exemples Node.js couvrent le déchiffrement complet.',
    secTitle: 'Sécurité',
    sec1: 'Aucun cookie, aucune analyse, aucun suivi',
    sec2: 'Toutes les données dans l\'UE (Cloudflare D1, région Londres)',
    sec3: 'Assainissement HTML contre les attaques XSS',
    sec4: 'Pièces jointes limitées (5 Mo par fichier, 15 Mo par email)',
    sec5: 'Détection des archives « zip bomb »',
    sec6: 'TLS 1.3 sur toutes les communications',
    sec7: 'Chiffrement au repos AES-256-GCM et E2EE RSA-OAEP',
    reportTitle: 'Signaler un abus',
    report: 'Contenu menaçant, illégal ou abusif : reportez-le sur le formulaire de signalement (report.veildrop.fr) ou via le Discord officiel. La modération examine chaque signalement et peut bloquer des adresses et des IP.',
    contactTitle: 'Contact',
    contact: 'Questions générales : Discord officiel. Questions légales : contact@veildrop.fr.',
  } : {
    title: 'Guide & Tutorials',
    home: 'Home',
    getting: 'Getting Started',
    g1: 'Click "Create Free Inbox" on the home page, then accept the Terms of Service.',
    g2: 'Save your recovery phrase: 15 words are generated in your browser. Write them down or download the .vdr file. This is the only way to access your mailbox later.',
    g3: 'Use your temporary address for signups, verifications, or any disposable purpose.',
    g4: 'Incoming messages appear in your inbox. Click to read: the email renders in a secure sandbox.',
    g5: 'Click "New Message" to send: recipients, subject, content, rich text, and attachments.',
    e2eeTitle: 'End-to-End Encryption',
    e2ee: 'Since August 18, 2026, every mailbox created on the website is end-to-end encrypted. Your browser generates an RSA key pair, wraps the private key with your phrase (SHA-256), and sends the server only the public key and the wrapped private key. Every received email is encrypted with your public key: it is technically impossible for VeilDrop (and for any legal requisition) to read its content. Outgoing emails travel through standard SMTP relays and are not end-to-end encrypted.',
    restoreTitle: 'Recovery',
    restore: 'From the home page, click "Restore" and enter your 15-word phrase (or import your .vdr file). The phrase is processed locally: it is never sent to the server. If you lose your phrase and the browser data is cleared, access to the mailbox is permanently lost.',
    addrTitle: 'Custom Address',
    addr: 'At creation, you can choose a custom username (e.g., your-name@veildrop.fr). Some addresses are reserved (contact, admin, etc.) and some are blocked by moderation.',
    expiryTitle: 'Mailbox Expiry',
    expiry: 'Default: 10 minutes. Options: 1 hour, 1 day, up to 20 days. Extend at any time from the sidebar. On expiry, all messages are permanently deleted, with no backup.',
    readTitle: 'Reading & Read-Once',
    read: 'Messages are read-once: once opened, they are deleted from the server. Going back to the list after reading also destroys the message. An empty mailbox can receive new emails.',
    sendTitle: 'Sending an Email',
    send: 'Outbound mail goes through SendPulse (primary relay) with SMTP2GO as fallback, within the shared limit of 200 emails per day. Outgoing emails are sent from an anonymous sender address with a legal notice. These are the only data shared with third parties when sending.',
    replyTitle: 'Reply & Forward',
    reply: 'The Reply / Reply All / Forward buttons pre-fill the form with recipients and content. Attachments are carried over when forwarding.',
    apiTitle: 'Using the API',
    api: 'The REST API is documented on the API page (footer link): creation, retrieval, sending, deletion, GDPR export, and end-to-end E2EE encryption (e2ee, pubkey, privkey_enc fields). Node.js examples cover full decryption.',
    secTitle: 'Security',
    sec1: 'No cookies, no analytics, no tracking',
    sec2: 'All data stored in the EU (Cloudflare D1, London region)',
    sec3: 'HTML sanitization against XSS attacks',
    sec4: 'Attachments limited (5MB per file, 15MB per email)',
    sec5: 'Zip bomb detection for archives',
    sec6: 'TLS 1.3 on all communications',
    sec7: 'AES-256-GCM encryption at rest and RSA-OAEP E2EE',
    reportTitle: 'Report Abuse',
    report: 'Threatening, illegal, or abusive content: report it via the reporting form (report.veildrop.fr) or the official Discord. Moderation reviews every report and can block addresses and IPs.',
    contactTitle: 'Contact',
    contact: 'General questions: official Discord. Legal inquiries: contact@veildrop.fr.',
  };
  return `
    <div class="legal-page">
      <a href="#/" style="font-size:13px;color:var(--text-sec)">&larr; ${T.home}</a>
      <h1 style="margin-top:12px">${T.title}</h1>

      <h2>${T.getting}</h2>
      <ol class="help-steps">
        <li>${T.g1}</li>
        <li>${T.g2}</li>
        <li>${T.g3}</li>
        <li>${T.g4}</li>
        <li>${T.g5}</li>
      </ol>

      <h2>${T.e2eeTitle}</h2>
      <p>${T.e2ee}</p>

      <h2>${T.restoreTitle}</h2>
      <p>${T.restore}</p>

      <h2>${T.addrTitle}</h2>
      <p>${T.addr}</p>

      <h2>${T.expiryTitle}</h2>
      <p>${T.expiry}</p>

      <h2>${T.readTitle}</h2>
      <p>${T.read}</p>

      <h2>${T.sendTitle}</h2>
      <p>${T.send}</p>

      <h2>${T.replyTitle}</h2>
      <p>${T.reply}</p>

      <h2>${T.apiTitle}</h2>
      <p>${T.api}</p>

      <h2>${T.secTitle}</h2>
      <ul>
        <li>${T.sec1}</li>
        <li>${T.sec2}</li>
        <li>${T.sec3}</li>
        <li>${T.sec4}</li>
        <li>${T.sec5}</li>
        <li>${T.sec6}</li>
        <li>${T.sec7}</li>
      </ul>

      <h2>${T.reportTitle}</h2>
      <p>${T.report}</p>

      <h2>${T.contactTitle}</h2>
      <p>${T.contact}</p>
    </div>
  `;
}

// ===== ADMIN PAGE =====
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderAdmin() {
  if (!localStorage.getItem('veildrop_admin') || !state.adminKey) {
    return `
      <div class="admin-dash" style="max-width:420px;margin:60px auto">
        <h2 style="margin-bottom:16px">🔐 ${t('admin_keyword')}</h2>
        <input id="admin-key-input" type="password" class="form-control" placeholder="${t('admin_keyword_ph')}" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-2);color:var(--text)" autocomplete="off"/>
        <button id="btn-admin-login" class="btn btn-primary" style="width:100%;margin-top:12px">${t('admin_login')}</button>
        <p id="admin-login-msg" style="margin-top:10px;font-size:13px;color:var(--text-dim)"></p>
      </div>
    `;
  }
  return `
    <div class="admin-dash">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h1 style="font-size:22px">🛡️ VeilDrop Admin</h1>
        <button id="btn-admin-logout" class="btn btn-secondary btn-sm">${t('admin_logout')}</button>
      </div>

      <div class="admin-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h2>${t('admin_overview')}</h2>
          <span id="admin-service-state" class="badge badge-active"></span>
        </div>
        <div class="admin-stats">
          <div class="admin-stat"><div class="admin-stat-val" id="stat-total">-</div><div class="admin-stat-label">${t('admin_stat_total')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-active">-</div><div class="admin-stat-label">${t('admin_stat_active')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-msgs">-</div><div class="admin-stat-label">${t('admin_stat_msgs')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-sent">-</div><div class="admin-stat-label">${t('admin_stat_sent')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-e2ee">-</div><div class="admin-stat-label">${t('admin_stat_e2ee')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-blocked">-</div><div class="admin-stat-label">${t('admin_stat_blocked_users')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-req">-</div><div class="admin-stat-label">${t('admin_requests')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-inbox-today">-</div><div class="admin-stat-label">${t('admin_inboxes_today')}</div></div>
          <div class="admin-stat"><div class="admin-stat-val" id="stat-msgs-today">-</div><div class="admin-stat-label">${t('admin_msgs_today')}</div></div>
        </div>
        <div id="admin-req-chart" style="margin-top:14px"></div>
      </div>

      <div class="admin-card" style="border-color:var(--accent, #667eea)">
        <h2>${t('admin_service_global')}</h2>
        <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">${t('admin_service_global_sub')}</p>
        <div style="display:flex;align-items:center;gap:12px">
          <label class="switch"><input type="checkbox" id="admin-service-toggle"/><span class="switch-slider"></span></label>
          <span id="admin-service-label" style="font-size:14px;font-weight:600"></span>
        </div>
      </div>

      <div class="admin-card">
        <h2>${t('admin_providers')}</h2>
        <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">${t('admin_providers_sub')}</p>
        <div id="admin-providers"></div>
      </div>

      <div class="admin-card">
        <h2>${t('admin_blocked_usernames')}</h2>
        <div style="display:flex;gap:8px;margin:10px 0">
          <input id="admin-block-user" class="form-control" placeholder="${t('admin_blocked_usernames_ph')}" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--bg-2);color:var(--text)"/>
          <button id="btn-admin-block-user" class="btn btn-primary btn-sm">${t('admin_block')}</button>
        </div>
        <div id="admin-blocked-list" style="font-size:13px"></div>
        <p style="font-size:12px;color:var(--text-dim);margin-top:6px">${t('admin_reserved_note')}</p>
      </div>

      <div class="admin-card">
        <h2>${t('admin_blocked_ips')}</h2>
        <div style="display:flex;gap:8px;margin:10px 0">
          <input id="admin-block-ip" class="form-control" placeholder="${t('admin_ip_ph')}" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--bg-2);color:var(--text)"/>
          <button id="btn-admin-block-ip" class="btn btn-primary btn-sm">${t('admin_block')}</button>
        </div>
        <div id="admin-ips-list" style="font-size:13px"></div>
      </div>

      <div class="admin-card">
        <h2>${t('admin_inboxes')}</h2>
        <div style="display:flex;gap:8px;margin:10px 0">
          <input id="admin-search" class="form-control" placeholder="${t('admin_search_ph')}" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--bg-2);color:var(--text)"/>
          <button id="btn-admin-search" class="btn btn-primary btn-sm">${t('admin_search_btn')}</button>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:12.5px">
          <thead><tr style="color:var(--text-dim);text-align:left;border-bottom:1px solid var(--border, #222)">
            <th style="padding:6px 4px">Address</th><th>Msgs</th><th>Created</th><th>Expires</th><th></th>
          </tr></thead>
          <tbody id="admin-inbox-list"></tbody>
        </table>
      </div>

      <div class="admin-card" style="border-color:var(--danger, #dc3545)">
        <h2 style="color:var(--danger, #dc3545)">⚠️ ${t('admin_danger')}</h2>
        <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">${t('admin_nuke_all_sub')}</p>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="admin-nuke-confirm" class="form-control" placeholder="${t('admin_nuke_placeholder')}" style="flex:1;max-width:220px;padding:8px;border-radius:8px;border:1px solid var(--danger, #dc3545);background:var(--bg-2);color:var(--text)" autocomplete="off"/>
          <button id="btn-admin-nuke-all" class="btn btn-danger">${t('admin_nuke_all')}</button>
        </div>
      </div>
    </div>
  `;
}

function reqChart(days) {
  if (!days || !days.length) return '<div style="font-size:12px;color:var(--text-dim)">' + t('admin_req7d') + ' —</div>';
  const max = Math.max(...days.map(d => d.count), 1);
  return `
    <div style="font-size:12px;color:var(--text-dim);margin-bottom:6px">${t('admin_req7d')}</div>
    <div style="display:flex;align-items:flex-end;gap:6px;height:70px">
      ${days.slice().reverse().map(d => `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
          <span style="font-size:10px;color:var(--text-dim)">${d.count}</span>
          <div title="${d.date}: ${d.count}" style="width:100%;height:${Math.max(4, Math.round(d.count / max * 44))}px;background:var(--accent, #667eea);border-radius:4px 4px 0 0"></div>
          <span style="font-size:9px;color:var(--text-dim)">${d.date.slice(5)}</span>
        </div>`).join('')}
    </div>`;
}

async function loadAdminData() {
  if (!state.adminKey) return;
  try {
    const d = await apiGet('/api/admin/inboxes', state.adminKey);
    if (d.error) { toast(d.error, 'error'); return; }
    const s = d.stats || {};
    $('#stat-total').textContent = s.total_inboxes ?? '-';
    $('#stat-active').textContent = s.active_inboxes ?? '-';
    $('#stat-msgs').textContent = s.total_messages ?? '-';
    $('#stat-sent').textContent = (s.sent_today ?? 0) + '/' + (s.daily_limit ?? 200);
    $('#stat-e2ee').textContent = s.e2ee_inboxes ?? '-';
    $('#stat-blocked').textContent = s.blocked_addresses ?? '-';
    $('#stat-req').textContent = (d.requests && d.requests.today != null) ? d.requests.today : '-';
    $('#stat-inbox-today').textContent = d.created_today ?? '-';
    $('#stat-msgs-today').textContent = d.messages_today ?? '-';
    const chart = $('#admin-req-chart');
    if (chart) chart.innerHTML = reqChart((d.requests && d.requests.days) || []);

    const svc = $('#admin-service-state');
    if (s.service_enabled) { svc.textContent = t('admin_service_on'); svc.className = 'badge badge-active'; }
    else { svc.textContent = t('admin_service_off'); svc.className = 'badge badge-expired'; }
    const tg = $('#admin-service-toggle');
    if (tg) tg.checked = !!s.service_enabled;
    const lbl = $('#admin-service-label');
    if (lbl) lbl.textContent = s.service_enabled ? t('admin_service_on') : t('admin_service_off');

    const prov = $('#admin-providers');
    if (prov) {
      const sp = (s.providers || {});
      const sent = s.sends_by_provider || {};
      const spCount = sent['sendpulse'] || 0;
      const sgCount = sent['smtp2go'] || 0;
      const total = spCount + sgCount || 1;
      prov.innerHTML = `
        <div class="provider-row"><span class="provider-name">SendPulse</span>
          <div class="provider-bar"><div class="provider-bar-fill" style="width:${Math.round(spCount / total * 100)}%"></div></div>
          <span class="provider-count">${spCount} ${t('admin_sends')}</span>
          <span class="badge ${sp.sendpulse_configured ? 'badge-active' : 'badge-expired'}">${sp.sendpulse_configured ? 'OK' : 'OFF'}</span>
        </div>
        <div class="provider-row"><span class="provider-name">SMTP2GO</span>
          <div class="provider-bar"><div class="provider-bar-fill" style="width:${Math.round(sgCount / total * 100)}%"></div></div>
          <span class="provider-count">${sgCount} ${t('admin_sends')}</span>
          <span class="badge ${sp.smtp2go_configured ? 'badge-active' : 'badge-expired'}">${sp.smtp2go_configured ? 'OK' : 'OFF'}</span>
        </div>`;
    }

    const list = $('#admin-inbox-list');
    if (list) {
      const now = Math.floor(Date.now() / 1000);
      list.innerHTML = (d.inboxes || []).map(i => {
        const created = new Date(i.created_at * 1000).toLocaleDateString();
        const expires = i.expired ? '<span style="color:var(--text-dim)">expired</span>' : new Date(i.expires_at * 1000).toLocaleDateString();
        return `
          <tr class="inbox-row" data-id="${esc(i.id)}">
            <td style="padding:6px 4px;word-break:break-all">${esc(i.address)} ${i.e2ee ? '🔒' : ''}</td>
            <td style="padding:6px 4px">${i.message_count}</td>
            <td style="padding:6px 4px;white-space:nowrap">${created}</td>
            <td style="padding:6px 4px;white-space:nowrap">${expires}</td>
            <td style="padding:6px 4px;white-space:nowrap">
              <button class="btn btn-secondary btn-sm" data-view="${esc(i.id)}">${t('admin_view')}</button>
              <button class="btn btn-danger btn-sm" data-delete="${esc(i.id)}" data-addr="${esc(i.address)}">${t('admin_delete')}</button>
            </td>
          </tr>
          <tr class="inbox-detail" data-detail="${esc(i.id)}" hidden>
            <td colspan="5" style="padding:10px 4px">
              <div class="admin-mailbox" style="background:var(--surface-alt, rgba(255,255,255,.04));border-radius:8px;padding:12px"></div>
            </td>
          </tr>`;
      }).join('') || '<tr><td colspan="5" style="color:var(--text-dim);padding:10px 4px">—</td></tr>';
    }
    loadAdminBlocked();
    loadAdminIps();
  } catch (e) {
    console.error('admin load failed', e);
  }
}

async function viewAdminInbox(id, tr) {
  const detail = document.querySelector(`tr.inbox-detail[data-detail="${id}"]`);
  if (!detail) return;
  const box = detail.querySelector('.admin-mailbox');
  if (!detail.hidden) { detail.hidden = true; return; }
  detail.hidden = false;
  box.innerHTML = '<div style="color:var(--text-dim);font-size:12px">' + t('admin_loading') + '</div>';
  try {
    const d = await apiGet('/api/admin/inbox/' + id + '/messages', state.adminKey);
    if (d.error) { box.innerHTML = '<div style="color:var(--danger)">' + esc(d.error) + '</div>'; return; }
    const inbox = d.inbox || {};
    let html = '';
    if (inbox.e2ee) html += '<div style="font-size:12px;color:var(--text-dim);margin-bottom:8px">🔒 ' + t('admin_e2ee_note') + '</div>';
    const msgs = d.messages || [];
    if (!msgs.length) { html += '<div style="color:var(--text-dim)">' + t('admin_no_msgs') + '</div>'; }
    html += msgs.map(m => `
      <div style="padding:8px 0;border-bottom:1px solid var(--border-light, #222)">
        <div style="display:flex;justify-content:space-between;gap:8px;font-size:12px">
          <span style="word-break:break-all"><strong>${esc(m.subject_enc || '(no subject)')}</strong></span>
          <span style="white-space:nowrap;color:var(--text-dim)">${esc(m.from_address)} · ${new Date(m.received_at * 1000).toLocaleString()} ${m.is_read ? '' : '· <b>NEW</b>'}</span>
        </div>
        <pre style="margin:6px 0 0;white-space:pre-wrap;word-break:break-word;font-size:11.5px;background:rgba(0,0,0,.25);padding:8px;border-radius:6px;max-height:300px;overflow:auto">${esc(m.body_enc || '')}</pre>
      </div>`).join('');
    box.innerHTML = html;
  } catch (e) {
    box.innerHTML = '<div style="color:var(--danger)">' + t('admin_failed_msgs') + '</div>';
  }
}

async function deleteAdminInbox(id, addr) {
  if (!confirm(t('admin_confirm_delete') + '\n\n' + addr)) return;
  const r = await apiPost('/api/admin/inbox/' + id + '/delete', {}, state.adminKey);
  if (r && r.ok) {
    toast(t('admin_deleted'));
    loadAdminData();
  } else {
    toast((r && r.error) || 'error', 'error');
  }
}

async function loadAdminBlocked() {
  if (!state.adminKey) return;
  try {
    const d = await apiGet('/api/admin/blocked', state.adminKey);
    const el = $('#admin-blocked-list');
    if (!el) return;
    const blocked = (d.blocked || []);
    el.innerHTML = blocked.length === 0
      ? `<div style="color:var(--text-dim)">${t('admin_none_blocked')}</div>`
      : blocked.map((b) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border, #222)">
            <span>${esc(b.address)}</span>
            <button class="btn btn-danger btn-sm" data-unblock="${esc(b.address)}">${t('admin_unblock')}</button>
          </div>`).join('');
    if (d.reserved && d.reserved.length) {
      el.insertAdjacentHTML('beforeend', `<div style="margin-top:8px;color:var(--text-dim);font-size:12px">${t('admin_reserved_note')}: ${esc(d.reserved.join(', '))}</div>`);
    }
  } catch (e) { console.error(e); }
}

async function loadAdminIps() {
  if (!state.adminKey) return;
  try {
    const d = await apiGet('/api/admin/ips', state.adminKey);
    const el = $('#admin-ips-list');
    if (!el) return;
    el.innerHTML = (d.ips || []).length === 0
      ? `<div style="color:var(--text-dim)">—</div>`
      : d.ips.map((ip) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border, #222)">
            <span>${esc(ip.ip)} ${ip.reason ? '<span style="color:var(--text-dim)">(' + esc(ip.reason) + ')</span>' : ''}</span>
            <button class="btn btn-danger btn-sm" data-unblock-ip="${esc(ip.ip)}">${t('admin_unblock')}</button>
          </div>`).join('');
  } catch (e) { console.error(e); }
}

function bindAdmin() {
  if (!localStorage.getItem('veildrop_admin') || !state.adminKey) {
    const btn = $('#btn-admin-login');
    if (btn) btn.addEventListener('click', async () => {
      const kw = $('#admin-key-input').value.trim();
      const msg = $('#admin-login-msg');
      if (!kw) { if (msg) msg.textContent = t('toast_admin_invalid'); return; }
      if (msg) msg.textContent = '...';
      try {
        const r = await apiPost('/api/admin/check', { keyword: kw });
        if (r && r.access) {
          localStorage.setItem('veildrop_admin', '1');
          state.adminKey = kw;
          if (window.location.hash === '/admin' || window.location.hash === '#/admin') {
            render();
          } else {
            navigate('/admin');
          }
        } else {
          if (msg) msg.textContent = t('toast_admin_invalid');
        }
      } catch (e) {
        if (msg) msg.textContent = t('toast_admin_invalid');
      }
    });
    return;
  }
  const logout = $('#btn-admin-logout');
  if (logout) logout.addEventListener('click', () => {
    localStorage.removeItem('veildrop_admin');
    state.adminKey = null;
    navigate('/');
  });
  loadAdminData();
  $('#btn-admin-block-user')?.addEventListener('click', async () => {
    const addr = $('#admin-block-user').value.trim().toLowerCase();
    if (!addr) return;
    const r = await apiPost('/api/admin/blocked', { address: addr }, state.adminKey);
    if (r && r.ok) { $('#admin-block-user').value = ''; loadAdminBlocked(); }
    else toast((r && r.error) || 'error', 'error');
  });
  $('#btn-admin-block-ip')?.addEventListener('click', async () => {
    const ip = $('#admin-block-ip').value.trim();
    if (!ip) return;
    const r = await apiPost('/api/admin/ips', { ip, reason: 'manual' }, state.adminKey);
    if (r && r.ok) { $('#admin-block-ip').value = ''; loadAdminIps(); }
    else toast((r && r.error) || 'error', 'error');
  });
  $('#admin-service-toggle')?.addEventListener('change', async (e) => {
    const enabled = e.target.checked;
    const r = await apiPost('/api/admin/toggle-service', { enabled }, state.adminKey);
    if (r && r.ok) loadAdminData();
  });
  $('#btn-admin-search')?.addEventListener('click', () => {
    const q = $('#admin-search').value.trim().toLowerCase();
    document.querySelectorAll('#admin-inbox-list tr.inbox-row').forEach(row => {
      row.style.display = !q || row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
  $('#admin-inbox-list')?.addEventListener('click', async (e) => {
    const view = e.target.closest('[data-view]');
    if (view) { viewAdminInbox(view.dataset.view, e.target.closest('tr')); return; }
    const del = e.target.closest('[data-delete]');
    if (del) { deleteAdminInbox(del.dataset.delete, del.dataset.addr); }
  });
  $('#btn-admin-nuke-all')?.addEventListener('click', async () => {
    if (!confirm(t('admin_nuke_confirm1'))) return;
    const typed = prompt(t('admin_nuke_confirm2'));
    if (typed !== 'NUKE ALL') return;
    const r = await apiPost('/api/admin/nuke-all', { confirm: 'NUKE ALL' }, state.adminKey);
    if (r && r.ok) {
      toast(t('admin_nuke_done'));
      loadAdminData();
    } else {
      toast((r && r.error) || 'error', 'error');
    }
  });
  $('#admin-blocked-list')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-unblock]');
    if (!btn) return;
    const r = await apiDelete('/api/admin/blocked', { address: btn.dataset.unblock }, state.adminKey);
    if (r && r.ok) loadAdminBlocked();
  });
  $('#admin-ips-list')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-unblock-ip]');
    if (!btn) return;
    const r = await apiDelete('/api/admin/ips', { ip: btn.dataset.unblockIp }, state.adminKey);
    if (r && r.ok) loadAdminIps();
  });
}

// ===== INIT =====
window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', async () => {
  $('#app')?.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (a) {
      e.preventDefault();
      navigate(a.getAttribute('href').slice(1));
    }
  });
  const saved = localStorage.getItem('veildrop_inboxId');
  if (saved) {
    try {
      const data = await apiGet(`/api/inbox/${saved}/messages`);
      if (data.expired) {
        localStorage.removeItem('veildrop_inboxId');
      } else {
        state.inboxId = saved;
        state.address = data.address;
        state.expiresAt = data.expires_at;
        state.smtpRemaining = data.smtp_remaining || 200;
        state.messages = data.messages || [];
      }
    } catch (e) {
      localStorage.removeItem('veildrop_inboxId');
    }
  }
  render();
});
