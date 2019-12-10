import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EditDeck from '../Forms/EditDeck';
import DeleteDeck from '../Forms/DeleteDeck';
import './Deck.css';

class Deck extends Component {
  state = {
    editModal: false,
    deleteModal: false,
  }

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
          <div className="deck-options-link" data-toggle="modal" data-target={`#editDeck${deck.id}`}>edit</div>
          <div className="deck-options-link" data-toggle="modal" data-target={`#deleteDeck${deck.id}`}>del</div>
        </div>
        <EditDeck deck={deck} handleSubmit={this.props.handleDeckEditSubmit} />
        <DeleteDeck deck={deck} handleSubmit={this.props.handleDeckDeleteSubmit} />
        <p className="deck-name">{deck.name}</p>
      </div>
    );
  }
}

export default withRouter(Deck);
