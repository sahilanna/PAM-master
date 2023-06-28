import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import Sidebar from '../../SideBar/SideBar';
import '../AdminDashboard.css'
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';

function Reports() {
  const [item, setItem] = useState([]);
  const [mitem, setMItem] = useState([]);
  const [showOtherTable, setShowOtherTable] = useState(false);

  useEffect(() => {
    fetchUserProjectList();
    fetchOtherTableData();
  }, []);

  async function fetchUserProjectList() {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/getAll`);
      setItem(response.data);
    } catch (error) {
      console.log('Error fetching user project list:', error);
    }
  }

  async function fetchOtherTableData() {
    try {
      const response1 = await api.get(`https://${ngrokUrl}/api/users/getMultiple`);
      setMItem(response1.data);
    } catch (error) {
      console.log('Error fetching other table data:', error);
    }
  }

  const handleTableClick = () => {
    setShowOtherTable(false);
  };

  const handleOtherTableClick = () => {
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
    <div className='parent-admin'>
      <div>
        <Sidebar/>
      </div>

      <div className='admin-child'>
        <br/>
       
        <div>
          <Button style={{ marginRight: '20px' }} onClick={handleTableClick}>User Project List</Button>
          <Button onClick={handleOtherTableClick}>Users With Multiple Project Access</Button>
        </div>
        <br/><br/>

        {item.length > 0 && !showOtherTable && (
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
                {item.map((entry, index) => (
                  <tr key={entry.userId}>
                    <td>{entry.userId}</td>
                    <td>{entry.userName}</td>
                    <td>{entry.projectNames.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {item.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <CSVLink data={csvData1} filename="user_project_list.csv" className="btn btn-primary">
                  Download CSV
                </CSVLink>
              </div>
            )}
          </div>
        )}

        {mitem.length > 0 && showOtherTable && (
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
                {mitem.map((entry, index) => (
                  <tr key={entry.userId}>
                    <td>{entry.userId}</td>
                    <td>{entry.userName}</td>
                    <td>{entry.projectNames.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {mitem.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <CSVLink data={csvData2} filename="user_project_list.csv" className="btn btn-primary">
                  Download CSV
                </CSVLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;




// function Reports() {
//     const [userProjectList, setUserProjectlist] = useState(true);
//     const [showOtherTable, setShowOtherTable] = useState(true);
//     const [item, setItem] = useState([]);
//     const[mitem,setmitem]=useState([])

//     useEffect(() => {
//       fetchUserProjectList();
//       fetchOtherTableData();
//     }, []);
  

//     let data = sessionStorage.getItem("item");
//     let user = JSON.parse(data);
//     const accessToken=user.token
//     console.log(user)
//       console.log(user.token)
  

//     async function fetchUserProjectList() {
//           try {
//             const response = await api.get(`https://${ngrokUrl}/api/users/getAll`);
//             setItem(response.data);
//             console.log(response);
//             setUserProjectlist(response.data);
          
//           } catch (error) {
//             console.log('Error fetching user project list:', error);
//           }
//         }
        
//         async function fetchOtherTableData() {
//           try {
//             const response1 = await api.get(`https://${ngrokUrl}/api/users/getMultiple`);
//             setmitem(response1.data)
//             setShowOtherTable(response1.data);
//           } catch (error) {
//             console.log('Error fetching other table data:', error);
//           }
//         }
      
  
//     const handleTableClick = () => {
//       setUserProjectlist(true);
//       setShowOtherTable(false);
//     };
  
//     const handleOtherTableClick = () => {
//       setUserProjectlist(false);
//       setShowOtherTable(true);
//     };
//     const csvData1 = item.map((entry) => ({
//       'User Id': entry.userId,
//       'User Name': entry.userName,
//       Projects: entry.projectNames.join(', '),
//     }));
//     const csvData2 = mitem.map((entry) => ({
//       'User Id': entry.userId,
//       'User Name': entry.userName,
//       Projects: entry.projectNames.join(', '),
//     }));
    
//     return (
//       <div className='parent-admin'>
        
//         <div >
//           <Sidebar/>
//         </div>
        
        
//         <div className='admin-child'>
//           <br/>
//           <h1 style={{paddingRight:'80px'}}> Reports</h1>
//        <div>
//         <Button style={{marginRight:'20px'}}  onClick={handleTableClick}>User Project List</Button> 
//         <Button  onClick={handleOtherTableClick}>Users With Multiple Project Access</Button>
//         </div>
//        <br/><br/>

       
//     <div>
//     {userProjectList && (
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
//               {item.map((entry,index) => (
//                 <tr key={entry.userId}>
//                   <td>{entry.userId}</td>
//                   <td>{entry.userName}</td>
//                   {console.log(entry)}
//                   <td>{entry.projectNames.join(', ')}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div>
//         {item.length > 0 && (
//         <div style={{ marginTop: '20px' }}>
//           <CSVLink data={csvData1} filename="user_project_list.csv" className="btn btn-primary">
//             Download CSV
//           </CSVLink>
//         </div>
//         )}
//         </div>
//         </div>
        
        
//       )}
//       </div>
      
      
//       <div>
//         {showOtherTable && (
//             <div style={{marginLeft:'40px',marginRight:'40px'}}>
          
//              <table  class="ui celled table">
//              <thead>
//               <tr>
//                 <th>User Id</th>
//                 <th>User Name</th>
//                 <th>Projects</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mitem.map((entry,index) => (
//                 <tr key={entry.userId}>
//                   <td>{entry.userId}</td>
//                   <td>{entry.userName}</td>
//                   {/* <td>{entry.projectNames.map((item,index)=>{
//                     if(index==entry.projectNames.length-1){
//                     return item
//                     }
//                     else{
//                       return item+','+' '
//                     } */}
//                   <td>{entry.projectNames.join(', ')}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div>
//         {mitem.length > 0 && (
//         <div style={{ marginTop: '20px' }}>
//           <CSVLink data={csvData2} filename="user_project_list.csv" className="btn btn-primary">
//             Download CSV
//           </CSVLink>
//         </div>
//         )}
//         </div>
//           </div>  
            
          
//         )}
//         </div>
//         </div>
      
//       </div>
//     );
//   }

//   export default Reports;
