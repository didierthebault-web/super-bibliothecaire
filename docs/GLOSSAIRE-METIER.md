# Glossaire métier — intégration native

## Résultat proposé

Une entrée permanente « Glossaire métier », accompagnée d’une icône de livre ouvert, s’insère immédiatement après « Apprendre à cataloguer ». L’entrée Historique reste conservée, puis Paramètres et À propos. L’entrée utilise le rendu, les styles, les espacements et l’état actif du menu existant. Aucun second menu d’application, aucune iframe et aucune application indépendante ne sont créés.

La page `#glossaire-metier` présente les 131 fiches du glossaire Formations KOHA & BOKEH. Le texte d’introduction et les textes éditoriaux des fiches restent ceux de la plateforme source. Les couleurs et la présentation sont adaptées au cadre violet de Super Bibliothécaire. Le glossaire de 37 définitions du parcours pédagogique reste également accessible à son emplacement initial, sans modification.

## Base et préservation des travaux

La branche `feature/glossaire-metier` part de `origin/main` au commit `710ca020a9a7d88e5fc4906e3a93e90c62cd59c5`, qui comprend la fusion de la formation (PR #1). La recherche des PR ouvertes n’a pas révélé de développement pédagogique non fusionné au début de cette mission. Les preuves locales non suivies de la publication précédente ont été laissées en place.

Les fichiers du cours dans `src/learning/`, les illustrations, la feuille de style principale et les services MARC, BnF, validation, stockage, sauvegarde et export restent inchangés. Seuls le raccordement au menu et au rendu de page, la gestion de la route et le chargement de la nouvelle feuille de style sont ajoutés à l’application principale. Le glossaire n’importe ni le stockage professionnel ni le moteur MARC.

## Source exacte et comparaison

- Dépôt : https://github.com/didierthebault-web/formations-koha-bokeh
- Commit source : `f01242c2bc03f222245fc43333df04191f448d50`
- Date de récupération : 8 novembre 2026.
- Données : 131 entrées, 7 domaines, 38 synonymes et un index de 77 leçons.
- Aucun identifiant, définition, exemple, propriété ou relation n’est réécrit.

Les huit fichiers récupérés à ce commit sont conservés dans `vendor/formations-koha-bokeh/` : les quatre JSON, `lib/glossary.ts`, les deux composants React de référence et le script de contrôle amont. Leurs identifiants de blobs Git sont enregistrés dans `src/glossary/upstream-manifest.json` et vérifiés à partir des octets locaux. Les quatre JSON utilisés par l’interface sont copiés dans `src/glossary/data/`. Les attributs Git empêchent la conversion de leurs fins de ligne sous Windows.

`docs/glossary-import-report.json` constate une égalité binaire et structurelle des quatre JSON, l’identité des huit copies de référence et zéro entrée ajoutée, supprimée ou modifiée. Les relations, catégories, sources et références de leçons sont contrôlées. Aucun lien de leçon ou de source n’est non résolu dans la copie initiale. Aucune anomalie de contenu n’a été corrigée silencieusement.

## Fonctions reprises

- Recherche multi-mots sur termes, synonymes, définitions, exemples, informations métier, correspondances UNIMARC et domaines.
- Normalisation identique au code amont : casse française, ligatures œ/æ, accents, apostrophes et séparateurs.
- Sept domaines avec compteurs calculés sur la recherche active, indépendamment du filtre de domaine, comme dans l’original.
- Alphabet A–Z avec lettres indisponibles désactivées et retour à « Tous ».
- Réinitialisation des trois critères et état sans résultat.
- Cartes avec domaine, terme, définition intégrale et bouton de fiche.
- Modale avec définition, appellations, exemple, données Koha/Bokeh, correspondance UNIMARC, termes associés, formations et sources ; date de révision affichée lorsqu’elle existe.
- Liens entre termes ; focus sur le titre après changement de fiche ; fermeture par bouton, Échap ou arrière-plan ; retour au bouton d’origine ; boucle de focus.
- Chargement statique différé des JSON ; aucune base ni authentification ; message et nouvelle tentative si un fichier ne peut pas être chargé.

Les filtres actifs sont identifiés par `aria-pressed` et une coche, en plus de la couleur. Le nombre de résultats est annoncé dans une zone de statut conservée pendant la saisie. Le module ne mémorise aucune recherche dans IndexedDB. Le chargement tardif d’un JSON ne provoque pas de nouveau rendu d’un formulaire professionnel après changement de page. La fermeture du module retire le blocage de défilement d’une éventuelle modale ouverte.

## Adaptation des liens

Les références `lessonRefs` restent inchangées. Leurs URL sont construites seulement lorsqu’une entrée exacte existe dans l’index des leçons source, avec les paramètres `view=course`, `id`, `module` et `lesson`. Les liens s’ouvrent explicitement sur la plateforme d’origine dans un nouvel onglet. Aucune correspondance vers les cinq modules locaux n’est inventée.

Les sources internes d’origine `?view=document&id=…` deviennent des liens absolus vers Formations KOHA & BOKEH, avec le paramètre de page éventuel. Les liens documentaires externes sont conservés. Les références non résolues resteraient visibles avec un message au lieu de recevoir une URL supposée. Les données originales conservent leurs URL et références non modifiées.

Les liens sont vérifiés structurellement et comparés aux références exactes de l’index ; un audit de disponibilité HTTP de tous les sites tiers n’a pas été effectué. Les éditions variables des manuels et les éventuelles limites documentaires de la source restent celles des fiches amont.

## Recette

État initial : 21 tests automatisés existants réussis sur la base publiée. Après intégration : 26 tests réussis, dont 5 consacrés au glossaire (copie intégrale, équivalence du moteur de recherche, filtres et initiales, liens, comparaison de futures versions).

La recette navigateur existante passe : 8 scénarios couvrant création et modification, trois vues, persistance, lot, export .mrc, sauvegarde/restauration, profil et mobile. La recette pédagogique reste réussie : 9 scénarios couvrant les cinq modules, 38 leçons, glossaire, clavier, préférences et carte Suzanne.

La nouvelle recette navigateur a été exécutée à la racine puis sous `/super-bibliothecaire/` :

1. Menu permanent, ordre des entrées, état actif et page native de 131 fiches.
2. Recherche, accents, variantes, zéro résultat, réinitialisation, sept domaines et alphabet.
3. Ouverture des 131 fiches, comparaison de leurs définitions et exemples aux JSON, présence des informations supplémentaires, liens de formation d’origine, fermeture par Échap et retour du focus.
4. Navigation entre termes associés et boucle de focus clavier.
5. Formation et glossaire pédagogique préservés ; accès au nouveau menu et aux fiches à 390 px.
6. Identité du stockage des notices, du lot, de l’historique et des paramètres avant/après consultation ; lien profond et changement de page depuis une modale ; aucune erreur JavaScript ni ressource locale en erreur HTTP.

Les captures bureau, fiche et mobile ont été examinées. Aucun audit RGAA complet ni matrice de navigateurs n’est revendiqué. Les tests fonctionnels portent sur Chromium.

## Maintenance et comparaison future

Contrôle local : `node scripts/check-glossary-import.mjs`. La commande et les tests comparent la totalité des objets, y compris une propriété supplémentaire inconnue de l’interface.

Pour examiner une version future, récupérer manuellement les quatre JSON d’un commit identifié dans un autre dossier, puis exécuter :

```sh
node scripts/check-glossary-import.mjs --source-dir CHEMIN_VERS_LES_NOUVEAUX_JSON
```

La commande est en lecture seule : elle signale les entrées ajoutées, supprimées ou modifiées, les écarts de référentiels et de blobs. Un résultat différent renvoie un code d’échec ; il ne remplace aucun fichier. Après validation humaine, une mise à jour doit renouveler la copie amont, les données et le manifeste ensemble, puis relancer les tests. Aucune synchronisation automatique n’est installée.

Cette branche est proposée dans une Pull Request documentée. La production actuelle reste sur `main` jusqu’à validation de l’intégration.
