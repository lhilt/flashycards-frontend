import React, { Component } from 'react';

import './Deck.css';

class Deck extends Component {
  render() {
    const { deck, selectDeck } = this.props;
    return (
      <div className="deck" onClick={() => selectDeck(deck)}>
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
