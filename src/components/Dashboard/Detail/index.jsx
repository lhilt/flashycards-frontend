import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import { GET, POST, PUT, DELETE } from '../../../helperScripts/ajax';
import Card from '../Card';
import CreateCard from './Forms/CreateCard';
import EditCard from './Forms/EditCard';
import AddCardButton from './AddCard';
import DeckInfo from '../DeckInfo';
import CreateDeck from '../Decklist/Forms/CreateDeck';
import EditDeck from '../Decklist/Forms/EditDeck';
import './Detail.css';

class Detail extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    showFront: true,
    // ajaxLoaded: false,
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
        })
      })
      .catch(err => console.log(err));

      this.props.history.goBack();
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
        })
      })
      .catch(err => console.log(err));

    this.props.history.goBack();
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

  render() {
    const { cards, currentCardIndex, showFront } = this.state;
    const card = cards[currentCardIndex];
    const { selectedDeck } = this.props;
    const path = this.props.match.path;
    const url = this.props.match.url;

    return (
      <div className="detail">
        <Switch>
          <Route path={`${path}/cards/create`}>
            <CreateCard
              handleSubmit={this.handleCardCreateSubmit}
            />
          </Route>
          <Route path={`${path}/card/edit`}>
            <EditCard
              handleSubmit={this.handleCardEditSubmit}
              card={card}
            />
          </Route>
          <Route path={`/dashboard/decks/create`}>
            <CreateDeck
              handleSubmit={this.props.handleDeckCreateSubmit}
            />
          </Route>
          <Route path={`${path}/deck/edit`}>
            <EditDeck
              handleSubmit={this.props.handleDeckEditSubmit}
              deck={selectedDeck}
            />
          </Route>
          <Route exact path=''>
            <div>
              <AddCardButton />
              {cards.length > 0 &&
                <>
                <Card
                  key={card.id}
                  card={card}
                  index={currentCardIndex}
                  totalCards={cards.length}
                  side={showFront ? 'front' : 'back'}
                />
                <div className="card-btn-group">
                  <span onClick={this.prev}>&lsaquo;</span>
                  <span onClick={this.flip}>flip</span>
                  <span onClick={this.next}>&rsaquo;</span>
                </div>
                </>
              }
              {this.displayCardDeleteModal()}
            </div>
          </Route>
        </Switch>
        {selectedDeck &&
          <DeckInfo selectedDeck={selectedDeck} />
        }
      </div>
    );
  }
}

export default withRouter(Detail);
