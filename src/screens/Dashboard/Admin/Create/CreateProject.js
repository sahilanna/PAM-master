import React,  { useState  } from 'react'
import {Form, Button, Modal } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { createProject } from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Login/redux-store/actions/projectActions.js' // Import the createProject action

import './Create.css';
import LoadingPage from '../../../../atoms/loadingPage';
import { ToastContainer } from 'react-toastify';

function CreateProject() {
  const navigate=useNavigate()
  const dispatch = useDispatch(); 
  console.log("Helllllll")
  const { loading, success, error } = useSelector((state) => state.createProjectReducer); // Get Redux state

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [clicked, setClicked] = useState(false);
    
  console.log(clicked);
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      if(!projectDescription||!projectName){
        return ;
      }
      dispatch(createProject(projectName, projectDescription)); // Dispatch the createProject action
      navigate('/AdminDashboard');
    }
const onClose=()=>{
navigate(-1);
}
  return (
    <>
    <ToastContainer />
    
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
      {loading && <LoadingPage />}
      {success && <div>Project created successfully!</div>}
      {error && <div>Error: {error.message}</div>}
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
      </>
  )
}
export default CreateProject
