import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import UserSidebar from './userSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './profile.css'

const UserProfile = () => {

  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);
  console.log(profileData)
  const id=pdata.id
  const pname=pdata.name;
  const pemail=pdata.email;
  const prole=pdata.role;
  console.log(pname)

    return (
      <div className='parent-admin'>
        
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        
       
    
   <UserSidebar/>


     
      </div>
       <div className='admin-child'>
       

        <br/>
      <div className="box">
        <br/>
      <div className="profile-image">
          <FontAwesomeIcon icon={faUser} size="5x" />
        </div>
        <br/><br/>
        <h3>Name: {pname}</h3><hr/>
        <h3>Email: {pemail}</h3><hr/>
        <h3>Role: {prole}</h3><hr/>
        <h3>Id: {id}</h3>

        
        {/* <div className="profile-details">
          <h2 className="profile-name">Name: {pname}</h2>
          <p className="profile-age">email: {pemail}</p>
          <p className="profile-role">Role:{prole} </p>
          <p className="profile-id">Id:{id} </p>
        </div> */}
      </div>
    </div>
      </div>
    );
  };

export default UserProfile