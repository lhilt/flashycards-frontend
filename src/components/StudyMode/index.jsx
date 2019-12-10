import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { GET } from '../../helperScripts/ajax';
import Card from '../Dashboard/Card';
import CardButtonGroup from '../Dashboard/Card/CardButtonGroup';
import DeckInfo from '../Dashboard/DeckInfo';
import LinkToDashboard from '../ModeLinks/LinkToDashboard';
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
    const selected = this.props.decks.find(deck => deck.id === Number(deckId));
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

  markRight = () => {
    const { markedWrong, currentCardIndex } = this.state;
    if (markedWrong.includes(currentCardIndex)) {
      const index = markedWrong.findIndex(x => x === currentCardIndex);
      const updatedWrongs = [...markedWrong];
      updatedWrongs.splice(index, 1);

      this.setState({
        markedWrong: updatedWrongs,
      });
    }
  }

  markWrong = () => {
    const { markedWrong, currentCardIndex } = this.state;
    if (!markedWrong.includes(currentCardIndex)) {
      this.setState({
        markedWrong: markedWrong.concat(currentCardIndex),
      });
    }
    // else {
    //   const index = markedWrong.findIndex(x => x === currentCardIndex);
    //   const updatedWrongs = [...markedWrong];
    //   updatedWrongs.splice(index, 1);
    //   this.setState({
    //     markedWrong: updatedWrongs,
    //   });
    // }
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
    const { currentCardIndex, cards, showFront, markedWrong } = this.state;
    const card = cards[currentCardIndex];
    const selectedDeck = this.findSelectedDeck();

    return (
      <div className="study-mode">
        <LinkToDashboard deckId={this.props.match.params.deckId} />
        {card &&
          <>
          <Card
            key={card.id}
            card={card}
            studyMode={true}
            markWrong={this.markWrong}
            markRight={this.markRight}
            index={currentCardIndex}
            totalCards={cards.length}
            wrong={markedWrong.includes(currentCardIndex)}
            side={showFront ? 'front' : 'back'}
          />
          <CardButtonGroup
            next={this.next}
            prev={this.prev}
            flip={this.flip}
          />
          </>
        }
        <DeckInfo selectedDeck={selectedDeck} />
      </div>
    );
  }
}

export default withRouter(StudyMode);
