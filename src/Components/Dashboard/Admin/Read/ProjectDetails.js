import React, { useState } from 'react';
import { Modal, Button} from 'semantic-ui-react';






const ProjectDetails = ({ project, onClose }) => {
  

  const [visible,setvisible]=useState(false);

  return (
    <Modal 
    onClose={() => setvisible(false)}
    onOpen={() => setvisible(true)}
    open={visible}
    >
      <Modal.Header >
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Project ID:</strong> {project.projectId}</p>
        <p><strong>Project Name:</strong> {project.projectName}</p>
        <p><strong>Project Description:</strong> {project.projectDescription}</p>
        <p><strong>Repository Name:</strong> {project.repoName}</p>
        <p><strong>PM Github:</strong> {project.pmGithubUsername}</p>
        <p><strong>User Github:</strong> {project.userGithubUsername}</p>
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
