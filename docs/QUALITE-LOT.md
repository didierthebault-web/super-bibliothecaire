# Qualité du lot — règles, libellés et recette

## Base et périmètre

Base : `origin/main`, commit `da4af629492d3ea04f464ef2ce019364aaaa89f5` (simplification de catalogage fusionnée par PR 5). Aucune PR ouverte ni autre branche qualité au contrôle initial. Le module qualité n’existait pas encore : il a été développé sur `feature/tableau-de-bord-qualite-lots` avec les libellés demandés dès sa création.

L’onglet **Qualité du lot** se trouve dans **Lot de notices**, à côté de **Notices du lot**. Aucun élément n’est ajouté au menu principal. L’ancien parcours et les trois vues de notice sont conservés ; l’exploration réutilise la fiche et l’éditeur existants. Le retour à l’onglet qualité garde les filtres et recalcule les résultats.

## Libellés contractuels et identifiants

La seule source des textes est `src/lot-quality/quality-status.js`, utilisée par les cartes, les filtres, les détails, le récapitulatif commun d’export et le rapport CSV.

| Identifiant interne stable | Libellé exact | Infobulle |
| --- | --- | --- |
| `direct` | Prêtes pour l'export MARC | Notices pouvant être exportées au format .mrc sans réparation technique. |
| `prepared` | Exportables après adaptation technique | Notices nécessitant une adaptation technique sûre, automatique et tracée avant export. |
| `blocked` | Export impossible en l'état | Notices présentant une anomalie technique qui ne peut pas être corrigée automatiquement sans risque d'altération. |

Aucun identifiant, règle, paramètre ou mécanisme de préparation d’export existant n’a été renommé ou modifié. Les objets `ready` et `excluded` du plan d’export restent inchangés. Le nouveau module utilise les identifiants stables ci-dessus ; modifier un libellé n’affecte pas la classification.

La classification réutilise **exactement** `createExportPlan()` et `serializePlan()` : préparation sûre sur copie, encodage par le sérialiseur existant et relecture indépendante. Zéro adaptation tracée signifie `direct`, au moins une adaptation autorisée signifie `prepared`, et une exclusion ou une impossibilité de relecture signifie `blocked`. Les métadonnées d’origine BnF restent prises en compte par la politique d’export commune : une notice d’origine indéterminée ne contourne pas cette politique via le tableau de bord.

Les champs techniques de label recalculés par le sérialiseur font déjà partie des adaptations tracées. Une notice BnF reçue en XML peut donc relever de la deuxième catégorie sans aucun problème documentaire. Les indicateurs documentaires discutables restent inchangés et ne sont pas des obstacles à l’export.

Les deux premières catégories restent exportables. En présence de la troisième, le récapitulatif nomme les exclusions et exige la confirmation explicite de l’export partiel. Ni le tableau de bord ni les observations ne réintroduisent de validation métier obligatoire.

## Indicateurs documentaires

Le référentiel `quality-rules.js` contient treize critères configurables : titre 200$a, responsabilité 200$f/g, accès 7XX, publication 210/214, description 215, collection 225$a, résumé 330$a, indexation 6XX, ISBN 010$a, ARK BnF 003/provenance, données générales 100$a, langue 101$a et pays 102$a.

Une valeur textuelle doit contenir au moins un caractère hors espaces. Une occurrence de zone sans donnée ne suffit pas. Une notice est comptée au plus une fois par critère. La présence d’ARK BnF repose sur une forme normalisable avec le helper existant ; ce n’est pas un contrôle réseau de l’identifiant. La présence d’ISBN signifie qu’une valeur est renseignée, pas qu’elle est certifiée correcte.

Chaque résultat fournit présents, absents, identifiants et pourcentage arrondi à deux décimales. Les taux sont `null` pour un lot vide et aucun pourcentage n’est alors affiché. Il n’existe ni score global ni code rouge/vert de certification. Les absences sont des observations, pas des erreurs de catalogage.

Les groupes ARK et ISBN sont séparés. Les ISBN valides sont normalisés avec les fonctions de `marc.js`, y compris l’équivalence ISBN-10/13. Les identifiants non interprétables ne sont pas regroupés arbitrairement. Une notice appartenant à plusieurs groupes ne compte qu’une fois dans le nombre de notices concernées. Aucune fusion ou suppression n’est réalisée.

La provenance répartit chaque notice dans une seule catégorie. Les métadonnées du connecteur déterminent la méthode ; sinon la provenance reste indéterminée. La somme des effectifs est égale au lot. OCR est prévu dans le référentiel mais sa ligne n’est affichée que s’il existe réellement des notices de cette origine ; aucune fonctionnalité OCR n’est simulée.

## Conservation et actualisation

