import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl, gitAccessToken } from '../../../../Assets/config';
import './Create.css';

function AddUserProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, projectName } = location.state || {};
  const [selectedUser, setSelectedUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpp, setotpp] = useState('');
  const [user, setUsers] = useState([]);
  

  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/withoutProject?role=user&projectId=${projectId}`);
      const projUsers = response.data.map((projU) => ({
        key: projU.id,
        text: projU.name,
        value: projU.id,
      }));
      setUsers(projUsers);
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserChange = (event, { value }) => {
    setSelectedUser(value);
    const selectedUserObj = user.find((userObj) => userObj.value === value);
    if (selectedUserObj) {
      const selectedUserId = selectedUserObj.value;
      setUserId(selectedUserId);
    }
  };

  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    try {
      const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
        phoneNumber: '+91 9928931610',
      });

      console.log(otpResponse);

      setShowOTPMoal(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };



  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
        otp: otpp,
      });
      console.log(otpSubmissionResponse.data)

      if (otpSubmissionResponse.data === true) {
         await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`, {
          projectId: projectId,
          userId: userId,
        });
       navigate('/adminDashboard')

       
        
      } else if(otpSubmissionResponse.data===false){
        setErrorMessage('Invalid OTP. Please try again.');
        console.log(otpSubmissionResponse.response)
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('something went wrong');
      console.log(errorMessage)
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal open onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{paddingTop: '6px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add User to project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
            <input name="name" placeholder={projectName} readOnly />
            <br />
          </Form.Field>
          <Form.Field>
            <label>User<span style={{ color: 'red' }}>*</span></label>
            <Dropdown placeholder="Select User" fluid selection options={user} onChange={handleUserChange} />
          </Form.Field>

          <Button type="submit" primary onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>

      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to +919928931610'</label>
              <input type="text" name="otp" onChange={(e) => setotpp(e.target.value)} />
            </div>
            <p>{errorMessage}</p>
            <Button type="submit"  primary>
              Submit OTP
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleOTPClose}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </Modal>
  );
}

export default AddUserProject;


