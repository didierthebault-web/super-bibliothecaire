# Page de présentation Formations KOHA & BOKEH

## Modifications

- Module statique indépendant `src/training-platform/page.js`, sans API, iframe ou dépendance ajoutée.
- Page interne accessible par `#formations-koha-bokeh`, y compris sous le préfixe GitHub Pages.
- Introduction, présentation de la plateforme, quatre cartes informatives et lien externe sécurisé dans un nouvel onglet, selon la mission fournie.
- Neuf entrées de navigation dans l’ordre demandé. Historique précède Apprendre à cataloguer. La nouvelle page suit Glossaire métier et précède Paramètres.
- Menu de bureau porté à 300 px, texte à 14 px. Le menu mobile conserve son défilement horizontal et ses libellés sans retour à la ligne. La barre latérale reste défilable verticalement sur écran bas.
- Image à gauche sur grand écran, au-dessus du texte sur écran étroit. Contrôle visuel des captures ordinateur et mobile.
- Aucun changement aux moteurs MARC, services BnF, stockage, contrôles métier ou export.

## Image officielle

Copie binaire du portrait de Suzanne à l’index levé fourni précédemment par l’utilisateur (`codex-clipboard-ac72ec99-5f91-4feb-98b7-fa1364e700b2.png`). L’illustration de démonstration de la maquette n’est pas utilisée.

- Destination : `assets/formation-presentation/suzanne-index-leve.png`.
- PNG RGBA, 1274 × 1234 px, 2 505 849 octets, alpha préservé.
- SHA-256 : `e1368923ed00ef131ce09a9f85ce9cac222d0c896cb80cc625bebdbc35b43407`.
- Aucun fichier de mascotte existant remplacé ou modifié.

## Rapport de vérification

Exécuté le 8 novembre 2026 :

| Vérification | Résultat |
| --- | --- |
| `npm test` | 26 tests réussis |
| `node tests/browser.cjs` | 8 scénarios réussis : création, enregistrement, lot, export MRC réel, persistance, profil, sauvegarde/restauration, mobile, ISBN invalide |
| `node tests/learning-browser.cjs` | 9 scénarios réussis, dont 5 modules, 38 leçons, glossaire pédagogique, hommage Suzanne et données professionnelles préservées |
| `node tests/business-glossary-browser.cjs --prefix` | 6 groupes de contrôles réussis, dont ouverture des 131 fiches, filtres, clavier, mobile et stockage préservé |
| `node tests/training-platform-browser.cjs` | Page, neuf rubriques, PNG exact et RGBA, quatre cartes, URL exacte, nouvel onglet réel, activation clavier, contenu sans image, lien profond et stockage inchangé |
| Largeurs 320, 390, 760, 768, 1024, 1150 et 1440 px | Libellés sur une seule ligne, aucun débordement de page |

La destination externe du bouton est interceptée uniquement dans le test d’ouverture : le test valide le lien et le nouvel onglet, sans prétendre tester le contenu de la plateforme extérieure. Les scénarios professionnels utilisent les fixtures existantes ; aucun nouvel import sur une instance Koha n’a été réalisé dans cette mission.

Résultats de la nouvelle page : `docs/training-platform-browser.json`. Captures locales : `tests/screenshots/formations-desktop.png` et `formations-mobile.png`.

## Coordination et publication

Branche dédiée `feature/presentation-formations-koha-bokeh`, créée depuis `origin/main` après intégration du module pédagogique et du glossaire. Aucune PR ouverte au contrôle initial. Les correctifs locaux non publiés de l’autre checkout sont exclus.

Publication GitHub Pages préparée via une Pull Request ; fusion après validation, conformément à la mission.
