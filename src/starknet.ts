import { RpcProvider, Contract, type Abi } from 'starknet';

const CONTRACT_ADDRESS = '0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3';

const ABI = [
  {
    name: 'submit_score',
    type: 'function',
    inputs: [
      { name: 'score', type: 'core::integer::u32' },
      { name: 'seed', type: 'core::integer::u32' },
      { name: 'turn', type: 'core::integer::u32' },
      { name: 'zone', type: 'core::integer::u8' },
      { name: 'run_title', type: 'core::felt252' },
      { name: 'version', type: 'core::integer::u8' },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    name: 'get_score_count',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'count', type: 'core::integer::u32' }],
    state_mutability: 'view',
  },
] as const;

export const provider = new RpcProvider({ nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet' });

export function getCorsairContract(account?: any) {
  return new Contract({
    abi: ABI as Abi,
    address: CONTRACT_ADDRESS,
    providerOrAccount: account ?? provider,
  });
}

export async function submitScoreOnChain(
  account: any,
  score: number,
  seed: number,
  turn: number,
  zone: number,
  runTitle: string,
) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(runTitle.slice(0, 31));
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const titleFelt = '0x' + (hex || '00');

  // Use account.execute directly (Cartridge Controller compatible)
  const result = await account.execute([{
    contractAddress: CONTRACT_ADDRESS,
    entrypoint: 'submit_score',
    calldata: [
      score.toString(),
      seed.toString(),
      turn.toString(),
      zone.toString(),
      titleFelt,
      '1', // version
    ],
  }]);
  return result;
}
