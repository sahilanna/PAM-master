import React, { useEffect } from 'react';
import { useNavigate, useState } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  sessionStorage.removeItem('role');
  sessionStorage.clear();
  useEffect(()=>{
  navigate('/Login') 
  console.log("LOGGED OUT")
  } ,[])
  console.log("LOGGED OUT")
 




   
  

  return (
    

    navigate('/Login')  
  
  );
};

export default Logout;
