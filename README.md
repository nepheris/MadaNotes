# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques, manuels et fichiers de dépannage.

## V0.2 - structure

- `index.html` : accueil avec verrouillage léger côté navigateur.
- `solaire/` : installation, matériel, monitoring et analyse.
- `quad/` : placeholder en construction.
- `sos/` : liste automatique des fichiers déposés dans `sos/files/`.
- `assets/` : CSS/JS/images communs.
- `archives/` : rapport solaire historique/reconstitué.

## Code d'accès de démonstration

Code initial : `Mada2026`

Le code n'est **pas une sécurité réelle** : GitHub Pages et le dépôt sont publics. Le mot de passe sert uniquement de barrière visuelle sur l'accueil. Le code est comparé côté navigateur à une empreinte légère dans `assets/js/access.js`.

## SOS automatique

Après publication sur GitHub Pages, `sos/index.html` interroge l'API publique GitHub :

`nepheris/MadaNotes/sos/files`

Tout fichier ajouté dans ce dossier apparaît donc automatiquement après le push, sans modifier la page HTML.

Les boutons :
- **Ouvrir** : ouvre le fichier dans un nouvel onglet lorsque le navigateur sait l'afficher ;
- **Télécharger** : demande le téléchargement du fichier.

Pour les formats `.exe`, `.bat`, `.xlsx`, `.docx`, `.zip`, le comportement exact dépend du navigateur et du système ; ils seront généralement téléchargés.

## GitHub Pages

Publier depuis la branche `main`, dossier `/ (root)`.

URL attendue : `https://nepheris.github.io/MadaNotes/`

## Documents sources à conserver

La V0.2 reprend les données du devis Greenline PF5438 et les caractéristiques Korman connues. Les originaux privés retrouvés dans la bibliothèque ChatGPT ne peuvent pas être exportés directement par le connecteur de fichiers ; des versions de travail/reconstituées sont donc incluses dans ce package.
