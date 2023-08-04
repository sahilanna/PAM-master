import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { ngrokUrl} from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';
import PmDashboard from './PmDashboard';
const PmProjectDetails = ({ project, onClose }) => {

  const [isLoading, setIsLoading] = useState(true);
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)
  const  id=user.id
  const [result, setResult]=useState([])
  const fetchFigma = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`);
      const  data  = response.data;
      console.log('data',data)
      setIsLoading(false);
      setResult(data);
      console.log('result',result)
    } catch (error) {
      console.log('Error fetching PMID:', error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
  fetchFigma();
}, []);


  if (!project) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Project ID: </strong> {project.projectId}</p>
        <p><strong>Project Name:</strong>  {project.projectName}</p>
        <p><strong>Figma URL: </strong><a href={project.figma.figmaURL}>{project.figma.figmaURL}</a></p>
        {/* <p><strong>Repo Name: </strong>{project.repositories[0].repo.name}</p> */}
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