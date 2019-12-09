import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Decklist from './Decklist';
import Detail from './Detail';
import './Dashboard.css';

class Dashboard extends Component {

  findSelectedDeck = () => {
    const { deckId } = this.props.match.params;
    const selected = this.props.decks.find(deck => deck.id == deckId);
    return selected;
  }

  render() {
    const { decks, selectDeck } = this.props;
    const { path } = this.props.match;
    const selectedDeck = this.findSelectedDeck();
    return (
      <main className="dashboard">
        <Decklist
          decks={decks}
          selectedDeckId={selectedDeck && selectedDeck.id}
          selectDeck={selectDeck}
          handleDeckCreateSubmit={this.props.handleDeckCreateSubmit}
          handleDeckEditSubmit={this.props.handleDeckEditSubmit}
          handleDeckDeleteSubmit={this.props.handleDeckDeleteSubmit}
        />
        <Detail
          selectedDeck={selectedDeck}
          deckIndex={decks.findIndex(d => d.id === selectedDeck.id)}
        />
      </main>
    );
  }
}

export default withRouter(Dashboard);
