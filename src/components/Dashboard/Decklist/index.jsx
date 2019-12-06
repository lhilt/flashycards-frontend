import React from 'react';

import Deck from './Deck';

const Decklist = ({ decks, selectDeck, toggleCreateDeck }) => (
  <section className="decklist">
    <div className="add-deck">
            <button
              className="btn btn-info"
              onClick={toggleCreateDeck}
            >
              + Add a Deck
            </button>
          </div>
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
