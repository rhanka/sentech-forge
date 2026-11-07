# De l’Everyday AI aux produits agentiques : quels composants d’architecture pour quels usages ?

Brouillon éditorial FR · 22 septembre 2026 · Auteur proposé : Fabien Antoine · Non publié

**Angle :** une grille de lecture pour choisir les composants et les modes de réalisation d’un système IA. « Everyday AI » couvre ici les usages quotidiens et la couche transverse d’accès à l’IA dans l’entreprise. Ce texte défend une approche d’architecture ; il ne constitue pas une étude de marché. Son périmètre éditorial exact reste à confirmer.

## Le modèle ne suffit pas à décrire le système

Un assistant qui résume un document, un workflow qui prépare un dossier et un agent qui agit dans plusieurs applications peuvent appeler le même modèle. Leurs architectures restent très différentes.

Le premier produit une proposition que son utilisateur relit. Le deuxième doit respecter les étapes et les règles d’un processus. Le troisième choisit certaines actions et doit rester dans les limites de son mandat. Une chaîne de deep analytics ajoute encore d’autres exigences : qualité des données, validité des calculs, incertitude et reproductibilité.

Pour l’architecture d’entreprise, je propose de regarder ces usages à travers trois questions : quelle capacité métier voulons-nous améliorer, quelle responsabilité confions-nous au système et quelle preuve permettra de dire qu’il fonctionne ?

Cette lecture déplace l’attention du choix d’un modèle vers les composants et les responsabilités qui l’entourent. Elle aide aussi à distinguer ce qui doit être partagé à l’échelle de l’entreprise de ce qui doit rester propre à un produit.

## Quatre formes d’usage, pas quatre niveaux de prestige

| Forme | Ce que le système fait | Pattern de départ | Vérification essentielle |
| --- | --- | --- | --- |
| Everyday AI | Aide une personne à comprendre, rédiger ou préparer une décision. | Assistant avec accès à des sources autorisées et possibilité de s’abstenir. | Réponse fidèle, références vérifiables, accès respectés. |
| Workflow augmenté | Réalise des étapes IA dans un processus connu. | Orchestration explicite, sorties structurées et validation aux transitions sensibles. | Règles métier, reprises, exceptions et absence de doublons. |
| Produit agentique | Choisit des actions dans un périmètre défini. | Outils limités, état explicite, budget d’exécution et points d’escalade. | Respect du mandat, maîtrise des effets et capacité de reprise. |
| Deep analytics | Explore et analyse des données pour étayer une décision. | Données préparées, calculs reproductibles, modèles analytiques et interprétation sourcée. | Validité des données, pertinence de la mesure, incertitude et reproductibilité. |

Un workflow simple peut être le meilleur choix. Donner plus d’autonomie à un système n’a d’intérêt que si cette autonomie apporte une valeur observable et si l’équipe sait vérifier son comportement.

Ces formes peuvent aussi coexister : un assistant permet d’explorer les résultats d’une chaîne analytique ; un agent prépare une analyse, tandis que les calculs restent exécutés dans un environnement déterministe.

## Everyday AI comme couche transverse de l’entreprise

Une entreprise peut proposer un point d’accès commun à l’IA tout en confiant aux équipes métier la réalisation de capacités spécialisées. Il faut alors distinguer trois responsabilités : l’expérience quotidienne des utilisateurs, la fabrication et l’exploitation des agents métier, et l’accès aux données et services d’entreprise.

Cette distinction aide à traiter des questions concrètes : quels assistants sont disponibles à tous, qui maintient un agent spécialisé, comment retrouve-t-on ses sources et sous quelle identité peut-il agir ? Une interface commune ne signifie pas que tous les agents partagent les mêmes droits, le même cycle de livraison ou la même criticité.

