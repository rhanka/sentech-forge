# Notes de préparation

22 septembre 2026. Documents de travail, hors site publié.

## Sources et portée

- Site : hero, présentation, services FR, composants Services / ServiceDetails / Blog, page Index, chargeur de contenu et fiches métier citées dans le dossier.
- Produit immobilier : capture existante `../radar-immobilier/docs/reports/assets/2026-09/signaux-zonage-couleurs.png`. Pas de lancement, modification ni accès à des données du produit.
- H2a : `../h2a/README.md` ; composants complémentaires dans `../sentropic/packages/harness/README.md` et `../sentropic/packages/focus/README.md`.
- Sentropic : `../sentropic/packages/cluster-mesh/README.md`, `../sentropic/packages/llm-mesh/README.md`, `../sentropic/packages/llm-gateway/README.md`.
- Engram : documentation locale de la mémoire graphe ; le dossier public proposé utilise uniquement le nom demandé.
- Recherche initiale Airbus dans les dépôts voisins, puis investigation autorisée du Drive connecté et du compte Airbus : captures Beluga Sunset et Scale Up récupérées, méthode 2×2 étayée mais capture exacte non retrouvée. Voir [l’investigation](investigation-airbus.md). Les originaux sont en `.artifacts/airbus-portfolio-review/`, ignorés par Git.
- Pas de mesure du trafic, de conversion ou de performance. Tentative de navigateur échouée à l’initialisation ; aucune conclusion visuelle sur la production.

## Ajouts CGI et Sentropic

- CGI confirmé par le propriétaire pour CSP. Présentation `CSP_feuillederouteIA_Cadran_Revision_20240715.pptx` retrouvée dans Drive ; diapo 8 capturée via Chrome et inspectée : valeur / facilité d’implémentation, présélection Top 10. Original confidentiel conservé dans `.artifacts/cgi-portfolio-review/`, ignoré par Git.
- Sentropic : URL vérifiée `https://sentropic.sent-tech.ca` ; écran de connexion observé, parcours métier non testé. Le domaine fourni sans « r » ne se résout pas.
- Sources complémentaires : README produit, chat-core (package et exports), flow (README, exports, catalogue des workflows). Le framework agentique est explicité séparément de H2a ; l’extraction de flow reste décrite WIP et non publiée.
- [Investigation complémentaire](investigation-cgi-sentropic.md). Le portfolio compte désormais douze fiches, dont deux vues liées du même produit Sentropic.
- `sentropic-product-framework.svg` : vue fonctionnelle du produit, de son orchestration et de l’accès aux modèles. Ce n’est pas une topologie de déploiement ; la gateway n’est pas une étape obligatoire des appels internes.

## Refonte visuelle du cadran CSP

Référence Sentropic fournie par le propriétaire conservée dans la galerie locale CGI et dans `assets/sentropic-matrice-fournie.png` comme capture produit de provenance déclarée ; elle ne remplace pas une vérification live du parcours. Livrables : SVG et PNG du cadran, liste des 30 points relevés et générateur reproductible dans `.artifacts/cgi-portfolio-review/`. Vérifications : 30 cas, 10 présélectionnés, répartition par domaine 6 / 12 / 4 / 3 / 2 / 3, absence de chevauchements entre étiquettes, contrôle visuel du PNG. Les positions sont qualitatives et approximatives ; l’axe source de facilité est conservé. Flèches de trajectoire retirées et omission signalée. Pas de verdict nouveau attribué aux zones non sélectionnées.

## Transformation de la capture Immo

Le fichier dérivé `assets/immo-expurge.png` conserve une vraie capture de l’application avec : marque remplacée par un titre générique, avatar supprimé, villes / régions des panneaux latéraux remplacées par des libellés neutres, carte floutée pour atténuer les libellés, bandeau signalant l’expurgation. Les compteurs restent des valeurs de la capture, pas des résultats revendiqués. L’image est réencodée sans recopier les métadonnées.

**Limite :** le tracé géographique peut permettre de reconnaître la zone. C’est une tentative d’expurgation pour revue éditoriale, pas une garantie d’anonymisation irréversible. Pour une publication exigeant l’anonymat territorial, produire une capture avec données de démonstration et géographie fictive.

## Diagrammes

- `h2a.svg` : vue fonctionnelle de la complémentarité H2a / Harness / dossiers et Focus. Les flèches expriment un parcours de travail ; elles ne prétendent pas documenter une API ou une intégration automatique entre tous les composants.
- `sentropic.svg` : gateway et mesh de modèles dans le parcours d’inférence ; cluster mesh comme contexte d’exécution distinct. Limite single-node et fédération future explicitement affichées. Ce n’est pas un diagramme réseau de production.

## Revues indépendantes

- **Codex**, sous-agent `positioning_review`, lecture seule du site : trois portes d’entrée, positionnement architecture capable de livrer, Superbuilder toujours accompagné d’une promesse explicite. Distinguer portefeuille EA et solution IA ; clarifier support / transfert ; fiabiliser métriques et rôles.
- **Opus**, CLI Claude avec modèle `opus`, sans outils ni MCP, sur brief factuel : préférence pour A enrichie, architecture en tête et build comme preuve. Principal risque de B : dilution et chevauchement. Réponse obtenue, pas de fallback demandé.
- Les deux avis convergent sur le portfolio autonome et les limites de preuve. Ils divergent sur la promesse dominante. Après présentation, le propriétaire a confirmé « Un équilibre conseil d’architecture et réalisation de produits » : l’orientation B est retenue. Cette réponse ne valide pas chaque contenu ni les engagements commerciaux proposés.
- Aucune affirmation de marché, de TJM ou de maturité fournie par un reviewer n’a été transformée en fait sans source. Aucun chiffre de performance nouveau n’est publié.

## Auto-audit du dossier

- [x] Huit sections ; faits, jugements et inconnues distincts.
- [x] Trois options, chacune avec trois vrais arguments favorables et un contre-argument substantiel.
- [x] Meilleur contre-argument à B, conditions de renversement et pré-mortem.
- [x] Intérêt du présentateur distinct de celui du propriétaire.
- [x] Deux avis indépendants obtenus ; désaccord conservé.
- [x] Les critères du propriétaire sont repris ; les écarts de préparation publique sont explicites, sans être déclarés accomplis.
- [x] La priorité commerciale est confirmée par une réponse explicite du propriétaire, citée dans le dossier. Aucune validation supplémentaire ni attestation signée n’est déduite de cette réponse.
- [x] Pas de Track initialisé, de publication, de modification des produits voisins ni de fausse attestation.

## Handoff pour les éléments encore manquants

| Responsable | Élément borné | Critère observable |
| --- | --- | --- |
| Préparation du portfolio | Visuels Airbus | Beluga et Scale Up récupérés : finaliser le cadrage public. Retrouver la capture exacte des quadrants à partir des sources identifiées. |
| Propriétaire | Fiches de réalisations | Rôle personnel, période et stade confirmé pour chaque cas ; chiffres sourcés ou supprimés. |
| Propriétaire | Everyday AI et SARI | Sens architectural d’Everyday AI désormais documenté ; confirmer le périmètre éditorial. Description de SARI encore manquante. |
| Réalisation du site, après arbitrage | Intégration | Trois offres, portfolio accessible, anciennes ancres conservées, parité FR/EN, parcours contact et SEO vérifiés. |
