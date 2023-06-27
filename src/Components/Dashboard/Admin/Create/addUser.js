import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal} from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddPm from './addPm';
import NavBarA from '../NavbarA';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import api from '../../api';

const AddUser = () => {

  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [error,setError]=useState('false');
  const { state } = useLocation();
  const { selectedRepo } = state || {};
  // const[username,setusername]= useState([]);
  const [userNameB,setUserNameB]=useState('')
 
  
  const[username,setusername]=useState([]);
  const handleUserNameBChange=(event,{value})=>{
    setusername(value)

  }
  const handleBack = () => {
    navigate(-1); 
  };

  
  //  useEffect(() => {
  //   fetch(`https://${ngrokUrl}/usernames/role/user`,{
  //     headers: {
  //       'ngrok-skip-browser-warning': 'true'
  //     }}).then((response)=>response.json())
  //   .then((data)=>setOptions(data))

  
  // }, []);

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




  const handleSubmit=(e)=>{
    e.preventDefault();
    const owner='swe1304';
    const accessToken='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';
 
    let repo = selectedRepo;
    const response= api.post(`https://${ngrokUrl}/api/collaborators/add`,{owner, repo,username,accessToken
  })
  navigate('/repoRead')
    
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
        <Modal.Header>Add User</Modal.Header>

        <Modal.Content>

          <Form onSubmit={handleSubmit}>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Repository Name</label>
          <input name="repoName" value={selectedRepo || ''} readOnly  />
        </Form.Field>
       
        <Form.Field>
  <label style={{ textAlign: 'left' }}>User Username</label>
 
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
               onChange={handleUserNameBChange}
            />

    </Form.Field>
    <Button type='submit'>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
  )
}



export default AddUser;