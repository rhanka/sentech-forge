# Redirection canonique vers www (Cloudflare)

Objectif: forcer `sent-tech.ca/*` vers `https://www.sent-tech.ca/*` en **301** en
préservant le chemin et la query string.

Le comportement actuel observé (`302 https://www.sent-tech.ca`) est une redirection
générique qui droppe le path/query. La correction doit être faite dans Cloudflare.

## Pré-requis

- Avoir accès au dashboard Cloudflare du zone `sent-tech.ca`.
- Zone en mode proxy (`Proxied = ON`) pour le record A/CNAME utilisé par GitHub Pages.

## Solution recommandée (Cloudflare Redirect Rules)

1. Ouvrir **Rules → Redirect Rules**.
2. Créer une règle de type **HTTP Redirect**.
3. Définir la condition (Expression) :

```
http.host eq "sent-tech.ca"
```

4. Configurer l’action:
   - **Response code**: `301 (Moved Permanently)`
   - **Destination URL**: expression basée sur la requête courante

```
concat(
  "https://www.sent-tech.ca",
  http.request.uri.path,
  if(len(http.request.uri.query) > 0, "?", ""),
  http.request.uri.query
)
```

5. Enregistrer et déployer (placement en haut si plusieurs règles).

## Alternative legacy (Page Rules)

- Créer une Page Rule : `https://sent-tech.ca/*`
- Action: **Forwarding URL** -> **301 - Permanent Redirect**
- Destination:

```
https://www.sent-tech.ca/$1
```

Remarque: cette approche est moins souple que les Redirect Rules pour la query string.

## Vérification

Après publication, vérifier avec:

```bash
curl -I https://sent-tech.ca/blog/ai-dev-autonomy/?utm=1
```

Attendu:

- `HTTP/2 301`
- `location: https://www.sent-tech.ca/blog/ai-dev-autonomy/?utm=1`

Vérifier aussi les routes clés:

```bash
curl -I https://sent-tech.ca/
curl -I https://sent-tech.ca/blog/
curl -I https://sent-tech.ca/?lang=en
```
