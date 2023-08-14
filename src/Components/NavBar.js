import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Dropdown, Image } from 'semantic-ui-react';
import logo1 from '../Assets/logo1.png';
import './LandingPage.css';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Menu inverted>
                    <Container>
                        <Menu.Item as={Link} to="/" header>
                            <Image  src={logo1} alt="Logo" style={{ width: '50px', height: '50px', marginLeft: '-90px' }} />
                            <span className="heading">Project Access Management</span>
                        </Menu.Item>
                        <Menu.Menu position="left">
                            <Dropdown item text="Features">
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        This application lets you add projects, users, and project managers into a certain project
                                        or to the platform
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        Large pool of people who work on various projects and move between the projects
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        Providing and revoking the access for various tools under the project for the DevOps team.
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        With this platform, we want to build a solution which helps DevOps team to manage access
                                        across the projects.
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown item text="Tools"  >
                                <Dropdown.Menu>
                                    <Dropdown.Item>GitHub</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>Figma</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </Menu.Menu>
                        <Menu.Menu position="right"> 
                            <Menu.Item as={Link} to="/Login">
                                Login
                            </Menu.Item>
                        </Menu.Menu>
                       
                    </Container>
                </Menu>
            </div>
        );
    }
}
