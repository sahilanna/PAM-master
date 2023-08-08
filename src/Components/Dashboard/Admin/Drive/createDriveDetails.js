import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';

function CreateDriveDetails() {


  const navigate = useNavigate()
  let [projectName, setProjectName] = useState('');
  const [driveURL, setDriveUrl] = useState('');
  const [proj,setproj]=useState([])
  let[item,setitem]=useState('')
  const [driveId, setDriveId] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateURL = (url) => {
    try {
     
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname === 'drive.google.com'
      );
    } catch (_) {
      return false;
    }
  };
  

  console.log(projectName);
  console.log(item);
  console.log(driveId);


  const handleUrlChange = (e) => {
    const url = e.target.value;
    setDriveUrl(url);
    setIsValidUrl(validateURL(url));
  };
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
      const response = await api.get(`https://${ngrokUrl}/api/projects/without-google-drive`);
     
      const driveProjects = response.data.map(drive => ({
        key: drive.projectId,
        text: drive.projectName,
        value: drive.projectId
      }));
      setproj(driveProjects);
      console.log(proj)

    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidUrl) {
      return;
    }
    try {
      
      const response = await api.post(`https://${ngrokUrl}/createGoogleDrive`, {
        projectDTO: {
          projectId: selectedProject,
          projectName: selectedProject,
      },
      driveLink: driveURL
      });
      
      console.log('API Response:', response.data.id);
      const driveId=response.data.id;
      setDriveId(driveId)
      navigate('/driveRead', { state: { driveId } });
      setProjectName('');
      setDriveUrl('');
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
            <label style={{ textAlign: 'left' }}>Drive Link<span style={{ color: 'red' }}>*</span></label>
            <input
              type='text'
              placeholder="Enter Drive Link"
              value={driveURL}
              onChange={handleUrlChange}
              className={!isValidUrl ? 'error' : ''}
            />
            {!isValidUrl && (
              <p className="error-message">Invalid Drive URL</p>
            )}
          </Form.Field>
        
          <Button type='submit'  disabled={!isValidUrl}>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
        </Modal>
  );
  
}

export default CreateDriveDetails;

