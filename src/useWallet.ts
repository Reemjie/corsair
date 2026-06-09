import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import { cartridgeConnector } from './cartridge';

export function useWallet() {
  const { address, account } = useAccount();
  const { connect, isPending: connecting } = useConnect();
  const { disconnect: doDisconnect } = useDisconnect();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!address) { setUsername(null); return; }
    cartridgeConnector.username()?.then(u => setUsername(u ?? null)).catch(() => setUsername(null));
  }, [address]);

  return {
    address: address ?? null,
    account: account ?? null,
    username,
    connecting,
    connect: () => connect({ connector: cartridgeConnector as never }),
    disconnect: () => doDisconnect(),
  };
}
