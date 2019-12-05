import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

class Detail extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    showFront: true,
    ajaxLoaded: false,
  };

  fetchCards = () => {
    const userId = 1;
    const deckId = this.props.selectedDeck.id;
    axios.get(`http://localhost:8000/api/v1/users/${userId}/decks/${deckId}/cards`)
      .then(res => {
        this.setState({
          cards: res.data.cards,
          ajaxLoaded: true,
        });
      })
      .catch(err => console.log(err));
  };

  next = () => {
    const { cards, currentCardIndex } = this.state;
    const nextIndex =
      currentCardIndex === cards.length - 1
      ?
      currentCardIndex
      :
      currentCardIndex + 1;

    this.setState({
      currentCardIndex: nextIndex,
      showFront: true,
    });
  };

  prev = () => {
    const { currentCardIndex } = this.state;
    let prevIndex =
      currentCardIndex - 1 >= 0
      ?
      currentCardIndex - 1
      :
      currentCardIndex;

    this.setState({
      currentCardIndex: prevIndex,
      showFront: true,
    });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 37) {
      this.prev();
    } else if (e.keyCode === 39) {
      this.next();
    } else if (e.keyCode === 32) {
      this.setState(prevState => ({
        showFront: !prevState.showFront,
      }))
    }
  };

  display = () => {

  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    if (this.props.selectedDeck) {
      this.fetchCards();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDeck !== this.props.selectedDeck) {
      this.fetchCards();
      this.setState({
        showFront: true,
      });
    }
  }

  render() {
    const { cards, currentCardIndex, showFront, ajaxLoaded } = this.state;
    const card = cards[currentCardIndex];
    return (
      <div>
        {ajaxLoaded &&
          <Card text={showFront ? card.front : card.back} key={card.id} />}
      </div>
    );
  }
}

export default Detail;
