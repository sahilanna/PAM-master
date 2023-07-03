import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ngrokUrl } from '../../../../Assets/config';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import Sidebar from '../../SideBar/SideBar';
import api from '../../api';
import axios from 'axios';
import {Modal,Button} from 'semantic-ui-react'
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ProjectUsers({ open, onClose,projectId,projectName }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const[idProject, setIdProject]=useState('')
  // const { projectId } = location.state || {};
  //    const {projectName}= location.state|| {};
  // const projectIdd=projectId
  // let projectIddd=projectIdd

  console.log(projectName)
  console.log(projectId)
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users`);
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const deleteUser = async (userId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`);
      setShowConfirmDialog(false);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddEmployee = () => {
    console.log('proo',projectName)
          navigate('/addUserProject', { state: { projectId, projectName } });
  };
  return (
    <Modal open={open} onClose={onClose} className="centered-modal1">
      <Modal.Header>Add Employee to Project
      <Button  color="green" floated="right" onClick={handleAddEmployee}>
              Add Employee
            </Button>
      </Modal.Header>
      <Modal.Content>
        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div style={{ marginTop: '20px' }}>
            <Button  color="green" floated="right" onClick={handleAddEmployee}>
              Add Employee
            </Button>
          </div>
        </div> */}
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
              <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
  <DialogBox
      show={showConfirmDialog === user.id}
      onClose={() => setShowConfirmDialog(null)}
       onConfirm={()=>deleteUser(user.id)}/> </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
          <Button onClick={onClose}>Close</Button>
        </Modal.Actions>
    </Modal>
  );
}
export default ProjectUsers;