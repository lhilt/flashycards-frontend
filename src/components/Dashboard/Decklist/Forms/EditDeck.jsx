import React, { Component } from 'react';

class EditDeck extends Component {
  state = {
    name: this.props.deck.name,
    description: this.props.deck.description,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit({...this.state, id: this.props.deck.id});
  }

  render() {
    const { name, description } = this.state;
    return (
      <div
        className="modal fade"
        id={`editDeck${this.props.deck.id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="Edit post form"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
          <div className="modal-header">
              Edit your deck
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                id="create-deck"
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
                  <button
                    className="btn btn-info float-right"
                    type="submit"
                    data-dismiss="modal"
                    onClick={this.handleSubmit}
                  >Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDeck;
