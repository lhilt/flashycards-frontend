import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';
import CreateCard from './Forms/CreateCard';

class Detail extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    showFront: true,
    createCard: false,
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

  toggleCreateCard = () => {
    this.setState(prevState => ({
      createCard: !prevState.createCard,
    }));
  };

  handleCardCreateSubmit = (e, newCard) => {
    e.preventDefault();
    const userPk = 1;
    const deckPk = this.props.selectedDeck.id;
    axios.post(
      `http://localhost:8000/api/v1/users/${userPk}/decks/${deckPk}/cards/new`,
      newCard
    )
      .then(res => {
        console.log(res);
        const newCard = res.data.card;
        this.setState({
          cards: this.state.cards.concat(newCard),
        })
      })
      .catch(err => console.log(err));

    this.toggleCreateCard();
    console.log('create card submit');
  };

  chooseComponentToDisplay = () => {
    const {cards, showFront, createCard, ajaxLoaded } = this.state;
    const card = cards[this.state.currentCardIndex];
    if (this.props.createDeck) {
      return <h1>Create Deck</h1>

    } else if (createCard) {
      return (
        <CreateCard
          toggleCreateCard={this.toggleCreateCard}
          handleSubmit={this.handleCardCreateSubmit}
        />
      );

    } else if (ajaxLoaded) {
      return (
        <div>
          <div className="add-card">
            <button
              className="btn btn-info"
              onClick={this.toggleCreateCard}
            >
              + Add a Card
            </button>
          </div>
          <Card text={showFront ? card.front : card.back} key={card.id} />
        </div>
      )
    } else {
      return null;
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    if (this.props.selectedDeck) {
      this.fetchCards();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDeck !== this.props.selectedDeck) {
      this.setState({
        showFront: true,
        ajaxLoaded: false,
      });
      this.fetchCards();
    }
  }

  render() {
    return (
      <div>
        {this.chooseComponentToDisplay()}
      </div>
    );
  }
}

export default Detail;
