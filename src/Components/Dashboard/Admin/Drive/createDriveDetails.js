import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Modal } from 'semantic-ui-react';
import {  useNavigate } from 'react-router-dom';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import api from '../../api';

function CreateDriveDetails() {
  const navigate = useNavigate()
  let [projectName, setProjectName] = useState('');
  const [figmaURL, setFigmaUrl] = useState('');
  const [proj,setproj]=useState([])
  let[item,setitem]=useState('')
  const [driveId, setDriveId] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [folderName, setFolderName] = useState('');



  console.log(projectName);
  console.log(item);



  const handleProjChange = (event, { value }) => {
    setitem(value);
    setSelectedProject(value)
    console.log(selectedProject)
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrlSwe}/api/projects/without-figma-url`);
     
      const figmaProjects = response.data.map(figma => ({
        key: figma.projectId,
        text: figma.projectName,
        value: figma.projectId
      }));
      setproj(figmaProjects);
      console.log(proj)

    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedProject || !folderName) {
      return;
    }
    try {
      
      const response = await api.post(`https://${ngrokUrlSwe}/api/createfolder`, {
          projectId: selectedProject,
          folderName: folderName,
      },
    );
      
      console.log('API Response:', response.data.id);
      const driveId=response.data.id;
      setDriveId(driveId)
      navigate('/driveRead', { state: { driveId } });
      setProjectName('');
      setFigmaUrl('');
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const onClose=()=>{
    navigate(-1);
  }
  return (
    <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add Project</Modal.Header>
          <Modal.Content>
          <Form onSubmit={handleSubmit}>
      <Form.Field>
            <label style={{textAlign:'left'}}>Projects<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Project"
              fluid
              selection
              options={proj}
               onChange={handleProjChange}
            />
            </Form.Field>

            <Form.Field>
    <label style={{ textAlign: 'left' }}>Folder Name<span style={{ color: 'red' }}>*</span></label>
    <input
      type="text"
      placeholder="Enter Folder Name"
      value={folderName}
      onChange={(e) => setFolderName(e.target.value)}
    />
  </Form.Field>
           
        
          <Button type='submit'  disabled={!selectedProject ||  !folderName}>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
        </Modal>
  );
}


export default CreateDriveDetails;
