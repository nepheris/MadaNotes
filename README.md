# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques,
des manuels et des fichiers de dépannage.

## État cumulatif V0.3

Cette archive reprend l'ensemble des modifications des trois étapes successives :

1. initialisation du dépôt avec le `README.md` ;
2. création de la structure complète Mada Notes (Solaire, Quad, SOS, assets et documents) ;
3. mise à jour de l'accès et enrichissement des fiches matériel, notamment le groupe Korman.

## Accès

Code actuel : `MadaJoel`

La page d'accueil propose un bouton permettant d'afficher ou de masquer le code pendant la saisie.

## Structure

- `index.html` : accueil Mada Notes.
- `solaire/` : installation, matériel, monitoring et analyse.
- `quad/` : page placeholder « En construction ».
- `sos/` : fichiers rapides à visualiser ou télécharger.
- `assets/` : CSS et JavaScript communs.
- `archives/` : documents de référence historiques/reconstitués.

## SOS automatique

Après publication sur GitHub Pages, `sos/index.html` interroge le contenu public du dossier :

`nepheris/MadaNotes/sos/files`

Les fichiers ajoutés dans ce dossier peuvent ainsi apparaître automatiquement après le push.

## GitHub Pages

Publication prévue depuis la branche `main`, dossier `/ (root)`.

URL attendue :

`https://nepheris.github.io/MadaNotes/`

## Mise à jour V0.3

- Code d'accès remplacé par `MadaJoel`.
- Bouton « Afficher le mot de passe » / « Masquer le mot de passe ».
- Ancien texte d'avertissement retiré de la page d'accueil.
- Fiche Korman 3500 W enrichie.
- Ressources Sanifer et recherches documentaires ajoutées.
- Liens Google IA ajoutés aux fiches matériel.
