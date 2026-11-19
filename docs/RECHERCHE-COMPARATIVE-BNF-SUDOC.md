# Recherche comparative BnF / Sudoc

## Périmètre livré et décision d’accès

Une cinquième carte « Recherche comparative » complète les quatre parcours existants, sans nouvelle rubrique latérale. La BnF est interrogée automatiquement avec le connecteur existant. Le Sudoc est alimenté par **import local de sa réponse XML SRU officielle**, conformément au choix explicite de Didier : « Sans relais : import du XML officiel ». Aucun proxy public, serveur supplémentaire, appel Sudoc caché ou désactivation de la sécurité du navigateur.

Le test depuis l’origine GitHub Pages a échoué avec `TypeError: Failed to fetch` et le diagnostic navigateur `No 'Access-Control-Allow-Origin' header`. Un HTTP 200 obtenu par Node ne prouve pas un accès possible par le navigateur. Le panneau indique donc « Indisponible en accès automatique — import XML possible », jamais « Aucune notice » sur la seule base de CORS.

Sources techniques : [service SRU officiel Abes](https://abes.fr/reseau-sudoc/reutiliser-les-donnees-sudoc/service-sru/), [guide SRU Sudoc](https://abes.fr/wp-content/uploads/2023/05/guide-utilisation-service-sru-catalogue-sudoc.pdf), [formation Sudoc Abes : PPN de neuf caractères](https://documentation.abes.fr/sudoc/doc/Formateur_relais/INIT_FicheFormateurs.pdf). La notice Sudoc est attribuée à l’Abes. Les données peuvent inclure des informations d’exemplaires déjà présentes dans la réponse source ; aucun nouvel exemplaire n’est créé par Suzanne.

## Parcours utilisateur

1. Ouvrir la carte ou `#comparative`, saisir un ISBN-10 ou ISBN-13 (espaces et tirets acceptés).
2. Lancer la recherche BnF. Son résultat n’attend aucun accès Sudoc.
3. Ouvrir le lien officiel Sudoc construit pour cet ISBN et enregistrer la **réponse XML SRU** sur son appareil. Une page HTML du catalogue ou une notice XML isolée n’est pas cette réponse.
4. Confirmer l’origine officielle du fichier puis l’importer. La présence d’un fichier local n’authentifie pas cryptographiquement son éditeur ; la déclaration utilisateur est enregistrée explicitement.
5. Sélectionner librement une candidate de chaque catalogue pour comparer les métadonnées et les zones UNIMARC. Aucune première notice n’est présélectionnée. Le choix direct d’une seule source reste possible.
6. « Choisir la notice BnF » ou « Choisir la notice Sudoc » ajoute au lot commun. Même identité source : réutilisation sans écrasement des modifications locales. Même ISBN : confirmation explicite de l’ajout d’une deuxième notice distincte, sans fusion. Aucune validation métier obligatoire.
7. Préparer l’export MARC habituel. Les notices techniquement impossibles restent dans le lot et ne peuvent être exclues de l’export partiel qu’après bilan et confirmation explicite.

La BnF conserve sa pagination de vingt résultats. Le XML Sudoc correspond à la page téléchargée ; le nombre total et la présence d’autres pages sont indiqués. Pour une autre page Sudoc, modifier `startRecord` dans la requête officielle puis importer cette réponse. Il n’existe pas de pagination réseau automatique Sudoc dans ce mode sans relais.

## Architecture et conservation des données

- `src/sudoc.js` : requête officielle SRU 1.1 `recordSchema=unimarc`, `query=isb=ISBN`, parseur dédié et import UTF-8 strict de 10 Mo maximum. DTD et entités rejetées ; structure SRU, nombre annoncé, label, zones, PPN de neuf caractères, concordance 001/003 et ISBN/équivalent contrôlés. Cette vérification structurelle n’est pas une authentification ni une vérification de clé PPN.
- Les diagnostics réels sont conservés comme erreurs, avec deux conventions observées : code `1/61` accompagné d’un nombre de résultats nul au départ de la recherche signifie absence de résultats ; le Sudoc fournit aussi `1/0` **sans message ni détail** dans des réponses réussies. Seul ce marqueur zéro vide est accepté ; un diagnostic zéro accompagné d’un message est refusé.
- Provenance Sudoc : catalogue, Abes, service `sudoc-sru`, méthode `comparative`, transport `official-xml-import`, déclaration d’origine, PPN, requête/ISBN/URL officielle, URL de notice, date d’import et original XML de chaque notice avec instantané structuré. `retrievedAt` correspond ici à l’import local, pas à une date prétendument certifiée de récupération distante.
- L’enveloppe SRU peut contenir des jetons de session : elle n’est pas enregistrée dans les notices, sauvegardes ou fixtures. Seul le XML bibliographique individuel est conservé.
- Aucune normalisation BnF du PPN ou de 003. Aucun ARK BnF attribué au Sudoc. Les 001, 003 et 801 d’origine sont conservés ; 001 ne peut être omis du fichier que par l’option explicite déjà existante. L’original enregistré reste intact.
- `catalog-provenance.js` centralise l’éligibilité. Les saisies manuelles ne deviennent pas éligibles par la seule présence d’un ISBN/ARK/PPN. Les garanties historiques BnF restent en place ; la méthode comparative y est ajoutée.
- `comparative/compare.js` compare les occurrences par étiquette et multiensemble, jamais par position dans le tableau des zones. Toutes les répétitions et l’ordre des sous-zones à l’intérieur d’une occurrence sont conservés. Les différences textuelles ne constituent pas un jugement de qualité ni une fusion.
- Même générateur ISO 2709, même préparation technique sur copie et même relecture interne indépendante. Le rapport d’export technique reste commun.
- Qualité du lot : catalogue BnF/Sudoc/indéterminé séparé de la méthode ; filtre catalogue, méthode comparative, groupes PPN, colonnes catalogue/identifiant/méthode dans le CSV. Les trois libellés techniques contractuels et leurs identifiants `direct/prepared/blocked` ne changent pas.
- Historique : ISBN, états et erreurs de chaque source, import effectué, source et identifiant choisis. Les recherches échouées n’effacent pas le lot.
- IndexedDB reste en version 2 ; aucune migration ni nouveau magasin. Les sauvegardes V1 et V2 restent compatibles. Aucun effacement automatique du lot ou des traitements ISBN.
- Carte, formulaire, tableaux avec légendes et entêtes, libellés textuels des différences, boutons natifs, focus conservé après sélection et colonnes empilées sur téléphone. Suzanne utilise exclusivement les ressources existantes et respecte son réglage de masquage.

## Recette réelle du 19 novembre 2026

Les résultats ci-dessous sont ceux des services lors du test, pas des valeurs promises pour de futurs appels.

| Cas | BnF | Sudoc officiel SRU |
|---|---|---|
| `9782210064782` demandé par la mission | 0 résultat par ISBN ; la référence `cb435835982` est bien retrouvée par ARK (1 résultat) | HTTP 200, 0 résultat, diagnostic `1/61`, **aucun PPN obtenu** |
| `9782759048991` complément réel | 1 résultat, ARK `cb47040491h`, *200 questions concours de bibliothèques* | HTTP 200, 1 résultat, **PPN `261865854`**, réponse importée localement |

Il n’est donc pas possible d’attester les étapes de comparaison/export Sudoc pour le premier ISBN : aucune donnée ni PPN n’a été inventé. Les étapes de comparaison, ajout direct, doublon explicite et export mixte ont été réalisées avec le second ISBN et les deux notices réelles. Le test Node télécharge le XML pour automatiser l’entrée fichier du navigateur ; cela simule le geste d’import utilisateur, **pas** un fetch Sudoc fonctionnant depuis GitHub Pages.

Rapports : `comparative-real.json` (services réels), `comparative-browser.json` (BnF simulée / XML Sudoc réel figé), `comparative-pymarc.json` (relecture externe). La fixture `sudoc-261865854.xml` reprend les données bibliographiques réelles, sans l’enveloppe de session.

## Vérification et publication

Le tableau de bord qualité a été intégré par la PR #6 (merge `8bc1cf8feb185b69742aeb1fc4ed24a1a8d34fa4`) avant cette branche dédiée `feature/recherche-comparative-bnf-sudoc`.

Commandes de recette :

```text
npm test
node scripts/serve.cjs
node tests/comparative-browser.cjs
node tests/comparative-real.cjs
python tests/check_comparative_pymarc.py
node tests/browser.cjs
node tests/lot-quality-browser.cjs
node tests/batch-isbn-browser.cjs
node tests/learning-browser.cjs
node tests/business-glossary-browser.cjs --prefix
node tests/training-platform-browser.cjs
```

`pymarc 5.4.1` est une dépendance de vérification isolée dans `.verification`, jamais une dépendance de l’application. La relecture compare tous les champs, sous-champs et positions sémantiques du label aux originaux sur les exports mixtes simulé et réel. L’interface publique reste sans framework ni étape de compilation. Les autres parcours, cinq modules/38 leçons, 131 fiches du glossaire, formations et illustrations sont conservés.
