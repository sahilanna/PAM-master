import React from 'react'
import { NavLink } from 'react-router-dom';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { Sidebar,Menu, Icon} from 'semantic-ui-react';
import { useState } from 'react';
import '/home/nineleaps/PAM-master/src/Components/Dashboard/SideBar/SideBar.css'

function  CustomSidebar() {
 
  return (
    <div style={{ width: '40px', overflow: 'scroll initial',  }}>
   
    <Sidebar as={Menu} animation="overlay" visible vertical inverted style={{ textAlign: 'left' }}>
      <Menu.Item className="custom-menu-item" >
        <a href="/adminDashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
        <span style={{ marginRight: '90px' , fontSize:'30px'}}> PAM</span>
        </a>
      </Menu.Item>
      <br/>
      
      <br/>




      
      <NavLink style={{fontSize:'16px'}}
      exact to="/profile" activeClassName="activeClicked">
                 <span style={{ marginLeft: '30px' }}><Icon name="user" /></span>
                 <span style={{ marginLeft: '10px' }}>Profile</span>
         
        </NavLink>
        <br/>
        <br/>
      

        <NavLink style={{fontSize:'16px'}} exact to="/AdminDashboard" activeClassName="activeClicked">
   
      <span style={{ marginLeft: '30px' }}><Icon name="list" /></span>
      <span style={{ marginLeft: '10px' }}>Projects</span>
  </NavLink>
  <br/>
  <br/>
       

      <NavLink style={{fontSize:'16px'}} exact to="/repoRead" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="sticky note" /></span>
          <span style={{ marginLeft: '10px' }}>Repos</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/userRead" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}>  <Icon name="users" /> </span>
          <span style={{ marginLeft: '10px' }}>Users</span>
     
      </NavLink>
     
        <br/>
      <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/pmReadNew" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}> <Icon name="users" /> </span>
          <span style={{ marginLeft: '10px' }}>PMs</span>
     
      </NavLink>
     
        <br/>
      <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/figmaRead" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="book" /></span>
          <span style={{ marginLeft: '10px' }}>Figma</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/driveDetails" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="shopping bag" /></span>
          <span style={{ marginLeft: '10px' }}>G-Drive</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/userHistory" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="sticky note" /></span>
          <span style={{ marginLeft: '10px' }}>Project History</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/reports" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="file" /></span>
          <span style={{ marginLeft: '10px' }}>Reports</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/PmRequestUser" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}> <Icon name="bell" /></span>
          <span style={{ marginLeft: '10px' }}>PM Requests</span>
      </NavLink>
       <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/Analytics" activeClassName="activeClicked" >
      <span style={{ marginLeft: '30px' }}><Icon name="cog" /></span>
          <span style={{ marginLeft: '10px' }}>Analytics</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/Logout" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="arrow left" /></span>
          <span style={{ marginLeft: '10px' }}>Logout</span>
     
      </NavLink>
     
     
    
     
     
     
   
      {/* Add other menu items as needed */}
    </Sidebar>


    {/* Main Content */}
    <div style={{ marginLeft: '250px', transition: 'margin 0.3s' }}>
      {/* Your main content here */}
    </div>
  </div>

  
  )
}

export default  CustomSidebar;