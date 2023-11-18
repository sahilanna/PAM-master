import React, {
  useEffect,
  useState,
} from "react";
import { Button, Modal } from "semantic-ui-react";
import { NGROK_URL } from "../../../network/config";
import api from "../../../network/api";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import logger from "../../../utils/logger.js";
function UserActivity(open, userName) {
  let navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [activityData, setActivityData] =
    useState([]);

  const onClose = () => {
    navigate(-1);
  };

  const displayActivity = async () => {
    try {
      const result = await api.get(
        `https://${NGROK_URL}/users/${id}`
      );
      setActivityData([result.data]);
    } catch (error) {
      logger.error("error", error);
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString();
  };

  useEffect(() => {
    displayActivity();
  }, []);

  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{ width: "500px" }}
      className="form-modal"
    >
      <div style={{ paddingLeft: "442px" }}>
        <div style={{ paddingTop: "20px" }}>
          <Button secondary onClick={onClose}>
            X
          </Button>
        </div>
      </div>
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
                <td>{item.name}</td>
                <td>
                  {formatDate(item.lastUpdated)}
                </td>
                <td>
                  {formatDate(item.lastLogout)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Content>
    </Modal>
  );
}

export default UserActivity;
