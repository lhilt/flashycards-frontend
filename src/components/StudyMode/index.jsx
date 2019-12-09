import React, { Component } from 'react';

import { GET } from '../../helperScripts/ajax';
import Card from '../Dashboard/Card';
import DeckInfo from '../Dashboard/DeckInfo';

class StudyMode extends Component {
  state = {
    cards: [],
    currentCardIndex: 0,
    markedWrong: [],
    showFront: true,
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

  markWrong = () => {
    this.setState({
      markedWrong: this.state.markedWrong.concat(this.state.currentCardIndex),
    })
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp);
    if (this.props.selectedDeck) {
      this.fetchCards();
    }
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

  render() {
    const { currentCardIndex, cards, showFront } = this.state;
    const card = cards[currentCardIndex];
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
        <DeckInfo selectedDeck={this.props.selectedDeck} />
      </div>
    );
  }
}

export default StudyMode;
