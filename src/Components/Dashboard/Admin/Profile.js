import React ,{useState, useEffect} from 'react'
import { Card, Icon, Button} from 'semantic-ui-react';
import Sidebar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './profile.css'
import ProfileEdit from './profileEdit';
import api from '../api';
import { ngrokUrl } from '../../../Assets/config';


const Profile = () => {
  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const[userData, setUserData]=useState('')
  const[userName, setUserName]=useState('')
  const[userRole, setUserRole]=useState('')
  console.log(profileData)
  const id=pdata.id
  const pname=pdata.name;
  const pemail=pdata.email;
  const prole=pdata.enumRole;
  useEffect(() => {
    fetchUserList();
   
  }, []);

  const handleProfileUpdate = (updatedProfile) => {
    console.log('Updated Profile:', updatedProfile);
    setIsEditModalOpen(false);
  };
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  
  async function fetchUserList() {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/${id}`);
      const userData=response.data
      // setUserData(response.data);
      setUserName(userData.name)
      console.log(userName)
      setUserRole(userData.enumRole)
      console.log(userRole)
     
    } catch (error) {
      console.log('Error fetching user project list:', error);
    }
  }
    return (
          <div className='parent-admi'>
              <Sidebar/>
            <div className='admin-chil'>
               <div className="profile-paren">
                 <div className="profile-details">
                   <div className="profile-imag">
                   {/* <Button onClick={handleOpenEditModal} className="edit-button">Edit</Button> */}
                
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
      {isEditModalOpen && (
        <ProfileEdit profileData={pdata} onUpdate={handleProfileUpdate} onClose={handleCloseEditModal} />
      )}
          </div>
    );
  };
export default Profile