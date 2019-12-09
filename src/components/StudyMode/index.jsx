import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { GET } from '../../helperScripts/ajax';
import Card from '../Dashboard/Card';
import DeckInfo from '../Dashboard/DeckInfo';
import './StudyMode.css';

class StudyMode extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    markedWrong: [],
    showFront: true,
  };

  findSelectedDeck = () => {
    const { deckId } = this.props.match.params;
    const selected = this.props.decks.find(deck => deck.id == deckId);
    return selected;
  }

  fetchCards = () => {
    const { deckId } = this.props.match.params;
    GET(`/api/v1/decks/${deckId}/cards`)
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

  markWrong = () => {
    this.setState({
      markedWrong: this.state.markedWrong.concat(this.state.currentCardIndex),
    })
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp);
    this.fetchCards();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDeck !== this.props.selectedDeck) {
      this.setState({
        showFront: true,
        currentCardIndex: 0,
        ajaxLoaded: false,
      });
      this.fetchCards();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const { currentCardIndex, cards, showFront } = this.state;
    const card = cards[currentCardIndex];
    const selectedDeck = this.findSelectedDeck();
    return (
      <div className="study-mode">
        {card && <Card
          key={card.id}
          card={card}
          studyMode={true}
          markWrong={this.markWrong}
          index={currentCardIndex}
          totalCards={cards.length}
          side={showFront ? 'front' : 'back'}
        />}
        <DeckInfo selectedDeck={selectedDeck} />
      </div>
    );
  }
}

export default withRouter(StudyMode);
