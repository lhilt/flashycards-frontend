import React from 'react';
import { Link } from 'react-router-dom';

import Deck from './Deck';
import './Decklist.css';

const Decklist = (props) => {
  const { decks, selectDeck, selectedDeckId } = props;
  return (
  <section className="decklist">
    <Link
      to="/dashboard/deck/create"
      className="btn btn-info add-deck"
    >
      + Add a Deck
    </Link>
    {decks.map(deck => (
      <Deck
        key={deck.id}
        deck={deck}
        selectDeck={selectDeck}
        highlight={selectedDeckId === deck.id}
      />
    ))}
  </section>
)};

export default Decklist;
