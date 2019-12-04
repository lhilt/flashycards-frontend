import React from 'react';

const Navbar = (props) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <a className="navbar-brand" href="/">Unnamed Flashcard App</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsExample03">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Other</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
