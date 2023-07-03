import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import Sidebar from '../../SideBar/SideBar';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AddUserProject from '../Create/addUserProject'; 
import './Read.css';



function ProjectPms({ open, onClose,projectId,projectName }) {
  const [pms, setPms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  // const { projectId } = location.state || {};
  //    const {projectName}= location.state|| {};
  // const projectIdd=projectId
  // let projectIddd=projectIdd
  console.log(projectName)
  console.log(projectId)

  const navigate = useNavigate();

//   useEffect(() => {
//     getPms();
//   }, []);


//   const getPms = async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users`);
//       setPms(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

useEffect(() => {
    const getPms = async () => {
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

    getPms();
  }, [projectId]);



  const deletePm = async (userId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`);
      setShowConfirmDialog(false);
      pms();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPm = () => {
    console.log('proo',projectName)
          navigate('/addPmProject', { state: { projectId, projectName } });
  };



  return (
   
    <Modal open={open} onClose={onClose} style={{ top: '170px', height: '300px', width: '700px' }} className="centered-modal1">
      <Modal.Header style={{top:'80px'}}>Add PM to Project
      <Button  color="green" floated="right" onClick={handleAddPm}>
              Add PM
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
                {pms && pms.length > 0 ? (
                  pms.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
              <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
  <DialogBox
      show={showConfirmDialog === user.id}
      onClose={() => setShowConfirmDialog(null)}
       onConfirm={()=>deletePm(user.id)}/> </td>
                     
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

export default ProjectPms;


