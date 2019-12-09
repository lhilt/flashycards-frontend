import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import Deck from './Deck';
import './Decklist.css';

const Decklist = (props) => {
  const { decks, selectDeck, selectedDeckId } = props;
  // const { url, path } = useRouteMatch();
  return (
  <section className="decklist">
    <Link
      to="/dashboard/decks/create"
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
        handleDeckCreateSubmit={props.handleDeckCreateSubmit}
        handleDeckEditSubmit={props.handleDeckEditSubmit}
      />
    ))}
  </section>
)};

export default Decklist;
