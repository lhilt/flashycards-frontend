import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GET, POST, PUT, DELETE } from '../../helperScripts/ajax';
import Dashboard from '../Dashboard';
import StudyMode from '../StudyMode';
import StarterPage from '../StarterPage';

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

  handleDeckCreateSubmit = (newDeck) => {
    POST(`/api/v1/decks/new`, newDeck)
      .then(res => {
        const newDeck = res.data.deck;
        this.setState({
          decks: [newDeck, ...this.state.decks],
        });
        this.props.history.push(`/dashboard/decks/${newDeck.id}`);
      })
      .catch(err => console.log(err));
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
    const deckIndex = decks.findIndex(d => d.id);

    setTimeout(1000);
    DELETE(`/api/v1/decks/${deckId}/delete`)
      .then(() => {
        this.setState({
          decks: decks.filter(x => x.id !== deck.id),
        }, () => {
          const { decks } = this.state;
          if (decks.length === 0) {
            this.props.history.push('/dashboard');
          } else {
            const newDeckId =
              deckIndex !== decks.length - 1
              ?
              decks[deckIndex + 1].id
              :
              decks[deckIndex - 1].id;
            this.props.history.push(`/dashboard/decks/${newDeckId}`);
          }
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchDecks();
  }

  render() {
    const { decks, ajaxLoaded } = this.state;

    if (!ajaxLoaded) {
      return null;
    }
    if (decks.length === 0) {
      return (
        <StarterPage
          handleDeckCreateSubmit={this.handleDeckCreateSubmit}
          currentUsername={this.props.currentUsername}
        />
      );
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
        <Redirect exact from='/study' to={`/study/decks/${deckId}`} />
        <Route path='/study/decks/:deckId'>
          <StudyMode decks={decks}/>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(DeckInfoContainer);