import React from 'react';

import Deck from './Deck';

const Decklist = ({ decks, selectDeck }) => (
  <section className="decklist">
    <h2>I'm a deck list</h2>
    {decks.map(deck => (
      <Deck
        key={deck.id}
        deck={deck}
        selectDeck={selectDeck}
      />
    ))}
  </section>
);

export default Decklist;
