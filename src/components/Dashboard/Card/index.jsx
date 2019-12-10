import React, { Component } from 'react';

import CardOptions from './CardOptions';
import CardStudyOptions from './CardStudyOptions';
import './Card.css';

class Card extends Component {
  render() {
    const { card, side, index, totalCards, studyMode } = this.props;
    const studyClass = studyMode ? 'study-card' : '';
    const wrongClass = this.props.wrong ? 'wrong-card' : '';
    return (
      <div className={`flashcard ${studyClass} ${wrongClass}`}>
        {studyMode
          ?
          <CardStudyOptions
            markWrong={this.props.markWrong}
            markRight={this.props.markRight}
          />
          :
          <CardOptions toggleEditForm={this.props.toggleEditForm} />}
        <div className="card-text">
          <p className={`${side}`}>{card[side]}</p>
        </div>
        <div className="card-info">
          <span>{side}</span>
          <span>{`${index+1}/${totalCards}`}</span>
        </div>
      </div>
    );
  }
}

export default Card;
