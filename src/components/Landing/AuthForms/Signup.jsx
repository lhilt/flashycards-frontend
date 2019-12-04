import React from 'react';

const SignupForm = () => (
  <div className="jumbotron">
    <h2>Sign Up</h2>
    <form id="signup" className="needs-validation" noValidate>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="username" name="username" className="form-control" id="username" placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
      </div>
      <div className="form-group">
        <label htmlFor="password2">Confirm Password</label>
        <input type="password" name="password2" className="form-control" id="password2" placeholder="Confirm Password" />
      </div>
      <button className="signup-btn btn btn-info float-right" type="submit">Submit</button>
    </form>
  </div>
);

export default SignupForm;
