export type CardType = {
  color: string,
  value: number,
  suit: string
};

export default class Card {
  private type: CardType;

  constructor(type: CardType) {
    this.type = type;
  }

  color(): string {
    return this.type.color;
  }

  value(): number {
    return this.type.value;
  }

  name(): string {
    return `${this.type.value}_of_${this.type.suit}`.toLowerCase();
  }

  suit(): string {
    return this.type.suit;
  }

  toJSON() {
    return {
      ...this.type
    };
  }

}
