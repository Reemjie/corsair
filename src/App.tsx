import { useState } from 'react';
import { useWallet } from './useWallet';
import CorsairGame from './components/CorsairGame';
import HomePage from './HomePage';

type Screen = 'home' | 'game' | 'tutorial';

export default function App() {
  const { address, account, username: walletUsername } = useWallet();
  const [screen, setScreen] = useState<Screen>('home');
  const [dailySeed, setDailySeed] = useState<number | undefined>(undefined);
  const [overrideUsername, setOverrideUsername] = useState<string | null>(null);

  const handlePlay = (_address: string | null, uname?: string | null, seed?: number) => {
    setOverrideUsername(uname ?? null);
    setDailySeed(seed);
    if (!localStorage.getItem('corsair_tutorial_done') && !seed) {
      setScreen('tutorial');
    } else {
      setScreen('game');
    }
  };

  const username = overrideUsername ?? walletUsername;

  if (screen === 'tutorial') return <CorsairGame walletAddress={null} account={null} onHome={() => setScreen('home')} tutorialMode={true} onTutorialDone={() => { setScreen('home'); setTimeout(() => setScreen('game'), 50); }} />;
  if (screen === 'game') return <CorsairGame walletAddress={address} account={account} username={username} onHome={() => setScreen('home')} dailySeed={dailySeed} />;
  return <HomePage onPlay={handlePlay} />;
}
