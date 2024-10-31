import React from "react";
import "../styles/CustomModal.css";  
const CustomModal = ({ show, handleClose, handleDelete }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this saved property?</p>
        <div className="modal-buttons">
          <button onClick={handleClose} className="modal-button cancel-button">
            Cancel
          </button>
          <button onClick={handleDelete} className="modal-button delete-button-modal">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
