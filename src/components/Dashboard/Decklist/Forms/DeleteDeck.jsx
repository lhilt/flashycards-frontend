import React from 'react';

const DeleteDeck = ({ deck, handleSubmit }) => {
  return (
    <div className="modal fade" id={`deleteDeck${deck.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Confirm Delete</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            This will permanently delete this deck AND ALL CARDS
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-info" data-dismiss="modal" onClick={()=>handleSubmit(deck)}>Delete Forever</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDeck;
