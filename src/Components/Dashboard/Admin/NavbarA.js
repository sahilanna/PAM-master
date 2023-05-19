    // // import React, { Component } from 'react';
    // // import { Link } from 'react-router-dom';
    // // import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
    // // import { GoogleLogout } from 'react-google-login';
    // // export default class NavBarA extends Component {
    // //   render() {
    // //     return (
    // //       <div className='whole'>
    // //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    // //       <Container>
    // //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    // //         <Navbar.Collapse id="responsive-navbar-nav">
    // //           <Nav className="me-auto">
    // //              <Navbar.Brand className='heading' href="#href"> Admin Dashboard</Navbar.Brand>
    // //           </Nav>
    // //         </Navbar.Collapse>
    // //       </Container>
    // //     </Navbar>
    // //       </div>
    // //     )
    // //   }
    // // }

    // // import React, { Component } from 'react';
    // // import { Link } from 'react-router-dom';
    // // import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
    // // import { GoogleLogout } from 'react-google-login';

    // // export default class NavBarA extends Component {
    // //   render() {
    // //     return (
    // //       <div className='whole'>
    // //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    // //           <Container fluid> {/* Use fluid container to occupy entire width */}
    // //             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    // //             <Navbar.Collapse id="responsive-navbar-nav">
    // //               <Nav className="me-auto">
    // //                 <Navbar.Brand className='heading' href="#href">Admin Dashboard</Navbar.Brand>
    // //               </Nav>
    // //             </Navbar.Collapse>
    // //           </Container>
    // //         </Navbar>
    // //       </div>
    // //     );
    // //   }
    // // }

    // import React, { Component } from 'react';
    // import { Link } from 'react-router-dom';
    // import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
    // import { GoogleLogout } from 'react-google-login';


    // export default class NavBarA extends Component {
    //   render() {
    //     return (
    //       <div className='whole' style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 999 }}>
    //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //           <Container fluid>
    //             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //             <Navbar.Collapse id="responsive-navbar-nav">
    //               <Nav className="me-auto">
    //                 <Navbar.Brand className='heading' href="#href">Admin Dashboard</Navbar.Brand>
    //               </Nav>
    //             </Navbar.Collapse>
    //           </Container>
    //         </Navbar>
    //       </div>
    //     );
    //   }
    // }

    import React, { Component } from 'react';
    import { Navbar, Nav, Container } from 'react-bootstrap';
    import './NavbarA.css';
    
    export default class NavBarA extends Component {
      render() {
        return (
          <div className='navbar-container'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
              <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Navbar.Brand className='heading' href="#href">Admin Dashboard</Navbar.Brand>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        );
      }
    }
    


