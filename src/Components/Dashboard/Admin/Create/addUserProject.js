import React from 'react'
import { useState,useEffect } from 'react';
import {Form, Button, Modal, Dropdown} from 'semantic-ui-react'
import NavBarA from '../NavbarA';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';

function AddUserProject() {
    
    const navigate = useNavigate();
    const { state } = useNavigate();
    const location = useLocation();
    const { projectId } = location.state || {};
    const {projectName}= location.state|| {};
    let[item,setItem]=useState('')
    let[user,setUsers]=useState([])
    // const [projectId, setProjectId] = useState('');
    // const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [clicked, setClicked] = useState(false);
     let [selectedUser, setSelectedUser] = useState('');
     let[userId,setuserId]=useState('')
     console.log(projectId)

      const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/role/user`);
     const projUsers = response.data.map(projU => ({
        key: projU.id,
        text: projU.name,
        value: projU.id
      }));
      setUsers(projUsers)
      
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);
   const handleUserChange = (event, { value }) => {
    setItem(value)
    setSelectedUser(value);
    console.log(selectedUser)
    console.log(user)
    // console.log(user[0].value)
    // userId=user[0].value
    setuserId(user[0].value)
    // console.log("hi",userId)
  
  };

  
    console.log("hi",userId)
    const handleSubmit=async (e)=>{
        
        e.preventDefault();
        setClicked(true);
        try{
            // console.log("hi",userId)
        const response = await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`)
        navigate('/AdminDashboard')
        } catch(error){
            console.log('error',error)
        }
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
    <Modal.Header>Add User to project</Modal.Header>
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Project-Name</label>
              <input name='name'  placeholder={projectName} readOnly />
            
            <br />
            </Form.Field>
             <Form.Field>
            <label>User</label>
            <Dropdown
              placeholder="Select User"
              fluid
              selection
              options={user}
             
              onChange={handleUserChange}
            />
            </Form.Field>
            
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
      </Modal>
  )
}

export default AddUserProject
