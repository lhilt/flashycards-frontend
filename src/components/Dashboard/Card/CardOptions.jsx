import React from 'react';

const CardOptions = ({ toggleEditForm }) => {
  return (
    <div className="card-options">
      <div onClick={toggleEditForm} className="card-options-link">edit</div>
      <div className="card-options-link" data-toggle="modal" data-target="#deletemodal">del</div>
    </div>
  );
}

export default CardOptions;
