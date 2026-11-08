# Clin d’œil de la mascotte — 8 novembre 2026

`assets/mascotte-clin-oeil.gif` : 301 × 405 pixels, 3 images, 1,48 seconde, environ 77 Ko. GIF sans boucle, dernière image identique à la première. Le PNG officiel reste inchangé. `assets/mascotte-clin-oeil.png` conserve l’image clé fermée.

Le module `src/mascot-wink.js` anime uniquement la mascotte de la barre latérale, une seule fois à l’ouverture du document. Il remet ensuite le PNG original. Les rendus internes de l’application ne relancent pas le GIF. Les conseils et l’illustration d’accueil restent fixes. Si `prefers-reduced-motion: reduce` est activé, le GIF n’est pas chargé ; si ce réglage change pendant l’animation, le PNG est immédiatement rétabli.

Création avec l’outil intégré Imagegen, à partir de la mascotte officielle. Pour l’assemblage GIF, seule la région de l’œil de l’image clé générée est utilisée : le visage, les livres et le décor de l’original restent immobiles. Palette partagée entre les images du GIF. Le script `scripts/build-mascot-gif.py` reproduit l’assemblage avec Pillow en lui fournissant le PNG généré d’origine, conservé localement dans `references/mascotte-clin-oeil-source.png` et dans le dossier de génération Imagegen.

Recette : `node tests/mascot-wink.cjs`, Playwright et Chromium. Ce test utilise les versions publiées des fichiers de catalogage pour ne pas dépendre des corrections d’enregistrement encore en attente.

## Prompt de génération

Use case: identity-preserve. Edit target: the attached official librarian mascot illustration. Create ONE nearly identical static animation keyframe of this exact librarian giving a subtle friendly wink: close ONLY her larger eye on the LEFT side of the picture (her right eye, behind the left eyeglass lens) into a naturally curved eyelid, with a tiny warm smile maintained. Preserve the other eye open. ABSOLUTELY lock the character identity, face geometry, age, bun, hair, glasses and chains, jewelry, purple cardigan, arms, books, pose, framing, camera, painterly illustration style, colors, lighting and library background. No head movement, no new objects, no text, no redesign. Maintain exactly the original full portrait composition and original 301:405 aspect ratio. All pixels outside that single eye area should visually match the original; the intended output is a closed-eye frame to alternate with the original for a brief wink GIF. Do not make a contact sheet or multiple panels.
