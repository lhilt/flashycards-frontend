import React from 'react';

const CardStudyOptions = ({ markWrong }) => {
  return (
    <div className="card-options">
      <div className="card-options-link">right</div>
      <div className="card-options-link" onClick={markWrong}>wrong</div>
    </div>
  );
}

export default CardStudyOptions;
