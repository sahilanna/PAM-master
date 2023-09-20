import React ,{useState, useEffect} from 'react'
import Sidebar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './profile.css'
import ProfileEdit from './profileEdit';
import api from '../../../network/api';
import { ngrokUrl } from '../../../network/config';


const Profile = () => {
  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const[userName, setUserName]=useState('')
  const[userRole, setUserRole]=useState('')
  console.log(profileData)
  const id=pdata.id
  
  const pemail=pdata.email;
  
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
      const response = await api.get(`https://${ngrokUrl}/users/${id}`);
      const userData=response.data
     
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