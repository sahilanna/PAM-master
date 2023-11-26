import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../network/api";
import axios from "axios";
import NavBarLogin from "../navbar/navbarLogin";
import Footer from "../footer/footer";
import ErrorModal from "../../molecules/errorModal";
import { NGROK_LOGIN } from "../../network/config";
import projectLogo from "../../assets/images/projectLogo.png";
import logger from "../../utils/logger.js";
import { decodeIdToken } from "../../utils/decodeLoginId";
import { setUserInSessionStorage } from "../../utils/sessionStorage";
import "./login.css";

function Login() {
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);
  const [isGoogleButtonRendered, setIsGoogleButtonRendered] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    const decodedToken = decodeIdToken(token);
    const emailToVerify = decodedToken.email;

    const headers = {
      "ngrok-skip-browser-warning": "true",
      emailToVerify: `${emailToVerify}`,
    };
    logger.info("Before Try Block");

    try {
      logger.info("Inside try block before hitting api");
      const { data } = await axios.get(`https://${NGROK_LOGIN}/auth/api/v1/get-email`, { headers });
      logger.info("After hitting api in try block");

      setUserInSessionStorage(data);

      if (data.enumRole === "ADMIN") {
        navigate("/AdminDashboard", {
          state: { data },
        });
      } else if (data.enumRole === "PROJECT_MANAGER") {
        navigate("/pmDashboard", {
          state: { data },
        });
      } else if (data.enumRole === "USER") {
        navigate("/userProjects", {
          state: { data },
        });
      } else {
        logger.error("Error");
      }
    } catch (error) {
      logger.error("Catch Block: Error in verifying login details");
      setShowUserNotFoundModal(true);
    }
  };

  useEffect(() => {
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    logger.info("Client ID:", GOOGLE_CLIENT_ID);
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signIn") || document.createElement("div"),
      {
        theme: "outline",
        size: "large",
      }
    );
    setIsGoogleButtonRendered(true);
  }, [isGoogleButtonRendered]);

  return (
    <div className="login-page">
      <NavBarLogin />

      <div className="welcome-message">
        <p>Welcome to PAM</p>
      </div>

      <div>
        <img className="login-image" data-testid="logo" src={projectLogo} alt="Logo" />
      </div>

      <div className="sign-in-button" data-testid="signIn" id="signIn">
        Button
      </div>

      <div className="footer-container">
        <Footer />
      </div>

      <ErrorModal
        open={showUserNotFoundModal}
        header="User Not Found"
        content="This user was not found. Please try again."
        onClose={() => setShowUserNotFoundModal(false)}
      />
    </div>
  );
}

export default Login;
