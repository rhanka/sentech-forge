---
id: ai-dev-autonomy
icon: Workflow
order: 4
date: 2026-02-21
readTime: 11 min de lecture
---

# Autonomie IA dans le cycle de dev

L'autonomie IA ne tient pas sur un prompt magique: elle tient sur des guides stricts ([cf comparaison BMAD, Google Spec Kit etc](/blog/ai-assisted-software-engineering)), un environnement maîtrisé, et un workflow mono ou multi-branches discipliné.

Cela est d'autant plus important que la [puissance des modèles explose](/blog/recent-progress-in-model-capabilities). Si leur puissance est évident pour des petites applications (ce blog initialment développé en react avec Lovable est passé en Svelte en un prompt simple), tenir la route pour des plus gros développements nécessite une organisation pour tirer partie de leur opportunité, en encadrant les risques.

## 1) Les guides sont le socle

Sur `top-ai-ideas-fullstack`, le gain vient d'abord des guides (`.cursor/rules/*.mdc`) et de leur articulation avec le plan de branche. Sans ce cadre, l'agent code vite mais diverge vite.

En pratique, les guides servent à:
- cadrer ce que l'agent peut faire
- rappeler les gates de qualité attendus
- imposer un ordre d'exécution **spec -> plan -> build -> qa**
- organiser la planification et le suivi du progrès (checklits)

## 2) L'environnement est aussi important que le modèle

L'autonomie repose sur un environnement reproductible:

- environnements définis (branches/tests)
- commandes explicites
- variables d'environnement bornées
- conteneurs stables
- jeu de données adapté au type de test

Mon choix: `make` comme couche agnostique (`npx` est trop orienté Typescript, et d'ailleurs pas bien cablé pour Svelte). L'objectif est de ne pas coupler le workflow à un seul langage.

Exemples de familles de commandes pour test et qualité:

- tests unitaires
- tests intégration
- tests e2e
- qualité (lint/typecheck)

Mais aussi pour le développement et debug:

- clean/backup/restore/queries db (parfois le bug est en base lié à des status)
- logs (comme il y a beaucoup d'environnements et des composants)

Ou encore le ci (gestion des images Docker, tests de securité, et métriques de code).

Dans la pratique, les sessions promptés avec le cadre déjà évoqué et ces outils peuvent être autonome du cadrage jusqu'à la supervision du CI, il reste surtout important d'être là sur la SPEC et les UAT (je trouve encore une faiblesse dans le fait d'avoir une véritable UX propre voir juste utilisable).

## 3) Sépartation des environnement de tests

Les bonnes pratiques de tests favorisent la séparation des environnement de tests pour leur permettre à chacun un usage fréquent. L'usage de docker (ou k8s) favorisent cette multiplication sans douleur, y compris en fonctionnement parallèle sur le PC local :

- un environnement pour les e2e sur données de test
- un environnement pour des UAT sur données simili-prod
- un environnement pour des correctifs urgents

Ce découplage qui permet de garder de la vitesse sans mélanger les objectifs de validation, tout en parallélisant les tâches.

Séparer les environnements permet de conserver ses données de tests plus réalises pour les UAT sans avoir à recharger à chaque fois. Ca a été le plus gros vecteur d'améliration, car les UAT in fine sont devenus très fréquents (50% du job, avec bien 20-30% de debug).

## 3) Multibranche + worktree pour exécuter en parallèle

La multiplication des environnements, et le passage au subagentique impose un challenge d'organisation et de context switching.

Pour tester plusieurs branches (nécessaire même en conductor de temps en temps pour débloquer des situations), j'ai du imposer une centralisation des UAT, afin de garder une stabilité.

Initialment je switchais d'environnements (port sur chrome) pour chaque branche, mais ça m'obligeait à nourrir chaque base (pas le plus compliqué), et à avoir un nombre d'onglets de tests incroyables (mutli utilisateurs + validation maildev + un ou deux écrans sur l'application, sans compter le dév de plugin Chrome).

Aujourd'hui, je conserve donc en worktree les branches en cours de dev (dans tmp/feat-slug-branch-name), et je demande (pour débug, pour démo, ou pour UAT) soit au conductor, soit à la branche de se repositionner sur le root pour avoir un environnemnt UAT stable. Le seul problème est lorsque deux branches parallèle imposent un changement de modèle de données, il suffit alors d'assurer un temps de merge de l'évol associée avant de resplitter.

## 4) Les tests IA restent flaky: compromis réel vs mock

L'un des points les plus coûteux (temps passé) aujourd'hui reste la stabilité des tests IA (puisque mon application est bien sûr "agentique"). Je n'ai pas encore le compromis parfait entre mocks et appels réels.

Compromis actuel:

- périmètre limité en appels réels (modèle **4.1nano**) pour réduire coût et délai
- reste du périmètre en mock/synthétique pour garder une CI stable

C'est imparfait, mais c'est ce qui permet de continuer à livrer sans exploser le budget ni les temps de pipeline.

## 5) Workflow opérationnel: autocommit, CI, UAT cadencée

Le workflow qui tient la charge:

- autocommit structuré (trace claire)
- supervision CI continue
- articulation des UAT + automatisation régulière
- pilotage par master plan + sous-branches spécialisées

En mode conductor/subagentique, cette discipline est obligatoire: sinon les agents avancent vite, mais pas dans la même direction.

## 6) Limite actuelle: convergence de branches à grande vitesse

La difficulté n'est pas de générer du code, c'est de fusionner proprement à haute cadence. Plus la vélocité monte, plus l'orthogonalisation devient dure:

- collisions de contrats API
- collisions de schémas
- collisions d'hypothèses sur les données
- collisions in fine des fichiers de code

Le coût de convergence peut rapidement annuler le gain de génération si le découpage initial n'est pas bon.

## Conclusion: inversion progressive de la logique de test

Pendant longtemps, j'étais en "partial UAT" dominant: je gardais beaucoup d'évolutions de test pour la fin pour ne pas perturber les données et limiter l'attente.

Je suis en train d'inverser cette logique: laisser plus d'autonomie complète aux agents jusqu'aux e2e et remonter plus tôt les validations finales.

Je n'ai pas encore de conviction définitive sur "quel modèle pour quel niveau d'autonomie"; mais comme c'est la tendance d'autonomiser, je vais évaluer la productivité associée. Ce sera l'objet du prochain article.

Fabien Antoine

## Références

- https://github.com/rhanka/top-ai-ideas-fullstack
- https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/PLAN.md
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/BRANCH_TEMPLATE.md
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/Makefile
- [Qui je suis](/blog/who-i-am)
