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
- `quad/` : documentation Quad en construction.
- `sos/` : fichiers rapides à visualiser ou télécharger.
- `assets/` : CSS, JavaScript et images communs.
- `archives/` : documents de référence historiques/reconstitués.

## SOS automatique

Après publication sur GitHub Pages, `sos/index.html` interroge le contenu public du dossier :

`nepheris/MadaNotes/sos/files`

Les fichiers ajoutés dans ce dossier peuvent ainsi apparaître automatiquement après le push.

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
