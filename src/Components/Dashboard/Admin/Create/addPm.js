import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal } from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddUser from './addUser.js';
import { useDispatch } from 'react-redux';
import { createPmGithubName } from '../../../../Login/redux-store/actions/action.js';
import NavBarA from '../NavbarA.js';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl } from '../../../../Assets/config.js';
import api from '../../api.js';



const AddPm = () => {
  
  
  const [options, setOptions] = useState([]);
  const [error,setError]=useState('false');
  let navigate = useNavigate()
  const { state } = useLocation();
  let{ selectedRepo } = state || {};
  // selectedRepo = selectedRepo || '';
  const[username,setusername]= useState([]);
  let[projectNameA,setProjectNameA]=useState('')
  let[userNameA,setUserNameA]=useState('')

  // console.log("uuuuu",selectedRepo);

  const handleUserNameChange=(event,{value})=>{
    setusername(value)

  }
 

  const handleBack = () => {
    navigate(-1); 
  };
  // console.log("Plz work",selectedRepo)
  // useEffect(() => {
  //   fetch(`https://${ngrokUrl}/usernames/role/project_manager`).then((response)=>response.json())
  //   .then((data)=>setOptions(data))
  
  // }, []);
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/usernames/role/project_manager`);
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsernames();
  }, []);
  // useEffect(() => {
  //   const fetchUsernames = async () => {
  //     try {
  //       const response = await api.get(`https://${ngrokUrl}/usernames/role/project_manager`);
  //       const data = response.data;
  
  //       // Assuming the response data is an array of strings
  //       const dropdownOptions = data.map((name, index) => ({
  //         key: index,
  //         text: name,
  //         value: name
  //       }));
  
  //       setOptions(dropdownOptions);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUsernames();
  // }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setError(true);
    const owner='swe1304';
    const accessToken='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';

    let repo = selectedRepo
    const response= api.post(`https://${ngrokUrl}/api/collaborators/add`,{owner, repo,username,accessToken
    })
    
    
    navigate('/addUser', { state: { selectedRepo } });
    
  }
  const onClose=()=>{
    navigate(-1);
  }
  
 
  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
    <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
    
      </div>
      <div style={{paddingLeft:'460px'}}>
    <Button secondary onClick={onClose}>
        X
      </Button>
      </div>
      <Modal.Header>Add PM</Modal.Header>

      <Modal.Content>

        <Form onSubmit={handleSubmit}>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Repository Name</label>
          <input name="repoName" value={selectedRepo || ''} readOnly />
        </Form.Field>


        <Form.Field>
  <label style={{ textAlign: 'left' }}>PM Username</label>
 
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

<Button type='submit'>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
  );
};

export default AddPm;






