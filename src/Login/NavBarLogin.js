import React, { Component } from 'react';
import { Menu, Container, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo1 from '../Assets/logo1.png';
import './Login.css';

export default class NavBarLogin extends Component {
  render() {
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image src={logo1} alt="Logo" style={{ width: '50px', height: '50px', marginLeft: '-90px' }} />
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
              <Dropdown item text="Tools">
                <Dropdown.Menu>
                  <Dropdown.Item>GitHub</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Figma</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
  }
}
