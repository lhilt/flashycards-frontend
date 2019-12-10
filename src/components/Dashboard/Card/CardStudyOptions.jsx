import React from 'react';

const CardStudyOptions = ({ markWrong, markRight }) => {
  return (
    <div className="card-options">
      <div className="card-options-link right" onClick={markRight}>right</div>
      <div className="card-options-link wrong" onClick={markWrong}>wrong</div>
    </div>
  );
}

export default CardStudyOptions;
