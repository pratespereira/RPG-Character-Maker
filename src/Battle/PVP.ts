import Battle from './Battle';
import Fighter from '../Fighter/Fighter';

export default class PVP extends Battle {
  private _fighter1 : Fighter;
  private _fighter2 : Fighter;

  constructor(fighter1 : Fighter, fighter2 : Fighter) {
    super(fighter1);
    this._fighter1 = fighter1;
    this._fighter2 = fighter2;
  }

  fight() : number {
    const fighter1 = this._fighter1;
    const fighter2 = this._fighter2;
    let fighter1LifePoints = fighter1.lifePoints;
    let fighter2LifePoints = fighter2.lifePoints;

    while (fighter1LifePoints > 0 && fighter2LifePoints > 0) {
      fighter1LifePoints -= fighter2.strength;
      fighter2LifePoints -= fighter1.strength;
    }

    return fighter1LifePoints > fighter2LifePoints ? 1 : -1;
  }
}