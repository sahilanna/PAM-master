import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import NavBarA from './NavbarA';
import Read from './Read/Read';

const AdminDashboard = () => {
  return (
    <div>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <div> {/* Set flex: 1 to create a container for the sidebar */}
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/LandingPage" className="text-decoration-none" style={{ color: 'inherit' }}>
                PAM
              </a>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
                </NavLink>

                {/* <NavLink exact to="/tables" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Notifications</CDBSidebarMenuItem>
                </NavLink> */}

                {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
                </NavLink> */}
                <NavLink exact to="/CreateRepo" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chart-line">Create Repository</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/Create" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Create Project</CDBSidebarMenuItem>
                </NavLink>

                <div className='row'>
                  <NavDropdown title="Role">
                    <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/pmRead">Project Manager</NavDropdown.Item>
                    <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/userRead">User</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              ></div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>

        <div> 
          <Read />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
