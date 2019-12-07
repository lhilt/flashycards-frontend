import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Card.css';

class Card extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="flashcard">
        <div className="card-options">
          <Link to="/dashboard/card/edit" className="card-options-link">edit</Link>
          <div className="card-options-link" data-toggle="modal" data-target="#deletemodal">del</div>
        </div>
        <div className="card-text">
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default Card;
