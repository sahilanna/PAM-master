import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import AddUserModal from './addUserModal';
import { GIT_ACCESS_TOKEN, NGROK_URL } from '../../../../../network/config';
import { REPO_OWNER } from '../../../../../assets/constants/owner';
import api from '../../../../../network/api';
import logger from "../../../../../utils/logger.js";



const AddUser = () => {
  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const { state } = useLocation();
  const { selectedRepo } = state || {};
  const [username, setUsername] = useState([]);

  const handleUserNameChange = (event, { value }) => {
    setUsername(value)
  }

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await api.get(`https://${NGROK_URL}/usernames/role/user`);
        setOptions(response.data);
        logger.info("Github usernames successfully fetched")
      } catch (error) {
        logger.error("Error fetching in usernames",error);
      }
    };
    fetchUsernames();
  }, []);

  const handleSubmitUser = (e) => {
    e.preventDefault();
    const accessToken = GIT_ACCESS_TOKEN;
    let repo = selectedRepo;
    let owner = REPO_OWNER;
    api.post(`https://${NGROK_URL}/collaborators/add`, { owner, repo, username, accessToken })
    navigate('/repoRead');
    logger.info("Triggered handle submit function");
  }

  const onClose = () => {
    navigate(-1);
  }

  return (
    <AddUserModal
      selectedRepo={selectedRepo}
      options={options}
      username={username}
      handleUserNameBChange={handleUserNameChange}
      handleSubmit={handleSubmitUser}
      onClose={onClose}
    />
  );
}
export default AddUser;