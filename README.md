# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques,
des manuels et des fichiers de dépannage.

## État cumulatif V0.5

Le dépôt contient actuellement :

1. la structure complète Mada Notes (Solaire, Quad, SOS, assets et documents) ;
2. les fiches matériel enrichies, notamment le groupe Korman ;
3. les ressources documentaires locales et externes ;
4. un accès public direct via GitHub Pages ;
5. un QR code de partage depuis la page d'accueil ;
6. une indexation automatique des documents du dépôt pour Quad, Korman et SOS.

## Accès

Le site est actuellement accessible publiquement sans code d'accès.

URL publique :

`https://nepheris.github.io/MadaNotes/`

## Structure

- `index.html` : accueil Mada Notes.
- `solaire/` : installation, matériel, monitoring, documents et analyse.
- `quad/` : documentation GOES Iron 450 et documents associés.
- `sos/` : fichiers rapides à visualiser ou télécharger.
- `assets/` : CSS, JavaScript et images communs.
- `archives/` : documents de référence historiques/reconstitués.

## Documents automatiques

Les pages Quad, Korman, Documents et SOS interrogent le dépôt public à chaque ouverture afin d'afficher les fichiers réellement présents.

- `assets/js/repo-docs.js` : indexation générique des documents depuis l'arbre GitHub.
- `assets/js/sos.js` : indexation récursive de `sos/files/`, y compris les sous-dossiers, avec boutons Ouvrir / Télécharger.
- `quad/documents.html` : notices officielles GOES et fichiers locaux du quad détectés automatiquement.
- `solaire/documents.html` : documents solaires, Korman et compresseur détectés automatiquement.

Après un push, un simple rechargement de la page suffit pour actualiser les listes.

## GitHub Pages

Publication depuis la branche `main`, dossier `/ (root)`.

URL :

`https://nepheris.github.io/MadaNotes/`

## Mise à jour V0.5

- Documentation GOES Iron 450 enrichie avec accès direct au manuel français officiel.
- Nouvelle page `quad/documents.html`.
- Détection automatique des PDF Quad dans plusieurs dossiers du dépôt.
- Liens Korman FP-214125 et N-214125 conservés avec distinction du modèle principal 01066672.
- Détection automatique des documents Korman locaux.
- Section dédiée aux documents compresseur, sans attribuer un manuel à un modèle tant que la référence réelle n'est pas confirmée.
- SOS recherche désormais récursivement tous les fichiers de `sos/files/` à chaque chargement et propose une actualisation manuelle.
