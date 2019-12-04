import React, { Component } from 'react';

import Navbar from './components/Navbar';
import MainRoutes from './config/MainRoutes';
import './App.css';

class App extends Component {
  state = {
    currentUser: null,
    signup: true,
  };

  toggleAuthForm = () => {
    this.setState(prevState => ({
      signup: !prevState.signup,
    }));
  };

  render() {
    return (
      <div className="App">
        <Navbar
          toggleAuthForm={this.toggleAuthForm}
          signup={this.state.signup}
        />
        <MainRoutes signup={this.state.signup}/>
      </div>
    );
  }
}

export default App;
