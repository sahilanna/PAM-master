import React from 'react'
import { useState, useEffect } from 'react';
import { button } from 'semantic-ui-react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

function Reports() {
    const [userProjectList, setUserProjectlist] = useState(false);
    const [showOtherTable, setShowOtherTable] = useState(false);
    const [item, setItem] = useState([]);
    const[mitem,setmitem]=useState([])
  
    useEffect(() => {
      fetchUserProjectList();
      fetchOtherTableData();
    }, []);
  

    async function fetchUserProjectList() {
          try {
            const response = await axios.get('https://7db4-106-51-70-135.ngrok-free.app/api/users/getAll',{
              headers: {
                'ngrok-skip-browser-warning': 'true'
              }
            });
            setItem(response.data);
            console.log(response);
            setUserProjectlist(response.data);
          
          } catch (error) {
            console.log('Error fetching user project list:', error);
          }
        }
        
        async function fetchOtherTableData() {
          try {
            const response1 = await axios.get('https://7db4-106-51-70-135.ngrok-free.app/api/users/getMultiple',{
              headers: {
                'ngrok-skip-browser-warning': 'true'
              }
            });
            setmitem(response1.data)
            setShowOtherTable(response1.data);
          } catch (error) {
            console.log('Error fetching other table data:', error);
          }
        }
      
  
    const handleTableClick = () => {
      setUserProjectlist(true);
      setShowOtherTable(false);
    };
  
    const handleOtherTableClick = () => {
      setUserProjectlist(false);
      setShowOtherTable(true);
    };
    const csvData1 = item.map((entry) => ({
      'User Id': entry.userId,
      'User Name': entry.userName,
      Projects: entry.projectNames.join(', '),
    }));
    const csvData2 = mitem.map((entry) => ({
      'User Id': entry.userId,
      'User Name': entry.userName,
      Projects: entry.projectNames.join(', '),
    }));
    
    return (
      <div>
        <h1> Reports</h1>
        <br/>
        <br/>
        
        <button className='btn btn-danger mx-2' onClick={handleTableClick}>User Project List</button>
        <button  className='btn btn-danger mx-2' onClick={handleOtherTableClick}>Users With Multiple Project Access</button>
       <br/><br/>

       
    <div>
    {userProjectList && (
        <div style={{ marginLeft: '40px', marginRight: '40px' }}>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              {item.map((entry,index) => (
                <tr key={entry.userId}>
                  <td>{entry.userId}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.projectNames}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
        {item.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <CSVLink data={csvData1} filename="user_project_list.csv" className="btn btn-primary">
            Download CSV
          </CSVLink>
        </div>
        )}
        </div>
        </div>
        
        
      )}
      </div>
      
      
      <div>
        {showOtherTable && (
            <div style={{marginLeft:'40px',marginRight:'40px'}}>
          
             <table  class="ui celled table">
             <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              {mitem.map((entry,index) => (
                <tr key={entry.userId}>
                  <td>{entry.userId}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.projectNames}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
        {mitem.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <CSVLink data={csvData2} filename="user_project_list.csv" className="btn btn-primary">
            Download CSV
          </CSVLink>
        </div>
        )}
        </div>
          </div>
          
          
            
          
        )}
        </div>
      
      </div>
    );
  }

  export default Reports;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from 'semantic-ui-react';

// function Reports() {
//   const [userProjectList, setUserProjectList] = useState([]);
//   const [showOtherTable, setShowOtherTable] = useState([]);
  
//   useEffect(() => {
//     fetchUserProjectList();
//     fetchOtherTableData();
//   }, []);

//   async function fetchUserProjectList() {
//     try {
//       const response = await axios.get('https://3cb3-106-51-70-135.ngrok-free.app/api/users/getAll');
//       setUserProjectList(response.data);
//     } catch (error) {
//       console.log('Error fetching user project list:', error);
//     }
//   }
  
//   async function fetchOtherTableData() {
//     try {
//       const response = await axios.get('your-other-table-api');
//       setShowOtherTable(response.data);
//     } catch (error) {
//       console.log('Error fetching other table data:', error);
//     }
//   }

//   const handleTableClick = () => {
//     setUserProjectList(true);
//     setShowOtherTable(false);
//   };

//   const handleOtherTableClick = () => {
//     setUserProjectList(false);
//     setShowOtherTable(true);
//   };

//   return (
//     <div>
//       <h1>Reports</h1>
//       <br />
//       <br />

//       <Button className='btn btn-danger mx-2' onClick={handleTableClick}>User Project List</Button>
//       <Button className='btn btn-danger mx-2' onClick={handleOtherTableClick}>Users With Multiple Project Access</Button>
//       <br /><br />

//       {userProjectList.length > 0 && (
//         <div style={{ marginLeft: '40px', marginRight: '40px' }}>
//           <table className="ui celled table">
//             <thead>
//               <tr>
//                 <th>User Id</th>
//                 <th>User Name</th>
//                 <th>Projects</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userProjectList.map((entry) => (
//                 <tr key={entry.userId}>
//                   <td>{entry.userName}</td>
//                   <td>{entry.projectNames}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showOtherTable.length > 0 && (
//         <div style={{ marginLeft: '40px', marginRight: '40px' }}>
//           <table className="ui celled table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Projects</th>
//               </tr>
//             </thead>
//             <tbody>
//               {showOtherTable.map((entry) => (
//                 <tr key={entry.id}>
//                   <td>{entry.name}</td>
//                   <td>{entry.email}</td>
//                   <td>{entry.projects}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Reports;