Le pattern associe donc une couche transverse d’usage, des capacités de réalisation par domaine et des services de données gouvernés. Il peut s’appuyer sur une plateforme du marché, sur des composants spécifiques ou sur leur combinaison. Le choix dépend des exigences d’intégration, d’autonomie des équipes et de responsabilité opérationnelle.

## De l’idéation au portefeuille de cas d’usage

Avant de choisir une architecture, il faut rendre les usages comparables : contexte métier, utilisateur, décision à améliorer, données nécessaires, valeur attendue et difficulté d’implémentation. Un outil d’idéation peut aider à produire et structurer les premières fiches ; la validation du besoin et des hypothèses reste un travail avec les parties prenantes.

Un quadrant valeur / facilité d’implémentation aide à présélectionner les sujets. Il ne constitue pas un business case : une position favorable ne prouve ni un retour sur investissement ni la disponibilité des données. Les cas retenus demandent ensuite une analyse plus précise et des porteurs identifiés.

Sentropic explore ce rôle de produit d’idéation : contexte d’organisation, génération de cas d’usage, qualification et matrices d’évaluation. Le choix architectural intéressant est de séparer le parcours métier des composants qui exécutent la génération et accèdent aux modèles.

## Les composants à rendre explicites

### Identité, permissions et responsabilité

Le système doit savoir pour qui il agit, quelles données il peut lire et quelles actions il peut réaliser. Une connexion technique réussie à un outil ne vaut pas autorisation métier pour toutes ses opérations.

Le pattern utile consiste à transmettre un contexte d’autorisation vérifié, à limiter les outils au besoin et à distinguer lecture, préparation et action. Une modification engageante peut nécessiter une décision humaine à un point précis du parcours.

Le contrepoint est le coût d’intégration : une gouvernance disproportionnée peut rendre un simple assistant inutilisable. Le niveau de contrôle doit suivre les effets possibles, pas le nombre de composants de la solution.

### Sources, recherche et mémoire

La recherche documentaire aide à ramener des passages pertinents au modèle. Une mémoire graphe devient intéressante lorsque les relations comptent : quel système dépend de quelle capacité, quelle décision modifie quelle trajectoire, quelle affirmation provient de quelle source ?

Ces approches se complètent. La recherche peut retrouver un document ; un graphe peut relier ce document à des objets, des relations et des décisions. Dans les deux cas, il faut traiter la fraîcheur, les droits d’accès, les corrections et la provenance.

Un graphe extrait automatiquement n’est pas une vérité certifiée. Il faut distinguer ce qui est explicitement présent dans une source de ce qui a été inféré. Une architecture de mémoire utile permet de revenir aux éléments qui soutiennent une réponse, et d’identifier ce qui manque.

### Gateway et routage des modèles

Le point d’entrée utilisé par une application et le composant qui choisit un fournisseur n’ont pas la même responsabilité.

Une gateway peut prendre en charge l’authentification de l’appelant, les quotas, la mesure de consommation et la traduction des formats. Une couche de routage peut gérer les modèles éligibles, la disponibilité, l’affinité d’une session et les politiques de repli.

Cette séparation est documentée dans Sentropic : la gateway consomme un plan de routage opaque préparé par le LLM mesh. Le cluster mesh traite un autre sujet, le contexte des serveurs et postes rattachés. Dans le runtime documenté aujourd’hui, ce dernier reste à serveur unique ; la fédération entre serveurs n’est pas une capacité livrée.

Ce découpage n’est pas obligatoire pour chaque prototype. Il devient utile lorsqu’il existe plusieurs consommateurs, plusieurs fournisseurs ou une responsabilité commune sur les accès et les coûts. Son prix est une couche supplémentaire à configurer, observer et maintenir.

### Outils, état et effets de bord

Pour un système agentique, le catalogue d’outils est une partie du contrat d’architecture. Un outil doit avoir une entrée compréhensible, une sortie vérifiable et des effets connus. Les opérations sensibles demandent une stratégie de reprise : rejouer l’appel peut-il créer deux objets, envoyer deux demandes ou appliquer deux fois la même modification ?

