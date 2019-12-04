import React, { Component } from 'react';
import axios from 'axios';

import Decklist from './Decklist';
import Detail from './Detail';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    selectedDeck: null,
    decks: [],
  };

  selectDeck = (deck) => {
    this.setState({
      selectedDeck: deck,
    });
  };

  // edit, delete deck methods

  componentDidMount() {
    const userPk = 1;
    axios.get(`http://localhost:8000/api/v1/users/${userPk}/decks`)
      .then(res => {
        console.log(res);
        this.setState({
          decks: res.data.decks,
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main className="dashboard">
        <Decklist
          decks={this.state.decks}
          selectedDeck={this.state.selectedDeck}
          selectDeck={this.selectDeck}
        />
        <Detail selectedDeck={this.state.selectedDeck} /> {/* replace w/ routes */}
      </main>
    );
  }
}

export default Dashboard;
