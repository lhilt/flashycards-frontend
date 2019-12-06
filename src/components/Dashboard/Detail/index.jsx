import React, { Component } from 'react';

import { GET, POST, PUT, DELETE } from '../../../helperScripts/ajax';
import Card from './Card';
import CreateCard from './Forms/CreateCard';
import EditCard from './Forms/EditCard';
import CreateDeck from '../Decklist/Forms/CreateDeck';

class Detail extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    showFront: true,
    createCard: false,
    editCard: false,
    ajaxLoaded: false,
  };

  fetchCards = () => {
    const userPk = 1;
    const deckPk = this.props.selectedDeck.id;
    GET(`/api/v1/users/${userPk}/decks/${deckPk}/cards`)
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
      0
      :
      currentCardIndex + 1;

    this.setState({
      currentCardIndex: nextIndex,
      showFront: true,
    });
  };

  prev = () => {
    const { cards, currentCardIndex } = this.state;
    let prevIndex =
      currentCardIndex - 1 >= 0
      ?
      currentCardIndex - 1
      :
      cards.length - 1;

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

    POST(`/api/v1/users/${userPk}/decks/${deckPk}/cards/new`, newCard)
      .then(res => {
        const newCard = res.data.card;
        this.setState({
          cards: this.state.cards.concat(newCard),
        })
      })
      .catch(err => console.log(err));

    this.toggleCreateCard();
  };

  toggleEditCard = () => {
    this.setState(prevState => ({
      editCard: !prevState.editCard,
    }));
  };

  handleCardEditSubmit = (e, updated) => {
    e.preventDefault();
    const { cards, currentCardIndex } = this.state;

    const userPk = 1;
    const deckPk = this.props.selectedDeck.id;
    const cardPk = cards[currentCardIndex].id;

    PUT(`/api/v1/users/${userPk}/decks/${deckPk}/cards/${cardPk}/edit`, updated)
      .then(res => {
        const edited = res.data.card;
        const updatedCards = [...cards];
        updatedCards[currentCardIndex] = edited;
        this.setState({
          cards: updatedCards,
        })
      })
      .catch(err => console.log(err));

    this.toggleEditCard();
  };

  handleDeleteSubmit = (card) => {
    const { cards } = this.state;

    const userPk = 1;
    const deckPk = this.props.selectedDeck.id;
    const cardPk = card.id;

    setTimeout(1000);
    DELETE(`/api/v1/users/${userPk}/decks/${deckPk}/cards/${cardPk}/delete`)
      .then((res) => {
        this.setState({
          cards: cards.filter(x => x !== card),
        });
      })
      .catch(err => console.log(err));
  };

  displayDeleteModal = () => {
    const card = this.state.cards[this.state.currentCardIndex];
    return (
      <div className="modal fade" id="deletemodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Confirm Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              This will permanently delete this card
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-info" data-dismiss="modal" onClick={()=>this.handleDeleteSubmit(card)}>Delete Forever</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  chooseComponentToDisplay = () => {
    const {cards, showFront, ajaxLoaded } = this.state;
    const { createCard, editCard } = this.state;
    const { createDeck } = this.props;
    const card = cards[this.state.currentCardIndex];
    if (createCard) {
      return (
        <CreateCard
          toggleCreateCard={this.toggleCreateCard}
          handleSubmit={this.handleCardCreateSubmit}
        />
      );
    } else if (editCard) {
      return (
        <EditCard
          toggleEditCard={this.toggleEditCard}
          handleSubmit={this.handleCardEditSubmit}
          card={card}
        />
      );
    } else if (createDeck) {
      return (
        <CreateDeck
          toggleCreateDeck={this.props.toggleCreateDeck}
          handleSubmit={this.props.handleDeckCreateSubmit}
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
          {cards.length > 0 &&
            <Card
              key={card.id}
              text={showFront ? card.front : card.back}
              toggleEditCard={this.toggleEditCard}
            />}
          {this.displayDeleteModal()}
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
