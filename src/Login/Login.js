import { Link, renderMatches } from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import {useNavigate} from 'react-router-dom'
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Test() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate=useNavigate()
  function fn(response){
    console.log(response.credential)
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "664601673419-hiir2173k5usfrm159r3ttg9108cpuhi.apps.googleusercontent.com",
      callback: fn
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signIn") || document.createElement("div"),
      { theme: "outline", size: "large" }
    );
    setLoggedIn(true)
  }, []
);
useEffect(() => {
  if (loggedIn) {
    navigate('/AdminDashboard');
  }
  else{
    navigate('/Login')
  }
}, [loggedIn, navigate]);
  return (
    <div>
    <h1>Login</h1>
    {/* <div id="signIn"> */}
      <button id="signIn" ></button>
     </div>
    // </div>
  );
}
export default Test;