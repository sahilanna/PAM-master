import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form,Button,Dropdown,Modal} from 'semantic-ui-react'
import { ngrokUrlSwe, ngrokUrl } from '../../../Assets/config';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import api from '../api';

function PmRequestForm() {
  const navigate = useNavigate()
  const location = useLocation();
  const { projectId } = location.state || {};
  const [requestStatus, setRequestStatus] = useState('');
  let [projectName, setProjectName] = useState('');
  const[users,setUsers]=useState([])
  const [proj,setproj]=useState([])
  let [selectedUser, setSelectedUser] = useState('');
  const[item,setitem]=useState('');
  let [selectedPm, setSelectedPm] = useState([]);
  const[pm,setPms]=useState([])
  const [selectedUserId, setSelectedUserId] = useState('');
  const[userObj,setUserObj]=useState([])
  const[projectObj,setProjectObj]=useState([])
  const[requestDescription,setRequestDescription]=useState([])
  const [selectedProjId, setSelectedProjId] = useState('');
  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);
  console.log(profileData)
  const id=pdata.id
  const pname=pdata.name;
  const pemail=pdata.email;
  const prole=pdata.enumRole;
  console.log(pname)
  const handleUserChange = (event, { value }) => {
    const selectedUserObj = userObj.find(userr => userr.name === value);
    if (selectedUserObj) {
      setSelectedUser(value);
      setSelectedUserId(selectedUserObj.id);
    }
  };
  const handleProjChange = (event, { value }) => {
    const selectedProjObj = projectObj.find(pro => pro.projectName === value);
    if (selectedProjObj) {
      setSelectedProjId(value);
      setSelectedProjId(selectedProjObj.projectId);
    }
    setitem(value);
  };
  const handlePmChange = (e, { value }) => {
    setSelectedPm(value);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/allProjects`);
      // setitem(response.data)
      setProjectObj(response.data)
     console.log(response.data)
     console.log(response.data.projectId)
     const projectNames = response.data.map(project => project.projectName);
     setproj(projectNames);
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };
  useEffect(() => {
    fetchPms();
  }, [])
  const fetchPms = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/role/project_manager`);
     console.log(response.data)
     const pmNames = response.data.map(pm => pm.name);
     setPms(pmNames);
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };
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
projectName=item;
 const Description=(e)=>
{
setRequestDescription(e.target.value)
}
const pmName = pname;
console.log(pmName)
  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(selectedUserId)
      console.log(selectedProjId);
      console.log(requestDescription);
      try {
         const user={
              id: selectedUserId,
          }
        const  project={
              projectId: selectedProjId,
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
          <label style={{textAlign:'left'}}>Projects</label>
          <Dropdown
            placeholder="Select Project"
            fluid
            selection
            options={proj.map((name, index) => ({
              key: index,
              text: name,
              value: name
            }))}
            value={item}
            onChange={handleProjChange}
          />
        </Form.Field>
        {/* <Form.Field>
          <label style={{textAlign:'left'}}>PMs</label>
          <Dropdown
            placeholder="Select PM"
            fluid
            selection
            options={pm.map((name, index) => ({
              key: index,
              text: name,
              value: name
            }))}
            value={selectedPm}
            onChange={handlePmChange}
          />
        </Form.Field> */}
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