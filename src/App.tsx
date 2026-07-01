import { useState } from 'react';
import { useWallet } from './useWallet';
import CorsairGame from './components/CorsairGame';
import HomePage from './HomePage';

type Screen = 'home' | 'game';

export default function App() {
  const { address, account, username: walletUsername } = useWallet();
  const [screen, setScreen] = useState<Screen>('home');
  const [dailySeed, setDailySeed] = useState<number | undefined>(undefined);
  const [overrideUsername, setOverrideUsername] = useState<string | null>(null);

  const handlePlay = (_address: string | null, uname?: string | null, seed?: number) => {
    setOverrideUsername(uname ?? null);
    setDailySeed(seed);
    setScreen('game');
  };

  const username = overrideUsername ?? walletUsername;

  if (screen === 'game') return <CorsairGame walletAddress={address} account={account} username={username} onHome={() => setScreen('home')} dailySeed={dailySeed} />;
  return <HomePage onPlay={handlePlay} />;
}
