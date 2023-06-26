import React from 'react'
import { useState, useEffect } from 'react';
import { ngrokUrl } from '../../../../Assets/config';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import Sidebar from '../../SideBar/SideBar';
import api from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import './Read.css'
import axios from 'axios';
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

function ProjectUsers() {

    const { state } = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const {projectName}= location.state|| {};
    const navigate=useNavigate()
    const getUrl =  `https://${ngrokUrl}/api/projects/${projectId}/users`;
    const[item,setItem]=useState([])
    const[isLoading,setIsLoading]=useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    let data = sessionStorage.getItem("item");
    let user = JSON.parse(data);
    const accessToken=user.token
   
  
      const headers={AccessToken:accessToken}
  

    const deleteUser = async (id) => {
        await axios.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${id}`,{headers});
        navigate('/projectUsers')
        setShowConfirmDialog(false);
        userList();
        navigate('/projectUsers')
      };
    const userList = async () => {
        const result = await api.get(getUrl) .then((result) => {
            setItem(result.data);
            setIsLoading(false);
                     
          })
          .catch((error)=>{
            console.log(error,'hi');
            setIsLoading(true);
          })
        };

        useEffect(() => {
            userList();
          }, []);
        
  return (
    <div className='parent-admin'>
    <div>
      <Sidebar/>
    </div>
   
    <div className='admin-child'>
    <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
      
         
     
      </div>
      </div>
      <div style={{marginLeft:'20px',marginRight:'30px'}}>
      {isLoading ? (
              <LoadingPage />
            ) : (
      <table class="ui celled table">
          
          <thead>
              <th>User ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Delete User</th>
              </thead>
              <tbody>
          {item.map((user, index) => (
            <tr>
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
          ))}
         
        </tbody>
              </table>
            )}
             
              </div>
              </div>
             
              
  )
}

export default ProjectUsers;