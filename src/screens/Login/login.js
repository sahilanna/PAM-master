import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";
import NavBarLogin from "../Navbar/navbarLogin";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";
import "./login.css";
import { NGROK_LOGIN } from "../../network/config";
import styled from "styled-components";
import logo1 from "../../assets/logo1.png";
import logger from "../../utils/logger.js";
export function decodeIdToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function Test() {
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);
  const [isGoogleButtonRendered, setIsGoogleButtonRendered] = useState(false);
  const navigate = useNavigate();
  const StyledText = styled.p`session
`;
  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    const decodedToken = decodeIdToken(token);
    const emailToVerify = decodedToken.email;

    const headers = {
      "ngrok-skip-browser-warning": "true",
      emailToVerify: `${emailToVerify}`, 
    };

    try {
      const { data } = await axios.get(
        `https://${NGROK_LOGIN}/auth/api/v1/get-email`,
        { headers }
      );

      sessionStorage.setItem("item", JSON.stringify(data));
      sessionStorage.getItem("item");
     
      if (data.enumRole === "ADMIN") {
        navigate("/AdminDashboard", { state: { data } });
      } else if (data.enumRole === "PROJECT_MANAGER") {
        navigate("/pmDashboard", { state: { data } });
      } else if (data.enumRole === "USER") {
        navigate("/userProjects", { state: { data } });
      } else {
        logger.error("Error");
      }
    } catch (error) {
      setShowUserNotFoundModal(true);
    }
  };

  useEffect(() => {
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_googleClientID;
    
    logger.info("Client ID", GOOGLE_CLIENT_ID)
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
    <div className="sample1">
      <NavBarLogin />
      <div className="box-container">
        <div className="welcome-message">
          <StyledText>Welcome to PAM</StyledText>
        </div>
      </div>
      <div className="box-container">
        <div>
          <img
            data-testid="logo"
            src={logo1}
            alt="Logo"
            style={{ width: "235px", height: "300px", paddingTop: "40px" }}
          />
        </div>

       
      </div>
      <div className="box-container">
        <div data-testid="signIn" id="signIn">
          Button
        </div>
      </div>
      <div className="box-container"></div>
      <Footer />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-cont">
          <Modal
            open={showUserNotFoundModal}
            className="centered-modal"
            size="mini"
          >
            <Modal.Header>User not found</Modal.Header>
            <Modal.Content>
              <p>This user was not found. Please try again.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                data-testid="close"
                onClick={() => setShowUserNotFoundModal(false)}
              >
                Close
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Test;