Je privilégie un workflow explicite lorsque les étapes sont connues. Un agent est plus pertinent lorsque le chemin dépend réellement de ce qu’il découvre. Même dans ce cas, les règles d’autorisation et les limites d’exécution restent explicites.

### Framework agentique : organiser le parcours d’exécution

Un framework agentique doit rendre explicites les sessions, les outils, l’état de travail et les transitions. La conversation interactive et le workflow métier peuvent partager des composants sans avoir le même cycle de vie : l’une réagit aux interventions de l’utilisateur, l’autre suit des tâches et des règles de progression.

Dans le dépôt Sentropic, cette séparation apparaît entre chat-core, consacré à l’orchestration conversationnelle, et flow, qui porte les workflows, les tâches, les files d’exécution et les transitions. Le LLM mesh répond à une autre question : quels modèles et fournisseurs sont éligibles pour un appel ? L’extraction de flow est encore documentée comme un travail en cours, sans package publié.

Ce découpage facilite la discussion des responsabilités. Il ne suffit pas à prouver la qualité d’un produit : il faut vérifier les reprises, les échecs d’outils, la cohérence de l’état et la capacité de l’utilisateur à reprendre la main.

### Évaluation et observabilité

Une réponse plausible ne suffit pas. Il faut savoir quelle tâche a réussi, selon quel critère et sur quel ensemble de situations.

Le jeu d’évaluation devrait contenir des cas représentatifs, des cas difficiles et des cas où le système doit refuser d’agir ou reconnaître une information manquante. Les traces doivent permettre d’expliquer un échec sans conserver plus de données sensibles que nécessaire.

Les coûts et délais font aussi partie de la qualité du service. Une analyse exacte mais trop lente pour le processus visé peut être inutilisable. Le bon arbitrage se fait au niveau du parcours complet, pas seulement au nombre de tokens.

## Trois patterns à examiner avant de construire

### Document vers diagramme : extraire, proposer, vérifier

Transformer un document en diagramme d’architecture peut sembler être une tâche de génération. Le travail important se situe dans la fidélité des objets et relations : lesquels sont explicitement décrits, lesquels sont supposés, et où subsistent les contradictions ?

Un pattern prudent sépare extraction, proposition de modèle, validation des relations et rendu. Le diagramme conserve des liens vers les sources et distingue les hypothèses. Un humain peut alors corriger le modèle sans recommencer toute la chaîne.

Ce pattern est utile pour accélérer une première lecture et préparer une discussion. Il devient dangereux si la qualité du dessin fait oublier l’incertitude de son contenu. La qualité à mesurer est d’abord celle du modèle représenté.

### Dossier de décision : rendre les alternatives discutables

Un agent qui prépare une recommandation doit exposer les faits, les inconnues, les options et leurs conséquences. Le rôle humain n’est pas réduit à accepter une conclusion déjà emballée : il doit pouvoir modifier un critère, demander une alternative ou différer la décision.

Le dossier de décision devient un objet de travail commun. Une surface de présentation comme Focus peut aider à le lire et à le commenter ; le stockage de la décision et les autorisations restent des responsabilités à intégrer explicitement.

Ce pattern est adapté aux décisions coûteuses, transversales ou difficiles à inverser. Pour un choix local et facilement réversible, une hypothèse tracée suffit souvent. Le dossier doit réduire la charge cognitive, pas transformer chaque détail en comité.

### Deep analytics : séparer calcul et interprétation

Pour analyser des anomalies ou prioriser des dossiers, un modèle de langage peut aider à formuler une question, préparer une requête et expliquer un résultat. Il ne remplace pas la définition d’une population, le traitement des données manquantes, un calcul statistique ou une évaluation du modèle prédictif.

Le pattern consiste à conserver une chaîne reproductible : sources versionnées ou datées, transformations explicites, calculs exécutables, résultats inspectables et interprétation reliée à ces résultats. La validation porte notamment sur les biais de sélection et les erreurs qui affectent réellement le métier.

