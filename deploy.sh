#!/bin/bash
set -e
MSG="${1:-Deploy}"
cd ~/Desktop/Corsair/tortuga

# 1. Build d'abord : une erreur TypeScript arrete tout avant de toucher
#    quoi que ce soit en production.
NODE_OPTIONS="--max-old-space-size=4096" npm run build
echo "playcorsair.xyz" > dist/CNAME

# 2. Le serveur possede sa propre copie du moteur. Si engine.ts change sans
#    qu'elle suive, approve-run rejoue avec les anciennes regles et refuse
#    tous les scores, sans erreur visible.
python3 setup-approve-run.py > /dev/null
EMPREINTE=$(cat supabase/functions/approve-run/index.ts \
                supabase/functions/approve-run/game/*.ts \
                supabase/functions/approve-run/game/systems/*.ts \
                supabase/functions/approve-run/types/*.ts | shasum | cut -d' ' -f1)
ANCIENNE=$(cat supabase/functions/approve-run/.empreinte 2>/dev/null || echo "")
if [ "$EMPREINTE" != "$ANCIENNE" ]; then
  echo "⚙️  Moteur modifie — redeploiement de approve-run"
  supabase functions deploy approve-run --project-ref eyahboeaekejmcgknsty --no-verify-jwt
  echo "$EMPREINTE" > supabase/functions/approve-run/.empreinte
else
  echo "⚙️  Moteur inchange"
fi

# 3. Le client en dernier.
cd dist
git add -A
git commit -m "$MSG" || echo "Rien à committer"
git push -f origin main:gh-pages
cd ..
echo "✅ Déployé sur https://playcorsair.xyz"
