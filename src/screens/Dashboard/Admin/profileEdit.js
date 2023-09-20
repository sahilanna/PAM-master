
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import api from '../../../network/api';
import './profile.css'
import { useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../network/config';
const ProfileEdit = ({ profileData, onUpdate , onClose}) => {
  const [pname, setPName] = useState(profileData.name);
  const [pemail, setPEmail] = useState(profileData.email);
  const [prole, setPRole] = useState(profileData.enumRole);
  let profileDataa = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileDataa);

  console.log(profileDataa)
  const id=pdata.id
  const navigate=useNavigate()
  useEffect(() => {
    fetchUserList();
   
  }, []);
  async function fetchUserList() {
    try {
      const response = await api.get(`https://${ngrokUrl}/users/${id}`);
     
     
    } catch (error) {
      console.log('Error fetching user project list:', error);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProfileData = {
        name: pname,
      
        enumRole: prole,
      };

      try {
        const response = await api.put(`https://${ngrokUrl}/users/update/${id}`, updatedProfileData);
        if (response) {
          onUpdate(updatedProfileData);
          fetchUserList()
        } else {
          console.error('Failed to update profile data');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
  };
  const handleCloseModal = () => {
    onClose();

  };
  return (
    <Modal open={true} onClose={handleCloseModal} style={{ width: '500px' }} className='create-Project-Modal'>
      {/* Modal content */}
      <Modal.Header>Edit Profile
      <div style={{paddingLeft:'400px'}}>
        <Button onClick={handleCloseModal}>X</Button>
        </div>
      </Modal.Header>
    
      
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