# Upload Mada Notes — architecture de sécurité

La page `admin/upload.html` est uniquement l'interface cliente. Elle ne doit jamais contenir de mot de passe réel, de Personal Access Token GitHub ni de secret permettant d'écrire dans le dépôt.

## Architecture recommandée

1. GitHub Pages sert `admin/upload.html`.
2. Le formulaire envoie le fichier, le mot de passe et la destination à un petit backend HTTPS (Cloudflare Worker recommandé, ou autre fonction serveur).
3. Le backend vérifie le mot de passe à partir d'un secret serveur.
4. Le backend vérifie : taille <= 10 Mio, extension autorisée, chemin de destination dans une liste blanche, nom de fichier nettoyé.
5. Le backend applique le quota : 10 fichiers maximum par utilisateur/session et par période de 24 h. L'IP peut participer à l'anti-abus mais ne doit pas être le seul identifiant et ne doit pas être enregistrée en clair dans le dépôt.
6. Le backend utilise un GitHub App token ou un fine-grained token avec uniquement la permission `Contents: write` sur le dépôt MadaNotes.
7. Le backend crée le fichier dans le chemin autorisé et retourne le commit SHA.

## Destinations autorisées proposées

- `sos` -> `sos/files/`
- `quad` -> `assets/documents/quad/`
- `solaire` -> `solaire/documents/`
- `korman` -> `assets/documents/solaire/groupe/`
- `compresseur` -> `assets/documents/solaire/compresseur/`

## Pourquoi pas un mot de passe JavaScript ?

Tout secret présent dans le JavaScript ou le HTML envoyé au navigateur est lisible par le visiteur. Il ne peut donc pas protéger un token GitHub ou empêcher durablement un upload abusif.

## Quota IP

Une IP peut être partagée par plusieurs personnes (mobile, NAT, VPN). Elle convient comme signal anti-abus temporaire mais pas comme identifiant utilisateur exclusif. Préférer un identifiant de session signé, éventuellement combiné à une empreinte IP hachée côté serveur avec un sel tournant et une rétention courte.
