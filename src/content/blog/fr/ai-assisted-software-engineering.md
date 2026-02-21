---
id: ai-assisted-software-engineering
icon: BrainCircuit
order: 1
date: 2026-02-18
readTime: 14 min
---

# Vibe coding vs software engineering assisté par l'IA

Le code généré par IA ne suffit pas à produire un logiciel fiable. Il faut comprendre la structure des composants, le cloud computing, les OS, les bases de données, les orchestrateurs, le backend, ses API et ses queues, et aussi le frontend, les stores, les styles... et, surtout, les besoins des utilisateurs. Maîtriser l'ensemble fait partie de l'ingénierie logicielle, le développement lui-même n'est in fine qu'une toute petite partie.

La vraie différence de performance vient du système de travail: spécification, planification, exécution par lots et QA continue.

## Un cycle simple qui a peu changé

Le **vibe coding** est utile pour accélérer un prototype. Mais en production, l'enjeu n'est pas "combien de code est généré", c'est "combien de changements sont intégrés sans casser le système".

Dans la pratique, le software engineering assisté par l'IA repose sur quatre boucles, qui in fine n'ont pas changé tant que ça.

1. `SPEC`: cadrer le besoin, les contraintes (y/c techniques), les non-objectifs.
2. `PLAN`: découper en lots vérifiables et orthogonaux.
3. `BUILD`: implémenter avec traces explicites et branches isolées.
4. `QA`: tester en continu (unit/integration/e2e + UAT), pas seulement à la fin.

## Vibe coding vs engineering assisté IA

| Axe | Vibe coding | Software engineering assisté IA |
|---|---|---|
| But principal | Aller vite sur une idée | Livrer de façon fiable et répétable |
| Point de départ | Prompt + intuition | Spec + plan + lots |
| Gestion du risque | Faible | Explicite (gates, UAT, convergence) |
| Place des tests | Souvent tardive | Continue et structurée |
| Effet équipe | Difficile à aligner | Orchestration et ownership clairs |
| Dette technique | Monte vite | Contenue par la gouvernance |

## Comparatif des approches: BMAD & Co

| Approche | Logique dominante | Artefacts centraux | Force | Risque principal |
|---|---|---|---|---|
| BMAD | Cycle structuré analyse/plan/build/qa | Plans explicites, étapes, checks | Très bon cadre pour industrialiser | Peut devenir lourd si appliqué sans priorisation |
| GitHub Spec Kit | Spec-first et workflow guidé par artefacts | Spec, plan, checklist, tasks | Excellente traçabilité produit-technique | Surcoût initial si l'équipe veut "coder tout de suite" |
| Getting Shit Done (GSD) | Delivery pragmatique avec discipline légère | Boucles courtes, objectifs concrets, feedback rapide | Très bon ratio vitesse/clarté | Peut dériver vers du "just do it" si QA faible |
| Conductor Model | Orchestration multi-agents/multi-branches | Plan de vagues, supervision, convergence | Scale bien les sujets orthogonaux | Coût de coordination si frontières mal découplées |

Lecture pratique:
- BMAD et Spec Kit renforcent surtout la qualité des décisions amont.
- GSD optimise la cadence d'exécution.
- Conductor optimise la parallélisation et la convergence.

Chacune des méthodes apporte ses éléments, mais elles sont globalement riches. Leur application dépendra de l'organisation des équipes et la finalité du code. Il me semble utile d'adapter, et de maîtriser plutôt qu'appliquer à l'aveugle, ces méthode ayant des tendances à être trop riches (même GSD). Le cadrage des contraintes n'est pas la finalité. Il ne faut pas non plus oublier l'autonomisation des assistants IA.

## Comparaison avec la méthode qu'on a employée sur `top-ai-ideas-fullstack`

