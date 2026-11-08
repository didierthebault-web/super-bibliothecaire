# État initial V2.1 — 8 novembre 2026

- Base : `origin/main`, commit `d6fd91e61f4342848c8e37d74a420ba71cbce784`.
- Branches distantes : main, feature/apprendre-a-cataloguer, feature/glossaire-metier, feature/presentation-formations-koha-bokeh. Aucune PR ouverte. Aucun mélange avec les correctifs non publiés de l’autre checkout.
- Branche créée : `feature/v2-1-lot-isbn`.
- Base IndexedDB `super-bibliothecaire` version 1 : records, history, settings. Sauvegarde JSON version 1, restauration transactionnelle destructive explicitement confirmée.
- Tests avant modification : 26 unitaires, 8 scénarios professionnels, 9 pédagogiques, 6 groupes de contrôles glossaire réussis. Page de formation vérifiée par sa suite dédiée.
- Couverture : carte inactive, aucun OCR intégré. Les trois recherches existantes seront conservées.

## Fichiers concernés prévus

Nouveaux modules sous `src/batch-isbn/` (import, modèle, stockage, file, résultats, bilan, interface), styles et tests associés. Intégration ciblée dans `src/app.js` et `index.html` ; ajout du magasin batchJobs et sauvegarde V2 dans `src/storage.js` ; extension optionnelle des paramètres réseau et métadonnées d’erreur dans `src/bnf.js`. Le parseur SRU, le modèle MARC et le sérialiseur ISO 2709 restent réutilisés.

## Invariants

Résultats temporaires séparés des notices ; aucune sélection automatique, aucun écrasement ; ajout des brouillons avec une nouvelle clé via transaction atomique ; ajout au panier existant seulement après contrôles actifs. Reprise explicite des recherches interrompues, sauvegardes versionnées V1/V2 et protection contre les réponses tardives après restauration. La migration IndexedDB suit les événements de version documentés par [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).
