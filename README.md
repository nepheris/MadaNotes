# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques,
des manuels et des fichiers de dépannage.

## État cumulatif V0.4

Le dépôt contient actuellement :

1. la structure complète Mada Notes (Solaire, Quad, SOS, assets et documents) ;
2. les fiches matériel enrichies, notamment le groupe Korman ;
3. les ressources documentaires locales et externes ;
4. un accès public direct via GitHub Pages ;
5. un QR code de partage depuis la page d'accueil.

## Accès

Le site est actuellement accessible publiquement sans code d'accès.

URL publique :

`https://nepheris.github.io/MadaNotes/`

## Structure

- `index.html` : accueil Mada Notes.
- `solaire/` : installation, matériel, monitoring et analyse.
- `quad/` : documentation GOES Iron 450 et documents associés.
- `sos/` : fichiers rapides à visualiser ou télécharger.
- `assets/` : CSS, JavaScript et images communs.
- `archives/` : documents de référence historiques/reconstitués.

## Documents automatiques

Les pages Quad, Korman, Documents et SOS interrogent le dépôt public à chaque ouverture afin d'afficher les fichiers réellement présents. Le module commun est `assets/js/repo-docs.js`. La page SOS utilise `assets/js/sos.js` et recherche récursivement tout le contenu de `sos/files/`, y compris les sous-dossiers.

## GitHub Pages

Publication depuis la branche `main`, dossier `/ (root)`.

URL :

`https://nepheris.github.io/MadaNotes/`

## Mise à jour V0.4

- Suppression de la documentation obsolète relative à l'ancien code d'accès.
- Ajout du QR code de partage Mada Notes sur l'accueil.
- Ajout des métadonnées SEO/sociales de base sur l'accueil.
- Factorisation des styles du bloc QR dans la feuille CSS commune.
- Conservation de la navigation principale sur mobile avec défilement horizontal si nécessaire.
- Documentation Korman enrichie avec distinction explicite des références 01066672 et 214125.
- Détection automatique des documents Quad, Korman et SOS depuis le dépôt public.
