# Catalogage et export simplifiés — novembre 2026

## Parcours courant

Après une recherche BnF par ISBN, ARK ou Titre/Auteur/Date, **Choisir cette notice** enregistre et ajoute immédiatement la notice au lot. Les résultats restent affichés pour poursuivre les recherches. Aucun contrôle documentaire ni statut « Validée » n’est exigé. **Voir la notice** et **Comparer** ne modifient pas le lot.

La sélection d’une réponse reste humaine, même pour les résultats multiples. Une même identité BnF (ARK, à défaut identifiant 001 puis XML source) est réutilisée : ses éventuelles modifications locales ne sont pas remplacées par une nouvelle récupération. Si elle est déjà dans le lot, un dialogue l’indique et propose explicitement de créer une copie distincte. Un ISBN partagé n’est jamais utilisé seul pour fusionner deux éditions.

Dans un traitement d’ISBN, **Retenir cette notice** effectue la sélection, l’enregistrement, l’ajout au panier commun et le lien au traitement dans une transaction. Le bouton **Retenir une copie distincte** est disponible en cas de correspondance locale. L’éditeur reste accessible facultativement. L’import CSV/TXT, le contrôle des ISBN, les recherches, la pagination, les erreurs réseau, la pause/reprise, les données temporaires et le bilan CSV sont conservés.

Les trois vues et toutes les modifications UNIMARC restent disponibles. **Enregistrer les modifications** ne lance pas de validation métier et ne retire pas la notice du lot. Le XML BnF original est consultable depuis l’éditeur. Le changement du profil facultatif n’invalide ni ne retire les notices.

La provenance exigée comporte la source exacte du connecteur, la méthode de recherche, la date de récupération et le XML bibliographique original. Les nouvelles récupérations portent aussi `service: bnf-sru` et un instantané structuré original. Les métadonnées des anciennes récupérations BnF restent reconnues sans migration. La seule présence d’un ISBN ou d’un ARK, ou d’un simple libellé de source, ne suffit pas. Comme les autres données locales, ces métadonnées ne constituent pas une signature cryptographique d’une sauvegarde modifiée extérieurement.

Les saisies manuelles restent enregistrables et consultables, mais n’entrent pas dans le lot BnF par ajout direct. Une ancienne sauvegarde contenant une saisie manuelle déjà cochée n’est pas effacée : son origine non attestée apparaît dans le récapitulatif d’export, avec exclusion explicite et confirmation pour exporter les autres notices.

## Réinitialiser le lot

Le bouton de la rubrique Lot de notices ouvre un dialogue avec Annuler et Confirmer la réinitialisation. La transaction parcourt les notices et met seulement `inBasket=false`. Aucun `clear()` n’est effectué. Les notices, leurs modifications, les historiques, les paramètres et les traitements ISBN restent conservés. L’état du récapitulatif d’export est invalidé. Un deuxième vidage ne produit pas d’erreur et les notices peuvent rejoindre un nouveau lot.

## Validation documentaire et transport

`marc.validate()` reste disponible comme moteur documentaire facultatif et dans les tests. Il n’intervient plus dans l’ajout au panier ou l’export. Les assertions historiques qui attendaient un rejet pour les indicateurs 225/700/701/702 ont été adaptées : le moteur documentaire continue de les signaler, tandis que le sérialiseur les transporte sans les modifier.

`export-technical.js` prépare une copie ; `export-plan.js` établit le bilan et vérifie le fichier ; `basket.js` centralise l’appartenance au panier et sa réinitialisation ; `bnf-provenance.js` définit l’origine et l’identité. Aucune dépendance d’exécution, aucun second sérialiseur ou parseur SRU, aucun nouveau schéma IndexedDB n’a été introduit. Les sauvegardes restent au format V2, avec restauration V1/V2.

### Liste fermée des adaptations techniques

| Règle | Effet sur la copie d’export |
| --- | --- |
| `record-length` | Recalcul des cinq octets de longueur totale du label |
| `base-address` | Recalcul de l’adresse de début des données, selon le répertoire réel |
| `indicator-subfield-length` | Positions 10–11 du label : deux indicateurs et identifiant de sous-zone de deux octets |
| `directory-entry-map` | Positions 20–23 : `4500`, correspondant aux entrées de répertoire de 12 octets déjà utilisées |
| `missing-indicator-to-space` | Remplacement d’un indicateur réellement absent (`null`, `undefined`, chaîne vide) par un seul blanc technique |

Le sérialiseur produit également les répertoires, offsets et délimiteurs ISO 2709. Chaque adaptation est tracée avec identifiant de notice, zone/position, anomalie, valeur d’origine, valeur exportée, règle et date. Le rapport est téléchargeable avant l’export et conservé dans l’événement d’export de l’historique.

Les caractères ASCII d’indicateurs existants, y compris `|`, restent inchangés. Aucune date, personne, titre, donnée codée, autorité, identifiant ou valeur bibliographique n’est corrigé. Un indicateur à plusieurs caractères ou non ASCII, un label de longueur inconnue, une structure ambiguë, une valeur Unicode impossible à encoder sans perte, un délimiteur incorporé ou une limite de taille dépassée entraînent un diagnostic ; aucune donnée n’est devinée ni tronquée. La présence et le contenu documentaire d’une zone ne sont pas rendus obligatoires pour le transport. Le paramètre explicite d’exclusion de 001 reste conservé ; 003 et les autres zones ne sont pas supprimées.

