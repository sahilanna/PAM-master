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
    
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/adminDashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
            PAM
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Projects</CDBSidebarMenuItem>
            </NavLink>


            <NavLink exact to="/repoRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">Repos</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/pmReadNew" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">PMs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/userRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
           
            <NavLink exact to="/figmaRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Figma</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/driveRead" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="shopping-bag">G-Drive</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/userHistory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bookmark">Project History</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/Reports" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file">Reports</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/PmRequestUser" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bell">PM Requests</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cog">Analytics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="arrow-left">Logout</CDBSidebarMenuItem>
            </NavLink>

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