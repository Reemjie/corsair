export const BALANCE = {
  storm: {
    initial: 22,
    surgeEarly: 0.03,
    surgeMid: 0.12,
    surgeLate: 0.25,
    maxSurge: 0.35,
    midPenalty: 0.05,
    hunterSurgeBonus: 0.15, // Treasure Hunter tax
  },
  hunter: {
    spawnTurn: 8,
    frenzyTurn: 15,
    frenzyInterval: 3,
    frenzyGold: 800,
    baseDamage: 8,
    minDamage: 3,
  },
  greed: {
    curseThreshold: 600,
    curseChance: 0.15,
    frenzyGold: 800,
    goldMultiplier: 1.5,   // combat / wreck gold (UI + engine)
    stormPenaltyInterval: 3,
    corruptionStep: 200,       // every 200g = +1 corruption level
    corruptionStormBonus: 0.03, // +3% surge per level
    corruptionHunterAt: 3,     // hunter moves every turn at corruption 3+
    corruptionPirateAt: 2,     // +1 pirate damage at corruption 2+
    corruptionPirateBonus: 1,
  },
  upgrades: {
    maxSpecials: 2,
    portOfferCount: 4,
    escapeUses: 1,
    costs: {
      ghost: 80,
      rider: 90,
      greed: 60,
      berserker: 60,
      hunter: 60,
      escape: 65,
    },
  },
  berserker: {
    damageTakenMult: 2,
  },
  streak: {
    // Leviers d'equilibrage. Valeurs par defaut = comportement historique.
    fleePenalty: 2,
    // sim6 N=200/400: a 3, "fuir si tempete" passe a ~-5% med / ~-13% mean vs
    // "tout risque" sans rendre "tout fuir" viable. Au-dela, le plafond est bas
    // (meme a 10 le mediane egalise mais le winrate reste ~20%).
    fleeStormGain: 3,      // distance gagnee sur la tempete en fuyant (0 = historique)
    riskBoostsOwnEvent: true, // le risque booste-t-il le gain du meme evenement ?
    // En dessous de ce seuil, prendre un risque ne monte plus la danger streak.
    // 0 = historique. sim-hull N=200 (+fleeStormGain 3) : a 8, "tout risque"
    // baisse ~4% (998→961) sans aider "tout fuir". Au-dela (12) l'ecart relatif
    // ne se ferme plus.
    minHullForStreak: 8,
    goldBonusAt: 2,
    goldBonus: 1.25,
    hunterAggroAt: 3,
    stormAggroAt: 4,
    stormAggroBonus: 0.08,
    eliteAt: 4,
    eliteChance: 0.15,
    curseAt: 5,
    curseChance: 0.10,
    rareAt: 6,
    rareChance: 0.25,
  },
  combat: {
    // Degats des combats multiplies selon la rangee : le nord doit etre
    // aussi dangereux qu'il est riche. early reste a 1.0 (implicite).
    // sim-zone N=200 (+flee 3, minHull 8) : 1.15/1.3 rapproche "fuir si
    // tempete" a ~-2% vs "tout risque" (914 vs 897) sans aider "tout fuir".
    zoneDamageMult: { mid: 1.15, late: 1.3 },
    pirateDmgMin: 3,
    pirateDmgMax: 10,
    pirateGoldMin: 20,
    pirateGoldMax: 60,
    krakenDmgMin: 10,
    krakenDmgMax: 18,
    krakenDmgFloor: 3,
    krakenScore: 150,
    ancientDmgMin: 15,
    ancientDmgMax: 25,
    ancientDmgFloor: 5,
    ancientScore: 800,
    ancientGold: 200,
    berserkerCritChance: 0.15,
    berserkerCritMult: 2,
  },
  port: {
    rumBarrelHeal: 8,
    rumBarrelCost: 25,
    fullRepairCost: 55,
    rerollCost: 20,
    islandRitualCost: 100,
    islandRitualBonus: 4,
    krakenPactHull: 20,
    krakenPactStorm: 6,
  },
  ship: {
    startHull: 20,
    startGold: 80,
    startPower: 2,
    startVision: 1,
    hull2Max: 28,
    hull3Max: 38,
    weapon2Power: 5,
    weapon3Power: 9,
    nav2Vision: 2,
    nav3Vision: 3,
  },
  ghost: {
    krakenChance: 0.05,
    visionBonus: 2,
  },
  // Vision empilable (nav + spyglass + ghost − curses − blind).
  // Aveuglement kraken : temporaire, +1 palier recupere tous les blindRecoverTurns.
  vision: {
    max: 4,
    maxBlind: 3,
    blindRecoverTurns: 5,
  },
};

export const ZONE_CONFIG: Record<number, {
  name: string;
  subtitle: string;
  hunterSpawnTurn: number;
  stormMultiplier: number;
  krakenChanceBonus: number;
  portalMessage: string;
  transitionText: string[];
}> = {
  1: {
    name: 'The Coasts',
    subtitle: 'Where corsairs are born',
    hunterSpawnTurn: 12,
    stormMultiplier: 1.0,
    krakenChanceBonus: 0,
    portalMessage: 'The fog shifts. You sense a passage somewhere beyond the sea.',
    transitionText: [
      'The sea tears open.',
      'The storm vanishes.',
      'For a moment.',
      'Then something worse appears beyond the fog.',
    ],
  },
  2: {
    name: 'The Storm Sea',
    subtitle: 'Where storms are born',
    hunterSpawnTurn: 8,
    stormMultiplier: 1.4,
    krakenChanceBonus: 0.07,
    portalMessage: 'The water darkens. Another passage calls from the deep.',
    transitionText: [
      'The abyss opens beneath you.',
      'No light. No storm.',
      'Only silence.',
      'And then... something moves.',
    ],
  },
  3: {
    name: 'The Abyss',
    subtitle: 'Where legends die',
    hunterSpawnTurn: 6,
    stormMultiplier: 1.8,
    krakenChanceBonus: 0.18,
    portalMessage: '',
    transitionText: [],
  },
};
