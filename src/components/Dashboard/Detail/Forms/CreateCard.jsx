import React, { Component } from 'react';

class CreateCard extends Component {
  state = {
    front: '',
    back: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { front, back } = this.state;
    return (
      <div className="jumbotron flash-form" id="create-card-form">
        <h2>Create a Card</h2>
        <form
          id="create-card"
          onSubmit={(e) => this.props.handleSubmit(e, this.state)}
        >
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
              type="text"
              name="front"
              id="front"
              className="form-control"
              placeholder="Text for the front of the card..."
              value={front}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              type="text"
              name="back"
              id="back"
              className="form-control"
              placeholder="Text for the back of the card..."
              value={back}
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

export default CreateCard;
