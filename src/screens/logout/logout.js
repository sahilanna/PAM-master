import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL } from "../../network/config";
import api from "../../network/api";
import logger from '../../utils/logger.js';
const Logout = () => {
  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;

  let id = null;
  if (user !== null) id = user.id;
 
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await api.post(`https://${NGROK_URL}/users/${id}/logout`);//Tracking last Logout time of user
      sessionStorage.clear();
      navigate("/Login");
    } catch (error) {
      logger.error("Error:",error);
    }
  };

  useEffect(() => {
    Logout();
  }, []);

};

export default Logout;
