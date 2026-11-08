export default [
  {
    "id": "3-1",
    "moduleId": 3,
    "order": 1,
    "title": "Qu’est-ce qu’un format bibliographique ?",
    "pages": [
      17,
      18
    ],
    "teacher": "Un format rend explicite la place et la fonction des informations pour un système informatique.",
    "paragraphs": [
      "Un format bibliographique définit une structure pour enregistrer des données. Il permet à un logiciel de reconnaître les éléments utiles à la recherche, au tri, à l’affichage et à l’échange. Cette structure est plus fine qu’un paragraphe de description : des éléments distincts sont séparés et identifiés.",
      "Le format ne décide pas à lui seul de la valeur correcte à inscrire. Les règles de catalogage et l’examen du document déterminent le contenu ; l’encodage lui donne une place exploitable. Un même contenu peut être présenté sous plusieurs formes à partir des éléments enregistrés.",
      "Lors d’une récupération, les données qui ne figurent pas dans un formulaire simplifié restent importantes. Des liens, codes et répétitions peuvent servir à des usages invisibles dans la vue publique. Une conversion doit donc être contrôlée au-delà du seul titre affiché."
    ],
    "example": {
      "text": "Exemple fictif : séparer le lieu « Lyon », le nom d’éditeur « Éditions du Passage » et la date « 2025 » permet de les afficher ensemble ou de les exploiter séparément."
    },
    "takeaways": [
      "Format et règles de description ne sont pas interchangeables.",
      "Une vue simplifiée ne représente pas toute la notice."
    ]
  },
  {
    "id": "3-2",
    "moduleId": 3,
    "order": 2,
    "title": "Qu’est-ce que MARC ?",
    "pages": [
      17,
      18
    ],
    "teacher": "MARC signifie que le catalogage est enregistré sous une forme lisible par machine.",
    "paragraphs": [
      "MARC désigne une famille de formats conçus pour traiter et échanger les données de catalogage. Le support replace son origine dans l’automatisation des bibliothèques. Plusieurs formats se sont développés selon les contextes nationaux et les institutions.",
      "Les informations sont distribuées dans des champs identifiés. Des indicateurs et des sous-zones précisent leur sens ou leur traitement. Les données descriptives sont complétées par des valeurs codées et des liens. Un programme peut ainsi distinguer des éléments que le lecteur humain reconnaîtrait dans une phrase.",
      "MARC ne désigne pas un format unique universellement identique : UNIMARC, MARC 21 et INTERMARC ne partagent pas toutes leurs étiquettes ni leurs conventions. Un champ ne doit jamais être interprété à partir de son numéro sans connaître le format et le type de notice."
    ],
    "example": {
      "text": "Exemple de contraste : la zone 200 de l’UNIMARC bibliographique sert au titre et à la responsabilité ; la zone 200 d’UNIMARC Autorités peut contenir un nom de personne. Le même numéro ne suffit pas à identifier le sens."
    },
    "takeaways": [
      "Toujours identifier le format et le type de notice.",
      "MARC n’est pas une simple mise en page typographique."
    ]
  },
  {
    "id": "3-3",
    "moduleId": 3,
    "order": 3,
    "title": "Pourquoi UNIMARC ?",
    "pages": [
      17,
      19
    ],
    "teacher": "UNIMARC a été conçu pour faciliter les échanges entre des producteurs de données différents.",
    "paragraphs": [
      "Lorsque plusieurs bibliothèques utilisent des formats distincts, les échanges nécessitent des correspondances. Le support explique que la multiplication des formats a favorisé la création d’un format commun d’échange : UNIMARC, élaboré dans le cadre de l’IFLA.",
      "UNIMARC peut servir à l’échange et au travail courant. Des réseaux l’emploient avec des consignes ou des adaptations particulières. Une valeur acceptable dans un contexte ne se transfère pas toujours sans analyse dans un autre profil de système.",
      "La compatibilité exige de préserver la structure autant que le sens : indicateurs, sous-zones, répétitions et données codées. Le seul fait qu’un fichier porte l’extension .mrc ne démontre ni sa validité technique ni sa qualité bibliographique. Une relecture et un essai d’import sont des contrôles distincts."
    ],
    "example": {
      "text": "Exemple fictif : une notice reçue d’un réservoir peut alimenter le catalogue local. Il faut vérifier la même édition, les caractères, les liens et les règles d’import du système destinataire."
    },
    "takeaways": [
      "Échanger nécessite des conventions communes.",
      "Une extension de fichier n’est pas une preuve de conformité."
    ]
  },
  {
    "id": "3-4",
    "moduleId": 3,
    "order": 4,
    "title": "La structure d’une notice UNIMARC",
    "pages": [
      20,
      22
    ],
    "teacher": "Le label, le répertoire et les zones ont des rôles techniques différents.",
    "paragraphs": [
      "Le label, aussi appelé guide de notice, porte des informations codées sur la notice et son traitement. Dans un enregistrement ISO 2709, il compte 24 caractères. Le répertoire permet de localiser les zones en indiquant leurs longueurs et leurs positions. Il n’est habituellement pas présenté dans le formulaire de catalogage.",
      "Les zones de contrôle, telles que 001, ne se lisent pas comme les zones de données ordinaires. Ces dernières associent une étiquette, des indicateurs et des sous-zones. Les séparateurs techniques permettent au programme de délimiter les éléments ; les symboles visibles dans un éditeur en sont une représentation.",
      "Une notice bibliographique ne doit pas être confondue avec un exemplaire. Dans Super Bibliothécaire, l’identifiant interne de travail est distinct du 001. Le cours explique cette distinction sans créer ni modifier une notice de production."
    ],
    "example": {
      "text": "Extrait fictif de lecture :\nLDR : guide technique de la notice\n001 : identifiant de notice, lorsqu’il existe\n200 1# $aJardins de quartier $fLéa Morel\nLe signe # représente ici un blanc d’indicateur."
    },
    "takeaways": [
      "Le répertoire ISO 2709 sert à localiser les zones.",
      "Le 001 n’est pas le code-barres d’un exemplaire."
    ]
  },
  {
    "id": "3-5",
    "moduleId": 3,
    "order": 5,
    "title": "Les grands blocs UNIMARC",
    "pages": [
      19,
      22
    ],
    "teacher": "Le premier chiffre d’une étiquette aide à situer sa fonction générale.",
    "paragraphs": [
      "Le format bibliographique organise les zones en dix blocs de 0XX à 9XX. Les premiers distinguent identification, données codées et description ; les suivants accueillent notes, liens, titres associés, sujets et responsabilités. Cette organisation facilite la lecture d’une notice dense.",
      "Une famille n’est pas une règle suffisante pour choisir n’importe quelle zone. Il faut consulter la définition, les indicateurs, les sous-zones et la répétabilité propres à l’étiquette précise. Des informations descriptives sont aussi réparties en dehors du bloc 2XX, par exemple l’ISBN dans le bloc 0XX et les notes dans le bloc 3XX.",
      "Le contenu des zones locales dépend d’accords et de profils. La présence d’une zone 9XX dans une notice récupérée n’autorise pas à la réinterpréter comme une donnée d’exemplaire de son propre établissement. Les conserver, les transformer et les exporter sont des décisions distinctes."
    ],
    "example": {
      "text": "0XX : identification · 1XX : informations codées · 2XX : description · 3XX : notes · 4XX : liens bibliographiques · 5XX : titres associés · 6XX : indexation et histoire bibliographique · 7XX : responsabilités · 8XX : données internationales · 9XX : usages nationaux et locaux."
    },
    "takeaways": [
      "Le bloc donne un repère de lecture, pas toute la définition.",
      "ISBD et UNIMARC ne répartissent pas les éléments selon les mêmes numéros."
    ]
  },
  {
    "id": "3-6",
    "moduleId": 3,
    "order": 6,
    "title": "Comprendre une zone",
    "pages": [
      20,
      24
    ],
    "teacher": "Une zone associe une étiquette à une fonction précise, avec des règles de contenu.",
    "paragraphs": [
      "L’étiquette de trois chiffres identifie la zone en UNIMARC bibliographique. Ainsi, 200 accueille le titre et les responsabilités transcrites, 215 la description matérielle et 225 la collection. La zone a une fonction définie : elle n’est pas un emplacement libre choisi seulement pour son libellé.",
      "La répétabilité indique si une zone ou une sous-zone peut apparaître plusieurs fois dans les conditions prévues. Il faut la vérifier séparément à ces deux niveaux. Plusieurs sujets peuvent nécessiter plusieurs zones ; plusieurs valeurs dans une zone ne justifient pas forcément une répétition de toute la zone.",
      "La lecture s’effectue sur des occurrences réelles : deux zones portant le même numéro peuvent contenir des informations différentes et ne sont pas nécessairement des doublons. Une correction ne doit pas effacer une répétition sans examiner sa fonction."
    ],
    "example": {
      "text": "Exemple fictif :\n215 ## $a1 vol. (144 p.) $cillustrations $d24 cm\n300 ## $aIndex\n300 ## $aBibliographie en fin de volume\nLes deux notes ne disent pas la même chose."
    },
    "takeaways": [
      "La répétabilité d’une zone et celle d’une sous-zone sont distinctes.",
      "Une même étiquette répétée n’est pas automatiquement un doublon."
    ],
    "terms": [
      "200",
      "215",
      "225"
    ]
  },
  {
    "id": "3-7",
    "moduleId": 3,
    "order": 7,
    "title": "Comprendre les indicateurs",
    "pages": [
      20,
      24
    ],
    "teacher": "Les indicateurs sont des valeurs de sens, pas deux chiffres décoratifs.",
    "paragraphs": [
      "Dans les zones de données ordinaires, les deux indicateurs précèdent les sous-zones. Leur interprétation dépend de l’étiquette. Un blanc peut signifier qu’un indicateur n’est pas défini ; il ne doit pas être remplacé mécaniquement par zéro. Le signe # utilisé dans les exemples représente ce blanc.",
      "Un indicateur peut préciser la façon de lire un contenu ou sa relation à une autre information. En 225, le premier caractérise la relation de la mention de collection avec la forme de référence. Il faut comprendre cette relation avant de choisir une valeur.",
      "Une valeur de remplissage rencontrée dans une source ne fournit pas automatiquement la décision attendue par le système destinataire. Le catalogueur distingue une information inconnue d’une information connue mais mal encodée. Corriger un indicateur doit s’appuyer sur le document, la notice et la définition officielle de la zone."
    ],
    "example": {
      "text": "Exemples fictifs :\n700 #1 $aMorel $bLéa : nom entré au nom de famille.\n225 2# $aPratiques partagées $v7 : mention identique à la forme de référence en 410.\nCes valeurs ne constituent pas des valeurs par défaut pour toutes les notices."
    },
    "takeaways": [
      "Le sens d’un indicateur dépend de sa zone.",
      "Un blanc, zéro et une valeur inconnue ne sont pas équivalents."
    ],
    "referenceKeys": [
      "unimarc"
    ],
    "complement": "Complément du manuel UNIMARC : en 225, le premier indicateur est 0 (forme différente), 1 (pas de forme de référence établie) ou 2 (forme identique). Le second est un blanc. Ces choix portent sur la relation, pas sur une simple comparaison automatique de chaînes."
  },
  {
    "id": "3-8",
    "moduleId": 3,
    "order": 8,
    "title": "Comprendre les sous-zones",
    "pages": [
      20,
      24
    ],
    "teacher": "Le code d’une sous-zone prend son sens à l’intérieur d’une zone donnée.",
    "paragraphs": [
      "Les sous-zones subdivisent le contenu d’une zone de données. Dans la représentation lisible, un signe dollar suivi d’un caractère identifie leur code. Le séparateur réel du fichier n’est pas le caractère dollar affiché à l’écran.",
      "Un même code peut désigner des éléments différents selon la zone. En 200, $a contient le titre propre ; en 215, $a renseigne l’étendue ; en 700, $a contient l’élément d’entrée du nom. Lire seulement « $a » sans l’étiquette ferait perdre cette distinction.",
      "Les sous-zones gardent leur ordre et leur répétition lorsqu’ils portent du sens. Une responsabilité transcrite en 200$f n’est pas une autorité simplement parce qu’elle contient un nom. Les données codées, quant à elles, peuvent dépendre de positions fixes : elles ne se corrigent pas comme une phrase libre."
    ],
    "example": {
      "text": "Exemple fictif :\n200 1# $aJardins de quartier $econcevoir des espaces partagés $fLéa Morel $gillustrations de Sami Perrin\n215 ## $a1 vol. (144 p.) $d24 cm\nLe $a ne contient pas le même type d’information dans les deux zones."
    },
    "takeaways": [
      "Lire ensemble étiquette et code de sous-zone.",
      "Le dollar est une convention de présentation."
    ],
    "terms": [
      "$a",
      "$f",
      "$4"
    ]
  },
  {
    "id": "3-9",
    "moduleId": 3,
    "order": 9,
    "title": "Les différentes présentations d’une notice",
    "pages": [
      25,
      26
    ],
    "teacher": "Trois vues peuvent montrer une même notice sans représenter trois fichiers différents.",
    "paragraphs": [
      "Une vue structurée présente les zones, indicateurs et sous-zones pour le travail du catalogueur. Une vue textuelle en donne une lecture compacte. Une vue publique privilégie les informations utiles au lecteur et peut masquer les codes du format.",
      "Ces présentations doivent être dérivées des mêmes données. Corriger le titre dans la vue de travail doit modifier ce titre partout où il est affiché. À l’inverse, un libellé public absent n’autorise pas à supprimer une zone technique de la notice.",
      "Super Bibliothécaire propose ces trois vues : Formulaire UNIMARC, Vue publique et UNIMARC texte. Le présent cours les explique avec des extraits indépendants. Aucune commande pédagogique ne remplit l’éditeur, ne modifie une notice ni ne l’ajoute au lot."
    ],
    "example": {
      "text": "Exemple fictif : la valeur 200$a « Jardins de quartier » apparaît comme un champ de formulaire, comme « =200 1#$aJardins de quartier » en texte et comme titre sans numéro de zone en vue publique."
    },
    "takeaways": [
      "Une notice, plusieurs présentations.",
      "Les données non visibles restent importantes."
    ]
  },
  {
    "id": "3-10",
    "moduleId": 3,
    "order": 10,
    "title": "Lire une notice UNIMARC complète",
    "pages": [
      23,
      26
    ],
    "teacher": "Partons de la fonction des informations pour comprendre l’ensemble de la notice.",
    "paragraphs": [
      "L’exemple ci-dessous est une notice pédagogique originale fictive. Il rassemble les principales zones étudiées, mais il n’est pas une notice complète prête à importer : le label, les données codées exhaustives et les identifiants techniques ne sont pas fournis. Aucun véritable ISBN ou identifiant d’autorité n’est fabriqué.",
      "Le titre et la responsabilité se lisent en 200 ; l’édition en 205 ; la publication en 214 ; la description matérielle en 215. La collection transcrite se distingue du lien bibliographique en 410. La note décrit la bibliographie ; les accès aux personnes se lisent dans le bloc 7XX.",
      "La mention de responsabilité suit la présentation de la ressource, tandis que l’accès à une personne est structuré pour la recherche. Les données d’exemplaire et les décisions locales de prêt n’appartiennent pas à cet exemple. Aucune instruction ne demande de le transformer en notice de production."
    ],
    "example": {
      "text": "EXTRAIT FICTIF — NON EXPORTABLE\n200 1# $aJardins de quartier $econcevoir des espaces partagés $fLéa Morel $gillustrations de Sami Perrin\n205 ## $a2e édition revue\n214 #0 $aLyon $cÉditions du Passage $d2025\n215 ## $a1 vol. (144 p.) $cillustrations $d24 cm\n225 2# $aPratiques partagées $v7\n320 ## $aBibliographie en fin de volume. Index\n410 #0 $tPratiques partagées $v7\n700 #1 $aMorel $bLéa $4070\n702 #1 $aPerrin $bSami $4440"
    },
    "takeaways": [
      "Relier chaque zone à sa fonction.",
      "Un exemple expliqué ne constitue pas un modèle d’export obligatoire."
    ],
    "terms": [
      "200",
      "214",
      "225",
      "700"
    ]
  }
];

