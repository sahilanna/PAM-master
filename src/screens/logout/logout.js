import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL } from "../../network/config";
import { getUserFromSessionStorage } from "../../utils/sessionStorage";
import api from "../../network/api";
import logger from "../../utils/logger.js";

const Logout = () => {
  const navigate = useNavigate();

  const logout = useMemo(
    () => async () => {
      try {
        const user = getUserFromSessionStorage();
        const id = user?.id;

        if (id) {
          await api.post(`https://${NGROK_URL}/users/${id}/logout`);
          sessionStorage.clear();
          navigate("/Login");
          logger.info("Logging out successsfully");
        }
      } catch (error) {
        logger.error("Error in logging out", error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    logout();
  }, [logout]);
};

export default Logout;
