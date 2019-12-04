import React from 'react';

const SigninForm = () => (
  <div className="jumbotron" id="signin-form">
    <h2>Sign In</h2>
    <form id="signin">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="username" name="username" className="form-control" id="username" placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
      </div>
      <div className="signinbtn">
        <button className="signin-btn btn btn-info" type="submit">Submit</button>
      </div>
    </form>
    <div className="mt-4">Don't have an account? <a href="/signup">Sign up</a></div>
  </div>
);

export default SigninForm;
