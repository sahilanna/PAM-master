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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/request/all`);
      setRequestData(response.data);
      setIsLoading(false);
      console.log(response.data)
      console.log(requestData)
    } catch (error) {
      console.log('Error fetching Users:', error);
      setIsLoading(true);
    }
  };

  const AcceptRequest = async (accessRequestId) => {
    try {
      const response = await axios.put(
        `https://${ngrokUrl}/api/request/update/${accessRequestId}`,
        { allowed: true }
      );
      if (response.status === 200|| response.status === 204|| response.status === 201) {
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
    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  const DeclineRequest = async (accessRequestId) => {
    try {
      const response = await axios.put(
        `https://${ngrokUrl}/api/request/update/${accessRequestId}`,
        { allowed: false }
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
        <div style={{ marginLeft: '20px', marginRight: '30px', marginTop: '20px' }}>
          
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
                    <Button color="green" onClick={() => AcceptRequest(item.accessRequestId)}>
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