### Exports complets et partiels

Les doublons sont des avertissements et n’imposent aucune case de confirmation. Le récapitulatif distingue les notices sérialisables et les exclusions, nommées avec leur diagnostic. Si une exclusion existe, le téléchargement des autres notices exige une confirmation d’export partiel. Si aucune notice n’est sérialisable, seul le diagnostic/rapport est disponible. Le panier n’est jamais réduit par l’export.

Le fichier est relu par `iso-reader.js` ; son nombre de notices, les labels préparés et l’intégralité des zones/sous-zones sont comparés aux copies préparées. Les modifications du lot entre le récapitulatif et le téléchargement invalident le récapitulatif. Les originaux de la base ne sont pas réécrits.

## Résultats de recette

Référence avant modification : voir [SIMPLIFICATION-REFERENCE.md](SIMPLIFICATION-REFERENCE.md).

- **47 tests unitaires réussis** : 40 préexistants (quatre attentes de blocage documentaire adaptées au nouvel arbitrage) et sept nouveaux tests de préparation/provenance/export.
- **Huit groupes professionnels réussis** : saisie manuelle, trois recherches BnF, consultation/comparaison sans ajout, sélection directe, réutilisation et copie explicite, trois vues, enregistrement conservant le lot, changement de profil non bloquant, export de doublons, réinitialisation confirmée/idempotente, sauvegarde/restauration, rapport technique, export partiel confirmé, aucune notice sérialisable, lot simulé de 20 ISBN et mobile.
- **Treize groupes ISBN réussis** : migration V1→V2, pause/reprise, erreurs, ambiguïtés, adoption sans éditeur obligatoire, données locales préservées, CSV, sauvegardes V1/V2, 20/50/100 ISBN simulés, 100 lignes, profil facultatif, concurrence inter-onglets, restauration pendant une requête et rollback.
- **Neuf scénarios pédagogiques**, les **131 fiches du glossaire**, les **quatre cartes Formations KOHA & BOKEH**, les URL profondes et l’animation officielle de Suzanne ont été vérifiés. Aucun fichier de cours, de glossaire ou d’illustration n’a été modifié.
- Le test navigateur des indicateurs vérifie désormais que 225/700 restent exportables avec `|`, sans panneau obligatoire et sans remplacement bibliographique.

Les fixtures SRU sont identifiées comme simulées dans les tests automatisés. Les scénarios d’anomalies techniques modifient uniquement ces fixtures de test, jamais les notices de la recette réseau réelle.

### BnF réelle, sources non modifiées

Recette du 19 novembre 2026, sans interception réseau :

| Recherche | Notice retenue | Anciennes erreurs documentaires constatées | Résultat |
| --- | --- | --- | --- |
| ISBN 9782759048991 | 200 questions concours de bibliothèques | 225, 700 et 702 | Ajout et export immédiats |
| ARK cb45724568r | Uzmo, penser avec son stylo | 700 | Ajout et export immédiats |
| Titre/Auteur/Date | La Promesse de l’aube | 225 et 700 ; deux candidates | Choix humain puis ajout/export |

Ces trois notices ont été exportées ensemble sans correction des champs sources. La réinitialisation a conservé les trois enregistrements et leur historique. Un second scénario réel a soumis **20 lignes (les dix ISBN du jeu utilisateur répétés deux fois)** : dix recherches distinctes, neuf notices trouvées et retenues, un ISBN sans résultat. Les neuf notices ont été exportées sans ouverture d’éditeur. Ce n’est pas un jeu de vingt identifiants distincts ; ce dernier volume est couvert par les fixtures automatisées.

Les cinq fichiers produits ont également été relus avec **pymarc 5.4.1** : export simulé de trois notices, partiel de deux, lot simulé de vingt, trois notices réelles et lot réel de neuf. Les zones/sous-zones, répétitions et accents sont identiques au parseur de relecture, soit 37 lectures de notices au total (pas 37 notices uniques).

Preuves : `simplification-browser.json`, `simplification-real.json`, `simplification-pymarc.json`, `batch-isbn-browser.json`. Captures inspectées sur ordinateur et mobile dans `tests/screenshots/` (non publiées avec les données locales).

## Limites et publication

Aucun import Koha n’a été réalisé : la relecture MARC ne remplace pas une recette sur l’instance destinataire. Le format est techniquement vérifié, mais les données bibliographiques discutables restent volontairement présentes pour traitement ultérieur dans le SIGB. L’accessibilité clavier/mobile a été exercée ; aucun audit RGAA exhaustif n’est revendiqué.

Branche dédiée, Pull Request documentée, tests locaux et CI, puis fusion et publication GitHub Pages conformément à la section 23 de la mission. L’URL publique reste inchangée. La recette réelle doit être rejouée sur cette URL dans un navigateur isolé, sans accès à la base personnelle de l’utilisateur.
