import React, { useState, useEffect } from "react";
import { Form, Dropdown, Button, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ngrokUrl, gitAccessToken } from "../../../network/config";
import "./Read.css";
import api from "../../../network/api";

function AddUserName() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [githubUsername, setGithubUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showInvalidUsernameModal, setShowInvalidUsernameModal] =
    useState(false);
  const accessToken = gitAccessToken;
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(selectedUser);
  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/users/role/user`);
      const userOptions = response.data.map((user) => ({
        key: user.id,
        text: user.name,
        value: user.id,
      }));
      setUsers(userOptions);
    } catch (error) {
      console.log("Error fetching Users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(githubUsername);
    const username = githubUsername;
    try {
      const response = await api.post(
        `https://${ngrokUrl}/usernames/githubUsername`,
        {
          username: username,
          user: {
            id: id,
          },
          accessToken: accessToken,
        }
      );
      console.log("API Response:", response.data.id);

      navigate("/userRead");
    } catch (error) {
      if (error.response && error.response.status == 404) {
        setShowInvalidUsernameModal(true);
      }
    }
  };

  const selectedUserChange = (event, { value }) => {
    setSelectedUser(value);
    setId(value);
  };

  const onClose = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setShowInvalidUsernameModal(false);
  };

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        style={{ width: "500px" }}
        className="create-Project-Modal"
      >
        <div style={{ paddingLeft: "820px", paddingTop: "5px" }}></div>
        <div style={{ paddingLeft: "442px" }}>
          <Button data-testid="X" secondary onClick={onClose}>
            X
          </Button>
        </div>
        <Modal.Header>Add Github UserName</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: "left" }}>
                Users<span style={{ color: "red" }}>*</span>
              </label>
              <Dropdown
                data-testid="Select User"
                placeholder="Select User"
                fluid
                selection
                options={users}
                onChange={selectedUserChange}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label style={{ textAlign: "left" }}>
                Github Username<span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Enter github username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
            </Form.Field>
            <Button
              data-testid="submit"
              type="submit"
              primary
              disabled={!setSelectedUser || !githubUsername}
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Modal
        open={showInvalidUsernameModal}
        className="centered-modal2"
        size="mini"
        centered
      >
        <Modal.Header>Invalid Username</Modal.Header>
        <Modal.Content>
          <p>The provided GitHub username is invalid.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button data-testid="invalid-username" primary onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AddUserName;
