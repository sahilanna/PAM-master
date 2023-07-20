import React, { useEffect, useState }  from 'react';
import { Button, Modal } from 'semantic-ui-react'
import api from '../Components/Dashboard/api';
import NavBarLogin from './NavBarLogin';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Login.css'
import { ngrokUrl } from '../Assets/config';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
function Test() {
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);
  const navigate=useNavigate()
  const StyledText = styled.p`
font-family: 'Montserrat';
color: #ffffff;
;

`;
  async function handleGoogleLogin(response) {
      
      const token=response.credential
     
       const decodedToken = decodeIdToken(token);
       const emailToVerify = decodedToken.email;
       console.log(emailToVerify)
      const headers = {
         
          'ngrok-skip-browser-warning': 'true',
          emailToVerify: `${emailToVerify}`
        };
      
        try {
          const { data}  = await api.get(
              `https://${ngrokUrl}/auth/api/get-email`,
             {headers})
              
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
              navigate('/');
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
      const clientID='840665959732-ip9sm2ea6l7ds2vbgooum6ec08fl8k3v.apps.googleusercontent.com'
      window.google.accounts.id.initialize({
          client_id: clientID,
          callback: handleGoogleLogin
      });
      window.google.accounts.id.renderButton(
          document.getElementById("signIn") || document.createElement("div"),
          { theme: "outline", size: "large" }
      );
  }, []);


    return (
    <div className="sample1">
      <NavBarLogin />
      <div className="box-container">
        <div className="welcome-message"><StyledText>Welcome to our Website!</StyledText>
       </div>

        <br/>
        <div className="space"></div>
        <br/>
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