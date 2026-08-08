# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques, des manuels, des fiches matériel et des fichiers de dépannage.

## État cumulatif V0.6

Cette version ajoute :

- navigation homogène avec accès 🏠 / ☀️ Solaire / 🛞 Quad / 🆘 SOS ;
- fiches matériel structurées en sections repliables ;
- documents détectés automatiquement depuis le dépôt ;
- actions adaptées au format : **Ouvrir + Télécharger** pour les formats prévisualisables, **Télécharger** uniquement pour les autres ;
- téléchargement local robuste via `fetch -> Blob` pour les fichiers du dépôt ;
- assistance IA en deux volets sur les fiches matériel : identification et manuel/entretien ;
- maintenance et stock utile enrichis sur le GOES Iron 450 ;
- distinction stricte entre Korman `01066672 / 3500 W` et les documents du Korman `214125 / 3000 W` ;
- fiche Compresseur Korman avec détection automatique des documents ;
- interface d'upload préparée dans `admin/upload.html`, volontairement désactivée tant qu'un backend sécurisé n'est pas configuré ;
- suppression du mot de passe en clair de `CUMULATIF.json`.

## Accès public

`https://nepheris.github.io/MadaNotes/`

## Documents automatiques

Le module commun `assets/js/repo-docs.js` interroge l'arbre public GitHub à chaque chargement. Il peut filtrer par dossier, extension et mots-clés.

Formats prévisualisables : PDF, HTML, TXT, CSV, images et vidéos web courantes.

Formats non prévisualisables dans le navigateur : DOC/DOCX, XLS/XLSX, ZIP et autres binaires ; ces formats n'affichent que le bouton Télécharger.

## Upload

La page `admin/upload.html` est une interface cliente prête à être branchée. Elle n'embarque aucun secret. Le backend devra :

- vérifier le mot de passe côté serveur ;
- limiter à 10 Mio par fichier ;
- limiter à 10 fichiers par utilisateur/session et par 24 h ;
- contrôler extensions et destinations autorisées ;
- conserver le token GitHub uniquement dans un secret serveur ;
- créer le fichier dans le dépôt avec une permission `Contents: write` minimale.

Voir `admin/SECURITE-UPLOAD.md`.

## Structure principale

- `index.html` : accueil.
- `solaire/` : installation, matériel, documents et analyse.
- `quad/` : GOES Iron 450 et documents associés.
- `sos/` : documents/fichiers détectés automatiquement.
- `admin/` : interface et documentation de l'upload sécurisé.
- `assets/` : CSS, JavaScript et ressources communes.

## GitHub Pages

Publication depuis `main`, dossier `/ (root)`.
