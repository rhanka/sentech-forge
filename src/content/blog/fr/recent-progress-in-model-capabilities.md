---
id: recent-progress-in-model-capabilities
icon: Wrench
order: 2
date: 2026-02-20
readTime: 10 min de lecture
---

# Progrès récents des capacités des modèles

Dans l'article précédent, on rappelait que l'outil ne suffit pas: c'est la méthode (spec/plan/build/qa) qui tient la vélocité quand le codebase grossit (cf. [vibe coding vs software engineering assisté IA](/blog/ai-assisted-software-engineering)).

## Contexte: 100 kSLOC en mode production

Sur ~100 kSLOC développés, la majorité du volume a été produite avec assistance IA dans un workflow contraint (article précédent: distinction vibe coding vs software engineering assisté IA).

![Evolution hebdomadaire du SLOC total top-ai-ideas-fullstack](/blog/charts/top-ai-ideas-sloc-weekly.svg)

Le cap des 40 kSLOC a été un vrai point d'inflexion avec les derniers modèles raisonnants. C'est difficile de dire si ce sont les derniers modèles ou la complexité du code croissante qui a poussé la bascule vers le changement vers l'utilisation exclusive des derniers modèls raisonnants.

## Phase Composer: ~90% du code initial avec Composer

Pendant la phase initiale, environ 90% du code initial a été produit via Composer dans Cursor, et uniquemt un usage modéré des modèles avancés.

Lors de problème complexes, uniquement dans 10% des cas, j'utilisais de façon assez indifférente les modèles avancés pour "flusher le probleme" (là ou à l'été, sur d'autres développements, j'allais encore systématiquement manuellement déboguer - notamment sur les fameux irritants css). Soit GPT5.1, soit Opus4.5, Gemini 3.0 me permettaient de résoudre les 10% lorsque des boucles trop importantes arrivaient avec composer.

Note: Gemini 3.0 ne m'a pas vraiment convaincu dans mon contexte, avec une tendance plus marquée à créer des dégats collatéraux (traiter des sujets non demandés, s'écarter des règles `*.mdc`, toucher des zones non ciblées).

## Passage à un 100% modèle évolué

A 40kSLOC, j'avais pris le rythme des "effets poissont rouge" (oubli réguliers de certaines règles en fin de développement) et de sortir régulièrement des insultes lors des boucles stupides. Et si la résolution de problème était ok avec les problèmes pour 10% des cas n'étaient pas non plus assez "wow" pour justifier de passer davantage avec les modèles évolués.

