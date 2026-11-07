# Architecture et arbitrages

## Frontal statique et services séparés

Choix : modules JavaScript ES natifs, sans compilation ni dépendances d’exécution, pour un hébergement GitHub Pages simple et reproductible. React/TypeScript/Vite étaient une possibilité, pas une obligation. Une migration vers TypeScript reste possible sans modifier le modèle MARC.

- `src/marc.js` : modèle de notice, normalisation ISBN/ARK, validation, vues dérivées et sérialisation ISO 2709.
- `src/iso-reader.js` : parseur distinct, basé sur les positions en octets du répertoire ; utilisé avant chaque export.
- `src/bnf.js` : connecteur SRU, construction CQL, lecture MarcXchange, provenance et délais.
- `src/profile.js` : liste fournie par le commanditaire et contrôle de la configuration métier.
- `src/storage.js` : IndexedDB version 1, stores records/history/settings, transactions et restauration atomique.
- `src/app.js` : composants de rendu et orchestration : CatalogingMethodSelector, SearchResults, UnimarcEditor, PublicRecordCard, ValidationPanel, MascotAssistant, RecordBasket, HistoryManager, SettingsPanel et gestionnaire d’export.

Les trois recherches partagent le connecteur ; leurs formulaires et contraintes restent distincts. Le moteur MARC ne dépend ni du DOM ni du stockage. L’analyse XML est propre au navigateur. Un nouveau connecteur peut implémenter `search(mode, criteria, start)` et renvoyer le même modèle.

## BnF et conservation

SRU 1.2, schéma `unimarcXchange`, pages de 20 résultats. ISBN : clé contrôlée, recherche sur les deux formes équivalentes 10/13 quand elles existent. ARK : index `bib.persistentid`, pas un index d’autorité. Titre/auteur : tous les mots normalisés ; année : `bib.publicationdate`. Aucun résultat n’est sélectionné automatiquement.

Les zones et sous-zones sont conservées dans l’ordre, avec répétitions et indicateurs. Le XML d’origine reste dans les métadonnées de provenance. L’ARK est normalisé dans une seule zone 003. Aucun 001 n’est créé ; une préférence permet d’exclure les 001 d’origine de l’export sans les effacer de l’espace de travail.

La BnF a renvoyé des notices avec type de document manquant en position 6 du label. Ces notices doivent être corrigées explicitement avant export. Les données codées 100$a atypiques sont signalées. Aucun type documentaire ou aucune date n’est inventé. Les positions calculées du label (longueur, base, répertoire, longueurs d’indicateurs et codes) sont recalculées à l’export ; les autres positions sont conservées.

## Validation

Contrôles structurels implémentés : label ASCII sur 24 caractères et type présent, étiquettes numériques, contrôle/données, indicateurs ASCII, codes de sous-zone, valeurs vides, délimiteurs interdits, non-répétabilité de 001/003/005, limites de taille ISO 2709. Ce n’est pas un dictionnaire exhaustif des règles UNIMARC.

Règles métier configurables : niveaux required/recommended/optional, présence, sous-zones, répétabilité, indicateurs et valeurs codées. L’absence des champs de la liste « si disponibles » ne bloque pas l’export. Un changement de profil retire les notices du lot et impose un nouveau contrôle. Un changement de notice invalide son ancien statut.

## ISO 2709 et UTF-8

Les longueurs et positions du répertoire portent sur les octets UTF-8. Terminateurs : 0x1E (zone), 0x1D (notice), 0x1F (sous-zone). Longueur de répertoire : 12 octets par zone (3/4/5). Chaque fichier est relu et ses zones comparées avant téléchargement. La recette ajoute une relecture externe avec pymarc en UTF-8, ce format étant UNIMARC et non MARC21.

Les déclarations de jeux de caractères des données sources sont conservées, sans prétendre effectuer un contrôle complet de toutes les positions codées. Les notices manuelles nécessitent la vérification du 100 et du profil d’import avec le catalogueur avant emploi professionnel.

## Stockage et confidentialité

IndexedDB versionné avec migration initiale `onupgradeneeded`. Les prochaines versions devront ajouter une migration explicite. Restauration des trois stores dans une transaction unique après validation et confirmation. La sauvegarde JSON est versionnée ; une version future inconnue est rejetée. L’effacement de l’origine supprime les données locales. La BnF reçoit les critères de recherche. Aucun suivi analytique.

## Obstacles et extensions

L’accès direct BnF fonctionne dans la recette locale, sans relais. Une erreur réseau/CORS est explicitée. Si les conditions de service changent, un relais séparé pourra transmettre uniquement des requêtes SRU prédéfinies, avec limitation de débit, cache court et origines autorisées ; aucune URL arbitraire ni clé secrète dans le frontal. Aucun backend complet n’est justifié à ce stade.

V2 : un module de couverture pourra retourner des critères à confirmer, puis utiliser le connecteur. Il ne devra créer ni métadonnées non vérifiées ni URL 856 publique fictive. Hébergement durable et droits des couvertures à définir.

Sources consultées le 7 novembre 2026 :

- https://api.bnf.fr/api-sru-catalogue-general
- https://api.bnf.fr/index.php/fr/perturbations-en-cours-sur-les-donnees-et-services-du-catalogue-general
- https://www.transition-bibliographique.fr/wp-content/uploads/2018/07/B100-6-2010.pdf
