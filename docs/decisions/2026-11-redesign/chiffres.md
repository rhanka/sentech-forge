# Chiffres publics proposés et sources — à valider en bloc

Date : 2026-11-06. Portée : nouvelles fiches et nouvelles offres seulement. Les fiches existantes restent inchangées, sauf avant/après validé fiche par fiche.

Statut :
- **mesuré** : recalculé dans cette session, avec la commande ou le fichier indiqué ;
- **source** : lu dans un document daté, sans recalcul ;
- **déclaré** : chiffre que tu as donné, sans mesure trouvée ;
- **sans source** : aucune trace trouvée.

## Offres

| # | Texte public proposé | Source | Statut |
|---|---|---|---|
| O1 | Discovery / PoC : 1 mois, 3 000 $ | ta demande du 2026-11-05 | déclaré |
| O2 | Outillage IA inclus : environ 20 milliards de tokens, soit l'équivalent de 200 $ au tarif refacturé de Radar immo | `radar-immobilier/docs/reports/couts-2026-08-12_2026-09-10.md` : immo 12,37 Md tokens pour 118,26 $ CA de LLM refacturé (marge ×1,15 incluse), donc 200 $ ≈ 20,9 Md | mesuré |
| O3 | Développement / MVP : 10 à 20 k$ | ta demande | déclaré |

Les prix sont en dollars canadiens, sans mention de taxes, qui s'ajoutent à la facture. En anglais : « $3,000 CAD ».

## Nouvelles fiches

| # | Fiche | Texte public proposé | Source | Statut |
|---|---|---|---|---|
| C1 | Radar immo | Application géographique en production en 6 semaines | 1er commit 2026-05-23 (`git log` de radar-immobilier) ; production continue constatée le 2026-07-03 (`docs/reports/livraison-2026-06-19_2026-07-03.md`) | mesuré |
| C2 | Radar immo | Plus de 500 000 lignes de code | radar 364 842 + geo 286 585 = 651 k lignes non vides, tests compris. Fichiers `.ts/.svelte/.js/.mjs/.sql/.sh/.css`, hors lock, dist et généré. Révisions radar `b5da4784c`, geo `098f3083` | mesuré |
| C3 | Radar immo | Moins de 10 k$ | aucun total d'honoraires trouvé ; seuls les coûts LLM et infrastructure sont mesurés | déclaré |
| C4 | Radar immo | Données de plus de 1 000 municipalités | référentiel de 1 106 municipalités ; rôle et cadastre 1 106/1 106, procès-verbaux 994 (2026-07-03) | source |
| C5 | Détection et classification | Opportunités d'achat concrétisées sur plus de 2 M pi² | aucune trace dans radar, ses rapports ni les transcriptions | sans source |
| C6 | Détection et classification | Graphique précision/rappel : précision 0,48, rappel 0,53, F1 0,51 sur 100 documents de 100 villes, 26 configurations comparées | `radar-immobilier/docs/reports/benchmark-v101b-2026-09-17.md` | source |
| C7 | Détection et classification | Ciblage client : rappel utile 74 %, précision utile 70 % (61 lignes de l'essai historique) | rapports radar (« targeting », juillet) | source |
| C8 | Facturation WaveApps | Connecteur MCP de 29 outils (factures, clients, taxes, paie) | `mcp-wave` origin/main, `src/tools` : 29 noms d'outils | mesuré |
| C9 | Impôts et comptabilité | Collecte par courriel, réconciliation banque/WaveApps, saisie Revenu Québec | seuls les outils de ventilation de taxes existent dans mcp-wave ; aucune exécution tracée | sans source |
| C10 | Mise en forme de CV | De 1 h 30 à 15 min par CV | texte que tu as dicté le 2026-03-26 ; aucune mesure | déclaré |
| C11 | Top AI Ideas | De 11 k à 94 k lignes de code en 20 semaines | `src/content/blog/data/top-ai-ideas-weekly-metrics.csv` (déjà publié sur le blog) | source |
| C12 | SDLC et sécurité | Jusqu'à 500 000 lignes de code produites par mois | octobre 2026, lignes de code ajoutées : sentropic 264 k + radar 144 k + design system 115 k + engram 139 k = 662 k (insertions brutes, pas un solde net ; h2a exclu car son historique a été réécrit) | mesuré |
| C13 | SDLC et sécurité | Transposition de langage testée en 1 jour | portage Python → TypeScript d'Engram : 103 tests de parité en une soirée, le 2026-04-09 (transcriptions ; l'historique git actuel commence en juillet) | source, non revérifié |
| C14 | SDLC et sécurité | Mises à jour de sécurité « 0 day » automatisées | la boucle de correction automatique est spécifiée mais désactivée ; les correctifs CVE sont aujourd'hui fusionnés le jour même, à la main (exemple : libexpat, 2026-11-03) | sans source pour « automatisé » |
| C15 | SDLC et sécurité | Coordination multi-LLM : Codex, Claude, Muse, Gemini, Mistral, GLM | profils `h2a run` et fournisseurs llm-mesh ; GLM seulement via Mistral, en dernier recours | source |
| C16 | Fraude (Curateur public) | **Fiche existante.** Site actuel : « +50 % d'efficacité, détection de 30 % à 85 % ». Ton CV (février 2025) : « couverture de détection de 50 % à 95 % ». Tu demandes de reprendre le CV. | `src/content/business-cases/fr/curateur.md` ; `spa-transpose-cv/CV Fabien ANTOINE 20250203 - CGI.docx`. Le CV de juillet 2026 sur Drive n'est pas accessible | avant/après à valider |

## Solutions

| # | Texte public proposé | Source | Statut |
|---|---|---|---|
| S1 | Design system : composants Svelte, React, Vue et Angular, 150 thèmes | npm `@sentropic/design-system-svelte` 0.36.0 ; dossier `packages/theme-*` | source |
| S2 | Engram : mémoire en graphe avec provenance, paquet npm public | npm `@sentropic/engram` 0.23.1 | source |
| S3 | h2a et Track : de la demande à la mise en production, tracé (h2a : 339 éléments, 79 décisions, 148 exécutions d'acceptation) | `.track` du repo h2a | source |
| S4 | Sentropic : plateforme open source, 15 connecteurs MCP | `sentropic/README.md`, `packages/` | source |
