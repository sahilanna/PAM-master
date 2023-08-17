import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import api from '../api';

const ProfileEdit = ({ profileData, onUpdate }) => {
  const [pname, setPName] = useState(profileData.name);
  const [pemail, setPEmail] = useState(profileData.email);
  const [prole, setPRole] = useState(profileData.enumRole);

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProfileData = {
        name: pname,
        email: pemail,
        enumRole: prole,
      };

      try {
        
        const response = await api.put('YOUR_API_ENDPOINT', updatedProfileData);
  
        if (response) {
         
          onUpdate(updatedProfileData);
        } else {
         
          console.error('Failed to update profile data');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    
  };

 
  const handleCloseModal = () => {
   
    
  };

  return (
    <Modal open={true} onClose={handleCloseModal} style={{ width: '500px' }} className='create-Project-Modal'>
      {/* Modal content */}
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input type='text' value={pname} onChange={(e) => setPName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type='text' value={pemail} onChange={(e) => setPEmail(e.target.value)} disabled/>
          </Form.Field>
          <Form.Field>
            <label>Role</label>
            <input type='text' value={prole} onChange={(e) => setPRole(e.target.value)} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ProfileEdit;
