# Super Bibliothécaire V2.1 — catalogage par lot d’ISBN

## Parcours

La carte **Par lot d’ISBN** remplace la carte inactive Première de couverture, conformément à la précision de l’utilisateur. Les quatre cartes sont actives : ISBN, ARK BnF, Titre / Auteur / Date et lot d’ISBN. Aucun OCR n’existait et aucun module OCR n’a été supprimé. Le menu principal reste identique.

1. Ouvrir la carte ou le lien interne `#lot-isbn`.
2. Coller un ISBN par ligne, ou importer localement un TXT/CSV UTF-8. Le CSV affiche un aperçu, permet d’indiquer la présence d’un en-tête et exige de choisir la colonne ISBN. Les champs entre guillemets, les séparateurs et les retours à la ligne dans les cellules sont pris en charge. Les valeurs restent des chaînes.
3. Cliquer sur **Vérifier les ISBN**. Les valeurs invalides et les doublons restent visibles, avec leur ligne d’origine. **Corriger ou retirer des lignes** permet de revenir à la saisie ; le traitement précédent demeure enregistré.
4. Cliquer sur **Lancer la recherche BnF**. Au maximum 100 entrées non vides, doublons compris. Aucune troncature silencieuse et aucun appel pour un ISBN invalide.
5. Utiliser Pause, Reprendre ou Annuler. Un traitement interrompu reste disponible dans la liste des traitements ; il ne redémarre pas automatiquement. L’annulation conserve les résultats acquis.
6. Examiner les candidates, consulter leur fiche et comparer deux notices. Choisir explicitement **Retenir cette notice**, même s’il n’y a qu’une réponse.
7. **Ouvrir dans l’éditeur** crée un brouillon distinct, puis ouvre les trois vues existantes. Les correspondances locales peuvent être examinées ; créer malgré une correspondance demande une décision explicite. Revenir plusieurs fois à la même sélection rouvre la même notice locale.
8. Corriger, **Contrôler et enregistrer**, puis ajouter au lot depuis le parcours habituel ou revenir au traitement, cocher les notices contrôlées et utiliser l’ajout groupé. Le profil actif est relu dans la transaction d’ajout. Une sélection invalide annule tout l’ajout groupé.
9. Exporter le panier habituel en `.mrc`, ou télécharger le bilan CSV du traitement (qui ne remplace pas le MARC).

Les titres des réponses uniques sont affichés à titre indicatif avant sélection, sans décision automatique. Les résultats multiples restent ambigus jusqu’au choix humain. Une candidate dont la zone 010 ne contient pas l’ISBN recherché est signalée pour examen.

## Architecture et conservation des données

| Module | Responsabilité |
| --- | --- |
| `import.js` | TXT, CSV, décodage UTF-8 strict, ISBN canoniques via marc.js, traçabilité des lignes, limite 100 |
| `model.js` | Modèle versionné du traitement, compteurs, contrôle des sauvegardes |
| `queue.js` | File séquentielle, pagination, persistance progressive, reprise, retry borné, interruption |
| `store.js` | Mutations transactionnelles, sélection humaine, adoption sans écrasement, ajout groupé |
| `results.js` | Correspondances ARK/ISBN et statuts |
| `report.js` | Bilan CSV UTF-8 avec protection des cellules interprétables comme formules |
| `view.js`, `style.css` | Interface native, tableaux défilables, filtres, aides clavier/clic et Suzanne officielle |

La même base IndexedDB `super-bibliothecaire` passe de la version 1 à 2. La migration ajoute seulement le magasin `batchJobs` ; elle ne réécrit pas `records`, `history` ou `settings`. Les connexions courtes sont fermées après transaction et sur changement de version. Un onglet bloquant la migration doit être fermé, puis la page rechargée. Cette stratégie suit les [événements de version IndexedDB documentés par MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).

Les candidates restent exclusivement dans `batchJobs` jusqu’au choix humain. Leur adoption utilise `records.add()` avec un nouvel identifiant, dans la même transaction que le lien au traitement : aucune notice locale n’est remplacée. Les champs bibliographiques, le XML source, les indicateurs et les répétitions sont conservés. La provenance interne ajoute `method: batch-isbn`, `batchId`, les ISBN d’origine et la date de choix ; aucune zone MARC n’est inventée.

Un verrou Web Locks empêche deux orchestrateurs de fonctionner simultanément entre onglets de la même origine. Le navigateur doit proposer cette API pour lancer une recherche. Un jeton d’exécution vérifié dans chaque mutation empêche une réponse tardive d’écraser un traitement après pause, annulation ou restauration. Un rechargement libère le verrou ; la reprise réinitialise seulement les requêtes restées « en cours », en conservant résultats, pages récupérées et décisions.

Le connecteur et le parseur BnF existants sont réutilisés. L’extension optionnelle du connecteur permet l’annulation, le délai configurable et les métadonnées HTTP. Les recherches unitaires gardent leur délai de 25 secondes par défaut. La file utilise une requête à la fois, trois tentatives maximum par page en cas d’erreur transitoire, une temporisation progressive et `Retry-After` lorsqu’il est accessible. Aucun quota BnF n’est supposé. Les réponses paginées sont conservées page par page ; les résultats multiples ne sont jamais remplacés par la seule première notice.

Les compteurs distinguent entrées d’origine, ISBN canoniques recherchés, candidates reçues et ARK distincts. Un ISBN commun est seulement une correspondance potentielle ; il ne provoque aucune fusion. Les candidates sans ARK exploitable sont comptées séparément.

## Sauvegardes

