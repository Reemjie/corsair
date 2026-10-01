import { lazy, Suspense, useCallback, useMemo, useState, type ReactNode } from 'react';
import { WalletProvider, type WalletApi } from './walletApi';

const LazyStarknet = lazy(() =>
  import('./cartridge').then(m => ({ default: m.StarknetProvider })),
);
const LazyLive = lazy(() => import('./LiveWalletBridge'));

/**
 * Premier paint sans Cartridge (~2 Mo de JS/WASM).
 * Le chunk wallet ne charge que sur Connect (ou autoConnect apres lazy).
 */
export default function WalletRoot({ children }: { children: ReactNode }) {
  const [live, setLive] = useState(false);
  const [pendingConnect, setPendingConnect] = useState(false);

  const startWallet = useCallback((andConnect: boolean) => {
    if (andConnect) setPendingConnect(true);
    setLive(true);
  }, []);

  const stub = useMemo<WalletApi>(() => ({
    address: null,
    account: null,
    username: null,
    connecting: pendingConnect,
    ready: false,
    connect: () => startWallet(true),
    disconnect: () => {},
    openProfile: () => startWallet(false),
  }), [pendingConnect, startWallet]);

  if (!live) {
    return <WalletProvider value={stub}>{children}</WalletProvider>;
  }

  return (
    <Suspense fallback={<WalletProvider value={stub}>{children}</WalletProvider>}>
      <LazyStarknet>
        <Suspense fallback={<WalletProvider value={stub}>{children}</WalletProvider>}>
          <LazyLive autoConnect={pendingConnect}>{children}</LazyLive>
        </Suspense>
      </LazyStarknet>
    </Suspense>
  );
}
