import { Card, createDeck } from '../../card/index.ts'
type Player = {
  name: string,
  ai: boolean,
  hand: Array<Card>,
  hashPlayed: Array<number>
}

const deck = createDeck(true);
const dealt: Array<number> = [];

const dealHand = (): Array<Card> => {
  const hand: Array<Card> = [];
  for (let count = 0; count < 4; count++) {
    do {
      const suiteIndex = Math.floor(Math.random() * 4);
      const suite = deck[suiteIndex];
      const cardIndex = Math.floor(Math.random() * suite.members.length);
      if (dealt.indexOf(cardIndex) == -1) {
        dealt.push(cardIndex);
        hand.push(suite.members[cardIndex]);
        break;
      }
    } while (true);
  }

  return hand;
}

const filterActiveCard = (player: Player): Array<Card> => {
  const temp: Array<Card> = [];
  player.hand.forEach((card, index) => {
    if (player.hashPlayed.indexOf(index) == -1)
      temp.push(card)
  })
  return temp;
}

const playForAi = (player: Player): Card => {
  let card: Card;
  do {
    const pos = Math.floor(Math.random() * player.hand.length);
    if (player.hashPlayed.indexOf(pos) == -1) {
      player.hashPlayed.push(pos);
      card = player.hand[pos];
      break;
    }
  } while (true)

  return card;
}

const promptPlayer = (player: Player): Card => {
  let card: Card;
  const allowCard = filterActiveCard(player);
  do {
    console.table(allowCard.map((card) => { return card.toJSON();}));
    const pos = prompt('Select the card index to play');
    if (pos && allowCard[parseInt(pos, 10)]) {
      card = allowCard[parseInt(pos, 10)];
      break;
    }
  } while (true);
  return card;
}

const showTable = (players: Array<Player>,table: { [key: number]: Card }): void => {
  const temp: { [key: string]: string } = {};
  for (const aPlayerIndex in table) {
    temp[players[aPlayerIndex].name] = table[aPlayerIndex].fullName();
  }

  console.table(temp);
}

export const play = (): void => {
  console.log("--------------------\r");
  console.log("Welcome to test came\r");
  console.log("--------------------\n");

  // ask for number of players
  let playerCount: string | null = '2';
  do {
    playerCount = prompt("How many players?", '2');
    if (playerCount && !isNaN(parseInt(playerCount, 10))) {
      break;
    }
  } while (true);

  const players: Array<Player> = [];

  playerCount = playerCount || '2';
  for (let count = 1; count <= parseInt(playerCount, 10); count++) {
    const name = prompt(`Player ${count} name`, `player ${count}`);
    const ai = prompt(`Player is ai`, (count == 1) ? 'y' : 'n');

    players.push({
      name: name || `player ${count}`,
      ai: (ai == 'y') ? true : false,
      hand: dealHand(),
      hashPlayed: []
    });
  }

  let toStart = 0;
  const roundWinners: Array<number> = [];
  for (let round = 0; round < 4; round++) {
    const played: {[key: number]: Card} = {};
    if (players[toStart].ai) {
      played[toStart] = playForAi(players[toStart]);
    } else {
      played[toStart] = promptPlayer(players[toStart]);
    }

    showTable(players, played);
    players.forEach((aPlayer, index) => {
      if (index != toStart) {
        if (aPlayer.ai) {
          played[index] = playForAi(aPlayer);
        } else {
          played[index] = promptPlayer(aPlayer);
        }
        showTable(players, played);
      }
    });

    let winner = played[toStart];
    let winnerIndex = toStart;
    for(const playerIndex in played) {
      if (parseInt(playerIndex, 10) != toStart) {
        if (winner.suit.name == played[playerIndex].suit.name && winner.value < played[playerIndex].value) {
          winner = played[playerIndex];
          winnerIndex = parseInt(playerIndex, 10);
        }
      } 
    }

    toStart = winnerIndex;

    roundWinners.push(toStart + 1);
  }
  console.table(roundWinners);
}