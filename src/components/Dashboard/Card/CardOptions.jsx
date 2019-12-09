import React from 'react';
import { Link } from 'react-router-dom';

const CardOptions = () => {
  return (
    <div className="card-options">
      <Link to="/dashboard/card/edit" className="card-options-link">edit</Link>
      <div className="card-options-link" data-toggle="modal" data-target="#deletemodal">del</div>
    </div>
  );
}

export default CardOptions;
