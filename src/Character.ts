import Fighter, { SimpleFighter } from './Fighter';
import Archetype, { Mage } from './Archetypes';
import Race, { Elf } from './Races';
import Energy from './Energy';
import getRandomInt from './utils';

const randomNum = getRandomInt(1, 10);

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = randomNum;
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = randomNum;
    this._defense = randomNum;
    this._energy = {
      type_: 'mana',
      amount: randomNum,
    };
  }

  public get race(): Race {
    return this._race;
  }

  public get archetype(): Archetype {
    return this._archetype;
  }

  public get lifePoints(): number {
    return this._lifePoints;
  }

  public get strength(): number {
    return this._strength;
  }

  public get defense(): number {
    return this._defense;
  }

  public get dexterity(): number {
    return this._dexterity;
  }

  public get energy(): Energy {
    return {
      ...this._energy,
    };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this.defense;
    this._lifePoints -= damage;
    if (this._lifePoints < 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += randomNum;
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
    this._strength += randomNum;
    this._defense += randomNum;
    this._dexterity += randomNum;
    this._energy.amount = 10;
  }
}
