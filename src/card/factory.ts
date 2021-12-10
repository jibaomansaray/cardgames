import { Suit, SuitType, SuitColor, CardName, CardType, Card } from './index.ts'

type SuitReturnType = { suit: Suit, members: Array<Card> }

const cardNames = [
  CardName.ACE,
  CardName.KING,
  CardName.QUEEN,
  CardName.JACK,
  CardName.TEN,
  CardName.NINE,
  CardName.EIGHT,
  CardName.SEVEN,
  CardName.SIX,
  CardName.FIVE,
  CardName.FOUR,
  CardName.THREE,
  CardName.TWO,
];

const createSuite = (type: SuitType, withMembers = false, shuffle = false): SuitReturnType => {
  const suit: Suit = {
    type,
    color: (type == SuitType.CLUB || type == SuitType.SPADE) ? SuitColor.BLACK : SuitColor.RED
  };
  let members: Array<Card> = []
  if (withMembers) {
    cardNames.forEach((value) => {
      const type: CardType = {
        name: value,
        value: value as number,
        suit
      }
        members.push(new Card(type));
    });

    if (shuffle) {
      const temp: Array<Card> = Array.from(members);
      members = [];
      const selected: Array<number> = [];
      do {
        const position = Math.floor(Math.random() * temp.length);
        if (selected.indexOf(position) == -1) {
          members.push(temp[position]);
          selected.push(position);
          if (selected.length == temp.length) {
            break;
          }
        }
      } while(true)
    }
  }

  return {
    suit,
    members
  }
}

/**
 * Creates a Suit instance of type club
 * 
 * @param {Boolean} withMembers 
 * @param {Boolean} shuffle
 * 
 * @returns {SuitReturnType}
 */
export const createClubSuit = (withMembers = true, shuffle = false): SuitReturnType => {
  return createSuite(SuitType.CLUB, withMembers, shuffle);
}

/**
 * Creates a Suit instance of type spade 
 * 
 * @param {Boolean} withMembers 
 * @param {Boolean} shuffle
 * 
 * @returns {SuitReturnType}
 */
export const createSpadeSuit = (withMembers = true, shuffle = false): SuitReturnType => {
  return createSuite(SuitType.SPADE, withMembers, shuffle);
}

/**
 * Creates a Suit instance of type heart
 * 
 * @param {Boolean} withMembers 
 * @param {Boolean} shuffle
 * 
 * @returns {SuitReturnType}
 */
export const createHeartSuit = (withMembers = true, shuffle = false): SuitReturnType => {
  return createSuite(SuitType.HEART, withMembers, shuffle);
}

/**
 * Creates a Suit instance of type diamond 
 * 
 * @param {Boolean} withMembers 
 * @param {Boolean} shuffle
 * 
 * @returns {SuitReturnType}
 */
export const createDiamondSuit = (withMembers = true, shuffle = false): SuitReturnType => {
  return createSuite(SuitType.DIAMOND, withMembers, shuffle);
}

/**
 * create a new card deck
 * 
 * @param {Boolean} shuffle
 * 
 * @returns {Array<SuitReturnType>}
 */
export const createDeck = (shuffle = false): Array<SuitReturnType> => {
  const withMembers = true;
  let suits: Array<SuitReturnType> = [
    createClubSuit(withMembers, shuffle),
    createSpadeSuit(withMembers, shuffle),
    createDiamondSuit(withMembers, shuffle),
    createHeartSuit(withMembers, shuffle)
  ];

  if (shuffle) {
    const selected: Array<number> = [];
    const temp: Array<SuitReturnType> = Array.from(suits);
    suits = [];

    do {
      const index = Math.floor(Math.random() * temp.length);
      if (selected.indexOf(index) == -1) {
        suits.push(temp[index]);
        selected.push(index);
        if (selected.length == temp.length) {
          break;
        }
      }
    } while (true); 
  } 
  return suits;

}

