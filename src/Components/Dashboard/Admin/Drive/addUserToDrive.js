import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import api from '../../api';
import { Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';


const AddUserToSharedDrive = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('reader');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const sharedDriveId = '0AIk_XUpk9hxbUk9PVA?q=parent:0AIk_XUpk9hxbUk9PVA';
  const roles = [
    { key: 'organizer', text: 'Organizer', value: 'organizer' },
    { key: 'fileOrganizer', text: 'File Organizer', value: 'fileOrganizer' },
    { key: 'writer', text: 'Writer', value: 'writer' },
    { key: 'commenter', text: 'Commenter', value: 'commenter' },
    { key: 'reader', text: 'Reader', value: 'reader' },
  ];
  const auth = JSON.parse(sessionStorage.getItem("item"));
 const token = auth.token;

  const handleAddUser = async () => {
    try {
      setLoading(true);
      // Make a POST request to the Google Drive API to add the user to the shared drive
      const response = await api.post(
        `https://www.googleapis.com/drive/v3/drives/${sharedDriveId}/members`,
        {
          email: email,
          role: role,
          sendNotificationEmail: true,
          emailMessage: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

     

      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };
  const onClose=()=>{
    navigate(-1)
  }

  return (
    <Modal open={true} onClose={onClose}  style={{ width: '800px' }} className='create-Project-Modal'>
    <Modal.Header>Add User to Shared Drive  <div style={{paddingLeft:'692px'}}> <Button secondary onClick={onClose}>
          X
        </Button></div></Modal.Header>
    <div style={{paddingLeft:'792px'}}>
     
        </div>
        <Modal.Content>
        <Form>
    <Form.Field>
      <label>Email Address:</label>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Form.Field>
    <Form.Field>
      <label>Role:</label>
      <Select
        value={role}
        onChange={(e, { value }) => setRole(value)}
        options={roles}
      />
    </Form.Field>
    <Form.Field>
      <label>Email Message (optional):</label>
      <input type="text" id="Description" value={message} required onChange={(e)=>setMessage(e.target.value) }/>
     
    </Form.Field>
    <Button primary loading={loading} onClick={handleAddUser}>
      Add User
    </Button>
  </Form>
  </Modal.Content></Modal>
    
  );
};

export default AddUserToSharedDrive;
