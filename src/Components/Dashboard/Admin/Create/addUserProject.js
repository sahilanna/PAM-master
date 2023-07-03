
// OTP PART
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!selectedUser) {
//     return;
//   }
  
//   setClicked(true);
  
//   try {
//     // 1. Hit the API to send OTP
//     const otpResponse = await api.post(`https://${ngrokUrl}/api/send-otp`, {
//       projectId: projectId,
//       userId: userId
//     });
    
//     // 2. Display dialog box asking for OTP submission
//     const otp = prompt('Enter OTP');
    
//     // 3. Hit the API to submit OTP
//     const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/submit-otp`, {
//       projectId: projectId,
//       userId: userId,
//       otp: otp
//     });
    
//     // 4. Hit the API to add the user to the project
//     const addUserResponse = await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`);
    
//     navigate('/AdminDashboard');
//   } catch (error) {
//     console.log('Error:', error);
//   }
// };


import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';
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
      const response = await api.get(`https://${ngrokUrl}/api/users/role/user`);
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
        phoneNumber: '+91 7032051235',
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

      if (otpSubmissionResponse.status === 200) {
        const addUserResponse = await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`, {
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
    <Modal open onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}>
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add User to project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project-Name</label>
            <input name="name" placeholder={projectName} readOnly />
            <br />
          </Form.Field>
          <Form.Field>
            <label>User</label>
            <Dropdown placeholder="Select User" fluid selection options={user} onChange={handleUserChange} />
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
              <label>OTP</label>
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

export default AddUserProject;


//Before Cancel Button
// import React, { useState, useEffect } from 'react';
// import { Form, Button, Modal, Dropdown } from 'semantic-ui-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import api from '../../api';
// import { ngrokUrl } from '../../../../Assets/config';
// import './Create.css';

// function AddUserProject() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { projectId } = location.state || {};
//   const { projectName } = location.state || {};
//   const [selectedUser, setSelectedUser] = useState('');
//   const [userId, setUserId] = useState('');
//   const [showOTPMoal, setShowOTPMoal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const[otpp,setotpp]=useState()

//   const [user, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/users/role/user`);
//       const projUsers = response.data.map((projU) => ({
//         key: projU.id,
//         text: projU.name,
//         value: projU.id,
//       }));
//       setUsers(projUsers);
//     } catch (error) {
//       console.log('Error fetching Users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleUserChange = (event, { value }) => {
//     setSelectedUser(value);
//     const selectedUserObj = user.find((userObj) => userObj.value === value);
//     if (selectedUserObj) {
//       const selectedUserId = selectedUserObj.value;
//       setUserId(selectedUserId);
//     }
//   };

//   const handleOTPClose = () => {
//     setShowOTPMoal(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedUser) {
//       return;
//     }

//     try {
//       const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
//         phoneNumber: '+91 7032051235',
//       });
   
     
//       console.log(otpResponse)

//       setShowOTPMoal(true);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();
    
//     // console.log(otp)
   
//     try {
      
//       const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
//         otp: otpp,
//       })
    
      

//       if (otpSubmissionResponse.status === 200) {
//         const addUserResponse = await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`, {
//           projectId: projectId,
//           userId: userId,
//         });

//         navigate('/AdminDashboard');
//       } else {
//         setErrorMessage('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       setErrorMessage('Invalid OTP. Please try again.');
//     }
//   };

//   const onClose = () => {
//     navigate(-1);
//   };

//   return (
//     <Modal open onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}>
//       <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
//       <div style={{ paddingLeft: '442px' }}>
//         <Button secondary onClick={onClose}>
//           X
//         </Button>
//       </div>
//       <Modal.Header>Add User to project</Modal.Header>
//       <Modal.Content>
//         <Form onSubmit={handleSubmit}>
//           <Form.Field>
//             <label style={{ textAlign: 'left' }}>Project-Name</label>
//             <input name="name" placeholder={projectName} readOnly />
//             <br />
//           </Form.Field>
//           <Form.Field>
//             <label>User</label>
//             <Dropdown placeholder="Select User" fluid selection options={user} onChange={handleUserChange} />
//           </Form.Field>

//           <Button type="submit" primary onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Form>
//       </Modal.Content>
//       <Modal.Actions></Modal.Actions>

//       {/* OTP Modal */}
//       <div>
//   <Modal open={showOTPMoal} onClose={handleOTPClose} style={{width:'500px' }} className="centered-modal-OTP">
//     <Modal.Header>Enter OTP</Modal.Header>
//     <Modal.Content>
//       <Form onSubmit={handleOTPSubmit}>
//         <div className="form-field">
//           <label>OTP</label>
//           <input type="text" name="otp" onChange={(e) => setotpp(e.target.value)} />
//         </div>
//         <p>{errorMessage}</p>
//         <Button type="submit" primary>
//           Submit OTP
//         </Button>
//       </Form>
//     </Modal.Content>
//   </Modal>
// </div>


//     </Modal>
//   );
// }

// export default AddUserProject;






























// import React from 'react'
// import { useState,useEffect } from 'react';
// import {Form, Button, Modal, Dropdown} from 'semantic-ui-react'
// import NavBarA from '../NavbarA';
// import { useNavigate, useLocation } from 'react-router-dom';
// import api from '../../api';
// import { ngrokUrl } from '../../../../Assets/config';

// function AddUserProject() {
    
//     const navigate = useNavigate();
//     const { state } = useNavigate();
//     const location = useLocation();
//     const { projectId } = location.state || {};
//     const {projectName}= location.state|| {};
//     let[item,setItem]=useState('')
//     let[user,setUsers]=useState([])
//     // const [projectId, setProjectId] = useState('');
//     // const [projectName, setProjectName] = useState('');
//     const [projectDescription, setProjectDescription] = useState('');
//     const [clicked, setClicked] = useState(false);
//      let [selectedUser, setSelectedUser] = useState('');
//      let[userId,setuserId]=useState('')
//      console.log(projectId)

//       const fetchUsers = async () => {
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/users/role/user`);
//      const projUsers = response.data.map(projU => ({
//         key: projU.id,
//         text: projU.name,
//         value: projU.id
//       }));
//       setUsers(projUsers)
      
//     } catch (error) {
//       console.log('Error fetching Users:', error);
//     }
//   };


//   useEffect(() => {
//     fetchUsers();
//   }, []);
//    const handleUserChange = (event, { value }) => {
//     setItem(value);
//     setSelectedUser(value);
//     const selectedUserObj = user.find(userObj => userObj.value === value);
//     if (selectedUserObj) {
//       const selectedUserId = selectedUserObj.value;
//       setuserId(selectedUserId);
//       console.log(selectedUserId);
//     }
  
//   };

  
//     console.log("hi",userId)
//     const handleSubmit=async (e)=>{
        
//         e.preventDefault();
//         if(!selectedUser)
//         {
//           return ;
//         }
//         setClicked(true);
//         try{
//             // console.log("hi",userId)
//         const response = await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`)
//         navigate('/AdminDashboard')
//         } catch(error){
//             console.log('error',error)
//         }
//       }
//   const onClose=()=>{
//   navigate(-1);

  
//   }
  
  
//   return (
//     <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
//     <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
//       </div>
//       <div style={{paddingLeft:'442px'}}>
//     <Button secondary onClick={onClose}>
//         X
//       </Button>
//       </div>
//     <Modal.Header>Add User to project</Modal.Header>
//         <Modal.Content>
//         <Form onSubmit={handleSubmit}>
//             <Form.Field>
//               <label style={{ textAlign: 'left' }}>Project-Name</label>
//               <input name='name'  placeholder={projectName} readOnly />
            
