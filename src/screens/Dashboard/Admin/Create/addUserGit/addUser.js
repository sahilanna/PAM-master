import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { GIT_ACCESS_TOKEN, NGROK_URL } from '../../../../../network/config';
import api from '../../../../../network/api';
import AddUserUI from './addUserUI';
import { REPO_OWNER } from '../../../../../assets/Constants/owner';
const AddUser = () => {
  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const { state } = useLocation();
  const { selectedRepo } = state || {};
  const [username, setusername] = useState([]);

  const handleUserNameBChange = (event, { value }) => {
    setusername(value)
  }

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await api.get(`https://${NGROK_URL}/usernames/role/user`);
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = GIT_ACCESS_TOKEN;
    let repo = selectedRepo;
    let owner = REPO_OWNER;
    api.post(`https://${NGROK_URL}/collaborators/add`, { owner, repo, username, accessToken })
    navigate('/repoRead');
  }

  const onClose = () => {
    navigate(-1);
  }

  return (
    <AddUserUI
      selectedRepo={selectedRepo}
      options={options}
      username={username}
      handleUserNameBChange={handleUserNameBChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}
export default AddUser;