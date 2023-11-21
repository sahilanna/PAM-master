import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import CloseButton from "../../../atoms/closeButton/closeButton";
import api from "../../../network/api";
import logger from "../../../utils/logger.js";
import { NGROK_URL } from "../../../network/config";

function UserActivity(open, userName) {
  let navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [activityData, setActivityData] = useState([]);

  const onClose = () => {
    navigate(-1);
  };

  const displayActivity = async () => {
    try {
      const result = await api.get(`https://${NGROK_URL}/users/${id}`);
      setActivityData([result?.data]);
      logger.info("UserActivity successfully displayed");
    } catch (error) {
      logger.error("Error in displaying user activity", error);
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj?.toLocaleString() || "N/A";
  };

  useEffect(() => {
    displayActivity();
  }, []);

  return (
    <Modal size="mini" open={true} onClose={onClose} className="form-modal">
      <CloseButton onClick={onClose} />
      <Modal.Header>User Activity</Modal.Header>
      <Modal.Content>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th> Last LoggedIn Time</th>
              <th>Last LoggedOut Time</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((item, index) => (
              <tr key={item.id}>
                <td>{item?.name || "N/A"}</td>
                <td>{formatDate(item?.lastUpdated || "N/A")}</td>
                <td>{formatDate(item?.lastLogout || "N/A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Content>
    </Modal>
  );
}

export default UserActivity;
