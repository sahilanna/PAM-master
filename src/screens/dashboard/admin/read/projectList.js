import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL, GIT_ACCESS_TOKEN } from "../../../../network/config";
import { REPO_OWNER } from "../../../../assets/constants/owner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteDialogBox from "../../../../atoms/deleteDialogBox/deleteDialogBox";
import OtpModal from "../../../../molecules/otpModal";
import logger from "../../../../utils/logger.js";
import api from "../../../../network/api";
import "./read.css";

function ProjectList({ projectId, projectName, type }) {
  const [items, setItems] = useState([]);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showOTPMoal, setShowOTPMoal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [repoName, setRepoName] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const getItemUrl = type === "pms" ? "project_manager" : "user";

  const getItems = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/projects/${projectId}/users/${getItemUrl}`
      );
      setItems(response.data);
    } catch (error) {
      logger.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getItems();
  }, [projectId]);

  useEffect(() => {
    loadRepo();
  }, []);

  const loadRepo = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/repositories/project/${projectId}`);
      const repo = response.data;
      setRepoName(repo[0].name);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleAddItem = () => {
    const route = type === "pms" ? "/addPmProject" : "/addUserProject";
    navigate(route, {
      state: { projectId, projectName },
    });
  };

  const handleSubmit = (itemId, username) => {
    setSelectedItemId(itemId);
    setUserName(username);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const otpResponse = await api.post(`https://${NGROK_URL}/OTP/send`, {
        phoneNumber: "+91 9928931610",
      });

      if (otpResponse.data === "OTP sent") {
        setShowConfirmDialog(false);
        setShowOTPMoal(true);
      }
    } catch (error) {
      logger.error("OTP generation failed");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleOTPSubmit = async (e) => {
    const otp = null;
    try {
      const otpSubmissionResponse = await api.post(`https://${NGROK_URL}/OTP/verify`, {
        otp: otp,
      });
      let owner = REPO_OWNER;
      if (otpSubmissionResponse.status === 200) {
        await api.delete(
          `https://${NGROK_URL}/projects/${projectId}/users/${selectedItemId}/repo`,
          {
            data: {
              owner: owner,
              repo: repoName,
              username: username,
              accessToken: GIT_ACCESS_TOKEN,
            },
          }
        );
        getItems();
        setShowOTPMoal(false);
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };

  return (
    <div>
      <div className="button-add-user">
        <Button
          data-testid="add"
          color="blue"
          floated="left"
          onClick={handleAddItem}
          disabled={items.length > 0}
        >
          {type === "pms" ? "Add PM" : "Add User"}
        </Button>
      </div>

      <table className="ui celled table">
        <thead>
          <tr>
            <th>{type === "pms" ? "PM" : "User"} Name</th>
            <th>{type === "pms" ? "PM" : "User"} Email</th>
            <th>Github Username</th>
            <th>Delete {type === "pms" ? "PM" : "User"}</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gitHubUsername}</td>
                <td>
                  <button
                    data-testid="delete-user"
                    className="btn btn-danger mx-2"
                    onClick={() => handleSubmit(item.id, item.gitHubUsername)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No {type === "pms" ? "PMs" : "users"} found</td>
            </tr>
          )}
        </tbody>
      </table>
      <OtpModal
        open={showOTPMoal}
        onClose={handleOTPClose}
        onSubmit={handleOTPSubmit}
        errorMessage={errorMessage}
      />
      <DeleteDialogBox
        show={showConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ProjectList;
