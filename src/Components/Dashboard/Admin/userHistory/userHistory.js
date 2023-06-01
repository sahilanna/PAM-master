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
import { Table } from 'semantic-ui-react';
import './userHistory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('https://6429847d5a40b82da4d494b2.mockapi.io/userHsitory');
      setHistoryData(response.data);
    } catch (error) {
      console.log('Error fetching user history:', error);
    }
  }

  return (
    <div>
      <div>
        <h1 style={{fontFamily:'sans-serif'}}>User History</h1>
      </div>
      <br />
      <br />
      <div style={{ marginLeft: '20px', marginRight: '30px' }}>
        <Table  class="ui celled table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Projects</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {historyData.map((entry) => (
              <Table.Row key={entry.id}>
                <Table.Cell>{entry.projectName}</Table.Cell>
                
                
                
                <Table.Cell class='positive'>{entry.status}</Table.Cell>

                <Table.Cell>{entry.lastupdated}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default UserHistory;
