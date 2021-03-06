import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { GET, POST, PUT, DELETE } from '../../../helperScripts/ajax';
import Card from '../Card';
import CardButtonGroup from '../Card/CardButtonGroup';
import CreateCard from './Forms/CreateCard';
import EditCard from './Forms/EditCard';
import AddCardButton from './AddCard';
import LinkToStudyMode from '../../ModeLinks/LinkToStudyMode';
import DeckInfo from '../DeckInfo';
import './Detail.css';

const cardStates = {
  view: 'view',
  edit: 'edit',
  create: 'create',
};

class Detail extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    showFront: true,
    cardState: cardStates.view,
  };

  fetchCards = () => {
    const deckPk = this.props.selectedDeck.id;
    GET(`/api/v1/decks/${deckPk}/cards`)
      .then(res => {
        this.setState({
          cards: res.data.cards,
        });
      })
      .catch(err => console.log(err));
  };

  // toggle visual display
  toggleEditForm = () => {
    this.setState({
      cardState: cardStates.edit,
    });
  };

  toggleCreateForm = () => {
    this.setState({
      cardState: cardStates.create,
    })
  };

  toggleCardView = () => {
    this.setState({
      cardState: cardStates.view,
    })
  };

  // card controls
  flip = () => {
    this.setState(prevState => ({
      showFront: !prevState.showFront,
    }));
  }

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
    } else if (e.keyCode === 70) {
      this.setState(prevState => ({
        showFront: !prevState.showFront,
      }))
    }
  };

  // card CRUD
  handleCardCreateSubmit = (e, newCard) => {
    e.preventDefault();
    const deckPk = this.props.selectedDeck.id;

    POST(`/api/v1/decks/${deckPk}/cards/new`, newCard)
      .then(res => {
        const newCard = res.data.card;
        this.setState({
          cards: this.state.cards.concat(newCard),
          showFront: true,
          currentCardIndex: this.state.cards.length,
          cardState: cardStates.view,
        })
      })
      .catch(err => console.log(err));
  };

  handleCardEditSubmit = (e, updated) => {
    e.preventDefault();
    const { cards, currentCardIndex } = this.state;
    const cardPk = cards[currentCardIndex].id;

    PUT(`/api/v1/cards/${cardPk}/edit`, updated)
      .then(res => {
        const edited = res.data.card;
        const updatedCards = [...cards];
        updatedCards[currentCardIndex] = edited;
        this.setState({
          cards: updatedCards,
          showFront: true,
          cardState: cardStates.view,
        })
      })
      .catch(err => console.log(err));
  };

  handleDeleteSubmit = (card) => {
    const { cards } = this.state;
    const cardPk = card.id;

    setTimeout(1000);
    DELETE(`/api/v1/cards/${cardPk}/delete`)
      .then((res) => {
        this.setState({
          cards: cards.filter(x => x !== card),
          currentCardIndex: this.state.currentCardIndex - 1,
        });
      })
      .catch(err => console.log(err));
  };

  displayCardDeleteModal = () => {
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

  // lifecycle methods
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
        currentCardIndex: 0,
      });
      this.fetchCards();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const { cards, currentCardIndex, showFront } = this.state;
    const card = cards[currentCardIndex];
    const { selectedDeck } = this.props;

    let view;
    switch (this.state.cardState) {
      case 'view':
        view = (
          <div className="detail">
            <div className="detail-btn-group">
              <AddCardButton toggleCreateForm={this.toggleCreateForm}/>
              <LinkToStudyMode deckId={selectedDeck.id} />
            </div>
            {cards.length > 0 &&
              <>
              <Card
                key={card.id}
                card={card}
                index={currentCardIndex}
                totalCards={cards.length}
                side={showFront ? 'front' : 'back'}
                toggleEditForm={this.toggleEditForm}
              />
              <CardButtonGroup
                next={this.next}
                prev={this.prev}
                flip={this.flip}
              />
              </>
            }
            {this.displayCardDeleteModal()}
          </div>
        );
        break;
      case 'edit':
        view = (
          <EditCard
            card={card}
            handleSubmit={this.handleCardEditSubmit}
            toggleCardView={this.toggleCardView}
          />
        );
        break;
      case 'create':
        view = (
          <CreateCard
            handleSubmit={this.handleCardCreateSubmit}
            toggleCardView={this.toggleCardView}
          />
        );
        break;
      default:
        view = null;
    }

    return (
      <div className="detail">
        {view}
        {selectedDeck &&
          <DeckInfo selectedDeck={selectedDeck} />
        }
      </div>
    );
  }
}

export default withRouter(Detail);
