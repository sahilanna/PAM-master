import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../../Assets/logo.png'
// import 'src/Assets/logo.png';

    
    export default class NavBarA extends Component {
      render() {
        return (
          
          <div className='navbar-container'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
              <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Navbar.Brand className='heading' href="/AdminDashboard">Admin Dashboard</Navbar.Brand>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        );
      }
    }
    


