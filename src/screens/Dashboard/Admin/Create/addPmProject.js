import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../network/api';
import { ngrokUrl } from '../../../../network/config';
import './Create.css';

function AddPmProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, projectName } = location.state || {};
  const [selectedUser, setSelectedUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpp, setotpp] = useState('');
  const [user, setUsers] = useState([]);

  const fetchPms = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/users/withoutProject?role=project_manager&projectId=${projectId}`);
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
    fetchPms();
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
      const otpResponse = await api.post(`https://${ngrokUrl}/OTP/send`, {
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
      const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/OTP/verify`, {
        otp: otpp,
      });

      if (otpSubmissionResponse.status === 200) {
         await api.put(`https://${ngrokUrl}/projects/${projectId}/users/${userId}`, {
          projectId: projectId,
          userId: userId,
        });

        navigate('/AdminDashboard');
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal open onClose={onClose} style={{ width: '500px', height:'400px'}} className='create-Project-Modal'>
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add PM to project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
            <input name="name" placeholder={projectName} readOnly />
            <br />
          </Form.Field>
          <Form.Field>
            <label>PM<span style={{ color: 'red' }}>*</span></label>
            <Dropdown placeholder="Select PM" fluid selection options={user} onChange={handleUserChange} />
          </Form.Field>

          <Button type="submit" primary onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>

      {/* OTP Modal */}
      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to +91 9928931610</label>
              <input type="text" name="otp" onChange={(e) => setotpp(e.target.value)} />
            </div>
            <p>{errorMessage}</p>
            <Button type="submit" primary>
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

export default AddPmProject;