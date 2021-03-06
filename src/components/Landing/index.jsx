import React, { Component } from 'react';

import SignupForm from './AuthForms/Signup';
import SigninForm from './AuthForms/Signin';
import './Landing.css';

class Landing extends Component {
  render() {
    const setUser = this.props.setCurrentUser;
    return (
      <main className="landing row">
        <div className="col-lg hook">
          <h1 className="title-text">FlashyCards</h1>
          <h3>The ultimate place to study.</h3>
        </div>
        <section className="col-lg container" id="form-container">
          {this.props.signup
            ?
            <SignupForm setUser={setUser} />
            :
            <SigninForm setUser={setUser} />}
        </section>
    </main>
    );
  }
};

export default Landing;
