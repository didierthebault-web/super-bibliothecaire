# Rapport de recette — 7 novembre 2026

## Résultats exécutés

`npm test` : 11 tests automatisés réussis. `tests/browser.cjs` : 8 scénarios réussis dans Chromium, aucune erreur JavaScript ; captures bureau et mobile examinées. `tests/feasibility.cjs` : requêtes réseau BnF réelles depuis une origine HTTP locale. Relecture externe : pymarc 5.4.0, toutes les zones et accents du fichier pilote comparés aux objets sources, sans différence.

Les notices utilisées pour la preuve sont réelles ; les données de création manuelle des tests sont des jeux synthétiques explicites, jamais des réponses du service BnF. Aucun cache de fausses réponses n’est intégré à l’interface.

| Scénario | Attendu | Constat / niveau de vérification |
| --- | --- | --- |
| ISBN-13 valide | Recherche BnF après contrôle de clé | Test réseau réel ; la première requête 13 seule ne retrouvait pas l’édition, ajout de la forme équivalente 10 |
| ISBN-10 valide | Notice réelle | 2070360024 : réponse BnF réelle |
| ISBN invalide | Erreur explicite | Test unitaire et navigateur réussis, clé incorrecte signalée |
| ISBN inconnu | Aucun résultat inventé | Comportement zéro résultat observé sur la requête 13 initiale ; absence de fabrication vérifiée par le code, pas de numéro inconnu pérenne garanti |
| ARK BnF | Notice réelle avec 003 unique | cb38499612v : résultat réel ; contrôle d’unicité testé |
| ARK invalide / non bibliographique | Refus syntaxique ou résultat bibliographique seulement | Syntaxe testée ; requête `bib.persistentid` ; test réseau d’une autorité à compléter |
| Titre/Auteur/Date avec résultat unique | Résultat proposé à confirmer | Recherche réelle effectuée, cas unique Titre/Auteur/Date non isolé ; cas unique vérifié par ISBN/ARK |
| Plusieurs éditions | Liste et choix humain | La promesse de l’aube / Romain Gary / 1960 : deux notices réelles |
| Aucun résultat | Message et saisie manuelle | Réponse réseau zéro résultat observée ; aucune notice substituée |
| Récupération UNIMARC réelle | Zones complètes conservées | MarcXchange BnF, modèle structuré, XML source conservé |
| Modification d’une sous-zone | Nouvelle valeur conservée | Titre accentué modifié et vérifié dans les trois vues |
| Zones non modifiées | Pas de perte | Comparaison intégrale des zones à la relecture interne et pymarc |
| Notice incomplète | Erreurs bloquantes | Champs vides, délimiteurs et règles obligatoires testés |
| Validation | Contrôles actifs seulement | Statut enregistré, profil provisoire explicite ; label BnF sans type documentaire désormais bloqué |
| Réouverture | Données persistantes | Rechargement complet du navigateur testé ; fermeture du navigateur et redémarrage du système non testés |
| Doublons dans le lot | Détection ISBN / ARK | Test unitaire réussi ; export nécessite une confirmation explicite pour les doublons |
| Export de plusieurs notices | ISO 2709 réel | Pilote multi-notices réelles généré, répertoire en octets UTF-8 |
| Relecture .mrc | Données identiques | Parseur séparé et pymarc 5.4.0 : égalité des zones et accents |
| Import pilote Koha | Import réel et profil documenté | NON EFFECTUÉ : aucune instance de test disponible ; procédure KOHA.md fournie |
| Sauvegarde / restauration | Transaction cohérente | Téléchargement JSON, restauration après confirmation et retour à l’état original testés dans Chromium |

## Points de vigilance observés

La BnF renvoie des notices avec label décalé et des valeurs 100$a de longueur atypique. L’anomalie du label est documentée par la BnF. L’application conserve ces données mais exige une correction explicite si le type en position 6 manque ; elle avertit sur la longueur du 100. La sérialisation correcte ne garantit pas la qualité bibliographique de la source.

L’accès direct BnF depuis l’origine locale fonctionne. Le déploiement public et les requêtes depuis son origine nécessitent une vérification séparée, consignée après publication si celle-ci est disponible.

## Vérifications restant à faire avant usage professionnel

- Profil métier définitif du réseau : arbitrer les champs réellement obligatoires, les codes et les répétabilités.
- Import dans une base Koha de test et validation de la grille et des règles de rapprochement.
- Audit RGAA complet, lecteurs d’écran, contrastes mesurés et parcours clavier systématique. Libellés, focus visibles, lien d’évitement, états annoncés et réduction des animations sont présents, sans revendication de certification.
- Matrice Firefox/Safari, mode privé et dépassement de quota IndexedDB.
- Tests réseau dédiés des diagnostics SRU, panne, refus HTTP, XML invalide, timeout et blocage CORS ; les traitements sont implémentés mais ces erreurs ne sont pas toutes reproduites dans la recette actuelle.
- Recherche Titre/Auteur/Date sur des corpus professionnels plus larges et variations de dates. Le rapprochement indicatif porte sur les mots du titre ; aucune certitude automatique.
- Vérification des droits de la mascotte avant redistribution par des tiers ; la licence du code reste à choisir par le commanditaire.

Les preuves locales détaillées sont écrites dans `docs/faisabilite.json`, `docs/browser-results.json`, `docs/pymarc-results.json` et `tests/screenshots/`. Les données de travail générées sont exclues du dépôt public et des fichiers servis par GitHub Pages.
