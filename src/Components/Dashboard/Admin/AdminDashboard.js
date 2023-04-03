// import React, { Fragment } from 'react';
// import { useState } from 'react';
// import Projects from '../Home';
// import { NavLink } from 'react-router-dom';
// import './AdminDashboard.css';
// import {button, Table} from 'react-bootstrap';

// import Crud from '../CRUD';
// //import 'bootstrap/dist/css/bootstrap.min.css'

// import  {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from 'cdbreact';

// const Sidebar = () => {
//     // const [orders, setOrders] = useState("all_proj");
//   return (
//     <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
//       <CDBSidebar textColor="#fff" backgroundColor="#333">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//           <a href="/LandingPage" className="text-decoration-none" style={{ color: 'inherit' }}>
//             PAM
//           </a>
//         </CDBSidebarHeader>

//         <CDBSidebarContent className="sidebar-content">
//           <CDBSidebarMenu>
//             <NavLink exact to="/" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/tables" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="table">Notifications</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/profile" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user">Role</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/analytics" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
//             </NavLink>
// {/* 
//             <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
//             </NavLink> */}
//           </CDBSidebarMenu>
//         </CDBSidebarContent>

//         <CDBSidebarFooter style={{ textAlign: 'center' }}>
//           <div
//             style={{
//               padding: '20px 5px',
//             }}
//           >
//           </div>
//         </CDBSidebarFooter>
//       </CDBSidebar>
//       {/* <Crud/>  */}
      
//       <button className = 'btn-add'>ADD</button>
//       <Crud/> 
//       {/* <table className='tab'>
        
//                     <thead>
//                         <th>ID</th>
//                         <th>PROJECT</th>
//                         <th>add</th>
//                         <th>del</th>
//                         <th>view</th>
//                     </thead>
//                     <tbody>
//                         <tr>
//                         <td>#111111</td>
//                         <td>sahil</td>
//                        <td> <button>UPDATE</button></td>
//                         <td><button>DELETE</button></td>
//                        <td> <button>VIEW</button></td>
//                         </tr>

//                         <tr>
//                         <td>#111112</td>
//                         <td>zahil</td>
//                        <td> <button>UPDATE</button></td>
//                         <td><button>DELETE</button></td>
//                        <td> <button>VIEW</button></td>
//                         </tr>

//                         <tr>
//                         <td>#111113</td>
//                         <td>dahil</td>
//                        <td> <button>UPDATE</button></td>
//                         <td><button>DELETE</button></td>
//                        <td> <button>VIEW</button></td>
//                         </tr>

//                         <tr>
//                         <td>#111114</td>
//                         <td>lahil</td>
//                        <td> <button>UPDATE</button></td>
//                         <td><button>DELETE</button></td>
//                        <td> <button>VIEW</button></td>
//                         </tr>

//                     </tbody>
//                 </table>  */}
                
// </div>

      
//   );
// };

// export default Sidebar;

import React, { Fragment } from 'react';
import { useState } from 'react';
// import Projects from '../Home';
import { NavLink } from 'react-router-dom';
import './AdminDashboard.css';
import {button, Table} from 'react-bootstrap';
import Read from './Read/Read';
// import Crud from '../CRUD';
//import 'bootstrap/dist/css/bootstrap.min.css'
import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/LandingPage" className="text-decoration-none" style={{ color: 'inherit' }}>
            PAM
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Notifications</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Roles" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Role</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Create" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Create Project</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <Read/>
</div>
  );
};
export default AdminDashboard;







