import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
