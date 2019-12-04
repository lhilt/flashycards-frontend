import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render() {
    const { card } = this.props;
    return (
      <div className="flashcard front">
        <div className="card-options">
          <span>edit </span>
          <span>del</span>
        </div>
        <h3>{card.front}</h3>
      </div>
    );
  }
}

export default Card;
