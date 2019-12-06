import React, { Component } from 'react';

class CreateDeck extends Component {
  state = {
    name: '',
    description: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, description } = this.state;
    return (
      <div className="jumbotron" id="create-deck-form">
        <h2>Create a Deck</h2>
        <form
          id="create-deck"
          onSubmit={(e) => this.props.handleSubmit(e, this.state)}
        >
          <div className="form-group">
            <label htmlFor="name">Name of Your Deck</label>
            <textarea
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name your deck"
              value={name}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              className="form-control"
              placeholder="Describe it here"
              value={description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="">
            <button className="btn btn-info float-right" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateDeck;
