import React, { useState, useEffect } from 'react'
import {Modal, Form, Dropdown, Button, Input} from 'semantic-ui-react'
import NavBarA from '../Admin/NavbarA'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ngrokUrl } from '../../../Assets/config';
import api from '../api';
function AddPmUserName() {
    const navigate=useNavigate()
    const[id,setId]=useState()
    const [users,setUsers]=useState([])
    const[githubUsername, setgithubUsername]=useState('')
    const[selectedUser,setSelectedUser]=useState('')
    const [showInvalidUsernameModal, setShowInvalidUsernameModal] = useState(false);
  const [showUserExistModal, setShowUserExistModal] = useState(false);
    const accessToken='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'
    useEffect(() => {
      fetchPms();
    }, []);
    
    const fetchPms = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/api/users/role/project_manager`
          
        );
        const userOptions = response.data.map(user => ({
          key: user.id,
          text: user.name,
          value: user.id
        }));
        setUsers(userOptions)
     console.log(users)
    
      } catch (error) {
        console.log('Error fetching Users:', error);
      }
    };
    const handleSubmit=async (e)=>{
      e.preventDefault();

      console.log(githubUsername)
      const username=githubUsername;
      try {
        const response = await api.post(`https://${ngrokUrl}/usernames/githubUsername`, {
           username: username,
        user: {
          id: id},
        accessToken: accessToken
          
        });
        console.log('API Response:', response.data.id);
        
        navigate('/pmReadNew');
        
      } catch (error) {
        const errorMessage=error.response.data
        console.log(errorMessage)
        if(errorMessage==='Github username is invalid'|| error.response.status==404){
            setShowInvalidUsernameModal(true)
        }
        else if(error.response.status==409){
          setShowUserExistModal(true)
      }
    };
      

    }

    const selectedUserChange=(event,{value})=>{
      setSelectedUser(value)
      setId(value)
      console.log(id)
    }

    
    const handleBack = () => {
        navigate(-1); // Go back one page in history
      };

      const onClose =()=>{
        navigate(-1);
      }
       const handleCloseModal = () => {
    setShowInvalidUsernameModal(false);
    setShowUserExistModal(false);
  };



  return (

    <>
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
      <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
      
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
        <Modal.Header>Add PM UserName</Modal.Header>

   
  
          <Modal.Content>

          <Form onSubmit={handleSubmit}>

    <Form.Field>
          <label style={{textAlign:'left'}}>PM</label>
          <Dropdown
            placeholder="Select PM"
            fluid
            selection
            options={users}
            onChange={selectedUserChange}
          
          />
          </Form.Field>
          
      <Form.Field>
        <label style={{textAlign:'left'}}>Github Username</label>
        <input
          placeholder="Enter github username"
          value={githubUsername}
          onChange={(e) => setgithubUsername(e.target.value)}
        />
      </Form.Field>
     
      <Button type='submit'>Submit</Button>
        </Form>

        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>

<Modal open={showInvalidUsernameModal} className='centered-modal1' size="mini" centered>
<Modal.Header>Invalid Username</Modal.Header>
<Modal.Content>
  <p>The provided GitHub username is invalid.</p>
</Modal.Content>
<Modal.Actions>
  <Button primary onClick={handleCloseModal}>
    OK
  </Button>
</Modal.Actions>
</Modal>

<div>
<Modal open={showUserExistModal} className='centered-modal1' size="mini" centered>
<Modal.Header>User Already Exists</Modal.Header>
<Modal.Content>
  <p>User Already Exists</p>
</Modal.Content>
<Modal.Actions>
  <Button primary onClick={handleCloseModal}>
    OK
  </Button>
</Modal.Actions>
</Modal>
</div>
</>
  )
}

export default AddPmUserName


/*
const navigate=useNavigate()
    const[id,setId]=useState()
    const [users,setUsers]=useState([])
    const[githubUsername, setgithubUsername]=useState('')
    const[selectedUser,setSelectedUser]=useState('')
    const[showUserExistModal, setshowUserExistModal]=useState(false)
    const [showInvalidUsernameModal, setShowInvalidUsernameModal] = useState(false);
    const accessToken='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'
    useEffect(() => {
      fetchPms();
    }, []);
    const fetchPms = async () => {
      try {
        const response = await axios.get(`https://${ngrokUrlSwe}/api/users/role/project_manager`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const userOptions = response.data.map(user => ({
          key: user.id,
          text: user.name,
          value: user.id
        }));
        setUsers(userOptions)
     console.log(users)
      } catch (error) {
        console.log('Error fetching Users:', error);
      }
    };
    const handleCloseModal = () => {
        setShowInvalidUsernameModal(false);
        setshowUserExistModal(false) // Hide the modal
      };
    const handleSubmit=async (e)=>{
      e.preventDefault();
      console.log(githubUsername)
      const username=githubUsername;
      try {
        const response = await axios.post(`https://${ngrokUrlSwe}/usernames/githubUsername`, {
           username: username,
        user: {
          id: id},
        accessToken: accessToken
        });
        console.log(response)
        console.log('API Response:', response.data.id);
        navigate('/userRead');
      } catch (error) {
        const errorMessage=error.response.data
        console.log(errorMessage)
        if(errorMessage==='Github username is invalid'|| error.response.status==404){
            setShowInvalidUsernameModal(true)
        }
        else if(error.response.status==409){
          setshowUserExistModal(true)
        }
      console.log('Error:', error);
      }
    }
    const selectedUserChange=(event,{value})=>{
      setSelectedUser(value)
      setId(value)
      console.log(id)
    }
    const handleBack = () => {
        navigate(-1); // Go back one page in history
      };
  return (
    <div> <NavBarA/><div>
    <div className='form-dis'>
        <Form lassName='form-style' onSubmit={handleSubmit}>
        <Button className="back-button" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
        <div className='backandheader'>
    <Form.Field>
          <label style={{textAlign:'left'}}>PM</label>
          <Dropdown
            placeholder="Select PM"
            fluid
            selection
            options={users}
            onChange={selectedUserChange}
            // value={}
          />
          </Form.Field>
          <br/>
      <Form.Field>
        <label style={{textAlign:'left'}}>github Username</label>
        <input
          placeholder="Enter github username"
          value={githubUsername}
          onChange={(e) => setgithubUsername(e.target.value)}
        />
      </Form.Field>
      <Button primary type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </div>
    </Form>
    </div>
    </div>
    <div>
    <Modal open={showInvalidUsernameModal} size='mini' centered>
        <Modal.Header>Invalid Username</Modal.Header>
        <Modal.Content>
          <p>The provided GitHub username is invalid.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
      <div>
  <Modal open={showUserExistModal} size='mini' centered>
        <Modal.Header>User Already Exists</Modal.Header>
        <Modal.Content>
          <p>User Already Exists</p>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
    </div>


*/