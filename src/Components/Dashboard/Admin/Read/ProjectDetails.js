import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProjectDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Project ID:</strong> {project.projectId}</p>
        <p><strong>Project Name:</strong> {project.projectName}</p>
        <p><strong>Project Description:</strong> {project.projectDescription}</p>
        {/* <p><strong>Repository Name:</strong> {project.repoName}</p>
        <p><strong>PM Github:</strong> {project.pmGithubUsername}</p>
        <p><strong>User Github:</strong> {project.userGithubUsername}</p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectDetails;