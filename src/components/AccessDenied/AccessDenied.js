import React from "react";
import Button from "../Button/Button";

const AccessDenied = () => {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="accessDenied"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title me-auto">Access Denied</h5>
          </div>
          <div className="modal-body">
            <p>
              You don't have the necessary permissions to view this content.
            </p>
          </div>

          <div className="modal-footer">
            <Button color="secondary" data-bs-dismiss="modal">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
