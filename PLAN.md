# PLAN - P0 Strategy SEO (GitHub Pages)

## Objectif
- [ ] Avoir une URL canonique unique par page et par langue
- [ ] Supprimer les 404 SEO sur les routes strategiques (notamment blog)
- [ ] Aligner redirections, canonical, hreflang, sitemap

## Decisions d’architecture
- [x] Valider le domaine canonique: `https://www.sent-tech.ca`
- [x] Valider la convention langue: `/` = FR, `/en/` = EN
- [x] Valider la convention blog: `/blog/:slug` (FR) et `/en/blog/:slug` (EN)
- [x] Valider la normalisation trailing slash (avec slash final canonical)

## Etape 1 - Redirections domaine (infra)
- [x] Configurer une redirection 301 `https://sent-tech.ca/*` -> `https://www.sent-tech.ca/$1`
- [x] Conserver le path et la query string sur la redirection
- [x] Ajouter une redirection JS de secours vers `www` dans `index.html`
- [x] La redirection 301 réelle est opérationnelle via Cloudflare (path/query préservés)
- [x] Verifier les redirections via `curl -I` sur `/`, `/blog/...`, `/?lang=en`

   - Référence opérationnelle: `docs/cf-www-redirect.md`

## Etape 2 - Base URL et deep links
- [x] Corriger la config Vite pour des assets resolus correctement sur routes profondes
- [x] Verifier que les assets chargent sur `/blog/...`
- [x] Confirmer qu’aucun asset n’est resolu en chemin relatif cassant

## Etape 3 - Rendre les URLs blog indexables en HTTP 200
- [x] Supprimer la dependance SEO au fallback 404 SPA pour les pages blog
- [x] Générer des pages statiques accessibles en 200 pour chaque slug FR/EN
- [x] Verifier `curl -I https://www.sent-tech.ca/blog/<slug>/` = 200
- [x] Verifier `curl -I https://www.sent-tech.ca/en/blog/<slug>/` = 200

## Etape 4 - Strategie langue URL-based
- [x] Implémenter la langue par chemin (`/` et `/en/`) plutôt que par localStorage uniquement
- [x] Faire évoluer le switch langue pour naviguer vers l’URL equivalente
- [x] Rediriger les anciennes URLs `?lang=en` vers `/en/...` en 301
- [x] Garder localStorage uniquement comme preference UX secondaire

## Etape 5 - Canonical, hreflang, OG/Twitter
- [x] Mettre `canonical` sur l’URL canonique réelle (`www`)
- [x] Ajouter `hreflang` FR/EN + `x-default` sur chaque page indexable
- [x] Aligner `og:url` et `twitter:url` avec l’URL canonique de la page
- [x] Ajouter `noindex` sur la vraie page 404

## Etape 6 - Sitemap et robots
- [x] Générer automatiquement un sitemap avec toutes les URLs canoniques FR/EN
- [x] Renseigner `lastmod` de manière fiable (date article ou date de build)
- [x] Mettre `robots.txt` avec `Sitemap: https://www.sent-tech.ca/sitemap.xml`
- [x] Exclure les URLs non canoniques du sitemap

## Etape 7 - Validation finale
- [x] Verifier status codes: canonical en 200, non-canonique en 301
- [x] Verifier absence de 404 sur les routes SEO critiques
- [x] Verifier canonical/hreflang/sitemap coherents entre eux
- [ ] Soumettre sitemap dans Google Search Console + Bing Webmaster Tools
- [ ] Contrôler les rapports d’indexation (soft 404, pages avec redirection, duplicates)

## Definition of Done
- [ ] 100% des pages SEO critiques sont servies en 200 sur URL canonique
- [ ] 100% des variantes redirigent en 301 vers la canonique avec path préservé
- [ ] `canonical` / `hreflang` / `sitemap` sont alignés et sans conflit
- [ ] Les erreurs d’indexation critiques diminuent dans Search Console
