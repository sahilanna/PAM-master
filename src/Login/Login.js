import React, { useEffect, useState }  from 'react';
import { Button, Modal } from 'semantic-ui-react'
import axios from 'axios';
import NavBarLogin from './NavBarLogin';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Login.css'
import { ngrokUrl} from '../Assets/config';
import styled from 'styled-components';
import logo1 from '../Assets/logo1.png'
import GoogleLogin from 'react-google-login';


function Test() {
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);
  const [isGoogleButtonRendered, setIsGoogleButtonRendered] = useState(false);
  const navigate=useNavigate()
  const StyledText = styled.p`
font-family: 'Montserrat';
color: #FFFFFF;
;
`;
  async function handleGoogleLogin(response) {
     
      const token=response.credential
      //  console.log(token)
       const decodedToken = decodeIdToken(token);
       const emailToVerify = decodedToken.email;
       console.log(emailToVerify)
      const headers = {
          // Authorization: `${token}`,
          'ngrok-skip-browser-warning': 'true',
          emailToVerify: `${emailToVerify}`
        };
       // console.log(headers)
        try {
          const { data}  = await axios.get(
              `https://${ngrokUrl}/auth/api/get-email`,
             {headers})
              // console.log(data)
          sessionStorage.setItem('item', JSON.stringify( data))
          const access=sessionStorage.getItem('item')
          let user = JSON.parse(access);
         const accessToken=user.token
         console.log(accessToken)
        console.log(data.enumRole)
          if (data.enumRole ==="ADMIN") {
              navigate('/AdminDashboard', { state: { data } });
          } else if (data.enumRole==="PROJECT_MANAGER") {
              navigate('/pmDashboard', { state: { data } });
          } else if (data.enumRole ==="USER") {
              navigate('/userProjects', { state: { data } });
          } else {
                 console.log("Error");
          }
      }
      catch (error) {
          setShowUserNotFoundModal(true);
          console.log("user not found")
          console.log('hi',error);
      }
  }
  function decodeIdToken(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }
    useEffect(() => {
      const googleClientID = process.env.REACT_APP_googleClientID;

  
      if (!isGoogleButtonRendered) {
        window.google.accounts.id.initialize({
          client_id: googleClientID,
          callback: handleGoogleLogin,
        });
        window.google.accounts.id.renderButton(document.getElementById('signIn') || document.createElement('div'), {
          theme: 'outline',
          size: 'large',
        });
        setIsGoogleButtonRendered(true);
      }
    }, [isGoogleButtonRendered]);
    return (
    <div className="sample1">
      <NavBarLogin />
      <div className="box-container">
    
        <div className="welcome-message"><StyledText>Welcome to PAM</StyledText>
       </div>

       </div>
       <div className="box-container">
        <div>
          <img src={logo1} alt="Logo" style={{width:'235px', height:'300px',paddingTop:'40px'}}/>
        
      </div>
     
        {/* <div className="space"></div> */}
        
      </div>
      <div className="box-container">
        <div id="signIn"></div>
      </div>
      <div className="box-container"></div>
      <Footer />
      <div  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div className='Modal-cont'>
      <Modal open={showUserNotFoundModal} className='centered-modal'size='mini' >
        <Modal.Header>User not found</Modal.Header>
        <Modal.Content >
          <p>This user was not found. Please try again.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowUserNotFoundModal(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
      </div>
      </div>
    </div>
    
    );
}


export default Test;