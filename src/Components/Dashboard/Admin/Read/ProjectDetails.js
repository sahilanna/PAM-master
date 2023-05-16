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
        <p>Project ID: {project.projectId}</p>
        <p>Project Name: {project.projectName}</p>
        <p>Project Description: {project.projectDescription}</p>
        <p>Repository Name: {project.repoName}</p>
        <p>PM Github: {project.pmGithubUsername}</p>
        <p>User Github: {project.userGithubUsername}</p>
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
