import React from 'react';

import Deck from './Deck';

const Decklist = ({ decks, selectDeck }) => (
  <section className="decklist">
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
