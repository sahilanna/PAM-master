import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import { ngrokUrl, gitAccessToken } from '../../../../Assets/config';
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Read.css';
import { useNavigate } from 'react-router-dom';
// function ProjectUsers({ open, onClose, projectId, projectName }) {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [showOTPMoal, setShowOTPMoal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [otp, setOtp] = useState('');
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const[repo, setRepo]= useState([])
//   const[repoName, setRepoName]=useState('')
//   const[username, setUserName]=useState('')
//   const navigate = useNavigate();
//   const getUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users/user`);
//       setUsers(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   const loadRepo = async () => {
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`);
//       const data = response.data;
  
//       if (data.length > 0) {
//         const name = data[0].name;
//         setRepo(data);
//         setRepoName(name);
//         console.log(repoName);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

//   const handleAddEmployee = () => {
//     navigate('/addUserProject', { state: { projectId, projectName } });
//   };
//   const handleSubmit = (userId, username) => {
//     console.log(repoName)
//     setSelectedUserId(userId);
//     setUserName(username)
//     console.log(username)
//     setShowConfirmDialog(true);
//   };
//   const handleConfirmDelete = async () => {
//     console.log(repoName)
//     console.log(repoName)
//     try {
//       const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
//         phoneNumber: '+91 8884763231',
//       });
//       console.log(otpResponse)
//       if ( otpResponse.data==='OTP sent') {
//         // setSelectedUserId(selectedUserId);
//         setShowConfirmDialog(false);
//         setShowOTPMoal(true);
//       } else if(otpResponse.response==false) {
//         console.log('OTP generation failed');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const owner="Bindushree-0906"
 
//   const handleCancelDelete = () => {
//     setShowConfirmDialog(false);
//   };
//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();
//     console.log(repoName)
//     try{
//       console.log('repo',repoName)
//     const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
//       otp: otp,
//     });
//     console.log(otpSubmissionResponse)
//     if (otpSubmissionResponse.data ==true) {
     
//       await api.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${selectedUserId}/repo`, {
//         data: {
//           owner: owner,
//           repo: repoName,
//           username: username,
//           accessToken: gitAccessToken
//         }
//       });
      
//       getUsers();
//       setShowOTPMoal(false);
//     }
//      else if(otpSubmissionResponse.data==false) {
//       setErrorMessage('Invalid OTP. Please try again.');
//     }
//   }
//   catch(error){
//     console.log('Error:', error);
//     setErrorMessage('something went wrong, Please try again.');
//   }
// }

// useEffect(() => {
//   loadRepo();
// }, []);

// useEffect(() => {
//   getUsers();
// }, [projectId]);

//   const handleOTPClose = () => {
//     setShowOTPMoal(false);
//   };
//   const handleModalClose = () => {
//     onClose();
//   };
//   return (
//     <Modal open={open} onClose={handleModalClose} style={{ top: '170px', height: 'auto', width: '700px' }} className="centered-modal1">
//       <Modal.Header style={{ top: '80px' }}>
//         Users
//         <Button color="green" floated="right" onClick={handleAddEmployee}>
//           Add Employee
//         </Button>
//       </Modal.Header>
//       <Modal.Content>
//         <div style={{ marginLeft: '20px', marginRight: '30px' }}>
//           {isLoading ? (
//             <LoadingPage />
//           ) : (
//             <table className="ui celled table">
//               <thead>
//                 <tr>
                 
//                   <th>User Name</th>
//                   <th>User Email</th>
//                   <th>gitHubUsername</th>
//                   <th>Delete User</th>
//                 </tr>
//               </thead>
//               <tbody>
//   {repoName && users.length > 0 ? (
//     users.map((user) => (
//       <tr key={user.id}>
//         <td>{user.name}</td>
//         <td>{user.email}</td>
//         <td>{user.gitHubUsername ? user.gitHubUsername : '--'}</td>
//         <td>
//           <button className="btn btn-danger mx-2" onClick={() => handleSubmit(user.id, user.gitHubUsername)}>
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="4">No users found</td>
//     </tr>
//   )}
// </tbody>            </table>
//           )}
//         </div>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button onClick={handleModalClose}>Close</Button>
//       </Modal.Actions>
//       {/* OTP Modal */}
//       <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
//         <Modal.Header>Enter OTP </Modal.Header>
//         <Modal.Content>
//           <Form onSubmit={handleOTPSubmit}>
//             <div className="form-field">
//               <label>OTP sent to '+918884763231'</label>
//               <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
//             </div>
//             <p>{errorMessage}</p>
//             <Button type="submit" primary>
//               Submit OTP
//             </Button>
//           </Form>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button onClick={handleOTPClose}>Cancel</Button>
//         </Modal.Actions>
//       </Modal>
//       {/* Confirm Delete Dialog */}
//       <DialogBox show={showConfirmDialog} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
//     </Modal>
//   );
// }
// export default ProjectUsers;

function ProjectUsers({ open, onClose, projectId, projectName }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const[repo, setRepo]= useState([])
  const[repoName, setRepoName]=useState('')
  const[username, setUserName]=useState('')
  const navigate = useNavigate();
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users/user`);
      setUsers(response.data);
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
  }, []);
  const loadRepo = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`, {});
      setRepo(response.data);
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
    console.log(username)
    setShowConfirmDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
        phoneNumber: '+91 8884763231',
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
  const owner="Bindushree-0906"
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    console.log(repoName)
    try{
    const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
      otp: otp,
    });
    console.log(otpSubmissionResponse)
    if (otpSubmissionResponse.data ===true) {
      await api.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${selectedUserId}/repo`, {
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
  const handleModalClose = () => {
    onClose();
  };
  return (
    <Modal open={open} onClose={handleModalClose} style={{ top: '170px', height: 'auto', width: '700px' }} className="centered-modal1">
      <Modal.Header style={{ top: '80px' }}>
        Users
        <Button color="green" floated="right" onClick={handleAddEmployee}>
          Add Employee
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
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>gitHubUsername</th>
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
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleModalClose}>Close</Button>
      </Modal.Actions>
    
      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to '+918884763231'</label>
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
    </Modal>
  );
}
export default ProjectUsers;









