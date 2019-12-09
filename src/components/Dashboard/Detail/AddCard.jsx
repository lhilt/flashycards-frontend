import React from 'react';
import { withRouter } from 'react-router-dom';

const AddCard = ({ toggleCreateForm }) => {
  return (
    <div
      onClick={toggleCreateForm}
      className="btn btn-info add-card"
    >
      + Add a Card
    </div>
  );
};

export default withRouter(AddCard);
