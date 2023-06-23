import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import FigmaCreate from './FigmaCreate';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';

function CreateFigmaDetails() {
  const navigate = useNavigate()
  const[id,setId]=useState()
  let [projectName, setProjectName] = useState('');
  const [figmaURL, setFigmaUrl] = useState('');
  const [proj,setproj]=useState([])
  let[item,setitem]=useState('')
  const [figmaId, setFigmaId] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)


  const validateURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname === 'www.figma.com' &&
        parsedUrl.pathname.startsWith('/files/')
      );
    } catch (_) {
      return false;
    }
  };
const headers={AccessToken:accessToken}


  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFigmaUrl(url);
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

  projectName=item;
  
  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/without-figma-url`);
     
      const figmaProjects = response.data.map(figma => ({
        key: figma.projectId,
        text: figma.projectName,
        value: figma.projectId
      }));
      setproj(figmaProjects);
      console.log(proj)

    // console.log(response.data)
    //  const projectNames = response.data.map(project => project.projectName);
    //  setproj(projectNames);

    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const response = await api.post(`https://${ngrokUrl}/api/figmas/create`, {
        projectDTO: {
          projectId: selectedProject,
          projectName: selectedProject,
      },
      figmaURL: figmaURL
      },{headers});
      
      console.log('API Response:', response.data.id);
      const figmaId=response.data.id;
      setFigmaId(figmaId)
      navigate('/figmaRead', { state: { figmaId } });
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
     
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
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
            <label style={{textAlign:'left'}}>Projects</label>
            <Dropdown
              placeholder="Select Project"
              fluid
              selection
              options={proj}
               onChange={handleProjChange}
            />
            </Form.Field>

            <Form.Field>
            <label style={{ textAlign: 'left' }}>Figma URL</label>
            <input
              type='text'
              placeholder="Enter Figma URL"
              value={figmaURL}
              onChange={handleUrlChange}
              className={!isValidUrl ? 'error' : ''}
            />
            {!isValidUrl && (
              <p className="error-message">Invalid Figma URL</p>
            )}
          </Form.Field>
        
        <Button type='submit'>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
        
  );
}

export default CreateFigmaDetails;
