import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameState, UpgradeId } from '../types/game';
import { markDailyPlayedOnServer, startRun, heartbeatRun, finishRun, saveRunLog, issueSeed, approveRun, getStarktemberBoard, hasPlayedDailyOnServer, type StarktemberRow } from '../supabase';
import { ZONE_CONFIG } from '../game/balance';
import { initGame, moveShip, resolveEvent, repairHull, leavePort, skipEventFn, rerollPort, upgradeComponent, buyUpgrade, markDailyPlayed, getDailyKey, hasDailyBeenPlayed } from '../game/engine';
import { pickOnboardTip, markOnboardDone, type OnboardTip } from '../game/onboard';
import { useWallet } from '../useWallet';
import { sfx, setSfxMuted } from '../sound';
import { getRelicDef, type RelicDef } from '../game/relics';
import { checkAndUnlockFeats, type Feat } from '../game/feats';
import { saveActiveRun, clearActiveRun, queuePending } from '../game/crashRecovery';
import { Icon } from '../Icon';
import anchorImg from '../assets/anchor.png';
import OnboardCard from './corsair/OnboardCard';
import EventChoicePanel from './corsair/EventChoicePanel';
import PortPanel from './corsair/PortPanel';
import GameOverScreen from './corsair/GameOverScreen';
import { ZONE_BG, SCENE_BG, SCENE_VIDEO, SCENE_TITLES } from './corsair/scenes';
import { UPGRADES, UPGRADE_ICONS, UPGRADE_CODES, BUILD_COLOR, UpgradeDesc } from './corsair/upgrades';
import hullImg from '../assets/hull.png';
const goldImg = `${import.meta.env.BASE_URL}icons/gold.png`;
import visionImg from '../assets/vision.png';
import powerImg from '../assets/power.png';
import turnImg from '../assets/turn.png';
import scoreImg from '../assets/score.png';
import { GRID_SIZE } from '../game/mapGen';

