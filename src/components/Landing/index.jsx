import React, { Component } from 'react';

import API from '../../helperScripts/api';
import getCookie from '../../helperScripts/getCSRF';
import SignupForm from './AuthForms/Signup';
import SigninForm from './AuthForms/Signin';
import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (!getCookie('csrftoken')) {
      console.log('can i haz cookie?')
      API.getToken();
    }
  }

  render() {
    return (
      <main className="landing row">
        <section className="col-lg hook">
          <h1 className="title-text">Unnamed Flashcard App.</h1>
          <h3>The ultimate place to study.</h3>
        </section>
        <section className="col-lg container" id="form-container">
          {this.props.signup ? <SignupForm /> : <SigninForm />}
        </section>
    </main>
    );
  }
};

export default Landing;
