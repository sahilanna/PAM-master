import React, { useEffect, useState } from "react";
import { Form, Dropdown, Modal, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL, GIT_ACCESS_TOKEN } from "../../../../../network/config.js";
import CloseButton from "../../../../../atoms/closeButton/closeButton.js";
import { REPO_OWNER } from "../../../../../assets/constants/owner.js";
import api from "../../../../../network/api.js";
import logger from "../../../../../utils/logger.js";

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

  const fetchprojectMangers = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/usernames/role/project_manager`);
      setOptions(response.data);
      const res = await api.get(`https://${NGROK_URL}/repositories/get`);
      const repoOptions = res.data.map((rep) => ({
        key: rep.repoId,
        text: rep.name,
        value: rep.repoId,
      }));
      setRepo(repoOptions);
      logger.info("project Managers properly fetched");
    } catch (error) {
      logger.error("Error in fetching project managers", error);
    }
  };

  useEffect(() => {
    fetchprojectMangers();
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
    navigate("/addUser", {
      state: { selectedRepo },
    });
  };
  logger.info("Repo Id:", repoId);

  const handleRepoChange = (e, { value, options }) => {
    const selectedRepo = options.find((option) => option.value === value);
    setRepoId(value);
    setSelectedRepo(selectedRepo.text);
  };

  const handleSkip = () => {
    navigate("/addUser", {
      state: { selectedRepo },
    });
  };

  const onClose = () => {
    navigate(-1);
  };
  return (
    <Modal size="mini" open={true} className="form-modal" onClose={onClose}>
      <CloseButton onClick={onClose} />

      <Modal.Header>Add PM</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              Select Repo
              <span className="red-text">*</span>
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
            <label>
              PM Username
              <span className="red-text">*</span>
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
          <Button type="submit" primary onClick={handleSkip}>
            Skip
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
export default AddPm;
