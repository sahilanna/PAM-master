import React from 'react'
import { NavLink } from 'react-router-dom';
import  {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact'

function Sidebar() {
  return (
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
    {/* Set flex: 1 to create a container for the sidebar */}
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/LandingPage" className="text-decoration-none" style={{ color: 'inherit' }}>
            PAM
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Projects</CDBSidebarMenuItem>
            </NavLink>

            {/* <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Notifications</CDBSidebarMenuItem>
            </NavLink> */}

            {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/repoRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">Repos</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/pmReadNew" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">PMs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/userRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Users</CDBSidebarMenuItem>
            </NavLink>
           
            <NavLink exact to="/figmaRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Figma</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/userHistory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">User History</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/Reports" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Reports</CDBSidebarMenuItem>
            </NavLink>

            {/* <div className='row'>
              <NavDropdown title="Role">
                <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/pmRead">Project Manager</NavDropdown.Item>
                <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/userRead">User</NavDropdown.Item>
              </NavDropdown>
            </div> */}
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
  
  )
}

export default Sidebar;