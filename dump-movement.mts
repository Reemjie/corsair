/**
 * Genere un test Cairo pour le calcul de surtempete.
 *
 * Importe les VRAIES constantes du jeu (BALANCE, ZONE_CONFIG) et sa vraie
 * fonction de serie (getStreakEffects). Seules les trois lignes du calcul de
 * seuil sont reprises de stepMovement — a resynchroniser si elles changent.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-movement.mts > ../corsair_verifier/src/movement_vectors.cairo
 */

import { seededRng } from './src/game/rng';
import { BALANCE, ZONE_CONFIG } from './src/game/balance';
import { getStreakEffects } from './src/game/systems/streak';

const GRID_SIZE = 12;

// —— copie fidele des lignes de stepMovement ——
function surgeChance(
  ny: number, hasHunter: boolean, hasGreed: boolean,
  gold: number, dangerStreak: number, currentZone: number,
): number {
  const zoneLabel = ny >= Math.floor(GRID_SIZE * 0.7) ? 'early'
    : ny >= Math.floor(GRID_SIZE * 0.4) ? 'mid' : 'late';
  const fx = getStreakEffects(dangerStreak);
  const hunterSurge = hasHunter ? BALANCE.storm.hunterSurgeBonus : 0;
  const greedCorruption = hasGreed ? Math.floor(gold / BALANCE.greed.corruptionStep) : 0;
  const greedStormBonus = greedCorruption * BALANCE.greed.corruptionStormBonus;
  const streakStormBonus = fx.stormAggro;
  const midPenalty = ny <= Math.floor(GRID_SIZE * 0.6) && ny > Math.floor(GRID_SIZE * 0.3) ? 0.05 : 0;
  const rawSurgeChance = (zoneLabel === 'early' ? BALANCE.storm.surgeEarly
    : zoneLabel === 'mid' ? BALANCE.storm.surgeMid : BALANCE.storm.surgeLate)
    + hunterSurge + midPenalty + streakStormBonus + greedStormBonus;
  const zoneStormMult = ZONE_CONFIG[currentZone]?.stormMultiplier ?? 1.0;
  return Math.min(BALANCE.storm.maxSurge, rawSurgeChance * zoneStormMult);
}

const u32 = (n: number) => n >>> 0;

const NYS = [0, 3, 4, 7, 8, 11];
const GOLDS = [0, 600];
const STREAKS = [0, 4];
const ZONES = [1, 2, 3];
const SEEDS = [744758, 252489, 525657];

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : constantes du jeu + calcul de stepMovement, via dump-movement.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::movement::roll_surge;');
out.push('');
out.push('    #[test]');
out.push('    fn surtempete_identique_au_moteur_js() {');

let n = 0;
let seedIdx = 0;
for (const ny of NYS) {
  for (const hasHunter of [false, true]) {
    for (const hasGreed of [false, true]) {
      for (const gold of GOLDS) {
        for (const streak of STREAKS) {
          for (const zone of ZONES) {
            const chance = surgeChance(ny, hasHunter, hasGreed, gold, streak, zone);
            const chanceE5 = Math.round(chance * 100000);

            const seed = SEEDS[seedIdx % SEEDS.length];
            seedIdx++;
            const rng = seededRng(seed);
            const surge = rng.next() < chance ? 2 : rng.next() < 0.15 ? 0 : 1;
            const after = u32(rng.getState());

            out.push(`        // ny=${ny} hunter=${hasHunter} greed=${hasGreed} gold=${gold} streak=${streak} zone=${zone} chance=${chance}`);
            out.push(`        let (s, surge) = roll_surge(${u32(seed)}, ${chanceE5});`);
            out.push(`        assert!(surge == ${surge}, "surge cas ${n}");`);
            out.push(`        assert!(s == ${after}, "etat cas ${n}");`);
            n++;
          }
        }
      }
    }
  }
}

out.push('    }');
out.push('}');

console.error(`${n} cas generes`);
console.log(out.join('\n'));
