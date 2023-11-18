import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../network/api";
import NavBarLogin from "../navbar/navbarLogin";
import Footer from "../footer/footer";
import "./login.css";
import { NGROK_LOGIN } from "../../network/config";
import projectLogo from "../../assets/images/projectLogo.png";
import logger from "../../utils/logger.js";
import { decodeIdToken } from "../../utils/decodeLoginId";
import ErrorModal from "../../molecules/errorModal";

function Login() {
  const [
    showUserNotFoundModal,
    setShowUserNotFoundModal,
  ] = useState(false);
  const [
    isGoogleButtonRendered,
    setIsGoogleButtonRendered,
  ] = useState(false);

  const navigate = useNavigate();
  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    const decodedToken = decodeIdToken(token);
    const emailToVerify = decodedToken.email;

    const headers = {
      "ngrok-skip-browser-warning": "true",
      emailToVerify: `${emailToVerify}`,
    };
     logger.info("Clientsjfuyasduxcauckyuascuk ID");

    try {
       logger.info("Client IDjvjhsjhvj,sjhhvjhvsjvxjvsjkvsk.v");
      const { data } = await api.get(
        `https://${NGROK_LOGIN}/auth/api/v1/get-email`,
        { headers }
      );
      logger.info(
        "ClienthvhajshhshahvIDjvjhsjhvj,sjhhvjhvsjvxjvsjkvsk.v"
      );

      sessionStorage.setItem(
        "item",
        JSON.stringify(data)
      );
      sessionStorage.getItem("item");

      if (data.enumRole === "ADMIN") {
        navigate("/AdminDashboard", {
          state: { data },
        });
      } else if (
        data.enumRole === "PROJECT_MANAGER"
      ) {
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
      logger.error("Error in verifying login details");
      setShowUserNotFoundModal(true);
    }
  };

  useEffect(() => {
    const GOOGLE_CLIENT_ID =
      process.env.REACT_APP_GOOGLE_CLIENT_ID;

    logger.info("Client ID", GOOGLE_CLIENT_ID);
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signIn") ||
        document.createElement("div"),
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
          <p>Welcome to PAM</p>
        </div>
      </div>
      <div className="box-container">
        <div>
          <img
            data-testid="logo"
            src={projectLogo}
            alt="Logo"
            style={{
              width: "235px",
              height: "300px",
              paddingTop: "40px",
            }}
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

      <ErrorModal
        open={showUserNotFoundModal}
        header="User Not Found"
        content="This user was not found. Please try again."
        onClose={() =>
          setShowUserNotFoundModal(false)
        }
      />
    </div>
  );
}

export default Login;
