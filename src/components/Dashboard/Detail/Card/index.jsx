import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

class Card extends Component {
  render() {
    const { card, side, index, totalCards } = this.props;
    return (
      <div className="flashcard">
        <div className="card-options">
          <Link to="/dashboard/card/edit" className="card-options-link">edit</Link>
          <div className="card-options-link" data-toggle="modal" data-target="#deletemodal">del</div>
        </div>
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
