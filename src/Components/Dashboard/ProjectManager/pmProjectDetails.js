import React from 'react'
import { Modal, Button } from 'react-bootstrap';

 
const PmProjectDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Project ID: </strong> {project.projectId}</p>
        <p><strong>Project Name:</strong>  {project.projectName}</p>
        <p><strong>project Description: </strong>  {project.projectDescription}</p>
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


 

export default PmProjectDetails