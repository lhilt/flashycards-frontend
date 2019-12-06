import React, { Component } from 'react';

import { GET, POST } from '../../helperScripts/ajax';
import Decklist from './Decklist';
import Detail from './Detail';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    selectedDeck: null,
    createDeck: false,
    decks: [],
  };

  fetchDecks = () => {
    GET(`/api/v1/decks`)
    .then(res => {
      this.setState({
        decks: res.data.decks,
      })
    })
    .catch(err => console.log(err));
  };

  selectDeck = (deck) => {
    this.setState({
      selectedDeck: deck,
    });
  };

  toggleCreateDeck = () => {
    this.setState(prevState => ({
      createDeck: !prevState.createDeck,
    }));
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

    this.toggleCreateDeck();
  };

  componentDidMount() {
    this.fetchDecks();
  }

  render() {
    return (
      <main className="dashboard">
        <Decklist
          decks={this.state.decks}
          selectedDeck={this.state.selectedDeck}
          selectDeck={this.selectDeck}
          toggleCreateDeck={this.toggleCreateDeck}
        />
        <Detail
          selectedDeck={this.state.selectedDeck}
          createDeck={this.state.createDeck}
          handleDeckCreateSubmit={this.handleDeckCreateSubmit}
        />
      </main>
    );
  }
}

export default Dashboard;
