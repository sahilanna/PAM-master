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
        //     const { data } = await axios.post(
        //         'https://oauth2.googleapis.com/token',
        //         {
        //           client_id: '840665959732-ip9sm2ea6l7ds2vbgooum6ec08fl8k3v.apps.googleusercontent.com',
        //           client_secret: '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',
        //           grant_type: 'refresh_token',
        //           refreshToken:token,
        //           code: response.code,
        //           redirect_uri: 'http://localhost:3000',
        //         }
        //       );
          
        //       const refreshToken = data.refresh_token;
        //       console.log(refreshToken);
          
        //       // Store the refresh token securely for later use
        //       // You can save it in a database or any secure storage mechanism
          
        //       // Continue with your logic to navigate or handle the token as needed
        //     } catch (error) {
        //       console.log('Error exchanging ID token for refresh token:', error);
        //     }
        //   }
            const { data}  = await axios.get(
                `https://${ngrokUrl}/auth/api/get-email`,
                { headers },)
            //console.log(headers)
            console.log(data);
            const role = data.role;
            console.log(role);
            if (data =="ADMIN") {
                navigate('/AdminDashboard', { state: { data } });
            } else if (data=="PROJECT_MANAGER") {
                navigate('/pmDashboard', { state: { data } });
            } else if (data =='USER') {
                
                navigate('/userDashboard', { state: { data } });
            } else {
                navigate('/');
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
        <div className="space"></div>
        <div id="signIn"></div>
      </div>
      <Footer />
    </div>
    
    );
}
export default Test;


