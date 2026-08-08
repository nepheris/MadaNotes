# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques, des manuels, des fiches matériel et des fichiers de dépannage.

## État cumulatif V0.7

Cette version consolide :

- navigation hiérarchique commune avec menu vertical dépliable ;
- arborescence Solaire → Installation / Matériel / Documents / Analyse ;
- sous-menu Matériel → Panneaux / Onduleur / Batterie / Groupe Korman / Monitoring ;
- suppression complète de la fiche Compresseur ;
- fiches matériel homogènes : image, identification, documents, entretien, stock/références/sources, assistance IA ;
- tableaux documentaires avec langue, type, origine officielle/alternative et priorité ;
- références de pièces/consommables accompagnées d'une source cliquable lorsqu'elle existe ;
- documents locaux détectés automatiquement avec Ouvrir/Télécharger selon le format ;
- interface `admin/upload.html` clairement marquée **Bêta / Démonstration** ;
- bouton Afficher/Masquer pour le champ mot de passe ;
- architecture d'upload sans compte utilisateur décrite dans `admin/SECURITE-UPLOAD.md` ;
- aucun secret GitHub ni mot de passe réel exposé dans le JavaScript public.

## Accès public

`https://nepheris.github.io/MadaNotes/`

## Navigation

Le composant commun `assets/js/site-nav.js` construit le menu hiérarchique du mini-site. Le menu principal reste compact dans le header puis se déplie verticalement avec les sous-menus.

## Documents automatiques

Le module `assets/js/repo-docs.js` interroge l'arbre public GitHub à chaque chargement et peut filtrer par dossier, extension et mots-clés.

- Formats prévisualisables : PDF, HTML, TXT, CSV, images et vidéos web courantes → **Ouvrir + Télécharger**.
- Formats non prévisualisables : DOC/DOCX, XLS/XLSX, ZIP et autres binaires → **Télécharger** uniquement.

## Fiches matériel

Gabarit commun :

1. image / visuel ;
2. identification détaillée ;
3. notices et documents ;
4. entretien / périodicités ;
5. stock utile, références et sources ;
6. assistance IA — identification ;
7. assistance IA — manuel / entretien / dépannage.

Le GOES Iron 450 et le groupe électrogène Korman sont les fiches de référence pour ce gabarit.

## Upload expérimental

`admin/upload.html` reste volontairement non opérationnel tant que le backend n'est pas configuré.

Architecture prévue sans compte utilisateur :

- mot de passe partagé vérifié côté backend HTTPS ;
- session temporaire signée après authentification ;
- taille maximale 10 Mio ;
- quota public cible : 10 fichiers / 24 h ;
- dossiers et extensions sur liste blanche ;
- secret GitHub stocké uniquement côté backend ;
- permission GitHub limitée à `Contents: write` sur MadaNotes ;
- préférence pour une branche/zone `uploads-pending` avant validation manuelle vers `main`.

Les push GitHub effectués directement par le propriétaire ne passent pas par ce quota applicatif.

Voir `admin/SECURITE-UPLOAD.md`.

## Structure principale

- `index.html` : accueil.
- `solaire/` : installation, matériel, documents et analyse.
- `quad/` : GOES Iron 450 et documents associés.
- `sos/` : documents/fichiers détectés automatiquement.
- `admin/` : interface Bêta et architecture d'upload.
- `assets/` : CSS, JavaScript et ressources communes.

## GitHub Pages

Publication depuis `main`, dossier `/ (root)`.
