import React from 'react';
import { useEffect } from 'react';
import axios from'axios'
import AdminDashboard from '../Components/Dashboard/Admin/AdminDashboard'
import PmCreate from '../Components/Dashboard/PM/pmCreate';
import UserCreate from '../Components/Dashboard/Users/userCreate';
import { Navigate, useNavigate } from 'react-router-dom';
//import apiLink from "../ApiConfig"
function Test() {
    const navigate=useNavigate()
    async function handleGoogleLogin(response) {
        const token=response.credential
        console.log(token)
        const headers = {
            Authorization: `${token}`,
            'ngrok-skip-browser-warning': 'true'
          };
          try {
            const { data}  = await axios.get(
                `https://4d1e-106-51-70-135.ngrok-free.app/auth/api/get-email`,
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
            // Handle errors
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
        <div id="signIn">
        </div>
    );
}
export default Test;


// import { Link, renderMatches } from 'react-router-dom'
// import {GoogleLogin} from 'react-google-login'
// import {useNavigate} from 'react-router-dom'
// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';

// function Test() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const navigate=useNavigate()
//   function fn(response){
//     console.log(response.credential)
//   }
//   useEffect(() => {
//     window.google.accounts.id.initialize({
//       client_id: "664601673419-hiir2173k5usfrm159r3ttg9108cpuhi.apps.googleusercontent.com",
//       callback: fn
//     });
//     window.google.accounts.id.renderButton(
//       document.getElementById("signIn") || document.createElement("div"),
//       { theme: "outline", size: "large" }
//     );
//     setLoggedIn(true)
//   }, []
// );
// useEffect(() => {
//   if (loggedIn) {
//     navigate('/AdminDashboard');
//   }
//   else{
//     navigate('/Login')
//   }
// }, [loggedIn, navigate]);
//   return (
//     <div>
//     <h1>Login</h1>
//     {/* <div id="signIn"> */}
//       <button id="signIn" ></button>
//      </div>
//     // </div>
//   );
// }
// export default Test;