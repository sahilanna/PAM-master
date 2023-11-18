import React, {
  useState,
  useEffect,
} from "react";
import {
  Form,
  Dropdown,
  Button,
  Modal,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  NGROK_URL,
  GIT_ACCESS_TOKEN,
} from "../../../network/config";
import "./read.css";
import api from "../../../network/api";
import logger from "../../../utils/logger.js";
import ErrorModal from "../../../molecules/errorModal";
import CloseButton from "../../../atoms/closeButton/closeButton";

function AddUserName() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [githubUsername, setGithubUsername] =
    useState("");
  const [selectedUser, setSelectedUser] =
    useState("");
  const [
    showInvalidUsernameModal,
    setShowInvalidUsernameModal,
  ] = useState(false);
  const accessToken = GIT_ACCESS_TOKEN;
  useEffect(() => {
    fetchUsers();
  }, []);

  logger.info(selectedUser);
  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/users/role/user`
      );
      const userOptions = response.data.map(
        (user) => ({
          key: user.id,
          text: user.name,
          value: user.id,
        })
      );
      setUsers(userOptions);
    } catch (error) {
      logger.error(
        "Error fetching Users:",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = githubUsername;
    try {
      const response = await api.post(
        `https://${NGROK_URL}/usernames/githubUsername`,
        {
          username: username,
          user: {
            id: id,
          },
          accessToken: accessToken,
        }
      );
      logger.info(
        "API Response:",
        response.data.id
      );

      navigate("/userRead");
    } catch (error) {
      if (
        error.response &&
        error.response.status == 409
      ) {
        setShowInvalidUsernameModal(true);
      }
    }
  };

  const selectedUserChange = (
    event,
    { value }
  ) => {
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
        size="mini"
        open={true}
        onClose={onClose}
        className="form-modal"
      >
        <CloseButton onClick={onClose} />
        <Modal.Header>
          Add Github UserName
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>
                Users
                <span className="red-text">
                  *
                </span>
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

            <Form.Field>
              <label>
                Github Username
                <span className="red-text">
                  *
                </span>
              </label>
              <input
                placeholder="Enter github username"
                value={githubUsername}
                onChange={(e) =>
                  setGithubUsername(
                    e.target.value
                  )
                }
              />
            </Form.Field>
            <Button
              data-testid="submit"
              type="submit"
              primary
              disabled={
                !setSelectedUser ||
                !githubUsername
              }
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

export default AddUserName;
