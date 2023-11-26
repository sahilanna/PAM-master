import React from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Image } from "semantic-ui-react";
import NavbarDropdown from "../../molecules/navbarDropdown";
import { FEATURES_ITEMS } from "../../assets/constants/navbarFeatures";
import { TOOLS_ITEMS } from "../../assets/constants/nabarTools";
import projectLogo from "../../assets/images/projectLogo.png";
import "./navbar.css";

const NavBar = () => {
  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image className="navbar-logo" src={projectLogo} alt="Logo" />
            <span className="heading">Project Access Management</span>
          </Menu.Item>
          <Menu.Menu position="left">
            <NavbarDropdown title="Features" items={FEATURES_ITEMS} />
            <NavbarDropdown title="Tools" items={TOOLS_ITEMS} />
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
