# Corsair — contexte pour analyse externe

Document à fournir avec le code. Il décrit ce que le code ne dit pas :
l'intention, les contraintes, ce qui est délibéré, et ce qui est déjà tranché.

---

## Le jeu

Roguelite pirate jouable en navigateur, en ligne sur **playcorsair.xyz**.
Développé seul. React + TypeScript + Vite, déployé en statique sur GitHub Pages.
Backend Supabase (Postgres + Edge Functions Deno). Contrats Cairo sur Starknet
mainnet pour les scores et une collection NFT.

Grille 12×12 avec brouillard de guerre. Le joueur remonte vers le nord pendant
qu'une tempête décompte les tours. Environ 20 types d'événements, un système de
ports, 3 composants de navire améliorables, 6 améliorations spéciales dont 2
actives au maximum, 4 navires, 3 zones reliées par des portails.

Une partie dure environ 10 minutes. Ordre de grandeur actuel : une trentaine de
joueurs, quelques centaines de parties enregistrées.

---

## CONTRAINTE PRINCIPALE — le déterminisme

**Le moteur (`src/game/engine.ts`) est déterministe et cette propriété est
load-bearing.** Chaque partie enregistre son seed et son log de coups ; le
serveur rejoue la partie pour recalculer le score, et n'écrit au classement que
ce qu'il a recalculé lui-même.

Conséquences pour toute modification du moteur :

- Toute modification qui change le **nombre ou l'ordre des tirages aléatoires**
  invalide le rejeu de toutes les parties déjà enregistrées.
- Ce piège s'est déjà produit deux fois. `sort(() => rng() - 0.5)` était utilisé
  pour mélanger les offres du port : le nombre d'appels au comparateur diffère
  entre moteurs JS, donc le rejeu divergeait (corrigé par un Fisher-Yates
  explicite). Et `emitHunterFeedback`, une fonction qui n'écrit que des messages
  d'ambiance, consomme 1 à 2 tirages — elle avait été classée « cosmétique ».
- Une consommation **conditionnelle** de tirages est la source de bug la plus
  probable. Toute fonction qui tire parfois et pas toujours mérite attention.

Le moteur a été porté en Cairo pour vérification (dépôt séparé,
github.com/Reemjie/corsair-verifier, 134 tests validés contre des vecteurs
générés depuis le vrai moteur JS). Ce portage sert de test, pas de production.

---

## Architecture anti-triche

Historique utile : deux failles ont été signalées par un ingénieur de Starkware
et fermées en août 2026.

