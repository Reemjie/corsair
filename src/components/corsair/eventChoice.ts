import type { EventChoice } from '../../types/game';

/** Cout d'or explicite dans une description de choix (pas un gain « +20-60 gold »). */
export function goldCostFromDesc(desc: string): number {
  const m = desc.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
  return m ? parseInt(m[1] ?? m[2]) : 0;
}

export function canAffordChoice(desc: string, gold: number): boolean {
  const cost = goldCostFromDesc(desc);
  return cost === 0 || gold >= cost;
}

/** Texte affiché pour un choix — Pact Kraken tient compte de Heart of the Storm. */
export function choiceDescription(
  ch: EventChoice,
  cellType: string,
  relics: string[] | undefined,
  hull: number,
): string {
  if (ch.label === 'Pact' && cellType === 'kraken') {
    const heart = (relics ?? []).includes('storm_heart');
    const dmg = Math.min(heart ? 10 : 20, hull - 1);
    return `-${dmg} HP, storm +6 turns. Hunter awakens!${heart ? ' (Heart of the Storm)' : ''}`;
  }
  return ch.desc;
}

export function riskColor(risk: string): string {
  return risk === 'safe' ? '#44cc88' : risk === 'risky' ? '#eedd44' : '#ee6644';
}
