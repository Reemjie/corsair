import type { Rng } from './rng';

export type EventId =
  'wreck' | 'troubled_water' | 'chest' | 'strange_fog' | 'ghost_ship' |
  'current' | 'distant_storm' | 'shadow' | 'island' | 'beacon' |
  'pirates' | 'calm_sea' | 'map_fragment' | 'cry' | 'sharks' |
  'buried_treasure' | 'altar' | 'living_fog' | 'hull_debris' | 'merchant_port';

export type ChoiceResult = {
  hullDelta?: number;
  goldDelta?: number;
  visionReveal?: number;
  stormAdvance?: number;
  skipEvent?: boolean;
  upgradeToken?: boolean;
  retreat?: boolean;
  advance?: number;
  heal?: boolean;
  showPort?: boolean;
  log: string;
};

export interface EventChoice {
  label: string;
  icon: string;
  risk: 'safe' | 'risky' | 'bold';
  resolve: (rng: Rng, power: number, armor: boolean) => ChoiceResult;
}

export interface GameEvent {
  id: EventId;
  label: string;
  desc: string;
  icon: string;
  threat: 0 | 1 | 2 | 3;
  choices: [EventChoice, EventChoice];
}

export const EVENTS: Record<EventId, GameEvent> = {
  wreck: {
    id: 'wreck', label: 'Drifting Wreck', icon: '🚢',
    desc: 'A wreck floats in the mist...',
    threat: 1,
    choices: [
      { label: 'Search it', icon: '🔍', risk: 'risky',
        resolve: (rng, _p, _a) => rng.next() < 0.6
          ? { goldDelta: rng.int(50, 100), log: 'The wreck was full of treasure! +gold' }
          : { hullDelta: -10, log: 'A trap! Hidden explosives. -10 hull.' } },
      { label: 'Ignore', icon: '🚢', risk: 'safe',
        resolve: () => ({ log: 'You sail past. Better safe than sorry.' }) },
    ],
  },
  troubled_water: {
    id: 'troubled_water', label: 'Troubled Waters', icon: '🌊',
    desc: 'The water moves unnaturally below.',
    threat: 1,
    choices: [
      { label: 'Move slow', icon: '🐢', risk: 'safe',
        resolve: () => ({ log: 'You navigate carefully. All clear.' }) },
      { label: 'Push through', icon: '💨', risk: 'risky',
        resolve: (rng, _p, armor) => rng.next() < 0.7
          ? { log: 'Fast crossing! No trouble.' }
          : { hullDelta: armor ? -3 : -8, log: 'Something hit the hull!' } },
    ],
  },
  chest: {
    id: 'chest', label: 'Floating Chest', icon: '📦',
    desc: 'A locked chest bobs in the waves.',
    threat: 1,
    choices: [
      { label: 'Open it', icon: '🔓', risk: 'risky',
        resolve: (rng, _p, armor) => rng.next() < 0.65
          ? { goldDelta: rng.int(30, 80), log: 'Riches inside! +gold' }
          : { hullDelta: armor ? -4 : -8, log: 'Booby-trapped! -hull' } },
      { label: 'Leave it', icon: '🚫', risk: 'safe',
        resolve: () => ({ log: 'You leave the chest. Stay cautious.' }) },
    ],
  },
  strange_fog: {
    id: 'strange_fog', label: 'Strange Fog', icon: '🌫',
    desc: 'An unnatural fog closes in around you.',
    threat: 1,
    choices: [
      { label: 'Push through', icon: '⚡', risk: 'risky',
        resolve: (rng) => rng.next() < 0.5
          ? { advance: 1, log: 'The fog carries you forward!' }
          : { retreat: true, log: 'The fog pushes you back...' } },
      { label: 'Go around', icon: '↩', risk: 'safe',
        resolve: () => ({ stormAdvance: 1, log: 'Safe detour, but the storm gains ground.' }) },
    ],
  },
  ghost_ship: {
    id: 'ghost_ship', label: 'Ghost Ship', icon: '👻',
    desc: 'A silent vessel drifts toward you.',
    threat: 2,
    choices: [
      { label: 'Board & plunder', icon: '⚔️', risk: 'bold',
        resolve: (rng, power, armor) => rng.next() < 0.5
          ? { goldDelta: rng.int(80, 150), log: 'Massive plunder! +gold' }
          : { hullDelta: armor ? -(12 - power) : -(16 - power), log: 'Cursed ship! Heavy damage.' } },
      { label: 'Flee', icon: '💨', risk: 'safe',
        resolve: () => ({ log: 'You sail away from the ghost ship.' }) },
    ],
  },
  current: {
    id: 'current', label: 'Favorable Current', icon: '🌀',
    desc: 'A strong current pulls at your hull.',
    threat: 0,
    choices: [
      { label: 'Ride it', icon: '⛵', risk: 'safe',
        resolve: () => ({ advance: 1, log: 'The current carries you forward!' }) },
      { label: 'Resist', icon: '⚓', risk: 'safe',
        resolve: () => ({ log: 'You hold your course. Steady.' }) },
    ],
  },
  distant_storm: {
    id: 'distant_storm', label: 'Distant Storm', icon: '⛈',
    desc: 'The living storm looms closer.',
    threat: 1,
    choices: [
      { label: 'Accelerate', icon: '💨', risk: 'risky',
        resolve: (rng) => rng.next() < 0.7
          ? { skipEvent: true, log: 'You outrun the storm for now!' }
          : { hullDelta: -5, log: 'Pushed hard but took wave damage.' } },
      { label: 'Hold course', icon: '🧭', risk: 'safe',
        resolve: () => ({ stormAdvance: 1, log: 'The storm inches closer...' }) },
    ],
  },
  shadow: {
    id: 'shadow', label: 'Underwater Shadow', icon: '🦑',
    desc: 'Something large trails your vessel.',
    threat: 2,
    choices: [
      { label: 'Attack it', icon: '⚔️', risk: 'bold',
        resolve: (rng, power, armor) => {
          const dmg = Math.max(2, rng.int(5, 12) - power - (armor ? 3 : 0));
          return { hullDelta: -dmg, goldDelta: rng.int(40, 80), log: `Fought it off! -${dmg} hull +gold` };
        } },
      { label: 'Flee', icon: '💨', risk: 'risky',
        resolve: (rng) => rng.next() < 0.6
          ? { retreat: true, log: 'You retreat to safer waters.' }
          : { hullDelta: -4, log: 'It grazes your hull as you flee.' } },
    ],
  },
  island: {
    id: 'island', label: 'Abandoned Isle', icon: '🏝',
    desc: 'A small deserted island appears.',
    threat: 0,
    choices: [
      { label: 'Explore', icon: '🔭', risk: 'risky',
        resolve: (rng) => rng.next() < 0.6
          ? { upgradeToken: true, log: 'You find ancient equipment!' }
          : { log: 'Nothing but sand and old bones.' } },
      { label: 'Sail on', icon: '⛵', risk: 'safe',
        resolve: () => ({ log: 'You keep moving. No time to waste.' }) },
    ],
  },
  beacon: {
    id: 'beacon', label: 'Ancient Beacon', icon: '🔦',
    desc: 'A blinking light in the distance.',
    threat: 0,
    choices: [
      { label: 'Activate it', icon: '⚡', risk: 'safe',
        resolve: () => ({ visionReveal: 3, log: 'The beacon lights up the sea! Vision expanded.' }) },
      { label: 'Ignore', icon: '🚫', risk: 'safe',
        resolve: () => ({ log: 'You sail past the beacon.' }) },
    ],
  },
  pirates: {
    id: 'pirates', label: 'Pirates!', icon: '☠',
    desc: 'An enemy crew closes in fast.',
    threat: 2,
    choices: [
      { label: 'Fight', icon: '⚔️', risk: 'bold',
        resolve: (rng, power, armor) => {
          const dmg = Math.max(0, rng.int(4, 10) - power - (armor ? 3 : 0));
          return { hullDelta: -dmg, goldDelta: rng.int(30, 70), log: `Victory! -${dmg} hull +gold plunder.` };
        } },
      { label: 'Pay tribute', icon: '💰', risk: 'safe',
        resolve: (rng) => ({ goldDelta: -rng.int(20, 40), log: 'You pay them off. Safe passage.' }) },
    ],
  },
  calm_sea: {
    id: 'calm_sea', label: 'Calm Waters', icon: '🌅',
    desc: 'Unusually peaceful waters surround you.',
    threat: 0,
    choices: [
      { label: 'Rest', icon: '😴', risk: 'safe',
        resolve: () => ({ hullDelta: 4, log: 'The crew rests. +4 hull restored.' }) },
      { label: 'Press on', icon: '⛵', risk: 'safe',
        resolve: () => ({ advance: 1, log: 'You make good time on calm seas.' }) },
    ],
  },
  map_fragment: {
    id: 'map_fragment', label: 'Map Fragment', icon: '🗺',
    desc: 'A torn piece of chart floats by.',
    threat: 0,
    choices: [
      { label: 'Study it', icon: '🔍', risk: 'safe',
        resolve: () => ({ visionReveal: 2, goldDelta: 20, log: 'The map reveals nearby treasure! +vision +gold' }) },
      { label: 'Discard', icon: '🗑', risk: 'safe',
        resolve: () => ({ log: 'You toss the fragment overboard.' }) },
    ],
  },
  cry: {
    id: 'cry', label: 'Cry in the Fog', icon: '👤',
    desc: 'Someone calls out from the mist.',
    threat: 1,
    choices: [
      { label: 'Investigate', icon: '🔦', risk: 'risky',
        resolve: (rng, _p, armor) => rng.next() < 0.5
          ? { goldDelta: rng.int(40, 80), log: 'A grateful survivor shares their gold!' }
          : { hullDelta: armor ? -5 : -10, log: 'An ambush! You barely escape.' } },
      { label: 'Ignore', icon: '🚫', risk: 'safe',
        resolve: () => ({ log: 'You harden your heart and sail on.' }) },
    ],
  },
  sharks: {
    id: 'sharks', label: 'Sharks!', icon: '🦈',
    desc: 'Dorsal fins circle your vessel.',
    threat: 1,
    choices: [
      { label: 'Slow down', icon: '🐢', risk: 'safe',
        resolve: () => ({ log: 'You slow down. The sharks lose interest.' }) },
      { label: 'Full speed', icon: '💨', risk: 'risky',
        resolve: (rng, _p, armor) => rng.next() < 0.65
          ? { log: 'You outrun them!' }
          : { hullDelta: armor ? -3 : -7, log: 'Sharks ram the hull! -hull' } },
    ],
  },
  buried_treasure: {
    id: 'buried_treasure', label: 'Sunken Glow', icon: '💎',
    desc: 'A shimmering light beneath the waves.',
    threat: 1,
    choices: [
      { label: 'Dive for it', icon: '🤿', risk: 'bold',
        resolve: (rng, _p, armor) => rng.next() < 0.6
          ? { goldDelta: rng.int(80, 140), log: 'Incredible treasure from the deep! +gold' }
          : { hullDelta: armor ? -7 : -14, log: 'Something lurked below. -hull' } },
      { label: 'Pass by', icon: '🚢', risk: 'safe',
        resolve: () => ({ log: 'You resist the temptation.' }) },
    ],
  },
  altar: {
    id: 'altar', label: 'Ancient Altar', icon: '🗿',
    desc: 'A mysterious structure rises from the sea.',
    threat: 0,
    choices: [
      { label: 'Offer gold', icon: '🪙', risk: 'bold',
        resolve: (rng) => ({ goldDelta: -30, upgradeToken: true, log: rng.next() < 0.9 ? 'The altar accepts your offering. Upgrade awaits!' : 'The altar crumbles. Gold lost.' }) },
      { label: 'Ignore', icon: '🚫', risk: 'safe',
        resolve: () => ({ log: 'You sail around the ancient structure.' }) },
    ],
  },
  living_fog: {
    id: 'living_fog', label: 'Living Fog', icon: '🌫',
    desc: 'The fog seems to breathe and shift.',
    threat: 2,
    choices: [
      { label: 'Flee back', icon: '↩', risk: 'safe',
        resolve: () => ({ retreat: true, log: 'You retreat to clearer waters.' }) },
      { label: 'Charge through', icon: '⚡', risk: 'bold',
        resolve: (rng, _p, armor) => rng.next() < 0.45
          ? { advance: 2, log: 'You burst through! Gained ground!' }
          : { hullDelta: armor ? -6 : -12, log: 'The fog tears at your hull.' } },
    ],
  },
  hull_debris: {
    id: 'hull_debris', label: 'Hull Debris', icon: '🪵',
    desc: 'Floating planks and rope drift past.',
    threat: 0,
    choices: [
      { label: 'Salvage', icon: '🔧', risk: 'risky',
        resolve: (rng) => rng.next() < 0.7
          ? { hullDelta: rng.int(3, 7), log: 'Useful materials! +hull repaired.' }
          : { log: 'Too waterlogged. Nothing useful.' } },
      { label: 'Sail past', icon: '⛵', risk: 'safe',
        resolve: () => ({ log: 'You leave the debris behind.' }) },
    ],
  },
  merchant_port: {
    id: 'merchant_port', label: 'Merchant Port', icon: '⚓',
    desc: 'Lanterns flicker from a friendly harbor.',
    threat: 0,
    choices: [
      { label: 'Dock', icon: '⚓', risk: 'safe',
        resolve: () => ({ showPort: true, log: 'Welcome to port, Captain!' }) },
      { label: 'Sail on', icon: '⛵', risk: 'safe',
        resolve: () => ({ log: 'No time to stop. The sea awaits.' }) },
    ],
  },
};

