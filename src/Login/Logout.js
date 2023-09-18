import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ngrokUrl } from '../Assets/config';
import api from '../Components/Dashboard/api';

const Logout = () => {
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  
  console.log(user)
    console.log(user.token)
  const  id=user.id
console.log(id)
  const navigate = useNavigate();

 

  const logOut = async () => {
    await api.post(`https://${ngrokUrl}/users/${id}/logout
    `) .then(
      navigate('/Login')
    )
      .catch((error)=>{
        console.log(error,'hi');
       
      })
    };

  useEffect(() => {
    logOut()
  }, []);



  return (
  
    navigate('/Login')  
  
  );
};

export default Logout;
