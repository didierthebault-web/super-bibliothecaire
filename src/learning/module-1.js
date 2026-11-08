export default [
  {
    "id": "1-1",
    "moduleId": 1,
    "order": 1,
    "title": "Pourquoi cataloguer ?",
    "pages": [
      4,
      4
    ],
    "teacher": "Le catalogue donne accès à une collection, même lorsque le document n’est pas sous nos yeux.",
    "paragraphs": [
      "Cataloguer consiste à construire une représentation organisée d’une ressource. Cette représentation en expose les caractéristiques utiles : titre, responsabilités, édition, publication, présentation matérielle. Elle fournit aussi des accès pour retrouver la ressource par une personne, un titre ou un sujet. Le catalogue ne se confond donc ni avec une simple liste de titres ni avec l’inventaire des seuls objets présents sur les rayonnages.",
      "Médiadix présente quatre besoins : trouver des ressources à partir d’un critère, identifier celle qui correspond à la demande, sélectionner une version appropriée et accéder à cette ressource. Une description précise aide notamment à distinguer une traduction, une version abrégée ou une édition enrichie. Les informations de disponibilité et de localisation complètent ensuite la description pour permettre l’accès.",
      "Il ne s’agit pas de tout dire sur un livre, mais de donner une information fiable, compréhensible et partageable. Une confusion de date ou de personne peut empêcher un lecteur de reconnaître le document recherché."
    ],
    "example": {
      "text": "Exemple fictif : une lectrice trouve un guide grâce à son titre, reconnaît la deuxième édition grâce à sa date, sélectionne sa version française et consulte la localisation pour obtenir un exemplaire."
    },
    "takeaways": [
      "Description et accès répondent ensemble aux besoins du public.",
      "Trouver, identifier, sélectionner et accéder sont complémentaires."
    ]
  },
  {
    "id": "1-2",
    "moduleId": 1,
    "order": 2,
    "title": "Le catalogage dans le circuit du document",
    "pages": [
      4,
      4
    ],
    "teacher": "Le signalement relie l’arrivée d’un document à sa découverte par le public.",
    "paragraphs": [
      "Le circuit documentaire rassemble les opérations qui accompagnent une ressource : choix et acquisition, réception, vérification, signalement, équipement et mise à disposition. L’organisation précise dépend de l’établissement. Le catalogage alimente le catalogue avec des données décrivant la ressource reçue.",
      "Une notice bibliographique décrit une publication et ses accès. Une donnée d’exemplaire décrit, par exemple, l’objet possédé, son code-barres, sa localisation et son état. Plusieurs exemplaires peuvent être rattachés à une même notice bibliographique : le nombre de notices n’est pas le nombre de volumes physiquement présents.",
      "Récupérer une notice d’un réservoir évite de recommencer une description déjà établie. Le catalogueur doit cependant la confronter au document. Deux couvertures proches ne garantissent pas qu’il s’agisse de la même édition. Les modalités de rangement et de prêt relèvent ensuite de la gestion locale."
    ],
    "example": {
      "text": "Exemple fictif : deux volumes identiques de « Jardins de quartier » sont reçus. Une notice bibliographique décrit l’édition ; deux données d’exemplaire distinguent le volume de la salle de lecture et celui destiné au prêt."
    },
    "takeaways": [
      "La récupération ne remplace pas la vérification.",
      "Notice bibliographique et exemplaire remplissent des fonctions distinctes."
    ]
  },
  {
    "id": "1-3",
    "moduleId": 1,
    "order": 3,
    "title": "Les normes et les règles de catalogage",
    "pages": [
      4,
      7
    ],
    "teacher": "Une règle commune permet à plusieurs bibliothèques de comprendre et d’échanger leurs descriptions.",
    "paragraphs": [
      "La normalisation réduit les différences qui empêcheraient d’identifier ou de rapprocher des descriptions. Un titre, une mention d’édition et une date sont repérés et transcrits selon un cadre explicite. Les professionnels peuvent ainsi produire des données cohérentes dans une équipe et entre établissements.",
      "Le support 2025 présente les références AFNOR, notamment Z44-050 pour la description des monographies et Z44-059 pour le choix des accès, dans le contexte de la transition vers RDA-FR. Il montre comment utiliser sommaire, index et vocabulaire pour retrouver une instruction. La compétence attendue est de savoir consulter les règles, pas de toutes les mémoriser.",
      "Trois niveaux sont à distinguer : un modèle conceptuel organise les entités et leurs relations ; un code de catalogage précise les informations à enregistrer ; un format indique comment les encoder. UNIMARC n’est donc pas, à lui seul, une règle de transcription. Pour une opération actuelle, on consulte les instructions officielles et celles du réseau."
    ],
    "example": {
      "text": "Exemple fictif : une mention « Nouvelle édition » appelle une analyse selon les règles de description. La zone UNIMARC 205 fournit ensuite un emplacement pour la mention retenue."
    },
    "takeaways": [
      "Consulter la règle fait partie du travail normal.",
      "Les références historiques ne deviennent pas une prescription universelle actuelle."
    ],
    "complement": "Vérification du 8 novembre 2026 : RDA-FR est un code maintenu et versionné. Pour l’application actuelle d’une règle, consulter ses mises à jour et les consignes de son réseau.",
    "referenceKeys": [
      "rdafr"
    ]
  },
  {
    "id": "1-4",
    "moduleId": 1,
    "order": 4,
    "title": "Comprendre la description bibliographique ISBD",
    "pages": [
      5,
      7
    ],
    "teacher": "Avant de choisir une zone UNIMARC, reconnaissons les informations qui décrivent le document.",
    "paragraphs": [
      "L’ISBD propose un cadre de description bibliographique : les éléments sont regroupés, ordonnés et présentés à l’aide d’une ponctuation conventionnelle. Le pavé ISBD désigne la présentation continue ainsi composée. Sa structure permet de distinguer titre, responsabilités, publication et description matérielle.",
      "Le support utilise le cadre historique des monographies imprimées, avec sept zones effectivement mobilisées parmi les zones numérotées de 1 à 8. L’absence de zone 3 dans ce parcours ne signifie pas qu’il faut ajouter une information artificielle. La description dépend du type de ressource et des règles appliquées.",
      "Une zone ISBD est un regroupement descriptif ; une zone UNIMARC est un champ informatique. Leurs numéros ne se correspondent pas : les informations de la zone du titre en ISBD sont notamment encodées en 200 dans UNIMARC bibliographique. La ponctuation visible ne constitue pas le mécanisme technique de séparation des sous-zones MARC."
    ],
    "example": {
      "text": "Exemple fictif : « Jardins de quartier : concevoir des espaces partagés / Léa Morel ». Le titre, son complément et la responsabilité sont distingués en UNIMARC par 200$a, 200$e et 200$f."
    },
    "takeaways": [
      "ISBD et UNIMARC ne sont pas deux noms du même objet.",
      "Le cadre historique du cours ne définit pas les champs obligatoires de l’application."
    ]
  },
  {
    "id": "1-5",
    "moduleId": 1,
    "order": 5,
    "title": "Les zones de description ISBD",
    "pages": [
      5,
      7
    ],
    "teacher": "Chaque groupe d’informations contribue différemment à l’identification.",
    "paragraphs": [
      "Le titre et les mentions de responsabilité identifient la ressource telle qu’elle se présente. La mention d’édition distingue une version éditoriale annoncée. La publication situe sa production éditoriale. La description matérielle renseigne l’étendue, les illustrations, les dimensions et, éventuellement, le matériel d’accompagnement.",
      "La collection situe la publication dans un ensemble éditorial. Les notes précisent ce qui n’apparaît pas dans la description principale : bibliographie, particularité d’un titre ou histoire d’une édition. Les identifiants, dont l’ISBN, contribuent à distinguer les publications ; ils ne remplacent pas la comparaison des autres éléments.",
      "On n’invente ni collection ni mention d’édition pour remplir une rubrique. La présence d’un élément s’interprète à partir du document et de la règle applicable. Le profil d’un réseau peut préciser les éléments attendus, mais une présentation théorique n’est pas une liste automatique d’obligations."
    ],
    "example": {
      "text": "EXEMPLE FICTIF\nTitre : Jardins de quartier / Léa Morel\nÉdition : 2e édition revue\nPublication : Lyon : Éditions du Passage, 2025\nDescription : 1 vol. (144 p.) : illustrations ; 24 cm\nCollection : Pratiques partagées ; 7\nNote : Bibliographie en fin de volume\nISBN : aucun numéro réel attribué dans cet exemple."
    },
    "takeaways": [
      "Une collection éditoriale n’est pas un rayon de rangement.",
      "Un ISBN identifie une publication, pas un exemplaire local."
    ]
  },
  {
    "id": "1-6",
    "moduleId": 1,
    "order": 6,
    "title": "La ponctuation normalisée",
    "pages": [
      5,
      7
    ],
    "teacher": "La ponctuation aide à reconnaître les fonctions dans une description continue.",
    "paragraphs": [
      "La ponctuation prescrite rend visibles les frontières entre informations. Dans le cadre présenté par Médiadix, la barre oblique introduit une mention de responsabilité. Les deux-points peuvent annoncer un complément du titre ou un éditeur, selon la zone. Le point-virgule peut précéder une autre responsabilité ou les dimensions.",
      "Une même description combine ponctuation transcrite de la source et ponctuation ajoutée pour organiser la présentation. Il faut identifier la fonction d’un élément avant d’appliquer un schéma. Le support montre aussi la séparation entre grandes zones et les parenthèses qui entourent une mention de collection.",
      "Dans une notice structurée, les codes de sous-zones transportent les informations indépendamment de leur affichage. Un logiciel peut générer une partie de la ponctuation publique. La saisir à nouveau partout, sans connaître le profil du système, peut provoquer des doublons."
    ],
    "example": {
      "text": "Exemple fictif : Jardins de quartier : concevoir des espaces partagés / Léa Morel ; illustrations de Sami Perrin. — Lyon : Éditions du Passage, 2025. — 1 vol. (144 p.) : illustrations ; 24 cm."
    },
    "takeaways": [
      "Un signe se comprend dans le contexte de sa zone.",
      "La ponctuation d’affichage ne remplace pas les sous-zones."
    ]
  },
  {
    "id": "1-7",
    "moduleId": 1,
    "order": 7,
    "title": "Où trouver les informations dans un livre ?",
    "pages": [
      8,
      10
    ],
    "teacher": "La couverture est utile, mais elle ne livre pas toujours toute l’histoire éditoriale.",
    "paragraphs": [
      "La page de titre porte généralement le titre développé et les responsabilités. Son verso peut fournir publication, droits, traduction et identifiants. La couverture et le dos peuvent présenter un titre abrégé ou une indication de collection. Les parties liminaires comprennent la page de titre et les pages qui la précèdent, avec leurs versos.",
      "Le catalogueur confronte ces sources sans leur donner automatiquement le même poids. La règle applicable à chaque élément détermine la source privilégiée et les indications nécessaires lorsque l’information vient d’ailleurs. En l’absence de page de titre, un substitut peut être utilisé selon les instructions.",
      "La dernière page numérotée aide à vérifier l’étendue ; l’achevé d’imprimer apporte des indications de fabrication. Publication, impression et copyright ne désignent pas nécessairement le même événement. Il faut identifier la fonction d’une date au lieu de choisir la première visible."
    ],
    "example": {
      "text": "Exemple fictif : la couverture annonce « Jardins partagés », la page de titre « Jardins de quartier : concevoir des espaces partagés ». La différence peut justifier un autre accès titre ; elle ne doit pas être effacée sans analyse."
    },
    "takeaways": [
      "Comparer les sources participe à l’identification.",
      "Publication et impression ne sont pas interchangeables."
    ]
  },
  {
    "id": "1-8",
    "moduleId": 1,
    "order": 8,
    "title": "Lire une description bibliographique complète",
    "pages": [
      9,
      11
    ],
    "teacher": "Rassemblons les informations en distinguant description, accès et exemplaires.",
    "paragraphs": [
      "La description ci-dessous est un exemple original entièrement fictif. Elle rassemble titre, responsabilités, édition, publication, présentation matérielle, collection et note. Aucun ISBN ni identifiant d’autorité réel n’est attribué au document imaginaire. L’exemple sert à lire l’organisation des données, pas à produire un fichier destiné à un SIGB.",
      "La barre oblique annonce la responsabilité transcrite ; l’édition signale une version revue ; l’adresse situe la publication. Le nombre de pages et les dimensions décrivent le volume. La collection est un ensemble distinct du titre propre. La note complète la description sans devenir un second titre.",
      "Des points d’accès peuvent être établis séparément pour les personnes et les sujets. Ils ne sont pas incorporés indistinctement au pavé descriptif. Cote, code-barres et disponibilité dépendent des exemplaires et de la gestion locale. Lire une notice consiste aussi à savoir à quel niveau appartient chaque information."
    ],
    "example": {
      "text": "EXEMPLE FICTIF\nJardins de quartier : concevoir des espaces partagés / Léa Morel ; illustrations de Sami Perrin. — 2e édition revue. — Lyon : Éditions du Passage, 2025. — 1 vol. (144 p.) : illustrations ; 24 cm. — (Pratiques partagées ; 7).\nBibliographie en fin de volume. Index.\nISBN : non attribué dans cet exemple pédagogique."
    },
    "takeaways": [
      "Identifier les informations, consulter les règles, puis structurer.",
      "Distinguer description, points d’accès et données d’exemplaire."
    ]
  }
];
