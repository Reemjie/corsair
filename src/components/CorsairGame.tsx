import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameState, UpgradeId } from '../types/game';
import { submitScore, submitDailyScore, checkNFTConditions } from '../supabase';
import { ZONE_CONFIG } from '../game/balance';
import { submitScoreOnChain } from '../starknet';
import { initGame, moveShip, resolveEvent, repairHull, leavePort, skipEventFn, rerollPort, upgradeComponent, markDailyPlayed, getDailyKey } from '../game/engine';
import anchorImg from '../assets/anchor.png';

import crownNestImg from '../assets/upgrades/crown_nest.png';
const CHOICE_ICONS: Record<string, string> = Object.fromEntries(
  ['search','lurks','fight','tribute','pact','push','detour','take','leave','dock','sail','ritual','explore','careful','speed','vortex','cursed','sacrifice','cover']
  .map(name => [name, new URL(`../assets/choices/${name}.png`, import.meta.url).href])
);
import darkCompassImg from '../assets/upgrades/dark_compass.png';
import goldDetectorImg from '../assets/upgrades/gold_detector.png';
import heavyCannonsImg from '../assets/upgrades/heavy_cannons.png';
import ironHullImg from '../assets/upgrades/iron_hull.png';
import swiftSailsImg from '../assets/upgrades/swift_sails.png';
import ghostShipImg from '../assets/upgrades/ghost_ship.png';
import treasureHunterImg from '../assets/upgrades/treasure_hunter.png';
import stormRiderImg from '../assets/upgrades/storm_rider.png';
import stormbreakerImg from '../assets/upgrades/stormbreaker.png';
import cursedGreedImg from '../assets/upgrades/cursed_greed.png';
import berserkerImg from '../assets/upgrades/berserker.png';
import explorerImg from '../assets/upgrades/explorer.png';

const UPGRADE_ICONS: Record<string, string> = {
  vision: crownNestImg,
  compass: darkCompassImg,
  detector: goldDetectorImg,
  power: heavyCannonsImg,
  armor: ironHullImg,
  escape: swiftSailsImg,
  ghost: ghostShipImg,
  hunter: treasureHunterImg,
  rider: stormRiderImg,
  stormbreaker: stormbreakerImg,
  greed: cursedGreedImg,
  berserker: berserkerImg,
  explorer: explorerImg,
};
import hullImg from '../assets/hull.png';
const goldImg = `${import.meta.env.BASE_URL}icons/gold.png`;
import visionImg from '../assets/vision.png';
import powerImg from '../assets/power.png';
import turnImg from '../assets/turn.png';
import scoreImg from '../assets/score.png';
import { GRID_SIZE } from '../game/mapGen';

const SCENE_BG: Record<string, string> = {
  kraken: import.meta.env.BASE_URL + 'scenes/kraken.jpg',
  ancient_kraken: import.meta.env.BASE_URL + 'scenes/ancient-kraken.jpg',

  storm: import.meta.env.BASE_URL + 'scenes/storm.jpg',
  island: import.meta.env.BASE_URL + 'scenes/island.jpg',
  treasure: import.meta.env.BASE_URL + 'scenes/treasure.jpg',
  cursed_treasure: import.meta.env.BASE_URL + 'scenes/cursed_treasure.jpg',
  pirate: import.meta.env.BASE_URL + 'scenes/pirate.jpg',
  port: import.meta.env.BASE_URL + 'scenes/port.jpg',
  rocks: import.meta.env.BASE_URL + 'scenes/rocks.jpg',
  wreck: import.meta.env.BASE_URL + 'scenes/wreck.jpg',
  maelstrom: import.meta.env.BASE_URL + 'scenes/maelstrom.jpg',
};

const SCENE_VIDEO: Record<string, string> = {
  kraken: import.meta.env.BASE_URL + 'scenes/kraken.mp4',
  ancient_kraken: import.meta.env.BASE_URL + 'scenes/ancient_kraken.mp4',
  storm: import.meta.env.BASE_URL + 'scenes/storm.mp4',
  island: import.meta.env.BASE_URL + 'scenes/island.mp4',
  treasure: import.meta.env.BASE_URL + 'scenes/treasure.mp4',
  cursed_treasure: import.meta.env.BASE_URL + 'scenes/cursed_treasure.mp4',
  pirate: import.meta.env.BASE_URL + 'scenes/pirate.mp4',
  port: import.meta.env.BASE_URL + 'scenes/port.mp4',
  rocks: import.meta.env.BASE_URL + 'scenes/rocks.mp4',
  wreck: import.meta.env.BASE_URL + 'scenes/wreck.mp4',
  maelstrom: import.meta.env.BASE_URL + 'scenes/maelstrom.mp4',
  death: import.meta.env.BASE_URL + 'scenes/death.mp4',
};

const SCENE_TITLES: Record<string, string> = {
  kraken: 'The Kraken Rises',
  ancient_kraken: 'The Ancient One Awakens',
  storm: 'Into the Storm',
  island: 'Uncharted Island',
  treasure: 'Hidden Treasure',
  cursed_treasure: 'Cursed Gold',
  pirate: 'Pirates on the Horizon',
  port: 'Safe Harbor',
  rocks: 'Treacherous Reef',
  wreck: 'A Ghostly Wreck',
  death: 'Your Voyage Ends',
  maelstrom: 'The Maelstrom',
};

const CELL_ICONS: Record<string, string> = {
  sea:'〰', storm:'⛈', pirate:'☠', treasure:'✦',
  port: import.meta.env.BASE_URL + 'icons/port.png', kraken: import.meta.env.BASE_URL + 'icons/kraken.png', wreck: import.meta.env.BASE_URL + 'icons/wreck.png', island: import.meta.env.BASE_URL + 'icons/island.png', rocks: import.meta.env.BASE_URL + 'icons/rocks.png',
};
const CELL_COLOR_BY_ZONE: Record<number, Record<string, string>> = {
  1: { sea:'#1a3a4a', storm:'#2a1a4a', pirate:'#3a1010', treasure:'#2a2a00', port:'#0a2a2a', kraken:'#2a0a3a', wreck:'#2a1a0a', island:'#0a2a0a', rocks:'#1a1a1a', portal:'#1a0a3a' },
  2: { sea:'#1a2a3a', storm:'#3a0a5a', pirate:'#4a0a1a', treasure:'#2a1a00', port:'#0a1a2a', kraken:'#3a0a4a', wreck:'#3a1a0a', island:'#0a1a0a', rocks:'#0a0a1a', portal:'#2a0a4a' },
  3: { sea:'#0a1a2a', storm:'#2a0a3a', pirate:'#3a0505', treasure:'#1a1000', port:'#051015', kraken:'#200530', wreck:'#200a05', island:'#051005', rocks:'#050508', portal:'#150020' },
};
const CELL_GLOW_BY_ZONE: Record<number, Record<string, string>> = {
  1: { treasure:'#eedd44', port:'#44cccc', kraken:'#cc44ee', pirate:'#ee4444', portal:'#8866ff' },
  2: { treasure:'#cc9922', port:'#2299aa', kraken:'#aa22cc', pirate:'#cc2222', portal:'#6644cc' },
  3: { treasure:'#aa7700', port:'#116677', kraken:'#880099', pirate:'#aa0000', portal:'#440088' },
};

// Pastilles pros/cons stylees (remplace les emojis bruts)
function Pip({ ok }: { ok: boolean }) {
  return (<span style={{
    display:'inline-block', width:7, height:7, borderRadius:'50%', flexShrink:0,
    marginTop:6, marginRight:7,
    background: ok ? '#4ccf7e' : '#d9534f',
    boxShadow: ok ? '0 0 5px rgba(76,207,126,0.6)' : '0 0 5px rgba(217,83,79,0.6)',
  }} />);
}
function UpgradeDesc({ pros, cons, fontSize = 11, opacity = 0.55 }: { pros: readonly string[]; cons: readonly string[]; fontSize?: number; opacity?: number }) {
  const Row = (text: string, ok: boolean, key: string) => (
    <div key={key} style={{ display:'flex', alignItems:'flex-start', lineHeight:1.45 }}>
      <Pip ok={ok} />
      <span style={{ color:`rgba(255,255,255,${opacity})` }}>{text}</span>
    </div>
  );
  return (<div style={{ fontSize, display:'flex', flexDirection:'column', gap:3 }}>
    {pros.map((p, i) => Row(p, true, 'p'+i))}
    {cons.map((c, i) => Row(c, false, 'c'+i))}
  </div>);
}
// Resume texte court d'un upgrade (sans emoji) — pour tooltips/aperçus
const UPGRADES = [
  { id:'ghost',    name:'Ghost Ship',      pros:['Pirates ignore you. +2 vision.'], cons:['Cannot dock at ports. Krakens attracted on sea cells.'],  cost:80,  icon:'ghost',    build:'combat' },
  { id:'rider',    name:'Storm Rider',     pros:['Storm immunity. Storm cells give gold+score.','Hull+Rider synergy heals on storm.'], cons:['-1 HP every 2 turns. Repairs -50%.'],              cost:90,  icon:'rider',    build:'escape' },
  { id:'greed',    name:'Cursed Greed',    pros:['Gold x1.5 on combat.'], cons:['Cannot repair at port. Storm gets worse every 200g. Hunter speeds up at 800g.'],                           cost:60,  icon:'greed',    build:'gold'   },
  { id:'berserker',name:'Berserker',       pros:['Power x2. Weapon3 synergy = 15% crit chance.'], cons:['All damage received x2.'],                             cost:60,  icon:'berserker',build:'combat' },
  { id:'hunter',   name:'Treasure Hunter', pros:['All treasures revealed on map. x3 combo = treasure reward x2.'], cons:['Storm surges +10% more frequent.'],    cost:75,  icon:'hunter',   build:'gold'   },
  { id:'escape',   name:'Swift Sails',     pros:['Skip any dangerous event twice per run with no consequences. Save for the worst moments.'], cons:[],                                   cost:65,  icon:'escape',   build:'escape' },
] as const;
const BUILD_COLOR: Record<string,string> = { vision:'#6aaccc', gold:'#eedd44', combat:'#ee6644', escape:'#44cc88' };


const TUT_STEPS = [
  { id:'move1',       title:'Welcome, Captain!',         bubble:'You are a corsair fleeing a deadly storm. The storm advances every turn — never stop. Press AHEAD to sail north.', waitFor:'ahead' },
  { id:'storm',       title:'⛈ The Storm Counter',       bubble:'The storm just advanced. See the counter on the left — it dropped from 22. If it hits 0, you die. Press AHEAD again.', waitFor:'ahead' },
  { id:'pre_pirate',  title:'🗺 Something Ahead...',      bubble:'Pirates are on the next cell! Press AHEAD to engage them. Bold choices always reward more.', waitFor:'ahead' },
  { id:'pirate_fight',title:'🏴\u200d☠️ Pirates Attack!', bubble:'Pirates! Choose FIGHT — you take damage but earn gold and notoriety. Never pay tribute when you are strong.', waitFor:'choice0' },
  { id:'combo',       title:'🔥 Combo Multiplier',        bubble:'You fought and survived! Chaining dangers increases your score multiplier x1→x2→x3. Keep fighting to multiply all rewards. Press AHEAD.', waitFor:'ahead' },
  { id:'streak',      title:'💀 The Streak System',         bubble:'Your STREAK also transforms the world: streak 2 = +25% gold. Streak 3 = Hunter gets aggressive. Streak 4 = storm surges more + elite encounters. Streak 5 = cursed waters. Streak 6 = legendary zone. High risk, insane reward.', waitFor:'none' },
  { id:'pre_port',    title:'Port on Starboard!',        bubble:'There is a port to your right! Press STARBOARD to sail into it.', waitFor:'starboard' },
  { id:'pre_pirates', title:'Pirates Ahead!',            bubble:'A pirate ship is on the next cell. Press AHEAD to engage them.', waitFor:'ahead' },
  { id:'port_choice', title:'🏴 Enter the Port',          bubble:'You found a port! Choose DOCK to repair your hull and buy upgrades. Never skip a port with low hull.', waitFor:'choice0' },
  { id:'repair',      title:'🔧 Repair Your Hull',        bubble:'At port you can repair and buy upgrades. Press RUM BARREL to restore 8 HP for 25 gold.', waitFor:'repair' },
  { id:'upgrades',    title:'🛠 Components & Abilities',   bubble:'At port, upgrade your ship components: HULL for more HP, ARMEMENT for more power, NAVIGATION for better vision. Each has 3 levels but you can only max out 2 of them — choose your specialization. You can also equip up to 2 special abilities like Ghost Ship or Storm Rider.', waitFor:'none' },
  { id:'hunter',      title:'🐙 The Hunter',               bubble:'At turn 8, a creature spawns and tracks you. Watch the HUNTER bar on the left — it shows its mode (TRACKING → STALKING → ENRAGED) and awareness. Storms and ports reduce its awareness. Keep moving forward.', waitFor:'none' },
  { id:'portal',      title:'🌀 The Portal',               bubble:'After sailing deep enough into a zone, a glowing purple VORTEX appears ahead of you. Sail into it to cross into the next zone — The Storm Sea, then The Abyss. Each zone is deadlier but worth far more points, and entering one pushes the storm back. Watch the log for hints when reality starts to distort.', waitFor:'none' },
  { id:'done',        title:'🎓 You Are Ready!',          bubble:'Well done, Captain! Move forward, chain dangers for combos, visit ports, cross the portals, and never let the storm catch you. Good luck!', waitFor:'done' },
];


