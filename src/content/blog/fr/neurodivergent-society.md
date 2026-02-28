---
id: neurodivergent-society
icon: Terminal
order: 5
date: 2026-02-27
readTime: 10 min de lecture
---

# CLIs de code et Chat : trace éphémère d’une neurodivergence sociale numérique

## Note préliminaires

Je ne suis ni spécialiste de l'autisme ni un critique de la neurodiversité, bien au contraire. Il est certain que je suis moi-même neuro-atypique, et que je déteste mettre des labels ou en avoir. L'article étant public, je ferai un emploi mesuré du terme autiste, mais, basiquement, c'est intuitivement un biais de cet ordre que je pointe, sans stigmatiser aucune intelligence. Et j'espère bien que la diversité des intelligences humaines et des cultures est ce qui fait notre richesse, n'en déplaise à certaines tendances actuelles.

Par ailleurs, je me permets de citer dans cet article plusieurs noms, sans volonté d'offence et avec au contraire un profond respect.

Enfin, cet article n'as pas été écrit par l'IA (seulement traduit pour sa version anglaise, et des fix de typos)

## Intelligence Artificielle, une question de vocabulaire


Lors d'une discussion récente avec [Pierre Vannier](https://www.pierrevannier.com/) (Flint), dont j'apprécie particulièrement la vision et les valeurs, il me posait la question: est-ce que le terme intelligence pour l'IA, qui date de 1956 (John McCarthy), est bien choisi ? Une question à laquelle je n'apporte pas de réponse, tant le terme intelligence est lui-même, pour l'humain, relativement bien défini, mais que j'utiliserai ici comme capacité de notre capacité d'apprentissage (neurones en grande partie) à apporter une valeur à d'autres\*, englobant l'intelligence émotionnelle et les autres.

\* Note: on me rappellera les finalités à soi même, dont la survie, mais je n'entre pas sur ce terrain (ni pour l'IA - ni pour l'humain!)

## Ce qui m'a amené à l'IA

