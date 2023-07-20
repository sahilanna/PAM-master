import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PmDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>PM Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>PM ID: </strong> {project.id}</p>
        <p><strong>PM Name:</strong>  {project.name}</p>
        <p><strong>PM Email:</strong>  {project.email}</p>
        {/* <p><strong>PM Github Username:</strong>  {project.githubUsername}</p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PmDetails;
