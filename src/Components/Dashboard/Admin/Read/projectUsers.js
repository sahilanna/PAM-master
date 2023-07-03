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



function ProjectUsers({ open, onClose,projectId,projectName }) {
  const [users, setUsers] = useState([]);
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

  

  // const getUsers = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users`);
  //     setUsers(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  useEffect(() => {
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

    getUsers();
  }, [projectId]);



  const deleteUser = async (userId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${userId}`);
      setShowConfirmDialog(false);
      users();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEmployee = () => {
    console.log('proo',projectName)
          navigate('/addUserProject', { state: { projectId, projectName } });
  };

  return (
   
    <Modal open={open} onClose={onClose} style={{ top: '170px', height: '300px', width: '700px' }} className="centered-modal1">
      <Modal.Header style={{top:'80px'}}>Add Employee to Project
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





// import React from 'react'
// import { useState, useEffect } from 'react';
// import { ngrokUrl } from '../../../../Assets/config';
// import LoadingPage from '../../../../Assets/Loader/LoadingPage';
// import Sidebar from '../../SideBar/SideBar';
// import api from '../../api';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './projectUsers.css'
// import DialogBox from '../../DialogBox/DialogBox';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// function ProjectUsers() {
//     const { state } = useNavigate();
//   const location = useLocation();
//   const { projectId } = location.state || {};
//   const {projectName}= location.state|| {};
//   console.log(projectName)
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
//     const navigate=useNavigate()
//     const getUrl =  `https://${ngrokUrl}/api/projects/${projectId}/users`;
//     const[item,setItem]=useState([])
//     const[isLoading,setIsLoading]=useState(false)

//     let data = sessionStorage.getItem("item");
//     let user = JSON.parse(data);
//     const accessToken=user.token
//       const headers={AccessToken:accessToken}

//     const deleteUser = async (id) => {
//         await axios.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${id}`,{headers});
//         navigate('/projectUsers')
//         setShowConfirmDialog(false);
//         userList();
//         navigate('/projectUsers')
//       };

//     const createOnclick=()=>{
//         console.log('proo',projectName)
//         navigate('/addUserProject', { state: { projectId, projectName } });
//     }

    


//     const userList = async () => {
//         const result = await api.get(getUrl) .then((result) => {
//             setItem(result.data);
//             setIsLoading(false);
//           })
//           .catch((error)=>{
//             console.log(error,'hi');
//             setIsLoading(true);
//           })
//         };
//         useEffect(() => {
//             userList();
//           }, []);
//   return (
//     <div className='parent-admin'>
//       <Sidebar/>
    
//     <div className='admin-child'>
//     <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
      
      
           
//               <div style={{ marginTop: '20px' }}>
//                 <button className='ui button' onClick={()=>createOnclick(item.projectId,item.projectName)}>Add Employee</button>
               
//               </div>
            
        
//       </div>

//       <div style={{marginLeft:'20px',marginRight:'30px'}}>
//       {isLoading ? (
//               <LoadingPage />
//             ) : (
//       <table class="ui celled table">
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>User Name</th>
//               <th>User Email</th>
//               <th>Delete User</th>
//               </tr>
//               </thead>
//               <tbody>
//               {item && item.length > 0 ? (
//           item.map((user, index) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//               <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
//     <DialogBox
//      show={showConfirmDialog === user.id}
//       onClose={() => setShowConfirmDialog(null)}
//       onConfirm={()=>deleteUser(user.id)}/> </td>
//             </tr>
//           ))
//           ) : (
//             <tr>
//               <td colSpan='4'>No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     )}
//   </div>
// </div>
// </div>
//   )
// }
// export default ProjectUsers;

