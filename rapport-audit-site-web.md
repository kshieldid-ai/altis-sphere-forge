# Rapport d'audit du site ALTIS SPHERE GROUP

**Site audité :** https://altisphere-group.com
**Date de l'audit :** 11 octobre 2026
**Technologie :** React 18 + Vite + TypeScript + Tailwind CSS (déploiement GitHub Pages)
**Objet :** Identification des anomalies nuisant à l'image professionnelle du site

---

## Table des matières

1. [Identité visuelle & design](#1-identité-visuelle--design)
2. [Expérience utilisateur (UX)](#2-expérience-utilisateur-ux)
3. [Contenu rédactionnel](#3-contenu-rédactionnel)
4. [Technique & code](#4-technique--code)
5. [Communication & conformité légale](#5-communication--conformité-légale)
6. [Synthèse classée par niveau d'impact](#6-synthèse-classée-par-niveau-dimpact)
7. [Recommandations prioritaires](#7-recommandations-prioritaires)

---

## 1. Identité visuelle & design

### 1.1 Coins arrondis désactivés globalement — impact fort

**Localisation :** [tailwind.config.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/tailwind.config.ts#L12-L22)

Toutes les valeurs `borderRadius` (sm, md, lg, xl, 2xl, 3xl, full) sont forcées à `0`. Même les éléments censés être arrondis (badges, boutons, cartes, avatars) apparaissent avec des angles droits.

**Effet négatif :** L'ensemble du site affiche un aspect cassé, rigide et daté. Les boutons, cartes et conteneurs ont des angles vifs qui contrastent avec la tendance moderne du web. Cela donne une impression de site non finalisé ou généré par défaut.

---

### 1.2 Police des titres = Times New Roman — impact fort

**Localisation :** [tailwind.config.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/tailwind.config.ts#L32)

```
fontFamily.heading = ['"Times New Roman"', 'Times', 'serif']
```

**Effet négatif :** Times New Roman est une police de traitement de texte, pas une police de titre web. Elle évoque les documents Word ou les premiers navigateurs. Associée à un site de services IT moderne, elle crée une dissonance flagrante et nuit à la crédibilité.

---

### 1.3 Fichier `App.css` résiduel du template Vite — impact moyen

**Localisation :** [src/App.css](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/App.css)

Le fichier contient le CSS par défaut du template Vite (`max-width: 1280px`, `text-align: center`, animations `logo-spin`, etc. Il n'est pas importé dans `main.tsx` (seul `index.css` l'est), mais sa présence dans le dépôt trahit l'origine template du projet.

**Effet négatif :** Signe de nettoyage incomplet du code source. Un professionnel supprime les fichiers template inutilisés.

---

### 1.4 Images générées par IA (Gemini) non utilisées — impact moyen

**Localisation :** `src/assets/` — 6 fichiers :
- `Gemini_Generated_Image_45yh2945yh2945yh.jpg`
- `Gemini_Generated_Image_ed2n15ed2n15ed2n.jpg`
- `Gemini_Generated_Image_499ub499ub499ub4.jpg`
- `Gemini_Generated_Image_ms6jzxms6jzxms6j.jpg`
- `Gemini_Generated_Image_hbdzkuhbdzkuhbdz.jpg`
- `Gemini_Generated_Image_hgkrfihgkrfihgkr.jpg`

Aucune n'est importée dans le code source (vérifié par recherche).

**Effet négatif :** Encombrement inutile du dépôt + noms de fichiers génériques qui trahissent l'utilisation d'images IA sans retouche ni nommage professionnel.

---

### 1.5 Images non optimisées — impact moyen

**Localisation :** `src/assets/` — poids au build :
| Fichier | Poids |
|---|---|
| `service-it.jpg` | 1,47 Mo |
| `service-dev.jpg` | 951 Ko |
| `service-internet.jpg` | 306 Ko |
| `hero-bg.jpg` | 141 Ko |
| `altis-logo.png` | 178 Ko |
| `dernier.mp4` (vidéo hero) | 838 Ko |

Aucun format WebP/AVIF, aucune redimensionnement adapté.

**Effet négatif :** Chargement lent, particulièrement sur connexion mobile ou débit faible (contexte RD Congo). Dégrade le LCP et l'indice de performance.

---

### 1.6 Placeholder Lovable résiduel — impact faible

**Localisation :** [public/placeholder.svg](file:///d:/ALTIS_SPHERE/altis-sphere-forge/public/placeholder.svg)

Image placeholder par défaut de la plateforme Lovable (icône appareil photo). Non référencée dans le code.

**Effet négatif :** Résidu de l'outil de génération, signe de nettoyage incomplet.

---

## 2. Expérience utilisateur (UX)

### 2.1 Bundle JavaScript trop volumineux — impact moyen

**Localisation :** Build de production

```
dist/assets/index-*.js = 600,84 Ko (188 Ko gzippé)
```

Alerte Vite : *"Some chunks are larger than 500 kB after minification."*

**Effet négatif :** Temps de chargement allongé, coût de données élevé pour les utilisateurs mobiles. Pour un site vitrine, 188 Ko gzippé reste correct mais pourrait être réduit (les bibliothèques UI shadcn radix + recharts + framer-motion pourraient être mieux découplés).

---

### 2.2 Articles de blog non cliquables — impact fort

**Localisation :** [src/pages/Blog.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Blog.tsx#L51-L71)

Les 3 articles de blog sont affichés sous forme de cartes mais ne contiennent aucun lien (`<Link>` ni `<a>`. Aucune route `/blog/:slug` n'existe dans [App.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/App.tsx#L44-L54).

**Effet négatif :** L'utilisateur clique sur un article et rien ne se passe. C'est une promesse non tenue — le visiteur pense que le site est incomplet ou cassé. Démotive fortement la crédibilité.

---

### 2.3 Lien cassé vers une application inexistante — impact critique

**Localisation :** [src/pages/Domotique.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Domotique.tsx#L179) et [ligne 430](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Domotique.tsx#L430)

```
href="https://app.monsite.com/dashboard"
```

`app.monsite.com` est un placeholder évident ("mon site" en français). Deux boutons "Lancer l'application" pointent vers cette URL.

**Effet négatif :** L'utilisateur clique et atterrit sur une page d'erreur ou un domaine tiers. C'est le défaut le plus visible et le plus dommageable : il suggère que le site est un brouillon non finalisé. Impact direct sur la confiance.

---

### 2.4 Liens du footer vers /services sans ancres spécifiques — impact faible

**Localisation :** [src/components/Footer.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/components/Footer.tsx#L30-L42)

Les 5 liens "Internet & Connectivité", "Solutions IT", "Cybersécurité", "Développement Web", "Support Technique" pointent tous vers `/services` (sans ancre).

**Effet négatif :** L'utilisateur s'attend à être dirigé vers la section correspondante mais arrive en haut de la page Services. Mineur mais signe de peaufinage incomplet.

---

### 2.5 CAPTCHA arithmétique basique — impact moyen

**Localisation :** [src/hooks/use-anti-bot.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/hooks/use-anti-bot.ts) + [AntiBotFields.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/components/AntiBotFields.tsx)

Le formulaire de contact et de devis utilisent un CAPTCHA mathématique simple (ex: "5 + 3 = ?").

**Effet négatif :** Pour une entreprise qui vend de la **cybersécurité**, un CAPTCHA aussi basique dénote un manque de sérieux technique. Les bots modernes résolvent ce type de challenge facilement. Contradiction avec le positionnement.

---

### 2.6 `console.error` en production sur la page 404 — impact faible

**Localisation :** [src/pages/NotFound.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/NotFound.tsx#L17)

```js
console.error("404 Error: User attempted to access non-existent route:", location.pathname);
```

**Effet négatif :** Pollution de la console navigateur en production. Signe de code de débogage laissé en place.

---

## 3. Contenu rédactionnel

### 3.1 Incohérence d'email de contact — impact critique

**Localisation :**
- Footer et page Contact : `support@altisphere-group.com`
  ([Footer.tsx:64](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/components/Footer.tsx#L64), [Contact.tsx:45](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Contact.tsx#L45))
- Données structurées JSON-LD (balises SEO) : `contact@altisphere-group.com`
  ([index.html:45](file:///d:/ALTIS_SPHERE/altis-sphere-forge/index.html#L45))

**Effet négatif :** Deux adresses email différentes pour la même entreprise. L'utilisateur ne sait pas laquelle écrire. Les moteurs de recherche indexent `contact@` alors que le site affiche `support@`. Incohérence rédactionnelle et de confiance.

---

### 3.2 Textes de développement laissés en production — impact critique

**Localisation :** Plusieurs pages contiennent des phrases qui sont des notes de développement, pas du contenu marketing :

- [Services.tsx:44](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Services.tsx#L44) :
  > *"Une mise en page plus affirmée, plus luxueuse et plus équilibrée, sans retirer le moindre service."*

- [Solutions.tsx:40](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Solutions.tsx#L40) :
  > *"Une lecture plus premium, plus structurée et plus intentionnelle, sans retirer aucun élément du site."*

- [Products.tsx:35](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Products.tsx#L35) :
  > *"Équipements de qualité professionnelle pour vos infrastructures IT, avec une présentation plus premium et structurée."*

**Effet négatif :** Ces phrases n'ont aucun sens pour un visiteur. Elles révèlent que le site a été généré/modifié sans relecture. C'est l'anomalie rédactionnelle la plus visible et la plus embarrassante : on dirait un brouillon.

---

### 3.3 Témoignages clients tous étrangers — impact moyen

**Localisation :** [src/data/services.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/data/services.ts#L30-L49)

Les 3 témoignages viennent :
- AFFAGRIPEL Lualaba — Kolwezi, RDC ✓ (local)
- MKS Engineering — Costa Mesa, USA
- MAA Solar Solutions — Gujarat, Inde

**Effet négatif :** Pour une entreprise basée à Lubumbashi (RDC), avoir 2 témoignages sur 3 venant d'USA et d'Inde est peu crédible. Ces sites correspondent aux "réalisations web" listées dans le même fichier, suggérant que les témoignages sont dérivés des projets web et non de retours clients réels.

---

### 3.4 Dates d'articles de blog — impact faible

**Localisation :** [src/pages/Blog.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/pages/Blog.tsx#L11-L14)

Les articles sont datés de mars et février 2026. À la date d'audit (octobre 2026), le blog n'a pas été mis à jour depuis 7 à 8 mois.

**Effet négatif :** Un blog stagnant suggère un site abandonné. Surtout que les articles ne sont pas cliquables (voir 2.2).

---

## 4. Technique & code

### 4.1 3 erreurs ESLint non corrigées — impact moyen

**Localisation :**
- [src/components/ui/command.tsx:24](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/components/ui/command.tsx#L24) — interface vide
- [src/components/ui/textarea.tsx:5](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/components/ui/textarea.tsx#L5) — interface vide
- [tailwind.config.ts:124](file:///d:/ALTIS_SPHERE/altis-sphere-forge/tailwind.config.ts#L124) — `require()` interdit

```
✖ 10 problems (3 errors, 7 warnings)
```

**Effet négatif :** Le `lint` échoue (exit code 1). Un pipeline CI ne passe pas. Signe que la qualité de code n'est pas vérifiée. Les erreurs viennent de composants shadcn/ui et de la config Tailwind.

---

### 4.2 Test unitaire vide (placehold) — impact faible

**Localisation :** [src/test/example.test.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/test/example.test.ts)

```js
it("should pass", () => { expect(true).toBe(true); });
```

**Effet négatif :** Aucun test réel sur le formulaire, la navigation ou les composants. Le "test" ne valide rien. Signe de superficialité.

---

### 4.3 API backend hébergée sur un domaine tiers — impact moyen

**Localisation :** [src/services/altisApi.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/services/altisApi.ts#L10) + [.env.production](file:///d:/ALTIS_SPHERE/altis-sphere-forge/.env.production)

```
VITE_API_URL=https://affagripel-lualaba.com/api/altis
```

Les formulaires de contact et de devis dépendent d'une API hébergée sur le domaine d'un **autre client** (AFFAGRIPEL Lualaba).

**Effet négatif :** Si le site AFFAGRIPEL est en panne ou modifié, les formulaires ALTIS SPHERE cessent de fonctionner. Architecture fragile. De plus, exposer l'infrastructure d'un client comme backend d'un autre projet est peu professionnel.

---

### 4.4 `.gitignore` obsolète (mention Supabase) — impact faible

**Localisation :** [.gitignore](file:///d:/ALTIS_SPHERE/altis-sphere-forge/.gitignore#L15-L20)

Le commentaire justifie le versionnage de `.env` par la présence de clés Supabase (`VITE_SUPABASE_*` et policies RLS). Or le projet n'utilise plus Supabase (fichier `remove-supabase.ps1` présent, vérification CI `! grep -rq "supabase.co"` dans le workflow).

**Effet négatif :** Documentation technique périmée qui induit en erreur les futurs développeurs.

---

### 4.5 Fichiers `.env` résiduels — impact faible

**Localisation :** racine du projet

- `.env.ajout`
- `.env.backup-supabase`

**Effet négatif :** Fichiers de sauvegarde laissés dans le dépôt, signe de manque d'organisation.

---

### 4.6 `console.warn` en production si variable d'environnement absente — impact faible

**Localisation :** [src/services/altisApi.ts](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/services/altisApi.ts#L14-L19)

```js
if (!import.meta.env.VITE_API_URL) {
  console.warn(`[altisApi] VITE_API_URL absente — repli sur ${FALLBACK_URL}. ...`);
}
```

**Effet négatif :** Message de débogage laissé en production.

---

## 5. Communication & conformité légale

### 5.1 Absence de mentions légales — impact critique

Aucune page "Mentions légales" n'existe dans le routing ([App.tsx](file:///d:/ALTIS_SPHERE/altis-sphere-forge/src/App.tsx#L44-L54)). Le footer ne contient aucun lien vers des mentions légales.

**Informations légales manquantes obligatoires (pour un site commercial :
- Raison sociale complète et forme juridique (SARL, SA, etc.)
- Numéro d'identification (RCCM, Identifiant National, Impôt)
- Adresse du siège social (l'adresse physique est présente mais sans statut légal)
- Nom du directeur de la publication
- Hébergeur du site (GitHub Pages)
- Numéro de TVA

**Effet négatif :** Site commercial sans cadre légal. Manque de transparence vis-à-vis des visiteurs et des autorités. Démotive la confiance pour les prospects B2B.

---

### 5.2 Absence de politique de confidentialité — impact critique

Aucune page "Politique de confidentialité" ni mention RGPD/loi congolaise sur la protection des données. Le formulaire de contact et de devis collectent nom, email, téléphone, entreprise.

**Effet négatif :** Collecte de données personnelles sans information de l'utilisateur. Pour une entreprise qui vend de la cybersécurité, c'est une contradiction majeure. Manque de conformité.

---

### 5.3 Absence de CGV/CGU — impact moyen

Aucune page de conditions générales de vente ou d'utilisation.

**Effet négatif :** Absence de cadre contractuel pour les demandes de devis. Surtout problématique pour les relations B2B.

---

### 5.4 Email de contact incohérent (doublon avec 3.1) — impact critique

Voir section 3.1.

---

### 5.5 Pas de lien vers les réseaux sociaux — impact faible

Aucun lien Facebook, LinkedIn, Twitter/X, Instagram dans le footer ou ailleurs.

**Effet négatif :** Manque de canaux de contact alternatifs et de preuve sociale. Pour une entreprise IT, l'absence de présence sociale est notable.

---

## 6. Synthèse classée par niveau d'impact

### 🔴 Impact critique (corriger en priorité)

| # | Anomalie | Localisation | Domaine |
|---|---|---|---|
| C1 | Lien cassé `https://app.monsite.com/dashboard` | Domotique.tsx (2 boutons) | UX |
| C2 | Textes de développement en production | Services, Solutions, Products | Contenu |
| C3 | Email incohérent (`support@` vs `contact@`) | Footer/Contact vs index.html | Contenu/Com |
| C4 | Absence de mentions légales | Footer + routing | Légal |
| C5 | Absence de politique de confidentialité | Footer + routing | Légal |

### 🟡 Impact moyen

| # | Anomalie | Localisation | Domaine |
|---|---|---|---|
| M1 | Coins arrondis désactivés globalement | tailwind.config.ts | Design |
| M2 | Police Times New Roman pour les titres | tailwind.config.ts | Design |
| M3 | Articles de blog non cliquables | Blog.tsx | UX |
| M4 | CAPTCHA arithmétique basique | use-anti-bot.ts | UX/Tech |
| M5 | Images non optimisées (>1 Mo) | src/assets/ | Perf |
| M6 | API backend sur domaine tiers | altisApi.ts | Tech |
| M7 | 3 erreurs ESLint | command.tsx, textarea.tsx, tailwind.config.ts | Tech |
| M8 | Témoignages clients étrangers | services.ts | Contenu |

### 🟢 Impact faible

| # | Anomalie | Localisation | Domaine |
|---|---|---|---|
| F1 | `App.css` résiduel template Vite | src/App.css | Code |
| F2 | Images Gemini non utilisées (6) | src/assets/ | Code |
| F3 | `placeholder.svg` résiduel Lovable | public/ | Code |
| F4 | Liens footer vers /services sans ancres | Footer.tsx | UX |
| F5 | `console.error` sur page 404 | NotFound.tsx | Tech |
| F6 | Test unitaire vide | example.test.ts | Tech |
| F7 | `.gitignore` obsolète (Supabase) | .gitignore | Tech |
| F8 | Fichiers `.env.ajout`, `.env.backup-supabase` | racine | Tech |
| F9 | `console.warn` altisApi | altisApi.ts | Tech |
| F10 | Blog non mis à jour depuis 7-8 mois | Blog.tsx | Contenu |
| F11 | Absence de liens réseaux sociaux | Footer.tsx | Com |
| F12 | Absence de CGV/CGU | routing | Légal |

---

## 7. Recommandations prioritaires

### Semaine 1 — Blocage confiance
1. **Remplacer** `https://app.monsite.com/dashboard` par une vraie URL ou retirer les boutons "Lancer l'application" si l'application n'existe pas.
2. **Supprimer** les 3 phrases de développement dans Services, Solutions et Products et les remplacer par du contenu réel.
3. **Unifier** l'email : choisir entre `support@` et `contact@` dans tout le site (y compris le JSON-LD de `index.html`).
4. **Créer** une page Mentions légales et une page Politique de confidentialité, avec liens dans le footer.

### Semaine 2 — Crédibilité visuelle
5. **Réactiver** les `borderRadius` dans `tailwind.config.ts` (au moins `md` et `lg`).
6. **Remplacer** Times New Roman par une police moderne (Inter pour les titres aussi, ou une police display comme Space Grotesk).
7. **Rendre** les articles de blog cliquables (créer les pages d'articles ou retirer les cartes) ou les liens.
8. **Optimiser** les images : conversion WebP + redimensionnement (max 300 Ko par image).

### Semaine 3 — Technique
9. **Corriger** les 3 erreurs ESLint.
10. **Migrer** l'API backend vers un domaine ALTIS SPHERE dédié.
11. **Nettoyer** les fichiers résiduels (App.css, images Gemini, placeholder.svg, .env.ajout, .env.backup-supabase).
12. **Remplacer** le CAPTCHA mathématique par hCaptcha ou Turnstile (cohérent avec l'offre cybersécurité).

---

*Fin du rapport.*
