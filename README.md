# Super Bibliothécaire

Votre assistante au catalogage UNIMARC. Application publique en français, sans compte, avec recherche réelle dans le catalogue général de la BnF, édition structurée, stockage IndexedDB et export ISO 2709 `.mrc`.

## Utilisation et développement

Node.js 22 ou ultérieur, sans installation de dépendances pour l’application :

```sh
npm start
```

Ouvrir http://127.0.0.1:8793. Ne pas ouvrir `index.html` directement en `file://` : les modules JavaScript et IndexedDB nécessitent une origine HTTP stable.

```sh
npm test
```

L’interface propose trois recherches (ISBN, ARK et Titre/Auteur/Date), la sélection humaine des éditions, la comparaison de deux résultats, la saisie manuelle, les trois vues de notice, le lot, les historiques et la sauvegarde/restauration JSON. Les illustrations sont les ressources originales fournies par le commanditaire.

## Profil fourni : champs nécessaires si disponibles

010$a, 073$a, 100$a, 101$a, 200$a/$e/$f/$g, 205$a, 214$a/$c/$d, 215$a/$c/$d, 225$a, 300$a, 320$a, 330$a, toutes les zones 6XX et 7XX, 856$u. Ces champs sont affichés lorsqu’ils sont présents. Leur absence n’est pas rendue bloquante. Toutes les autres zones sont préservées et modifiables dans l’éditeur avancé.

Les règles obligatoires définitives restent à définir dans les paramètres. « Contrôles actifs satisfaits » décrit les contrôles réellement exécutés, pas une certification bibliographique générale.

## Déploiement GitHub Pages

Le workflow `.github/workflows/pages.yml` exécute les tests, copie uniquement `index.html`, `src/` et `assets/`, puis publie l’artefact statique. Dans GitHub : Settings → Pages → Source : GitHub Actions. Les chemins sont relatifs et fonctionnent sous `/super-bibliothecaire/`.

Aucun serveur, secret, compte utilisateur ou base centrale n’est nécessaire. L’accès CORS BnF a été testé depuis une origine HTTP locale ; l’accès depuis l’URL publique doit également être vérifié après déploiement. Aucun connecteur tiers obligatoire ni relais n’a été ajouté.

## Vérifications et limites

- [Architecture](docs/ARCHITECTURE.md)
- [Rapport de recette](docs/RECETTE.md)
- [Procédure d’import pilote Koha](docs/KOHA.md)
- [Licences et crédits](docs/LICENCES.md)

La BnF fournit parfois des labels décalés ou des données codées de longueur atypique. L’application les signale ; elle ne reconstitue pas silencieusement les informations manquantes. La V2 couverture/OCR est visible mais désactivée. L’import pilote Koha et l’audit d’accessibilité complet restent à effectuer.

Les tests navigateur requièrent Playwright et Chromium. `PLAYWRIGHT_MODULE` peut désigner le module installé localement pour `tests/browser.cjs`. La recette réelle `tests/feasibility.cjs` nécessite l’accès réseau BnF. La vérification indépendante nécessite Python avec `pymarc==5.4.0`, puis `python tests/check_pymarc.py`.

Les données de travail restent propres au navigateur et à l’origine du site. Une sauvegarde JSON régulière est nécessaire avant d’effacer les données du navigateur. Les tests n’envoient aucune donnée personnelle à GitHub ; les notices de test BnF et les sauvegardes générées sont exclues du dépôt.
