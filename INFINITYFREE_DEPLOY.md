# Déploiement InfinityFree (SPA statique)

Ce projet est une application **React/Vite**. Pour InfinityFree, il faut la servir en **mode statique (SPA)** :

- Build local
- Upload de `dist/` dans `public_html/`
- Ajout d’un fichier `.htaccess` pour faire le *fallback* vers `index.html` (routing côté client)

## 1) Build du projet

Dans `c:/laragon/www/wissal-arrahma-export` :

```bash
npm ci
npm run build
```

Le dossier généré sera : `dist/`.

## 2) Upload sur InfinityFree

1. Ouvrir le gestionnaire de fichiers InfinityFree
2. Aller dans : `public_html/`
3. Supprimer (si besoin) l’ancien contenu de `public_html/` (sans supprimer le fichier `.htaccess` s’il existe déjà et que vous voulez le réutiliser)
4. Uploader **tout le contenu** du dossier local :
   - `dist/assets/`
   - `dist/index.html`
   - les autres fichiers éventuellement présents dans `dist/`

Après upload, `public_html/` doit contenir au minimum :

- `public_html/index.html`
- `public_html/assets/`

## 3) Configurer le SPA avec `.htaccess`

Créer/ajouter un fichier **`.htaccess`** à la racine du site : `public_html/.htaccess`

Contenu recommandé :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Ne pas toucher aux fichiers et dossiers existants
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Pour tout le reste, renvoyer vers index.html (SPA)
  RewriteRule ^ index.html [L]
</IfModule>
```

### Important

- Le site doit être **servi à la racine du domaine** (`https://votredomaine.com/`), pas dans un sous-dossier.
- Sinon, il faudra adapter le `base` Vite / les chemins.

## 4) Vérification après déploiement

Une fois upload terminé :

1. Ouvrir : `https://votredomaine.com/`
2. Tester des routes côté client :
   - `https://votredomaine.com/admin` (et autres routes admin)

Si vous voyez une page blanche ou des erreurs 404 sur les routes non-index :

- vérifier que `.htaccess` est bien présent dans `public_html/`
- vérifier que `mod_rewrite` est activé

## 5) Note sur les appels réseau (Supabase)

InfinityFree héberge uniquement du **statique**. Si votre app tente de contacter Supabase/serveur, il faut que cela soit **optionnel** ou bien remplacer par une couche locale (mock/localdb) pour le mode démo.

Ce point ne bloque normalement pas le build si les imports sont configurés correctement, mais cela peut impacter le fonctionnement des pages admin après déploiement.
