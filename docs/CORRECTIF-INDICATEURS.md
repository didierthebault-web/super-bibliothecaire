# Correction du blocage Koha — 7 novembre 2026

Le lot transmis contient trois notices ISO 2709 lisibles. Le deuxième indicateur vaut `|` dans trois zones 700 et deux zones 702. Koha signale « Indicateurs erronés » dans son éditeur avancé.

Ces cinq points d’accès contiennent $a (nom de famille) et $b (prénom). Selon le manuel UNIMARC/B, le deuxième indicateur doit alors valoir `1`. Le précédent contrôle vérifiait uniquement que les indicateurs étaient des caractères ASCII ; il était insuffisant.

Correction de l’application : contrôle des indicateurs 700/701/702 avant validation et export, y compris pour les notices déjà en lot. L’éditeur propose une correction explicite et tracée vers `1` lorsque $b est présent et $d absent. Aucun choix n’est inféré sans $b ou pour un cas ambigu avec $d. Les données BnF originales restent dans les métadonnées et les autres zones restent inchangées.

Le fichier corrigé remis au commanditaire conserve les trois notices et toutes leurs sous-zones. Seuls les cinq indicateurs ont été changés ; les positions calculées ISO 2709 sont recalculées. La comparaison avec pymarc vérifie les champs et les accents.

15 tests du moteur passent ; la recette navigateur vérifie le blocage d’une ancienne notice validée, l’application du correctif, sa traçabilité et son ajout au lot après contrôle.

Ce correctif vise l’erreur observée sur la capture. Le nouvel essai dans l’instance Koha du commanditaire reste nécessaire pour attester l’import complet. Les avertissements sur 100$a et les particularités des données BnF sont distincts de cette correction.

Référence : https://www.transition-bibliographique.fr/B700_fre (indicateurs et définition de $b ; mêmes règles de forme du nom pour 701/702).
