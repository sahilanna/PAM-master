import React from 'react'
import { useState,useEffect } from 'react';
import {Form, Button, Modal, Dropdown} from 'semantic-ui-react'
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
        navigate('/AdminDashboard')
      }
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
      <Modal.Header>Create Project</Modal.Header>

   
  
          <Modal.Content>

          <Form onSubmit={handleSubmit}>
     
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
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: 'left' }}>Users</label>
                <input name='description' onChange={(e) => setProjectDescription(e.target.value)} placeholder='description' />
              {clicked && projectName.length <= 0 ? <label style={{ color: 'red' }}>project description can't be Empty</label> : ''}
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: 'left' }}>Pms</label>
                <input name='description' onChange={(e) => setProjectDescription(e.target.value)} placeholder='description' />
              {clicked && projectName.length <= 0 ? <label style={{ color: 'red' }}>project description can't be Empty</label> : ''}
              </Form.Field>
              <Button type='submit'>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
     
    )
  }

  export default CreateProject