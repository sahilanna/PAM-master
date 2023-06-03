import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import './pmDashboard.css'

const Profile = ({ name, email }) => {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2 className="profile-name">{name}</h2>
          </div>
          <div className="profile-content">
            <p className="profile-email">{email}</p>
          </div>
        </div>
      </div>
    );
  };

export default Profile