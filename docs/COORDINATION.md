# Protocole de coordination — Muse × Antigravity

> Objectif : faire travailler Muse et Antigravity **en parallèle** sur ce repo
> sans conflit, sans écrasement, sans double déploiement.

## 1. Propriété des zones

| Zone | Propriétaire | Notes |
|---|---|---|
| `main` (branche) | Antigravity / Hicham | Branche déployée, source de vérité du code |
| `muse/*` (branches) | Muse | Revamps, features, contenu — jamais de push direct sur `main` |
| Déploiements Netlify | **Muse, via API (manuel)** | Token géré en autonomie (connecteur `custom.netlify`) |
| `public/data/catalogue.json` | Muse (Pont Muse) | Nourri à chaque vague de production hebdo |
| `public/thumbnails/` | Muse | Visuels générés à chaque vague |

## 2. Règle anti-conflit Netlify ⛔

**NE JAMAIS activer le déploiement continu Netlify depuis GitHub** sur le site
`moroccan-medieval-asset-studio` (ni sur aucun site du compte sans l'aval de Hicham).

- Les déploiements se font **uniquement** par Muse via l'API Netlify
  (`POST /sites/{id}/deploys` avec le `dist/` zippé).
- Activer le déploiement continu créerait des **doubles déploiements** et des
  écrasements de versions (conflit direct avec les déploiements API).
- Rappel technique : les déploiements ZIP via API **ignorent** les `redirects`
  du `netlify.toml` — le fichier `_redirects` (`/* /index.html 200`) dans `dist/`
  est obligatoire pour la SPA (routage par hash).

## 3. Convention de branches

- `main` — code en production. Seuls Antigravity et Hicham y mergent.
- `muse/<sujet>` — travail de Muse (ex. `muse/revamp-complet`).
- `antigravity/<sujet>` — travail d'Antigravity (recommandé, même logique).

Muse ne touche **jamais** à `main` directement : toute contribution passe par
une **Pull Request** `muse/*` → `main`, mergée côté Antigravity/Hicham après revue.

## 4. Cycle de vie d'une contribution Muse

1. Muse crée sa branche depuis `main` : `git checkout -b muse/<sujet>`.
2. Muse développe, vérifie `npm run build`, push **uniquement** sa branche.
3. Muse ouvre (ou signale) une PR vers `main`.
4. Antigravity/Hicham revoit, merge dans `main`.
5. Muse déploie la nouvelle version via l'API Netlify (manuel).

## 5. Données — le Pont Muse

- `public/data/catalogue.json` est la **source de vérité** des assets.
- Muse le met à jour à chaque vague (nouveaux assets, prix, statuts, `waves[]`).
- L'app le lit au runtime (`/data/catalogue.json`) ; les statuts kanban et la
  checklist QA sont surchargés en `localStorage` côté visiteur.
- En cas de divergence entre le JSON du repo et celui de Muse :
  **le fichier de Muse fait foi** (il est généré depuis la production réelle).

## 6. En cas de conflit

1. Ne jamais `--force-push` sur `main`.
2. Si `main` a avancé pendant le travail sur `muse/*` : rebase ou merge de
   `main` dans la branche Muse **avant** la PR.
3. En cas de doute sur qui fait quoi : demander à Hicham, ne pas deviner.

---
*Dernière mise à jour : 28/09/2026 — Muse.*
