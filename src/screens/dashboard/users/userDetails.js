import React from "react";
import { Modal } from "semantic-ui-react";
import CloseButton from "../../../atoms/closeButton/closeButton";

const UserDetails = ({ project, onClose }) => {
  
  if (!project) return null;

  return (
    <Modal size="mini" open={true} onClose={onClose} className="form-modal">
      <CloseButton onClick={onClose} />
      <Modal.Header>User Details</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            <strong>User ID:</strong> {project?.id || "N/A"}
          </p>
          <p>
            <strong>User Name:</strong> {project?.name || "N/A"}
          </p>
          <p>
            <strong>User Email:</strong> {project?.email || "N/A"}
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default UserDetails;
