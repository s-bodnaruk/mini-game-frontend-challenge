export interface IScore {
  player: number;
  computer: number;
}

export enum Unit {
  CAVALRY = 'Cavalry',
  ARCHERS = 'Archers',
  PIKEMEN = 'Pikemen',
}

export interface IFightCondition {
  Cavalry: Unit;
  Archers: Unit;
  Pikemen: Unit;
}

export type Winner = 'Player' | 'Computer' | 'Draw';
