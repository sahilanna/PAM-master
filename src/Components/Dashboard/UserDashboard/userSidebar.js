import React from 'react'
import { NavLink } from 'react-router-dom';
import  {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact'
  

function UserSidebar() {
  return (
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
    
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/userProjects" className="text-decoration-none" style={{ color: 'inherit' }}>
          PAM
        </a>
      </CDBSidebarHeader>
      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
        <NavLink exact to="/userProfile" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/userProjects" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="list">Projects</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/userFigmaRead" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="book">Figma</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/userRepoRead" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="sticky-note">Repository</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/Logout" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="arrow-left">Logout</CDBSidebarMenuItem>
          </NavLink>

          </CDBSidebarMenu>
          </CDBSidebarContent>
          </CDBSidebar>
       
      </div>
  )
}

export default UserSidebar