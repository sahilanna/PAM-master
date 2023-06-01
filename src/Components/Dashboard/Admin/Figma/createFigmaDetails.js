import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import FigmaCreate from './FigmaCreate';

function CreateFigmaDetails() {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState('');
  const [figmaURL, setFigmaUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://7db4-106-51-70-135.ngrok-free.app/api/figmas/add', {
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
          <label>Project Name</label>
          <input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
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
