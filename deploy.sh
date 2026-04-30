#!/bin/bash
echo "Building..."
npm run build
echo "Deploying to GitHub Pages..."
cd dist
git init
git add .
git commit -m "deploy"
git push -f git@github.com:Reemjie/tortuga.git main:gh-pages
cd ..
echo "Done!"
