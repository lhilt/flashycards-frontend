import React, { Component } from 'react';

import API from '../../../helperScripts/api';

class SigninForm extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = this.state;
    API.signInUser(userInfo)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="jumbotron" id="signin-form" onSubmit={this.handleSubmit}>
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
            <button className="signin-btn btn btn-info float-right" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SigninForm;
