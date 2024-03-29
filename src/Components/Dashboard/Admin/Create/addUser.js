import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal, Button} from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import { gitAccessToken, ngrokUrl } from '../../../../Assets/config';
import api from '../../api';

const AddUser = () => {
  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const { state } = useLocation();
  const { selectedRepo } = state || {};
  const[username,setusername]=useState([]);
  const handleUserNameBChange=(event,{value})=>{
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
  const handleSubmit=(e)=>{
    e.preventDefault();
    const owner='Bindushree-0906';
    const accessToken= gitAccessToken
    let repo = selectedRepo;
    api.post(`https://${ngrokUrl}/api/collaborators/add`,{owner, repo,username,accessToken
  })
  navigate('/repoRead')
}
const onClose=()=>{
  navigate(-1);
}
  return (

    <Modal open={true} onClose={onClose} style={{ width: '500px', height:'450px' }} className='create-Project-Modal'>
      <div style={{paddingTop:'6px'}}>

        </div>
        <div style={{paddingLeft:'440px'}}>
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
  <label style={{ textAlign: 'left' }}>User Username<span style={{ color: 'red' }}>*</span></label>

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
    <Button type='submit'primary>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
        </Modal>
  )
}
export default AddUser;