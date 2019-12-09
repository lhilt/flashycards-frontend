import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Deck.css';

class Deck extends Component {
  onClick = () => {
    const { deck, selectDeck } = this.props;
    selectDeck(deck)
    this.props.history.push(`/dashboard/decks/${deck.id}`);
  }

  render() {
    const { deck, highlight } = this.props;
    const highlightClass = highlight ? 'highlight' : ''
    return (
      <div className={`deck ${highlightClass}`} onClick={this.onClick}>
        <div className="deck-options">
          <Link to="/dashboard/deck/edit" className="deck-options-link">edit</Link>
          <div className="deck-options-link" data-toggle="modal" data-target="#deleteDeckmodal">del</div>
        </div>
        <p className="deck-name">{deck.name}</p>
      </div>
    );
  }
}

export default withRouter(Deck);
