import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'



export default class NavBarA extends Component {
  render() {
    return (
      <div className='whole'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        
      {/* <img src={logo} alt="Logo" style={{
        marginLeft: '-60px',width: '50px',height: '50px'}}/> */}
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
             <Navbar.Brand className='heading' href="#href"> Admin Dashboard</Navbar.Brand>
            
            
            
           
          </Nav>
          <Nav>
           
            {/* <Nav.Link href="#deets">Login</Nav.Link> */}
                      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  }
}
