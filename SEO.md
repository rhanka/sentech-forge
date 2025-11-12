# Optimisations SEO - sent-tech.ca

## ✅ Optimisations implémentées

### 1. Meta Tags améliorés (`index.html`)
- ✅ Meta tags primaires (title, description, keywords)
- ✅ Meta tags géographiques (region, placename)
- ✅ Canonical URL pour éviter le contenu dupliqué
- ✅ Balises hreflang pour les versions FR/EN
- ✅ Open Graph tags corrigés (URL et image pointent vers sent-tech.ca)
- ✅ Twitter Card tags
- ✅ Meta robots (index, follow)

### 2. Schema.org Structured Data
- ✅ Organization schema
- ✅ Person schema (Fabien ANTOINE)
- ✅ ProfessionalService schema
- Améliore la compréhension du site par les moteurs de recherche
- Permet l'affichage de rich snippets dans les résultats de recherche

### 3. Sitemap.xml
- ✅ Sitemap créé avec les versions FR et EN
- ✅ Hreflang tags dans le sitemap
- ✅ Priorités et fréquences de mise à jour définies

### 4. Robots.txt amélioré
- ✅ Référence au sitemap.xml
- ✅ Permissions pour les principaux robots
- ✅ Crawl-delay configuré

## 📋 Prochaines étapes recommandées

### 1. Créer une image Open Graph optimisée
- Créer une image 1200x630px pour les réseaux sociaux
- Nommer l'image `og-image.jpg` ou `og-image.png`
- Mettre à jour `og:image` dans `index.html` avec cette nouvelle image
- L'image actuelle pointe vers `SENT-logo.svg`, mais une image dédiée serait meilleure

### 2. Soumettre le sitemap aux moteurs de recherche
- **Google Search Console**: https://search.google.com/search-console
  - Ajouter la propriété `sent-tech.ca`
  - Soumettre le sitemap: `https://sent-tech.ca/sitemap.xml`
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
  - Ajouter le site
  - Soumettre le sitemap

### 3. Vérifier l'indexation
- Utiliser Google Search Console pour vérifier l'indexation
- Vérifier la présence dans les résultats de recherche: `site:sent-tech.ca`
- Vérifier les erreurs de crawl

### 4. Optimisations techniques supplémentaires

#### Performance
- ✅ Vérifier que les images sont optimisées
- ✅ Vérifier que le site est rapide (Lighthouse)
- ✅ Activer la compression GZIP/Brotli (si possible sur l'hébergement)

#### Contenu
- ✅ S'assurer que tous les textes alternatifs des images sont remplis
- ✅ Vérifier la hiérarchie des titres (H1, H2, H3)
- ✅ Ajouter des balises alt aux images si nécessaire

#### Liens internes
- Vérifier que la navigation interne est claire
- Ajouter des liens contextuels dans le contenu si possible

### 5. Analytics et suivi
- Installer Google Analytics 4 (si pas déjà fait)
- Configurer Google Search Console
- Suivre les performances SEO régulièrement

### 6. Contenu dynamique (optionnel)
- Si vous ajoutez un blog ou des pages supplémentaires, mettre à jour le sitemap
- Ajouter des balises meta dynamiques selon la page visitée (actuellement tout est sur la page d'accueil)

## 🔍 Vérifications à faire

### Validation des meta tags
- Utiliser [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) pour vérifier les Open Graph tags
- Utiliser [Twitter Card Validator](https://cards-dev.twitter.com/validator) pour vérifier les Twitter Cards
- Utiliser [Google Rich Results Test](https://search.google.com/test/rich-results) pour vérifier le Schema.org

### Validation du sitemap
- Utiliser [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Vérifier que le sitemap est accessible: `https://sent-tech.ca/sitemap.xml`

### Validation robots.txt
- Vérifier avec [Google Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)
- Vérifier que robots.txt est accessible: `https://sent-tech.ca/robots.txt`

## 📊 Métriques à suivre

- **Rankings**: Position dans les résultats de recherche pour les mots-clés cibles
- **Traffic organique**: Nombre de visiteurs venant des moteurs de recherche
- **Indexation**: Nombre de pages indexées
- **Erreurs de crawl**: Erreurs détectées par Google Search Console
- **Core Web Vitals**: Performance, accessibilité, meilleures pratiques

## 🚀 Commandes utiles

### Vérifier le sitemap localement
```bash
# Après le build
cat dist/sitemap.xml
```

### Vérifier les meta tags
```bash
# Après le build
grep -A 5 "og:title" dist/index.html
```

### Tester le site localement
```bash
npm run build
npm run preview
```

## 📝 Notes importantes

- Le sitemap doit être mis à jour si de nouvelles pages sont ajoutées
- Les dates de `lastmod` dans le sitemap doivent être mises à jour régulièrement
- Les meta tags peuvent être rendus dynamiques selon la langue si nécessaire
- Pour un site multilingue complet, considérer l'utilisation de sous-domaines ou de chemins (`/fr/`, `/en/`) plutôt que des paramètres de requête (`?lang=en`)

## 🔗 Ressources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
