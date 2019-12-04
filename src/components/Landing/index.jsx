import React from 'react';

import SignupForm from './AuthForms/Signup';
import SigninForm from './AuthForms/Signin';
import './Landing.css';

const Landing = (props) => {
  return (
    <main className="landing row">
      <section className="col-lg hook">
          <h1 className="title-text">Unnamed Flashcard App.</h1>
          <h3>The ultimate place to study.</h3>
      </section>
      <section className="col-lg container" id="form-container">
        {props.signup ? <SignupForm /> : <SigninForm />}
      </section>
  </main>
  );
};

export default Landing;