//             <br />
//             </Form.Field>
//              <Form.Field>
//             <label>User</label>
//             <Dropdown
//               placeholder="Select User"
//               fluid
//               selection
//               options={user}
             
//               onChange={handleUserChange}
//             />
//             </Form.Field>
            
//             <Button type='submit' primary disabled={!selectedUser} onClick={handleSubmit}>Submit</Button>
//       </Form>
//       </Modal.Content>
//       <Modal.Actions>
//       </Modal.Actions>
//       </Modal>
//   )
// }

// export default AddUserProject



































































// function AddUserProject({ projectId, projectName, onClose }) {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await api.get(`https://${ngrokUrl}/api/users`);
//         setUsers(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUsers();
//   }, []);

//   const handleSelectUser = (event, data) => {
//     setSelectedUser(data.value);
//   };

//   const handleAddUser = async () => {
//     if (!selectedUser) {
//       setErrorMessage('Please select a user.');
//       return;
//     }

//     try {
//       const payload = { projectId, userId: selectedUser };
//       await api.post(`https://${ngrokUrl}/api/projects/${projectId}/users`, payload);
//       setSuccessMessage('User added successfully.');
//       onClose();
//     } catch (error) {
//       console.log(error);
//       setErrorMessage('Failed to add user. Please try again.');
//     }
//   };

//   return (
//     <Form success={!!successMessage} error={!!errorMessage} onSubmit={handleAddUser}>
//       <Form.Field>
//         <label>Project Name</label>
//         <p>{projectName}</p>
//       </Form.Field>
//       <Form.Field>
//         <label>Select User</label>
//         <Form.Select options={users.map((user) => ({ value: user.id, text: user.name }))} onChange={handleSelectUser} placeholder="Select User" />
//       </Form.Field>
//       <Message success content={successMessage} />
//       <Message error content={errorMessage} />
//       <Button type="submit" primary>
//         Add User
//       </Button>
//       <Button onClick={onClose}>Cancel</Button>
//     </Form>
//   );
// }

// export default AddUserProject;


