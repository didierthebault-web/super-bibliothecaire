# Import pilote Koha — à effectuer

Aucune instance de test Koha n’a été fournie. Aucun succès d’import Koha n’est déclaré.

1. Utiliser une base de test Koha configurée en UNIMARC et conserver sa version et le nom de la grille bibliographique.
2. Récupérer plusieurs notices BnF, vérifier leurs données et corriger explicitement les éventuelles anomalies du label. Vérifier le 100 et la déclaration UTF-8 ; conserver la provenance originale.
3. Appliquer le profil métier validé par le réseau, contrôler les notices, les ajouter au lot.
4. Choisir la règle de conservation des 001 selon les règles de rapprochement Koha. Ne pas confondre 003 ARK et identifiant interne de Koha.
5. Exporter le lot `.mrc` après examen des doublons. Le fichier `tests/pilote-bnf.mrc` est produit localement par la recette, sans données d’exemplaire.
6. Dans les outils Koha de préparation des notices MARC à l’import, choisir UTF-8, notices bibliographiques et une règle de rapprochement documentée ; ne pas importer d’exemplaires.
7. Inspecter les notices préparées, puis importer dans la base de test. Comparer le nombre de notices, les accents, 003, 010, 100, 200, 210/214, 215, 6XX, 7XX et 856. Contrôler les indicateurs et répétitions en vue MARC.
8. Documenter les éventuelles transformations appliquées par Koha : 001, identifiants système, grilles et règles de fusion. Exporter les notices depuis Koha pour comparer les données utiles.
9. Consigner date, version Koha, grille, encodage, rapprochement, résultat, erreurs et décision de recette. Tant que ce test n’est pas réalisé, ne pas annoncer la compatibilité Koha comme validée.
