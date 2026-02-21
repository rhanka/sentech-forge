# SENT-tech Forge

Site vitrine bilingue (FR/EN) de SENT-tech, construit en SPA React.
Le site presente les offres de conseil (strategie, gouvernance, innovation, operations), les secteurs couverts, et un blog alimente par des fichiers Markdown dans le repo.

## Stack technique

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui + Radix UI
- React Router
- TanStack React Query
- react-i18next (langue par defaut: FR, preference sauvegardee en localStorage)
- ESLint

## Prerequis

- Node.js 18+ (LTS recommande)
- npm

## Demarrage local

```sh
npm install
npm run dev
```

Serveur local Vite: `http://localhost:8080`

## Scripts npm

```sh
npm run dev        # lance le serveur de dev
npm run build      # build production dans dist/
npm run build:dev  # build mode developpement
npm run preview    # previsualise le build localement
npm run lint       # verifie le code avec ESLint
```

## Structure du contenu

Le contenu est principalement gere via Markdown dans `src/content/`:

- `src/content/hero/{fr,en}/`
- `src/content/about/{fr,en}/`
- `src/content/services/{fr,en}/`
- `src/content/contact/{fr,en}/`
- `src/content/blog/{fr,en}/`

Le blog est charge dynamiquement et expose des pages via la route `/blog/:slug`.

## Build et deploiement

Le projet genere un site statique (`dist/`) deployable sur n'importe quel hebergeur statique.
Le repo contient deja les assets SEO principaux:

- `index.html` (meta, Open Graph, schema.org)
- `public/robots.txt`
- `public/sitemap.xml`

Le domaine de reference est `https://sent-tech.ca`.

## SEO

Checklist et recommandations SEO: `SEO.md`.

## Outil annexe

Script Python disponible pour generer des metriques hebdo de dev et alimenter des donnees du blog:

```sh
python scripts/generate_weekly_dev_metrics.py
```
