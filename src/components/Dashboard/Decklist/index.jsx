import React from 'react';

import Deck from './Deck';
import AddDeck from './AddDeck';
import CreateDeck from './Forms/CreateDeck';
import './Decklist.css';

const Decklist = (props) => {
  const { decks, selectDeck, selectedDeckId } = props;
  return (
  <section className="decklist">
    <AddDeck />
    {decks.length > 0 && decks.map(deck => (
      <Deck
        key={deck.id}
        deck={deck}
        selectDeck={selectDeck}
        highlight={selectedDeckId === deck.id}
        handleDeckEditSubmit={props.handleDeckEditSubmit}
        handleDeckDeleteSubmit={props.handleDeckDeleteSubmit}
      />
    ))}
    <CreateDeck handleSubmit={props.handleDeckCreateSubmit} />
  </section>
)};

export default Decklist;
