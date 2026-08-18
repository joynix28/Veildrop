# VeilDrop — Présentation Technique & Textes de Pub

> Fichier factuel et précis : chaque chiffre ci-dessous est vérifié dans le code source.
> Usage : donnez-le tel quel à une IA pour qu'elle reformule, ou utilisez les textes de pub de la section 10.
> Toute personne, IA ou humain, peut s'appuyer sur ce document : il ne contient **aucune fonctionnalité inventée**.

---

## 1. Vue d'ensemble en chiffres

| Fait | Valeur exacte |
|---|---|
| Prix | 100 % gratuit, sans pub, sans limite de comptes (pas de comptes du tout) |
| Création d'une boîte | Instantanée, sans inscription, sans mot de passe, sans email |
| Durées de vie (TTL) | **10 minutes** (défaut), **1 heure**, **1 jour**, **20 jours** — extensible à tout moment |
| Destruction | Automatique et irréversible à l'expiration (vérifiée à chaque accès) |
| Chiffrement | De bout en bout : RSA-OAEP-2048/SHA-256 + AES-256-GCM (voir §4) |
| Langues | Français et anglais (371 clés de traduction, 100 % couvertes) |
| Domaines de génération | veildrop.fr, link2me.info, link2me.online, link2me.store |
| Envoi d'email | SMTP réel (pas un simulacre) : SendPulse (principal) + SMTP2GO (secours), TLS |
| API publique | REST, gratuite, **sans clé à créer** (la phrase mnémotechnique EST la clé) |
| Cookies | Aucun. Trackers : aucun. Analytics : aucun. Service worker : aucun cache |
| Traces | Les événements de sécurité sont journalisés (anti-abus) ; aucune donnée publicitaire |

## 2. Architecture technique

- **Front** : application monopage en JavaScript vanilla (~2 900 lignes), zéro framework, zéro dépendance côté navigateur, chiffrement via l'API WebCrypto native du navigateur.
- **Back** : Cloudflare Workers (exécution serverless, ~150 ms de froid) avec routeur Hono.
- **Base de données** : Cloudflare D1 (SQLite managé), **région EU — Londres**. Tables : `inboxes`, `messages`, `inbox_tokens` (tokens stockés en SHA-256), `rate_limits`, `blocked_addresses`, `blocked_ips`, `counters`, `security_events`.
- **Réception** : Cloudflare Email Routing → Worker → D1. Les pièces jointes entrantes sont parsées, vérifiées (détection de zip bomb) et chiffrées avant stockage.
- **Envoi** : connexion SMTP brute via SendPulse (smtp-pulse.com, TLS implicite 465 / STARTTLS 587 / clair 2525 en repli), fallback API REST SMTP2GO.
- **Site de signalement** : Cloudflare Pages (report.veildrop.fr), formulaire → webhook Discord.
- **Hébergement** : Cloudflare (CDN, DNS, anti-DDoS, TLS 1.3, HTTP/3).
- **PWA** : manifeste d'installation fourni ; le service worker est volontairement retiré (aucun cache persistant — chaque visite reçoit une page fraîche, choix vie privée).

## 3. Fonctionnalités exactes

### Boîtes jetables
- Adresse aléatoire (parmi les 4 domaines) ou **adresse personnalisée** de votre choix (ex. `votrenom@veildrop.fr`), min 3 caractères.
- Adresses réservées bloquées : ~40 noms (contact, abuse, admin, support, postmaster, noreply, webmaster, security, legal…).
- **Restauration par phrase mnémotechnique** : 15 mots BIP39 (2048 mots de la liste standard Bitcoin). La boîte est retrouvable sur n'importe quel appareil avec la phrase. Pas de mot de passe à retenir : la phrase est la clé.
- Option « sans phrase » : boîte éphémère à usage unique, clé d'accès jetable.
- Extension de durée de vie à tout moment (TTL 10m / 1h / 1d / 20d, cumulable).
- Destruction manuelle immédiate (« burner ») : purge définitive des messages + boîte + tokens.

