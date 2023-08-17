import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import './PmCreate.css'

const PmDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal className="custom-dialog1" open={true} onClose={onClose}>
      <Modal.Header>PM Details</Modal.Header>
      <Modal.Content>
        <p><strong>PM ID:</strong> {project.id}</p>
        <p><strong>PM Name:</strong> {project.name}</p>
        <p><strong>PM Email:</strong> {project.email}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PmDetails;
