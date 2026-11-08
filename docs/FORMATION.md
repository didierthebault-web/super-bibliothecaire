# Apprendre à cataloguer — présentation et recette

## Extension proposée

Une rubrique « Apprendre à cataloguer » s’ajoute au menu de Super Bibliothécaire. Elle comprend cinq modules et 38 leçons : 8 pour les fondamentaux, 6 pour la transition bibliographique, 10 pour UNIMARC, 6 pour les accès et 8 pour les autorités. Les leçons contiennent une introduction de Suzanne, trois paragraphes explicatifs, un exemple original, une synthèse et la référence aux pages PDF. Deux schémas originaux présentent les niveaux de description et les liens vers les autorités.

Le parcours propose des sommaires, une navigation précédente/suivante traversant les modules, un glossaire de 37 termes, des définitions de codes ouvrables au clavier et un retour au catalogage. Il ne comporte ni exercice, ni questionnaire, ni score. Les temps sont estimés à partir du texte, à 180 mots par minute.

Routes : `#apprendre`, `#apprendre/module/1`, `#apprendre/module/3/lecon/3-8`, `#apprendre/glossaire`, `#apprendre/parametres`. Les identifiants de toutes les leçons sont stables. Un lien invalide présente un retour à l’accueil du parcours.

## Suzanne

Les sept variantes transmises par le commanditaire sont utilisées sans nouvelle génération d’image. Les copies d’affichage sont redimensionnées proportionnellement et encodées en WebP sans perte, en conservant la transparence. Leur provenance et les empreintes des images PNG originales figurent dans `assets/formation/provenance.json`. Les sept ressources représentent environ 1,8 Mo au total. Les images de formation sont fixes et ne modifient pas le clin d’œil existant de la barre latérale.

Le footer comporte « Suzanne, notre mascotte ». Ce bouton ouvre une carte présentant l’image de la mascotte, l’hommage à Suzanne Briet (1894–1989) et la biographie fournie par Didier Thébault. Le dialogue se ferme avec son bouton ou Échap.

## Source pédagogique et références

Les 40 pages du PDF fourni ont été lues. Le plan reprend ses cinq étapes : pages PDF 4–11, 12–16, 17–26, 27–29 et 30–40. Ces numéros incluent couverture et pages liminaires ; ils ne sont pas les numéros imprimés en bas de page. Le schéma de la page PDF 26 a notamment fait l’objet d’une inspection visuelle.

Attribution affichée : « Parcours pédagogique élaboré à partir du support Le catalogage — Apports théoriques, Estelle Menier, Médiadix, Université Paris Nanterre, 2025. » La mention demandée « Mediadix : centre régional de formation aux carrières des bibliothèques » accompagne la référence des modules et des leçons.

Support original public : https://mediadix.parisnanterre.fr/medias/fichier/catalogage-isbd-unimarc-apports-theorique-maj-2025_1736242651118-pdf

Les explications sont reformulées et les exemples fictifs signalés comme tels. Aucun ISBN ou identifiant d’autorité réel n’est inventé. Les extraits de notices sont des illustrations de lecture, pas des modèles complets d’import. Aucun bouton ne les envoie dans l’éditeur ou dans le lot.

Les pictogrammes présents dans le support indiquent CC BY-NC-SA. La version exacte de cette licence n’est pas explicitée dans le texte extrait ni dans les liens du PDF fourni ; elle n’est pas inventée. L’adaptation conserve l’attribution, la destination non commerciale et le principe de partage dans les mêmes conditions que le support. Le PDF et ses illustrations ne sont pas redistribués dans le dépôt. Les images de Suzanne sont des ressources distinctes fournies par le commanditaire, sans licence générale de redistribution présumée.

Les références actuelles ont été consultées le 8 novembre 2026. Les compléments sont distingués du support : terminologie précise des onze entités LRM, code RDA-FR maintenu et versionné, règles de lecture des indicateurs et vocabulaire des autorités. Les normes AFNOR historiques et les conventions du support sont replacées dans leur contexte ; elles ne sont pas imposées comme profil professionnel de l’application.

- https://code.rdafr.fr/mises-a-jour-code-rda-fr/
- https://www.transition-bibliographique.fr/unimarc/manuel-unimarc-format-bibliographique/
- https://www.transition-bibliographique.fr/unimarc/manuel-unimarc-format-notices-autorite/
- https://repository.ifla.org/bitstreams/7624e92c-191c-4d14-9745-60930f6dd579/download

## Architecture et limites de périmètre

