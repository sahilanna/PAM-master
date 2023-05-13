import React, { useEffect } from 'react';
import { useNavigate, useState } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();
//   const [isSignedIn, setIsSignedIn] = useState(false);


  async function handleGoogleLogout() {
    try {
      await axios.get('https://4d1e-106-51-70-135.ngrok-free.app/auth/api/logout');
    //   setIsSignedIn(false);
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const handleLogout = () => {
    
    navigate('/login');
  };

  return (
    <GoogleLogout
      clientId="840665959732-ip9sm2ea6l7ds2vbgooum6ec08fl8k3v.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={handleLogout}

      
    />
  );
};

export default LogoutButton;
