import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import FigmaCreate from './FigmaCreate';

function CreateFigmaDetails() {
  const navigate = useNavigate()
  let [projectName, setProjectName] = useState('');
  const [figmaURL, setFigmaUrl] = useState('');
  const [proj,setproj]=useState([])
  let[item,setitem]=useState('')
  const [selectedProject, setSelectedProject] = useState('');

  const handleProjChange = (event, { value }) => {
    setitem(value);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  
projectName=item;

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://de62-106-51-70-135.ngrok-free.app/api/projects/allProjects', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      // setitem(response.data)
     console.log(response.data)
     const projectNames = response.data.map(project => project.projectName);
     setproj(projectNames);
  
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://de62-106-51-70-135.ngrok-free.app/api/figmas/add', {
         projectName,
         figmaURL,
      });
      console.log('API Response:', response.data);
      navigate('/figmaRead')
      setProjectName('');
      setFigmaUrl('');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>Project Form</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
            <label>Projects</label>
            <Dropdown
              placeholder="Select Project"
              fluid
              selection
              options={proj.map((name, index) => ({
                key: index,
                text: name,
                value: name
              }))}
              value={item}
               onChange={handleProjChange}
            />
            </Form.Field>
        <Form.Field>
          <label>Figma URL</label>
          <input
            placeholder="Enter Figma URL"
            value={figmaURL}
            onChange={(e) => setFigmaUrl(e.target.value)}
          />
        </Form.Field>
        <Button primary type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateFigmaDetails;
