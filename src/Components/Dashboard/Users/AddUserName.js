import React, { useState, useEffect } from 'react';
import { Form, Dropdown, Button, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ngrokUrl, gitAccessToken } from '../../../Assets/config';
import './Read.css'
import api from '../api';


function AddUserName() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [githubUsername, setGithubUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showInvalidUsernameModal, setShowInvalidUsernameModal] = useState(false);
  const [showUserExistModal, setShowUserExistModal] = useState(false);
  const accessToken = gitAccessToken
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(selectedUser);
  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/role/user`);
      const userOptions = response.data.map((user) => ({
        key: user.id,
        text: user.name,
        value: user.id,
      }));
      setUsers(userOptions);
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(githubUsername);
    const username = githubUsername;
    try {
      const response = await api.post(`https://${ngrokUrl}/usernames/githubUsername`, {
        username: username,
        user: {
          id: id,
        },
        accessToken: accessToken,
      });
      console.log('API Response:', response.data.id);

      navigate('/userRead');
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

  const selectedUserChange = (event, { value }) => {
    setSelectedUser(value);
    setId(value);
    console.log(id);
  };

 
  const onClose = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setShowInvalidUsernameModal(false);
    setShowUserExistModal(false);
  };

  return (
    <>
      <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
        <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
        <div style={{ paddingLeft: '442px' }}>
          <Button secondary onClick={onClose}>
            X
          </Button>
        </div>
        <Modal.Header>Add Github UserName</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Users<span style={{ color: 'red' }}>*</span></label>
              <Dropdown
                placeholder="Select User"
                fluid
                selection
                options={users}
                onChange={selectedUserChange}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Github Username<span style={{ color: 'red' }}>*</span></label>
              <input
                placeholder="Enter github username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Content>
     
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
  );
}

export default AddUserName;




























