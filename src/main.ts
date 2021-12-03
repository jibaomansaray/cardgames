import CardClass from './card/card.ts'

const a = new CardClass({
  suit: 'Club',
  value: 1,
  color: 'black'
});

const two = new CardClass({
  suit: 'Club',
  value: 2,
  color: 'black'
});

console.table([a.toJSON(), two.toJSON()]);
