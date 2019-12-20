import React from 'react';

const AddDeck = (props) => (
  <div
    className="btn btn-info add-deck"
    data-toggle="modal"
    data-target="#createDeck"
  >
    + Add a Deck
  </div>
);

export default AddDeck;
