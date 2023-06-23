import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableCell,Icon } from 'semantic-ui-react';
import './userHistory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl } from '../../../../Assets/config';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';

function UserHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/all`);
      setHistoryData(response.data);
      setIsLoading(false);
     
    } catch (error) {
      console.log('Error fetching user history:', error);
      setIsLoading(true);
    }
  }

  return (
    <div className='parent-admin'>
      
        <Sidebar/>
   
      
      <br />
      <br />
     
      
      <div className='admin-child'>
      <br/>
      <h1 style={{fontFamily:'sans-serif'}}>User History</h1>
      <div style={{ marginLeft: '20px', marginRight: '30px' }}>
      {isLoading ? (
            <LoadingPage />
          ) : (
        <Table  class="ui celled table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Project Id</Table.HeaderCell>
              <Table.HeaderCell>Project Name</Table.HeaderCell>
              <Table.HeaderCell>Project Description</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
              <Table.HeaderCell className='text-center'>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {historyData.map((entry) => (
              <Table.Row key={entry.projectId}>
                <Table.Cell>{entry.projectId}</Table.Cell>
                <Table.Cell>{entry.projectName}</Table.Cell>
                <Table.Cell>{entry.projectDescription}</Table.Cell>
                <Table.Cell style={{ color: 'blue' }}>
        {new Date(entry.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </Table.Cell>
                <Table.Cell className='text-center'>
        {entry.status ? (
          <Icon name="close" color="red" />
        ) : (
          <Icon name="check" color="green" />
        )}
      </Table.Cell>
                {/* <Table.Cell>{entry.status ? "Inactive" : "Active"}</Table.Cell> */}


               
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
         )}
        </div>
        
      </div>
         
    </div>
  );
}

export default UserHistory;
