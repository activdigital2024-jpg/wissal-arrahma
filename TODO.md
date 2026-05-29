# TODO - Supprimer Supabase et corriger les erreurs

## Étape 1: Analyse & dépendances

- [x] Rechercher les imports `@/integrations/supabase/client` dans `src/`
- [x] Identifier tous les fichiers qui utilisent `supabase.auth` /
      `supabase.functions.invoke`

## Étape 2: Remplacement “local client”

- [x] Mettre à jour tous les imports pour pointer vers
      `src/integrations/localdb/client`
- [ ] Supprimer/neutraliser `src/integrations/supabase/client.ts` (selon décision)

## Étape 3: Nettoyage Supabase

- [x] Supprimer `supabase/migrations/*.sql`
- [x] Retirer la dépendance Supabase de `package.json` si présente

## Étape 4: Corriger les erreurs TS

- [x] Lancer `npm run build` et/ou `tsc`
- [x] Corriger toutes les erreurs restantes (aucune erreur bloquante pendant build)

## Étape 5: Validation

- [x] Vérifier que l’app démarre sans erreurs et que les pages admin fonctionnent
      avec le mock local (build OK)
