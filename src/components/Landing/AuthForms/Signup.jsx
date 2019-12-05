import React, { Component } from 'react';
import axios from 'axios';

class SignupForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `http://localhost:8000/signup`,
      this.state,
      { withCredentials: true }
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="jumbotron">
        <h2>Sign Up</h2>
        <form id="signup" className="needs-validation" noValidate onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="username" name="username" className="form-control" id="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" className="form-control" id="password2" placeholder="Confirm Password" value={this.state.password2} onChange={this.handleChange}/>
          </div>
          <button className="signup-btn btn btn-info float-right" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
