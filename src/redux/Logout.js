import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ngrokUrl } from "../network/config";
import api from "../network/api";

const Logout = () => {
  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;

  console.log(user);
  let id = null;
  if (user !== null) id = user.id;
  console.log(id);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await api.post(`https://${ngrokUrl}/users/${id}/logout`);
      navigate("/Login");
    } catch (error) {
      console.log(error, "hi");
    }
  };

  useEffect(() => {
    logOut();
  }, []);

  return navigate("/Login");
};

export default Logout;
