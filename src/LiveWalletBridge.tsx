import { useEffect, useState, type ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { cartridgeConnector } from './cartridge';
import { WalletProvider, type WalletApi } from './walletApi';

/** Pont vers les hooks Starknet — monte seulement apres le lazy-load Cartridge. */
export default function LiveWalletBridge({
  children,
  autoConnect,
}: {
  children: ReactNode;
  autoConnect: boolean;
}) {
  const { address, account } = useAccount();
  const { connect, isPending: connecting } = useConnect();
  const { disconnect: doDisconnect } = useDisconnect();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!address) { setUsername(null); return; }
    cartridgeConnector.username()?.then(u => setUsername(u ?? null)).catch(() => setUsername(null));
  }, [address]);

  useEffect(() => {
    if (!autoConnect || address) return;
    connect({ connector: cartridgeConnector as never });
  }, [autoConnect, address, connect]);

  const value: WalletApi = {
    address: address ?? null,
    account: account ?? null,
    username,
    connecting,
    ready: true,
    connect: () => connect({ connector: cartridgeConnector as never }),
    disconnect: () => doDisconnect(),
    openProfile: () => {
      try { (cartridgeConnector.controller as any).openProfile(); } catch { /* ignore */ }
    },
  };

  return <WalletProvider value={value}>{children}</WalletProvider>;
}
