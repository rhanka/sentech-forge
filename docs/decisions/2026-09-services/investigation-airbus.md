# Investigation des sources Airbus — 22 septembre 2026

La recherche demandée a couvert le Drive connecté et les onglets du compte Airbus. Le choix **B — équilibre conseil d’architecture / réalisation de produits** reste confirmé.

## Visuels retrouvés et récupérés

| Élément | Source exacte | Résultat vérifié | Usage proposé |
| --- | --- | --- | --- |
| Beluga Sunset | [NA Sunset Beluga Roadmap V1.0, diapo 10](https://docs.google.com/presentation/d/1BRjp-u-bLPY0kNWh6vZhXw4nRBJKzUi6TlCK3N_vy1o/edit#slide=id.g3bfb50429bc_0_375) | Image 1600 × 900 récupérée et inspectée : « Beluga Sunset view per year ». | Trajectoire d’évolution du SI et dépendances. La diapo contient des projections : ne pas les présenter comme des gains réalisés. |
| Scale Up — roadmap | [Q4 25 to Q1 26 - FA, diapo 2](https://docs.google.com/presentation/d/182x6gv58aWKfm1cwgS_r_C5NJle63yDz-dCPMazIYjM/edit#slide=id.g391efe09339_0_41) | Image de roadmap extraite à sa résolution native, 1086 × 511, et inspectée. Objet image `g391efe09339_0_1605`. | Visuel principal pour maturation du portefeuille, initiatives et jalons. |
| Scale Up — contexte | [One Referential Project — Scale-Up Systemic Program, diapo 6](https://docs.google.com/presentation/d/1RNlTILRKjOGFouW-hYJPgPyPK9tnuoeaVHvZ2vw0R7o/edit#slide=id.g3a36b358744_0_18037) | Image 1600 × 900 récupérée et inspectée. | Visuel secondaire expliquant le programme collectif ; ne pas l’attribuer intégralement au consultant. |

[Galerie locale des trois visuels](../../../.artifacts/airbus-portfolio-review/index.html). Les originaux restent dans `.artifacts/airbus-portfolio-review/`, dossier déjà ignoré par Git et hors site publié. Ils n’ont pas été placés dans `public/` ou `src/content/`.

Le deck **A220 Scale Up Bridge the gap Workshop Debrief** a également été retrouvé, mais ses deux diapositives sont surtout textuelles. La roadmap extraite du bilan FA constitue une preuve visuelle plus adaptée.

## Quadrants : méthode étayée, capture non retrouvée

- [FACT] Le [CV de juillet 2026](https://docs.google.com/document/d/1kCuQeGdwsJgNHyn4OjlICoel9DML1lbLLnNvQL19siE/edit) mentionne une méthode sectorielle de priorisation « 2x2 » et des quadrants assistés par IA pour Digital, Finance, Legal et Helicopter. Il s’agit d’une déclaration du propriétaire dans son CV, pas d’une validation indépendante de résultats.
- [FACT] Le [tableau Digital_NA_Use_Cases_Evaluation_FILLED](https://docs.google.com/spreadsheets/d/12wqk4h7z3OXbei99b6wKQ9HGrTSd_Q5RmdKwJQIBnkE/edit) comporte `Value (PoC)`, `Complexity (PoC)`, `Value (ToBe)`, `Complexity (ToBe)` et une priorité globale. Les scores et justifications ne sont pas reproduits dans le dossier public proposé.
- [JUDGMENT] Valeur / complexité, avec distinction expérimentation / cible, est donc une piste étayée pour expliquer la méthode. Cela ne suffit pas à affirmer que c’est la capture de quadrants exacte demandée.
- [FACT] Le portefeuille [North America AI Portfolio — Corporate & Analytics](https://docs.google.com.rproxy.goskope.com/spreadsheets/d/13QIvLUGZAaP2gtkvAutl4pn07Yu7m29KFpqQGkjRxP8/edit?gid=1145754361#gid=1145754361) a été localisé et ouvert dans le compte Airbus. Son titre et ses onglets sont vérifiés ; aucune capture de quadrants n’a été identifiée.

Prochaine piste bornée : retrouver la vue 2×2 liée à la méthode d’évaluation Digital / Finance / Legal / Helicopter, en partant du portefeuille et du tableau de scores ci-dessus. Ne pas remplacer la capture manquante par un graphique inventé présenté comme original.

## Everyday AI : contexte désormais documenté

[FACT] Le document Airbus [NA AI Framework](https://docs.google.com.rproxy.goskope.com/presentation/d/1M0JqnMnFYb8QlEBhOKy0ZKCaO4ZlZ5X8XLCVFH-28PQ/edit#slide=id.g3f335374144_0_4), consulté dans l’onglet existant, comporte une vue « Hub-and-Spoke Topology » qui distingue :

- une couche transverse **Everyday AI**, avec une interface commune et des applications de domaine gouvernées ;
- des **Agent Factories** par domaine ;
- une fondation **DataHub** pour les données d’entreprise.

[JUDGMENT] Le blog peut reprendre cette distinction comme question générale d’architecture : usages transverses, réalisation d’agents métier, données et services partagés. La description publique doit rester générique, sans reprendre l’organisation, les calendriers ou les détails internes Airbus. Le fait d’avoir trouvé cet usage du terme ne vaut pas confirmation définitive du sens que le propriétaire souhaite donner au blog.

La copie personnelle [NA AI Framework Scoping](https://docs.google.com/presentation/d/1x8e3mRbGowl9Zv6oj3xIqtXoyqK5UR2tQxd8rtR_bgE/edit) contient notamment des vues de gouvernance, de couches d’architecture et de delivery ; elle diffère du document Airbus ouvert et n’a pas été considérée comme sa version actuelle.

## Conséquences pour les fiches

- **Airbus — Roadmaps EA** : les deux visuels principaux sont récupérés. Les légendes peuvent distinguer trajectoire du SI et maturation de portefeuille, plutôt que réunir tous les travaux sous un intitulé générique.
- **Airbus — Coaching IA et architecture** : le CV étaye cadrage produit, compétences, processus de delivery et méthode 2×2. Document-to-diagram est également cité. La capture exacte des quadrants et le détail de SARI restent ouverts.
- **Blog** : intégrer le niveau d’architecture transverse d’Everyday AI, en complément des patterns assistant / workflow / agent / analytics.

## Limites de l’investigation

Playwright MCP et une connexion Playwright directe ont expiré à l’initialisation globale du navigateur. La lecture des onglets via le protocole de débogage Chrome a fonctionné, sans récupération de cookies ni de jetons. Les recherches Drive Airbus ne se rafraîchissaient pas correctement ; les documents déjà chargés et le portefeuille ouvert étaient consultables. Le Drive personnel connecté a fourni les diapositives exportables.

Les originaux incluent des informations internes, et certains portent la mention « Airbus Amber ». La galerie est une revue locale ; leur disponibilité dans le compte n’établit pas leur aptitude à être publiés tels quels. Aucun document source, partage ou contenu du site publié n’a été modifié.
