import React, { Fragment } from 'react';
import { useState } from 'react';
// import Projects from '../Home';
import { NavLink } from 'react-router-dom';
import './AdminDashboard.css';
import {button, Table} from 'react-bootstrap';
import Read from './Read/Read';
import Create from './Create/Create';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
            <NavLink exact to="/Login" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Notifications</CDBSidebarMenuItem>
            </NavLink>
            <div className='row'>
              <CDBSidebarMenuItem icon="user"/>
              <NavDropdown  title="Role">
              <NavDropdown.Item style={{color:'black'}} as={Link} to="/pmRead">Project Manager</NavDropdown.Item>
          <NavDropdown.Item style={{color:'black'}} as={Link} to="/userRead">User</NavDropdown.Item>
    </NavDropdown>
    </div>
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