**Faille 1 — actions illégales acceptées.** On pouvait injecter une réparation
ou une amélioration de port dans un log alors que le navire était en mer, et le
vérificateur l'acceptait. Corrigé par des gardes `if (!state.showPort) return
state;` dans `upgradeComponent`, `repairHull`, `rerollPort` et `buyUpgrade`.

**Faille 2 — le client annonçait son propre score.** Corrigé par l'Edge Function
`approve-run` : le client n'envoie qu'un `run_id`, le serveur relit le log en
base avec la clé service, rejoue, compare, contrôle la provenance du seed, et
n'écrit que le score recalculé. Les policies RLS ont ensuite été fermées : la
clé anon ne peut plus écrire dans `corsair_scores`, `corsair_daily_scores`,
`nft_mints` ni `nft_token_metadata`.

**Faille encore ouverte, connue et documentée.** La carte est entièrement
dérivée du seed. Quiconque possède le seed connaît toutes les cases, brouillard
compris — le rejeu prouve qu'une partie est *valide*, pas qu'un humain l'a
jouée. La correction décidée mais non commencée : générer chaque case
indépendamment via `hash(secret, x, y)`, avec commit-reveal, pour que le serveur
puisse révéler une case sans révéler les autres.

---

## Pièges d'implémentation à connaître

**`supabase/functions/approve-run/index.ts` est régénéré** par
`setup-approve-run.py` à chaque `deploy.sh`. Toute modification de cette
fonction doit se faire dans le script Python, jamais dans le fichier généré.

**Le serveur possède sa propre copie du moteur**, recopiée par ce même script.
`deploy.sh` calcule une empreinte et ne redéploie la fonction que si elle a
changé. Si cette copie se désynchronise d'`engine.ts`, le serveur validera avec
des règles périmées et **refusera silencieusement tous les scores** — le jeu
continuera de tourner et le classement se figera sans erreur visible.

**Il existe deux panneaux de choix d'événement** dans `CorsairGame.tsx` (l'un
pour les événements avec scène illustrée, l'autre sans), avec la même logique
dupliquée sous des noms de variables différents. Toute correction doit être
appliquée aux deux. Ça a déjà causé plusieurs allers-retours.

**Le composant `CorsairGame.tsx` fait plus de 1700 lignes.** C'est le principal
problème de maintenabilité du projet.

---

## Choix délibérés — ne pas « corriger »

- **Les NFT n'ont aucun effet en jeu.** Ce sont des trophées commémoratifs. Deux
  raisons : ils sont échangeables (un acheteur obtiendrait l'avantage, ce qui
  détruirait le principe « gagné, pas acheté »), et le moteur devrait lire l'état
  de la chaîne, ce qui introduirait une entrée cachée cassant le déterminisme.
- **Cinq reliques légendaires dépendent aussi du seed**, pas seulement de
  l'exploit. C'est voulu et annoncé au joueur.
- **La relique Starktember n'a aucune condition** dans `check-nft-conditions` :
  elle est attribuée à la main en fin de mois. Ce n'est pas un oubli.
- **Des leviers d'équilibrage existent mais sont inertes** (`fleePenalty`,
  `riskBoostsOwnEvent`, `minHullForStreak`, `zoneDamageMult`,
  `score.perTurnGrowth`). Ils ont été ajoutés pour des mesures, laissés aux
  valeurs historiques après décision de ne pas modifier l'équilibrage.
- **La colonne `condition` de `nft_conditions` contient des textes périmés** qui
  ne correspondent plus au code. C'est de la documentation obsolète, pas de la
  logique.
- **Si `issueSeed` échoue pour une run wallet, la partie ne démarre pas.**
  Un seed local n'a plus le droit d'alimenter le classement. Le guest play
  (sans wallet) garde un seed local : rien n'est soumis.

---

## Problème d'équilibrage mesuré, non résolu

Des simulateurs (`sim*.mts`) font jouer le moteur hors navigateur selon
différentes stratégies. Résultat, à déplacement neutralisé : **« toujours
prendre le choix risqué » domine toutes les autres stratégies** à tous les
réglages testés.

La cause mesurée : survivre ne rapporte presque rien. Un tour vaut 5 points de
déplacement, un combat plusieurs centaines. Les stratégies prudentes gagnent
environ un tour de vie et perdent 30 à 70 % de score. Le barème dit donc au
joueur de prendre chaque événement quoi qu'il en coûte, ce qui donne
l'impression de refaire toujours le même choix.

Deux directions ont été envisagées puis mises de côté : imposer de ramener le
butin au port pour le conserver, ou récompenser la durée plutôt que les
rencontres. Aucune n'a été implémentée.

---

## Ce qu'une analyse utile apporterait

Par ordre d'intérêt décroissant :

1. **Vérifier le déterminisme du moteur** — repérer toute consommation
   conditionnelle de tirages aléatoires qui pourrait diverger, et tout usage
   d'API dont le comportement varie entre moteurs JS.
2. **Auditer la surface d'attaque restante** — au-delà des deux failles fermées,
   ce qu'un client malveillant peut encore obtenir.
3. **Proposer un découpage de `CorsairGame.tsx`** sans changer le comportement,
   en particulier la fusion des deux panneaux de choix dupliqués.
4. **Relire l'équilibrage** avec le diagnostic ci-dessus en tête, sans repartir
   de zéro sur les pistes déjà mesurées et écartées.
5. **Repérer les valeurs codées en dur** qui devraient être dans `balance.ts`.

Ce qui n'est **pas** utile : proposer d'implémenter des effets NFT, de passer à
Dojo, de construire un système de preuve on-chain (le rejeu coûte ~35M de gas L2
et la décision a été prise de rejouer côté serveur), ou de réécrire l'interface
en profondeur.
