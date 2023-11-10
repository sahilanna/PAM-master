import React, { useEffect, useState } from "react";
import { Form, Dropdown, Modal, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL, GIT_ACCESS_TOKEN } from "../../../../../network/config.js";
import api from "../../../../../network/api.js";
import { REPO_OWNER } from "../../../../../assets/Constants/owner.js";
import logger from '../../../../../utils/logger.js';

const AddPm = () => {
  const [options, setOptions] = useState([]);
  const [repo, setRepo] = useState("");

  let navigate = useNavigate();
  const [username, setusername] = useState([]);
  const [repoId, setRepoId] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");

  const accessToken = GIT_ACCESS_TOKEN;

  const handleUserNameChange = (event, { value }) => {
    setusername(value);
  };

  const fetchUsernames = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/usernames/role/project_manager`
      );
      setOptions(response.data);
      const res = await api.get(`https://${NGROK_URL}/repositories/get`);
      const repoOptions = res.data.map((rep) => ({
        key: rep.repoId,
        text: rep.name,
        value: rep.repoId,
      }));
      setRepo(repoOptions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsernames();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRepo) {
      return;
    }

    let repo = selectedRepo;
    let owner = REPO_OWNER;
    api.post(`https://${NGROK_URL}/collaborators/add`, {
      owner,
      repo,
      username,
      accessToken,
    });
    navigate("/addUser", { state: { selectedRepo } });
  };
  logger.info("Repo Id:",repoId);
  const handleRepoChange = (e, { value, options }) => {
    const selectedRepo = options.find((option) => option.value === value);
    setRepoId(value);
    setSelectedRepo(selectedRepo.text);
  };

  const handleSkip = () => {
    navigate("/addUser", { state: { selectedRepo } });
  };

  const onClose = () => {
    navigate(-1);
  };
  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{ width: "500px", height: "450px" }}
      className="create-Project-Modal"
    >
      <div style={{ paddingTop: "6px" }}></div>
      <div style={{ paddingLeft: "440px" }}>
        <Button data-testid="close" secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add PM</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: "left" }}>
              Select Repo<span style={{ color: "red" }}>*</span>
            </label>
            <Dropdown
              data-testid="Select-Repo"
              placeholder="Select Repo"
              fluid
              selection
              options={repo}
              onChange={handleRepoChange}
            />
          </Form.Field>

          <Form.Field>
            <label style={{ textAlign: "left" }}>
              PM Username<span style={{ color: "red" }}>*</span>
            </label>

            <Dropdown
              data-testid="dropdownu"
              placeholder="Select Username"
              fluid
              selection
              options={options.map((name, index) => ({
                key: index,
                text: name.name,
                value: name.name,
              }))}
              value={username}
              onChange={handleUserNameChange}
            />
          </Form.Field>

          <Button data-testid="submit" type="submit" primary disabled={!selectedRepo}>
            Submit
          </Button>
          <Button
            style={{ marginLeft: "295px" }}
            type="submit"
            primary
            onClick={handleSkip}
          >
            Skip
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};
export default AddPm;
