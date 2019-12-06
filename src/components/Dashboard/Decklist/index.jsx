import React from 'react';

import Deck from './Deck';

const Decklist = ({ decks, selectDeck, selectedDeckId, toggleCreateDeck }) => (
  <section className="decklist">
    <button
      className="btn btn-info add-deck"
      onClick={toggleCreateDeck}
    >
      + Add a Deck
    </button>
    {decks.map(deck => (
      <Deck
        key={deck.id}
        deck={deck}
        selectDeck={selectDeck}
        highlight={selectedDeckId === deck.id}
      />
    ))}
  </section>
);

export default Decklist;
