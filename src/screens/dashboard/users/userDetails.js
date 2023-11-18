import React from "react";
import { Modal, Button } from "semantic-ui-react";

const UserDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal
      className="custom-dialog1"
      open={true}
      onClose={onClose}
    >
      <Modal.Header>User Details</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            <strong>User ID:</strong> {project.id}
          </p>
          <p>
            <strong>User Name:</strong>{" "}
            {project.name}
          </p>
          <p>
            <strong>User Email:</strong>{" "}
            {project.email}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default UserDetails;
