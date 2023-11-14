import React from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Image } from "semantic-ui-react";
import projectLogo from "../../assets/projectLogo.png";
import NavbarDropdown from "../../molecules/navbarDropdown";
import "./navbar.css";

const NavBar = () => {
  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image
              src={projectLogo}
              alt="Logo"
              style={{ width: "50px", height: "50px", marginLeft: "-90px" }}
            />
            <span className="heading">Project Access Management</span>
          </Menu.Item>
          <Menu.Menu position="left">
            <NavbarDropdown
              title="Features"
              items={[
                "This application lets you add projects, users, and project managers into a certain project or to the platform",
                "Large pool of people who work on various projects and move between the projects",
                "Providing and revoking the access for various tools under the project for the DevOps team.",
                "With this platform, we want to build a solution which helps DevOps team to manage access across the projects.",
              ]}
            />
            <NavbarDropdown
              title="Tools"
              items={["GitHub", "Figma", "GDrive"]}
            />
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
};

export default NavBar;
