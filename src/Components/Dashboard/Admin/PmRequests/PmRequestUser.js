import React, { useState, useEffect} from 'react';
import { Table, Button,Modal } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl } from '../../../../Assets/config';


function PmRequestUser() {
  const[requestData,setRequestData]=useState([])
  const[showPopup, setShowPopup]=useState(false)
    const navigate=useNavigate()
    
  const [data, setData] = useState([]);
  const[id,setId]=useState('');


  const AcceptRequest = async (accessRequestId) => {
    try{
      let accessId=accessRequestId;
      console.log(accessId)

      const response= await axios.put(
        `https://${ngrokUrl}/api/request/update/${accessId}`,
        { 'allowed': true }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success('User added successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        
            fetchData();
       
  
          
         
        } else {
          toast.error('Failed to add user. Please try again.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      }) }
      catch(error) {
        console.log('Error adding user:', error);
      };
  };

  
   
   
   
   
    

  const DeclineRequest = async (accessRequestId) => {
    try{
      let accessId=accessRequestId;
      console.log(accessId)

      const response= await axios.put(
        `https://${ngrokUrl}/api/request/update/${accessId}`,
        { 'allowed': false}
      )
      .then((response) => {
        if (response.status === 200 || response.status===204) {
          toast.error('access denied', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
         
            fetchData();
          
         
        } 
      })
    }
    
      catch(error) {
        console.log('Error adding user:', error);
      }
   
   
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://${ngrokUrl}/api/request/all`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      }).then((response)=>{
      console.log(response.data)
     setId(response.data.accessRequestId);
     setRequestData(response.data)
 
      })
  
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  }
  


  return (
    <div className='parent-admin'>
      <Sidebar/>
    <div className='admin-child'>
      <div style={{marginLeft:'20px',marginRight:'30px', marginTop:'20px'}}>
    <Table className='ui-celled-table'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Project Manager</Table.HeaderCell>
          <Table.HeaderCell>Project</Table.HeaderCell>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {requestData.map((item) => (
          <Table.Row key={item.accessRequestId}>
            <Table.Cell>{item.pmName}</Table.Cell>
            <Table.Cell>{item.project?.projectName}</Table.Cell>
            <Table.Cell>{item.user?.name}</Table.Cell>
            <Table.Cell>{item.accessDescription}</Table.Cell>
            <Table.Cell>
              
              <Button color="green" onClick={AcceptRequest .bind(null, item.accessRequestId )}>Accept</Button>
              <Button color="red" onClick={DeclineRequest.bind(null,item.accessRequestId)}>Decline</Button>
              <ToastContainer />
              
             
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
    </div>
    </div>
  );
}

export default PmRequestUser;
