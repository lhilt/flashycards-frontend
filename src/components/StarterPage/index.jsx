import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AddDeck from '../Dashboard/Decklist/AddDeck';
import CreateDeck from '../Dashboard/Decklist/Forms/CreateDeck';
import './StarterPage.css';

class StarterPage extends Component {

  render () {
    return (
      <>
      <div className="starter-page">
        <h1 className="starter-welcome">Welcome, {this.props.currentUsername}!</h1>
        <h2 className="starter-prompt">Make your first deck to get started</h2>
        <AddDeck />
      </div>
      <CreateDeck handleSubmit={this.props.handleDeckCreateSubmit} />
      </>
    );
  }
}

export default withRouter(StarterPage);