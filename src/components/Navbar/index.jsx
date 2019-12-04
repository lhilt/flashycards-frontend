import React, { Component } from 'react';

import './Navbar.css';

class Navbar extends Component {
  render() {
    const { signup, toggleAuthForm } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Unnamed Flashcard App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link" onClick={toggleAuthForm}>
                {signup ? 'Sign In' : 'Sign Up'}
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
