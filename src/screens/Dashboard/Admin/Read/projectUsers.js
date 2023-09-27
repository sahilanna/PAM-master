import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import api from '../../../../network/api';
import { ngrokUrl, gitAccessToken } from '../../../../network/config';
import { owner } from '../../../../Assets/constants/string';
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Read.css';
import { useNavigate } from 'react-router-dom';

function ProjectUsers({ open, onClose, projectId, projectName }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const[repoName, setRepoName]=useState('')
  const[username, setUserName]=useState('')
  const navigate = useNavigate();
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${ngrokUrl}/projects/${projectId}/users/user`);
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  console.log(isLoading);
  useEffect(() => {
    getUsers();
  }, [projectId]);
  useEffect(() => {
    loadRepo();
  }, []);
  const loadRepo = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/repositories/project/${projectId}`, {});
    const repo=response.data
      setRepoName(repo[0].name)
      console.log(repoName)
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddEmployee = () => {
    navigate('/addUserProject', { state: { projectId, projectName } });
  };
  const handleSubmit = (userId, username) => {
    setSelectedUserId(userId);
    setUserName(username)
    console.log('username',username)
    console.log('repo', repoName)
    setShowConfirmDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const otpResponse = await api.post(`https://${ngrokUrl}/OTP/send`, {
        phoneNumber: '+91 9928931610',
      });
      console.log(otpResponse)
      if ( otpResponse.data==='OTP sent') {
        setShowConfirmDialog(false);
        setShowOTPMoal(true);
      } else if(otpResponse.response===false) {
        console.log('OTP generation failed');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    console.log(repoName)
    try{
    const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/OTP/verify`, {
      otp: otp,
    });
    console.log(otpSubmissionResponse)
    if (otpSubmissionResponse.data ===true) {
      await api.delete(`https://${ngrokUrl}/projects/${projectId}/users/${selectedUserId}/repo`, {
        data: {
          owner: owner,
          repo: repoName,
          username: username,
          accessToken: gitAccessToken
        }
      });
      getUsers();
      setShowOTPMoal(false);
    }
     else if(!otpSubmissionResponse.data) {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  }
  catch(error){
    console.log('Error:', error);
    setErrorMessage('something went wrong, Please try again.');
  }
}
  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };
  
  return (
   <div> 
     <div className="button-add-user">
        <Button color="blue" floated="left" onClick={handleAddEmployee}>
          Add User
        </Button>
        </div>
        
      <table className="ui celled table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Github Username</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gitHubUsername ? user.gitHubUsername : '--'}</td>
                <td>
                  <button className="btn btn-danger mx-2" onClick={() => handleSubmit(user.id, user.gitHubUsername)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to '+91 9928931610'</label>
              <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
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
      <DialogBox show={showConfirmDialog} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
    </div>
  );
}
export default ProjectUsers;



