export const EVENT_IDS = Object.keys(EVENTS) as EventId[];

export function pickEvent(rng: Rng, depth: number, stormDistance: number): EventId {
  const weights: Partial<Record<EventId, number>> = {
    calm_sea: Math.max(2, 20 - depth * 1.5),
    wreck: 8,
    troubled_water: 7 + depth,
    chest: 7,
    strange_fog: 5 + depth,
    ghost_ship: 3 + depth * 0.5,
    current: 6,
    distant_storm: stormDistance < 5 ? 12 : 4,
    shadow: 4 + depth * 0.5,
    island: 5,
    beacon: 5,
    pirates: 8 + depth,
    map_fragment: 6,
    cry: 5,
    sharks: 5,
    buried_treasure: 4 + depth * 0.5,
    altar: 3,
    living_fog: 3 + depth * 0.5,
    hull_debris: 6,
    merchant_port: 6,
  };
  const total = Object.values(weights).reduce((s, w) => s + (w ?? 0), 0);
  let r = rng.next() * total;
  for (const [id, w] of Object.entries(weights)) {
    r -= (w ?? 0);
    if (r <= 0) return id as EventId;
  }
  return 'calm_sea';
}

export function getEventHint(id: EventId, upgrades: string[]): string | undefined {
  const event = EVENTS[id];
  if (upgrades.includes('compass') && event.threat >= 2) return '⚠ Danger detected';
  if (upgrades.includes('detector') && (id === 'buried_treasure' || id === 'chest' || id === 'merchant_port' || id === 'map_fragment')) return '✦ Riches nearby';
  if (upgrades.includes('vision')) return undefined; // vision reveals fully
  return undefined;
}
