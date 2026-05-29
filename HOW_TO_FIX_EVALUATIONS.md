# 🔧 Pourquoi les évaluations ne s'enregistrent pas

## Problème

Le projet a été converti pour utiliser un moteur de données SQL local au lieu de Supabase.

## Solution

Les évaluations sont maintenant gérées par un store local dans `src/integrations/supabase/client.ts`.

- Les tables sont initialisées à partir des valeurs de démarrage.
- Les opérations CRUD et les relations sont simulées localement.
- L'authentification est gérée avec une session stockée en local.

## Vérification

1. Ouvrez l'application.
2. Connectez-vous avec un compte existant.
3. Créez une évaluation.

Si le formulaire enregistre correctement, la conversion SQL locale fonctionne.  