L’analyse est un calcul pur : seules les notices avec `inBasket === true` sont analysées. Les valeurs ne sont jamais modifiées et aucun deuxième catalogue n’est stocké. Ni l’analyse ni le CSV ne déclenchent de téléchargement MARC ou d’écriture d’historique.

Les données sont relues à l’entrée dans le lot et au changement d’onglet. L’analyse est recalculée après ajout, retrait, sélection ISBN, enregistrement, réinitialisation, restauration ou changement d’option 001 lors du retour au tableau de bord. Le retour de focus détecte aussi les données ou options changées dans un autre onglet. La préférence de masquage de Suzanne est respectée.

Le CSV contient une ligne par notice du lot, les identifiants, titre/auteur/date, provenance, présence de chaque critère (Oui/Non), identifiants partagés, libellé technique exact, nombre d’adaptations, observations et date d’analyse. Il est UTF-8 avec BOM, séparateur point-virgule, cellules échappées et protection contre les formules tableur. Les ISBN sont manipulés et écrits comme des chaînes, sans conversion numérique. Un CSV ne porte pas de schéma de types : à l’import dans un tableur, conserver les colonnes d’identifiants au format texte.

Nom : `Suzanne_qualite_lot_AAAA-MM-JJ_HHMM.csv`, heure Europe/Paris. Le rapport porte sur tout le lot, même si l’explorateur affiche seulement un sous-ensemble.

## Tests exécutés

Avant modification : **47 tests unitaires**, parcours professionnel (8 groupes), pédagogique (9 scénarios), ISBN (13 groupes), glossaire (131 fiches), présentation, indicateurs, URL profondes et GIF Suzanne réussis.

Après intégration : **58 tests unitaires réussis**, dont 11 nouveaux tests qualité ; toutes les suites précédentes rejouées. Le test professionnel a été adapté uniquement pour attendre le chargement asynchrone de l’onglet du lot avant ses assertions.

Les sept groupes du nouveau test navigateur couvrent :

1. Onglets au clavier, libellés exacts sur cartes/filtres/détails, infobulles et exclusion des notices hors lot.
2. CSV complet, mêmes trois libellés, conservation exacte de la base et de l’historique pendant analyse/téléchargement.
3. Exploration des critères, doublons et provenances ; fiche, trois vues, édition et retour conservant le filtre.
4. Export des deux premières catégories et exclusion de la troisième seulement après confirmation, sans modification du lot.
5. Recalcul après option 001, réinitialisation, lot vide, restauration et affichage mobile 390 px sans débordement.
6. Relecture au retour de focus après modification externe du lot.
7. Préférence de masquage de Suzanne respectée dans le nouvel onglet.

Les fixtures techniques des tests sont explicitement simulées et isolées. Les cas de réparation et d’impossibilité technique ne sont pas présentés comme des anomalies observées sur les notices réelles.

## Recette BnF réelle

Trois notices ont été récupérées sans interception réseau : **200 questions concours de bibliothèques**, **Uzmo, penser avec son stylo**, **La Promesse de l’aube**. Les champs sont conservés tels que reçus. Pour les charges de 20, 50 et 100, ces trois sources sont volontairement répétées avec des identifiants locaux distincts afin de tester volumes et doublons : il ne s’agit pas de 100 éditions distinctes.

| Notices dans le lot testé | Directes | Après adaptation | Impossibles | Groupes ARK/ISBN cumulés | Lignes CSV |
| --- | --- | --- | --- | --- | --- |
| 3 sources réelles distinctes | 0 | 3 | 0 | 0 | 3 |
| 20 copies explicites | 0 | 20 | 0 | 5 | 20 |
| 50 copies explicites | 0 | 50 | 0 | 5 | 50 |
| 100 copies explicites | 0 | 100 | 0 | 5 | 100 |

Les trois sources nécessitent uniquement les adaptations déjà tracées par l’export existant. Le classement du tableau et celui du plan d’export concordent. Les instantanés IndexedDB avant/après analyse et CSV sont identiques. Le navigateur affiche les 100 lignes et reste sans débordement global à 390 px. Captures ordinateur/mobile inspectées.

Preuves : `lot-quality-browser.json`, `lot-quality-real.json`. Tests : `lot-quality.test.js`, `lot-quality-browser.cjs`, `lot-quality-real.cjs`. Aucun import Koha n’a été effectué et aucun audit RGAA exhaustif n’est revendiqué.

## Livraison

Fichiers ajoutés sous `src/lot-quality/`, intégration limitée à app.js/index.html et aux tests/documentation. Les moteurs BnF, MARC, ISO 2709, IndexedDB, sauvegardes, cours, glossaire et fichiers de Suzanne restent inchangés. Publication préparée par Pull Request sur le dépôt existant ; fusion après validation.
