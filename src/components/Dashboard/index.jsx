import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { GET, POST, PUT, DELETE } from '../../helperScripts/ajax';
import Decklist from './Decklist';
import Detail from './Detail';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    selectedDeck: null,
    decks: [],
  };

  fetchDecks = () => {
    GET(`/api/v1/decks`)
    .then(res => {
      this.setState({
        decks: res.data.decks,
        selectedDeck: res.data.decks[0]
      })
    })
    .catch(err => console.log(err));
  };

  selectDeck = (deck) => {
    this.setState({
      selectedDeck: deck,
    });
  };

  // edit, delete, create deck methods
  handleDeckCreateSubmit = (e, newDeck) => {
    e.preventDefault();
    POST(`/api/v1/decks/new`, newDeck)
      .then(res => {
        const newDeck = res.data.deck;
        this.setState({
          decks: [newDeck, ...this.state.decks],
        })
      })
      .catch(err => console.log(err));

      this.props.history.goBack();
  };

  handleDeckEditSubmit = (e, edited) => {
    e.preventDefault();
    const { decks, selectedDeck } = this.state;

    const deckPk = selectedDeck.id;
    PUT(`/api/v1/decks/${deckPk}/edit`, edited)
      .then(res => {
        const updated = res.data.deck;
        const updatedDecks = decks.map((deck, i) => {
          if (i === decks.findIndex(x => x.id === selectedDeck.id)) {
            return updated;
          } else {
            return deck;
          }
        });
        this.setState({
          decks: updatedDecks,
        })
      })
      .catch(err => console.log(err));

    this.props.history.goBack();
  };

  handleDeleteSubmit = (deck) => {
    const { decks } = this.state;
    const deckPk = deck.id;

    setTimeout(1000);
    DELETE(`/api/v1/decks/${deckPk}/delete`)
      .then((res) => {
        this.setState(prevState => ({
          decks: decks.filter(x => x !== deck),
          selectedDeck: prevState.decks[
            prevState.decks.findIndex(d => d.id === deck.id) + 1
          ],
        }));
      })
      .catch(err => console.log(err));
  };

  displayDeckDeleteModal = () => {
    const deck = this.state.selectedDeck;
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

  componentDidMount() {
    this.fetchDecks();
  }

  render() {
    const { selectedDeck } = this.state;
    return (
      <main className="dashboard">
        <Decklist
          decks={this.state.decks}
          selectedDeckId={selectedDeck && selectedDeck.id}
          selectDeck={this.selectDeck}
        />
        <Detail
          selectedDeck={selectedDeck}
          createDeck={this.state.createDeck}
          handleDeckCreateSubmit={this.handleDeckCreateSubmit}
          editDeck={this.state.editDeck}
          handleDeckEditSubmit={this.handleDeckEditSubmit}
        />
        {this.displayDeckDeleteModal()}
      </main>
    );
  }
}

export default withRouter(Dashboard);
