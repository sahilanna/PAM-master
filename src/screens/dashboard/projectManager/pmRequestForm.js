import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Dropdown, Modal } from "semantic-ui-react";
import { NGROK_URL } from "../../../network/config";
import CloseButton from "../../../atoms/closeButton/closeButton";
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

 
  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/users/withoutProject?role=user&projectId=${projectId}`
      );

      if (Array.isArray(response.data)) {
        const userNames = response.data.map((users) => users.name);
        setUsers(userNames);
        setUserObj(response.data);
        logger.info("User name successfully fetched");
      }
    } catch (error) {
      logger.error("Error fetching Users:", error);
    }
  };

   useEffect(() => {
     fetchUsers();
   }, []);

  const description = (e) => {
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
        logger.info("Request submitted successfully");
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
    <Modal className="form-modal" size="mini" open={true} onClose={onClose}>
      <CloseButton onClick={onClose} />

      <Modal.Header>Request Form To Add User</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Project Name</label>

            <input data-testid="project-name" name="name" placeholder={projectName} readOnly />
          </Form.Field>

          <Form.Field>
            <label> User</label>
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
            <label>Description:</label>
            <input
              data-testid="description"
              type="text"
              placeholder="Description"
              id="Description"
              required
              onChange={description}
            />
          </Form.Field>
          <Button data-testid="submit" primary type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
export default PmRequestForm;
