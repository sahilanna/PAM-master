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
  

function UserSidebar() {
  return (
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
    
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/LandingPage" className="text-decoration-none" style={{ color: 'inherit' }}>
          PAM
        </a>
      </CDBSidebarHeader>
      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/userProjects" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Projects</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/userFigmaRead" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Figma</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/userRepoRead" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Repository</CDBSidebarMenuItem>
          </NavLink>
          </CDBSidebarMenu>
          </CDBSidebarContent>
          </CDBSidebar>
         


     
      </div>
  )
}

export default UserSidebar