Dans un [podcast récent](https://www.youtube.com/watch?v=zLescESJamw), je partageais avec Pierre et Thomas ce qui m'a amené à l'IA: d'une part la fascination pour la magie des réseaux de neurones pour démontrer des capacités d'apprentissage, et d'autre part l'application concrète pour résoudre des problèmes (à l'époque, en 1994, la reconnaissance de chiffres, alors le dataset de Yann Le Cun). C'était dans ce [livre de Simon Haykin](https://www.amazon.ca/Neural-Networks-Comprehensive-Foundation-1994-01-30/dp/B01K2RA19K) que j'ai traîné pendant toutes mes études scientifiques qu'est née ma passion.

J'apporterai l'autre éclairage en mouillant probablement, de façon interprétée, Yann Le Cun (et je m'en excuse), dont le créneau n'est pas de lutter contre l'IA et les réseaux de neurones, mais contre les LLM, qui n'utilisent qu'une partie mineure de l'information par rapport à celle qu'un enfant reçoit, ne serait-ce que par son système de perception (la vision en particulier). [Voir cette intervention](https://www.youtube.com/watch?v=jmkTM2VSQoY).

Le discours public peut paraître biaisé à un scientifique, car la mesure de l'entropie de Shannon nous porte à penser que l'information effective face au "flux vidéo reçu" est bien moins épaisse que la donnée brute. Mais Le Cun en est parfaitement conscient et utilise cela pour pointer du doigt le même biais, qui aujourd'hui apporte selon moi un biais massif aux emplois de l'IA, lié à un biais de la culture ou à la trajectoire initiale de l'IA, et qui vient jusqu'à un impact concret: une mutation à une vitesse vertigineuse d'abord des emplois autour de l'IA, puis du numérique (ou du digital selon le bord de l'Atlantique).

## De la vision au langage

Lorsque je me suis orienté vers l'IA, mon biais de parcours a été sur le traitement d'image, à Sophia Antipolis. En 2000, je faisais un stage sur de la reconnaissance de routes par analyse multi-échelle. On me proposait de publier, mais je n'avais que deux images pour travailler. J'avais de belles formules mathématiques (transformée de Hough, chaîne de Markov), ça suffisait pour publier à l'époque. J'étais choqué de l'absence de méthode scientifique (mesurer et évaluer !), et je me suis converti au traitement du langage. C'étaient les méthodes bayésiennes à l'époque, les métriques d'évaluation pour la reconnaissance vocale étaient simples, on utilisait déjà les LLM, basés sur des `n-gram`, et on savait déjà générer du texte, mais il n'avait aucun sens. Il y avait cependant déjà le [Pipotron](http://www.lepipotron.com/) qui permettait déjà de créer des phrases hallucinogènes.

Le problème se complexifiait alors sur la traduction. La méthode [BLEU d'IBM](https://aclanthology.org/P02-1040.pdf) a révolutionné la traduction, permettant d'objectiver les progrès, induisant d'abord de l'apprentissage par statistiques; je lançais alors de premières études d'IA sur le sujet. Ce domaine de recherche a rejoint les réseaux de neurones, et a abouti en 2017 aux [transformers](https://arxiv.org/abs/1706.03762), qui donnaient naissance à [GPT-2 en 2019](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf), ChatGPT en 2022, et un peu plus de trois ans après à l'agentique pour le code.

## Le biais UI/UX: du chat à la CLI

Depuis, on considère que l'IA c'est un chat, maintenant des agents. Ces agents ont des capacités de vision, mais très limitées (là où en "génératif" ils sont impressionnants). On a branché à l'IA des yeux après la capacité de langage. Résultat, l'IA de la génération "transformers" est encore nulle en vidéo ([RT-DETR](https://arxiv.org/abs/2304.08069), né d'une fusion de YOLO avec les transformers), et peut-être que l'architecture [JEPA](https://arxiv.org/abs/2301.08243) donnera la suite de l'histoire.

Mais, de fait, il y a un biais de l'IA dans son parcours historique, et elle aboutit aujourd'hui à un biais d'interaction homme-machine (UI / UX) très concret: la CLI pour le software engineering.

Depuis les débuts de ChatGPT, je suis l'apport de l'IA et les plugins VS Code: j'ai eu une période Cursor, puis VSCode, puis Cursor, et à nouveau VS Code, et puis là les CLIs (Codex, Claude, Opencode, Mistral). À part Cursor, les plugins VS Code ne sont pas crédibles pour le subagentique. Avec l'évolution [du vibe coding vers le software engineering assisté par l'IA](/blog/ai-assisted-software-engineering), on en vient à abandonner l'idée de regarder (tout) le code, et de séparer le pilotage des agents de l'éditeur de code.

En soi, j'aurais plutôt attendu qu'on ait une interface d'un nouveau genre qui apparaisse, et peut-être d'ailleurs des méthodes avant les outils, pour apporter de la productivité saine. Mais non: on passe tous en CLI. À ce stade, d'ailleurs, je trouve que le subagentique, qui a justifié la massification du passage aux outils de CLI, nécessite un gros travail de méthode pour vraiment avoir un bénéfice (vs plusieurs agents). Avoir un [conductor](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/) nécessite d'utiliser le "LLM" comme un "manager", alors qu'il n'en a pas les skills. Il délègue à de supers développeurs LLM, qui eux ont été entraînés pour.

## Benchmarks et monde du travail

Parce que l'IA, ça reste de l'apprentissage... les [SWE Bench](https://arxiv.org/abs/2310.06770), d'ailleurs biaisés ([analyse OpenAI](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)), ont été créés pour permettre à l'IA de savoir produire du code, produire des papiers de recherche, traduire, ... La tâche la plus proche du monde du travail est le [GDPval](https://openai.com/fr-FR/index/gdpval/) qui contient un jeu ridicule de 1320 tâches pour 44 professions. Il y a certainement beaucoup moins de questions dans les formations de manager, mais probablement aussi parce que les situations de tous les jours, et les feedbacks, ne sont pas captés, retranscrits, et ne passent pas juste par de l'écrit en octets.

## Pourquoi la CLI séduit autant

Bref, nous y voilà: la CLI. Mais... pourquoi tant de haine ? Ou tant d'amour ? En tant que gars scientifique de l'IA, j'ai très vite aimé Linux et utilisé les terminaux, j'ai longtemps été friand des one-liners (micro-outils pratiques en `grep` `sed` `awk` `perl` avec des regex incompréhensibles par d'autres et dont on n'a plus besoin avec l'IA), pour du traitement de données y compris en langage naturel. Je comprends les raccourcis, les commandes par slash qui me rappellent [IRC](https://fr.wikipedia.org/wiki/Internet_Relay_Chat)... Est-ce que j'ai un biais culturel, et cognitif ? Certainement ! Est-ce que le mode "chat" imposé par le dialogue LLM, qui n'est pas très bon à autre chose, est un biais cognitif de l'IA ? Certainement ! Est-ce que le mode CLI pour coder en subagentique est un biais socio-cognitif ? Probablement ! Est-ce que ce biais de l'IA n'appuie pas sur un biais un peu "autiste" (je n'utiliserai le terme qu'une fois) et pas 100% vertueux ?

L'IA est neurodivergente, et renforce nos neurodivergences, de là à contaminer tout un secteur ([SaaSpocalypse](https://thenewstack.io/dawn-of-a-saaspocalypse/)), en accélérant le codage de façon inutilement biaisée (doublée d'un biais capitalistique), mais tellement grisante (la [dopamine](https://www.sciencesetavenir.fr/sante/cerveau-et-psy/quel-est-le-role-de-la-dopamine-surnommee-molecule-du-plaisir-dans-l-apprentissage_189558), un autre biais).

Note: est-ce qu'il y a d'autres biais socio-cognitifs avec les réseaux sociaux, et l'IA joue-t-elle là-dedans ? Bien sûr, et d'ailleurs l'IA pré-GPT le faisait déjà, et aujourd'hui c'est une autre dimension: [AI Slop](https://www.theverge.com/ai-artificial-intelligence/882956/ai-deepfake-detection-labels-c2pa-instagram-youtube).

## Et après

Alors, combien de temps va durer la tendance CLI ? 1 an ? 2 ans ? Quelle sera la prochaine UI pour faire du software engineering ? Quelle sera la prochaine UI pour que l'humain interagisse avec ses données ? La CLI est paradoxalement l'outil de productivité du software engineer de 2026 mais son outillage s'éloigne des [tendances de l'UX](https://uxdesign.cc/10-ux-design-shifts-you-cant-ignore-in-2026-8f0da1c6741d)

Mon hypothèse est que nous passerons d'un software engineering "XaC" (everything as code) à "XaD" (everything as data - toute connaissance, tout code est de la data), et c'est en pensant ainsi l'ingénierie logicielle, avec l'IA et la data, qu'on trouvera un minimum de pérennité et de valeur numérique.

Ma pensée est également probablement qu'il faut décapitaliser l'IA et en réguler massivement la robotique à venir, que nous apporterons de vraies valeurs saines à l'humanité. Je ne sais pas ce que seront [OpenAI et Anthropic](https://www.linkedin.com/pulse/how-openai-anthropic-really-make-money-thomas-wittlinger-hfbye/) fin 2026, mais l'accumulation de leur dette face à d'autres joueurs avec des modèles et éthiques alternatives (en Chine, mais aussi en Europe) pourraient avoir un impact majeur sur leurs prévision et leur valeur cette année.

À ma petite échelle, je travaille sur un outillage, pour avoir une méthode et des librairies pour mieux utiliser l'IA, pour le code et pour l'utilisateur. Aujourd'hui mon code est là [top-ai-ideas](https://github.com/rhanka/top-ai-ideas-fullstack/), mais il va bientôt se transformer en une bibliothèque, en logiciel libre, pour faciliter la collaboration humaine avec l'IA, software engineering compris, car il semble devenir naturel que le logiciel, déprécié de sa valeur, soit cultivé de façon libre.

Fabien Antoine
