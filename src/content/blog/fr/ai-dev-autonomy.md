---
id: ai-dev-autonomy
icon: Workflow
order: 4
date: 2026-02-21
readTime: 11 min de lecture
---

# Autonomie IA dans le cycle de dev: ce qui marche vraiment

L'autonomie IA ne tient pas sur un prompt magique: elle tient sur des guides stricts, un environnement maîtrisé, et un workflow multi-branches discipliné.

## 1) Les guides sont le socle

Sur `top-ai-ideas-fullstack`, le gain vient d'abord des guides (`.cursor/rules/*.mdc`) et de leur articulation avec le plan de branche. Sans ce cadre, l'agent code vite mais diverge vite.

En pratique, les guides servent à:
- cadrer ce que l'agent peut faire
- rappeler les gates de qualité attendus
- imposer un ordre d'exécution **spec -> plan -> build -> qa**

## 2) L'environnement est aussi important que le modèle

L'autonomie repose sur un environnement reproductible:
- commandes explicites
- variables d'environnement bornées
- conteneurs stables
- jeu de données adapté au type de test

Mon choix: `make` comme couche agnostique (et `npx` côté TypeScript quand nécessaire). L'objectif est de ne pas coupler le workflow à un seul langage.

Exemples de familles de commandes:
- tests unitaires
- tests intégration
- tests e2e
- qualité (lint/typecheck)
- UAT partiel/final

## 3) Multibranche + worktree pour exécuter en parallèle

Le mode "conductor" demande plusieurs branches actives en même temps. `git worktree` est clé pour ouvrir plusieurs environnements parallèles sur une même base:
- un environnement pour les e2e sur données de test
- un environnement pour des UAT sur données simili-prod
- un environnement pour des correctifs urgents

C'est ce découplage qui permet de garder de la vitesse sans mélanger les objectifs de validation.

## 4) Les tests IA restent flaky: compromis réel vs mock

Le point le plus coûteux aujourd'hui reste la stabilité des tests IA. Je n'ai pas encore le compromis parfait entre mocks et appels réels.

Compromis actuel:
- périmètre limité en appels réels (modèle **4.1nano**) pour réduire coût et délai
- reste du périmètre en mock/synthétique pour garder une CI stable

C'est imparfait, mais c'est ce qui permet de continuer à livrer sans exploser le budget ni les temps de pipeline.

## 5) Workflow opérationnel: autocommit, CI, UAT cadencée

Le workflow qui tient la charge:
- autocommit structuré (trace claire)
- supervision CI continue
- articulation UAT manuelle + automatisation régulière
- pilotage par master plan + sous-branches spécialisées

En mode conductor/subagentique, cette discipline est obligatoire: sinon les agents avancent vite, mais pas dans la même direction.

## 6) Limite actuelle: convergence de branches à grande vitesse

La difficulté n'est pas de générer du code, c'est de fusionner proprement à haute cadence. Plus la vélocité monte, plus l'orthogonalisation devient dure:
- collisions de contrats API
- collisions de schémas
- collisions d'hypothèses sur les données

Le coût de convergence peut rapidement annuler le gain de génération si le découpage initial n'est pas bon.

## Conclusion: inversion progressive de la logique de test

Pendant longtemps, j'étais en "partial UAT" dominant: je gardais beaucoup d'évolutions de test pour la fin pour ne pas perturber les données et limiter l'attente.

Je suis en train d'inverser cette logique: laisser plus d'autonomie complète aux agents jusqu'aux e2e et remonter plus tôt les validations finales. Je n'ai pas encore de conviction définitive sur "quel modèle pour quel niveau d'autonomie"; ce sera l'objet du prochain article.

## Références

- https://github.com/rhanka/top-ai-ideas-fullstack
- https://github.com/rhanka/top-ai-ideas-fullstack/tree/main/.cursor/rules
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/PLAN.md
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/BRANCH_TEMPLATE.md
- https://github.com/rhanka/top-ai-ideas-fullstack/blob/main/Makefile
- [Qui je suis](/blog/who-i-am)

Fabien Antoine
