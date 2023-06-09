import React from 'react';
import { useEffect } from 'react';
import axios from'axios'
import NavBarLogin from './NavBarLogin';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Login.css'
import { ngrokUrl } from '../Assets/config';
//import apiLink from "../ApiConfig"
function Test() {
    const navigate=useNavigate()
    async function handleGoogleLogin(response) {
        console.log(response);
        const token=response.credential
        console.log(token)
        const headers = {
            Authorization: `${token}`,
            'ngrok-skip-browser-warning': 'true'
          };
          try {
        
            const { data}  = await axios.get(
                `https://${ngrokUrl}/auth/api/get-email`,
                { headers })
            sessionStorage.setItem('item', JSON.stringify( data))
          console.log(data.role)
            if (data.role ==="ADMIN") {
                navigate('/AdminDashboard', { state: { data } });
            } else if (data.role=="PROJECT_MANAGER") {
                navigate('/pmDashboard', { state: { data } });
            } else if (data.role =="USER") {
                
                navigate('/userProjects', { state: { data } });
            } else {
                navigate('/Login');
            }
        }
        catch (error) {
            console.log('hi',error);
           
        }
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
        <div className="welcome-message">Welcome to our Website!</div>
        <br/>
        <div className="space"></div>
        <br/>

      </div>
      <div className="box-container">
        <div id="signIn"></div>
      </div>
      <div className="box-container"></div>
      <Footer />
    </div>
    
    );
}
export default Test;