const renderCellIcon = (icon: string | undefined, size: number) =>
  !icon ? null : (icon.startsWith('http') || icon.startsWith('/'))
    ? <img src={icon} style={{ width:size, height:size, objectFit:'contain', borderRadius:'50%', mixBlendMode:'lighten', filter:`drop-shadow(0 0 12px rgba(200,160,48,0.6))` }} />
    : <span style={{ fontSize:size }}>{icon}</span>;

export default function CorsairGame({ walletAddress, account, username, onHome, tutorialMode, onTutorialDone, dailySeed }: { walletAddress: string | null; account?: any; username?: string | null; onHome: () => void; tutorialMode?: boolean; onTutorialDone?: () => void; dailySeed?: number }) {
  const [state, setState] = useState<GameState>(() => {
    const s = initGame(tutorialMode ? 'tutorial' : dailySeed);
    if (tutorialMode) {
      const cx = 6, cy = 10;
      const map = [-3,-2,-1,0,1].map(dy =>
        [-2,-1,0,1,2].map(dx => {
          const cell = s.grid[cy+dy]?.[cx+dx];
          return cell ? cell.type.substring(0,3) : '...';
        }).join(' ')
      ).join('\n');
      console.log('Tutorial map around ship:\n' + map);
    }
    return s;
  });
  const [shake, setShake] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [nftMinted, setNftMinted] = useState<string[]>([]);
  const [portalCinematic, setPortalCinematic] = useState<{lines: string[], zone: number} | null>(null);
  const [portalLineIndex, setPortalLineIndex] = useState(0);
  const [personalBest, setPersonalBest] = useState<number>(() => {
    return parseInt(localStorage.getItem('corsair_best_score') || '0');
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tutStep, setTutStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isDailyRun = dailySeed !== undefined;
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  const [cinematic, setCinematic] = useState<string | null>(null);
  const [_showDeathCinematic, _setShowDeathCinematic] = useState(false);
  const [showDeathScreen, setShowDeathScreen] = useState(false);
  const [showHunterAttack, setShowHunterAttack] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState<'ship'|'upgrades'|null>(null);
  const [_showKrakenCinematic, _setShowKrakenCinematic] = useState(false);
  const [_showPirateCinematic, _setShowPirateCinematic] = useState(false);
  const [_showWreckCinematic, _setShowWreckCinematic] = useState(false);
  const [_showIslandCinematic, _setShowIslandCinematic] = useState(false);
  const [_showAncientKrakenCinematic, _setShowAncientKrakenCinematic] = useState(false);
  const [_showMaelstromCinematic, _setShowMaelstromCinematic] = useState(false);
  const [_showRocksCinematic, _setShowRocksCinematic] = useState(false);
  const [_showTreasureCinematic, _setShowTreasureCinematic] = useState(false);
  const [_showCursedTreasureCinematic, _setShowCursedTreasureCinematic] = useState(false);
  const [_showStormCinematic, _setShowStormCinematic] = useState(false);
  const [_showPortCinematic, _setShowPortCinematic] = useState(false);
  const [tutBubble, setTutBubble] = useState(true);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [vignetteIntensity, setVignetteIntensity] = useState(0);

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 400); };
  const triggerFlash = (color: string) => { setFlashColor(color); setTimeout(() => setFlashColor(null), 150); };
  const s = state;
  const stormPct = Math.min(100,(1-s.stormDistance/10)*100);
  const hullColor = s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88';
  const canEscape = !s.escapeUsed && s.ship.upgrades.includes('escape') && s.event && s.event.choices[0].risk !== 'safe';

  // Cinematic unifiée : joue la vidéo d'intro 5s quand un événement à scène se déclenche
  useEffect(() => {
    if (isMobile) { setCinematic(null); return; }
    if (state.gameOver) return;  // la cinématique de mort est gérée par le death trigger
    const ct = state.event?.cellType;
    if (ct && SCENE_VIDEO[ct] && !tutorialMode) {
      setCinematic(ct);
      const t = setTimeout(() => setCinematic(null), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.turn]);

  // Port cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowPortCinematic(false); return; }
    if (state.event?.cellType === 'port' && !isMobile && !tutorialMode) {
      _setShowPortCinematic(true);
      setTimeout(() => _setShowPortCinematic(false), 5000);
    }
  }, [state.event, state.turn]);

  // Rocks cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowRocksCinematic(false); return; }
    if (state.gameOver) { _setShowRocksCinematic(false); return; }
    if (state.event?.cellType === 'rocks' && !isMobile) {
      _setShowRocksCinematic(true);
      const t = setTimeout(() => _setShowRocksCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.gameOver]);

  // Treasure cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowTreasureCinematic(false); return; }
    if (state.event?.cellType === 'treasure' && !isMobile) {
      _setShowTreasureCinematic(true);
      const t = setTimeout(() => _setShowTreasureCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.turn]);

  // Cursed treasure cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowCursedTreasureCinematic(false); return; }
    if (state.event?.cellType === 'cursed_treasure' && !isMobile) {
      _setShowCursedTreasureCinematic(true);
      const t = setTimeout(() => _setShowCursedTreasureCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.turn]);

  // Storm cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowStormCinematic(false); return; }
    if (state.event?.cellType === 'storm' && !isMobile) {
      _setShowStormCinematic(true);
      const t = setTimeout(() => _setShowStormCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.gameOver]);

  // Ancient Kraken cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowAncientKrakenCinematic(false); return; }
    if (state.event?.cellType === 'ancient_kraken' && !isMobile) {
      _setShowAncientKrakenCinematic(true);
      const t = setTimeout(() => _setShowAncientKrakenCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.gameOver]);

  // Maelstrom cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowMaelstromCinematic(false); return; }
    if (state.event?.cellType === 'maelstrom' && !isMobile) {
      _setShowMaelstromCinematic(true);
      const t = setTimeout(() => _setShowMaelstromCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.gameOver]);

  // Island cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowIslandCinematic(false); return; }
    if (state.event?.cellType === 'island' && !isMobile) {
      _setShowIslandCinematic(true);
      const t = setTimeout(() => _setShowIslandCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.gameOver]);

  // Wreck cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowWreckCinematic(false); return; }
    if (state.gameOver) { _setShowWreckCinematic(false); return; }
    if (state.event?.cellType === 'wreck' && !isMobile) {
      _setShowWreckCinematic(true);
      const t = setTimeout(() => _setShowWreckCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.turn]);

  // Pirate cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowPirateCinematic(false); return; }
    if (state.gameOver) { _setShowPirateCinematic(false); return; }
    if (state.event?.cellType === 'pirate' && !isMobile && !tutorialMode) {
      _setShowPirateCinematic(true);
      const t = setTimeout(() => _setShowPirateCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.turn]);

  // Kraken cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowKrakenCinematic(false); return; }
    if (state.event?.cellType === 'kraken' && !isMobile) {
      _setShowKrakenCinematic(true);
      const t = setTimeout(() => _setShowKrakenCinematic(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.gameOver]);

  // Portal zone transition cinematic
  const prevZoneRef = useRef(1);
  useEffect(() => {
    const currentZone = state.currentZone ?? 1;
    if (currentZone > prevZoneRef.current) {
      const config = ZONE_CONFIG[currentZone];
      setPortalCinematic({ lines: [...config.transitionText, '', `You have entered:`, config.name.toUpperCase()], zone: currentZone });
      setPortalLineIndex(0);
      prevZoneRef.current = currentZone;
    }
  }, [state.currentZone]);

  useEffect(() => {
    if (!portalCinematic) return;
    if (portalLineIndex >= portalCinematic.lines.length) {
      setTimeout(() => setPortalCinematic(null), 1000);
      return;
    }
    const t = setTimeout(() => setPortalLineIndex(i => i + 1), 800);
    return () => clearTimeout(t);
  }, [portalCinematic, portalLineIndex]);

  // Personal best check
  useEffect(() => {
    if (state.gameOver && !tutorialMode && state.score > 0) {
      if (state.score > personalBest) {
        setPersonalBest(state.score);
        setIsNewRecord(true);
        localStorage.setItem('corsair_best_score', state.score.toString());
      }
    }
  }, [state.gameOver]);

  // Death cinematic trigger
  useEffect(() => {
    if (state.gameOver && !tutorialMode) {
      if (dailySeed !== undefined) markDailyPlayed();
      if (!isMobile) {
        // Si le hunter attack est en cours, attendre qu'il se termine
        const delay = hunterAttackRef.current ? 8000 : 0;
        setTimeout(() => {
          setShowHunterAttack(false);
          setCinematic('death');
          // Filet de sécurité : si la vidéo ne se termine pas (erreur de chargement),
          // on affiche quand même l'écran de mort après 9s (death.mp4 dure ~8s).
          setTimeout(() => { setShowDeathScreen(s => s || true); }, 9000);
        }, delay);
      } else {
        setShowDeathScreen(true);
      }
    } else {
      setShowDeathScreen(false);
    }
  }, [state.gameOver]);

  // Hunter attack detection
  const hunterAttackRef = useRef(false);
  useEffect(() => {
    if (state.log?.includes('Tentacles rake the hull')) {
      hunterAttackRef.current = true;
      setShowHunterAttack(true);
      setTimeout(() => {
        hunterAttackRef.current = false;
        setShowHunterAttack(false);
      }, 8000);
    }
  }, [state.log, state.turn]);

  // Visual feedback effects
  useEffect(() => {
    // Storm surge flash
    if (state.log?.includes('⚡ Storm surge')) triggerFlash('rgba(100,150,255,0.35)');
    // Kraken/legendary flash
    if (state.event?.cellType === 'kraken' || state.event?.cellType === 'ancient_kraken') triggerFlash('rgba(150,0,255,0.3)');
    if (state.event?.cellType === 'ancient_kraken') triggerFlash('rgba(200,160,48,0.4)');
    // Hunter vignette
    const h = state.hunter;
    if (h?.active) {
      const dist = Math.abs(h.x - state.ship.x) + Math.abs(h.y - state.ship.y);
      setVignetteIntensity(dist <= 2 ? 0.45 : dist <= 4 ? 0.25 : 0);
    } else {
      setVignetteIntensity(0);
    }
  }, [state]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (state.gameOver || state.event || state.showPort) return;
      if (e.key === 'ArrowLeft')  move(-1, 0);
      if (e.key === 'ArrowUp')    move(0, -1);
      if (e.key === 'ArrowRight') move(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.gameOver, state.event, state.showPort, state.turn]);

  const move = (dx:number, dy:number) => {
    if (tutorialMode) {
      const step = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
      const isMovStep = step.waitFor === 'ahead' || step.waitFor === 'starboard';
      if (!isMovStep) return;
      if (step.waitFor === 'starboard' && dx !== 1) return;
      if (step.waitFor === 'ahead' && dx !== 0) return;
    }
    setState(s => moveShip(s, dx, dy));
    if (tutorialMode) {
      const nextStep = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
      // Only advance immediately for non-event moves
      // Event moves are handled by useEffect watching state.event
      const willTriggerEvent = ['pre_pirate', 'pre_port'].includes(nextStep.id);
      if (!willTriggerEvent) {
        setTutStep(i => i + 1);
        setTutBubble(true);
      }
    }
  };
  const resolve = (i:number) => {
    setState(s => {
      const next = resolveEvent(s, i);
      if (next.ship.hull < s.ship.hull) triggerShake();
      return next;
    });
    if (tutorialMode) {
      const step = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
      if (step.waitFor === 'choice0' && i === 0) { setTutStep(idx => idx + 1); setTutBubble(true); }
    }
  };
  const skip = () => setState(s => skipEventFn(s));
  const upgradeComp = (c: 'hull'|'weapon'|'nav') => setState(s => upgradeComponent(s, c));

  const restart = () => setState(initGame());

  // Ambient music
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    const audio = new Audio(import.meta.env.BASE_URL + 'sounds/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => {});
    audioRef.current = audio;
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);



  // Tutorial: auto-advance step when event appears
  useEffect(() => {
    if (!tutorialMode) return;
    const step = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
    if (state.event && (state.event.cellType === 'pirate' || state.event.cellType === 'port') && (step.waitFor === 'ahead' || step.waitFor === 'starboard')) {
      setTutStep(i => i + 1);
      setTutBubble(true);
    }
  }, [state.event, state.turn]);

  return (
    <motion.div
      animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height:'100dvh', width:'100vw', background:'#080f18',
        boxShadow: s.stormDistance <= 2 ? 'inset 0 0 80px rgba(220,30,30,0.6)' : s.stormDistance <= 4 ? 'inset 0 0 50px rgba(220,100,30,0.3)' : 'none', color:'#e8e0d0', fontFamily:"'Pirata One', cursive", display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' }}>

      {/* Flash overlay */}
      {flashColor && (
        <motion.div initial={{ opacity:1 }} animate={{ opacity:0 }} transition={{ duration:0.15 }}
          style={{ position:'fixed', inset:0, background:flashColor, zIndex:99, pointerEvents:'none' }} />
      )}

      {/* Hunter vignette */}
      {vignetteIntensity > 0 && (
        <motion.div animate={{ opacity:[vignetteIntensity, vignetteIntensity*0.6, vignetteIntensity] }}
          transition={{ repeat:Infinity, duration:1.5, ease:'easeInOut' }}
          style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse at center, transparent 40%, rgba(80,0,80,0.8) 100%)', zIndex:98, pointerEvents:'none' }} />
      )}

      {/* Low hull pulse */}
      {s.ship.hull <= 5 && !s.gameOver && (
        <motion.div animate={{ opacity:[0.4, 0, 0.4] }} transition={{ repeat:Infinity, duration: s.ship.hull <= 1 ? 0.4 : s.ship.hull <= 3 ? 0.6 : 1.0 }}
          style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse at center, transparent 50%, rgba(220,30,30,0.5) 100%)', zIndex:97, pointerEvents:'none' }} />
      )}

      {/* TOP BAR */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '6px 8px' : '16px 28px', background:'rgba(0,0,0,0.5)', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
        <div style={{ fontWeight:700, color:'#c8a030', fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center', gap:4 }}><img src={anchorImg} style={{ width: isMobile ? 28 : 56, height: isMobile ? 28 : 56, objectFit:'contain' }}/>{!isMobile && ' CORSAIR'}</div>
        <div style={{ display:'flex', gap: isMobile ? 8 : 24 }}>
          {(isMobile
            ? [{icon:'hull',label:'HULL',val:`${s.ship.hull}/${s.ship.maxHull}`,color:hullColor},{icon:'gold',label:'GOLD',val:s.ship.gold,color:'#eedd44'},{icon:'power',label:'POWER',val:s.ship.power,color:'#ee8844'}]
            : [{icon:'hull',label:'HULL',val:`${s.ship.hull}/${s.ship.maxHull}`,color:hullColor},{icon:'gold',label:'GOLD',val:s.ship.gold,color:'#eedd44'},{icon:'vision',label:'VISION',val:s.ship.vision,color:'#6aaccc'},{icon:'power',label:'POWER',val:s.ship.power,color:'#ee8844'},{icon:'turn',label:'TURN',val:s.turn,color:'rgba(255,255,255,0.4)'},{icon:'turn',label:(ZONE_CONFIG[s.currentZone??1]?.name??'The Coasts').toUpperCase(),val:'',color:'#aa44ee'}]
          ).map(st => (
            <div key={st.label} style={{ textAlign:'center' }}>
              <div style={{ fontSize: isMobile ? 10 : 17, color:'rgba(255,255,255,0.7)', letterSpacing:1, fontFamily:"'Pirata One', cursive" }}>{st.label}</div>
              <div style={{ display:'flex', alignItems:'center', gap:4, fontWeight:700, color:st.color }}><img src={({hull:hullImg,gold:goldImg,vision:visionImg,power:powerImg,turn:turnImg} as any)[st.icon] || hullImg} style={{ width: isMobile ? 24 : 40, height: isMobile ? 24 : 40, objectFit:'contain' }}/><span style={{ fontSize: isMobile ? 14 : 22, fontFamily:"'Cinzel', serif" }}>{st.val}</span></div>
            </div>
          ))}
        </div>
        {!isMobile && <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ fontSize:26, fontWeight:700, color:'#eedd44', display:'flex', alignItems:'center', gap:6 }}><img src={scoreImg} style={{ width:56, height:56, objectFit:'contain' }}/><span style={{ fontFamily:"'Cinzel', serif" }}>{s.score}</span> pts</div>
          <button onClick={() => setMuted(m => !m)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', fontSize:18, cursor:'pointer', borderRadius:8, padding:'6px 10px', fontFamily:"'Cinzel', serif" }}>
            {muted ? '🔇' : '🔊'}
          </button>
        </div>}
        {isMobile && <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:13, fontWeight:700, color:'#eedd44', fontFamily:"'Cinzel', serif" }}>{s.score}pts</span>
          <button onClick={() => setMuted(m => !m)} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.4)', fontSize:14, cursor:'pointer' }}>{muted ? '🔇' : '🔊'}</button>
        </div>}
      </div>

      {/* Mobile Hunter Bar */}
      {isMobile && s.hunter?.active && (
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 10px', background:'rgba(80,0,80,0.3)', borderBottom:'1px solid rgba(180,30,180,0.3)' }}>
          <span style={{ fontSize:11, color:'rgba(200,100,220,0.9)', fontFamily:"'Cinzel', serif", letterSpacing:1 }}>🐙</span>
          <div style={{ fontSize:11, color: s.hunter.mode==='frenzy'?'#ff6666':s.hunter.mode==='stalking'?'#dd88ff':'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:1, minWidth:70 }}>
            {s.hunter.mode === 'frenzy' ? '⚡ ENRAGED' : s.hunter.mode === 'stalking' ? '👁 STALKING' : s.hunter.mode === 'searching' ? '🌫 SEARCHING' : '🧭 TRACKING'}
          </div>
          <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.1)', borderRadius:2 }}>
            <div style={{ height:3, borderRadius:2, width:`${s.hunter.awareness}%`, background: s.hunter.awareness>=80?'#ee4444':s.hunter.awareness>=50?'#cc44ee':'#7744aa', transition:'width 0.5s' }}/>
          </div>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:"'Cinzel', serif" }}>{s.hunter.awareness}%</span>
        </div>
      )}

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', overflow:'hidden', position:'relative' }}>

        {/* LEFT — Storm panel */}
        <div style={{ width: isMobile ? 0 : 260, padding: isMobile ? 0 : '16px 12px', overflow:'hidden', display:'flex', flexDirection:'column', gap:10, borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)', transition:'width 0.3s' }}>
          <div style={{ background: stormPct>70?'rgba(180,30,30,0.2)':'rgba(255,255,255,0.03)', border:`1px solid ${stormPct>70?'rgba(220,50,50,0.5)':'rgba(255,255,255,0.08)'}`, borderRadius:10, padding:'12px 10px' }}>
            <div style={{ fontSize:14, color: stormPct>70?'#ee4444':'rgba(255,255,255,0.3)', letterSpacing:2, marginBottom:6 }}>⛈ STORM</div>
            <div style={{ fontSize:29, fontWeight:700, color: stormPct>70?'#ee4444':'#ee8844' }}>{s.stormDistance}</div>
            <div style={{ fontSize:20, color:'rgba(255,255,255,0.8)', fontFamily:"'IM Fell English', cursive", marginTop:2 }}>turns until impact</div>
            <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2, marginTop:8 }}>
              <motion.div animate={{ width:`${stormPct}%` }} transition={{ duration:0.5 }}
                style={{ height:4, borderRadius:2, background:`linear-gradient(90deg,#2a5a2a,#ee4444)` }}/>
            </div>
          </div>

          {/* Hunter HUD */}
          {s.hunter && (
            <div style={{ background:'rgba(180,30,180,0.08)', border:`1px solid ${s.hunter.mode==='frenzy'||s.hunter.mode==='stalking'?'rgba(220,50,220,0.5)':'rgba(255,255,255,0.08)'}`, borderRadius:10, padding:'12px 10px', marginTop:4 }}>
              <div style={{ fontSize:13, color:'rgba(200,100,220,0.8)', letterSpacing:2, marginBottom:6 }}>🐙 HUNTER</div>
              {/* Mode badge */}
              <div style={{ display:'inline-block', padding:'2px 10px', borderRadius:6, fontSize:11, letterSpacing:2, fontFamily:"'Cinzel', serif", marginBottom:8,
                background: s.hunter.mode==='frenzy' ? 'rgba(220,30,30,0.3)' : s.hunter.mode==='stalking' ? 'rgba(180,30,180,0.3)' : s.hunter.mode==='searching' ? 'rgba(30,100,180,0.3)' : 'rgba(255,255,255,0.06)',
                color: s.hunter.mode==='frenzy' ? '#ff6666' : s.hunter.mode==='stalking' ? '#dd88ff' : s.hunter.mode==='searching' ? '#66aaff' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${s.hunter.mode==='frenzy'?'rgba(220,30,30,0.6)':s.hunter.mode==='stalking'?'rgba(180,30,180,0.5)':'rgba(255,255,255,0.1)'}`,
              }}>
                {s.hunter.mode === 'frenzy' ? '⚡ ENRAGED' : s.hunter.mode === 'stalking' ? '👁 STALKING' : s.hunter.mode === 'searching' ? '🌫 SEARCHING' : '🧭 TRACKING'}
              </div>
              {/* Awareness bar */}
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1, marginBottom:4 }}>AWARENESS {s.hunter.awareness}%</div>
              <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2 }}>
                <motion.div animate={{ width:`${s.hunter.awareness}%` }} transition={{ duration:0.5 }}
                  style={{ height:4, borderRadius:2, background: s.hunter.awareness>=80?'#ee4444':s.hunter.awareness>=50?'#cc44ee':'#7744aa' }}/>
              </div>
            </div>
          )}

          {/* Upgrades owned */}
          <div style={{ fontSize:17, color:'rgba(255,255,255,0.6)', letterSpacing:2, marginTop:8 }}>EQUIPPED</div>
          {s.ship.upgrades.length === 0
            ? <div style={{ fontSize:17, color:'rgba(255,255,255,0.5)', fontStyle:'italic' }}>None yet</div>
            : s.ship.upgrades.map(id => {
              const u = UPGRADES.find(u=>u.id===id)!;
              return <div key={id} style={{ fontSize:14, color:BUILD_COLOR[u.build], display:'flex', alignItems:'center', gap:6 }}><img src={UPGRADE_ICONS[id]} style={{width:20,height:20,objectFit:'contain'}}/>{u.name}</div>;
            })
          }
          {s.upgradeToken && <div style={{ fontSize:14, color:'#eedd44', marginTop:4 }}>✦ Free upgrade!</div>}

          {/* Composants navire */}
          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:3, fontFamily:"'Cinzel', serif", marginBottom:10 }}>SHIP</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {([
                { key:'hull',   label:'Hull',   icon:'⚓', color:'#44cc88', levels:['20 HP','28 HP','38 HP'], sub:['Integrity','Reinforced','Ironclad'] },
                { key:'weapon', label:'Weapon', icon:'⚔️', color:'#ee6644', levels:['P2','P5','P9'],         sub:['Cannons','Iron Guns','Heavy Fire'] },
                { key:'nav',    label:'Navigation',    icon:'🔭', color:'#6aaccc', levels:['V1','V2','V3'],         sub:['Basic','Chart','Star Reader'] },
              ] as const).map(comp => {
                const lvl = s.ship.levels[comp.key];
                const isMaxed = lvl === 2;
                const gc = comp.color;
                const romans = ['I','II','III'];
                return (
                  <motion.div key={comp.key}
                    animate={isMaxed ? { filter:[`drop-shadow(0 0 3px ${gc}00)`,`drop-shadow(0 0 8px ${gc}bb)`,`drop-shadow(0 0 3px ${gc}00)`] } : {}}
                    transition={{ repeat:Infinity, duration:2 }}
                    style={{ background:`linear-gradient(135deg, rgba(0,0,0,0.4), ${gc}08)`, border:`1px solid ${gc}${isMaxed?'66':'22'}`, borderRadius:10, padding:'8px 10px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <span style={{ fontSize:16 }}>{comp.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, color: gc, fontFamily:"'Pirata One', cursive", letterSpacing:1 }}>{comp.label}</div>
                        <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:"'Cinzel', serif" }}>{comp.sub[lvl]}</div>
                      </div>
                      <div style={{ fontSize:14, color: gc, fontFamily:"'Cinzel', serif", fontWeight:700 }}>
                        {comp.levels[lvl]}{isMaxed ? ' ★' : ''}
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:0 }}>
                      {[0,1,2].map((i,idx) => (
                        <div key={i} style={{ display:'flex', alignItems:'center' }}>
                          {idx > 0 && (
                            <div style={{ width:10, height:2, background: i <= lvl ? `${gc}88` : 'rgba(255,255,255,0.08)' }}/>
                          )}
                          <motion.div
                            animate={isMaxed && i===2 ? { scale:[1,1.15,1] } : {}}
                            transition={{ repeat:Infinity, duration:1.5 }}
                            style={{
                              width:28, height:28,
                              clipPath:'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                              background: i <= lvl
                                ? `linear-gradient(135deg, ${gc}dd, ${gc}66)`
                                : 'rgba(255,255,255,0.05)',
                              border:'none',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              boxShadow: i <= lvl ? `0 0 8px ${gc}44` : 'none',
                            }}>
                            <span style={{ fontSize:9, color: i <= lvl ? '#000' : 'rgba(255,255,255,0.2)', fontFamily:"'Cinzel', serif", fontWeight:700 }}>
                              {romans[i]}
                            </span>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>


        </div>

        {/* CENTER — Map */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '6px 4px' : '10px', position:'relative' }}>
          {isMobile && (
            <div style={{ display:'flex', gap:12, marginBottom:6, fontSize:13, fontFamily:"'Cinzel', serif" }}>
              <span style={{ color: s.stormDistance <= 4 ? '#ee4444' : '#ee8844' }}>⛈ {s.stormDistance} turns</span>
              <span style={{ color:'#cc44ee' }}>{ZONE_CONFIG[s.currentZone??1]?.name??'The Coasts'}</span>
              <span style={{ color:'#eedd44' }}>✦ {s.score} pts</span>
            </div>
          )}

          {/* Grid */}
          <div style={{ position:'relative' }}>
            {/* Fog overlay */}
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)', pointerEvents:'none', zIndex:2, borderRadius:8 }}/>

            <div style={{ display:'grid', gridTemplateColumns:`repeat(${s.ship.vision*2+1},1fr)`, gap:4 }}>
              {Array.from({length: s.ship.vision*2+1}, (_,i) => i - s.ship.vision).flatMap(dy =>
                Array.from({length: s.ship.vision*2+1}, (_,i) => i - s.ship.vision).map(dx => {
                const x = s.ship.x+dx, y = s.ship.y+dy;
                // Prediction tiles — where hunter might move next
                const hunterPredictions: Set<string> = (() => {
                  const set = new Set<string>();
                  if (!s.hunter?.active) return set;
                  const hx = s.hunter.x, hy = s.hunter.y;
                  const tx = s.ship.x, ty = s.ship.y;
                  if (s.hunter.mode === 'searching') {
                    // Random adjacent
                    [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1]].forEach(([ddx,ddy]) => set.add(`${hx+ddx}-${hy+ddy}`));
                  } else {
                    // Likely next step (orthogonal priority)
                    const distX = Math.abs(tx-hx), distY = Math.abs(ty-hy);
                    if (distX >= distY) set.add(`${hx+(tx>hx?1:-1)}-${hy}`);
                    if (distY >= distX) set.add(`${hx}-${hy+(ty>hy?1:-1)}`);
                    if (distX === distY) { set.add(`${hx+(tx>hx?1:-1)}-${hy}`); set.add(`${hx}-${hy+(ty>hy?1:-1)}`); }
                  }
                  return set;
                })();
                const isPredicted = s.hunter?.active && !s.hunter?.mode?.includes('tracking') && hunterPredictions.has(`${x}-${y}`) && x!==s.hunter.x && y!==s.hunter.y;
                const cell = (x>=0&&x<GRID_SIZE&&y>=0&&y<GRID_SIZE) ? s.grid[y][x] : {type:'sea' as const,revealed:false,visited:false,value:0};
                const absX = s.ship.x + dx;
                const absY = s.ship.y + dy;
                const isHunter = s.hunter?.active && s.hunter.x === absX && s.hunter.y === absY;
                const isShip = dx===0 && dy===0;
                const isRevealed = cell.revealed || cell.visited;
                const isStormed = (cell as any).stormed;
                const zonePalette = CELL_COLOR_BY_ZONE[s.currentZone ?? 1] ?? CELL_COLOR_BY_ZONE[1];
                const zoneGlow = CELL_GLOW_BY_ZONE[s.currentZone ?? 1] ?? CELL_GLOW_BY_ZONE[1];
                const glow = isStormed ? '#cc2222' : zoneGlow[cell.type];
                const vSize = s.ship.vision * 2 + 1; const CELL_S = isMobile ? Math.floor((window.innerWidth - 16) / vSize) : Math.floor(Math.min(window.innerWidth * 0.50, window.innerHeight * 0.62) / vSize) - 4;
                return (
                  <motion.div key={`${x}-${y}`}
                    initial={isRevealed ? { opacity:0, scale:0.8 } : false}
                    animate={{ opacity:1, scale:1 }}
                    style={{
                      width:CELL_S, height:CELL_S,
                      background: isShip ? '#0a2a4a' : isStormed ? '#2a0505' : isRevealed ? (zonePalette[cell.type] ?? '#050a0f') : (s.currentZone === 2 ? '#03050a' : s.currentZone === 3 ? '#020204' : '#050a0f'),
                      border: isShip ? '2px solid #4a8acc' : isStormed ? '1px solid #cc222244' : isRevealed ? `1px solid ${glow ? glow+'44' : 'rgba(255,255,255,0.08)'}` : '1px solid rgba(255,255,255,0.03)',
                      borderRadius:8,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize: isShip ? 26 : 20,
                      boxShadow: isShip ? '0 0 20px rgba(74,138,204,0.4)' : glow && isRevealed ? `0 0 10px ${glow}44` : 'none',
                      position:'relative', cursor:'default',
                    }}>
                    {isShip && (
                      <>
                        <motion.div animate={{ y:[0,-3,0] }} transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}>
                          <img src={`${import.meta.env.BASE_URL}icons/ship.png`} style={{ width: CELL_S*0.82, height: CELL_S*0.82, objectFit:'contain', filter:'drop-shadow(0 0 10px rgba(74,138,204,0.9))' }}/>
                        </motion.div>
                        <div style={{ position:'absolute', bottom:3, left:'5%', width:'90%', display:'flex', alignItems:'center', gap:3 }}>
                          <div style={{ flex:1, height:3, background:'rgba(0,0,0,0.5)', borderRadius:2 }}>
                            <div style={{ width:`${(s.ship.hull/s.ship.maxHull)*100}%`, height:'100%', borderRadius:2, background: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88', transition:'width 0.3s' }}/>
                          </div>
                          <div style={{ fontSize: Math.max(7, CELL_S*0.16), color: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88', fontFamily:"'Cinzel', serif", fontWeight:700, textShadow:'0 1px 3px rgba(0,0,0,0.9)', lineHeight:1, flexShrink:0 }}>{s.ship.hull}</div>
                        </div>
                      </>
                    )}
                    {!isHunter && !isShip && !isRevealed && cell.type === 'portal' && (
                      <motion.div animate={{ opacity:[0.55,1,0.55], scale:[0.9,1.08,0.9] }} transition={{ repeat:Infinity, duration:1.6, ease:'easeInOut' }}
                        style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'radial-gradient(circle, #aa77ff 0%, #6644cc55 45%, transparent 75%)', borderRadius:4, boxShadow:'0 0 12px #8866ff' }}>
                        <div style={{ fontSize: CELL_S*0.5, lineHeight:1, filter:'drop-shadow(0 0 6px #aa77ff)' }}>🌀</div>
                      </motion.div>
                    )}
                    {!isHunter && !isShip && isRevealed && (
                      <img src={`${import.meta.env.BASE_URL}icons/${cell.type}.png`} style={{ width: CELL_S*0.82, height: CELL_S*0.82, opacity: cell.visited ? 0.35 : 1, objectFit:'contain', mixBlendMode:'screen' as const }}/>
                    )}
                    {isHunter && !isShip && (
                      <motion.div animate={{ scale:[1,1.2,1], opacity:[0.8,1,0.8] }} transition={{ repeat:Infinity, duration:1.5 }}
                        style={{ filter:'drop-shadow(0 0 12px #cc44ee)' }}><img src={`${import.meta.env.BASE_URL}icons/hunter.png`} style={{width:CELL_S*0.82,height:CELL_S*0.82,objectFit:'contain'}}/></motion.div>
                    )}
                    {isPredicted && !isShip && !isHunter && (
                      <motion.div animate={{ opacity:[0,0.4,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
                        style={{ position:'absolute', inset:0, borderRadius:8, background:'rgba(180,30,220,0.15)', border:'1px solid rgba(180,30,220,0.3)', pointerEvents:'none' }}/>
                    )}
                    {isHunter && !isShip && !isRevealed && (
                      <motion.div animate={{ opacity:[0.3,0.6,0.3] }} transition={{ repeat:Infinity, duration:2 }}
                        style={{ filter:'drop-shadow(0 0 8px #aa22cc)' }}>
                        <img src={`${import.meta.env.BASE_URL}icons/hunter.png`} style={{width:CELL_S*0.82,height:CELL_S*0.82,objectFit:'contain',opacity:0.4,filter:'grayscale(0.8) brightness(0.5)'}}/>
                      </motion.div>
                    )}
                    {!isHunter && !isShip && !isRevealed && (
                      <span style={{ fontSize:21, color:'rgba(255,255,255,0.06)', fontWeight:700 }}>?</span>
                    )}
                  </motion.div>
                );
              }))})
            </div>
          </div>

          {/* Combo multiplier + streak effects */}
          {s.dangerStreak > 0 && (
            <motion.div
              key={s.dangerStreak}
              initial={{ scale:0.6, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              transition={{ type:'spring', stiffness:300 }}
              style={{
                textAlign:'center',
                letterSpacing:2,
              }}>
              {s.scoreMultiplier > 1 && (
                <div style={{
                  fontSize: s.scoreMultiplier >= 3 ? 42 : 32,
                  fontWeight:700,
                  color: s.scoreMultiplier >= 3 ? '#ee4444' : '#eedd44',
                  letterSpacing:4,
                  textShadow: s.scoreMultiplier >= 3
                    ? '0 0 30px #ee4444, 0 0 60px #ee444466'
                    : '0 0 20px #eedd44, 0 0 40px #eedd4466',
                  filter: s.scoreMultiplier >= 3 ? 'brightness(1.3)' : 'brightness(1.1)',
                }}>
                  {s.scoreMultiplier >= 3 ? '🔥🔥🔥' : '🔥'} ×{s.scoreMultiplier} COMBO
                </div>
              )}
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:2, marginTop:4 }}>
                STREAK {s.dangerStreak}
              </div>
              {s.dangerStreak >= 3 && (
                <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ repeat:Infinity, duration:1.2 }}
                  style={{ fontSize:11, color:'#ee8844', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  🐙 HUNTER ALERT
                </motion.div>
              )}
              {s.dangerStreak >= 4 && (
                <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ repeat:Infinity, duration:0.9 }}
                  style={{ fontSize:11, color:'#ee4444', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  ⛈ STORM SURGE +8%
                </motion.div>
              )}
              {s.dangerStreak >= 5 && (
                <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:0.7 }}
                  style={{ fontSize:11, color:'#cc44ee', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  💀 CURSED WATERS
                </motion.div>
              )}
              {s.dangerStreak >= 6 && (
                <motion.div animate={{ opacity:[1,0.2,1] }} transition={{ repeat:Infinity, duration:0.5 }}
                  style={{ fontSize:11, color:'#ff2222', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  ☠️ LEGENDARY ZONE
                </motion.div>
              )}
            </motion.div>
          )}
          {/* Mini-map Gold Detector / Treasure Hunter */}
          {(s.ship.upgrades.includes('hunter')) && (
            <div style={{ position:'relative', marginBottom:8 }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:3, textAlign:'center', marginBottom:4, fontFamily:"'Cinzel', serif" }}>NAVIGATOR</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:1, width:120, margin:'0 auto', border:'1px solid rgba(255,255,255,0.1)', borderRadius:4, padding:2, background:'rgba(0,0,0,0.4)' }}>
                {Array.from({length:12}, (_,y) => Array.from({length:12}, (_,x) => {
                  const cell = s.grid[y][x];
                  const isShip = x===s.ship.x && y===s.ship.y;
                  const isHunter = s.hunter?.active && x===s.hunter.x && y===s.hunter.y;
                  const isTreasure = cell.revealed && !cell.visited && (cell.type==='treasure'||cell.type==='cursed_treasure');
                  const isPort = cell.revealed && !cell.visited && cell.type==='port';
                  const bg = isShip ? '#4a8acc' : isHunter ? '#ee4444' : isTreasure ? '#eedd44' : isPort ? '#44cccc' : cell.revealed ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)';
                  return <div key={`${x}-${y}`} style={{ width:8, height:8, background:bg, borderRadius: isHunter || isShip ? 4 : 1 }}/>;
                }))}
              </div>
            </div>
          )}
          {/* Dark Compass warning */}
          {false && (() => {
            const dangerTypes = ['pirate','kraken','storm','ancient_kraken','maelstrom'];
            let closestDanger: {type:string, dist:number} | null = null; // eslint-disable-line
            for (let dy=-2; dy<=2; dy++) for (let dx=-2; dx<=2; dx++) {
              const x = s.ship.x+dx, y = s.ship.y+dy;
              if (x<0||x>=12||y<0||y>=12) continue;
              const cell = s.grid[y][x];
              if (cell.revealed && !cell.visited && dangerTypes.includes(cell.type)) {
                const dist = Math.abs(dx)+Math.abs(dy);
                if (!closestDanger || dist < (closestDanger as {type:string,dist:number}).dist) closestDanger = {type:cell.type, dist};
              }
            }
            if (!closestDanger) return null;
            const cd = closestDanger as {type:string, dist:number};
            return (
              <div style={{ fontSize:13, color: cd.dist <= 1 ? '#ee4444' : '#ee8844', letterSpacing:2, textAlign:'center', marginBottom:4, fontFamily:"'Cinzel', serif" }}>
                ⚠️ {cd.type.toUpperCase()} — {cd.dist} {cd.dist <= 1 ? 'CELL AWAY' : 'CELLS AWAY'}
              </div>
            );
          })()}
          {/* Log */}
          <div style={{ marginTop:10, textAlign:'center', maxWidth:420, paddingRight: isMobile ? 80 : 0 }}>
            {(() => {
              const parts = (s.log ?? '').split('. ').map(p => p.trim()).filter(Boolean);
              const head = parts[0] ? parts[0].replace(/\.+$/, '') : '';
              const rest = parts.slice(1).join('. ');
              return (<>
                <div style={{ fontSize:18, color:'rgba(255,255,255,0.95)', fontFamily:"'IM Fell English', cursive", lineHeight:1.4 }}>{head}{head ? '.' : ''}</div>
                {rest && <div style={{ marginTop:4, fontSize:13.5, color:'rgba(255,255,255,0.5)', fontFamily:"'IM Fell English', cursive", lineHeight:1.4 }}>{rest}{rest.endsWith('.') ? '' : '.'}</div>}
              </>);
            })()}
          </div>
          {s.portalHint && (
            <div style={{ marginTop:6, fontSize:14, color:'#8866ff', fontFamily:"'IM Fell English', cursive", textAlign:'center', fontStyle:'italic', animation:'pulse 2s infinite' }}>
              ✦ {s.portalHint} ✦
            </div>
          )}
        </div>

        {/* RIGHT — Next zone hints + upgrades shop */}
        <div style={{ width: isMobile ? 0 : 260, minWidth: isMobile ? 0 : 260, padding: isMobile ? 0 : '16px 12px', display: isMobile ? 'none' : 'flex', flexDirection:'column', gap:10, borderLeft:'1px solid rgba(255,255,255,0.05)', pointerEvents: s.showPort ? 'none' : 'auto', opacity: s.showPort ? 0.4 : 1, overflow:'hidden' }}>
          {/* Upgrades shop */}
          <div style={{ fontSize:17, color:'rgba(255,255,255,0.9)', letterSpacing:2 }}>UPGRADES</div>
          <div style={{ display:'flex', flexDirection:'column', gap:5, overflowY:'auto' }}>
            {UPGRADES.map(upg => {
              const owned = s.ship.upgrades.includes(upg.id as UpgradeId);
              const inCart = cart.includes(upg.id);
              const free = s.upgradeToken && s.showPort;
              const cost = free ? 0 : upg.cost;
              const canBuy = !owned && !inCart && s.ship.gold >= cost && s.showPort;
              const bc = BUILD_COLOR[upg.build];
              return (
                <div key={upg.id} onClick={() => { if (!s.showPort) return; if (inCart) { setCart(c => c.filter(x => x !== upg.id)); } else if (canBuy) { setCart(c => [...c, upg.id]); } }}
                  style={{ background: owned?`${bc}14`:'rgba(255,255,255,0.02)', border:`1px solid ${owned?bc+'44':canBuy?bc+'22':'rgba(255,255,255,0.04)'}`, borderRadius:6, padding:'4px 6px', cursor:canBuy?'pointer':'default', opacity:owned?1:canBuy?0.9:0.3, transition:'all 0.15s' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:13, fontWeight:600, color:owned?bc:'#ffffff', display:'flex', alignItems:'center', gap:4 }}><img src={UPGRADE_ICONS[upg.id]} style={{width:24,height:24,objectFit:'contain'}}/>{upg.name}</span>
                    {owned ? <span style={{ fontSize:12, color:bc }}>✓</span>
                           : inCart ? <span style={{ fontSize:11, color:'#44cc88' }}>✓</span>
                           : <span style={{ fontSize:12, color:'#eedd44' }}>{free&&s.showPort?'FREE':upg.cost+'g'}</span>}
                  </div>
                  <div style={{ marginTop:3 }}>
                    <UpgradeDesc pros={upg.pros} cons={upg.cons} fontSize={11} opacity={0.5} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CINEMATIC INTRO (vidéo 5s, par-dessus la page d'événement) */}
      <AnimatePresence>
        {cinematic && SCENE_VIDEO[cinematic] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => { if (cinematic === 'death') setShowDeathScreen(true); setCinematic(null); }}
            style={{ position:'fixed', inset:0, zIndex:140, cursor:'pointer', background:'#05080f' }}>
            <video
              key={cinematic}
              src={SCENE_VIDEO[cinematic]}
              autoPlay muted playsInline preload="auto"
              onEnded={() => { if (cinematic === 'death') setShowDeathScreen(true); setCinematic(null); }}
              style={{ width:'100%', height:'100%', objectFit:'cover' }}
            />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', bottom:'12%', left:0, right:0, textAlign:'center', pointerEvents:'none' }}>
              <div style={{ fontSize: 40, color:'#e8e0d0', fontFamily:"'Pirata One', cursive", letterSpacing:3, textShadow:'0 2px 30px rgba(0,0,0,0.95)' }}>
                {SCENE_TITLES[cinematic] ?? ''}
              </div>
              <div style={{ marginTop:10, fontSize:13, color:'rgba(255,255,255,0.55)', fontFamily:"'IM Fell English', cursive", letterSpacing:1 }}>
                tap to skip
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EVENT SCENE OVERLAY */}
      <AnimatePresence>
        {s.event && SCENE_TITLES[s.event.cellType] && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:100, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:'24px', paddingBottom: isMobile ? 80 : 64 }}>
            {/* Fond de scène */}
            {SCENE_BG[s.event.cellType] && (
              <div style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:`url(${SCENE_BG[s.event.cellType]})`, backgroundSize:'cover', backgroundPosition:'center' }} />
            )}
            {/* Voile sombre pour lisibilité */}
            <div style={{ position:'absolute', inset:0, zIndex:0, background:'linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)' }} />
            <div style={{ position:'absolute', top:16, right:24, display:'flex', alignItems:'center', gap:6, zIndex:2 }}>
              <div style={{ fontSize: isMobile ? 13 : 18, fontWeight:700, color:'#eedd44' }}>{s.score}{isMobile ? 'pts' : ' pts'}</div>
            </div>
            <div style={{ position:'relative', zIndex:1, maxWidth:700, width:'100%', textAlign:'center' }}>
              <div style={{ alignSelf:'flex-start', marginBottom:16, paddingLeft:8 }}>
                <div style={{ fontSize: isMobile ? 28 : 42, fontWeight:700, color:'#e8e0d0', fontFamily:"'Pirata One', cursive", letterSpacing:3, textShadow:'0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)', lineHeight:1.1 }}>
                  {SCENE_TITLES[s.event.cellType] ?? s.event.cellType}
                </div>
              </div>
              <div style={{ display:'flex', gap:16, justifyContent:'center' }}>
                {s.event.choices.map((ch, i) => {
                  const rc = ch.risk==='safe'?'#44cc88':ch.risk==='risky'?'#eedd44':'#ee6644';
                  // Detect gold cost in description
                  const goldMatch = ch.desc.match(/(?<!\+)(\d+)\s*(?:gold\b|g\b)/i);
                  const goldCost = goldMatch ? parseInt(goldMatch[1]) : 0;
                  const canAfford = goldCost === 0 || s.ship.gold >= goldCost;
                  return (
                    <motion.button key={i} whileHover={{ scale: canAfford ? 1.04 : 1 }} whileTap={{ scale: canAfford ? 0.96 : 1 }}
                      onClick={() => {
                        if (!canAfford) return;
                        if (tutorialMode) {
                          const step = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
                          if (step.waitFor === 'choice0' && i !== 0) return;
                        }
                        resolve(i);
                      }}
                      style={{ flex:1, maxWidth:320, padding:'24px 28px', borderRadius:16, border:`1.5px solid ${canAfford ? rc : 'rgba(255,255,255,0.1)'}55`, background: canAfford ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${rc}0f 100%)` : 'rgba(0,0,0,0.5)', cursor: canAfford ? 'pointer' : 'not-allowed', color: canAfford ? '#e8e0d0' : 'rgba(255,255,255,0.3)', fontFamily:"'Pirata One', cursive", textAlign:'left', backdropFilter:'blur(8px)', boxShadow: canAfford ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${rc}22` : 'none', transition:'all 0.2s', opacity: canAfford ? 1 : 0.5 }}>
                      <div style={{ marginBottom:12, textAlign:'center' }}><img src={CHOICE_ICONS[ch.icon] || ''} style={{ width:72, height:72, objectFit:'contain' }}/></div>
                      <div style={{ fontSize:24, fontWeight:700, color:rc, textAlign:'center' }}>{ch.label}</div>
                      <div style={{ fontSize:20, color:'rgba(255,255,255,0.8)', fontFamily:"'IM Fell English', cursive", marginTop:8, textAlign:'center' }}>{ch.label === 'Pact' && s.event?.cellType === 'kraken' ? `-${Math.min(20, s.ship.hull - 1)} HP → 1 HP, storm +5 turns. Hunter awakens!` : ch.desc}</div>
                      <div style={{ fontSize:13, color:rc, marginTop:10, letterSpacing:2, textAlign:'center' }}>{ch.risk.toUpperCase()}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EVENT PANEL — fallback sans scène */}
      <AnimatePresence>
        {s.event && !state.gameOver && !s.showPort && s.event.cellType && !SCENE_BG[s.event.cellType] && (
          <motion.div initial={{ y:100, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:100, opacity:0 }}
            style={{ background:'rgba(5,10,18,0.97)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'16px 24px', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:20, maxWidth:700, margin:'0 auto' }}>
              <div style={{ flexShrink:0 }}>{renderCellIcon(CELL_ICONS[s.event.cellType], 55)}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:21, fontWeight:700, marginBottom:4, color:'#e8e0d0' }}>
                  {s.event.cellType.charAt(0).toUpperCase()+s.event.cellType.slice(1).replace('_',' ')}
                </div>
                <div style={{ display:'flex', gap:10, marginTop:8 }}>
                  {s.event.choices.map((ch, i) => {
                    const rc = ch.risk==='safe'?'#44cc88':ch.risk==='risky'?'#eedd44':'#ee6644';
                    const goldMatch2 = ch.desc.match(/(?<!\+)(\d+)\s*(?:gold\b|g\b)/i);
                    const goldCost2 = goldMatch2 ? parseInt(goldMatch2[1]) : 0;
                    const canAfford2 = goldCost2 === 0 || s.ship.gold >= goldCost2;
                    return (
                      <motion.button key={i} whileHover={{ scale: canAfford2 ? 1.02 : 1 }} whileTap={{ scale: canAfford2 ? 0.98 : 1 }}
                        onClick={() => {
                          if (!canAfford2) return;
                          if (tutorialMode) {
                            const step = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
                            if (step.waitFor === 'choice0' && i !== 0) return;
                          }
                          resolve(i);
                        }}
                        style={{ flex:1, padding:'20px 24px', borderRadius:16, border:`1.5px solid ${canAfford2 ? rc : 'rgba(255,255,255,0.1)'}55`, background: canAfford2 ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${rc}0f 100%)` : 'rgba(0,0,0,0.5)', cursor: canAfford2 ? 'pointer' : 'not-allowed', color: canAfford2 ? '#e8e0d0' : 'rgba(255,255,255,0.3)', fontFamily:"'Pirata One', cursive", textAlign:'left', backdropFilter:'blur(8px)', opacity: canAfford2 ? 1 : 0.5, transition:'all 0.2s' }}>
                        <div style={{ fontSize:26, marginBottom:4 }}>{ch.icon}</div>
                        <div style={{ fontSize:18, fontWeight:600, color:rc }}>{ch.label}</div>
                        <div style={{ fontSize:20, color:'rgba(255,255,255,0.8)', fontFamily:"'IM Fell English', cursive", marginTop:2 }}>{ch.desc}</div>
                        <div style={{ fontSize:16, color:rc, marginTop:4, letterSpacing:1 }}>{ch.risk.toUpperCase()}</div>
                      </motion.button>
                    );
                  })}
                </div>
                {canEscape && (
                  <button onClick={skip} style={{ marginTop:8, padding:'6px 16px', borderRadius:7, border:'1px solid rgba(100,170,220,0.3)', background:'transparent', color:'rgba(100,170,220,0.5)', cursor:'pointer', fontSize:14 }}>
                    ⛵ Use Swift Sails (1 use left)
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PORT PANEL */}
      <AnimatePresence>
        {s.showPort && !s.gameOver && (
          <motion.div initial={{ y:100,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:100,opacity:0 }}
            style={{ background:'rgba(5,10,18,0.97)', borderTop:'1px solid rgba(68,204,136,0.2)', padding:'16px 24px', flexShrink:0 }}>
            <div style={{ maxWidth:700, margin:'0 auto' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                <img src={anchorImg} style={{ width:40, height:40, objectFit:'contain' }}/>
                <span style={{ fontSize:26, fontWeight:700, color:'#44cc88', letterSpacing:2, fontFamily:"'Pirata One', cursive" }}>SAFE HARBOR</span>
              </div>
              {/* Composants du navire */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:14, letterSpacing:3, color:'rgba(255,255,255,0.5)', fontFamily:"'Cinzel', serif", marginBottom:10 }}>SHIP COMPONENTS</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                  {([
                    { key:'hull',   label:'HULL',       img:hullImg,   color:'#44cc88', effects:['Hull 20','Hull 28 −2 storm dmg','Hull 38 −3 env dmg'] },
                    { key:'weapon', label:'ARMEMENT',   img:powerImg,  color:'#ee6644', effects:['Power 2','Power 5 +min dmg','Power 9 −3 combat dmg'] },
                    { key:'nav',    label:'NAVIGATION', img:visionImg, color:'#6aaccc', effects:['Vision 1','Vision 2 +danger detect','Vision 3 +2 cases +minimap'] },
                  ] as const).map(comp => {
                    const lvl = s.ship.levels[comp.key];
                    const cost = lvl === 0 ? 50 : 110;
                    const canUpgrade = lvl < 2 && s.ship.gold >= cost && !(lvl === 1 && s.maxedComponents >= 2);
                    const isMaxed = lvl >= 2;
                    return (
                      <div key={comp.key} onClick={() => canUpgrade && upgradeComp(comp.key)}
                        style={{ background:`${comp.color}12`, border:`1px solid ${comp.color}${canUpgrade?'66':'22'}`, borderRadius:10, padding:'12px 10px', cursor:canUpgrade?'pointer':'default', opacity:canUpgrade||isMaxed?1:0.5, transition:'all 0.2s' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:comp.color, fontFamily:"'Pirata One', cursive" }}><img src={comp.img} style={{ width:22, height:22, objectFit:'contain' }}/>{comp.label}</div>
                          <div style={{ display:'flex', gap:3 }}>
                            {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:'50%', background: i <= lvl ? comp.color : 'rgba(255,255,255,0.1)' }}/>)}
                          </div>
                        </div>
                        <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', fontFamily:"'IM Fell English', cursive", marginBottom:6 }}>{comp.effects[lvl]}</div>
                        {!isMaxed && (
                          <div style={{ fontSize:11, color: canUpgrade ? '#eedd44' : 'rgba(255,255,255,0.2)', fontFamily:"'Cinzel', serif" }}>
                            {lvl === 1 && s.maxedComponents >= 2 ? 'MAX 2 N3' : `→ N${lvl+2} · ${cost}g`}
                          </div>
                        )}
                        {isMaxed && <div style={{ fontSize:11, color:comp.color, fontFamily:"'Cinzel', serif" }}>✓ MAX</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upgrades dans le port */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <div style={{ fontSize:16, color:'rgba(255,255,255,0.6)', fontFamily:"'Pirata One', cursive" }}>Available upgrades</div>
                <motion.button whileHover={{scale:1.05}} onClick={() => setState(s => rerollPort(s))}
                  style={{ padding:'4px 12px', borderRadius:6, border:'1px solid rgba(255,200,50,0.3)', background:'rgba(255,200,50,0.08)', cursor:'pointer', color:'#eedd44', fontSize:13, fontFamily:"'Pirata One', cursive" }}>
                  🎲 Reroll (20g)
                </motion.button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10, marginBottom:12 }}>
                {UPGRADES.filter(upg => s.portUpgrades.includes(upg.id) || s.ship.upgrades.includes(upg.id as UpgradeId)).map(upg => {
                  const owned = s.ship.upgrades.includes(upg.id as UpgradeId);
                  const inCart = cart.includes(upg.id);
                  const free = s.upgradeToken;
                  const cost = free ? 0 : upg.cost;
                  const canAdd = !owned && !inCart && s.ship.gold >= cost;
                  const bc = BUILD_COLOR[upg.build];
                  return (
                    <div key={upg.id} onClick={() => { if (inCart) { setCart(c => c.filter(x => x !== upg.id)); } else if (canAdd) { setCart(c => [...c, upg.id]); } }}
                      style={{ padding:'14px 18px', borderRadius:10, border:`1px solid ${owned?bc+'66':inCart?'#44cc8866':canAdd?bc+'33':'rgba(255,255,255,0.05)'}`, background:owned?`${bc}18`:inCart?'rgba(68,204,136,0.15)':canAdd?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.01)', cursor:canAdd||inCart?'pointer':'default', opacity:owned||canAdd||inCart?1:0.35, display:'flex', alignItems:'center', gap:12 }}>
                      <img src={UPGRADE_ICONS[upg.id]} style={{width:44,height:44,objectFit:'contain'}}/>
                      <div>
                        <div style={{ fontSize:17, fontWeight:700, color:owned?bc:inCart?'#44cc88':'#e8e0d0', fontFamily:"'Pirata One', cursive" }}>{upg.name}</div>
                        <div style={{ marginTop:3 }}>
                          <UpgradeDesc pros={upg.pros} cons={upg.cons} fontSize={12} opacity={0.5} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          {/* Repair — shown first for visibility */}
          <div style={{ display:'flex', gap:8, marginBottom:16 }}>
            {[{label:'Rum Barrel',desc:'+8 hull',cost:25,fn:()=>setState(st=>repairHull(st,8,25))},{label:'Full Repair',desc:'Restore all',cost:55,fn:()=>setState(st=>repairHull(st,s.ship.maxHull,55))}].map(item => (
              <motion.button key={item.label} whileTap={{scale:0.97}} onClick={item.fn}
                disabled={s.ship.gold < item.cost}
                style={{ flex:1, padding:'10px 8px', borderRadius:10, border:'1px solid rgba(68,204,136,0.3)', background:'rgba(68,204,136,0.08)', cursor: s.ship.gold >= item.cost ? 'pointer' : 'not-allowed', opacity: s.ship.gold >= item.cost ? 1 : 0.4, textAlign:'center' }}>
                <div style={{ fontSize:13, color:'#44cc88', fontFamily:"'Pirata One', cursive" }}>{item.label}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                <div style={{ fontSize:12, color:'#eedd44', marginTop:4 }}>◆ {item.cost}g</div>
              </motion.button>
            ))}
          </div>

          {/* Set Sail */}
          <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={() => setState(st => leavePort(st))}
            style={{ width:'100%', padding:'14px', borderRadius:12, border:'2px solid rgba(200,160,48,0.5)', background:'rgba(200,160,48,0.1)', color:'#c8a030', fontSize:18, fontFamily:"'Pirata One', cursive", letterSpacing:3, cursor:'pointer' }}>
            ⚓ SET SAIL
          </motion.button>
        </motion.div>
      )}
      </AnimatePresence>

      {/* GAME OVER */}
      <AnimatePresence>
        {showDeathScreen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}}
            style={{ position:'fixed', inset:0, zIndex:200, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              background:'radial-gradient(ellipse at center, #1a0505 0%, #050008 50%, #000000 100%)',
              overflow:'hidden', overflowY:'auto' }}>

            {/* Animated background vignette */}
            <motion.div animate={{ opacity:[0.3,0.6,0.3] }} transition={{ repeat:Infinity, duration:3 }}
              style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 30%, rgba(150,0,0,0.4) 100%)', pointerEvents:'none' }}/>

            {/* Skull */}
            <motion.div initial={{scale:0, rotate:-20}} animate={{scale:1, rotate:0}} transition={{type:'spring', stiffness:120, delay:0.2}}
              style={{ fontSize:130, marginBottom:8, filter:'drop-shadow(0 0 30px rgba(220,30,30,0.8))' }}>
              ☠
            </motion.div>

            {/* Title */}
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.5}}
              style={{ fontSize: isMobile ? 42 : 72, fontWeight:700, color:'#ee4444', fontFamily:"'Pirata One', cursive", letterSpacing: isMobile ? 3 : 6,
                textShadow:'0 0 40px rgba(220,30,30,0.8), 0 0 80px rgba(220,30,30,0.4)', marginBottom:8 }}>
              SHIPWRECKED
            </motion.div>

            {/* Run title */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
              style={{ fontSize: isMobile ? 16 : 24, color:'rgba(200,160,48,0.8)', fontFamily:"'Cinzel', serif", letterSpacing: isMobile ? 2 : 4, marginBottom:4, textAlign:'center' }}>
              {s.runTitle}
            </motion.div>

            {/* Last log */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
              style={{ fontSize: isMobile ? 15 : 20, color:'rgba(255,255,255,0.35)', fontFamily:"'IM Fell English', cursive", marginBottom:16, maxWidth: isMobile ? '90vw' : 600, textAlign:'center', fontStyle:'italic', padding: isMobile ? '0 16px' : 0 }}>
              "{s.log}"
            </motion.div>

            {/* Stats */}
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:1.1}}
              style={{ display:'flex', gap: isMobile ? 16 : 32, marginBottom: isMobile ? 16 : 28, flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent:'center', padding: isMobile ? '0 16px' : 0 }}>
              {[
                { label:'SCORE',    val:`${s.score} pts`, color:'#eedd44' },
                { label:'BEST',     val:`${Math.max(personalBest, s.score)} pts`, color: isNewRecord ? '#44ffaa' : 'rgba(255,255,255,0.3)' },
                { label:'TURNS',    val:s.turn,           color:'rgba(255,255,255,0.6)' },
                { label:'GOLD',     val:s.ship.gold, color:'#eedd44' },
                { label:'MAX HULL', val:`${s.ship.hull}/${s.ship.maxHull}`, color: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88' },
              ].map(st => (
                <div key={st.label} style={{ textAlign:'center' }}>
                  <div style={{ fontSize: isMobile ? 10 : 13, color:'rgba(255,255,255,0.3)', letterSpacing: isMobile ? 1 : 3, fontFamily:"'Cinzel', serif" }}>{st.label}</div>
                  <div style={{ fontSize: isMobile ? 20 : 28, color:st.color, fontFamily:"'Cinzel', serif", fontWeight:700 }}>{st.val}</div>
                </div>
              ))}
            </motion.div>

            {/* Score Breakdown */}
            {s.scoreBreakdown && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}}
                style={{ marginBottom:16, padding:'12px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(0,0,0,0.3)', width:'100%', maxWidth:400 }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:3, fontFamily:"'Cinzel', serif", marginBottom:8, textAlign:'center' }}>SCORE BREAKDOWN</div>
                {[
                  { label:'MOVEMENT', val:s.scoreBreakdown.movement, color:'#6aaccc' },
                  { label:'COMBAT',   val:s.scoreBreakdown.combat,   color:'#ee6644' },
                  { label:'TREASURE', val:s.scoreBreakdown.treasure, color:'#eedd44' },
                  { label:'STREAKS',  val:s.scoreBreakdown.streaks,  color:'#cc44ee' },
                  { label:'FEATS',    val:s.scoreBreakdown.achievements, color:'#44cc88' },
                  ...(s.scoreBreakdown.other > 0 ? [{ label:'BONUS', val:s.scoreBreakdown.other, color:'#aaaaff' }] : []),
                ].filter(b => b.val > 0).map(b => (
                  <div key={b.label} style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                    <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:1 }}>{b.label}</span>
                    <span style={{ fontSize:12, color:b.color, fontFamily:"'Cinzel', serif", fontWeight:700 }}>{b.val.toLocaleString()} pts</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Seed */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}
              style={{ fontSize:13, color:'rgba(255,255,255,0.25)', fontFamily:"'Cinzel', serif", letterSpacing:2, marginBottom:24, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
              <div>Seed: {s.seed} — {isDailyRun ? `Daily Key: ${getDailyKey()}` : 'challenge your crew!'}</div>
              {isDailyRun && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 14px', borderRadius:20, border:'1px solid rgba(100,200,255,0.5)', background:'rgba(0,30,60,0.7)', color:'#88ddff', fontSize:12, fontFamily:"'Cinzel', serif", letterSpacing:2 }}>
                  ☀ DAILY RUN — {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:1.5}}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              {walletAddress && !scoreSubmitted && (
                <motion.button whileHover={{ scale:1.05 }} disabled={submitting}
                  onClick={async () => {
                    setSubmitting(true);
                    const ok = await submitScore(walletAddress, s.score, s.runTitle, s.turn, s.currentZone ?? 1, s.seed, username ?? undefined);
                    if (ok) {
                      setScoreSubmitted(true);
                      if (isDailyRun) {
                        const today = new Date().toISOString().slice(0, 10);
                        await submitDailyScore(walletAddress, s.score, today, s.seed, username ?? undefined);
                      }
                    }
                    // On-chain submission
                    if (account) {
                      try {
                        await submitScoreOnChain(account, s.score, s.seed, s.turn, s.currentZone ?? 1, s.runTitle);
                      } catch(e) {
                        console.warn('On-chain submit failed:', e);
                      }
                    }
                    // NFT conditions check
                    if (walletAddress) {
                      try {
                        const nftResult = await checkNFTConditions({
                          wallet_address: walletAddress,
                          score: s.score,
                          seed: s.seed,
                          turn: s.turn,
                          gold: s.ship.gold,
                          hull: s.ship.hull,
                          ports_visited: s.portsVisited ?? 0,
                          treasures_found: s.treasuresFound ?? 0,
                          pirates_fought: s.piratesFought ?? 0,
                          kraken_killed: s.krakenKilled ?? false,
                          ancient_kraken_killed: s.ancientKrakenKilled ?? false,
                          hunter_attacks_survived: s.hunterAttacksSurvived ?? 0,
                          maelstrom_survived: s.maelstromSurvived ?? false,
                          min_hull_during_run: s.lowestHull ?? s.ship.hull,
                          combo_turn: s.comboTurn ?? 999,
                          storm_distance_min: s.stormDistanceMin ?? 99,
                          cursed_treasure_taken: s.cursedTreasureTaken ?? false,
                        });
                        if (nftResult.minted.length > 0) {
                          setNftMinted(nftResult.minted.map((m: any) => m.nft));
                        }
                      } catch(e) {
                        console.warn('NFT check failed:', e);
                      }
                    }
                    setSubmitting(false);
                  }}
                  style={{ padding:'12px 32px', borderRadius:10, border:'1px solid rgba(200,160,48,0.4)', background:'rgba(200,160,48,0.1)', color:'#c8a030', fontSize:16, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
                  {submitting ? 'SUBMITTING...' : '⚓ SUBMIT SCORE'}
                </motion.button>
              )}
              {scoreSubmitted && <div style={{ fontSize:14, color:'#44cc88', letterSpacing:2, fontFamily:"'Pirata One', cursive" }}>✓ SCORE SUBMITTED</div>}
              {nftMinted.length > 0 && (
                <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}}
                  style={{ padding:'12px 24px', borderRadius:12, border:'1px solid rgba(200,160,48,0.6)', background:'rgba(0,0,0,0.8)', textAlign:'center' }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>🏴‍☠️</div>
                  <div style={{ fontSize:16, color:'#FFD700', fontFamily:"'Pirata One', cursive", letterSpacing:2 }}>NFT EARNED!</div>
                  {nftMinted.map(n => (
                    <div key={n} style={{ fontSize:13, color:'rgba(255,255,255,0.8)', fontFamily:"'Cinzel', serif", marginTop:4 }}>{n.replace(/_/g,' ').toUpperCase()}</div>
                  ))}
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", marginTop:8, lineHeight:1.4 }}>Your NFT will be sent to your wallet soon.</div>
                  <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                    onClick={() => {
                      const nftName = nftMinted[0].replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
                      const text = `🏴‍☠️ I just found "${nftName}" — a hidden NFT inside Corsair.\nNo mint button. No whitelist. Just playing.\nDare to find yours? ⚓\nhttps://reemjie.github.io/corsair/`;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    style={{ marginTop:10, padding:'8px 20px', borderRadius:8, border:'1px solid rgba(255,255,255,0.3)', background:'rgba(0,0,0,0.5)', color:'#ffffff', cursor:'pointer', fontSize:13, fontFamily:"'Pirata One', cursive", letterSpacing:1 }}>
                    𝕏 Share your find
                  </motion.button>
                </motion.div>
              )}
              {!walletAddress && <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)', fontFamily:"'Cinzel', serif", letterSpacing:2 }}>Connect wallet to submit your score</div>}
              <div style={{ display:'flex', gap:12, marginBottom:8 }}>
                <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                  onClick={() => {
                    const today = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'});
                    const text = isDailyRun
                      ? `☀️ Daily Challenge — ${today} — ${s.score} pts before the storm claimed me.\nSame seed for everyone today. Can you beat me?\n⚓ https://reemjie.github.io/corsair/`
                      : `🏴\u200d☠️ ${s.runTitle} — ${s.score} pts before the storm claimed me.\n${s.turn} turns. ${s.ship.gold} gold. No mercy.\nDare to sail further? ⚓\nhttps://reemjie.github.io/corsair/`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  style={{ padding:'14px 24px', borderRadius:12, border:'1px solid rgba(255,255,255,0.3)', background:'rgba(0,0,0,0.4)', color:'#ffffff', cursor:'pointer', fontSize:16, fontWeight:700, letterSpacing:1, fontFamily:"'Pirata One', cursive" }}>
                  𝕏 SHARE
                </motion.button>
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.97}} onClick={restart}
                  style={{ padding:'14px 36px', borderRadius:12, border:'2px solid rgba(200,160,48,0.6)', background:'rgba(80,60,10,0.5)', color:'#c8a030', cursor:'pointer', fontSize:20, fontWeight:700, letterSpacing:2, fontFamily:"'Pirata One', cursive",
                    boxShadow:'0 0 20px rgba(200,160,48,0.2)' }}>
                  NEW VOYAGE
                </motion.button>
                <motion.button whileHover={{ scale:1.05 }} whileTap={{scale:0.97}} onClick={onHome}
                  style={{ padding:'14px 24px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:14, letterSpacing:2, fontFamily:"'Pirata One', cursive" }}>
                  ← MENU
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* HUNTER ATTACK NOTIFICATION */}
      <AnimatePresence>
        {showHunterAttack && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.3}}
            style={{ position:'fixed', inset:0, zIndex:150, pointerEvents:'none' }}>
            <video src={`${import.meta.env.BASE_URL}scenes/hunter.mp4`} autoPlay muted playsInline preload="auto" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)' }}/>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              style={{ position:'absolute', bottom:'20%', left:0, right:0, textAlign:'center' }}>
              <div style={{ fontSize: 32, color:'#cc44ee', fontFamily:"'Pirata One', cursive", letterSpacing:3, textShadow:'0 0 30px rgba(150,0,150,0.9)' }}>THE HUNTER STRIKES!</div>
              <div style={{ fontSize:16, color:'rgba(255,255,255,0.7)', fontFamily:"'IM Fell English', cursive", marginTop:6 }}>Tentacles rake the hull</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      {isMobile && (
        <>
          {/* Toggle buttons — hide during events */}
          {!s.event && !s.showPort && !s.gameOver && <div style={{ position:'fixed', right:8, bottom:90, display:'flex', flexDirection:'column', gap:6, zIndex:30 }}>
            <motion.button whileTap={{scale:0.9}}
              onClick={() => setMobileDrawer(mobileDrawer === 'ship' ? null : 'ship')}
              style={{ width:44, height:44, borderRadius:10, border:`1px solid ${mobileDrawer==='ship' ? '#44cc88' : 'rgba(255,255,255,0.2)'}`, background: mobileDrawer==='ship' ? 'rgba(68,204,136,0.2)' : 'rgba(0,0,0,0.7)', color: mobileDrawer==='ship' ? '#44cc88' : 'rgba(255,255,255,0.6)', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>⚓</motion.button>
            <motion.button whileTap={{scale:0.9}}
              onClick={() => setMobileDrawer(mobileDrawer === 'upgrades' ? null : 'upgrades')}
              style={{ width:44, height:44, borderRadius:10, border:`1px solid ${mobileDrawer==='upgrades' ? '#c8a030' : 'rgba(255,255,255,0.2)'}`, background: mobileDrawer==='upgrades' ? 'rgba(200,160,48,0.2)' : 'rgba(0,0,0,0.7)', color: mobileDrawer==='upgrades' ? '#c8a030' : 'rgba(255,255,255,0.6)', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>⚔️</motion.button>
          </div>}

          {/* Drawer overlay */}
          <AnimatePresence>
            {mobileDrawer && (
              <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',duration:0.25}}
                style={{ position:'fixed', right:0, top:60, bottom:70, width:'75vw', maxWidth:280, background:'linear-gradient(135deg,#0a1422,#060e18)', borderLeft:'1px solid rgba(255,255,255,0.1)', zIndex:25, overflowY:'auto', padding:'12px 10px' }}
                onClick={e => e.stopPropagation()}>
                {mobileDrawer === 'ship' && (
                  <>
                    <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', letterSpacing:2, fontFamily:"'Cinzel', serif", marginBottom:8 }}>SHIP</div>
                    {/* Equipped upgrades */}
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6 }}>EQUIPPED</div>
                    {s.ship.upgrades.length === 0
                      ? <div style={{ fontSize:13, color:'rgba(255,255,255,0.3)', fontStyle:'italic', marginBottom:8 }}>None yet</div>
                      : s.ship.upgrades.map(id => {
                          const u = UPGRADES.find(u=>u.id===id)!;
                          return <div key={id} style={{ fontSize:13, color:'#c8a030', marginBottom:4, display:'flex', alignItems:'center', gap:6 }}><img src={UPGRADE_ICONS[id]} style={{width:18,height:18,objectFit:'contain'}}/>{u.name}</div>;
                        })
                    }
                    {/* Components */}
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:10, marginBottom:6 }}>COMPONENTS</div>
                    {([
                      { key:'hull', label:'Hull', icon:'⚓', color:'#44cc88', levels:['20 HP','28 HP','38 HP'] },
                      { key:'weapon', label:'Weapon', icon:'⚔️', color:'#ee6644', levels:['P2','P5','P9'] },
                      { key:'nav', label:'Nav', icon:'🔭', color:'#6aaccc', levels:['V1','V2','V3'] },
                    ] as const).map(comp => {
                      const lvl = s.ship.levels[comp.key];
                      return (
                        <div key={comp.key} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                          <span>{comp.icon}</span>
                          <span style={{ color:comp.color, fontSize:13, width:50 }}>{comp.label}</span>
                          <div style={{ display:'flex', gap:3 }}>
                            {[0,1,2].map(i => (
                              <div key={i} style={{ width:14, height:14, borderRadius:3, background: i<=lvl ? comp.color : 'rgba(255,255,255,0.1)', border:`1px solid ${i<=lvl ? comp.color+'88' : 'rgba(255,255,255,0.05)'}` }}/>
                            ))}
                          </div>
                          <span style={{ color:comp.color, fontSize:12 }}>{comp.levels[lvl]}</span>
                        </div>
                      );
                    })}
                  </>
                )}
                {mobileDrawer === 'upgrades' && (
                  <>
                    <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', letterSpacing:2, fontFamily:"'Cinzel', serif", marginBottom:8 }}>UPGRADES</div>
                    {UPGRADES.map(upg => {
                      const owned = s.ship.upgrades.includes(upg.id as UpgradeId);
                      const bc = BUILD_COLOR[upg.build];
                      return (
                        <div key={upg.id} style={{ marginBottom:10, opacity: owned ? 1 : 0.6 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                            <img src={UPGRADE_ICONS[upg.id]} style={{width:20,height:20,objectFit:'contain'}}/>
                            <span style={{ fontSize:13, color: owned ? bc : 'rgba(255,255,255,0.7)', fontFamily:"'Pirata One', cursive" }}>{upg.name}</span>
                            {owned && <span style={{ fontSize:10, color:'#44cc88', marginLeft:'auto' }}>✓</span>}
                          </div>
                          <div style={{ lineHeight:1.5 }}><UpgradeDesc pros={upg.pros} cons={upg.cons} fontSize={11} opacity={0.4} /></div>
                        </div>
                      );
                    })}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Backdrop */}
          {mobileDrawer && <div style={{ position:'fixed', inset:0, zIndex:24 }} onClick={() => setMobileDrawer(null)}/>}
        </>
      )}

      {/* TUTORIAL BUBBLE */}

      {/* HUNTER ATTACK NOTIFICATION */}
      <AnimatePresence>
        {showHunterAttack && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.3}}
            style={{ position:'fixed', inset:0, zIndex:150, pointerEvents:'none' }}>
            <video src={`${import.meta.env.BASE_URL}scenes/hunter.mp4`} autoPlay muted playsInline preload="auto" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)' }}/>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              style={{ position:'absolute', bottom:'20%', left:0, right:0, textAlign:'center' }}>
              <div style={{ fontSize: 32, color:'#cc44ee', fontFamily:"'Pirata One', cursive", letterSpacing:3, textShadow:'0 0 30px rgba(150,0,150,0.9)' }}>THE HUNTER STRIKES!</div>
              <div style={{ fontSize:16, color:'rgba(255,255,255,0.7)', fontFamily:"'IM Fell English', cursive", marginTop:6 }}>Tentacles rake the hull</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      {isMobile && (
        <>
          {/* Toggle buttons — hide during events */}
          {!s.event && !s.showPort && !s.gameOver && <div style={{ position:'fixed', right:8, bottom:90, display:'flex', flexDirection:'column', gap:6, zIndex:30 }}>
            <motion.button whileTap={{scale:0.9}}
              onClick={() => setMobileDrawer(mobileDrawer === 'ship' ? null : 'ship')}
              style={{ width:44, height:44, borderRadius:10, border:`1px solid ${mobileDrawer==='ship' ? '#44cc88' : 'rgba(255,255,255,0.2)'}`, background: mobileDrawer==='ship' ? 'rgba(68,204,136,0.2)' : 'rgba(0,0,0,0.7)', color: mobileDrawer==='ship' ? '#44cc88' : 'rgba(255,255,255,0.6)', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>⚓</motion.button>
            <motion.button whileTap={{scale:0.9}}
              onClick={() => setMobileDrawer(mobileDrawer === 'upgrades' ? null : 'upgrades')}
              style={{ width:44, height:44, borderRadius:10, border:`1px solid ${mobileDrawer==='upgrades' ? '#c8a030' : 'rgba(255,255,255,0.2)'}`, background: mobileDrawer==='upgrades' ? 'rgba(200,160,48,0.2)' : 'rgba(0,0,0,0.7)', color: mobileDrawer==='upgrades' ? '#c8a030' : 'rgba(255,255,255,0.6)', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>⚔️</motion.button>
          </div>}

          {/* Drawer overlay */}
          <AnimatePresence>
            {mobileDrawer && (
              <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',duration:0.25}}
                style={{ position:'fixed', right:0, top:60, bottom:70, width:'75vw', maxWidth:280, background:'linear-gradient(135deg,#0a1422,#060e18)', borderLeft:'1px solid rgba(255,255,255,0.1)', zIndex:25, overflowY:'auto', padding:'12px 10px' }}
                onClick={e => e.stopPropagation()}>
                {mobileDrawer === 'ship' && (
                  <>
                    <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', letterSpacing:2, fontFamily:"'Cinzel', serif", marginBottom:8 }}>SHIP</div>
                    {/* Equipped upgrades */}
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6 }}>EQUIPPED</div>
                    {s.ship.upgrades.length === 0
                      ? <div style={{ fontSize:13, color:'rgba(255,255,255,0.3)', fontStyle:'italic', marginBottom:8 }}>None yet</div>
                      : s.ship.upgrades.map(id => {
                          const u = UPGRADES.find(u=>u.id===id)!;
                          return <div key={id} style={{ fontSize:13, color:'#c8a030', marginBottom:4, display:'flex', alignItems:'center', gap:6 }}><img src={UPGRADE_ICONS[id]} style={{width:18,height:18,objectFit:'contain'}}/>{u.name}</div>;
                        })
                    }
                    {/* Components */}
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:10, marginBottom:6 }}>COMPONENTS</div>
                    {([
                      { key:'hull', label:'Hull', icon:'⚓', color:'#44cc88', levels:['20 HP','28 HP','38 HP'] },
                      { key:'weapon', label:'Weapon', icon:'⚔️', color:'#ee6644', levels:['P2','P5','P9'] },
                      { key:'nav', label:'Nav', icon:'🔭', color:'#6aaccc', levels:['V1','V2','V3'] },
                    ] as const).map(comp => {
                      const lvl = s.ship.levels[comp.key];
                      return (
                        <div key={comp.key} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                          <span>{comp.icon}</span>
                          <span style={{ color:comp.color, fontSize:13, width:50 }}>{comp.label}</span>
                          <div style={{ display:'flex', gap:3 }}>
                            {[0,1,2].map(i => (
                              <div key={i} style={{ width:14, height:14, borderRadius:3, background: i<=lvl ? comp.color : 'rgba(255,255,255,0.1)', border:`1px solid ${i<=lvl ? comp.color+'88' : 'rgba(255,255,255,0.05)'}` }}/>
                            ))}
                          </div>
                          <span style={{ color:comp.color, fontSize:12 }}>{comp.levels[lvl]}</span>
                        </div>
                      );
                    })}
                  </>
                )}
                {mobileDrawer === 'upgrades' && (
                  <>
                    <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', letterSpacing:2, fontFamily:"'Cinzel', serif", marginBottom:8 }}>UPGRADES</div>
                    {UPGRADES.map(upg => {
                      const owned = s.ship.upgrades.includes(upg.id as UpgradeId);
                      const bc = BUILD_COLOR[upg.build];
                      return (
                        <div key={upg.id} style={{ marginBottom:10, opacity: owned ? 1 : 0.6 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                            <img src={UPGRADE_ICONS[upg.id]} style={{width:20,height:20,objectFit:'contain'}}/>
                            <span style={{ fontSize:13, color: owned ? bc : 'rgba(255,255,255,0.7)', fontFamily:"'Pirata One', cursive" }}>{upg.name}</span>
                            {owned && <span style={{ fontSize:10, color:'#44cc88', marginLeft:'auto' }}>✓</span>}
                          </div>
                          <div style={{ lineHeight:1.5 }}><UpgradeDesc pros={upg.pros} cons={upg.cons} fontSize={11} opacity={0.4} /></div>
                        </div>
                      );
                    })}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Backdrop */}
          {mobileDrawer && <div style={{ position:'fixed', inset:0, zIndex:24 }} onClick={() => setMobileDrawer(null)}/>}
        </>
      )}

      {/* TUTORIAL BUBBLE */}
      {tutorialMode && tutBubble && (() => {
        const step = TUT_STEPS[Math.min(tutStep, TUT_STEPS.length-1)];
        const isDone = step.waitFor === 'done';
        const isInfo = step.waitFor === 'none';
        return (
          <motion.div key={tutStep} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            style={{ position:'fixed', bottom: isMobile ? (s.event ? undefined : '110px') : (s.showPort ? undefined : s.event ? '320px' : '90px'), top: (isMobile && s.event) ? '70px' : (!isMobile && s.showPort ? '80px' : undefined), left: isMobile ? 8 : 0, right: isMobile ? 8 : 0, margin:'0 auto', background:'linear-gradient(135deg,#0a1422,#060e18)', border:'2px solid rgba(200,160,48,0.7)', borderRadius:16, padding: isMobile ? '16px' : '22px 28px', width: isMobile ? 'auto' : 540, zIndex:50, boxShadow:'0 8px 40px rgba(0,0,0,0.95)' }}>
            <div style={{ display:'flex', gap:5, marginBottom:14 }}>
              {TUT_STEPS.filter(st=>st.waitFor!=='done').map((_,i)=>(
                <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<tutStep?'#c8a030':i===tutStep?'rgba(200,160,48,0.5)':'rgba(255,255,255,0.1)', transition:'background 0.3s' }}/>
              ))}
            </div>
            <div style={{ fontSize:19, color:'#c8a030', fontFamily:"'Pirata One', cursive", marginBottom:10 }}>{step.title}</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.9)', fontFamily:"'Cinzel', serif", lineHeight:1.75, marginBottom:18 }}>{step.bubble}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <button onClick={onHome} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.2)', fontSize:12, cursor:'pointer', fontFamily:"'Cinzel', serif", letterSpacing:1 }}>QUIT TUTORIAL</button>
              {isDone
                ? <motion.button whileHover={{scale:1.05}} onClick={()=>{ localStorage.setItem('corsair_tutorial_done','1'); onTutorialDone?.(); }}
                    style={{ padding:'11px 28px', borderRadius:10, border:'1px solid rgba(200,160,48,0.6)', background:'rgba(200,160,48,0.15)', color:'#c8a030', fontSize:15, cursor:'pointer', fontFamily:"'Pirata One', cursive", letterSpacing:2 }}>
                    ⚓ START FOR REAL
                  </motion.button>
                : isInfo
                  ? <motion.button whileHover={{scale:1.05}} onClick={()=>{ setTutStep(i => i+1); setTutBubble(true); }} style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(200,160,48,0.5)', background:'rgba(200,160,48,0.15)', color:'#c8a030', fontSize:14, cursor:'pointer', fontFamily:"'Pirata One', cursive", letterSpacing:2 }}>NEXT →</motion.button>
                  : <button onClick={()=>setTutBubble(false)} style={{ background:'transparent', border:'none', color:'rgba(200,160,48,0.6)', fontSize:13, cursor:'pointer', fontFamily:"'Cinzel', serif", letterSpacing:1 }}>GOT IT →</button>
              }
            </div>
          </motion.div>
        );
      })()}
      {tutorialMode && !tutBubble && (
        <motion.button whileHover={{scale:1.05}} onClick={()=>setTutBubble(true)}
          style={{ position:'fixed', bottom:90, right:24, background:'rgba(200,160,48,0.15)', border:'1px solid rgba(200,160,48,0.4)', color:'#c8a030', borderRadius:10, padding:'8px 16px', cursor:'pointer', fontFamily:"'Cinzel', serif", fontSize:12, letterSpacing:1, zIndex:50 }}>
          💬 HINT
        </motion.button>
      )}
    </motion.div>
  );
}
