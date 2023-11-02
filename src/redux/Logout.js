import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ngrokUrl } from "../network/config";
import api from "../network/api";
import logger from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js';
const Logout = () => {
  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;

  let id = null;
  if (user !== null) id = user.id;
 
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await api.post(`https://${ngrokUrl}/users/${id}/logout`);
      navigate("/Login");
    } catch (error) {
      logger.error("Error:",error);
    }
  };

  useEffect(() => {
    logOut();
  }, []);

  return navigate("/Login");
};

export default Logout;
