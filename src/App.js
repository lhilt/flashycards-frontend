import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { DELETE } from './helperScripts/ajax';
import Navbar from './components/Navbar';
import MainRoutes from './config/MainRoutes';
import './App.css';

class App extends Component {
  state = {
    currentUsername: localStorage.getItem('username'),
    signupForm: true,
  };

  setCurrentUser = (username) => {
    localStorage.setItem('username', username)
    this.setState({
      currentUsername: username,
    });
  };

  logoutUser = () => {
    localStorage.removeItem('username');
    DELETE('/logout');
    this.setState({
      currentUsername: null,
    });
    this.props.history.push('/');
  }

  toggleAuthForm = () => {
    this.setState(prevState => ({
      signupForm: !prevState.signupForm,
    }));
  };

  render() {
    return (
      <div className="App">
        <Navbar
          toggleAuthForm={this.toggleAuthForm}
          signup={this.state.signupForm}
          currentUsername={this.state.currentUsername}
          logoutUser={this.logoutUser}
        />
        <MainRoutes
          signup={this.state.signupForm}
          setCurrentUser={this.setCurrentUser}
        />
      </div>
    );
  }
}

export default withRouter(App);
