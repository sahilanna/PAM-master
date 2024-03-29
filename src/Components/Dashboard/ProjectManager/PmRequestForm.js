import React, { useState, useEffect } from 'react';
import {Form,Button,Dropdown,Modal} from 'semantic-ui-react'
import {ngrokUrl } from '../../../Assets/config';
import { useNavigate, useLocation } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import api from '../api';
function PmRequestForm() {
  const navigate = useNavigate()
  const location = useLocation();
  const { projectId } = location.state || {};
  const [requestStatus, setRequestStatus] = useState('');
  let {projectName} = location.state||{};
  const[users,setUsers]=useState([])
  let [selectedUser, setSelectedUser] = useState('');
  
  const [selectedUserId, setSelectedUserId] = useState('');
  const[userObj,setUserObj]=useState([])
  const[requestDescription,setRequestDescription]=useState([])
  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);

  console.log(profileData)
  console.log(requestStatus)
  const pmName=pdata.name;
  
  const handleUserChange = (event, { value }) => {
    const selectedUserObj = userObj.find(userr => userr.name === value);
    if (selectedUserObj) {
      setSelectedUser(value);
      setSelectedUserId(selectedUserObj.id);
    }
  };
  console.log(projectName)
  
 
  useEffect(() => {
    fetchUsers();
  }, [])
  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/withoutProject?role=user&projectId=${projectId}`);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        const userNames = response.data.map(users => users.name);
        setUsers(userNames);
        setUserObj(response.data)
      } else {
        console.log('Invalid response: users data is not an array');
      }
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };

 const Description=(e)=>
{
setRequestDescription(e.target.value)
}

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(selectedUserId)
      console.log(requestDescription);
      try {
         const user={
              id: selectedUserId,
          }
        const  project={
              projectId: projectId,
          }
        const response = await api.post(`https://${ngrokUrl}/api/request/`, { pmName, user, project, requestDescription
        });
        if (response.data.success) {
          setRequestStatus('Request submitted successfully');
        }
        navigate('/PmDashboard')
      } catch (error) {
        console.error('Error submitting request:', error);
      }
    };
    const onClose =()=>{
      navigate(-1);
    }
  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
    <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
      </div>
      <div style={{paddingLeft:'442px'}}>
    <Button secondary onClick={onClose}>
        X
      </Button>
      </div>
    <Modal.Header>Request Form To Add User</Modal.Header>
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label style={{textAlign:'left'}}>Project Name</label>
        
          <input name="name" placeholder={projectName} readOnly />
    </Form.Field>
  
        <Form.Field>
  <label style={{ textAlign: 'left' }}>User</label>
  {users.length > 0 ? (
    <Dropdown
      placeholder="Select User"
      fluid
      selection
      options={users.map((name, index) => ({
        key: index,
        text: name,
        value: name
      }))}
      value={selectedUser}
      onChange={handleUserChange}
    />
  ) : (
    <p>No users available</p>
  )}
</Form.Field>
        <Form.Field>
          <label style={{textAlign:'left'}}>Description:</label>
          <input type="text" id="Description" required onChange={Description} />
          </Form.Field>
     <Button type='submit'>Submit</Button>
   </Form>
   </Modal.Content>
   <Modal.Actions>
   </Modal.Actions>
   </Modal>
  );
}
export default PmRequestForm;