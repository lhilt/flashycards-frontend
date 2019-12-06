import React, { Component } from 'react';

import './Deck.css';

class Deck extends Component {
  render() {
    const { deck, selectDeck, highlight } = this.props;
    const highlightClass = highlight ? 'highlight' : ''
    return (
      <div className={`deck ${highlightClass}`} onClick={() => selectDeck(deck)}>
        <div className="deck-options">
          <span>edit </span>
          <span>del</span>
        </div>
        <p>{deck.name}</p>
      </div>
    );
  }
}

export default Deck;
