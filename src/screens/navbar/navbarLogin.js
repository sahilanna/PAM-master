import React from "react";
import { Menu, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavbarDropdown from "../../molecules/navbarDropdown";
import { FEATURES_ITEMS } from "../../assets/constants/navbarFeatures";
import { TOOLS_ITEMS } from "../../assets/constants/nabarTools";
import projectLogo from "../../assets//images/projectLogo.png";
import "./navbar.css";

const NavBarLogin = () => {
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
        </Container>
      </Menu>
    </div>
  );
};
export default NavBarLogin;