Sur [`top-ai-ideas-fullstack`](https://github.com/rhanka/top-ai-ideas-fullstack), on a employé une méthode hybride très opérationnelle de type `spec/plan/build/qa`, documentée dans [`/.cursor/rules`](https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules):

| Étape | Implémentation employée |
|---|---|
| `SPEC` | `spec/*.md` + décisions explicites + trace vers `TODO.md` |
| `PLAN` | `PLAN.md` (graphe de dépendances, vagues, branches orthogonales) + `BRANCH.md` par axe |
| `BUILD` | Lots incrémentaux, workspaces `tmp/` isolés, orchestration conductor/subagents |
| `QA` | Gates par lot (typecheck/lint/tests scopes), convergence branche, convergence de vague, UAT de validation |

Le cadrage est globalement aligné avec les méthodes précédentes, mais avec des directives applicables directement pour le code (implémentation en `make` des tests, et encadrement directives concrètes d'autonomisation pour le build : queries en db, logs etc).

## Métriques de développement (mesurées)

### Instrumentation continue

Depuis le démarrage de ce side project (20h/semaine soirs et week-ends), j'ai branché la mesure en continu directement dans le workflow avec les mêmes cibles Make (`cloc`, `test-cloc`, `test-count`). L'objectif n'est pas de "faire de la métrique pour la métrique", mais de garder un signal de pilotage fiable: détecter rapidement un vrai ralentissement, vérifier qu'un sprint de refactor garde une production de valeur tangible, et voir immédiatement quand la dette de tests commence à diverger.

### Évolution hebdomadaire SLOC (commit-based)

![Evolution hebdomadaire du SLOC total top-ai-ideas-fullstack](/blog/charts/top-ai-ideas-sloc-weekly.svg)

Le graphique combine quatre lectures: les barres donnent le SLOC total hebdomadaire, la courbe orange lisse la tendance sur 4 semaines, la droite pointillée rouge couvre **2025-W40 -> 2025-W50**, et la droite pointillée verte couvre **2025-W51 -> 2026-W08**, avec une ligne verticale de rupture en **2025-W51** (passage progressif vers GPT-5.2 puis GPT-5.3 Codex en usage quasi exclusif, avec des validations ponctuelles sur Claude évaluées comme équivalentes sur certains cas; voir [Progrès récents des capacités des modèles](/blog/recent-progress-in-model-capabilities)).

### Lecture de tendance et état de progression

Si on prend le SLOC comme proxy de productivité, la pente passe d'environ **+2,460** SLOC/semaine avant **W51** à **+5,204** SLOC/semaine après **W51** (quasi **x2**). En moyenne brute semaine à semaine, on passe de **+2,751** à **+5,409** SLOC/semaine (**x1.97**).

Relativisons: plus de SLOC ne veut pas dire "meilleur logiciel" par nature. Mais mon ressenti opérationnel va dans le même sens que la courbe: davantage de fonctionnalités livrées par cycle, moins de régressions qui déstabilisent la branche principale, et beaucoup moins de frustration dans des boucles idiotes.

### Tests: volume, taux et ratios vs SLOC

On teste massivement parce que, en développement assisté par IA, les régressions montent très vite si on ne borde pas strictement la QA: sur la période, le ratio `test_sloc / cloc_total` passe de **9.7%** à **28.0%**, et le volume de cas suit la même accélération (de **4.9** à **10.1** cas pour **1k** SLOC).

Pour tenir la cadence, on a orthogonalisé les profils et les jeux de données pour réduire les collisions de concurrence sans exploser les temps d'exécution, et isolé les environnement en local pour favoriser l'exécution parallèle. L'isolation fait partie des bonnes pratiques de tests e2e de [Playwright](https://playwright.dev/docs/best-practices).

Dans le CI, on a organisé en découpage matriciel ([GitHub Actions matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)) pour réduire le temps de pipeline (et rester sous 10 minutes, là ou en linéaire on serait à 30).

### Synthèse chiffrée

Au total, on passe de **11,401** à **94,303** SLOC entre le **2025-10-05** et le **2026-02-20** (**+82,902**, **x8.27**). La trajectoire reste compatible avec un ordre de grandeur **~100 kSLOC** en **5 mois**, mais le point clé n'est pas la volumétrie brute: c'est la capacité à tenir la cadence sans sacrifier la stabilité de livraison.

### Tests de sécurité

D'ailleurs l'optimisation ne s'applique pas qu'aux tests fonctionnels, les tests de sécurité ont eux aussi été mis en place dès le début de façon parallèle, avec un cadre explicite dans [`.cursor/rules/security.mdc`](https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/.cursor/rules/security.mdc).

Les vulnérabilité du monde **node.js** sont très fréquentes et on a mis en place les tests sur les packets node et images docker, avec une gestion également du cycle des composants pour gérer la dette (que l'IA tend à laisser assez élevée, par conservatisme sur de vieilles librairies, effet du décalage lié à l'apprentissage).

## Répartition des rôles (cadence 1 personne)

Dans ce mode de production, la répartition réelle ressemble à **<5%** de développement pur, **40%** de SPEC, **50%** d'UAT (dont environ **30%** de retours/support dans la boucle), et **5%** de peer/review architectural. Le shift clé du paradigme IA est là: on passe moins de temps à écrire du code et beaucoup plus de temps à cadrer l'intention fonctionnelle, poser les contraintes, superviser la convergence et valider l'expérience utilisateur. L'IA aide déjà sur ces volets, mais la prochaine étape sera de mieux modulariser intentions et contraintes pour automatiser encore plus ce pilotage sans perdre le contrôle.

## Conclusion

Le **vibe coding** est excellent pour un rôle de PO: explorer rapidement, cadrer la valeur, et converger sur l'intention produit. Le rôle de delivery évolue ensuite vers celui d'**AI-assisted software engineer**, responsable de la cohérence entre architecture fonctionnelle, logicielle et cloud pour produire un logiciel durable, robuste et évolutif. Cette lecture est cohérente avec les références DORA les plus récentes (Google, 2025): l'IA agit comme amplificateur et la performance dépend d'abord du système socio-technique, pas seulement de l'outil ([DORA 2025 on Google Research](https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/), [DORA report hub](https://dora.dev/research/2025/dora-report/)).

Fabien Antoine

## Références

- [Top AI Ideas - Repository GitHub](https://github.com/rhanka/top-ai-ideas-fullstack)
- [Top AI Ideas - Rules MDC](https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules)
- [Top AI Ideas - Produit](https://top-ai-ideas.sent-tech.ca)
- [Qui je suis](/blog/who-i-am)
