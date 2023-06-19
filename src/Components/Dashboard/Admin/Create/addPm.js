import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal } from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddUser from './addUser.js';
import { useDispatch } from 'react-redux';
import { createPmGithubName } from '../../../../Login/redux-store/actions/action.js';
import NavBarA from '../NavbarA';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl } from '../../../../Assets/config.js';
import { ngrokUrlSwe } from '../../../../Assets/config.js';


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
  useEffect(() => {
    fetch(`https://${ngrokUrlSwe}/usernames/role/project_manager`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }}).then((response)=>response.json())
    .then((data)=>setOptions(data))
  
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setError(true);
    const owner='swe1304';
    const accessToken='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';

    let repo = selectedRepo
    const response= axios.post(`https://${ngrokUrlSwe}/api/collaborators/add`,{owner, repo,username,accessToken
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






