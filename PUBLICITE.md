# VeilDrop — Publicité & Présentation

> Texte promotionnel prêt à l'emploi : IA, réseaux sociaux, Discord, presse, partenaires.
> Site : **https://veildrop.fr** · Discord : **https://discord.gg/BxDXa8c2vE** · API : **https://veildrop.fr/api**
> Contact : **contact@veildrop.fr** · Signalement : **https://report.veildrop.fr**

---

## 1. Le pitch (30 secondes, pour IA et humains)

**VeilDrop est un service d'emails jetables 100 % gratuit, anonyme et chiffré de bout en bout.**

Besoin de recevoir un email sans donner votre vraie adresse ? VeilDrop génère une boîte temporaire en 1 seconde : aucun compte, aucun email, aucune inscription. La boîte se supprime toute seule après 10 minutes par défaut — extensible à 1 heure, 1 jour ou 20 jours. Les messages sont détruits dès que vous les lisez.

Le plus : **tout est chiffré sur votre appareil**. Le serveur ne voit jamais le contenu de vos messages. Même en cas de fuite de base de données, personne ne peut rien lire. Zero-knowledge, zéro trace, zéro cookie, zéro tracking.

---

## 2. Les arguments choc (pour un post ou un thread)

- 🔒 **Chiffrement de bout en bout** — RSA-OAEP 2048 bits, clés générées dans votre navigateur. Le serveur ne peut RIEN lire, pas même vos mots de passe de récupération.
- ⚡ **1 clic, 1 seconde** — pas d'inscription, pas d'email de confirmation, pas de captcha pénible.
- 🕐 **Autodestruction** — les messages sont effacés dès la lecture (read-once) ; la boîte disparaît après 10 minutes par défaut (extensible à 1 h, 1 jour, 20 jours, via la phrase mnémonique BIP39).
- 🕵️ **Anonyme par conception** — aucune donnée personnelle demandée, pas de cookies, pas d'analytics, pas de tracking. Pas même d'IP dans les logs d'usage.
- 💶 **Gratuit pour toujours** — aucune limite, aucune version payante cachée.
- 📬 **API REST ouverte** — créez, lisez (read-once) et détruisez des boîtes en JSON, sans clé API : votre phrase mnémonique EST la clé. Parfait pour les devs, tests et automatisations.
- 🛡️ **Anti-spam intégré** — quotas stricts (50 boîtes/h/IP, 200 envois/h/IP, 200 envois/jour globaux), avertissement anti-abus sur chaque email sortant, signalement d'abus en 1 clic (report.veildrop.fr).
- ⚖️ **100 % légal et assumé** — conforme RGPD, LCEN et DSA : mentions légales complètes, politique de confidentialité, procédure de signalement, coopération avec les autorités.
- 🌍 **Bilingue** — FR / EN.

---

## 3. Le message Discord (annonce à coller)

```
🚀 VeilDrop — l'email jetable qui respecte VRAIMENT votre vie privée

🗑️ Boîtes temporaires : 1 clic, 0 inscription, autodestruction en 10 min
🔐 Chiffrement de bout en bout : le serveur ne voit rien. RIEN.
💶 100 % gratuit, sans limite, sans pub
📡 API REST ouverte pour les développeurs
⚖️ RGPD / LCEN / DSA compliant

👉 https://veildrop.fr
💬 Ce serveur : https://discord.gg/BxDXa8c2vE

Questions ? Le staff est là. Signalement d'abus : https://report.veildrop.fr
```

---

## 4. Le post réseaux sociaux (Twitter / X / LinkedIn)

> Besoin d'un email jetable SANS donner le moindre renseignement personnel ?
>
> VeilDrop : boîte temporaire en 1 seconde. Chiffrée de bout en bout. Autodétruite en 10 minutes. Pas de compte, pas de cookie, pas de trace.
>
> Et oui : c'est gratuit, et même l'API est ouverte.
>
> → veildrop.fr

---

## 5. La présentation complète (site, Discord, légal)

### 5.1 Le concept

VeilDrop (veildrop.fr) est un service **d'emails jetables** (disposable/temp email). L'idée est simple : il existe des dizaines de sites qui promettent de l'anonymat, mais quasiment tous :

