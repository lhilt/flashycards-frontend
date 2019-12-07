import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Deck.css';

class Deck extends Component {
  render() {
    const { deck, selectDeck, highlight } = this.props;
    const highlightClass = highlight ? 'highlight' : ''
    return (
      <div className={`deck ${highlightClass}`} onClick={() => selectDeck(deck)}>
        <div className="deck-options">
          <Link to="/dashboard/deck/edit" className="deck-options-link">edit</Link>
          <div className="deck-options-link" data-toggle="modal" data-target="#deleteDeckmodal">del</div>
        </div>
        <p>{deck.name}</p>
      </div>
    );
  }
}

export default Deck;