Pour un usage de détection, « plus de dossiers identifiés » ne suffit pas à conclure : il faut considérer les faux positifs, la charge de revue et les cas manqués. Le bon indicateur dépend du coût de chaque erreur.

## Le delivery commence avec les critères d’acceptation

Construire avec l’IA demande d’organiser le travail dès le cadrage :

1. **Définir la capacité et la décision métier.** Qui utilise le système, pour faire quoi, et qui reste responsable ?
2. **Établir une référence.** Quel est le processus actuel et comment évaluera-t-on l’amélioration ?
3. **Choisir le pattern le plus simple qui couvre le besoin.** Assistant, workflow, agent ou chaîne analytique ; préciser les limites.
4. **Construire une tranche verticale.** Une source, un parcours, une évaluation et un résultat utilisable avant de multiplier les intégrations.
5. **Vérifier les exceptions.** Donnée absente, source contradictoire, outil indisponible, permissions insuffisantes et action partiellement effectuée.
6. **Préparer l’exploitation et le transfert.** Traces, coûts, reprise, documentation, responsabilités et conditions de support.

Un harness de développement contribue à cette discipline : périmètre du changement, vérifications, tests et revue. La coordination humain–agent traite la répartition du travail et les escalades. Les deux sont complémentaires ; aucun ne remplace la validation du produit par ses utilisateurs.

## Ce que cela change pour l’architecture d’entreprise

Je vois trois déplacements utiles pour guider les travaux d’architecture.

Le premier va de l’inventaire des outils vers les capacités et responsabilités. Deux solutions qui utilisent le même modèle peuvent porter des risques et des exigences d’exploitation très différents.

Le deuxième va des démonstrations isolées vers des composants réutilisables là où leur mutualisation a un sens : identité, connecteurs, accès aux modèles, provenance et évaluation. Mutualiser trop tôt peut cependant ralentir la livraison ; une brique partagée doit répondre à des besoins réels.

Le troisième rapproche architecture et delivery. Une roadmap gagne en qualité lorsqu’elle intègre les contraintes observées sur une tranche de produit. Une équipe de réalisation gagne en autonomie lorsqu’elle dispose d’une trajectoire et de critères de décision explicites.

L’Everyday AI, les produits agentiques et la deep analytics ne demandent donc pas une architecture unique. Ils demandent des choix explicites sur ce que l’on délègue, ce que l’on partage et ce que l’on vérifie.

## Références et préparation à la publication

Cette section est une note éditoriale à finaliser avant intégration dans le blog.

- Sources techniques inspectées : documentations locales H2a ; Sentropic Harness, Focus, cluster mesh, LLM mesh et LLM gateway ; README produit Sentropic, exports chat-core et flow, catalogue des workflows. Les descriptions de ces composants reposent sur ces sources ; elles ne constituent pas une mesure de leur adoption.
- Compléments bibliographiques proposés : NIST AI RMF, https://www.nist.gov/itl/ai-risk-management-framework ; OWASP GenAI Security Project, https://genai.owasp.org/. Ces liens n’ont pas été vérifiés en ligne pendant cette préparation et ne servent pas ici à étayer une statistique.
- Avant publication : confirmer le sens d’Everyday AI, fixer les liens publics des composants, vérifier les références et la date, relire les exemples, traduire en anglais et ajouter un lien vers l’offre IA ou Superbuilder retenue.
- Les exemples de document-to-diagram et de deep analytics sont des patterns génériques. Ce brouillon ne les attribue pas à un client et ne divulgue pas de résultats de mission.
- La recherche documentaire du 22 septembre a confirmé un emploi d’Everyday AI comme couche transverse dans un framework d’entreprise. La section ajoutée en tire une question générale d’architecture ; aucun diagramme interne, calendrier, chiffre ni détail d’organisation client n’est reproduit.
