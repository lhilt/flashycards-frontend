import React from 'react';

const DeckInfo = ({ selectedDeck }) => (
  <div className="deck-info">
    <h3>{selectedDeck.name}</h3>
    <p>{selectedDeck.description}</p>
  </div>
);

export default DeckInfo;
