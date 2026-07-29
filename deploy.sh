#!/bin/bash
set -e
MSG="${1:-Deploy}"
cd ~/Desktop/Corsair/tortuga
NODE_OPTIONS="--max-old-space-size=4096" npm run build
echo "playcorsair.xyz" > dist/CNAME
cd dist
git add -A
git commit -m "$MSG" || echo "Rien à committer"
git push -f origin main:gh-pages
cd ..
echo "✅ Déployé sur https://playcorsair.xyz"
