import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form,Button,Dropdown} from 'semantic-ui-react'
import { ngrokUrlSwe, ngrokUrl } from '../../../Assets/config';

function PmRequestForm() {
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
    


  const handleUserChange = (event, { value }) => {
    const selectedUserObj = userObj.find(user => user.name === value);
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
      const response = await axios.get(`https://${ngrokUrlSwe}/api/projects/allProjects`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
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
      const response = await axios.get(`https://${ngrokUrlSwe}/api/users/role/project_manager`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
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
      const response = await axios.get(`https://${ngrokUrlSwe}/api/users/get`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      console.log(response.data);
      console.log(response.data[1].id)
  
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


 
 
  
 
  
  const handleSubmit = async (e) => {

  
      e.preventDefault();
      console.log(selectedUserId)
      console.log(selectedProjId);
      console.log(requestDescription);
      const pmName =selectedPm;
      console.log(pmName)
     
    
      try {
        const response = await axios.post(`https://${ngrokUrl}/api/request/`, { selectedProjId, selectedUserId,
          pmName, requestDescription
        });
    
        if (response.data.success) {
          setRequestStatus('Request submitted successfully');
        } else {
          setRequestStatus('Failed to submit request');
        }
      } catch (error) {
        console.error('Error submitting request:', error);
        setRequestStatus('Failed to submit request');
      }
    };
    

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Field>
            <label>PMs</label>
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
            </Form.Field>
        <Form.Field>
            <label>Projects</label>
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
        
       
        
        <Form.Field>
            <label>User</label>
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
          </Form.Field>
        <Form.Field>
        <label htmlFor="projectName">Description:</label>
        <input type="text" id="Description" required onChange={Description}/>
        </Form.Field>
       

        <Button type="submit">Submit Request</Button>
      </Form>

      <p>{requestStatus}</p>
    </div>
  );
}

export default PmRequestForm;
