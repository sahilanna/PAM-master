import React from 'react'
import { useState,useEffect } from 'react';
import {Form, Button} from 'semantic-ui-react'
import NavBarA from '../NavbarA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ngrokUrlSwe } from '../../../../Assets/config';
function CreateProject() {
  const navigate=useNavigate()
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [clicked, setClicked] = useState(false);

    const handleBack=()=>{
      navigate(-1)
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      setClicked(true);
      const response=axios.post(`https://${ngrokUrlSwe}/api/projects/create`,{projectName,projectDescription})

    }



  return (
    <div>
        <NavBarA />
        <div>
          <Form className='form-style' onSubmit={handleSubmit}>
            <Button className='back-button' onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <h1>Create Project</h1>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Project-Name</label>
              <input name='name' onChange={(e) => setProjectName(e.target.value)} placeholder='Name' />
            {clicked && projectName.length <= 0 ? <label style={{ color: 'red' }}>project name can't be Empty</label> : ''}
            <br />
              
            </Form.Field>

            <Form.Field>
              <label style={{ textAlign: 'left' }}>Project Description</label>
              <input name='description' onChange={(e) => setProjectDescription(e.target.value)} placeholder='description' />
            {clicked && projectName.length <= 0 ? <label style={{ color: 'red' }}>project description can't be Empty</label> : ''}
            <br />
              
            </Form.Field>
            <Button type='submit' variant='primary' onClick={handleSubmit}>Submit</Button>
          </Form>
        </div>
      </div>
  )
}

export default CreateProject