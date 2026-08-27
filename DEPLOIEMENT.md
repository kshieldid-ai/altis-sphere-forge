# ALTIS SPHERE GROUP — Notes de correction & déploiement

Domaine de production : **https://altisphere-group.com**
Hébergement : **GitHub Pages** (site 100 % statique, domaine apex)

---

## ⚠️ RÈGLE N°1 — NE PAS TOUCHER AU `.env`

Le fichier `.env` est **volontairement versionné dans git**. C'est correct et nécessaire.

L'application est entièrement statique : Vite doit **inliner** `VITE_SUPABASE_*` dans le bundle
au moment du build. Sans le `.env` dans le dépôt, le build produit
`createClient(undefined, undefined)` → exception au chargement → **page blanche**.

La clé `VITE_SUPABASE_PUBLISHABLE_KEY` est la clé **anon** : publique par conception,
lisible par quiconque ouvre le bundle JS du site déployé. La sécurité repose sur les
**policies RLS Supabase**, pas sur le secret de cette clé.

### Piège associé — ne jamais faire ceci dans `deploy.yml`

```yaml
- run: npm run build
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}   # ❌ INTERDIT
```

Si le secret n'existe pas, GitHub rend une **chaîne vide**, pas « rien ». La variable est donc
définie-mais-vide dans `process.env`, et **Vite donne la priorité à `process.env` sur le
fichier `.env`** → la valeur du `.env` est écrasée → page blanche.

Vérifié en test :

| Build | URL Supabase dans le bundle |
|---|---|
| `.env` seul | `https://qxrcfbqjbzxwowhbbifv.supabase.co` ✅ |
| `.env` + secrets vides | absente ❌ → page blanche |

Le workflow contient désormais un garde-fou : `grep supabase.co dist/assets/` fait
**échouer le CI** si l'URL disparaît du bundle.

---

## 1. Bug d'origine — logo invisible

`Navbar.tsx` et `Footer.tsx` importaient un **manifeste JSON Lovable** au lieu d'une image :

```
import altisLogo from "@/assets/altis-logo-2026.png.asset.json";
<img src={altisLogo.url} />   →   /__l5e/assets-v1/<uuid>/altis-logo-2026.png
```

La route `/__l5e/` n'existe que sur l'infrastructure Lovable. Sur GitHub Pages → **404**.
Le binaire `altis-logo-2026.png` n'a d'ailleurs **jamais été commité** (seul son `.asset.json` l'était).

**Correctif** : import du vrai fichier versionné `src/assets/altis-logo.png` (854x292).
Même problème corrigé pour `network-bg.jpg` dans `PageBackground.tsx` (bascule sur `hero-bg.jpg`).

---

## 2. Correctifs appliqués

| Fichier | Correction |
|---|---|
| `src/lib/site.ts` | **NOUVEAU** — source unique du domaine (`SITE_URL`, `ORG_ID`, `SITE_ID`), avec valeur par défaut codée en dur (pas de dépendance à une variable d'env) |
| `src/components/Navbar.tsx` | Import PNG réel + ratio 117x40 (corrige le CLS) + `fetchPriority="high"` |
| `src/components/Footer.tsx` | Import PNG réel + ratio 105x36 + email aligné sur le domaine |
| `src/components/PageBackground.tsx` | Import image réelle (`hero-bg.jpg`) |
| `src/components/Seo.tsx` | `SITE_URL` centralisé + `og:image` en URL absolue |
| `src/lib/seo-schemas.ts` | `SITE_URL` centralisé |
| `src/pages/Index.tsx`, `Blog.tsx` | JSON-LD via `SITE_URL` / `ORG_ID` |
| `src/pages/Contact.tsx`, `Footer.tsx` | `contact@altissphere.com` → `contact@altisphere-group.com` |
| `src/lib/mcp/tools/get-company-info.ts` | `siteWeb` = altisphere-group.com |
| `index.html` | Domaine, canonical, `og:image` 1200x630, `@id` schema.org, suppression `@Lovable` |
| `scripts/generate-sitemap.ts` | Domaine + génère aussi `robots.txt` + `lastmod` |
| `.github/workflows/deploy.yml` | Étape `Verify build`, génération `404.html` + `.nojekyll`. **Aucun secret injecté.** |
| `public/CNAME` | **NOUVEAU** — `altisphere-group.com` (survit à chaque déploiement) |
| `public/.nojekyll` | **NOUVEAU** |
| `public/og-image.png` | **NOUVEAU** — 1200x630 pour les aperçus sociaux |
| `.gitignore` | `*.asset.json` et `bun.lock*` ignorés. **`.env` reste versionné** (commentaire explicatif inclus) |
| `src/assets/*.asset.json` | **SUPPRIMÉS** (manifestes Lovable inutilisables) |
| `bun.lock`, `bun.lockb` | **SUPPRIMÉS** (le CI utilise `npm ci`) |
| Images | Optimisées : **7,06 Mo → 1,36 Mo** (−81 %) |
| `supabase/migrations/20260826210000_devis_rate_limit.sql` | **NOUVEAU** — anti-spam devis |

`vite.config.ts` est **inchangé** — `base: "/"` est correct pour un domaine personnalisé.
Ne jamais décommenter `base: "/altis-sphere-forge/"`.

Build validé en conditions CI réelles (aucune variable d'env) : `dist/` passe de **8,1 Mo à 2,5 Mo**.

---

## 3. Déploiement

```bash
git add -A
git commit -m "fix: logo, domaine altisphere-group.com, fallback SPA, images"
git push origin main
```

C'est tout. Aucun secret à configurer.

### DNS — apex `altisphere-group.com` (enregistrements A obligatoires)

| Type | Nom | Valeur |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<ton-user>.github.io` |

Puis `Settings > Pages` → cocher **Enforce HTTPS**.

### Migration Supabase
```bash
supabase db push
```
ou coller `supabase/migrations/20260826210000_devis_rate_limit.sql` dans le SQL Editor.

---

## 4. Vérification post-déploiement (2 min)

1. `https://altisphere-group.com` → **logo visible, pas de page blanche**
2. `https://altisphere-group.com/services` puis **F5 dessus** → pas de 404
3. Envoyer une demande de devis → doit arriver dans Supabase (valide que la clé est inlinée)
4. DevTools > Network > filtre `l5e` → **0 requête**
5. Ctrl+U → chercher `lovable` → **0 occurrence**

---

## 5. Restant à traiter (non bloquant)

| Item | Détail |
|---|---|
| Bundle 802 Ko | `index-*.js` non découpé. Piste : `manualChunks` (framer-motion, recharts) |
| OG par page | react-helmet-async injecte côté client ; WhatsApp/LinkedIn ne lisent que `index.html`. Toutes les pages partagent le même aperçu. Pré-rendu requis pour un OG par page |
| Anti-spam | Le rate-limit SQL est contournable en variant l'email → Edge Function + Turnstile |
| Email `contact@` | **Vérifier que la boîte existe sur `altisphere-group.com`** (l'ancienne était `altissphere.com`, double « ss ») |
| Logo « 2026 » | Perdu. Récupérable depuis la preview Lovable tant qu'elle répond |
| Fins de ligne | Le dépôt mélange CRLF/LF. Un `.gitattributes` avec `* text=auto eol=lf` éviterait des diffs de 109 fichiers |