- Le téléchargement global produit le format JSON **version 2** : records, history, settings et batchJobs, lus dans une transaction cohérente.
- La nouvelle application accepte les sauvegardes **V1 et V2**. La validation de toutes les données précède la restauration.
- Restaurer une V1 remplace, après confirmation, les données professionnelles et vide les traitements ISBN (absents de ce format). Les anciennes notices restent conformes au format d’origine.
- Restaurer une V2 rétablit les candidates et décisions, invalide les jetons réseau et remet les traitements actifs en pause. Aucune recherche n’est automatiquement relancée.
- La restauration est atomique sur les quatre magasins. Une erreur de transaction annule les écritures ; une réponse en cours ne peut pas recréer un traitement supprimé par la restauration.
- La compatibilité est ascendante : l’ancienne application V1 ne sait pas lire une sauvegarde V2. Ne pas rétrograder l’application après migration du schéma.

## Vérifications exécutées

L’état initial est décrit dans `V2-1-ETAT-INITIAL.md`. Les tests de référence ont été exécutés avant modification.

| Suite après intégration | Résultat |
| --- | --- |
| `npm test` | 40 tests réussis, dont 26 préexistants et 14 propres au lot ISBN |
| `node tests/browser.cjs` | 8 scénarios professionnels réussis : éditeur, validation, vues, panier, export, profil, sauvegarde/restauration, mobile, ISBN invalide |
| `node tests/learning-browser.cjs` | 9 scénarios réussis : 5 modules, 38 leçons, navigation, glossaire pédagogique, mascotte/hommage et conservation des données |
| `node tests/business-glossary-browser.cjs --prefix` | 6 groupes de contrôles réussis, dont 131 fiches, filtres, clavier et mobile |
| `node tests/training-platform-browser.cjs` | 4 groupes de contrôles réussis : page, PNG officiel, lien, menu responsive, données préservées |
| `node tests/batch-isbn-browser.cjs` | 13 groupes de contrôles réussis sous `/super-bibliothecaire/` |

Les nouveaux contrôles navigateur couvrent une migration native réelle V1→V2, la pause pendant une requête puis reprise après rechargement, le retry 503, les réponses multiples et vides, la sélection humaine, le doublon local, l’adoption dans l’éditeur, l’ajout au panier mixte et son export `.mrc` relu par le second parseur, le CSV, les sauvegardes V1/V2, le profil changé dans un autre onglet, le verrou inter-onglets, la restauration pendant une requête et les échecs transactionnels. Le modèle et les tests de file couvrent également l’annulation et les réponses tardives.

Les recherches unitaires réelles ont également été vérifiées avec `tests/feasibility.cjs` : ISBN-13 (1 réponse), ISBN-10 équivalent (1), ARK (1), Titre/Auteur/Date (2), sans erreur. Le préfixe du cours a été contrôlé par `tests/learning-prefix.cjs`. Le fichier MARC du panier mixte simulé a en outre été relu avec pymarc : deux notices lisibles, accents conservés.

Les réponses SRU des suites automatisées sont explicitement simulées. La charge simulée fait réellement passer **20, 50 puis 100 ISBN canoniques distincts** dans le connecteur, le parseur et le stockage IndexedDB, sans modifier records/history/settings. Le jeu simule volontairement le même ARK sur plusieurs réponses pour exercer les correspondances : 100 candidates ne représentent donc pas 100 notices bibliographiques uniques. Les temps de cette simulation ne sont pas des performances réseau.

Captures ordinateur/mobile inspectées : `tests/screenshots/batch-isbn-results.png` et `batch-isbn-mobile.png`. Les contrôles de visibilité du focus et les aides utilisent les composants HTML natifs ; il ne s’agit pas d’un audit RGAA complet. Aucun nouvel import dans une instance Koha n’a été réalisé.

## Recette BnF réelle

`node tests/batch-isbn-real.cjs`, exécuté le 8 novembre 2026, sans interception réseau. Mesures observées, non garanties :

| Entrées non vides | Identifiants canoniques | Requêtes, reprise incluse | ISBN avec résultat | Sans résultat | Erreurs | Durée |
| --- | --- | --- | --- | --- | --- | --- |
| Les 10 ISBN fournis | 10 | 10 | 9 | 1 | 0 | 4,185 s |
| 20 | 11 | 11 | 10 | 1 | 0 | 4,433 s |
| 50 | 11 | 11 | 10 | 1 | 0 | 4,442 s |
| 100 | 11 | 11 | 10 | 1 | 0 | 4,098 s |

Les jeux 20/50/100 complètent les dix ISBN fournis avec des répétitions, des variantes à tirets, une valeur invalide et un identifiant d’épreuve. Ils vérifient la déduplication : **ce ne sont pas 100 recherches réelles distinctes**. Le jeu 100 vérifie aussi une interruption et une reprise sans répéter les succès. Aucune ambiguïté n’a été observée dans ces réponses réelles ; les cas multiples sont couverts par les tests simulés.

L’ISBN `9782825713525` n’a renvoyé aucune notice à la BnF lors de cette recette. L’identifiant d’épreuve `9780000000002` a, lui, renvoyé une notice : le bilan conserve la réponse observée au lieu de présumer qu’un numéro est inconnu. Les résultats et titres exacts figurent dans `batch-isbn-real.json`.

La recette réseau utilise une seule tentative par page pour mesurer les résultats sans masquer une panne par des retries ; l’application conserve trois tentatives par défaut. Les données de travail locales des utilisateurs n’ont pas été consultées ou publiées.

## Publication

Branche dédiée `feature/v2-1-lot-isbn`, proposition de fusion vers main. Les workflows existants restent conservés ; npm test inclut les nouveaux tests. Mise en ligne après validation explicite. Prévisualisation locale isolée : `http://127.0.0.1:8793/#lot-isbn`.
