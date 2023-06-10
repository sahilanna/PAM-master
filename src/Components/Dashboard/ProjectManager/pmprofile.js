import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import './pmDashboard.css'
import PmSidebar from './pmSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
//import './profile.css'
const PmProfile = () => {

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
        
       
    
   <PmSidebar/>


     
      </div>
       <div className='admin-child'>

       <div className="profile-container">
      <div className="profile">
        <div className="profile-image">
          <FontAwesomeIcon icon={faUser} size="5x" />
        </div>
        <div className="profile-details">
          {/* <h2 className="profile-name">Name:</h2>
          <p className="profile-age">email: {pemail}</p>
          <p className="profile-role">Role:{prole} </p>
          <p className="profile-id">Id:{id} </p> */}
        </div>
      </div>
    </div>
      </div>
      </div>
    );
  };

export default PmProfile