import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="flashcard">
        <div className="card-options">
          <span>edit </span>
          <span>del</span>
        </div>
        <h3>{text}</h3>
      </div>
    );
  }
}

export default Card;
