import React, {useState,useEffect} from 'react'
import { Modal, Button } from 'semantic-ui-react';
import { ngrokUrl} from '../../../network/config';
import api from '../../../network/api';
import './pmDashboard.css'
const PmProjectDetails = ({ project, onClose }) => {

  const [isLoading, setIsLoading] = useState(true);
  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;
 
  console.log(user)
  let id = null;
  if(user !== null)
  {
    id=user.id

  }

 
  const [result, setResult]=useState([])
  const fetchFigma = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/users/${id}/role/project_manager/projects`);
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
  console.log(isLoading);

  return (
    <Modal className='custom-dialog2' open={true} onClose={onClose}>
      
        <Modal.Header>Project Details</Modal.Header>
    
      <Modal.Content>
        <p><strong>Project ID: </strong> {project.projectId}</p>
        <p><strong>Project Name:</strong>  {project.projectName}</p>
        <p><strong>Figma URL: </strong><a href={project.figma.figmaURL}>{project.figma.figmaURL}</a></p>
        <p><strong>Drive Link: </strong><a href={project.googleDrive.driveLink}>{project.googleDrive.driveLink}</a></p>
        {/* <p><strong>Repo Name: </strong>{project.repositories[0].repo.name}</p> */}
        <p><strong>project Description: </strong>  {project.projectDescription}</p>
        {/* <p><strong>PM Github Username:</strong>  {project.githubUsername}</p> */}
      </Modal.Content>
      <Modal.Actions>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};


 

export default PmProjectDetails