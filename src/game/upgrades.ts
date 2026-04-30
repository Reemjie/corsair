import type { UpgradeId } from '../types/game';

export interface Upgrade {
  id: UpgradeId;
  name: string;
  desc: string;
  cost: number;
  icon: string;
  build: 'vision' | 'gold' | 'combat' | 'chaos';
}

export const ALL_UPGRADES: Upgrade[] = [
  { id: 'vision',   name: "Crow's Nest",    desc: 'See the type of all 3 choices',        cost: 60,  icon: '🔭', build: 'vision'  },
  { id: 'compass',  name: 'Dark Compass',   desc: 'Warns you of danger ahead',             cost: 50,  icon: '🧭', build: 'vision'  },
  { id: 'detector', name: 'Gold Detector',  desc: 'Reveals nearby treasure & ports',       cost: 55,  icon: '🧲', build: 'gold'    },
  { id: 'power',    name: 'Heavy Cannons',  desc: '+4 power — defeat pirates unharmed',    cost: 80,  icon: '💥', build: 'combat'  },
  { id: 'armor',    name: 'Iron Hull',      desc: '-3 to all hull damage',                 cost: 90,  icon: '🛡', build: 'combat'  },
  { id: 'escape',   name: 'Swift Sails',    desc: 'Skip any 1 dangerous event per run',   cost: 70,  icon: '⛵', build: 'vision'  },
];
