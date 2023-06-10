import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import Sidebar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './profile.css'

const Profile = () => {

  return (
    <div className='parent-admi'>  
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <Sidebar/>
      </div>
      <div className='admin-chil'>
        <div className="profile-paren">
          <div className="profile-details">
            <div className="profile-imag">
              <h1>PROFILE</h1>
              <FontAwesomeIcon icon={faUser} size="7x" />
          
              <div className='profile-chil'>
              {/* <label>Name</label>   */}
              <b>Name</b>
              <p>Sahil</p>

              <b>Email</b>
              <p>sahil@gmail.com</p>
              <b>Role</b>
              <p>Admin</p>
              <b>ID</b>
              <p>203</p>
              
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
    // return (
    //   <div className='parent-admin'>  
    //   <div style={{ height: '100vh', overflow: 'scroll initial' }}>
    //   <Sidebar/>
    //   </div>
    //    <div className='admin-child'>
       
    //    <div className="profile">
      
    //   <div className="profile-image">
    //       <FontAwesomeIcon icon={faUser} size="5x" />
    //     </div>
    //     <div className="profile-details">
    
    //     <h2 className="profile-name">Name:Hi</h2>
    //       <p className="profile-age">email:Hi@gmail.com </p>
    //       <p className="profile-role">Role:Admin </p>
    //       <p className="profile-id">Id:2</p>
      
    //   </div>
    // </div>
    //   </div>
    //   </div>
      
      
    // );
  };

export default Profile