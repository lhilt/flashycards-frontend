import React, { Component } from 'react';

import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
  state = {
    currentUser: null,
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
