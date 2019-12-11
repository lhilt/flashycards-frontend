import React from 'react';

const CardStudyOptions = ({ markWrong, markRight }) => {
  return (
    <div className="card-study">
      <div className="card-study-option right" onClick={markRight}><i className="fas fa-check"></i></div>
      <div className="card-study-option wrong" onClick={markWrong}><i className="fas fa-times"></i></div>
    </div>
  );
}

export default CardStudyOptions;