Mais à ce stade, je commençais à avoir des période de débug longues, et des tests de plus en plus nombreux et long à converger à chaque évolution. Et là est sorti GPT 5.2. Avant même codex, sa capacité à résoudre les problèmes vraiment augmenté, réduisant de beaucoup l'inconfort, j'ai donc switché, et j'ai craqué pour l'abonnement à 200$ (j'étais au 40$).

Quand je regarde la courbe de productivité x2 à temps égal, et mon taux d'insulte en baisse (je ferai peut être une mesure puisque tous mes prompts sont bien au chaud), je pense que ce choix a été justifié.

## Le mur tokens/coûts: 750M -> 1.5B tokens/mois

3 mois complets de code, j'étais à un peu plus d 45kSLOC et fin décembre Cursor fêtait la fin d'année en me mentionnant ma consommation à 2.5B de token. J'avoue que j'ai eu un choc.

Pour le dév de mon appli (qui bien sûr utilise l'inférence LLM), je mesurais les tokens, et j'étais alors d'ailleurs en explosion de coûts sur les test d'usage et test automatisés j'étais à peu près à 150M.

Et bien sûr avec le doublement de productivité, j'ai aussi doublé ma consommation de token. Ca marchait bien, et puis après une présentation sur opencodex, j'ai voulu essayer le subagentique.

## Subagentique et le gouffre aux tokens

Fin janvier j'ai commencé à décorréler mes environnements de tests pour paralléliser les branches un peu mieux, touchant d'ailleurs largement à mes limites de 16GB sur mon vieux PC Linux. Ma cible make et mes directives me permettent maintenant d'avoir un master plan et des branches orchestrées.

Je goûte d'abord avec un peu de peine au plaisir de la parallélisation, en ouvrant pleins de ports pour tester les différents environnemnts. Je switche assez vite de méthode pour ne tester que sur le master pour éviter les enjeux de démultiplication des initialisation de données pour le QA.

Je prends mon rythme en une semaine et là j'initie le vrai subagentique. Un vrai bonheur. Mais en un peu plus d'un jour Cursor me demande 100$ (j'avais probablement déjà accéléré le rythme avant). Mes dév sont vraimnt accélérés, alors je le fais.

Et puis sort Opus 4.6. Je l'essaye et je le trouve vraiment bien. Mais là, 1h et... Curor me redemande 100$ (oui GPT 5.3 avait déjà entammé)... Non ma productivité n'a pas été multipliée par 10...

## Sortie de Cursor

Cursor ne permet pas d'utiliser des abonnementss(Anthropic, ChatGPT pro, Gemini), et utiliser ses propres clés pour les tokens c'est pire. Alors j'ai cherché différents mode. A ce stade je suis sur le plugin Codex, essentiemment par opportunité d'amortir mon abonnement OpenAI pro que j'utilise aussi en dehors du code - et parce que le reste n'est pas non plus parfait

## Abonnement vs tokens: comparaison a 1B tokens/mois

Pour objectiver un peu, je normalise sur un scenario simple: **1B tokens/mois au total**, avec une repartition **50% input / 50% output**, sans remise cache, sans batch, et sans surcout long contexte.

### Tableau unique normalise (abonnements + tarifs API tokens)

| Type | Offre / modele | Unite tarifaire | Input ($/1M) | Output ($/1M) | Montant mensuel dans ce comparatif | Quota tokens forfait (public) |
| --- | --- | --- | --- | --- | --- | --- |
| Abonnement | ChatGPT Plus | $/siege/mois | - | - | **$20/mois** | Non communique (limits apply) |
| Abonnement | ChatGPT Pro | $/siege/mois | - | - | **$200/mois** | Non communique ("unlimited" avec guardrails) |
| Abonnement | Claude Pro | $/siege/mois | - | - | **$20/mois** (ou environ **$17/mois** annualise) | Non communique (more usage) |
| Abonnement | Claude Max | $/siege/mois | - | - | **a partir de $100/mois** | Non communique (5x ou 20x vs Pro) |
| Abonnement | Google AI Plus | $/siege/mois | - | - | **$7.99/mois** | Non communique (palier More) |
| Abonnement | Google AI Pro | $/siege/mois | - | - | **$19.99/mois** | Non communique (palier Higher) |
| Abonnement | Google AI Ultra | $/siege/mois | - | - | **$249.99/mois** | Non communique (palier Highest) |
| API tokens | GPT 5.3 Codex* | $/1M tokens | $1.75 | $14.00 | **$7,875/mois** a 1B tokens (50/50) | N/A (facturation au token) |
| API tokens | Gemini 3.1 Pro (Preview)** | $/1M tokens | $2.00 | $12.00 | **$7,000/mois** a 1B tokens (50/50) | N/A (facturation au token) |
| API tokens | Claude Opus 4.6** | $/1M tokens | $5.00 | $25.00 | **$15,000/mois** a 1B tokens (50/50) | N/A (facturation au token) |
| API tokens | DeepSeek-R1-0528 (Together AI) | $/1M tokens | $3.00 | $7.00 | **$5,000/mois** a 1B tokens (50/50) | N/A (facturation au token) |

\* Je n'ai pas trouve de tarif API public explicite libelle `GPT 5.3 Codex` dans les tables scrapees; cette ligne utilise le tarif public `gpt-5.2-codex` comme proxy (fallback `gpt-5.2` si besoin).

\** Pour Gemini 3.1 Pro et Claude Opus 4.6, j'utilise le palier de prix <=200K tokens en entree.

References utiles pour le "non communique" sur les quotas forfait:

- OpenAI (pricing plans): https://chatgpt.com/pricing/
- Anthropic (plans + limites): https://claude.com/pricing et https://support.claude.com/en/articles/9797557-usage-limit-best-practices
- Google (plans + restrictions + AI credits): https://one.google.com/about/google-ai-plans/ et https://support.google.com/googleone/answer/16105039 et https://support.google.com/googleone/answer/16287445

Tentatives de mesure cote communaute (indicatif, non officiel):

- Tracker communautaire des limites ChatGPT: https://gpt.bstr.dev/
- Benchmark communautaire sur la conso quota Claude Pro: https://www.reddit.com/r/ClaudeAI/comments/1r9npwn/i_benchmarked_claude_pro_quota_burn_then_built_an/
- Experience communautaire de compteur de limites Gemini Pro: https://www.reddit.com/r/GeminiAI/comments/1ra0sb3/stop_guessing_when_youll_run_out_of_thinkingpro/

Meme avec ces hypotheses simplifiees, l'ecart est net: les abonnements restent tres competitifs tant que l'usage rentre dans les garde-fous produit, alors que l'economie full token API passe tres vite a plusieurs milliers de dollars par mois.

## Bilan

Cursor a été un excellent accélérateur. Mais a vrai dire le switch n'a pas été pénible du tout. Et avec mon application, je ne suis pas loin de pouvoir me dévevelopper mon propre plugin - leur modèle fonctionnait et refonctionnera peut être un peu plus tard, même si d'ici là, il y aura trop d'alternatives, peut être même mon plugin.

## Prochain article

Le [prochain article](/blog/coding-assistant-alternatives) compare les alternatives testées (Roo Code, Codex VS Code, Opencode, Antigravity, Blackbox) avec une grille explicite et les compromis réels observés sur le terrain.

## À propos de l'auteur

- Fabien Antoine
- [Qui je suis](/blog/who-i-am)
