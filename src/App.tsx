import { useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import CorsairGame from './components/CorsairGame';
import HomePage from './HomePage';
import AdminPanel from './AdminPanel';
import { getSelectedShip } from './game/ships';
import { setFeatsWallet, syncFeatsFromServer } from './game/feats';
import { flushQueue, clearActiveRun, type ActiveRun } from './game/crashRecovery';
import { replayRun } from './game/replay';
import type { GameState } from './types/game';
import { submitScore, checkNFTConditions } from './supabase';

type Screen = 'home' | 'game' | 'admin';

export default function App() {
  const { address, account, username: walletUsername } = useWallet();
  const [screen, setScreen] = useState<Screen>('home');
  const [dailySeed, setDailySeed] = useState<number | undefined>(undefined);
  const [isDaily, setIsDaily] = useState(false);
  const [seedToken, setSeedToken] = useState<string | undefined>(undefined);
  const [resume, setResume] = useState<{ state: GameState; run: ActiveRun } | undefined>(undefined);
  const [overrideUsername, setOverrideUsername] = useState<string | null>(null);

  // Feats lies au wallet : on charge ceux du serveur des la connexion.
  useEffect(() => {
    setFeatsWallet(address ?? null);
    if (address) syncFeatsFromServer(address);
  }, [address]);

  // Envois restes en attente lors d'une session precedente.
  useEffect(() => {
    flushQueue(async (kind, p) => {
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

  const handlePlay = (_address: string | null, uname?: string | null, seed?: number, daily?: boolean, token?: string) => {
    setOverrideUsername(uname ?? null);
    setResume(undefined);
    setDailySeed(seed);
    setIsDaily(!!daily);
    setSeedToken(token);
    setScreen('game');
  };

  const username = overrideUsername ?? walletUsername;

  // Le Daily force le navire par defaut (equite du tournoi) ; sinon le navire choisi.
  const shipId = isDaily ? 'default' : getSelectedShip();
  if (screen === 'admin') return <AdminPanel onHome={() => { window.location.hash = ''; setScreen('home'); }} />;
  if (screen === 'game') return <CorsairGame walletAddress={address} account={account} username={username} onHome={() => setScreen('home')} dailySeed={dailySeed} isDaily={isDaily} seedToken={seedToken} shipId={resume ? resume.run.ship_id : shipId} resumeState={resume?.state} resumeRunId={resume?.run.run_id} resumeActions={resume?.run.actions} />;
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
