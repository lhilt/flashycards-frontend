import React from 'react';

const CardButtonGroup = ({ prev, flip, next }) => {
  return (
    <div className="card-btn-group">
      <span onClick={prev}>&lsaquo;</span>
      <span onClick={flip}>flip</span>
      <span onClick={next}>&rsaquo;</span>
    </div>
  );
};

export default CardButtonGroup;
