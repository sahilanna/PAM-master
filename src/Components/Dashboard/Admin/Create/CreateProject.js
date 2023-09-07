import React,  { useState  } from 'react'
import {Form, Button, Modal } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';
import './Create.css';
import { useDispatch } from 'react-redux';
import { createProject } from '../../../../Login/redux-store/actions/action';


function CreateProject() {
  const navigate = useNavigate()
  const dispatchProject = useDispatch()
    
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [clicked, setClicked] = useState(false);
    
  console.log(clicked);
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      setClicked(true);
      if(!projectDescription||!projectName){
        return
      }
   
      dispatchProject(createProject({ projectName, projectDescription }));
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
