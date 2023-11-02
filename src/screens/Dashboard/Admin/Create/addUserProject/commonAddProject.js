import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../../../network/api";
import { ngrokUrl } from "../../../../../network/config";
import "../Create.css";
import AddUserProjectUI from "./addUserProjectUI";
import AddPmProjectUI from "../addPmProject/addPmProjectUI";
import logger from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js";

function CommonAddProject({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, projectName } = location.state || {};
  const [selectedUser, setSelectedUser] = useState("");
  const [userId, setUserId] = useState("");
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpp, setOtpp] = useState(""); // Check the state variable name
  const [user, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `https://${ngrokUrl}/users/withoutProject?role=${role}&projectId=${projectId}`
      );
      const projUsers = response.data.map((projU) => ({
        key: projU.id,
        text: projU.name,
        value: projU.id,
      }));
      setUsers(projUsers);
    } catch (error) {
      logger.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserChange = (event, { value }) => {
    setSelectedUser(value);
    const selectedUserObj = user.find((userObj) => userObj.value === value);
    if (selectedUserObj) {
      const selectedUserId = selectedUserObj.value;
      setUserId(selectedUserId);
    }
  };

  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    try {
      await api.post(`https://${ngrokUrl}/OTP/send`, {
        phoneNumber: "+91 9928931610",
      });

      setShowOTPMoal(true);
    } catch (error) {
      logger.error("Error in sending otp:", error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      const otpSubmissionResponse = await api.post(
        `https://${ngrokUrl}/OTP/verify`,
        {
          otp: otpp,
        }
      );

      if (otpSubmissionResponse.status === 200) {
        await api.put(
          `https://${ngrokUrl}/projects/${projectId}/users/${userId}`,
          {
            projectId: projectId,
            userId: userId,
          }
        );

        navigate("/AdminDashboard");
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      logger.error("Error:", error);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const onClose = () => {
    navigate(-1);
  };
  const commonProps = {
    projectName,
    user,
    errorMessage,
    selectedUser,
    handleUserChange,
    handleSubmit,
    showOTPMoal,
    handleOTPClose,
    setOtpp,
    handleOTPSubmit,
    onClose,
  };

  return role === "user" ? (
    <AddUserProjectUI {...commonProps} />
  ) : (
    <AddPmProjectUI {...commonProps} />
  );
}

export default CommonAddProject;
