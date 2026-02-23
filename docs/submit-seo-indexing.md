# Soumission et contrôle SEO (GSC / Bing)

Objectif: finaliser l’étape 7 après la correction technique.

## 1) Google Search Console

- Ouvrir la propriété de site pour:
  - `https://www.sent-tech.ca`
  - (optionnel: la version `https://sent-tech.ca` peut être gardée en complément pendant la migration DNS)
- Aller dans **Sitemaps**
  - Ajouter: `sitemap.xml`
  - Cliquer sur **Submit**
- Ouvrir **Coverage**
  - Vérifier les états: `Valid` pour les pages critiques
  - Noter les erreurs:
    - `Soft 404`
    - `Redirect error`
    - `Duplicate, submitted URL not selected as canonical`
- Ouvrir **Inspect any URL** pour contrôle final (sans tout lister):
  - `https://www.sent-tech.ca/`
  - `https://www.sent-tech.ca/blog/`
  - `https://www.sent-tech.ca/en/blog/`
  - `https://www.sent-tech.ca/blog/ai-dev-autonomy/`
  - `https://www.sent-tech.ca/en/blog/ai-dev-autonomy/`
  - `https://www.sent-tech.ca/?lang=en` (attendu : redirect côté client vers `/en/...` si applicable)

## 2) Bing Webmaster Tools

- Propriété: `https://www.sent-tech.ca`
- Aller dans **Sitemaps** et soumettre:
  - `https://www.sent-tech.ca/sitemap.xml`
- Vérifier **Index Explorer / Diagnostics**
- Demander un nouveau crawl si nécessaire.

## 3) Contrôles périodiques (hebdo)

- Rejouer les 4 vérifications rapides après publication:
  - `curl -I https://www.sent-tech.ca/`
  - `curl -I https://www.sent-tech.ca/blog/`
  - `curl -I https://www.sent-tech.ca/en/blog/`
  - `curl -I https://www.sent-tech.ca/blog/ai-dev-autonomy/`
  - `curl -I https://www.sent-tech.ca/en/blog/ai-dev-autonomy/`
  - `curl -I https://sent-tech.ca/blog/ai-dev-autonomy/?utm=1`
- Vérifier les nouvelles anomalies dans **Coverage** (GSC) / **Diagnostics** (Bing)

## 4) Execution en une commande locale

- `npm run seo:verify`

Le script `scripts/seo-verify.mjs` vérifie:
- `200` pour les routes canoniques
- `301` pour les redirections non-canoniques (avec conservation du path + query)
- cohérence du `sitemap.xml` (200 + `hreflang` FR/EN + `x-default`)

Conserver la sortie du rapport et la comparer a chaque livraison.

## 5) Contrôle technique recommandé pour les 404 canoniques

1. Extraire la liste actuelle du sitemap.
2. Vérifier que les URLs canoniques répondent en 200.
3. Vérifier qu’aucune URL sitemap ne contient de version sans slash final.
4. Vérifier qu’une variante non-canonique basique renvoie bien en 301:
   - `/blog` -> `/blog/`
   - `/en/blog` -> `/en/blog/`
   - `https://sent-tech.ca/...` -> `https://www.sent-tech.ca/...`

Commandes utiles:

```bash
python - <<'PY'
import re
from urllib.request import urlopen

xml = urlopen('https://www.sent-tech.ca/sitemap.xml').read().decode('utf-8')
paths = re.findall(r'<loc>(.*?)</loc>', xml)
print('\n'.join(paths))
print(f"Total: {len(paths)}")
PY

for url in $(python - <<'PY'
import re,sys
from urllib.request import urlopen
xml=urlopen('https://www.sent-tech.ca/sitemap.xml').read().decode('utf-8')
for v in re.findall(r'<loc>(.*?)</loc>', xml):
    print(v)
PY
); do echo "==> $url"; curl -I -s "$url" | head -n 4; done
```

## 6) Contrôles automatisés dans le CI

- `npm run seo:verify` tourne automatiquement dans GitHub Actions:
  - après déploiement `main` (post-deploiement)
  - chaque semaine (cron)
- Le contrôle post-deploiement ajoute une attente de propagation avant exécution.
- Le contrôle hebdo génère un rapport et tente d’envoyer un email vers `admin@sent-tech.ca`.

### Réglage du mail hebdo

Ajouter les secrets GitHub suivants pour activer l’envoi:
- `SEO_SMTP_HOST`
- `SEO_SMTP_PORT`
- `SEO_SMTP_USER`
- `SEO_SMTP_PASS`
- `SEO_SMTP_FROM`

Si une des valeurs manque, l’envoi est skipé proprement et le rapport reste disponible dans les artifacts du workflow.

## 7) Contrôle indexation (GSC / Bing) automatisable hebdomadaire

- Exécuter: `npm run seo:indexing`
- Sorties:
  - `.artifacts/seo-indexing-audit.txt`
  - `.artifacts/seo-indexing-audit.json`
- Le check charge `sitemap.xml` depuis le site public, puis lance un audit GSC via service account si configuré.

Secrets GitHub requis pour GSC:
- `GSC_SERVICE_ACCOUNT_KEY` ou `GSC_SERVICE_ACCOUNT_JSON`
- `GSC_SITE_URL` (optionnel, par défaut `https://www.sent-tech.ca/`)

Secrets optionnels pour Bing (si un endpoint Bing propre est disponible):
- `BING_REPORT_URL`
- `BING_REPORT_API_KEY`
- `BING_REPORT_HEADER_NAME`
- `BING_REPORT_HEADER_VALUE`

Si Bing n’est pas configuré, le rapport indique `Bing: skipped` et le job continue.
