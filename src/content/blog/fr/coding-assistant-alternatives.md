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
- subagentique ergonomique
- très bonne productivité globale

Moins:
- le bug principal, c'est le prix (gourmandise à l'échelle)

### Roo Code (plugin VS Code)

Plus:
- bon point SSO

Moins:
- sentiment de rigidité en mode plan (difficile à faire coller à mon workflow)
- intègre mal mes directives de workflow dans `BRANCH.md` (todo/avancement)
- outils plus complexes à configurer que prévu

### Antigravity

Plus:
- SSO Google utile
- quelques crédits Opus 4.6 (brûlés en une journée)

Moins:
- configuration outillage pas simple
- shell qui ne rend pas la main à l'agent: bloquant pour l'autonomie

### Opencode

Plus:
- ouverture forte (SSO vers ChatGPT et autres modèles)
- approche ouverte du code

Moins:
- limite sur l'accès interactif au code via CLI
- UI navigateur pas encore assez différenciante à ce stade
- j'ai quitté rapidement

### Blackbox

Plus:
- je n'ai pas identifié de vrai plus dans mon contexte

Moins:
- expérience proche Cursor, mais avec moins d'accès modèles à jour
- bruit marketing (dont spam LinkedIn dans mon cas)
- sortie immédiate

### Codex (plugin VS Code)

Plus:
- SSO ChatGPT Pro (point fort pour moi)
- mode steering: je peux parler pendant le compute sans interrompre
- configurabilité des outils simple
- bon niveau de contrôle en mode CLI, surtout pour le subagentique

Moins:
- pas d'accès Gemini Pro 3.1 dans mon setup actuel (gêne pour benchmark complet)
- checkpoint utile sur fichiers, mais pas de retour complet sur l'historique de chat
- pas encore de subagentique dans l'UI (il faut passer par la CLI)

## Conclusion

Les modèles à jour (Codex 5.3, Opus/Sonnet 4.6, Gemini 3.1) deviennent indispensables pour atteindre une autonomie de dev fiable et respecter les guides de workflow.

L'outil idéal doit offrir:
- accès aux meilleurs modèles
- checkpoints solides
- interaction code en greybox
- gouvernance CLI fine
- subagentique opérable sans friction

Le prix reste un facteur de rupture: une excellente ergonomie ne compense pas indéfiniment un modèle de coût non tenable.

## À propos de l'auteur

- Fabien Antoine
- [Qui je suis](/blog/who-i-am)
