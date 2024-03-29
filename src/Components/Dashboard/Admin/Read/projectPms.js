
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl, gitAccessToken } from '../../../../Assets/config';
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';

import './Read.css';

function ProjectPms({ open, onClose,projectId,projectName }) {
  const [pms, setPms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
   const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const[repo, setRepo]= useState([])
  const[repoName, setRepoName]=useState('')
  const[username, setUserName]=useState('')
  
  
  console.log(projectName)
  console.log(projectId)
  const navigate = useNavigate();
const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users/project_manager`);
      setPms(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
   useEffect(() => {
    getUsers();
  }, [projectId]);
  useEffect(() => {
    loadRepo();
  }, [projectId]);

  const loadRepo = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`);
     
      const repoo=response.data
      setRepoName(repoo[0].name)
      console.log(repoName)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadRepo();
  }, [projectId]);
   const handleAddEmployee = () => {
    navigate('/addPmProject', { state: { projectId, projectName } });
  };
   const handleSubmit = (userId, username) => {
    setSelectedUserId(userId);
    setShowConfirmDialog(true);
    setUserName(username)
    console.log(username);
    console.log(repoName);
  };
  const handleConfirmDelete = async () => {
    try {
      console.log('repo',repoName)
      console.log('username', username)
      const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
        phoneNumber: '+91 8884763231',
      });
      if (otpResponse.data === 'OTP sent') {
        setShowConfirmDialog(false);
        setShowOTPMoal(true);
      } else if(otpResponse.response===false){
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
    try{
    const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
      otp: otp,
    });
    if (otpSubmissionResponse.data ===true) {
      await api.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${selectedUserId}/repo`,{ data: {
        owner: 'Bindushree-0906',
        repo: repoName,
        username: username,
        accessToken: gitAccessToken
      }});
      getUsers();
      setShowOTPMoal(false);
    } else if(otpSubmissionResponse.data===false) {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  }
  catch(error){
    console.log(error)
    setErrorMessage('Something went wrong, please try again')
  }
  };
  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };
  const handleModalClose = () => {
    onClose();
  };
  return (
    <Modal open={open} onClose={handleModalClose} style={{ top: '170px', height: 'auto', width: '670px' }} className="centered-modal1">
      <Modal.Header style={{top:'80px'}}>Project Manager
      <Button  color="green" floated="right" onClick={handleAddEmployee}>
              Add PM
            </Button>
      </Modal.Header>
      <Modal.Content>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>PM Name</th>
                  <th>PM Email</th>
                  <th>gitHubUsername</th>
                  <th>Delete PM</th>
                </tr>
              </thead>
              <tbody>
                {pms && pms.length > 0 ? (
                  pms.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.gitHubUsername ? user.gitHubUsername : '--'}</td>
                      <td>
              <button className='btn btn-danger mx-2' onClick={() =>  handleSubmit(user.id,user.gitHubUsername)}><FontAwesomeIcon icon={faTrash} /> </button>
                 </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No PM found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleModalClose}>Close</Button>
      </Modal.Actions>
      {/* OTP Modal */}
      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP sent to '+91 8884763231'</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP</label>
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
      {/* Confirm Delete Dialog */}
      <DialogBox show={showConfirmDialog} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
    </Modal>
  );
}
export default ProjectPms;