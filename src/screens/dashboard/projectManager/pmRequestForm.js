import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Modal } from "semantic-ui-react";
import { NGROK_URL } from "../../../network/config";
import { useNavigate, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import api from "../../../network/api";
import logger from "../../../utils/logger.js";

function PmRequestForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const [requestStatus, setRequestStatus] = useState("");
  let { projectName } = location.state || {};
  const [users, setUsers] = useState([]);
  let [selectedUser, setSelectedUser] = useState("");

  const [selectedUserId, setSelectedUserId] = useState("");
  const [userObj, setUserObj] = useState([]);
  const [requestDescription, setRequestDescription] = useState([]);
  let profileData = sessionStorage.getItem("item");
  let pdata = profileData ? JSON.parse(profileData) : null;

  let pmName = null;
  if (pdata !== null) {
    pmName = pdata.name;
  }

  const handleUserChange = (event, { value }) => {
    const selectedUserObj = userObj.find((userr) => userr.name === value);
    if (selectedUserObj) {
      setSelectedUser(value);
      setSelectedUserId(selectedUserObj?.id || " ");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/users/withoutProject?role=user&projectId=${projectId}`
      );

      if (Array.isArray(response.data)) {
        const userNames = response.data.map((users) => users.name);
        setUsers(userNames);
        setUserObj(response.data);
      }
    } catch (error) {
      logger.error("Error fetching Users:", error);
    }
  };

  const Description = (e) => {
    setRequestDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        id: selectedUserId,
      };
      const project = {
        projectId: projectId,
      };
      const response = await api.post(`https://${NGROK_URL}/request/`, {
        pmName,
        user,
        project,
        requestDescription,
      });
      if (response.data.success) {
        setRequestStatus("Request submitted successfully");
      }
      navigate("/PmDashboard");
    } catch (error) {
      logger.error("Error submitting request:", error);
    }
  };
  logger.info(requestStatus);
  const onClose = () => {
    navigate(-1);
  };
  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{
        position: "fixed",
        right: "-80px",
        top: "10px",
        width: "500px",
        height: "560px",
      }}
    >
      <div
        style={{
          paddingLeft: "820px",
          paddingTop: "5px",
        }}
      ></div>
      <div style={{ paddingLeft: "442px" }}>
        <Button data-testid="close" secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Request Form To Add User</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: "left" }}>Project Name</label>

            <input data-testid="project-name" name="name" placeholder={projectName} readOnly />
          </Form.Field>

          <Form.Field>
            <label style={{ textAlign: "left" }}>User</label>
            {users.length > 0 ? (
              <Dropdown
                data-testid="user-dropdown"
                placeholder="Select User"
                fluid
                selection
                options={
                  users?.map((name, index) => ({
                    key: index,
                    text: name,
                    value: name,
                  })) || []
                } // Fallback to an empty array if users is null or undefined
                value={selectedUser}
                onChange={handleUserChange}
              />
            ) : (
              <p>No users available</p>
            )}
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: "left" }}>Description:</label>
            <input
              data-testid="description"
              type="text"
              placeholder="Description"
              id="Description"
              required
              onChange={Description}
            />
          </Form.Field>
          <Button data-testid="submit" primary type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}
export default PmRequestForm;
