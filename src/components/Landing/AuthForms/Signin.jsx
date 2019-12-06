import React, { Component } from 'react';

import { POST } from '../../../helperScripts/ajax';

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

    POST('/login', this.state)
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
            <input
              type="username"
              name="username"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
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
