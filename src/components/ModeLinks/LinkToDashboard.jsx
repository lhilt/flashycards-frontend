import React from 'react';
import { Link } from 'react-router-dom';

import './ModeLinks.css';

const LinkToDashboard = ({ deckId }) => {
  return (
    <Link to={`/dashboard/decks/${deckId}`} className="mode-link" >
      Back to Dashboard
    </Link>
  );
};

export default LinkToDashboard;
