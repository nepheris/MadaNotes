# Mada Notes

Mini-site documentaire statique, mobile-first, destiné à centraliser des informations pratiques, des manuels, des fiches matériel et des fichiers de dépannage.

## État cumulatif V0.8

Cette version consolide :

- accès rapides permanents : Accueil / Solaire / Quad / SOS ;
- navigation hiérarchique commune, dépliable au survol et utilisable au clic ;
- arborescence Solaire → Installation / Matériel / Documents / Analyse ;
- toolbar flottante commune, fixe à l'écran, verrouillable et déplaçable ;
- toggle à trois états pour les sections : vue par défaut / tout déplier / tout replier ;
- bouton Retour en haut ;
- fiches matériel homogènes : image, identification, documents, entretien, stock/références/sources, assistance IA ;
- tableau d'entretien du GOES Iron 450 enrichi d'une colonne Source cliquable ;
- assistance IA par onglets : Gemini, ChatGPT, DeepSeek 🇨🇳 et Qwen 🇨🇳 ;
- chaque assistant propose les volets Identification et Manuel / entretien ;
- tableaux documentaires avec langue, type, origine officielle/alternative et priorité ;
- références de pièces/consommables accompagnées d'une source cliquable lorsqu'elle existe ;
- documents locaux détectés automatiquement avec Ouvrir/Télécharger selon le format ;
- suppression complète de la fiche Compresseur ;
- interface `admin/upload.html` clairement marquée **Bêta / Démonstration** ;
- bouton Afficher/Masquer pour le champ mot de passe ;
- architecture d'upload sans compte utilisateur décrite dans `admin/SECURITE-UPLOAD.md` ;
- aucun secret GitHub ni mot de passe réel exposé dans le JavaScript public.

## Accès public

`https://nepheris.github.io/MadaNotes/`

## Navigation et toolbar

Le composant commun `assets/js/site-nav.js` construit :

- les accès rapides Accueil / Solaire / Quad / SOS ;
- le menu hiérarchique du mini-site ;
- la toolbar flottante ;
- la gestion des trois états des sections ;
- le retour en haut ;
- le verrouillage et le déplacement de la toolbar, avec mémorisation locale de sa position.

## Assistance IA

Le module commun `assets/js/ai-assist.js` fournit les onglets :

- Gemini ;
- ChatGPT ;
- DeepSeek 🇨🇳 ;
- Qwen 🇨🇳.

Chaque assistant propose deux usages : identification du matériel à partir des références/photos et recherche de manuels, entretien, consommables, pièces et fournisseurs.

## Documents automatiques

Le module `assets/js/repo-docs.js` interroge l'arbre public GitHub à chaque chargement et peut filtrer par dossier, extension et mots-clés.

- Formats prévisualisables : PDF, HTML, TXT, CSV, images et vidéos web courantes → **Ouvrir + Télécharger**.
- Formats non prévisualisables : DOC/DOCX, XLS/XLSX, ZIP et autres binaires → **Télécharger** uniquement.

## Fiches matériel

Gabarit commun :

1. image / visuel ;
2. identification détaillée ;
3. notices et documents ;
4. entretien / périodicités / sources ;
5. stock utile, références et sources ;
6. assistance IA multi-modèles.

Le GOES Iron 450 et le groupe électrogène Korman sont les fiches de référence pour ce gabarit.

## Upload expérimental

`admin/upload.html` reste volontairement non opérationnel tant que le backend n'est pas configuré.

Architecture prévue sans compte utilisateur : mot de passe partagé vérifié côté backend HTTPS, session temporaire signée, taille maximale 10 Mio, quota public cible 10 fichiers / 24 h, destinations/ extensions sur liste blanche et secret GitHub stocké uniquement côté backend.

Voir `admin/SECURITE-UPLOAD.md`.

## GitHub Pages

Publication depuis `main`, dossier `/ (root)`.
