import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Decklist from './Decklist';
import Detail from './Detail';
import './Dashboard.css';

class Dashboard extends Component {

  findSelectedDeck = () => {
    const { deckId } = this.props.match.params;
    const selected = this.props.decks.find(deck => deck.id === Number(deckId));
    return selected;
  }

  render() {
    const { decks, selectDeck } = this.props;
    const selectedDeck = this.findSelectedDeck();
    return (
      <>
      {selectedDeck && <main className="dashboard">
        <Decklist
          decks={decks}
          selectedDeckId={selectedDeck.id}
          selectDeck={selectDeck}
          handleDeckCreateSubmit={this.props.handleDeckCreateSubmit}
          handleDeckEditSubmit={this.props.handleDeckEditSubmit}
          handleDeckDeleteSubmit={this.props.handleDeckDeleteSubmit}
        />
        <Detail
          selectedDeck={selectedDeck}
        />
      </main>}
      </>
    );
  }
}

export default withRouter(Dashboard);
