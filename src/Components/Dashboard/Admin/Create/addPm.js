import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal } from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddUser from './addUser.js';
import { useDispatch } from 'react-redux';
import { createPmGithubName } from '../../../../Login/redux-store/actions/action.js';
import NavBarA from '../NavbarA.js';
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl, gitAccessToken } from '../../../../Assets/config.js';
import api from '../../api.js';



const AddPm = () => {
  const [options, setOptions] = useState([]);
  const [repo, setRepo] = useState('');
  const [error,setError]=useState('false');
  let navigate = useNavigate()
  const [formError, setFormError] = useState('');
  const { state } = useLocation();

  const[username,setusername]= useState([]);
  let[projectNameA,setProjectNameA]=useState('')
  let[userNameA,setUserNameA]=useState('')
  const[repoId,setRepoId]=useState('')
  const[selectedRepo, setSelectedRepo]=useState('')

  const accessToken=gitAccessToken
  const handleUserNameChange=(event,{value})=>{
    setusername(value)
  }
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/usernames/role/project_manager`);
        setOptions(response.data);
        const res = await api.get(`https://${ngrokUrl}/api/repositories/get`);
          const repoOptions = res.data.map(rep => ({
            key: rep.repoId,
            text: rep.name,
            value: rep.repoId
          }));
          setRepo(repoOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!selectedRepo){
      return
    }
    setError(true);
    const owner='swe1304';
    let repo = selectedRepo
    const response= api.post(`https://${ngrokUrl}/api/collaborators/add`,{owner, repo,username,accessToken
    })
    navigate('/addUser', { state: { selectedRepo } });
  }
  const handleRepoChange=(e, { value, options})=>{
    const selectedRepo = options.find((option) => option.value === value);
    setRepoId(value)
    console.log(repoId)
    setSelectedRepo(selectedRepo.text);
  }


  const handleRepoChange=(e, { value, options})=>{
    const selectedRepo = options.find((option) => option.value === value);
    setRepoId(value)  
    console.log(repoId)
    setSelectedRepo(selectedRepo.text);
  }
  const onClose=()=>{
    navigate(-1);
  }
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px', height:'450px' }} className='create-Project-Modal'>
    <div style={{paddingTop:'6px'}}>

      </div>
      <div style={{paddingLeft:'440px'}}>
    <Button secondary  onClick={onClose}>
        X
      </Button>
      </div>
      <Modal.Header>Add PM</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
        <Form.Field>
           <label style={{ textAlign: 'left' }}>Select Repo<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Repo"
              fluid
              selection
              options={repo}
              // value={item1}
              onChange={handleRepoChange}
            />
          </Form.Field>

        <Form.Field>
  <label style={{ textAlign: 'left' }}>PM Username<span style={{ color: 'red' }}>*</span></label>

  <Dropdown
              placeholder="Select Username"
              fluid
              selection
              options={options.map((name, index) => ({
                key: index,
                text: name,
                value: name
              }))}
              value={username}
               onChange={handleUserNameChange}
            />
            </Form.Field>
            {formError && <p style={{ color: 'red' }}>{formError}</p>}

<Button type='submit' primary disabled={!selectedRepo}>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
        </Modal>
  );
};
export default AddPm;






