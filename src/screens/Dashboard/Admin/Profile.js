import React ,{useState, useEffect} from 'react'
import Sidebar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './profile.css'
import api from '../../../network/api';
import { NGROK_URL } from '../../../network/config';
import logger from '../../../utils/logger.js';
const Profile = () => {
  let profileData = sessionStorage.getItem("item");
  let pdata = profileData?JSON.parse(profileData):null;
 
  
  const[userName, setUserName]=useState('')
  const[userRole, setUserRole]=useState('')
 
  let id = null;
  let pemail = null;
  if(pdata !== null)
  {
    id=pdata.id;
    pemail=pdata.email;
  }  
  
   
  
  useEffect(() => {
    fetchUserList();
   
  }, []);

  
  async function fetchUserList() {
    try {
      const response = await api.get(`https://${NGROK_URL}/users/${id}`);
      const userData=response.data
     
      setUserName(userData.name)
      logger.info(userName)
      setUserRole(userData.enumRole)
      logger.info(userRole)
     
    } catch (error) {
      logger.error('Error fetching user project list:', error);
    }
  }
    return (
          <div className='parent-admi'>
              <Sidebar/>
            <div className='admin-chil'>
               <div className="profile-paren">
                 <div className="profile-details">
                   <div className="profile-imag">
                 
                
                    <h1>PROFILE</h1>
                    <FontAwesomeIcon icon={faUser} size="7x" />
                    <div className='profile-chil'>
                    <b>Name</b>
                    <p>{userName}</p>
                    <b>Email</b>
                    <p>{pemail}</p>
                    <b>Role</b>
                    <p>{userRole}</p>
                    <b>ID</b>
                    <p>{id}</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
     
          </div>
    );
  };
export default Profile