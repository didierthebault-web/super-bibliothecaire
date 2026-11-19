# Audit initial — 19 novembre 2026

Base GitHub : main `b41d0516df2799183829202f43e0c2da26fdee88`, V2.1 intégrée, aucune PR ouverte. Branches pédagogie/glossaire/formation/V2.1 déjà fusionnées. Le lien Git de l’ancien worktree était cassé (dépôt de rattachement disparu) ; une copie locale neuve du même dépôt a été créée dans `.work/simplification`, sans écraser les fichiers existants. Branche : `feature/simplification-catalogage-export`.

Référence avant modification : 40 tests unitaires réussis ; navigateur professionnel 8 scénarios, formation 9, glossaire 131 entrées, présentation 4 groupes, lot ISBN 13 groupes, préfixe pédagogique et animation Suzanne réussis. Le test navigateur des anciens indicateurs bloquants a aussi réussi avant modification.

Audit des points bloquants :

- app.js : ValidationPanel appelle marc.validate ; save, dirty et applyProfile retirent du lot ; add-basket/toggle-basket, exportReview/exportBatch imposent Validée/validate ; choose ouvre l’éditeur ; doublons soumis à une case obligatoire.
- batch-isbn/store.js : addSelectedToBasket impose statut et profil ; openSelection crée un brouillon hors lot ; view.js prescrit l’édition et la validation.
- marc.js : encodeRecord appelle validate, mélangeant structure binaire et règles documentaires. iso-reader.js relit indépendamment les offsets et données UTF-8.
- IndexedDB V2 : records/history/settings/batchJobs ; sauvegardes JSON V1/V2, restauration atomique. Aucun changement de schéma nécessaire.

Les appels au moteur documentaire sont maintenus uniquement pour les tests ou usages facultatifs. Les transitions de lot doivent passer par une politique de provenance BnF et non par le statut métier. Les limites techniques suivent la structure ISO 2709 à répertoire 12 octets déjà utilisée ; [description structurelle de référence](https://www.loc.gov/marc/specifications/specrecstruc).