const CELL_ICONS: Record<string, string> = {
  sea:'〰', storm: import.meta.env.BASE_URL + 'icons_ui/storm.png', pirate: import.meta.env.BASE_URL + 'icons_ui/swords.png', treasure: import.meta.env.BASE_URL + 'icons_ui/treasure.png',
  port: import.meta.env.BASE_URL + 'icons/port.png', kraken: import.meta.env.BASE_URL + 'icons_ui/kraken.png', wreck: import.meta.env.BASE_URL + 'icons/wreck.png', island: import.meta.env.BASE_URL + 'icons/island.png', rocks: import.meta.env.BASE_URL + 'icons/rocks.png',
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

const hunterModeIcon = (mode: string, size = 14) => {
  const n = mode === 'frenzy' ? 'lightning' : mode === 'stalking' ? 'eye' : mode === 'searching' ? 'mist' : 'compass';
  return <Icon name={n as any} size={size} style={{ marginRight:5 }} />;
};
const hunterModeLabel = (mode: string) =>
  mode === 'frenzy' ? 'ENRAGED' : mode === 'stalking' ? 'STALKING' : mode === 'searching' ? 'SEARCHING' : 'TRACKING';

export default function CorsairGame({ walletAddress, account, username, onHome, onPlayDaily, dailySeed, isDaily, seedToken, shipId, resumeState, resumeRunId, resumeActions }: { walletAddress: string | null; account?: any; username?: string | null; onHome: () => void; onPlayDaily?: () => void; dailySeed?: number; isDaily?: boolean; seedToken?: string; shipId?: string; resumeState?: GameState; resumeRunId?: string; resumeActions?: number[] }) {
  const { connect, connecting } = useWallet();
  const [state, setState] = useState<GameState>(() => resumeState ?? initGame(dailySeed, shipId ?? 'default'));
  const startedAsGuest = useRef(!walletAddress);
  const [dailyAvailable, setDailyAvailable] = useState(() => !hasDailyBeenPlayed());
  const [onboard, setOnboard] = useState<OnboardTip | null>(null);
  const [shake, setShake] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [newFeats, setNewFeats] = useState<Feat[]>([]);
  const [foundRelic, setFoundRelic] = useState<RelicDef | null>(null);
  const prevRelicCount = useRef((state.relics ?? []).length);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [onChainDone, setOnChainDone] = useState(false);
  const autoSentRef = useRef(false);
  const [nftMinted, setNftMinted] = useState<string[]>([]);
  const [portalCinematic, setPortalCinematic] = useState<{lines: string[], zone: number} | null>(null);
  const [portalLineIndex, setPortalLineIndex] = useState(0);
  const [personalBest, setPersonalBest] = useState<number>(() => {
    return parseInt(localStorage.getItem('corsair_best_score') || '0');
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isDailyRun = isDaily === true;
  // Daily = seed date ; free run = seed_token serveur. Sinon pas de soumission.
  const seedTokenRef = useRef(seedToken);
  const [harborDown, setHarborDown] = useState(false);
  const [restarting, setRestarting] = useState(false);
  // Conseils de premiere partie (une fois chacun, memorises en local).
  useEffect(() => {
    if (state.gameOver) { setOnboard(null); return; }
    if (state.turn > 0) markOnboardDone('sail');
    setOnboard(pickOnboardTip(state));
  }, [state.turn, state.event, state.showPort, state.hunter?.active, state.stormDistance, state.gameOver]);

  const dismissOnboard = () => {
    if (!onboard) return;
    markOnboardDone(onboard.id);
    setOnboard(null);
  };

  // Daily : la tentative est consommee au LANCEMENT de la run (equite tournoi — un refresh ne redonne pas d'essai)
  useEffect(() => {
    if (!isDailyRun) return;
    markDailyPlayed();
    if (walletAddress) markDailyPlayedOnServer(walletAddress, getDailyKey());
  }, []);

  // Conversion guest : apres Connect, proposer le Daily s'il reste disponible.
  useEffect(() => {
    if (!walletAddress) { setDailyAvailable(!hasDailyBeenPlayed()); return; }
    hasPlayedDailyOnServer(walletAddress, getDailyKey())
      .then(done => setDailyAvailable(!(done || hasDailyBeenPlayed())));
  }, [walletAddress]);

  // ─── RUN TRACKING (partenaires / live) ───────────────────────────
  const runIdRef = useRef<string>(resumeRunId ?? crypto.randomUUID());
  const actionLogRef = useRef<number[]>(resumeActions ? [...resumeActions] : []);
  const logAction = (code: number) => {
    actionLogRef.current.push(code);
    // La sauvegarde disque se fait dans l'effet ci-dessous, une fois l'etat
    // recalcule : sinon le tour et le score enregistres seraient en retard
    // d'une action.
  };
  const checksRef = useRef<number[]>([]);

  // Sauvegarde disque apres chaque changement d'etat : le score et le tour
  // enregistres correspondent ainsi a l'action qui vient d'etre appliquee.
  useEffect(() => {
    const w = walletAddress;
    if (!w || state.gameOver) return;
    if (actionLogRef.current.length === 0) return;
    saveActiveRun({
      run_id: runIdRef.current,
      wallet_address: w,
      seed: state.seed,
      ship_id: shipId ?? 'default',
      is_daily: isDailyRun,
      actions: actionLogRef.current,
      turn: state.turn,
      score: state.score,
      saved_at: Date.now(),
    });
  }, [state]);

  // Releve de controle : score et coque apres chaque action. Sert a localiser
  // precisement ou un rejeu diverge de la partie reelle.
  useEffect(() => {
    const i = actionLogRef.current.length - 1;
    if (i < 0) return;
    checksRef.current[i * 3] = state.score;
    checksRef.current[i * 3 + 1] = state.ship.hull;
    checksRef.current[i * 3 + 2] = state.rngState ?? -1;
  }, [state]);
  const lastBeatRef = useRef<number>(0);

  // Debut de partie
  useEffect(() => {
    if (!walletAddress) return;
    if (resumeRunId) return; // la ligne existe deja pour cette partie
    startRun({
      run_id: runIdRef.current,
      wallet_address: walletAddress,
      username: username ?? null,
      seed: state.seed,
      is_daily: isDailyRun,
      seed_token: seedToken ?? null,
    });
  }, []);

  // Battement de coeur (tous les 3 tours) pour le score live
  useEffect(() => {
    if (!walletAddress || state.gameOver) return;
    if (state.turn - lastBeatRef.current < 3) return;
    lastBeatRef.current = state.turn;
    heartbeatRun(runIdRef.current, {
      score: state.score, turn: state.turn,
      zone: state.currentZone ?? 1,
      gold: state.ship.gold, hull: state.ship.hull,
    });
  }, [state.turn]);

  // Fin de partie — uniquement si le seed est serveur (ou daily).
  useEffect(() => {
    if (!walletAddress || !state.gameOver) return;
    if (autoSentRef.current) return;
    autoSentRef.current = true;
    finishRun(runIdRef.current, {
      score: state.score, turn: state.turn,
      zone: state.currentZone ?? 1,
      gold: state.ship.gold, hull: state.ship.hull,
      run_title: state.runTitle,
    });
    if (!isDailyRun && !seedTokenRef.current) {
      console.warn('[approve] skip : seed local, run non soumise');
      clearActiveRun();
      return;
    }
    saveRunLog({
      run_id: runIdRef.current,
      wallet_address: walletAddress,
      seed: state.seed,
      ship_id: shipId ?? 'default',
      is_daily: isDailyRun,
      actions: actionLogRef.current,
      checks: actionLogRef.current.flatMap((_, i) => [
        checksRef.current[i * 3] ?? -1,
        checksRef.current[i * 3 + 1] ?? -1,
        checksRef.current[i * 3 + 2] ?? -1,
      ]),
      final_score: state.score,
      final_turn: state.turn,
    })
      // Le log doit etre en base avant que le serveur puisse le rejouer.
      .then(() => approveRun(runIdRef.current))
      .then((r: any) => {
        if (r?.approved) {
          setScoreSubmitted(true);
          if (r.nft?.minted?.length) {
            setNftMinted(r.nft.minted.map((m: any) => (typeof m === 'string' ? m : m.nft)));
          }
        } else {
          console.warn('[approve] refuse :', r?.raison ?? r);
        }
      })
      .catch((e: any) => {
        console.warn('[approve]', e);
        queuePending('approve', { run_id: runIdRef.current });
      });
    clearActiveRun();
  }, [state.gameOver]);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  const [cinematic, setCinematic] = useState<string | null>(null);
  const [_showDeathCinematic, _setShowDeathCinematic] = useState(false);
  const [showDeathScreen, setShowDeathScreen] = useState(false);
  const deathTimerRef = useRef<any>(null);
  // Une cinematique par type et par partie : vue dix fois, elle devient un peage.
  const seenCineRef = useRef<Set<string>>(new Set());

  // Rang Starktember, prepare pendant l'ecran de mort pour que le partage
  // soit instantane. On attend l'approbation serveur : annoncer un rang qui
  // change deux secondes plus tard ferait mauvais effet.
  const [rangMois, setRangMois] = useState<{ rank: number; total: number } | null>(null);
  useEffect(() => {
    const n = new Date();
    const enSeptembre = n.getUTCFullYear() === 2026 && n.getUTCMonth() === 8;
    if (!state.gameOver || !isDailyRun || !walletAddress || !enSeptembre) return;
    if (!scoreSubmitted) return;
    getStarktemberBoard()
      .then((b: StarktemberRow[]) => {
        const norm = (a: string) => a.toLowerCase().replace(/^0x0*/, '');
        const moi = b.find((r: StarktemberRow) => norm(r.wallet_address) === norm(walletAddress));
        if (moi) setRangMois({ rank: moi.rank, total: moi.total });
      })
      .catch(() => {});
  }, [state.gameOver, scoreSubmitted]);

  // Travelling : la grille est un viewport centre sur le navire, donc c'est le
  // monde qui glisse sous la coque. Sans ca, le plateau saute d'un coup.
  const prevPosRef = useRef({ x: state.ship.x, y: state.ship.y });
  const [slide, setSlide] = useState({ x: 0, y: 0, instant: false });
  const [lurch, setLurch] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const p = prevPosRef.current;
    const ddx = state.ship.x - p.x;
    const ddy = state.ship.y - p.y;
    prevPosRef.current = { x: state.ship.x, y: state.ship.y };
    if (ddx === 0 && ddy === 0) return;
    // Teleportation (maelstrom, changement de zone) : pas de travelling.
    if (Math.abs(ddx) > 1 || Math.abs(ddy) > 1) return;
    const v = state.ship.vision * 2 + 1;
    const cs = (isMobile
      ? Math.floor((window.innerWidth - 16) / v)
      : Math.floor(Math.min(window.innerWidth * 0.50, window.innerHeight * 0.62) / v) - 4) + 4;
    const amp = 0.8; // amplitude : 1 = une case pleine, plus bas = plus discret
    setSlide({ x: ddx * cs * amp, y: ddy * cs * amp, instant: true });
    setLurch({ x: ddx, y: ddy });
    const t = setTimeout(() => setLurch({ x: 0, y: 0 }), 380);
    const id = requestAnimationFrame(() =>
      setSlide({ x: 0, y: 0, instant: false }));
    return () => { cancelAnimationFrame(id); clearTimeout(t); };
  }, [state.ship.x, state.ship.y]);
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
    if (ct && SCENE_VIDEO[ct]) {
      if (seenCineRef.current.has(ct)) return;
      seenCineRef.current.add(ct);
      setCinematic(ct);
      const t = setTimeout(() => setCinematic(null), 5000);
      return () => clearTimeout(t);
    }
  }, [state.event, state.turn]);

  // Port cinematic trigger
  useEffect(() => {
    if (state.gameOver) { _setShowPortCinematic(false); return; }
    if (state.event?.cellType === 'port' && !isMobile) {
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
    if (state.event?.cellType === 'pirate' && !isMobile) {
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
    if (state.gameOver && state.score > 0) {
      if (state.score > personalBest) {
        setPersonalBest(state.score);
        setIsNewRecord(true);
        localStorage.setItem('corsair_best_score', state.score.toString());
      }
    }
  }, [state.gameOver]);

  // Death cinematic trigger
  useEffect(() => {
    if (state.gameOver) {
      const fresh = checkAndUnlockFeats(state);
      if (fresh.length > 0) { setNewFeats(fresh); sfx('streak'); }
      clearActiveRun();
      // Le score quotidien est desormais ecrit par le serveur.


      // Envoi automatique du score et des conditions NFT : ils ne doivent plus
      // dependre d'un clic, sinon un joueur qui ferme l'onglet disparait du
      // classement et perd ses reliques. La soumission on-chain, elle, coute
      // du gas et reste sur le bouton.
      // L'envoi du score et des NFT est desormais fait par le serveur.

      if (!isMobile) {
        // Si le hunter attack est en cours, attendre qu'il se termine
        const delay = hunterAttackRef.current ? 8000 : 0;
        setTimeout(() => {
          setShowHunterAttack(false);
          setCinematic('death');
          // Filet de sécurité : si la vidéo ne se termine pas (erreur de chargement),
          // on affiche quand même l'écran de mort après 9s (death.mp4 dure ~8s).
          deathTimerRef.current = setTimeout(() => { setShowDeathScreen(s => s || true); setCinematic(null); }, 9000);
        }, delay);
      } else {
        setShowDeathScreen(true);
      }
    } else {
      if (deathTimerRef.current) { clearTimeout(deathTimerRef.current); deathTimerRef.current = null; }
    setShowDeathScreen(false);
    setCinematic(null);
    seenCineRef.current.clear();
    }
  }, [state.gameOver]);

  // Hunter attack detection
  const hunterAttackRef = useRef(false);
  const hunterCineTurnRef = useRef<number>(-99);
  const hunterCineTimerRef = useRef<any>(null);
  useEffect(() => {
    if (!state.log?.includes('Tentacles rake the hull')) return;
    // Un Hunter en frenesie frappe a chaque tour : sans garde, l'animation
    // ne s'arretait plus. On la rejoue au plus une fois tous les 3 tours.
    if (state.turn - hunterCineTurnRef.current < 3) return;
    hunterCineTurnRef.current = state.turn;

    if (hunterCineTimerRef.current) clearTimeout(hunterCineTimerRef.current);
    hunterAttackRef.current = true;
    setShowHunterAttack(true);
    hunterCineTimerRef.current = setTimeout(() => {
      hunterAttackRef.current = false;
      setShowHunterAttack(false);
    }, 3500);
  }, [state.log, state.turn]);

  // Passer l'animation du Hunter : un clic, une touche ou un appui suffit.
  useEffect(() => {
    if (!showHunterAttack) return;
    const skip = () => { hunterAttackRef.current = false; setShowHunterAttack(false); };
    window.addEventListener('mousedown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('touchstart', skip);
    return () => {
      window.removeEventListener('mousedown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('touchstart', skip);
    };
  }, [showHunterAttack]);

  // Visual feedback effects
  useEffect(() => {
    // Storm surge flash
    if (state.log?.includes('⚡ Storm surge')) triggerFlash('rgba(100,150,255,0.35)');
    // Kraken/legendary flash
    if (state.event?.cellType === 'kraken' || state.event?.cellType === 'ancient_kraken') triggerFlash('rgba(150,0,255,0.3)');
    if (state.event?.cellType === 'ancient_kraken') triggerFlash('rgba(200,160,48,0.4)');
    // Hunter vignette — plus fort quand il est collé au navire
    const h = state.hunter;
    if (h?.active) {
      const dist = Math.abs(h.x - state.ship.x) + Math.abs(h.y - state.ship.y);
      setVignetteIntensity(dist <= 1 ? 0.72 : dist <= 2 ? 0.5 : dist <= 4 ? 0.28 : 0.12);
    } else {
      setVignetteIntensity(0);
    }
  }, [state]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (state.gameOver || state.event || state.showPort) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft'  || e.code === 'KeyA') move(-1, 0);
      if (e.key === 'ArrowUp'    || e.code === 'KeyW') move(0, -1);
      if (e.key === 'ArrowRight' || e.code === 'KeyD') move(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.gameOver, state.event, state.showPort, state.turn]);

  const move = (dx:number, dy:number) => {
    logAction(dx === -1 ? 0 : dx === 1 ? 2 : 1);
    setState(s => moveShip(s, dx, dy));
  };
  const resolve = (i:number) => {
    logAction(10 + i);
    setState(s => {
      const next = resolveEvent(s, i);
      if (next.ship.hull < s.ship.hull) triggerShake();
      return next;
    });
  };
  const skip = () => { logAction(20); setState(s => skipEventFn(s)); };
  const upgradeComp = (c: 'hull'|'weapon'|'nav') => { logAction(c === 'hull' ? 30 : c === 'weapon' ? 31 : 32); setState(s => upgradeComponent(s, c)); };

  const restart = async () => {
    // Nouvelle partie wallet = nouveau seed serveur, sinon la relance serait une faille.
    if (walletAddress) {
      setRestarting(true);
      setHarborDown(false);
      const issued = await issueSeed(walletAddress);
      setRestarting(false);
      if (!issued) {
        setHarborDown(true);
        return;
      }
      seedTokenRef.current = issued.seed_token;
      const fresh = initGame(issued.seed, shipId ?? 'default');
      actionLogRef.current = [];
      checksRef.current = [];
      lastBeatRef.current = 0;
      runIdRef.current = crypto.randomUUID();
      autoSentRef.current = false;
      setScoreSubmitted(false);
      setOnChainDone(false);
      setNftMinted([]);
      startRun({
        run_id: runIdRef.current, wallet_address: walletAddress,
        username: username ?? null, seed: fresh.seed, is_daily: false,
        seed_token: issued.seed_token,
      });
      setState(fresh);
      return;
    }
    const fresh = initGame(undefined, shipId ?? 'default');
    actionLogRef.current = [];
    checksRef.current = [];
    lastBeatRef.current = 0;
    runIdRef.current = crypto.randomUUID();
    autoSentRef.current = false;
    setScoreSubmitted(false);
    setOnChainDone(false);
    setNftMinted([]);
    setState(fresh);
  };

  // Ambient music — apres le premier geste, pas au chargement (2.6 Mo).
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const audio = new Audio(import.meta.env.BASE_URL + 'sounds/ambient.mp3');
      audio.loop = true;
      audio.volume = 0.4;
      audio.muted = muted;
      audio.play().catch(() => {});
      audioRef.current = audio;
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
    setSfxMuted(muted);
  }, [muted]);

  // ─── SFX declenches par les changements d'etat (diff-based) ───
  const prevSfx = useRef({ gold: state.ship.gold, hull: state.ship.hull, zone: state.currentZone ?? 1, over: state.gameOver, mult: state.scoreMultiplier ?? 1, hmode: state.hunter?.mode ?? '', storm: state.stormDistance });
  useEffect(() => {
    const p = prevSfx.current;
    const attacked = !!state.log?.includes('Tentacles rake');
    if (state.gameOver && !p.over) {
      sfx('death');
    } else if (!state.gameOver) {
      if (state.ship.gold > p.gold) sfx('gold');
      if (state.ship.gold < p.gold && state.showPort) sfx('buy');
      if (attacked) sfx('hunter_attack');
      else if (state.ship.hull < p.hull) sfx('damage');
      if ((state.currentZone ?? 1) !== p.zone) sfx('zone');
      if ((state.scoreMultiplier ?? 1) > p.mult) sfx('streak');
      const hm = state.hunter?.mode ?? '';
      if (hm !== p.hmode && (hm === 'stalking' || hm === 'frenzy')) sfx('hunter_near');
      // Tonnerre + secousse uniquement quand la tempete se rapproche ET est dangereuse (<=4),
      // pas a chaque tour. Evite les vibrations intempestives.
      if (state.stormDistance < p.storm && state.stormDistance <= 4 && state.stormDistance > 0) { sfx('thunder'); triggerShake(); }
    }
    prevSfx.current = { gold: state.ship.gold, hull: state.ship.hull, zone: state.currentZone ?? 1, over: state.gameOver, mult: state.scoreMultiplier ?? 1, hmode: state.hunter?.mode ?? '', storm: state.stormDistance };
    // Decouverte de relique -> overlay dramatique
    const rc = (state.relics ?? []).length;
    if (rc > prevRelicCount.current) {
      const newestId = (state.relics ?? [])[rc - 1];
      const def = getRelicDef(newestId);
      if (def) { setFoundRelic(def); sfx('streak'); }
    }
    prevRelicCount.current = rc;
  }, [state]);



  return (
    <motion.div
      animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height:'100dvh', width:'100vw', background:'#080f18',
        boxShadow: s.stormDistance <= 2 ? 'inset 0 0 80px rgba(220,30,30,0.6)' : s.stormDistance <= 4 ? 'inset 0 0 50px rgba(220,100,30,0.3)' : 'none', color:'#e8e0d0', fontFamily:"'Pirata One', cursive", display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' }}>

      {/* Mer de fond — tres assombrie pour ne pas gener la lecture des tuiles */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <motion.div
          key={s.currentZone ?? 1}
          initial={{ opacity:0 }} animate={{ opacity:0.22 }}
          transition={{ duration:1.6, ease:'easeOut' }}
          style={{ position:'absolute', inset:0,
            backgroundImage:`url(${ZONE_BG[s.currentZone ?? 1] ?? ZONE_BG[1]})`,
            backgroundSize:'cover', backgroundPosition:'center',
            filter:'saturate(0.7) brightness(0.8)' }} />
        <div style={{ position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)' }} />

      </div>

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
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '6px 8px' : '16px 28px', background:'rgba(6,11,18,0.92)', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0, position:'relative', zIndex:5 }}>
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
          <button onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute sound' : 'Mute sound'} title={muted ? 'Unmute sound' : 'Mute sound'} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', fontSize:18, cursor:'pointer', borderRadius:8, padding:'6px 10px', fontFamily:"'Cinzel', serif" }}>
            {muted ? '🔇' : '🔊'}
          </button>
        </div>}
        {isMobile && <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:13, fontWeight:700, color:'#eedd44', fontFamily:"'Cinzel', serif" }}>{s.score}pts</span>
          <button onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute sound' : 'Mute sound'} title={muted ? 'Unmute sound' : 'Mute sound'} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.4)', fontSize:14, cursor:'pointer' }}>{muted ? '🔇' : '🔊'}</button>
        </div>}
      </div>

      {/* Mobile relics strip (icones seules, compact) */}
      {isMobile && (s.relics ?? []).length > 0 && (
        <div style={{ display:'flex', gap:5, justifyContent:'center', padding:'4px 8px', background:'rgba(5,10,18,0.6)', flexWrap:'wrap' }}>
          {(s.relics ?? []).map(rid => { const r = getRelicDef(rid); if (!r) return null; return (
            <div key={rid} title={`${r.name} — ${r.desc}`}
              style={{ display:'flex', alignItems:'center', padding:'2px 5px', borderRadius:6, background:'rgba(200,160,48,0.14)', border:'1px solid rgba(200,160,48,0.35)' }}>
              <Icon name={r.icon as any} size={15} />
            </div>
          ); })}
        </div>
      )}

      {/* Mobile Hunter Bar */}
      {isMobile && s.hunter?.active && (() => {
        const hDist = Math.abs(s.hunter.x - s.ship.x) + Math.abs(s.hunter.y - s.ship.y);
        return (
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 10px', background: hDist <= 2 ? 'rgba(120,0,40,0.45)' : 'rgba(80,0,80,0.3)', borderBottom:'1px solid rgba(180,30,180,0.3)' }}>
          <Icon name="kraken" size={15} style={{ marginRight:2 }} />
          <div style={{ fontSize:11, color: s.hunter.mode==='frenzy'?'#ff6666':s.hunter.mode==='stalking'?'#dd88ff':'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:1, minWidth:70 }}>
            {hunterModeIcon(s.hunter.mode)}{hunterModeLabel(s.hunter.mode)}
          </div>
          <div style={{ fontSize:10, color: hDist <= 1 ? '#ff6677' : 'rgba(255,255,255,0.45)', fontFamily:"'Cinzel', serif", minWidth:52 }}>
            {hDist <= 1 ? 'HULL!' : `${hDist} away`}
          </div>
          <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.1)', borderRadius:2 }}>
            <div style={{ height:3, borderRadius:2, width:`${s.hunter.awareness}%`, background: s.hunter.awareness>=80?'#ee4444':s.hunter.awareness>=50?'#cc44ee':'#7744aa', transition:'width 0.5s' }}/>
          </div>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:"'Cinzel', serif" }}>{s.hunter.awareness}%</span>
        </div>
        );
      })()}

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
          {s.hunter && (() => {
            const hDist = Math.abs(s.hunter.x - s.ship.x) + Math.abs(s.hunter.y - s.ship.y);
            const near = hDist <= 2;
            return (
            <div style={{ background: near ? 'rgba(180,30,60,0.18)' : 'rgba(180,30,180,0.08)', border:`1px solid ${s.hunter.mode==='frenzy'||near?'rgba(220,50,80,0.65)':s.hunter.mode==='stalking'?'rgba(220,50,220,0.5)':'rgba(255,255,255,0.08)'}`, borderRadius:10, padding:'12px 10px', marginTop:4 }}>
              <div style={{ fontSize:13, color: near ? '#ff8899' : 'rgba(200,100,220,0.8)', letterSpacing:2, marginBottom:6 }}>🐙 HUNTER</div>
              <div style={{ display:'inline-block', padding:'2px 10px', borderRadius:6, fontSize:11, letterSpacing:2, fontFamily:"'Cinzel', serif", marginBottom:6,
                background: s.hunter.mode==='frenzy' ? 'rgba(220,30,30,0.3)' : s.hunter.mode==='stalking' ? 'rgba(180,30,180,0.3)' : s.hunter.mode==='searching' ? 'rgba(30,100,180,0.3)' : 'rgba(255,255,255,0.06)',
                color: s.hunter.mode==='frenzy' ? '#ff6666' : s.hunter.mode==='stalking' ? '#dd88ff' : s.hunter.mode==='searching' ? '#66aaff' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${s.hunter.mode==='frenzy'?'rgba(220,30,30,0.6)':s.hunter.mode==='stalking'?'rgba(180,30,180,0.5)':'rgba(255,255,255,0.1)'}`,
              }}>
                {hunterModeIcon(s.hunter.mode)}{hunterModeLabel(s.hunter.mode)}
              </div>
              <div style={{ fontSize:12, color: hDist <= 1 ? '#ff5566' : hDist <= 2 ? '#eeaa66' : 'rgba(255,255,255,0.45)', fontFamily:"'Cinzel', serif", letterSpacing:1, marginBottom:6 }}>
                {hDist <= 1 ? 'ON YOUR HULL' : hDist === 2 ? '2 CELLS AWAY' : `${hDist} CELLS AWAY`}
              </div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:1, marginBottom:4 }}>AWARENESS {s.hunter.awareness}%</div>
              <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2 }}>
                <motion.div animate={{ width:`${s.hunter.awareness}%` }} transition={{ duration:0.5 }}
                  style={{ height:4, borderRadius:2, background: s.hunter.awareness>=80?'#ee4444':s.hunter.awareness>=50?'#cc44ee':'#7744aa' }}/>
              </div>
            </div>
            );
          })()}

          {/* Upgrades owned */}
          <div style={{ fontSize:17, color:'rgba(255,255,255,0.6)', letterSpacing:2, marginTop:8 }}>EQUIPPED</div>
          {s.ship.upgrades.length === 0
            ? <div style={{ fontSize:17, color:'rgba(255,255,255,0.5)', fontStyle:'italic' }}>None yet</div>
            : s.ship.upgrades.map(id => {
              const u = UPGRADES.find(u=>u.id===id)!;
              return <div key={id} style={{ fontSize:14, color:BUILD_COLOR[u.build], display:'flex', alignItems:'center', gap:6 }}><img src={UPGRADE_ICONS[id]} style={{width:20,height:20,objectFit:'contain'}}/>{u.name}</div>;
            })
          }
          {s.upgradeToken && <div style={{ fontSize:14, color:'#eedd44', marginTop:4 }}>✦ Free upgrade — claim it at a port</div>}

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
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '6px 4px calc(96px + env(safe-area-inset-bottom))' : '10px', position:'relative', overflowY: isMobile ? 'auto' : 'visible' }}>
          {/* MOBILE — boutons de direction (le clavier n'existe pas sur mobile) */}
          {isMobile && !s.event && !s.showPort && !s.gameOver && (
            <div style={{ position:'fixed', left:0, right:0, bottom:0, zIndex:60, display:'flex', gap:8, padding:'10px 12px calc(10px + env(safe-area-inset-bottom))', background:'linear-gradient(to top, rgba(5,8,15,0.96), rgba(5,8,15,0.0))' }}>
              {[
                { label:'◀ PORT', dx:-1, dy:0 },
                { label:'▲ AHEAD', dx:0, dy:-1 },
                { label:'STARBOARD ▶', dx:1, dy:0 },
              ].map(b => (
                <button key={b.label} onClick={() => move(b.dx, b.dy)} aria-label={`Sail ${b.label.replace(/[▲◀▶]/g, '').trim().toLowerCase()}`}
                  style={{ flex: b.dy === -1 ? 1.3 : 1, padding:'16px 8px', borderRadius:12, border:'2px solid rgba(200,160,48,0.7)', background: b.dy === -1 ? 'rgba(200,160,48,0.28)' : 'rgba(200,160,48,0.14)', color:'#e8d8a8', fontSize:15, fontFamily:"'Pirata One', cursive", letterSpacing:1, cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
                  {b.label}
                </button>
              ))}
            </div>
          )}
          {isMobile && (
            <div style={{ display:'flex', gap:12, marginBottom:6, fontSize:13, fontFamily:"'Cinzel', serif" }}>
              <span style={{ color: s.stormDistance <= 4 ? '#ee4444' : '#ee8844' }}>⛈ {s.stormDistance} turns</span>
              <span style={{ color:'#cc44ee' }}>{ZONE_CONFIG[s.currentZone??1]?.name??'The Coasts'}</span>
              <span style={{ color:'#eedd44' }}>✦ {s.score} pts</span>
            </div>
          )}

          {!isMobile && !s.event && !s.showPort && !s.gameOver && (
            <div aria-label="Sailing controls" style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.38)', fontFamily:"'Cinzel', serif", letterSpacing:1.5 }}>SAIL</span>
              {[
                { label:'← PORT', keyHint:'A', dx:-1, dy:0 },
                { label:'↑ AHEAD', keyHint:'W', dx:0, dy:-1 },
                { label:'STARBOARD →', keyHint:'D', dx:1, dy:0 },
              ].map(b => (
                <button key={b.label} onClick={() => move(b.dx, b.dy)} title={`${b.label} (${b.keyHint} / arrow key)`}
                  style={{ padding:'8px 11px', borderRadius:8, border:'1px solid rgba(200,160,48,0.46)', background:b.dy === -1 ? 'rgba(200,160,48,0.2)' : 'rgba(200,160,48,0.08)', color:'#e8d8a8', fontSize:13, fontFamily:"'Pirata One', cursive", letterSpacing:1, cursor:'pointer' }}>
                  {b.label} <span style={{ marginLeft:4, color:'rgba(255,255,255,0.42)', fontFamily:"'Cinzel', serif", fontSize:10 }}>{b.keyHint}</span>
                </button>
              ))}
            </div>
          )}

          {onboard && !s.event && !s.showPort && !s.gameOver && (
            <OnboardCard tip={onboard} isMobile={isMobile} onDismiss={dismissOnboard} />
          )}

          {/* Grid */}
          <div style={{ position:'relative' }}>
            {/* Fog overlay */}
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)', pointerEvents:'none', zIndex:2, borderRadius:8 }}/>

            <div style={{
              display:'grid', gridTemplateColumns:`repeat(${s.ship.vision*2+1},1fr)`, gap:4,
              transform: `translate(${slide.x}px, ${slide.y}px)`,
              transition: slide.instant ? 'none' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}>
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
                const seesTracking = (s.relics ?? []).includes('kraken_eye');
                // Predictions visibles des qu'on voit le hunter (Eye of the Kraken aussi en tracking).
                const hunterOnScreen = s.hunter?.active && Math.abs(s.hunter.x - s.ship.x) <= s.ship.vision && Math.abs(s.hunter.y - s.ship.y) <= s.ship.vision;
                const isPredicted = !!hunterOnScreen && (seesTracking || s.hunter?.mode !== 'tracking') && hunterPredictions.has(`${x}-${y}`) && !(x===s.hunter!.x && y===s.hunter!.y);
                const cell = (x>=0&&x<GRID_SIZE&&y>=0&&y<GRID_SIZE) ? s.grid[y][x] : {type:'sea' as const,revealed:false,visited:false,value:0};
                const absX = s.ship.x + dx;
                const absY = s.ship.y + dy;
                const isHunter = s.hunter?.active && s.hunter.x === absX && s.hunter.y === absY;
                const hunterDist = s.hunter?.active ? Math.abs(s.hunter.x - s.ship.x) + Math.abs(s.hunter.y - s.ship.y) : 99;
                const isShip = dx===0 && dy===0;
                const isRevealed = cell.revealed || cell.visited;
                const isStormed = (cell as any).stormed;
                const stormFrontRow = s.stormDistance <= 0 ? -1 : s.grid.length + 2 - Math.floor((10 - s.stormDistance) / 3);
                const isStormFront = isStormed && y === stormFrontRow;
                const zonePalette = CELL_COLOR_BY_ZONE[s.currentZone ?? 1] ?? CELL_COLOR_BY_ZONE[1];
                const zoneGlow = CELL_GLOW_BY_ZONE[s.currentZone ?? 1] ?? CELL_GLOW_BY_ZONE[1];
                const glow = isStormed ? '#cc2222' : zoneGlow[cell.type];
                const vSize = s.ship.vision * 2 + 1; const CELL_S = isMobile ? Math.floor((window.innerWidth - 16) / vSize) : Math.floor(Math.min(window.innerWidth * 0.50, window.innerHeight * 0.62) / vSize) - 4;
                return (
                  <motion.div key={`${x}-${y}`} className={isStormFront ? 'storm-front' : undefined}
                    initial={isRevealed ? { opacity:0, scale:0.8 } : false}
                    animate={{ opacity:1, scale:1 }}
                    style={{
                      width:CELL_S, height:CELL_S,
                      background: isShip ? '#0a2a4a' : isHunter ? (s.hunter?.mode==='frenzy' ? '#3a0612' : '#2a0830') : isStormed ? '#2a0505' : isRevealed ? (zonePalette[cell.type] ?? '#050a0f') : (s.currentZone === 2 ? '#03050a' : s.currentZone === 3 ? '#020204' : '#050a0f'),
                      border: isShip ? (hunterDist <= 1 ? '2px solid #ee4466' : '2px solid #4a8acc') : isHunter ? `2px solid ${s.hunter?.mode==='frenzy'?'#ff4466':s.hunter?.mode==='stalking'?'#dd66ff':'#aa44cc'}` : isStormed ? '1px solid #cc222244' : isRevealed ? `1px solid ${glow ? glow+'44' : 'rgba(255,255,255,0.08)'}` : '1px solid rgba(255,255,255,0.03)',
                      borderRadius:8,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize: isShip ? 26 : 20,
                      boxShadow: isHunter ? `0 0 ${hunterDist<=2?22:14}px ${s.hunter?.mode==='frenzy'?'rgba(255,60,80,0.85)':'rgba(200,60,220,0.75)'}` : isShip ? (hunterDist <= 1 ? '0 0 22px rgba(238,68,102,0.55)' : '0 0 20px rgba(74,138,204,0.4)') : glow && isRevealed ? `0 0 10px ${glow}44` : 'none',
                      position:'relative', cursor:'default',
                    }}>
                    {isShip && (
                      <>
                        <motion.div
                          animate={{ rotate: lurch.x * 10, y: lurch.y * 5, scale: (lurch.x || lurch.y) ? 1.06 : 1 }}
                          transition={{ type:'spring', stiffness:200, damping:11 }}
                          style={{ transformOrigin:'50% 75%' }}>
                        <motion.div animate={{ y:[0,-3,0] }} transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}>
                          <img src={`${import.meta.env.BASE_URL}icons/ship.png`} style={{ width: CELL_S*0.82, height: CELL_S*0.82, objectFit:'contain', filter:'drop-shadow(0 0 10px rgba(74,138,204,0.9))' }}/>
                        </motion.div>
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
                  fontSize: isMobile ? 17 : (s.scoreMultiplier >= 3 ? 42 : 32),
                  fontWeight:700,
                  color: s.scoreMultiplier >= 3 ? '#ee4444' : '#eedd44',
                  letterSpacing: isMobile ? 2 : 4,
                  textShadow: isMobile ? 'none' : s.scoreMultiplier >= 3
                    ? '0 0 30px #ee4444, 0 0 60px #ee444466'
                    : '0 0 20px #eedd44, 0 0 40px #eedd4466',
                  filter: s.scoreMultiplier >= 3 ? 'brightness(1.3)' : 'brightness(1.1)',
                }}>
                  {s.scoreMultiplier >= 3 ? '🔥🔥🔥' : '🔥'} ×{s.scoreMultiplier} COMBO
                </div>
              )}
              <div style={{ display: isMobile ? 'none' : 'block', fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:2, marginTop:4 }}>
                STREAK {s.dangerStreak}
              </div>
              {s.dangerStreak >= 3 && (
                <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ repeat:Infinity, duration:1.2 }}
                  style={{ fontSize:11, color:'#ee8844', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  HUNTER ALERT
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
                  <Icon name="skull" size={18} style={{ marginRight:6 }} />CURSED WATERS
                </motion.div>
              )}
              {s.dangerStreak >= 6 && (
                <motion.div animate={{ opacity:[1,0.2,1] }} transition={{ repeat:Infinity, duration:0.5 }}
                  style={{ fontSize:11, color:'#ff2222', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  <Icon name="skull" size={18} style={{ marginRight:6 }} />LEGENDARY ZONE
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
          <div aria-live="polite" aria-atomic="true" style={{ marginTop:10, textAlign:'center', maxWidth:420, paddingRight: isMobile ? 80 : 0, marginBottom: 0 }}>
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
          {(s.relics ?? []).length > 0 && !isMobile && (
            <div style={{ marginTop:8, display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap' }}>
              {(s.relics ?? []).map(rid => { const r = getRelicDef(rid); if (!r) return null; return (
                <div key={rid} title={`${r.name} — ${r.desc}`}
                  style={{ display:'flex', alignItems:'center', gap:4, padding:'3px 8px', borderRadius:8, background:'rgba(200,160,48,0.12)', border:'1px solid rgba(200,160,48,0.35)' }}>
                  <Icon name={r.icon as any} size={16} />
                  <span style={{ fontSize:10, color:'#eedd88', fontFamily:"'Cinzel', serif", letterSpacing:0.5 }}>{r.name}</span>
                </div>
              ); })}
            </div>
          )}
          {isMobile && <div aria-hidden style={{ flexShrink:0, height:'calc(112px + env(safe-area-inset-bottom))' }}/>}
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
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={() => { if (cinematic === 'death') setShowDeathScreen(true); setCinematic(null); }}
            style={{ position:'fixed', inset:0, zIndex:140, cursor:'pointer', background:'#05080f' }}>
            <motion.video
              key={cinematic}
              src={SCENE_VIDEO[cinematic]}
              autoPlay muted={muted} playsInline preload="metadata"
              onEnded={() => { if (cinematic === 'death') setShowDeathScreen(true); setCinematic(null); }}
              initial={{ opacity: 0, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.42, duration: 0.75, ease: 'easeOut' }}
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

      {/* RELIC DISCOVERY OVERLAY */}
      <AnimatePresence>
        {foundRelic && (() => {
          const rarityColor = foundRelic.rarity === 'legendary' ? '#eedd44' : foundRelic.rarity === 'rare' ? '#c88aff' : '#88ddbb';
          const rarityLabel = foundRelic.rarity.toUpperCase();
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFoundRelic(null)}
              style={{ position:'fixed', inset:0, zIndex:150, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'radial-gradient(ellipse at center, rgba(20,15,5,0.92) 0%, rgba(3,5,10,0.97) 100%)' }}>
              <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                style={{ fontFamily:"'Cinzel', serif", fontSize:13, letterSpacing:6, color:'rgba(255,255,255,0.5)', marginBottom:24 }}>
                A RELIC SURFACES FROM THE DEEP
              </motion.div>
              <motion.div
                initial={{ scale:0, rotate:-30 }} animate={{ scale:1, rotate:0 }}
                transition={{ type:'spring', stiffness:130, damping:12, delay:0.2 }}
                style={{ filter:`drop-shadow(0 0 40px ${rarityColor})`, marginBottom:20 }}>
                <Icon name={foundRelic.icon as any} size={140} />
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                style={{ fontFamily:"'Cinzel', serif", fontSize:12, letterSpacing:4, color:rarityColor, marginBottom:8 }}>
                {rarityLabel} RELIC
              </motion.div>
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 }}
                style={{ fontFamily:"'Pirata One', cursive", fontSize: isMobile ? 30 : 40, color:rarityColor, letterSpacing:2, textShadow:`0 0 30px ${rarityColor}66`, marginBottom:14, textAlign:'center', padding:'0 20px' }}>
                {foundRelic.name}
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ fontFamily:"'IM Fell English', cursive", fontSize: isMobile ? 15 : 17, color:'rgba(255,255,255,0.75)', maxWidth:440, textAlign:'center', lineHeight:1.5, padding:'0 24px', marginBottom:32 }}>
                {foundRelic.desc}
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
                style={{ fontFamily:"'Cinzel', serif", fontSize:12, letterSpacing:3, color:'rgba(255,255,255,0.4)' }}>
                tap to continue
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* EVENT CHOICE — scene illustree ou compact (Swift Sails sur les deux) */}
      <AnimatePresence>
        {s.event && !cinematic && !s.gameOver && !s.showPort && SCENE_TITLES[s.event.cellType] && (
          <EventChoicePanel
            key="event-scene"
            variant="scene"
            event={s.event}
            isMobile={isMobile}
            gold={s.ship.gold}
            hull={s.ship.hull}
            relics={s.relics}
            score={s.score}
            onboard={onboard}
            onDismissOnboard={dismissOnboard}
            onChoose={resolve}
            canEscape={!!canEscape}
            onSkip={skip}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {s.event && !cinematic && !s.gameOver && !s.showPort && s.event.cellType && !SCENE_BG[s.event.cellType] && (
          <EventChoicePanel
            key="event-compact"
            variant="compact"
            event={s.event}
            isMobile={isMobile}
            gold={s.ship.gold}
            hull={s.ship.hull}
            relics={s.relics}
            cellIcon={CELL_ICONS[s.event.cellType]}
            onboard={onboard}
            onDismissOnboard={dismissOnboard}
            onChoose={resolve}
            canEscape={!!canEscape}
            onSkip={skip}
          />
        )}
      </AnimatePresence>

      {/* PORT PANEL */}
      <PortPanel
        open={!!s.showPort && !s.gameOver}
        isMobile={isMobile}
        ship={s.ship}
        portUpgrades={s.portUpgrades}
        upgradeToken={!!s.upgradeToken}
        maxedComponents={s.maxedComponents}
        cart={cart}
        setCart={setCart}
        onboard={onboard}
        onDismissOnboard={dismissOnboard}
        onUpgradeComponent={upgradeComp}
        onReroll={() => { logAction(40); setState(st => rerollPort(st)); }}
        onRepair={(gain, cost, code) => { logAction(code); setState(st => repairHull(st, gain, cost)); }}
        onSetSail={() => {
          for (const id of cart) logAction(50 + UPGRADE_CODES.indexOf(id as string));
          logAction(70);
          setState(st => {
            let s2 = st;
            for (const id of cart) s2 = buyUpgrade(s2, id as UpgradeId);
            return leavePort(s2);
          });
          setCart([]);
        }}
      />

      {/* GAME OVER */}
      <GameOverScreen
        open={showDeathScreen}
        state={s}
        isMobile={isMobile}
        isDailyRun={isDailyRun}
        personalBest={personalBest}
        isNewRecord={isNewRecord}
        newFeats={newFeats}
        scoreSubmitted={scoreSubmitted}
        nftMinted={nftMinted}
        walletAddress={walletAddress}
        account={account}
        onChainDone={onChainDone}
        setOnChainDone={setOnChainDone}
        submitting={submitting}
        setSubmitting={setSubmitting}
        connecting={connecting}
        onConnect={() => connect()}
        showGuestDailyCta={!!(walletAddress && startedAsGuest.current && !isDailyRun && dailyAvailable && onPlayDaily)}
        onPlayDaily={onPlayDaily}
        rangMois={rangMois}
        harborDown={harborDown}
        restarting={restarting}
        onRestart={restart}
        onHome={onHome}
      />

      {/* HUNTER ATTACK NOTIFICATION */}
      <AnimatePresence>
        {showHunterAttack && !isMobile && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:0.3}}
            style={{ position:'fixed', inset:0, zIndex:150, pointerEvents:'none' }}>
            <video src={`${import.meta.env.BASE_URL}scenes/hunter.mp4`} autoPlay muted={muted} playsInline preload="metadata" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)' }}/>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              style={{ position:'absolute', bottom:'20%', left:0, right:0, textAlign:'center' }}>
              <div style={{ fontSize: 32, color:'#cc44ee', fontFamily:"'Pirata One', cursive", letterSpacing:3, textShadow:'0 0 30px rgba(150,0,150,0.9)' }}>THE HUNTER STRIKES!</div>
              <div style={{ fontSize:16, color:'rgba(255,255,255,0.7)', fontFamily:"'IM Fell English', cursive", marginTop:6 }}>Tentacles rake the hull</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:"'Cinzel', serif", letterSpacing:2, marginTop:14 }}>CLICK TO SKIP</div>
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
              aria-label="Show ship status" aria-expanded={mobileDrawer === 'ship'}
              style={{ width:44, height:44, borderRadius:10, border:`1px solid ${mobileDrawer==='ship' ? '#44cc88' : 'rgba(255,255,255,0.2)'}`, background: mobileDrawer==='ship' ? 'rgba(68,204,136,0.2)' : 'rgba(0,0,0,0.7)', color: mobileDrawer==='ship' ? '#44cc88' : 'rgba(255,255,255,0.6)', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>⚓</motion.button>
            <motion.button whileTap={{scale:0.9}}
              onClick={() => setMobileDrawer(mobileDrawer === 'upgrades' ? null : 'upgrades')}
              aria-label="Show upgrades" aria-expanded={mobileDrawer === 'upgrades'}
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
                    {s.upgradeToken && <div style={{ fontSize:12, color:'#eedd44', marginBottom:8 }}>✦ Free upgrade — claim it at a port</div>}
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

    </motion.div>
  );
}