Le code est ajouté dans `src/learning/`. Il ne dépend pas du moteur MARC ni des services BnF et IndexedDB. Les seuls raccordements professionnels sont l’entrée de menu, le rendu d’une nouvelle rubrique et le retour au catalogage. La feuille de style est limitée au conteneur `.learning` et aux nouveaux composants du footer.

Aucune migration ni modification du schéma IndexedDB. Les préférences pédagogiques utilisent uniquement la clé localStorage `super-bibliothecaire.learning.v1` : masquage de Suzanne et dernière leçon consultée. Il ne s’agit pas d’un historique d’évaluation. Aucun compte ni serveur supplémentaire.

Les fichiers `src/marc.js`, `src/bnf.js`, `src/storage.js`, `src/iso-reader.js`, `src/indicators.js` et `src/profile.js` sont conservés octet pour octet ; leurs empreintes de référence sont jointes. Les corrections d’enregistrement précédemment en attente dans l’autre checkout restent séparées de cette branche. Elles ne sont pas incluses dans cette Pull Request.

## Tests exécutés

| Vérification | Avant l’extension | Après intégration |
| --- | --- | --- |
| Tests du moteur existants | 17 réussis | 17 réussis |
| Nouveaux tests pédagogiques | Sans objet | 4 réussis : 38 contenus, routes, glossaire, isolation |
| Recette navigateur existante | 8 scénarios réussis | 8 scénarios réussis |
| Recette pédagogique Chromium | Sans objet | 9 scénarios réussis, dont les 38 leçons |
| Scénario des indicateurs 700/702 et 225 | Tests déjà présents | Réussi après libération du port de test |
| Préfixe GitHub Pages `/super-bibliothecaire/` | Sans objet | Leçon profonde, scripts, CSS, images et navigation réussis |
| ISBN-13, ISBN-10, ARK, Titre/Auteur/Date BnF réels | Services existants | Respectivement 1, 1, 1 et 2 résultats |
| Export navigateur `.mrc` | Scénario existant | Téléchargé après relecture ; pymarc vérifie le titre accentué relu |
| Stockage professionnel pendant le cours | État initial sérialisé | État identique après parcours, réglages pédagogiques et glossaire |
| Appels BnF pendant le cours | API bloquée dans la recette | Aucun appel nécessaire, cours accessible |
| Affichage mobile | Sans objet pour la formation | Accueil et leçon à 390 px sans débordement |
| Erreurs JavaScript en recette pédagogique | Sans objet | Aucune |

Les captures bureau, lecture et mobile ont été examinées. La recette du cours vérifie aussi le chargement des illustrations, le clavier sur les définitions, le masquage persistant des conseils et la carte Suzanne du footer. Un premier échec du test de navigation provenait d’une assertion effectuée avant la prise en compte du changement de hash ; l’attente porte désormais sur le titre effectivement affiché. Un lancement du test des indicateurs a rencontré un port occupé ; après arrêt du serveur de prévisualisation, ce test a réussi.

La recette BnF réelle récupère bien les résultats. Son filtre de validation ne produit pas de nouveau pilote multi-notices à partir de ces résultats lorsqu’ils comportent des anomalies sources : aucun succès de sérialisation de ces notices non corrigées n’est déclaré. L’export déjà contrôlé dans la recette navigateur et sa relecture indépendante sont distingués de cette recherche réseau.

## Vérifications restantes et validation

La relecture pédagogique par un formateur reste souhaitable, notamment pour les choix terminologiques et les consignes propres au réseau. Les tests clavier ne constituent pas un audit RGAA complet ; lecteurs d’écran et autres navigateurs restent à vérifier. Le nouveau module ne prétend pas assurer la formation à l’ensemble du code RDA-FR.

Le premier import pilote Koha a été déclaré réussi par le commanditaire sur une notice. Le test d’import d’un lot complet dans son instance reste distinct et n’est pas certifié par les tests de formation.

Branche : `feature/apprendre-a-cataloguer`. La Pull Request est préparée pour révision avant fusion. La mise en production attend l’autorisation de fusion demandée dans la mission ; aucune fusion automatique n’est activée. GitHub Pages reste sur la branche principale.

Commandes : `npm test`, `node tests/browser.cjs`, `node tests/learning-browser.cjs`, `node tests/learning-prefix.cjs`, `node tests/indicator-browser.cjs`, `node tests/feasibility.cjs`. Les tests navigateur utilisent Playwright/Chromium disponibles dans l’environnement ou le chemin défini dans `PLAYWRIGHT_MODULE`.
