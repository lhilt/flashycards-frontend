import React from 'react';
import { Link } from 'react-router-dom';

import './ModeLinks.css';

const LinkToStudyMode = ({ deckId }) => {
  return (
    <Link to={`/study/decks/${deckId}`} className="mode-link" >
      Head to Study Mode
    </Link>
  );
};

export default LinkToStudyMode;
