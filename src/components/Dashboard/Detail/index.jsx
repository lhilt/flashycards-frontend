import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

class Detail extends Component {
  state = {
    cards: [],
  };

  fetchCards = () => {
    const userId = 1;
    const deckId = this.props.selectedDeck.id;
    axios.get(`http://localhost:8000/api/v1/users/${userId}/decks/${deckId}/cards`)
      .then(res => {
        this.setState({
          cards: res.data.cards,
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (this.props.selectedDeck) {
      this.fetchCards();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDeck !== this.props.selectedDeck) {
      this.fetchCards();
    }
  }

  render() {
    const { cards } = this.state;
    return (
      <div>
        <h2>Detail Container</h2>
        {cards.map(card => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    );
  }
}

export default Detail;
