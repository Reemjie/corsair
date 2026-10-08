import { useState, useEffect, lazy, Suspense } from 'react';
import { useWallet } from './useWallet';
import HomePage from './HomePage';
import { getSelectedShip } from './game/ships';
import { setFeatsWallet, syncFeatsFromServer } from './game/feats';
import { flushQueue, clearActiveRun, type ActiveRun } from './game/crashRecovery';
import { replayRun } from './game/replay';
import type { GameState } from './types/game';
import { submitScore, checkNFTConditions, approveRun } from './supabase';
import { getDailySeed } from './game/engine';

const CorsairGame = lazy(() => import('./components/CorsairGame'));
const AdminPanel = lazy(() => import('./AdminPanel'));

type Screen = 'home' | 'game' | 'admin';

/** Flip to false when Tideborn polish is done — redeploy. Bypass: ?crew=1 */
const MAINTENANCE = true;
const CREW_KEY = 'corsair_crew_bypass';

function BootSplash() {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#060e18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Pirata One', cursive", color: '#c8a030', letterSpacing: 4, fontSize: 22 }}>
      CORSAIR
    </div>
  );
}

function MaintenanceScreen() {
  return (
    <div style={{
      height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #0c2238 0%, #060e18 55%, #03060c 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Pirata One', cursive", color: '#c8a030', textAlign: 'center', padding: 24,
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
        backgroundImage: `url(${import.meta.env.BASE_URL}scenes/storm.jpg)`,
        backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.6) brightness(0.45)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(6,14,24,0.55) 0%, rgba(6,14,24,0.75) 50%, rgba(3,6,12,0.95) 100%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 420 }}>
        <div style={{ fontSize: 56, letterSpacing: 14, textShadow: '0 0 40px rgba(200,160,48,0.45)', marginBottom: 8 }}>
          CORSAIR
        </div>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 4,
          color: 'rgba(136,200,238,0.85)', marginBottom: 28,
        }}>
          TIDEBORN · SEASON 1
        </div>
        <div style={{
          fontFamily: "'IM Fell English', cursive", fontSize: 20, lineHeight: 1.45,
          color: 'rgba(255,255,255,0.78)', marginBottom: 12,
        }}>
          The tide is turning.
        </div>
        <div style={{
          fontFamily: "'IM Fell English', cursive", fontSize: 15, lineHeight: 1.5,
          color: 'rgba(255,255,255,0.45)',
        }}>
          The sea is closed while we fit new relics to the hull.<br />
          Cast off again soon.
        </div>
      </div>
    </div>
  );
}

function hasCrewBypass(): boolean {
  try {
    // Only the active URL param — do not persist, so maintenance stays closed for everyone else
    if (new URLSearchParams(window.location.search).has('crew')) {
      return true;
    }
    localStorage.removeItem(CREW_KEY);
    return false;
  } catch {
    return false;
  }
}

export default function App() {
  const { address, account, username: walletUsername } = useWallet();
  const [screen, setScreen] = useState<Screen>('home');
  const [dailySeed, setDailySeed] = useState<number | undefined>(undefined);
  const [isDaily, setIsDaily] = useState(false);
  const [seedToken, setSeedToken] = useState<string | undefined>(undefined);
  const [resume, setResume] = useState<{ state: GameState; run: ActiveRun } | undefined>(undefined);
  const [overrideUsername, setOverrideUsername] = useState<string | null>(null);
  const [runShipId, setRunShipId] = useState<string | undefined>(undefined);
  const [crewOk] = useState(() => hasCrewBypass());

  // Feats lies au wallet : on charge ceux du serveur des la connexion.
  useEffect(() => {
    setFeatsWallet(address ?? null);
    if (address) syncFeatsFromServer(address);
  }, [address]);

  // Envois restes en attente lors d'une session precedente.
  useEffect(() => {
    flushQueue(async (kind, p) => {
      if (kind === 'approve') { await approveRun(p.run_id); return true; }
      if (kind === 'score') {
        return await submitScore(p.wallet, p.score, p.run_title, p.turn, p.zone, p.seed, p.username);
      }
      await checkNFTConditions(p);
      return true;
    });
  }, []);

  useEffect(() => {
    const check = () => { if (window.location.hash.replace('#','') === 'admin') setScreen('admin'); };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const handlePlay = (_address: string | null, uname?: string | null, seed?: number, daily?: boolean, token?: string, shipForRun?: string) => {
    setOverrideUsername(uname ?? null);
    setResume(undefined);
    setDailySeed(seed);
    setIsDaily(!!daily);
    setSeedToken(token);
    setRunShipId(daily ? 'default' : shipForRun);
    setScreen('game');
  };

  // Mode invite : ?guest=1 lance une partie sans wallet. Rien n'est enregistre,
  // puisque le serveur n'approuve que les runs liees a un wallet — l'ecran de
  // mort le dit deja au joueur.
  useEffect(() => {
    if (MAINTENANCE && !crewOk) return;
    if (!new URLSearchParams(window.location.search).has('guest')) return;
    handlePlay(null, 'Guest', Math.floor(Math.random() * 999999), false, undefined);
  }, []);

  const username = overrideUsername ?? walletUsername;

  // Daily = Wanderer. Free run = draft pick, sinon shipyard selection.
  const shipId = isDaily ? 'default' : (runShipId ?? getSelectedShip());
  if (screen === 'admin') return (
    <Suspense fallback={<BootSplash />}>
      <AdminPanel onHome={() => { window.location.hash = ''; setScreen('home'); }} />
    </Suspense>
  );
  if (MAINTENANCE && !crewOk) {
    return <MaintenanceScreen />;
  }
  if (screen === 'game') return (
    <Suspense fallback={<BootSplash />}>
      <CorsairGame
        walletAddress={address}
        account={account}
        username={username}
        onHome={() => setScreen('home')}
        onPlayDaily={() => {
          if (!address) return;
          handlePlay(address, walletUsername, getDailySeed(), true);
        }}
        dailySeed={dailySeed}
        isDaily={isDaily}
        seedToken={seedToken}
        shipId={resume ? resume.run.ship_id : shipId}
        resumeState={resume?.state}
        resumeRunId={resume?.run.run_id}
        resumeActions={resume?.run.actions}
      />
    </Suspense>
  );
  const handleResume = (run: ActiveRun) => {
    try {
      const st = replayRun(run.seed, run.ship_id, run.actions);
      if (st.gameOver) { clearActiveRun(); return; }
      setResume({ state: st, run });
      setIsDaily(run.is_daily);
      setDailySeed(run.is_daily ? run.seed : undefined);
      setScreen('game');
    } catch (e) {
      console.warn('Replay failed, clearing saved run:', e);
      clearActiveRun();
    }
  };

  return <HomePage onPlay={handlePlay} onResume={handleResume} />;
}
