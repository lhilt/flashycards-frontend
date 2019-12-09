import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GET, POST, PUT, DELETE } from '../../helperScripts/ajax';
import Dashboard from '../Dashboard';
import StudyMode from '../StudyMode';

class DeckInfoContainer extends Component {
  state = {
    decks: [],
    ajaxLoaded: false,
  };

  fetchDecks = () => {
    GET(`/api/v1/decks`)
    .then(res => {
      this.setState({
        decks: res.data.decks,
        ajaxLoaded: true,
      })
    })
    .catch(err => console.log(err));
  };

  selectDeck = (deck) => {
    this.setState({
      selectedDeck: deck,
    });
  };

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

  handleDeckEditSubmit = (edited) => {
    const { decks } = this.state;

    const deckId = edited.id;
    PUT(`/api/v1/decks/${deckId}/edit`, edited)
      .then(res => {
        const updated = res.data.deck;
        const updatedDecks = decks.map((deck, i) => {
          if (i === decks.findIndex(x => x.id === deckId)) {
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
  };

  handleDeckDeleteSubmit = (deck) => {
    const { decks } = this.state;
    const deckId = deck.id;
    const newDeckId = decks.findIndex(d => d.id === deck.id) + 1;

    setTimeout(1000);
    DELETE(`/api/v1/decks/${deckId}/delete`)
      .then(() => {
        this.setState(prevState => ({
          decks: decks.filter(x => x !== deck),
        }));
        this.props.history.push(`/dashboard/decks/${newDeckId}`)
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchDecks();
  }

  render() {
    const { selectedDeck, decks, ajaxLoaded } = this.state;

    if (!ajaxLoaded) {
      return null;
    }
    if (decks.length === 0) {
      return null;
    }
    const deckId = decks[0].id;

    return (
      <Switch>
        <Redirect exact from='/' to={`/dashboard/decks/${deckId}`} />
        <Redirect exact from='/dashboard' to={`/dashboard/decks/${deckId}`} />
        <Route path='/dashboard/decks/:deckId'>
          <Dashboard
            decks={decks}
            selectDeck={this.selectDeck}
            handleDeckCreateSubmit={this.handleDeckCreateSubmit}
            handleDeckEditSubmit={this.handleDeckEditSubmit}
            handleDeckDeleteSubmit={this.handleDeckDeleteSubmit}
          />
        </Route>
        <Route path='/study'>
          <StudyMode
            selectedDeck={selectedDeck}
          />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(DeckInfoContainer);