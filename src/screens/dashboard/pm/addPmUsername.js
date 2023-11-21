import React, { useState, useEffect } from "react";
import { Modal, Form, Dropdown, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL, GIT_ACCESS_TOKEN } from "../../../network/config";
import api from "../../../network/api";
import logger from "../../../utils/logger.js";
import CloseButton from "../../../atoms/closeButton/closeButton";
import ErrorModal from "../../../molecules/errorModal";
function AddPmUserName() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [users, setUsers] = useState([]);
  const [githubUsername, setgithubUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showInvalidUsernameModal, setShowInvalidUsernameModal] = useState(false);
  const accessToken = GIT_ACCESS_TOKEN;
  useEffect(() => {
    fetchPms();
  }, []);

  const fetchPms = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/users/role/project_manager`);
      const userOptions = response.data.map((user) => ({
        key: user.id,
        text: user.name,
        value: user.id,
      }));
      setUsers(userOptions);
    } catch (error) {
      logger.error("Error fetching Users:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = githubUsername;
    try {
      const response = await api.post(`https://${NGROK_URL}/usernames/githubUsername`, {
        username: username,
        user: {
          id: id,
        },
        accessToken: accessToken,
      });
      logger.info("API Response:", response.data.id);

      navigate("/pmReadNew");
    } catch (error) {
      if (error.response && error.response.status == 409) {
        setShowInvalidUsernameModal(true);
      }
    }
  };

  const selectedUserChange = (event, { value }) => {
    setSelectedUser(value);
    setId(value);
    logger.info(selectedUser);
  };

  const onClose = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setShowInvalidUsernameModal(false);
  };

  return (
    <>
      <Modal size="mini" open={true} onClose={onClose} className="form-modal">
        <CloseButton onClick={onClose} />
        <Modal.Header>Add PM UserName</Modal.Header>

        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>
                PM
                <span className="red-text">*</span>
              </label>
              <Dropdown
                data-testid="Select PM"
                placeholder="Select PM"
                fluid
                selection
                options={users}
                onChange={selectedUserChange}
              />
            </Form.Field>

            <Form.Field>
              <label>
                Github Username
                <span className="red-text">*</span>
              </label>
              <input
                placeholder="Enter github username"
                value={githubUsername}
                onChange={(e) => setgithubUsername(e.target.value)}
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

      <ErrorModal
        open={showInvalidUsernameModal}
        header="Invalid Username"
        content="The provided GitHub username is invalid."
        onClose={handleCloseModal}
      />
    </>
  );
}

export default AddPmUserName;
