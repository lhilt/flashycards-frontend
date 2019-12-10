import React from 'react';

import Deck from './Deck';
import CreateDeck from './Forms/CreateDeck';
import './Decklist.css';

const Decklist = (props) => {
  const { decks, selectDeck, selectedDeckId } = props;
  return (
  <section className="decklist">
    <div
      className="btn btn-info add-deck"
      data-toggle="modal"
      data-target="#createDeck"
    >
      + Add a Deck
    </div>
    {decks.map(deck => (
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
