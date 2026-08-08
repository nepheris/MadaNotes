# Upload Mada Notes — architecture de sécurité V0.7

La page `admin/upload.html` reste une **bêta / démonstration**. Aucun secret réel ne doit être présent dans le HTML ou le JavaScript public.

## Objectif

Permettre à un utilisateur sans compte de déposer ponctuellement un document avec un **mot de passe partagé**, sans exposer de token GitHub et sans créer de comptes utilisateurs.

## Architecture retenue

1. GitHub Pages sert le formulaire public.
2. Le formulaire envoie le fichier + destination + mot de passe vers un backend HTTPS très léger, par exemple un Cloudflare Worker.
3. Le Worker compare le mot de passe à un secret configuré côté serveur (`UPLOAD_PASSWORD`).
4. Après authentification, le Worker peut émettre un cookie de session court, signé, `HttpOnly`, `Secure` et `SameSite=Strict`, pour éviter de ressaisir le mot de passe à chaque fichier pendant la même session.
5. Le Worker contrôle avant toute écriture : taille <= 10 Mio, extension/MIME autorisés, nom normalisé, destination dans une liste blanche et quota public.
6. Le Worker conserve le token GitHub dans un secret serveur (`GITHUB_TOKEN`) et appelle l'API GitHub `Contents: write`. Le navigateur ne voit jamais ce token.
7. Les uploads publics devraient de préférence être écrits dans une branche ou zone de dépôt dédiée (`uploads-pending`) puis validés par le propriétaire avant intégration à `main`.

## Destinations autorisées

- `sos` -> `sos/files/`
- `quad` -> `assets/documents/quad/`
- `solaire` -> `solaire/documents/`
- `korman` -> `assets/documents/solaire/groupe/`

## Quota public proposé

- 10 Mio maximum par fichier.
- 10 fichiers maximum par période de 24 h pour la session publique.
- Les push GitHub effectués directement par le propriétaire ne passent pas par ce backend et ne sont donc pas concernés par ce quota applicatif.

### Sans compte utilisateur

Le quota peut utiliser un identifiant aléatoire généré par le navigateur et conservé localement, signé/validé côté serveur. L'adresse IP peut être utilisée comme **signal secondaire** anti-abus, mais pas comme identifiant unique exclusif : les réseaux mobiles, VPN et NAT peuvent partager une même IP.

Si l'IP est utilisée pour renforcer le quota, elle ne doit pas être enregistrée en clair dans GitHub. Une empreinte hachée côté serveur avec un sel tournant et une rétention courte suffit pour ce niveau de protection.

## Protection du mot de passe

Le champ mot de passe possède un bouton **Afficher / Masquer** pour limiter les erreurs de saisie sur mobile. Cette fonctionnalité ne change pas la sécurité : la vraie vérification doit rester côté serveur.

Un mot de passe ou un hash embarqué dans le JavaScript public n'est pas une protection suffisante, car le visiteur peut lire et modifier le code client.

## Protection anti-abus complémentaire

- limitation du nombre de tentatives de mot de passe ;
- délai croissant après échecs ;
- rate limiting côté Worker ;
- liste blanche stricte des extensions ;
- aucun fichier exécutable accepté via l'upload public ;
- noms de fichiers normalisés ;
- stockage temporaire sur branche d'attente avant publication si nécessaire.

## Permissions GitHub

Utiliser un fine-grained token ou un token GitHub App limité au seul dépôt MadaNotes avec uniquement la permission nécessaire `Contents: write`. Ne jamais donner de permission globale au compte GitHub.
