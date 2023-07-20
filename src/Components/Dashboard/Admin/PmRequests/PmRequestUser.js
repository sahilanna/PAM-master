import React, { useState, useEffect} from 'react';
import { Table, Button,Modal } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';


function PmRequestUser() {
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[resData, setresData]=useState('')

 
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
 
    
    const headers={AccessToken:accessToken}


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/request/all`);
      setRequestData(response.data);
      console.log(response.data)
      setIsLoading(false);
       console.log(requestData)
    requestData.forEach((request) => {
        const userId = request.user.id; 
        const projectId = request.project.projectId;
  
        console.log(userId);
        console.log(projectId);
  
        
      });



    } catch (error) {
      console.log('Error fetching Users:', error);
      setIsLoading(true);
    }
  };

  const AcceptRequest = async (accessRequestId, id, projectId) => {
    try {
      const response = await api.put(
        `https://${ngrokUrl}/api/request/update/${accessRequestId}`,
        { allowed: true },{headers}
      );
    console.log("Helllo",response);
      if (response.status === 200 || response.status === 204 || response.status === 201) {
        
        
  
        const secondResponse = await api.put(
          `https://${ngrokUrl}/api/projects/${projectId}/users/${id}`
        );
  
        if (secondResponse.status === 200 || secondResponse.status === 204 || secondResponse.status === 201) {
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
      } else {
        toast.error('Failed to update request. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log('Error updating request:', error);
      toast.error('Failed to update request. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
  

  const DeclineRequest = async (accessRequestId) => {
    try {
      const response = await api.put(
        `https://${ngrokUrl}/api/request/update/${accessRequestId}`,
        { allowed: false },{headers}
      );
      if (response.status === 200 || response.status === 204) {
        toast.error('Access denied', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        fetchData();
      }
    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  return (
    <div className="parent-admin">
      <Sidebar />
      <div className="admin-child">
        <div style={{  marginLeft: '20px',
            marginRight: '30px',
            marginTop: '-70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', }}>
          
        {requestData.length > 0 ? (
          <Table className="ui-celled-table">
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
              
              
              {requestData.map((item)=> (
                <Table.Row key={item.accessRequestId}>
                  <Table.Cell>{item.pmName}</Table.Cell>
                  <Table.Cell>{item.project?.projectName}</Table.Cell>
                  <Table.Cell>{item.user?.name}</Table.Cell>
                  <Table.Cell>{item.requestDescription}</Table.Cell>
                  <Table.Cell>
                    <Button color="green" onClick={() => AcceptRequest(item.accessRequestId,item.user.id, item.project.projectId)}>
                      Accept
                    </Button>
                    <Button color="red" onClick={() => DeclineRequest(item.accessRequestId)}>
                      Decline
                    </Button>
                    <ToastContainer />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          
          </Table>
            ):(<h2>No requests right now!</h2>)}
        </div>
      </div>
    </div>
  );
}


export default PmRequestUser;
