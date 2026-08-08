// ─── PROTECTION CONTRE LES CRASHS ────────────────────────────────────────
//
// Deux mecanismes, tous deux appuyes sur localStorage (ecriture disque
// synchrone, donc survit a une fermeture d'onglet ou une coupure) :
//
//   1. Journal de la partie en cours, ecrit a chaque action. Permet de
//      reconstituer une run interrompue.
//   2. File de reessai : si l'envoi de fin de partie echoue ou n'a pas le
//      temps de partir, la charge est conservee et rejouee au prochain
//      chargement.

const RUN_KEY = 'corsair_active_run';
const QUEUE_KEY = 'corsair_pending_sync';

export interface ActiveRun {
  run_id: string;
  wallet_address: string;
  seed: number;
  ship_id: string;
  is_daily: boolean;
  actions: number[];
  turn: number;
  score: number;
  saved_at: number;
}

export function saveActiveRun(r: ActiveRun): void {
  try {
    localStorage.setItem(RUN_KEY, JSON.stringify({ ...r, saved_at: Date.now() }));
  } catch { /* quota : on abandonne silencieusement */ }
}

export function loadActiveRun(): ActiveRun | null {
  try {
    const raw = localStorage.getItem(RUN_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as ActiveRun;
    // au-dela de 24 h, on considere la partie perimee
    if (Date.now() - (r.saved_at ?? 0) > 86400000) { clearActiveRun(); return null; }
    return r;
  } catch { return null; }
}

export function clearActiveRun(): void {
  try { localStorage.removeItem(RUN_KEY); } catch { /* ignore */ }
}

// ─── File de reessai ─────────────────────────────────────────────────────

export type PendingKind = 'score' | 'nft';

export interface PendingItem {
  id: string;
  kind: PendingKind;
  payload: any;
  tries: number;
  created_at: number;
}

export function queuePending(kind: PendingKind, payload: any): void {
  try {
    const q = loadQueue();
    q.push({
      id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      kind, payload, tries: 0, created_at: Date.now(),
    });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-20)));
  } catch { /* ignore */ }
}

export function loadQueue(): PendingItem[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as PendingItem[]) : [];
  } catch { return []; }
}

function saveQueue(q: PendingItem[]): void {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch { /* ignore */ }
}

/// Rejoue la file. `send` renvoie true si l'envoi a abouti.
/// Les elements qui echouent 5 fois sont abandonnes pour eviter une file
/// qui grossit indefiniment.
export async function flushQueue(
  send: (kind: PendingKind, payload: any) => Promise<boolean>,
): Promise<number> {
  const q = loadQueue();
  if (q.length === 0) return 0;

  const restants: PendingItem[] = [];
  let envoyes = 0;

  for (const item of q) {
    try {
      const ok = await send(item.kind, item.payload);
      if (ok) { envoyes++; continue; }
    } catch { /* on retente plus tard */ }
    if (item.tries + 1 < 5) restants.push({ ...item, tries: item.tries + 1 });
  }

  saveQueue(restants);
  if (envoyes > 0) console.log(`[sync] ${envoyes} envoi(s) en attente rejoue(s)`);
  return envoyes;
}
