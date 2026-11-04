import { ControllerConnector } from "@cartridge/connector";
import { mainnet } from "@starknet-react/chains";
import { StarknetConfig, jsonRpcProvider, voyager } from "@starknet-react/core";
import type { Chain } from "@starknet-react/chains";
import type { ReactNode } from "react";
import { STARKNET_MAINNET_RPC } from "./rpc";

export const cartridgeConnector = new ControllerConnector({
  chains: [
    { rpcUrl: STARKNET_MAINNET_RPC },
  ],
  defaultChainId: "0x534e5f4d41494e",
  policies: {
    contracts: {
      "0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3": {
        methods: [
          { name: "submit_score", entrypoint: "submit_score" },
        ],
      },
    },
  },
});

function rpc(chain: Chain) {
  if (chain.id === mainnet.id)
    return { nodeUrl: STARKNET_MAINNET_RPC };
  // Cartridge sepolia slot is discontinued (410); keep mainnet-only.
  return { nodeUrl: STARKNET_MAINNET_RPC };
}

export function StarknetProvider({ children }: { children: ReactNode }) {
  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={jsonRpcProvider({ rpc })}
      connectors={[cartridgeConnector as never]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
