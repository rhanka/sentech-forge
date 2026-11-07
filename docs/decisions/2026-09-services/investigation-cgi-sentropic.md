# CGI — CSP, Sentropic idéation et framework agentique

22 septembre 2026 · Sources consultées en lecture seule · Complément au dossier de décision.

## CGI — CSP : quadrant retrouvé et capturé

[FACT] Le propriétaire a confirmé « CGI ». Le Drive contient **CSP_feuillederouteIA_Cadran_Revision_20240715.pptx**, présentation du 15 juillet 2024, dont la page de titre cite Nadia Dibs et Fabien Antoine. [Ouvrir la diapo 8](https://docs.google.com/presentation/d/1KMVxd-jbU5fZYGGxcwKsghnS-rAUr3Xg/edit#slide=id.p8).

- Diapo 3 : processus d’évaluation valeur / complexité, critères, fiches et validation itérative des scores.
- Diapos 5–7 : cadrans thématiques, soutien client, solutions sur étagère et solutions métier.
- **Diapo 8 : « Top 10 des cas d’usage potentiels du CSP à 3 ans (suite révision juin) ».** Capture récupérée depuis la présentation ouverte dans Chrome et inspectée. Axe vertical : valeur ; axe horizontal : facilité d’implémentation. Le haut droit correspond donc à forte valeur / faible complexité.
- La diapo précise elle-même qu’il s’agit d’une présélection de haut niveau, à approfondir avant priorisation effective et lancement. Les gains et coûts proposés dans le deck ne sont pas des résultats réalisés.

[Voir la capture locale](../../../.artifacts/cgi-portfolio-review/csp-quadrant-slide-8.png). Original conservé dans `.artifacts/`, ignoré par Git. La diapo porte « Confidentiel » : cette copie sert à la revue du portfolio ; prévoir un extrait adapté à la publication. Aucun changement du document ou de ses droits de partage.

[JUDGMENT] Fiche proposée : **« CGI — CSP : de l’idéation à la feuille de route IA »**. Elle illustre les offres EA et solutions IA. Décrire la contribution personnelle dans une démarche collective. Ce cas est distinct des quadrants Airbus encore recherchés.

## Cadran redessiné à partir de la référence Sentropic

[FACT] Le propriétaire a fourni une capture Sentropic et demandé de s’en inspirer pour embellir le cadran CSP. Une [version SVG modifiable](../../../.artifacts/cgi-portfolio-review/csp-quadrant-redessine.svg) et une [version PNG](../../../.artifacts/cgi-portfolio-review/csp-quadrant-redessine.png) sont préparées. La [galerie comparative](../../../.artifacts/cgi-portfolio-review/index.html) réunit le résultat, la source et la référence de style.

- 30 cas d’usage, répartis dans les 6 domaines de la source ; les 10 présélectionnés sont entourés de vert.
- Positions relatives relevées sur la capture, donc approximatives. Aucun score ni seuil chiffré inventé. Les coordonnées de dessin ne sont pas des scores métier.
- Axe horizontal conservé : **facilité d’implémentation**, alors que la référence Sentropic représente la complexité. Les cas les plus faciles restent à droite.
- Typographie, grille discrète, palette, points et étiquettes arrondies inspirés de la référence. Aucun chevauchement entre les 30 étiquettes lors de la vérification géométrique ; PNG inspecté visuellement.
- La zone verte reprend la présélection du document. Les verdicts « Gains rapides », « Attendre » ou « Ne pas faire » ne sont pas ajoutés : ils ne figurent pas dans la source CGI.
- Les flèches de trajectoire de la diapo originale ne sont pas reprises dans cette vue centrée sur la présélection ; cette simplification est signalée sur le visuel.

La refonte graphique reste une version de revue de la source confidentielle. Le changement de style ne constitue pas une anonymisation du contenu.

## Sentropic : produit d’idéation

[FACT] L’adresse fournie `sentopic.sent-tech.ca` ne se résout pas lors de la vérification. L’adresse du README, [sentropic.sent-tech.ca](https://sentropic.sent-tech.ca), répond en HTTP 200 et affiche dans le navigateur une connexion par passkey ou biométrie. Aucune inscription, récupération de compte ou modification de données n’a été engagée.

[FACT] Le README du dépôt décrit l’identification, la génération, l’évaluation et la priorisation de cas d’usage IA. Le catalogue `packages/flow/src/seeds/workflows.ts` contient un workflow de génération des cas d’usage : contexte d’organisation, matrice, liste, fiches détaillées et synthèse. Les définitions de workflow sont une preuve de conception et d’implémentation locale, pas une démonstration de chaque comportement en production.

[JUDGMENT] Présenter l’application par le besoin métier : explorer et structurer les usages IA pour préparer des décisions d’investissement. Le propriétaire a ensuite fourni une [capture de matrice Sentropic](assets/sentropic-matrice-fournie.png), utilisable comme visuel de produit avec cette provenance explicite. Elle montre des cas d’usage ESG selon valeur et complexité. Le parcours complet reste à vérifier dans une session authentifiée ; les scores visibles ne sont pas des résultats métier revérifiés. Ne pas utiliser l’écran de connexion comme preuve d’idéation.

## LLM mesh et framework agentique

| Brique | Responsabilité étayée par le dépôt | Limite de présentation |
| --- | --- | --- |
| LLM mesh | Éligibilité des modèles/comptes, capacités, routage, affinité, santé et streaming multi-fournisseurs ; plan opaque consommé par la gateway. | Ne pas lui attribuer l’authentification des appelants ni la comptabilité de consommation de la gateway. |
| chat-core | Orchestration conversationnelle ; interfaces de sessions, messages, checkpoints, flux, outils et événements ; runtime et gestion du contexte. | La présence des composants ne mesure ni leur disponibilité en production ni leur robustesse opérationnelle. |
| flow | Workflows, tâches, transitions, états d’exécution, queue, templates d’agents et interfaces de gates ; runtime et catalogue de génération. | README : extraction WIP, package non encore publié. Ne pas promettre une distribution publique stable. |
| LLM gateway | Frontière d’accès aux modèles pour les consommateurs, avec responsabilités d’authentification et de mesure distinctes du mesh. | Ce n’est pas une étape obligatoire pour chaque appel interne du framework. |
| Cluster mesh | Contexte de serveur et postes rattachés. | Runtime documenté single-node ; fédération future désactivée. |

[Diagramme produit / framework](assets/sentropic-product-framework.svg), complémentaire au [diagramme des fondations](assets/sentropic.svg).

[JUDGMENT] Deux fiches Sentropic liées suffisent : une fiche produit et une fiche composants. Dans cette dernière, le LLM mesh et le framework agentique ont chacun une place explicite. Ne pas multiplier artificiellement les références client à partir des packages du même produit.

## Sources locales

- `../sentropic/README.md`
- `../sentropic/packages/llm-mesh/README.md`
- `../sentropic/packages/llm-gateway/README.md`
- `../sentropic/packages/cluster-mesh/README.md`
- `../sentropic/packages/chat-core/package.json` et `src/index.ts`
- `../sentropic/packages/flow/README.md`, `src/index.ts` et `src/seeds/workflows.ts`

Les dépôts voisins et les documents Drive n’ont pas été modifiés. Aucun résultat métier nouveau n’est revendiqué.
