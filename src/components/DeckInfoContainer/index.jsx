import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GET, POST, PUT, DELETE } from '../../helperScripts/ajax';
import Dashboard from '../Dashboard';
import StudyMode from '../StudyMode';

class DeckInfoContainer extends Component {
  state = {
    selectedDeck: null,
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
    const deckId = decks[0].id

    return (
      <Switch>
        <Redirect exact from='/' to={`/dashboard/decks/${deckId}`} />
        <Redirect exact from='/dashboard' to={`/dashboard/decks/${deckId}`} />
        <Route path='/dashboard/decks/:deckId'>
          <Dashboard
            decks={decks}
            selectDeck={this.selectDeck}
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