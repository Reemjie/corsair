// ─── Progression meta (rétention) ─────────────────────────────────────
// Pics locaux + avancement des feats pour Game Over / bandeau home.
// Pas de serveur : guest-friendly.

import { FEATS, getUnlockedFeats, type Feat } from './feats';
import { SHIPS } from './ships';

const PEAKS_KEY = 'corsair_run_peaks';
const BEST_KEY = 'corsair_best_score';

export type RunPeaks = {
  bestScore: number;
  bestTurn: number;
  bestZone: number;
  bestHunterSurvived: number;
  bestGoldEnd: number;
  bestStreak: number;
};

export type FeatProgress = {
  feat: Feat;
  current: number;
  target: number;
  ratio: number;
  /** Short line for UI */
  line: string;
  /** Ship unlocked by this feat, if any */
  shipName: string | null;
};

const EMPTY_PEAKS: RunPeaks = {
  bestScore: 0,
  bestTurn: 0,
  bestZone: 1,
  bestHunterSurvived: 0,
  bestGoldEnd: 0,
  bestStreak: 0,
};

export function getPersonalBest(): number {
  try { return parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0; } catch { return 0; }
}

export function setPersonalBest(score: number): void {
  try { localStorage.setItem(BEST_KEY, String(score)); } catch { /* quota */ }
}

export function getRunPeaks(): RunPeaks {
  try {
    const raw = localStorage.getItem(PEAKS_KEY);
    const best = getPersonalBest();
    if (!raw) return { ...EMPTY_PEAKS, bestScore: best };
    const parsed = JSON.parse(raw) as Partial<RunPeaks>;
    return { ...EMPTY_PEAKS, ...parsed, bestScore: Math.max(parsed.bestScore ?? 0, best) };
  } catch {
    return { ...EMPTY_PEAKS, bestScore: getPersonalBest() };
  }
}

export function recordRunPeaks(partial: Partial<RunPeaks>): RunPeaks {
  const prev = getRunPeaks();
  const next: RunPeaks = {
    bestScore: Math.max(prev.bestScore, partial.bestScore ?? 0),
    bestTurn: Math.max(prev.bestTurn, partial.bestTurn ?? 0),
    bestZone: Math.max(prev.bestZone, partial.bestZone ?? 1),
    bestHunterSurvived: Math.max(prev.bestHunterSurvived, partial.bestHunterSurvived ?? 0),
    bestGoldEnd: Math.max(prev.bestGoldEnd, partial.bestGoldEnd ?? 0),
    bestStreak: Math.max(prev.bestStreak, partial.bestStreak ?? 0),
  };
  try { localStorage.setItem(PEAKS_KEY, JSON.stringify(next)); } catch { /* quota */ }
  if (next.bestScore > getPersonalBest()) setPersonalBest(next.bestScore);
  return next;
}

function shipForFeat(featId: string): string | null {
  const sh = SHIPS.find(s => s.unlockFeat === featId);
  return sh ? sh.name : null;
}

/** Progression d'un feat locké à partir des pics (lifetime). */
export function featProgress(feat: Feat, peaks: RunPeaks): FeatProgress | null {
  const unlocked = getUnlockedFeats();
  if (unlocked.includes(feat.id)) return null;

  let current = 0;
  let target = 1;
  let label = '';

  switch (feat.id) {
    case 'first_voyage':
      current = peaks.bestTurn >= 1 ? 1 : 0; target = 1; label = 'Complete a run'; break;
    case 'sea_legs':
      current = peaks.bestTurn; target = 15; label = `${Math.min(current, target)}/${target} turns survived`; break;
    case 'storm_sea':
      current = peaks.bestZone >= 2 ? 1 : 0; target = 1; label = current ? 'Storm Sea reached' : 'Reach The Storm Sea'; break;
    case 'the_abyss':
      current = peaks.bestZone >= 3 ? 1 : 0; target = 1; label = current ? 'Abyss reached' : 'Reach The Abyss'; break;
    case 'prey_no_more':
      current = peaks.bestHunterSurvived; target = 2; label = `${Math.min(current, target)}/${target} Hunter hits survived`; break;
    case 'gold_hoarder':
      current = peaks.bestGoldEnd; target = 300; label = `${Math.min(current, target)}/${target} gold held at death`; break;
    case 'legend_coast':
      current = peaks.bestScore; target = 1000; label = `${Math.min(current, target).toLocaleString()}/${target.toLocaleString()} pts`; break;
    case 'storm_legend':
      current = peaks.bestScore; target = 2000; label = `${Math.min(current, target).toLocaleString()}/${target.toLocaleString()} pts`; break;
    case 'daredevil':
      current = peaks.bestStreak; target = 5; label = `${Math.min(current, target)}/${target} danger streak`; break;
    case 'full_rig':
      // Pas de pic fiable sans tracker les upgrades — skip ratio soft
      current = 0; target = 2; label = 'Own 2 special abilities in one run'; break;
    default:
      return null;
  }

  const ratio = target <= 0 ? 0 : Math.min(1, current / target);
  const shipName = shipForFeat(feat.id);
  const shipBit = shipName ? ` · unlocks ${shipName}` : '';
  return {
    feat,
    current,
    target,
    ratio,
    line: `${feat.name}: ${label}${shipBit}`,
    shipName,
  };
}

/** Feats les plus proches d'être débloqués (ratio > 0, pas encore unlock). */
export function getNearestFeats(peaks: RunPeaks = getRunPeaks(), limit = 2): FeatProgress[] {
  const list: FeatProgress[] = [];
  for (const f of FEATS) {
    const p = featProgress(f, peaks);
    if (!p) continue;
    if (p.ratio <= 0 && f.id === 'full_rig') continue; // pas d'info
    if (p.ratio >= 1) continue; // devrait déjà être unlock via check
    list.push(p);
  }
  list.sort((a, b) => b.ratio - a.ratio || a.target - b.target);
  // Prefer ones with some progress; if none, show the "easiest" locked (lowest target / first_voyage etc.)
  const withProgress = list.filter(p => p.ratio > 0);
  const pool = withProgress.length > 0 ? withProgress : list;
  return pool.slice(0, limit);
}

/** Snapshot d'une run qui vient de finir → pics + nearest pour l'écran. */
export function summarizeRunForRetention(args: {
  score: number;
  turn: number;
  zone: number;
  gold: number;
  hunterAttacksSurvived: number;
  peakStreak: number;
  hadStreak5: boolean;
}): { peaks: RunPeaks; nearest: FeatProgress[]; pb: number; shortfall: number; isNewRecord: boolean } {
  const pbBefore = getPersonalBest();
  const isNewRecord = args.score > pbBefore;
  const peaks = recordRunPeaks({
    bestScore: args.score,
    bestTurn: args.turn,
    bestZone: args.zone,
    bestGoldEnd: args.gold,
    bestHunterSurvived: args.hunterAttacksSurvived,
    bestStreak: Math.max(args.peakStreak, args.hadStreak5 ? 5 : 0),
  });
  const pb = getPersonalBest();
  return {
    peaks,
    nearest: getNearestFeats(peaks, 2),
    pb,
    shortfall: isNewRecord ? 0 : Math.max(0, pb - args.score),
    isNewRecord,
  };
}
