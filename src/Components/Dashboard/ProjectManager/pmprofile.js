import React from 'react'
import './pmDashboard.css'
import PmSidebar from './pmSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const PmProfile = () => {

  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);
  console.log(profileData)
  const id=pdata.id
  const pname=pdata.name;
  const pemail=pdata.email;
  const prole=pdata.enumRole;
  console.log(pname)

    return (
      <div className='parent-admi'>  
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <PmSidebar/>
      </div>
      <div className='admin-chil'>
        <div className="profile-paren">
          <div className="profile-details">
            <div className="profile-imag">
              <h1>PROFILE</h1>
              <FontAwesomeIcon icon={faUser} size="7x" />
          
              <div className='profile-chil'>
             
              <b>Name</b>
              <p>{pname}</p>

              <b>Email</b>
              <p>{pemail}</p>
              <b>Role</b>
              <p>{prole}</p>
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

export default PmProfile