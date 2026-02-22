---
id: coding-assistant-alternatives
icon: Scale
order: 3
date: 2026-02-21
readTime: 14 min de lecture
---

# Tests d'alternatives à Cursor: benchmark terrain

Ce benchmark n'est pas académique: il est fait en parallèle d'un vrai delivery, avec la contrainte principale de ne pas casser la vélocité (cf. article 1).

## Avertissement méthodologique

Je m'excuse d'avance pour le manque de persévérance sur certains outils: je les ai parfois quittés vite parce que je devais continuer à livrer en parallèle. Le critère numéro un reste la vélocité utile en contexte réel.

## Critères de comparaison

J'ai évalué les outils avec 6 critères opérationnels:
1. accès aux meilleurs modèles (à jour)
2. SSO vers les fournisseurs (Gemini, ChatGPT Pro, Anthropic, etc.)
3. gestion des outils CLI (whitelist/blacklist, ex: autoriser `git commit`, interdire `git push`)
4. subagentique
5. checkpoints (retour arrière)
6. interaction code en mode greybox (liens vers fichiers modifiés, audit rapide), plutôt que blackbox

## Outils testés

- Roo Code (plugin VS Code)
- Codex (plugin VS Code)
- Opencode
- Antigravity
- Blackbox
- Cursor (référence)

## Tableau comparatif global

| Outil | Modèles à jour | SSO fournisseurs | CLI whitelist/blacklist | Subagentique | Checkpoint | Interaction code (greybox) | Coût / feedback |
|---|---|---|---|---|---|---|---|
| Cursor | Oui | Partiel | Oui | Oui (ergonomique) | Oui | Oui | Gros moins: gourmandise prix |
| Roo Code | Oui | Oui (plus) | Oui (mais config complexe) | Partiel | Partiel | Moyen | Freine sur workflow plan |
| Codex VS Code | Oui (Codex 5.3) | Oui (ChatGPT Pro), pas Gemini Pro 3.1 dans mon setup | Oui (facile) | CLI uniquement (pas UI) | Oui (fichiers), pas rollback chat | Oui | Bon compromis actuel |
| Opencode | Oui | Oui (ouverture) | Oui | Partiel | Partiel | Limité en interactif code | Quitté rapidement |
| Antigravity | Oui | Oui (Google SSO) | Difficile | Partiel | Partiel | Moyen | Bloquant: shell ne rend pas la main |
| Blackbox | Moins à jour | Limité | Limité | Non significatif | Limité | Plutôt blackbox | Quitté immédiatement |

## Plus et moins par outil

### Cursor

Plus:
- coche presque toutes les cases
- checkpoints ergonomiques
- validation des outils pratiques (mais compliqué à modifier après)
- subagentique ergonomique
- très bonne productivité globale

Moins:
- le bug principal, c'est le prix (gourmandise à l'échelle): [cf. coûts dans un article précédents](/blog/recent-progress-in-model-capabilities)
- veut co-autorer tes commits (bien sûr il y des workaround)


### Roo Code (plugin VS Code)

Plus:
- bon point SSO - permet d'utiliser tes abonnements
- checkpoints ergonomiques

Moins:
- sentiment de rigidité en mode plan (pas très "streerable" / réorientable)
- s'intègre mal avec des directives sur le workflow (veut suivre son plan et par remplir mes avancements) dans `BRANCH_template.md` (todo/avancement)
- outils un peu long à configurer (met du temps à être autonome)

### Antigravity

Plus:
- SSO Google, ce qui a été ma vraie motivation
- quelques crédits Opus 4.6 (brûlés en une journée)

Moins:
- configuration outillage pas simple
- shell qui ne rend pas la main à l'agent quand pas d'erreur: complètement bloquant pour l'autonomie

### Opencode

C'est probablement une alternative que je vais continuer à suivre, si mon propre plugin ne prend

Plus:
- ouverture forte (SSO vers ChatGPT et autres modèles)
- tu peux mettre tes system prompts
- accès à plein de modeles alternatifs
- subagentique

Moins:
- limite sur l'accès interactif au code via CLI
- l'UI ne permet pas de co-éditer (limitant pour certain cas)

### Blackbox

Plus:
- je n'ai pas identifié de vrai plus dans mon contexte, peut être l'accès à des modèles alternatifs

Moins:
- expérience proche Cursor, mais avec moins d'accès modèles à jour (bloquant pour moi, avec la différence nette de performance)
- modèle de coûts à la cursor, c'est ce que je voulais éviter


### Codex (plugin VS Code)

Plus:
- SSO ChatGPT Pro (point fort pour moi)
- mode steering: tu peux parler pendant le compute sans interrompre, c'est hyper précieux
- configurabilité des outils plutôt simple, avec le mode background
- subagentique: très accessible en CLI. Il faut mettre un petit cadre pour le rendre possible via UI (possible avec des directives de type conductor + l'appel à cli en background)

Moins:
- pas d'accès Gemini Pro 3.1 ou Opus 4.6 dans mon setup actuel (gêne pour benchmark complet)
- checkpoint utile sur fichiers, mais pas de retour complet sur l'historique de chat (je trouve ça très gênant: on peut pas réediter un prompt pour revenir en arrière comme sur cursor, juste annuler des éditions fichiers, ce qui oblige à ajouter des explications qui mettent de la confusion)
- pas encore d'UI pour le subagentique (il faut avoir des directives pour autonomiser, pas évident)

## Conclusion

Les modèles à jour (Codex 5.3, Opus/Sonnet 4.6, Gemini 3.1) deviennent indispensables pour atteindre une autonomie de dev fiable et respecter les guides de workflow.

L'outil idéal doit offrir:
- accès aux meilleurs modèles ([cf. le gain de productivité x2 a minima](/blog/recent-progress-in-model-capabilities))
- checkpoints solides - indispensables ce sont les nouveaux précommits, il faut pouvoir revenir en arrière sans complexité (complémentaire à mettre de côté des branches complètes, coûteux)
- steering - on doit pouvoir amender le plan, on code tellement vite qu'il faut pouvoir saisir les opportunités, et éviter les murs
- interaction code en greybox
- gouvernance CLI (outils de build/ci) fine
- subagentique opérable sans friction (selon moi, maturité encore perfectible et à contrôler en termes de coûts pour représenter un vrai gain)
- SSO / BYOK - liberté de switcher de modèle et/ou de forfait

Le prix reste un facteur de rupture: une excellente ergonomie ne compense pas indéfiniment un modèle de coût non tenable.

Fabien Antoine

- [Qui je suis](/blog/who-i-am)
