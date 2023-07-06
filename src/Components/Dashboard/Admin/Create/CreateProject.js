import React from 'react'
import { useState,useEffect } from 'react';
import {Form, Button, Modal, Dropdown, Dimmer} from 'semantic-ui-react'
import NavBarA from '../NavbarA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';


function CreateProject() {
  const navigate=useNavigate()
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [clicked, setClicked] = useState(false);
    const [formError, setFormError] = useState('');

    const handleBack=()=>{
      navigate(-1)
    }
    const handleSubmit = async (e)=>{
      e.preventDefault();
      if(!projectDescription||!projectName){
        return
      }
      setClicked(true);
      const response = await api.post(`https://${ngrokUrl}/api/projects/create`,{projectName,projectDescription})
      navigate('/AdminDashboard')
    }
const onClose=()=>{
navigate(-1);
}
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
    <div style={{paddingTop:'6px'}}>
      </div>
      <div style={{paddingLeft:'442px'}}>
    <Button secondary onClick={onClose}>
        X
      </Button>
      </div>
    <Modal.Header>Create Project</Modal.Header>
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
              <input name='name' onChange={(e) => setProjectName(e.target.value)} placeholder='Name' />
          
            <br />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Project Description<span style={{ color: 'red' }}>*</span></label>
              <input name='description' onChange={(e) => setProjectDescription(e.target.value)} placeholder='description' />
            
            </Form.Field>
          
            <Button type='submit' primary disabled={!projectName||!projectDescription}>Submit</Button>
      </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
      </Modal>
  )
}
  export default CreateProject
