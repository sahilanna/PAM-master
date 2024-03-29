import React from 'react'
import { NavLink } from 'react-router-dom';
import { Sidebar,Menu, Icon} from 'semantic-ui-react';


  

function PmSidebar() {
  return (
    <div>
   
    <Sidebar as={Menu} animation="overlay" visible vertical inverted style={{ textAlign: 'left' }}>
      <Menu.Item className="custom-menu-item" >
        <a href="/adminDashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
        <span style={{ marginRight: '90px' , fontSize:'30px'}}> PAM</span>
        </a>
      </Menu.Item>
      <br/>
      
      <br/>



      
      <NavLink style={{fontSize:'16px'}}
      exact to="/pmprofile" activeClassName="activeClicked">
                 <span style={{ marginLeft: '30px' }}><Icon name="user" /></span>
                 <span style={{ marginLeft: '10px' }}>My Profile</span>
         
        </NavLink>
        <br/>
        <br/>
      

        <NavLink style={{fontSize:'16px'}} exact to="/pmDashboard" activeClassName="activeClicked">
   
      <span style={{ marginLeft: '30px' }}><Icon name="list" /></span>
      <span style={{ marginLeft: '10px' }}>Projects</span>
  </NavLink>
  <br/>
  <br/>
       

      <NavLink style={{fontSize:'16px'}} exact to="/repoPmDashboard" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}><Icon name="sticky note" /></span>
          <span style={{ marginLeft: '10px' }}>Repository</span>
     
      </NavLink>
      <br/>
        <br/>
      <NavLink style={{fontSize:'16px'}} exact to="/pmNotification" activeClassName="activeClicked">
      <span style={{ marginLeft: '30px' }}>  <Icon name="users" /> </span>
          <span style={{ marginLeft: '10px' }}>Notification</span>
     
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

export default PmSidebar