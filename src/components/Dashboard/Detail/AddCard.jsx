import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const AddCard = (props) => {
  const url = props.match.url;
  return (
    <Link
      to={`${url}/cards/create`}
      className="btn btn-info add-card"
    >
      + Add a Card
    </Link>
  );
};

export default withRouter(AddCard);
