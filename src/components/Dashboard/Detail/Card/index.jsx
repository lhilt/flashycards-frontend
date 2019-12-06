import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render() {
    const { text, toggleEditCard } = this.props;
    return (
      <div className="flashcard">
        <div className="card-options">
          <div className="card-options-link" onClick={toggleEditCard}>edit</div>
          <div className="card-options-link" data-toggle="modal" data-target="#deletemodal">del</div>
        </div>
        <h3>{text}</h3>
      </div>
    );
  }
}

export default Card;
