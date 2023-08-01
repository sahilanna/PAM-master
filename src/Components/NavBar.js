import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import logo from '../Assets/logo.png'
import './LandingPage.css'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        
      <img src={logo} alt="Logo" style={{
        marginLeft: '-60px',width: '50px',height: '50px'}}/>
        <Navbar.Brand className='heading' href='/'> Project Access Management </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Features" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">This application lets you add projects,users and project managers into a certain project
              or to the platform
              
              
              <NavDropdown.Divider />
        
              Large pool of people who work on various projects and move between the projects 
              <NavDropdown.Divider />Providing and revoking the access for various tools under the project for the DevOps team. 
              <NavDropdown.Divider />With this platform we want build a solution which helps DevOps team to manage access across the projects.

              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tools" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1"> GitHub <NavDropdown.Divider />
            Figma
             <NavDropdown.Divider />
             </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link to='/Login'>Login</Link>
           
            {/* <Nav.Link href="#deets">Login</Nav.Link> */}
                      </Nav> <br/>
                      {/* <Nav>  <Link to='/SignUp'>SignUp</Link></Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  }
}