### Email
- **Réception** : messages stockés avec expéditeur, sujet, corps texte, corps HTML et pièces jointes (limites §5).
- **Envoi** : jusqu'à 10 destinataires, sujet, corps texte + HTML (éditeur riche), jusqu'à 10 pièces jointes, réponse (Reply-To) = votre adresse jetable.
- Chaque email sortant porte un **avertissement automatique** (texte + HTML) : « envoyé anonymement via VeilDrop », chemin de réponse, lien de signalement d'abus. Aucun email ne sort « sans étiquette ».
- Expéditeur : `anonymous@<domaine>` (domaine aléatoire parmi les 4).

### Interface
- Connexion par phrase mnémotechnique (15 mots) ou clé d'accès.
- Compteur de temps restant, liste des messages, lecture des pièces jointes, recherche dans les messages.
- Pages dédiées : FAQ (19 questions), Aide, CGU, Confidentialité, Mentions légales, Contact, Signalement, Statut, Documentation API.
- Interface entièrement bilingue EN/FR, thème sombre.

## 4. Sécurité & chiffrement (protocole exact)

### Chiffrement de bout en bout des boîtes
- À la création, le **navigateur** génère une paire RSA-OAEP-2048 (SHA-256).
- La clé privée est chiffrée par AES-256-GCM avec une clé dérivée de la phrase (KEK = SHA-256 des 15 mots espacés), puis envoyée au serveur : `privkey_enc = base64(iv):base64(chiffré)`.
- La clé publique (SPKI) est stockée : le serveur chiffre chaque email entrant **avec elle** — or une clé publique ne peut pas déchiffrer.
- Format de stockage d'un champ chiffré : `encv2:<base64(clé_jetable_wrappée_RSA)>:<base64(iv_12_octets)>:<base64(ciphertext_AES-256-GCM)>` — clé de données jetable de 32 octets par message, elle-même enveloppée par RSA-OAEP.
- **Résultat : le serveur ne peut jamais déchiffrer les messages E2EE, même avec un accès total à la base de données.** Seul le détenteur de la phrase peut déverrouiller la clé privée (dans son navigateur).
- Identifiant déterministe : `inbox_id = SHA-256(15 mots séparés par des tirets)` — la phrase retrouve la boîte sans aucune recherche serveur.

### Chiffrement au repos (boîtes non E2EE)
- Les champs texte sont chiffrés côté serveur en AES-256-GCM (module at-rest) avant stockage en base.

