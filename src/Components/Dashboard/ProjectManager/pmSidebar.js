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
  

function PmSidebar() {
  return (
    <div>
      
    <div>

    </div>
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
    
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/pmDashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
          PAM
        </a>
      </CDBSidebarHeader>
      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
        <NavLink exact to="/pmprofile" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="list">My Profile</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/pmDashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="list">Projects</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/figmaPmDashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="book">Figma</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/repoPmDashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="sticky-note">Repository</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/Login" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="arrow-left">Logout</CDBSidebarMenuItem>
          </NavLink>
          </CDBSidebarMenu>
          </CDBSidebarContent>
          </CDBSidebar>
         
</div>

     
      </div>
  )
}

export default PmSidebar