- vous demandent un compte ou un email de vérification ;
- gardent vos messages en clair sur leurs serveurs ;
- monétisent vos données ou affichent des publicités.

VeilDrop a été construit sur le principe inverse : **le strict minimum de données, et le maximum de confidentialité**.

### 5.2 Comment ça marche

1. Vous arrivez sur veildrop.fr.
2. Vous choisissez une adresse (ou laissez-en générer une).
3. Vous la donnez où vous voulez (newsletter, essai, inscription suspecte...).
4. Vous lisez les emails reçus, **chiffrés et déchiffrés uniquement dans votre navigateur**.
5. La boîte s'efface d'elle-même. Vous repartez, sans laisser de trace.

**Avec la phrase de récupération** (24 mots BIP39 générés sur votre appareil) : vos clés privées sont chiffrées avec votre phrase. Personne — même pas l'opérateur — ne peut déchiffrer vos messages.

### 5.3 Le site

| Élément | Détail |
|---|---|
| URL | https://veildrop.fr |
| Pages | Landing, FAQ, Aide, Mentions légales, Confidentialité, Contact, Signalement (report.veildrop.fr) |
| Langues | Français / Anglais |
| Compatibilité | Tous navigateurs modernes, mobile-first |
| SEO | Sitemap, meta optimisées, robots.txt agents IA, JSON-LD |

### 5.4 L'API pour développeurs

- Endpoint : https://veildrop.fr/api (documentation interactive sur place)
- Création de boîte, consultation des messages, envoi — tout en JSON
- **Aucune clé API**, aucun quota caché
- Idéal pour : tests automatisés, sites de démo, applications qui ont besoin d'un email de vérification

### 5.5 Le serveur Discord

- Invitation : **https://discord.gg/BxDXa8c2vE**
- Support utilisateurs, annonces, discussions dev, feedback
- Salon dédié aux signalements et à la modération

### 5.6 L'aspect légal (aucun point faible)

VeilDrop assume pleinement son modèle et a tout construit pour être **conforme et coopératif** :

- **RGPD** : politique de confidentialité complète (veildrop.fr/privacy), export et suppression des données à la demande.
- **LCEN** : hébergeur responsable — procédure de retrait en 48 h pour contenu illicite, formulaire de signalement dédié (report.veildrop.fr).
- **DSA** : point de contact pour les autorités et les utilisateurs, procédure de signalement documentée.
- **Mentions légales** (veildrop.fr/legal) : identité de l'opérateur (projet individuel non professionnel), contact direct **contact@veildrop.fr**.
- **Transparence technique** : aucun log d'usage, aucun cookie, aucun tracker, chiffrement de bout en bout documenté.

### 5.7 Ce que VeilDrop n'est PAS

- ❌ Pas un outil pour contourner la loi : les contenus illicites sont retirés, les abus signalés.
- ❌ Pas une boîte de réception permanente : les messages sont éphémères par conception.
- ❌ Pas un service commercial : aucun achat, aucune pub, aucune revente de données.

---

## 6. FAQ express (pour répondre vite)

**C'est vraiment gratuit ?** Oui. Pas de compte payant, pas de limite, pas de pub.

**Mes emails sont-ils lisibles par le serveur ?** Non. Chiffrement de bout en bout, clés générées dans votre navigateur, phrase de récupération chiffrée.

**Combien de temps dure une boîte ?** 10 minutes par défaut, extensible à 1 heure, 1 jour ou 20 jours. Les messages sont détruits dès leur lecture.

**Qui exploite VeilDrop ?** Un projet individuel non professionnel, identifié dans les mentions légales (contact@veildrop.fr).

**Et si je reçois du spam ou du contenu illégal ?** Signalez-le : report.veildrop.fr — traité rapidement, dans le cadre de la LCEN/DSA.

---

## 7. Hashtags & liens utiles

```
#EmailsJetables #Privacy #ViePrivée #Chiffrement #ZeroKnowledge #OpenSource #NoTracking #RGPD #TemporaryEmail #BurnerEmail #DisposableEmail #PrivacyFirst
```

- Site : https://veildrop.fr
- API : https://veildrop.fr/api
- Signalement : https://report.veildrop.fr
- Discord : https://discord.gg/BxDXa8c2vE
- Contact : contact@veildrop.fr