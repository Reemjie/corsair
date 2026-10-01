// ─── APPROVE-RUN ─────────────────────────────────────────────────────
//
// Le serveur rejoue la partie depuis son log et devient le seul a approuver
// un score et une recompense. Le client n'envoie qu'un run_id : tout le
// reste est relu en base avec la cle service.
//
// Appel :  POST { run_id }
// Reponse : { approved, score, declared, seed_source, nft }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Le moteur lit localStorage dans quelques fonctions (daily, feats).
// On le neutralise AVANT de l'importer.
(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine = await import('./game/engine.ts');
const {
  initGame, moveShip, resolveEvent, skipEventFn,
  upgradeComponent, rerollPort, buyUpgrade, repairHull, leavePort,
  getDailyKey,
} = engine as any;

const UPGRADE_CODES = [
  'ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape',
  'vision', 'compass', 'detector', 'power', 'armor', 'explorer', 'stormbreaker',
];

function rejoue(seed: number, shipId: string, actions: number[]) {
  let s = initGame(seed, shipId || 'default');
  for (const c of actions) {
    if (c === 0)                 s = moveShip(s, -1, 0);
    else if (c === 1)            s = moveShip(s, 0, -1);
    else if (c === 2)            s = moveShip(s, 1, 0);
    else if (c >= 10 && c < 20)  s = resolveEvent(s, c - 10);
    else if (c === 20)           s = skipEventFn(s);
    else if (c === 30)           s = upgradeComponent(s, 'hull');
    else if (c === 31)           s = upgradeComponent(s, 'weapon');
    else if (c === 32)           s = upgradeComponent(s, 'nav');
    else if (c === 40)           s = rerollPort(s);
    else if (c >= 50 && c < 60)  s = buyUpgrade(s, UPGRADE_CODES[c - 50]);
    else if (c === 60)           s = repairHull(s, 8, 25);
    else if (c === 61)           s = repairHull(s, s.ship.maxHull, 55);
    else if (c === 70)           s = leavePort(s);
  }
  return s;
}

// Seed daily : meme calcul que le jeu, pour une date donnee.
function seedDailyPour(d: Date): number {
  const cle = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  let h = 0;
  for (let i = 0; i < cle.length; i++) { h = ((h << 5) - h) + cle.charCodeAt(i); h |= 0; }
  return Math.abs(h) % 999999;
}

// Date ISO d'une journee de jeu, en UTC comme la cle du daily.
function dateISOPour(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

const URL_SB = Deno.env.get('SUPABASE_URL')!;
const CLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { run_id } = await req.json();
    if (!run_id) return json({ error: 'run_id manquant' }, 400, cors);

    const sb = createClient(URL_SB, CLE);

    // 1. le log, relu en base — on ne fait confiance a rien de ce que
    //    le client aurait pu envoyer
    const { data: log, error: e1 } = await sb
      .from('corsair_run_logs').select('*').eq('run_id', run_id).maybeSingle();
    if (e1 || !log) return json({ error: 'run introuvable' }, 404, cors);

    // 2. idempotence : une run deja approuvee ne l'est pas deux fois
    if (log.verified !== null) {
      return json({ approved: log.verified, score: log.replay_score, deja: true }, 200, cors);
    }

    // 3. rejeu
    const etat = rejoue(log.seed, log.ship_id, log.actions ?? []);
    const scoreServeur = etat.score;
    const conforme = scoreServeur === log.final_score;

    // 4. provenance du seed
    let provenance = 'unknown';
    let dateDaily: string | null = null;
    if (log.is_daily) {
      const joue = new Date(log.created_at);
      const veille = new Date(joue.getTime() - 86400000);
      // La date vient du SEED, pas de l'horloge : une partie commencee avant
      // minuit UTC et finie apres appartient a la veille.
      if (log.seed === seedDailyPour(joue)) { provenance = 'daily'; dateDaily = dateISOPour(joue); }
      else if (log.seed === seedDailyPour(veille)) { provenance = 'daily'; dateDaily = dateISOPour(veille); }
    } else {
      const { data: emis } = await sb.from('corsair_seeds')
        .select('seed_token')
        .eq('wallet_address', log.wallet_address).eq('seed', log.seed)
        .limit(1).maybeSingle();
      provenance = emis ? 'server' : 'unknown';
    }

    // Un rejeu conforme ne suffit pas : un seed local est reproductible, mais
    // le client pouvait le choisir. Il reste trace dans le log, sans pouvoir
    // alimenter un classement ni declencher une recompense.
    const approuvee = conforme && provenance !== 'unknown';

    await sb.from('corsair_run_logs').update({
      verified: approuvee, replay_score: scoreServeur,
      seed_source: provenance, verified_at: new Date().toISOString(),
    }).eq('run_id', run_id);

    // 5. le score n'est ecrit QUE si le rejeu et la provenance sont verifies
    if (!approuvee) {
      return json({ approved: false, score: scoreServeur, declared: log.final_score,
                    seed_source: provenance,
                    raison: conforme ? 'seed non verifiable' : 'score non reproductible' }, 200, cors);
    }

    const { data: run } = await sb.from('corsair_runs')
      .select('username').eq('run_id', run_id).maybeSingle();

    await sb.from('corsair_scores').insert({
      wallet_address: log.wallet_address,
      username: run?.username ?? null,
      score: scoreServeur,               // valeur du SERVEUR, pas du client
      run_title: etat.runTitle ?? 'Corsair',
      turn: etat.turn,
      zone: etat.currentZone ?? 1,
      seed: log.seed,
    });

    // 5 bis. classement quotidien : une seule entree par joueur et par jour
    if (log.is_daily && dateDaily) {
      const { data: deja } = await sb.from('corsair_daily_scores')
        .select('id')
        .eq('wallet_address', log.wallet_address).eq('date', dateDaily)
        .limit(1).maybeSingle();
      if (!deja) {
        await sb.from('corsair_daily_scores').insert({
          wallet_address: log.wallet_address,
          username: run?.username ?? null,
          score: scoreServeur,
          date: dateDaily,
          seed: String(log.seed),
        });
      }
      // Tentative daily consommee cote serveur (plus d'insert anon).
      const cleDaily = dateDaily.replace(/-/g, '');
      await sb.from('daily_plays').upsert({
        wallet_address: log.wallet_address,
        daily_key: cleDaily,
      }, { onConflict: 'wallet_address,daily_key', ignoreDuplicates: true });
    }

    // 5 ter. feats debloques sur l'etat REJOUE — plus d'insert anon.
    const FEAT_CHECKS: { id: string; ok: (s: any) => boolean }[] = [
      { id: 'first_voyage', ok: s => s.turn >= 1 },
      { id: 'sea_legs',     ok: s => s.turn >= 15 },
      { id: 'storm_sea',    ok: s => (s.currentZone ?? 1) >= 2 },
      { id: 'the_abyss',    ok: s => (s.currentZone ?? 1) >= 3 },
      { id: 'prey_no_more', ok: s => (s.hunterAttacksSurvived ?? 0) >= 2 },
      { id: 'gold_hoarder', ok: s => s.ship.gold >= 300 },
      { id: 'legend_coast', ok: s => s.score >= 1000 },
      { id: 'storm_legend', ok: s => s.score >= 2000 },
      { id: 'daredevil',    ok: s => (s.exploits ?? []).includes('streak5') },
      { id: 'full_rig',     ok: s => (s.ship.upgrades ?? []).length >= 2 },
    ];
    for (const f of FEAT_CHECKS) {
      if (!f.ok(etat)) continue;
      const { error: fe } = await sb.from('player_feats').insert({
        wallet_address: log.wallet_address,
        feat_id: f.id,
      });
      if (fe && !String(fe.message).toLowerCase().includes('duplicate')) {
        console.warn('[feats]', fe.message);
      }
    }

    // 6. conditions NFT, evaluees sur l'etat rejoue
    let nft: any = null;
    try {
      const r = await fetch(`${URL_SB}/functions/v1/check-nft-conditions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CLE}` },
        body: JSON.stringify({
          wallet_address: log.wallet_address,
          run_id,
          score: scoreServeur,
          seed: log.seed,
          turn: etat.turn,
          gold: etat.ship.gold,
          hull: etat.ship.hull,
          ports_visited: etat.portsVisited ?? 0,
          treasures_found: etat.treasuresFound ?? 0,
          pirates_fought: etat.piratesFought ?? 0,
          kraken_killed: etat.krakenKilled ?? false,
          ancient_kraken_killed: etat.ancientKrakenKilled ?? false,
          hunter_attacks_survived: etat.hunterAttacksSurvived ?? 0,
          maelstrom_survived: etat.maelstromSurvived ?? false,
          min_hull_during_run: etat.lowestHull ?? etat.ship.hull,
          combo_turn: etat.comboTurn ?? 999,
          storm_distance_min: etat.stormDistanceMin ?? 99,
          cursed_treasure_taken: etat.cursedTreasureTaken ?? false,
        }),
      });
      nft = await r.json();
    } catch (e) {
      console.warn('[nft]', e);
    }

    return json({ approved: true, score: scoreServeur, declared: log.final_score,
                  seed_source: provenance, nft }, 200, cors);
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500, {});
  }
});

function json(corps: unknown, statut: number, entetes: Record<string, string>) {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { ...entetes, 'Content-Type': 'application/json' },
  });
}
