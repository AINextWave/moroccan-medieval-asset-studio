# 🕌 Moroccan Medieval — Asset Studio

QG visuel pour le catalogue d'assets Roblox **Moroccan Medieval** : zellige, arches en fer à cheval, lanternes fanous, laiton doré.

## Stack
- React + Vite + Tailwind CSS v4
- Données : `public/data/catalogue.json`
- Persistance : localStorage (statuts kanban + QA checklist)
- Déploiement : Netlify (build statique)

## Lancer le projet

```bash
npm install
npm run dev     # dev → http://localhost:5173
npm run build   # build prod → dist/
```

## 🤖 Pont Muse — Comment nourrir le catalogue

Toute la source de vérité est dans **`public/data/catalogue.json`**.

### Ajouter un asset

```json
{
  "id": "mon-nouvel-asset",
  "type": "plugin",
  "name": "Nom Affiché",
  "description": "Description complète...",
  "priceRobux": 299,
  "status": "idée",
  "thumbnail": null,
  "files": ["plugins/mon-asset.lua"],
  "tags": ["tag1", "tag2"],
  "polycount": null,
  "propCount": null,
  "qa": [
    { "label": "Syntaxe Luau validée", "done": false },
    { "label": "Test en Studio", "done": false },
    { "label": "Thumbnail prêt", "done": false }
  ],
  "createdAt": "2026-10-05",
  "waveId": "vague-2"
}
```

### Statuts valides

| Statut | Description |
|--------|-------------|
| `idée` | Concept, pas encore commencé |
| `en-production` | En cours de création |
| `staging` | Fichier prêt, pas encore testé |
| `testé` | Validé dans Roblox Studio |
| `publié` | Live sur le Creator Store |

## Design System

| Token | Valeur | Usage |
|-------|--------|-------|
| `night` | #0E2A3A | Fond principal |
| `zellige` | #0F6B5C | Vert émeraude |
| `terracotta` | #C96F4A | Staging, packs |
| `sable` | #E8DCC8 | Texte principal |
| `or` | #C9A227 | Prix, KPIs dorés |

## Déploiement Netlify

1. Push `moroccan-medieval-studio/` sur GitHub
2. Connecter sur netlify.com — Build: `npm run build`, Publish: `dist`
