import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';
import NavBarA from '../NavbarA';

function AddUserProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const { projectName } = location.state || {};
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userId, setUserId] = useState('');
  const [clicked, setClicked] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/role/user`);
      const projUsers = response.data.map(projU => ({
        key: projU.id,
        text: projU.name,
        value: projU.id
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
    const selectedUserObj = users.find(userObj => userObj.value === value);

    if (selectedUserObj) {
      const selectedUserId = selectedUserObj.value;
      setUserId(selectedUserId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    try {
      // Step 1: Send OTP API call
      const otpResponse = await api.post(`https://${ngrokUrl}/api/send-otp`, {
        userId: userId // Pass the userId or any necessary data
      });

      // Assuming the response contains a success status and an OTP token
      const { success, otpToken } = otpResponse.data;

      if (success) {
        // Step 2: Show OTP dialog and get user input
        const enteredOtp = prompt('Please enter the OTP:');
        
        // Step 3: Verify OTP API call
        const otpVerificationResponse = await api.post(`https://${ngrokUrl}/api/verify-otp`, {
          otpToken: otpToken,
          otp: enteredOtp
        });

        // Assuming the response contains a success status after OTP verification
        const { success: otpVerificationSuccess } = otpVerificationResponse.data;

        if (otpVerificationSuccess) {
          // Step 4: Add user to project API call
          const addUserResponse = await api.put(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`);
          
          // Navigate to AdminDashboard if API call is successful
          navigate('/AdminDashboard');
        } else {
          console.log('OTP verification failed');
        }
      } else {
        console.log('Failed to send OTP');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}>
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
            <input name='name' placeholder={projectName} readOnly />
            <br />
          </Form.Field>
          <Form.Field>
            <label>User</label>
            <Dropdown
              placeholder="Select User"
              fluid
              selection
              options={users}
              onChange={handleUserChange}
            />
          </Form.Field>
          <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default AddUserProject;




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
//     // setItem(value)
//     // setSelectedUser(value);
//     // console.log(selectedUser)
//     // console.log(user)
//     // console.log(user[0].value)
//     // userId=user[0].value
//     // setuserId(user[0].value)
//     // console.log("hi",userId)
//     setItem(value);
//     setSelectedUser(value);
//     const selectedUserObj = user.find(userObj => userObj.value === value);
  
//     if (selectedUserObj) {
//       const selectedUserId = selectedUserObj.value;
//       setuserId(selectedUserId);
//       console.log(selectedUserId);

//   };
// }
//     console.log("hi",userId)
//     const handleSubmit=async (e)=>{
//         e.preventDefault();
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
//             <Button type='submit' onClick={handleSubmit}>Submit</Button>
//       </Form>
//       </Modal.Content>
//       <Modal.Actions>
//       </Modal.Actions>
//       </Modal>
//   )
// }
// export default AddUserProject