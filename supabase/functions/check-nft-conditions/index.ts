import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const METADATA_URIS: Record<string, string> = {
  kraken_eye: 'ipfs://QmVnXgMYLnyMdUSbDXPqrFmWZJBNke7wPWvpn3ou86fKAX',
  ancient_chart: 'ipfs://QmbXeEXsfmgrfi1SoWvKJmcLhXqCZH4fCg5LNbYX7c1zLh',
  storm_caller: 'ipfs://Qmb54sRo5vJydXJ9m3L23fSCYMbqGkJkHsMfVD9bce1Pmv',
  ghost_corsair: 'ipfs://QmQXuYjxb99HrTmHSZWnTg2tTktiHd2o4yTdTrSbRXsQFG',
  maelstrom_heart: 'ipfs://QmXDXm9cAQ3g5bkYQyqKpnRG1uN7tndvjtfobcyDgD2pQa',
  cursed_doubloon: 'ipfs://QmRGSBiu4exYzt8hbQMGK5g4AEvSi23KJpaoog9MV9cHBe',
  hunters_mark: 'ipfs://QmNTmrM9GAeAtPY8jJcQ8FSLrSEfbovnmv7yxQbxn1bEi6',
  last_port: 'ipfs://QmPnXkYVFQqVKJcY87dQkSte8bKWQiYVY8KTfDBPMGB1wA',
  blood_moon_tide: 'ipfs://QmRQMW4ybuayF4S4yRwKzHHEpQWLbbJXtrYroAAB3rjx2M',
  leviathan: 'ipfs://QmNnwHkhNawMF1K2cEzfitNUAzWRoAaqAF3hxheULKxj19',
}

interface RunData {
  wallet_address: string
  score: number
  seed: number
  turn: number
  gold: number
  hull: number
  ports_visited: number
  treasures_found: number
  pirates_fought: number
  kraken_killed: boolean
  ancient_kraken_killed: boolean
  hunter_attacks_survived: number
  maelstrom_survived: boolean
  min_hull_during_run: number
  combo_turn: number
  storm_distance_min: number
  cursed_treasure_taken: boolean
}

const TELEGRAM_BOT_TOKEN = '8221890035:AAGyxBLtupGfI15SOFWSdtDYr3qw55GPDwM'
const TELEGRAM_CHAT_ID = '5846433874'

async function sendTelegramNotification(nftName: string, walletAddress: string) {
  const msg = `🏴‍☠️ NFT EARNED!\n\nNFT: ${nftName}\nWallet: ${walletAddress.slice(0,10)}...${walletAddress.slice(-6)}\n\nMint it manually with sncast!`
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(msg)}`)
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  
  let run: RunData
  try { run = await req.json() } catch { return new Response('Invalid JSON', { status: 400 }) }

  const nftsToMint: string[] = []

  // ACHIEVEMENT CONDITIONS
  if (run.gold >= 300 && run.cursed_treasure_taken) nftsToMint.push('cursed_doubloon')
  if (run.ports_visited >= 2 && run.score > 500) nftsToMint.push('last_port')
  if (run.treasures_found >= 3 && run.kraken_killed) nftsToMint.push('ancient_chart')
  if (run.pirates_fought === 0 && run.score > 400) nftsToMint.push('ghost_corsair')
  if (run.combo_turn <= 8 && run.turn >= 20) nftsToMint.push('blood_moon_tide')

  // SEED CONDITIONS (LEGENDARY)
  const { data: seedData } = await supabase
    .from('nft_seeds').select('nft_name')
    .eq('seed', run.seed).eq('used', false).single()

  if (seedData) {
    const n = seedData.nft_name
    if (n === 'kraken_eye' && run.ancient_kraken_killed) nftsToMint.push(n)
    else if (n === 'storm_caller' && run.storm_distance_min <= 2 && run.turn >= 10) nftsToMint.push(n)
    else if (n === 'maelstrom_heart' && run.maelstrom_survived) nftsToMint.push(n)
    else if (n === 'hunters_mark' && run.hunter_attacks_survived >= 2) nftsToMint.push(n)
    else if (n === 'leviathan' && run.score >= 3000 && run.kraken_killed) nftsToMint.push(n)
  }

  if (nftsToMint.length === 0) return new Response(JSON.stringify({ minted: [] }), { headers: { 'Content-Type': 'application/json' } })

  const queued = []

  for (const nftName of nftsToMint) {
    const { data: condition } = await supabase.from('nft_conditions').select('minted, max_supply').eq('name', nftName).single()
    if (!condition || condition.minted >= condition.max_supply) continue

    const { data: existing } = await supabase.from('nft_mints').select('id').eq('wallet_address', run.wallet_address).eq('nft_name', nftName).single()
    if (existing) continue

    // Queue the mint instead of executing it
    await supabase.from('nft_mints').insert({
      wallet_address: run.wallet_address,
      nft_name: nftName,
      nft_id: Object.keys(METADATA_URIS).indexOf(nftName) + 1,
      status: 'pending',
    })

    if (seedData?.nft_name === nftName) {
      await supabase.from('nft_seeds').update({ used: true, used_by: run.wallet_address, used_at: new Date().toISOString() }).eq('seed', run.seed).eq('nft_name', nftName)
    }

    await supabase.from('nft_conditions').update({ minted: condition.minted + 1 }).eq('name', nftName)
    await sendTelegramNotification(nftName, run.wallet_address)
    queued.push(nftName)
  }

  return new Response(JSON.stringify({ minted: queued }), { headers: { 'Content-Type': 'application/json' } })
})
