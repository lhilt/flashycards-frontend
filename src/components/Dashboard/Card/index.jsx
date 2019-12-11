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
      <div className={`flashcard ${side} ${studyClass} ${wrongClass}`}>
        {!studyMode &&
          <CardOptions toggleEditForm={this.props.toggleEditForm} />}
        <div className="card-text">
          <p>{card[side]}</p>
        </div>
        {studyMode &&
          <CardStudyOptions
            markWrong={this.props.markWrong}
            markRight={this.props.markRight}
          />}
        <div className="card-info">
          <span>{side}</span>
          <span>{`${index+1}/${totalCards}`}</span>
        </div>
      </div>
    );
  }
}

export default Card;
