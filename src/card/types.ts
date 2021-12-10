export enum SuitType {
  CLUB = 'club',
  DIAMOND = 'diamond',
  HEART = 'heart',
  SPADE = 'spade',
}

export enum CardName {
  ACE = 14,
  KING = 13,
  QUEEN = 12,
  JACK = 11,
  TEN = 10,
  NINE = 9,
  EIGHT = 8,
  SEVEN = 7,
  SIX = 6,
  FIVE = 5,
  FOUR = 4,
  THREE = 3,
  TWO = 2
}

export enum SuitColor {
  RED = 'red',
  BLACK = 'black'
}

export type Suit = {
  type: SuitType,
  color: SuitColor
}

export type CardType = {
  name: CardName,
  value?: number,
  suit: Suit
};