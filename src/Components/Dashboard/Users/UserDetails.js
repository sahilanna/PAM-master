import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>User ID: </strong> {project.id}</p>
        <p><strong>User Name:</strong>  {project.name}</p>
        <p><strong>User Email:</strong>  {project.email}</p>
        <p><strong>User Github Username:</strong>  {project.githubUsername}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetails;
