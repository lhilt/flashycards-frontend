import React, { Component } from 'react';

class CreateCard extends Component {
  render() {
    return (
      <div className="jumbotron" id="create-card-form">
        <h2>Create a Card</h2>
        <form id="create-card">
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea type="text" name="front" className="form-control" id="front" placeholder="Text for the front of the card...">
            </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea type="text" name="back" className="form-control" id="back" placeholder="Text for the back of the card...">
            </textarea>
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
