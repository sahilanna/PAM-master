import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PmSidebar from "../sidebar/pmSidebar";
import ClearAllDialogueBox from "./clearAllDialogueBox";
import logger from "../../../utils/logger.js";
import api from "../../../network/api";
import { NGROK_URL } from "../../../network/config";
import { getUserFromSessionStorage } from "../../../utils/sessionStorage";

function ShowAllNotification() {
  const navigate = useNavigate();
  const [allNotification, setAllNotification] = useState([]);
  const [showNotifyDialog, setShowNotifyDialog] = useState(false);

  const user = getUserFromSessionStorage();
  const pmName = user ? user.name : null;

  const fetchNotification = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/request/all/PM?pmName=${pmName}`);
      setAllNotification(response.data);
      logger.info("Successfully fetched all notifications");
    } catch (error) {
      logger.error("Error in fetching notifications", error);
    }
  };
  useEffect(() => {
    fetchNotification();
  }, []);

  const clearNotification = async () => {
    await api.delete(`https://${NGROK_URL}/request/clearAll`);
    navigate("/showAllNotification");
    setShowNotifyDialog(true);
    fetchNotification();
    logger.info("Successfully cleared all notifications");
  };
  const handleDeleteProject = () => {
    setShowNotifyDialog(true);
  };
  const confirmDeleteProject = async () => {
    await clearNotification();
    setShowNotifyDialog(false);
  };
  const cancelDeleteProject = () => {
    setShowNotifyDialog(false);
  };

  return (
    <div className="pm-read-screen ">
      <div>
        <PmSidebar />
      </div>
      <div className="show-all-notification">
        <div className="clear-all-notifications">
          <button
            data-testid="clear"
            className="btn btn-danger mx-2"
            onClick={() => handleDeleteProject()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <ClearAllDialogueBox
            show={showNotifyDialog}
            onClose={() => cancelDeleteProject()}
            onConfirm={() => confirmDeleteProject()}
          />
        </div>
        <table class="ui celled table">
          <thead>
            <th>Notification</th>
          </thead>
          <tbody>
            {allNotification && allNotification.length > 0 ? (
              allNotification.map((item) => (
                <tr key={item.id}>
                  <td>{item.response}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No notifications</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowAllNotification;
