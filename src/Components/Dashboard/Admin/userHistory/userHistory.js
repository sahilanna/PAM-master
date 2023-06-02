// import React from 'react'
// import { table } from 'semantic-ui-react'

// function userHistory() {
//   return (
//     <div>
//         <div>
//             <h1>User History</h1>
//         </div>
//         <br/>
//         <br/>
//         <div style={{marginLeft:'20px',marginRight:'30px'}}>
//         <table class="ui celled table">
//   <thead>
//     <tr>
//       <th>Projects</th>
//       <th>Status</th>
//       <th>Last Updated</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>project 1</td>
//       <td><i class="icon checkmark">Completed</i></td>
//       <td class="negative">None</td>
//     </tr>
//     <tr class="positive">
//       <td>project 3</td>
//       <td><i class="icon checkmark"></i> Approved</td>
//       <td>3/1/22</td>
//     </tr>
//     <tr>
//       <td>project 2</td>
//       <td>Unknown</td>
//       <td class="positive"><i class="icon close"></i> Requires call</td>
//     </tr>


    
    
//   </tbody>
// </table>
// </div>
//     </div>
//   )
// }

// export default userHistory

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableCell,Icon } from 'semantic-ui-react';
import './userHistory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl } from '../../../../Assets/config';

function UserHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`https://${ngrokUrl}/api/projects/all`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }});
      setHistoryData(response.data);
     
    } catch (error) {
      console.log('Error fetching user history:', error);
    }
  }

  return (
    <div className='parent-admin'>
      <div>
        <Sidebar/>
      </div>
      
      <br />
      <br />
      
      <div className='admin-child'>
      <h1 style={{fontFamily:'sans-serif'}}>User History</h1>
      <div style={{ marginLeft: '20px', marginRight: '30px' }}>
        <Table  class="ui celled table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Project Id</Table.HeaderCell>
              <Table.HeaderCell>Project Name</Table.HeaderCell>
              <Table.HeaderCell>Project Description</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
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
                <Table.Cell>
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
        </div>
      </div>
    </div>
  );
}

export default UserHistory;
