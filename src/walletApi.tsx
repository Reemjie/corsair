import { createContext, useContext, type ReactNode } from 'react';

export type WalletApi = {
  address: string | null;
  account: any;
  username: string | null;
  connecting: boolean;
  /** true once Cartridge/Starknet chunk is loaded */
  ready: boolean;
  connect: () => void;
  disconnect: () => void;
  openProfile: () => void;
};

export const WalletContext = createContext<WalletApi>({
  address: null,
  account: null,
  username: null,
  connecting: false,
  ready: false,
  connect: () => {},
  disconnect: () => {},
  openProfile: () => {},
});

export function useWallet(): WalletApi {
  return useContext(WalletContext);
}

export function WalletProvider({ value, children }: { value: WalletApi; children: ReactNode }) {
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
