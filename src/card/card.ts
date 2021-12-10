import { CardType, SuitColor, CardName } from './types.ts'

export class Card {
  private type: CardType;

  constructor(type: CardType) {
    this.type = type;
    this.type.value = this.type.value || this.type.name;
  }

  color(): SuitColor {
    return this.type.suit.color;
  }

  value(): number {
    return this.type.value || this.type.name;
  }

  fullName(): string {
    const cardName = CardName[this.type.name];
    return `${cardName}_of_${this.type.suit.type}`.toLowerCase();
  }

  suit(): string {
    return this.type.suit.type;
  }

  toJSON() {
    return {
      ...this.type,
      fullName: this.fullName(),
      name: CardName[this.type.name]
    };
  }

}
