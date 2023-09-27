import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal, Button} from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import { gitAccessToken, ngrokUrl } from '../../../../../network/config';
import api from '../../../../../network/api';
import AddUserUI from './addUserUI';
import { owner } from '../../../../../Assets/constants/string';

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
        const response = await api.get(`https://${ngrokUrl}/usernames/role/user`);
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = gitAccessToken;
    let repo = selectedRepo;
    api.post(`https://${ngrokUrl}/collaborators/add`, { owner, repo, username, accessToken })
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