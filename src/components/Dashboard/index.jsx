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

  displayDeckDeleteModal = () => {
    const deck = this.findSelectedDeck();
    return (
      <div className="modal fade" id="deleteDeckmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Confirm Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              This will permanently delete this deck AND ALL CARDS
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-info" data-dismiss="modal" onClick={()=>this.handleDeleteSubmit(deck)}>Delete Forever</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        />
        <Detail
          selectedDeck={selectedDeck}
          deckIndex={decks.findIndex(d => d.id === selectedDeck.id)}
        />
        {this.displayDeckDeleteModal()}
      </main>
    );
  }
}

export default withRouter(Dashboard);
