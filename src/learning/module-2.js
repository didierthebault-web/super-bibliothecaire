export default [
  {
    "id": "2-1",
    "moduleId": 2,
    "order": 1,
    "title": "Des catalogues sur fiches aux catalogues informatisés",
    "pages": [
      12,
      13
    ],
    "teacher": "Le passage à l’informatique a changé les possibilités de recherche, pas le besoin de décrire avec rigueur.",
    "paragraphs": [
      "Un catalogue sur fiches multipliait les entrées physiques pour permettre plusieurs recherches sur une même ressource. L’informatisation rassemble des données structurées et permet de produire plusieurs index et plusieurs affichages à partir d’une même notice. Il devient possible de combiner les critères au lieu de suivre un seul ordre de classement.",
      "Le support replace cette évolution dans une histoire de coopération : principes internationaux, développement de l’ISBD, formats MARC et échanges entre bibliothèques. Les technologies favorisent la récupération de notices et réduisent les descriptions répétées. Elles rendent cependant plus visibles les incohérences entre pratiques.",
      "L’informatique ne transforme pas une donnée imprécise en donnée juste. Un titre mal transcrit reste difficile à retrouver, même dans un moteur rapide. La qualité de l’analyse et l’explicitation des relations demeurent nécessaires pour proposer des recherches fiables."
    ],
    "example": {
      "text": "Exemple fictif : les entrées « Morel, Léa », « Jardins de quartier » et « Jardins partagés » peuvent conduire à une même notice informatisée, alors que différents fichiers sur fiches pouvaient répartir ces accès."
    },
    "takeaways": [
      "Plusieurs accès ne nécessitent pas plusieurs descriptions de la même édition.",
      "L’automatisation s’appuie sur une analyse bibliographique."
    ]
  },
  {
    "id": "2-2",
    "moduleId": 2,
    "order": 2,
    "title": "Pourquoi structurer les données ?",
    "pages": [
      12,
      13
    ],
    "teacher": "Une donnée séparée et identifiée peut être retrouvée, triée et échangée.",
    "paragraphs": [
      "Un paragraphe bibliographique est lisible par une personne, mais il ne dit pas toujours à un programme où commence le titre ni quel nom est celui de l’éditeur. La structuration attribue une fonction explicite à chaque élément. Elle permet d’afficher différemment les mêmes données et de construire des recherches adaptées.",
      "L’échange de notices suppose un accord sur la signification des éléments, leurs règles d’enregistrement et leur encodage. L’interopérabilité ne se limite pas à ouvrir un fichier : il faut que le système destinataire puisse interpréter les données sans en changer le sens ou en perdre une partie.",
      "Une langue codée peut alimenter un filtre ; un identifiant peut contribuer à rapprocher deux notices ; une relation vers une autorité aide à regrouper les ressources d’une personne. Ce sont les données structurées et les règles partagées qui rendent ces usages possibles."
    ],
    "example": {
      "text": "Exemple fictif : la valeur « 2025 » isolée n’indique pas si elle est une date de publication, de naissance ou d’acquisition. Son emplacement et son contexte lui donnent une fonction exploitable."
    },
    "takeaways": [
      "Un format ne garantit pas à lui seul la qualité du contenu.",
      "Interopérabilité signifie aussi interprétation cohérente."
    ]
  },
  {
    "id": "2-3",
    "moduleId": 2,
    "order": 3,
    "title": "Comprendre le modèle FRBR",
    "pages": [
      13,
      14
    ],
    "teacher": "Un modèle conceptuel aide à nommer les objets décrits avant de décider comment les coder.",
    "paragraphs": [
      "FRBR, publié en 1998, propose une analyse des données bibliographiques en entités, attributs et relations. Une entité est un objet pertinent pour la description ; un attribut le caractérise ; une relation le relie à un autre objet. Ce modèle sert à comprendre les fonctions des données au regard des recherches des utilisateurs.",
      "Le support présente notamment le groupe Œuvre, Expression, Manifestation et Item, puis les agents responsables et les entités pouvant servir de sujet. L’intérêt est de ne plus considérer toute l’information comme un bloc indifférencié associé à un volume.",
      "FRBR n’est ni une grille de saisie ni une norme de ponctuation. Il a nourri l’évolution des catalogues et des codes, sans être lui-même un format d’échange. Relier des descriptions d’éditions à une même création intellectuelle est un raisonnement conceptuel distinct de l’affichage d’une notice."
    ],
    "example": {
      "text": "Exemple fictif : le roman imaginaire « Les chemins du vent » peut exister dans plusieurs traductions et éditions. Le modèle aide à distinguer la création, ses réalisations linguistiques, les publications et les exemplaires."
    },
    "takeaways": [
      "Entité, attribut et relation désignent trois outils d’analyse.",
      "FRBR est un modèle, pas un format MARC."
    ]
  },
  {
    "id": "2-4",
    "moduleId": 2,
    "order": 4,
    "title": "Œuvre, Expression, Manifestation, Item",
    "pages": [
      13,
      15
    ],
    "teacher": "Gardons le même exemple pour séparer les quatre niveaux sans les confondre.",
    "paragraphs": [
      "L’Œuvre correspond à une création intellectuelle ou artistique distincte. L’Expression est une réalisation de cette création : par exemple son texte en français ou une traduction en italien. Une traduction n’est pas simplement un autre exemplaire ; elle relève d’un autre niveau de description.",
      "La Manifestation correspond à l’ensemble des caractéristiques de publication ou de production partagées par des exemplaires. L’Item désigne un exemplaire individuel de cette manifestation. Ici, le mot « exemplaire » explicite Item, sans le réduire au seul code-barres d’un logiciel.",
      "Le changement de niveau dépend de la nature de la différence. Une nouvelle reliure d’un exemplaire local ne crée pas à elle seule une nouvelle œuvre. Inversement, une adaptation peut relever d’une autre œuvre ; on ne traite pas automatiquement toutes les transformations comme des traductions. Les modèles et règles précisent ces frontières."
    ],
    "example": {
      "text": "EXEMPLE ENTIÈREMENT FICTIF\nŒuvre : le roman Les chemins du vent, de Nora Vial.\nExpression : son texte français ; une traduction italienne de ce texte.\nManifestation : l’édition française des Éditions du Rivage clair, 2025.\nItem / exemplaire : le volume de cette édition conservé dans une bibliothèque, avec une dédicace manuscrite."
    },
    "takeaways": [
      "Une œuvre n’est pas une édition particulière.",
      "Un exemplaire individuel ne décrit pas tous les autres volumes de la même édition."
    ],
    "diagram": [
      [
        "Œuvre",
        "Création intellectuelle"
      ],
      [
        "Expression",
        "Réalisation du contenu"
      ],
      [
        "Manifestation",
        "Publication / production"
      ],
      [
        "Item",
        "Exemplaire individuel"
      ]
    ]
  },
  {
    "id": "2-5",
    "moduleId": 2,
    "order": 5,
    "title": "Découvrir IFLA LRM",
    "pages": [
      15,
      15
    ],
    "teacher": "LRM rapproche les données bibliographiques, les autorités et les sujets dans une même analyse.",
    "paragraphs": [
      "Le support présente IFLA LRM comme une consolidation des modèles FRBR, FRAD et FRSAD. Le modèle de référence conserve les niveaux Œuvre, Expression, Manifestation et Item et les inscrit dans un ensemble plus large de relations. L’objectif est de rendre cohérentes des analyses qui avaient été développées séparément.",
      "Pour une première lecture, il faut retenir la distinction entre une chose et les appellations qui la désignent. Une personne peut avoir plusieurs noms : multiplier les noms ne signifie pas multiplier les personnes. De même, une ressource peut être reliée à ses créateurs et à ses sujets plutôt que décrite seulement dans une chaîne de texte.",
      "Il ne faut pas apprendre une liste approximative d’entités à partir d’un raccourci. La famille et la collectivité ne sont pas deux entités distinctes nommées ainsi dans la liste des onze entités LRM : elles relèvent d’Agent collectif. Le cours précise cette terminologie à partir de la référence officielle, sans attribuer cette précision au schéma simplifié du support."
    ],
    "example": {
      "text": "Exemple fictif : « Nora Vial » est une appellation de la personne qui a créé Les chemins du vent. Un autre nom utilisé par cette personne ne suffit pas à conclure qu’il existe un second créateur."
    },
    "takeaways": [
      "LRM consolide plusieurs modèles antérieurs.",
      "Distinguer une entité de ses noms facilite le rapprochement."
    ],
    "complement": "Complément de vérification (IFLA LRM, mise à jour 2024) : les onze entités sont Res, Œuvre, Expression, Manifestation, Item, Agent, Personne, Agent collectif, Nomen, Lieu et Laps de temps. Explorer complète les tâches des utilisateurs.",
    "referenceKeys": [
      "lrm"
    ]
  },
  {
    "id": "2-6",
    "moduleId": 2,
    "order": 6,
    "title": "Le code RDA-FR et la transition bibliographique",
    "pages": [
      16,
      16
    ],
    "teacher": "Modèle, règles de contenu et format d’encodage remplissent des rôles complémentaires.",
    "paragraphs": [
      "Le support expose RDA comme un code portant sur le contenu des données, indépendamment d’une présentation unique ou d’un format particulier. RDA-FR en est la transposition française. Le code aide à identifier les éléments à enregistrer et les relations à exprimer dans un signalement organisé.",
      "Le modèle indique quelles entités et relations sont pertinentes ; les règles guident leur description ; un format ou un schéma permet leur enregistrement informatique. Il est donc possible de faire évoluer les règles sans assimiler automatiquement cette évolution à un remplacement immédiat de tous les logiciels et formats.",
      "La transition bibliographique étudiée par Médiadix vise une meilleure exposition des données et de leurs relations. Pour le travail quotidien, l’application de consignes dépend des référentiels publiés et du cadre du réseau. Un cours daté doit être lu comme une base théorique, pas comme une annonce permanente du calendrier de déploiement."
    ],
    "example": {
      "text": "Exemple fictif : relier une publication à une expression traduite relève de l’analyse conceptuelle ; choisir les éléments à décrire relève des règles ; enregistrer les données dans un système relève de l’encodage."
    },
    "takeaways": [
      "LRM ne s’utilise pas comme une liste de zones UNIMARC.",
      "RDA-FR et UNIMARC ne sont pas concurrents au même niveau."
    ],
    "complement": "Mise en perspective au 8 novembre 2026 : le programme national 2015–2025 est achevé ; le code RDA-FR continue d’être maintenu. Sa page officielle des mises à jour annonce la version 1.7.0 du 19 janvier 2026. Les consignes du réseau restent la référence opérationnelle.",
    "referenceKeys": [
      "rdafr"
    ]
  }
];