### Transport & headers
- TLS 1.3 sur tout le site (terminaison Cloudflare), HSTS `max-age=31536000; includeSubDomains; preload`.
- Headers de sécurité systématiques : `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy` (camera/micro/geolocation interdites), `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, CSP stricte (`default-src 'self'`), `Cache-Control: no-store`.

### Anti-abus
- Détection de zip bomb sur les pièces jointes entrantes.
- Journalisation des événements de sécurité (tentatives d'accès invalides, rate limits, actions admin…) dans D1 + notification Discord automatique.
- Kill-switch global : l'opérateur peut suspendre création/envoi/réception en une commande (service OFF) sans toucher aux données.
- Nuke-all administrateur protégé (double confirmation + authentification + throttling).

## 5. Limites & quotas (valeurs exactes du code)

### Rate limits (par IP)
| Action | Quota | Fenêtre |
|---|---|---|
| Création de boîte | 50 | 1 heure |
| Restauration de boîte | 30 | 1 heure |
| Envoi de message | 200 | 1 heure |
| Lecture de messages | 300 | 1 heure |
| Signalement d'abus | 5 | 1 heure |

### Envoi SMTP (global, tous utilisateurs confondus)
| Limite | Valeur |
|---|---|
| Envois par jour | **200** (quotas du fournisseur SMTP) |
| Destinataires par envoi | 10 max |
| Pièces jointes par envoi | 10 max |
| Taille par pièce jointe | 7 Mo max |
| Corps du message | 500 000 caractères max |

### Réception (emails entrants)
| Limite | Valeur |
|---|---|
| Corps texte traité | 100 000 caractères max |
| Pièce jointe | 5 Mo max par fichier |
| Total décodé | 15 Mo max par message |
| Zip bomb | détectée et rejetée |
| Corps de requête API | 25 Mo max |

### Signalement d'abus
- 5 fichiers max, 8 Mo max chacun, 7 motifs (§8).

### Administration (serveur, invisible pour les utilisateurs)
- Échecs de connexion admin : 60/h par IP.
- Actions admin authentifiées : 10/s par IP (throttle strict).

## 6. API publique (documentée sur /api)

**Principe : pas de clé API à créer.** La clé est votre **phrase mnémotechnique (15 mots)** ou un **jeton d'accès** (généré, stocké en SHA-256). Elle se passe en `?key=` ou header `X-API-Key`.

### Endpoints v1 (forme courte)
| Méthode | Endpoint | Effet |
|---|---|---|
| POST | `/api/v1/inbox` | Créer une boîte (option : `mnemonic` pour adresse fixe/restauration, `ttl`, `custom_address`, `pubkey`/`privkey_enc` pour E2EE) |
| GET | `/api/v1/mail?key=` | Lister les messages (métadonnées uniquement : expéditeur, sujet, pièces jointes, horodatage) |
| GET | `/api/v1/mail/:messageId?key=` | Lire un message complet — **read-once : détruit immédiatement après lecture** |
| POST | `/api/v1/send?key=` | Envoyer un email depuis l'adresse de la boîte (`to`, `subject`, `body`, `body_html`, `attachments`) |
| POST | `/api/v1/extend?key=` | Prolonger la durée de vie (`ttl`: `10m`/`1h`/`1d`/`20d`) |
| DELETE | `/api/v1/mail?key=` | Détruire définitivement la boîte |
| GET | `/api/v1/status` | État du service, quotas, domaines, liste des endpoints |

### Endpoints legacy (forme longue, `inbox_id` dans l'URL)
`POST /api/inbox` · `POST /api/inbox/:id/restore` · `GET /api/inbox/:id/messages` · `GET /api/inbox/:id/message/:messageId` · `POST /api/inbox/:id/read` · `POST /api/send` · `DELETE /api/inbox/:id/message/:messageId`

### Endpoints utilitaires
`GET /api/status` (service + envois du jour + quota) · `GET /api/health` · `GET /api/smtp-status` · `GET /api/domains` · `GET /api/ttl-options` · `POST /api/abuse`

### RGPD (exigences légales, pas des gadgets)
| Méthode | Endpoint | Effet |
|---|---|---|
| GET | `/api/gdpr/export/:inboxId?key=` | Export complet (boîte, messages, pièces jointes) — authentifié par phrase/token |
| POST | `/api/gdpr/delete/:inboxId?key=` | Suppression définitive de toutes les données |

## 7. Légal & conformité (texte exact des mentions)

- **Statut** : projet personnel **non professionnel** d'un développeur indépendant (Union européenne, France). Aucune société, aucun investisseur : la gratuité n'est pas un modèle de collecte de données.
- **Hébergeur** : Cloudflare (CDN, anti-DDoS, DNS, Email Routing, Workers). **Données : Cloudflare D1, région EU (Londres)**. Transmissions chiffrées TLS.
- **Envoi email** : SendPulse (routage) + SMTP2GO (secours), TLS uniquement.
- **LCEN** : VeilDrop est hébergeur au sens de l'article 6-I-2 (stocke des contenus fournis automatiquement par des tiers, sans contrôle éditorial), **pas d'obligation générale de surveillance** (6-II), retrait des contenus manifestement illicites (6.I.7).
- **DSA (règlement UE 2022/2065)** : point de contact électronique pour autorités et utilisateurs, procédure notice-and-action, traitement typique **sous 24–48 h** (article 16).
- **RGPD** : minimisation (aucun compte, aucun profil), durée de conservation limitée au TTL choisi (10 min par défaut), **export et suppression automatiques** (endpoints §6), données en région UE, aucune revente — rien à revendre.
- **CGU / Confidentialité / Mentions légales / Contact / FAQ / Signalement** : pages complètes et bilingues sur le site.
- **Adresses officielles** (routées via Cloudflare Email Routing vers la boîte de l'opérateur) :
  - `contact@veildrop.fr` — général
  - `abuse@veildrop.fr` — abus
  - `anonymous@veildrop.fr` — signalement anonyme
  - Formulaire : report.veildrop.fr
- **Limitation assumée** : pour les boîtes E2EE, l'opérateur ne peut pas inspecter le contenu (c'est le principe) — le signalement s'appuie alors sur l'adresse de l'expéditeur, l'objet et le contexte. Pour les boîtes non-E2EE, les contenus signalés sont inspectables et retirés.
- **Coopération judiciaire** : en cas d'ordre légal valide, l'opérateur coopère avec les autorités dans le respect de la loi.
- **Usages interdits** : fraude, phishing, spam volontaire, diffusion de contenus illicites. Sanctions : adresses bloquées (liste noire), IP bannies, service OFF possible, transmission aux autorités.

## 8. Signalement d'abus (report.veildrop.fr)

- Motifs proposés (7) : menaces de mort/violence · harcèlement/intimidation · phishing/arnaque · spam de masse · contenu illicite · usurpation d'identité · autre.
- Champs : votre email (optionnel, pour suivi), adresse de la boîte incriminée, date, ID du message, description.
- Pièces jointes : jusqu'à 5 fichiers, 8 Mo max chacun (captures d'écran, preuves).
- Destinataire : webhook Discord de la modération (réception + traitement 24–48 h typique).
- Limite : 5 signalements/heure/IP (anti-flood).

## 9. Serveur Discord — discord.gg/BxDXa8c2vE

- Annonces du service et changelog.
- Support et entraide (création, restauration par phrase, limites, API).
- Canal de signalement (relais de la modération).
- Discussions vie privée / email jetable / sécurité numérique.
- Accès direct au développeur.

## 10. Liens

| Ressource | URL |
|---|---|
| Site principal | https://veildrop.fr |
| Signalement d'abus | https://report.veildrop.fr |
| Documentation API | https://veildrop.fr/api |
| FAQ (19 questions) | https://veildrop.fr/faq |
| CGU | https://veildrop.fr/terms |
| Politique de confidentialité | https://veildrop.fr/privacy |
| Mentions légales | https://veildrop.fr/legal |
| Aide | https://veildrop.fr/help |
| Discord | https://discord.gg/BxDXa8c2vE |

---

## 11. Textes de pub prêts à l'emploi

### Court — X / Mastodon (FR)
> 🛡️ Email temporaire gratuit, créé en 1 seconde, chiffré de bout en bout (AES-256-GCM + RSA-2048, clés dans votre navigateur), auto-détruit en 10 min. Envoi + réception, pièces jointes, adresse personnalisée, API gratuite. Sans inscription, sans cookie, sans tracker. RGPD + LCEN + DSA. 🇫🇷🇬🇧
> → veildrop.fr · discord.gg/BxDXa8c2vE

### Court — X / Mastodon (EN)
> 🛡️ Free disposable email, created in 1 second, end-to-end encrypted (AES-256-GCM + RSA-2048, keys stay in your browser), self-destructs in 10 min. Send + receive, attachments, custom address, free API. No signup, no cookies, no trackers. GDPR + LCEN + DSA compliant.
> → veildrop.fr · discord.gg/BxDXa8c2vE

### Moyen — LinkedIn / Facebook / forum (FR)
> **VeilDrop : un email jetable que même son opérateur ne peut pas lire.**
>
> Chaque inscription en ligne vous coûte un peu de vos données. VeilDrop offre l'alternative radicale : une adresse temporaire gratuite, créée en une seconde, détruite automatiquement en 10 minutes (ou 1 h, 1 jour, 20 jours au choix).
>
> La différence : un vrai chiffrement de bout en bout (RSA-2048 + AES-256-GCM via WebCrypto). Les clés naissent dans votre navigateur, le serveur ne stocke que du chiffré — même une saisie de la base ne révélerait rien. Et contrairement aux services jetables classiques, vous pouvez aussi **envoyer** : 10 destinataires, pièces jointes, éditeur riche, via SMTP réel (SendPulse, TLS).
>
> Sans inscription, sans cookies, sans trackers. API REST gratuite sans clé — votre phrase de 15 mots est la clé. Projet indépendant, conforme LCEN (6-I-2, 6.I.7), DSA (art. 16, réponse 24–48 h), RGPD (données en UE, export/suppression automatiques). Signalement d'abus via report.veildrop.fr.
>
> 🔗 https://veildrop.fr — Discord : https://discord.gg/BxDXa8c2vE

### Moyen — LinkedIn / forum (EN)
> **VeilDrop: a disposable email not even its operator can read.**
>
> Every signup costs you a bit of your data. VeilDrop offers the radical alternative: a free temporary address, created in one second, auto-destroyed in 10 minutes (or 1 h, 1 day, 20 days).
>
> The difference: real end-to-end encryption (RSA-2048 + AES-256-GCM via WebCrypto). Keys are born in your browser; the server stores only ciphertext — even a full database breach reveals nothing. Unlike classic disposable services, you can also **send**: up to 10 recipients, attachments, rich editor, over real SMTP (SendPulse, TLS).
>
> No signup, no cookies, no trackers. Free keyless REST API — your 15-word mnemonic IS the key. Independent project, LCEN (6-I-2, 6.I.7) + DSA (art. 16, 24–48 h response) + GDPR compliant (EU-hosted data, automated export/erasure). Abuse reporting at report.veildrop.fr.
>
> 🔗 https://veildrop.fr — Discord: https://discord.gg/BxDXa8c2vE

### DM Discord (FR)
> Salut ! Rejoins VeilDrop : email temporaire 100 % gratuit, chiffré de bout en bout (même l'opérateur ne lit rien), auto-destruction en 10 min, envoi + réception, sans inscription ni tracker. Projet indépendant, API gratuite pour les devs. 🛡️ https://discord.gg/BxDXa8c2vE

### Description YouTube / bio (FR)
> VeilDrop — l'email temporaire gratuit : chiffré de bout en bout (RSA-2048 + AES-256-GCM), auto-détruit en 10 minutes, sans inscription ni tracker. Envoie et reçois des emails et des pièces jointes sur veildrop.fr. Rejoins la communauté : discord.gg/BxDXa8c2vE.

### Argumentaire comparatif (blogs / comparateurs)
- **vs services jetables classiques (10minutemail, guerrillamail…)** : E2EE réel (ils lisent vos messages) ; envoi d'emails (ils ne font que recevoir) ; adresse personnalisée ; phrases de récupération type wallet ; RGPD/Légal complet.
- **vs services éphémères payants** : gratuit, sans carte, sans compte.
- **vs « gratuits mais monétisés »** : pas de pub, pas d'analytics, pas de revente — il n'y a rien à vendre.
- **Devs** : API REST sans clé (mnemonic = clé), read-once, TTL programmable, statut machine-readable.
- **Entreprises** : outil de test email sans données sensibles, export/effacement RGPD automatisés, données stockées en UE.

---

## 12. Prompt à donner à une IA

> Tu es un rédacteur publicitaire spécialisé en vie privée numérique. À partir des faits ci-dessous, rédige X variantes (ton : persuasif / technique / communautaire / fun) en français et en anglais pour [canal : X, LinkedIn, forum, YouTube, newsletter]. Utilise le nom VeilDrop et les liens https://veildrop.fr et https://discord.gg/BxDXa8c2vE. **Interdiction formelle d'inventer une fonctionnalité, un chiffre ou une certification** : si un fait ne figure pas ci-dessous, ne l'ajoute pas.
>
> FAITS VÉRIFIÉS :
> - Email temporaire gratuit, sans inscription, sans cookie, sans tracker ; création en 1 seconde ; TTL 10 min (défaut) / 1 h / 1 jour / 20 jours ; destruction automatique et irréversible.
> - Envoi ET réception ; 10 destinataires max ; 10 pièces jointes max (7 Mo) ; éditeur riche ; SMTP réel (SendPulse, TLS ; SMTP2GO en secours) ; avertissement automatique sur chaque email sortant.
> - E2EE : RSA-OAEP-2048/SHA-256 + AES-256-GCM, clés générées dans le navigateur (WebCrypto), clé privée enveloppée par SHA-256 de la phrase, le serveur ne voit que du chiffré (formats encv2 et privkey_enc) ; mnémonique 15 mots BIP39 ; inbox_id = SHA-256(mots).
> - Adresse personnalisée au choix ; ~40 adresses réservées ; 4 domaines (veildrop.fr, link2me.info, link2me.online, link2me.store).
> - API REST gratuite sans clé (mnemonic ou jeton) : /api/v1/inbox, /api/v1/mail (read-once), /api/v1/send, /api/v1/extend, DELETE /api/v1/mail, /api/v1/status ; export et effacement RGPD automatiques.
> - Projet personnel indépendant (France, UE) ; hébergeur Cloudflare ; données D1 en région UE (Londres) ; TLS 1.3, HSTS, CSP stricte.
> - Conformité LCEN (art. 6-I-2, 6-II, 6.I.7) et DSA (règlement UE 2022/2065, art. 16, réponse 24–48 h) ; signalement via report.veildrop.fr (7 motifs, 5 fichiers de 8 Mo) et abuse@/anonymous@veildrop.fr ; modération (adresses bloquées, IP bannies) ; coopération avec les autorités.
> - Bilingue FR/EN ; communauté Discord discord.gg/BxDXa8c2vE.

---

## 13. FAQ précise

**« C'est vraiment gratuit ? »**
Oui, sans condition. Le projet est un projet personnel sans modèle économique : pas de pub, pas d'abonnement, pas de revente. Les seuls coûts sont l'infrastructure Cloudflare et les quotas SMTP (200 envois/jour globaux).

**« L'opérateur peut-il lire mes emails ? »**
Non, pour les boîtes E2EE : RSA-2048/AES-256-GCM, clés dans le navigateur, serveur = chiffré uniquement. Pour les boîtes sans E2EE (par choix), les messages sont chiffrés au repos (AES-256-GCM serveur) et accessibles à l'opérateur — c'est indiqué dans les CGU.

**« Pourquoi 200 envois/jour seulement ? »**
Quota du fournisseur SMTP (anti-spam). C'est un plafond de sécurité, pas un produit : la réception est illimitée.

**« Je peux retrouver ma boîte ? »**
Oui, avec la phrase de 15 mots (BIP39), sur n'importe quel appareil, tant que la boîte n'a pas expiré. Après expiration : détruite définitivement, c'est le principe.

**« Et si quelqu'un l'utilise pour du spam ? »**
L'avertissement anti-abus est apposé sur chaque envoi, les quotas sont stricts (50 boîtes/h/IP, 200 envois/h/IP, 200/jour globaux), les signalements (report.veildrop.fr) traités sous 24–48 h, les adresses/IP fautives bloquées, le service entier peut être suspendu, et l'opérateur coopère avec les autorités.

**« Où sont mes données ? »**
Cloudflare D1, région UE (Londres), sous TLS. Durée de vie = votre TTL (10 min par défaut), puis purge. Aucun compte, donc aucun profil à fuiter. Vous pouvez exporter ou tout effacer à tout moment (endpoints RGPD).

**« C'est pour qui ? »**
Particuliers anti-spam, devs (tests de formulaires, bots, démos via API), journalistes et lanceurs d'alerte (E2EE), entreprises (tests d'envoi sans données sensibles).

---

*Document généré à partir du code source (révision de production du 18 août 2026). Chaque limite, endpoint, article de loi et paramètre cryptographique cité est vérifié dans src/api/routes.ts, src/index.ts, src/crypto/e2ee.ts et src/web/app.js.*