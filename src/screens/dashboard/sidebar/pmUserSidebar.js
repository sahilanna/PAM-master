import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  Menu,
  Icon,
} from "semantic-ui-react";

function CustomSidebar({ title, links }) {
  return (
    <div>
      <Sidebar
        as={Menu}
        animation="overlay"
        visible
        vertical
        inverted
        style={{ textAlign: "left" }}
      >
        <Menu.Item className="custom-menu-item">
          <a
            href="/adminDashboard"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <span
              style={{
                marginRight: "90px",
                fontSize: "30px",
              }}
            >
              {title}
            </span>
          </a>
        </Menu.Item>
        <br />
        <br />
        {links.map((link) => (
          <NavLink
            key={link.to}
            className="text-style"
            exact
            to={link.to}
            activeClassName="activeClicked"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{ marginRight: "10px" }}
              >
                <Icon name={link.icon} />
              </span>
              <span>{link.text}</span>
            </div>
          </NavLink>
        ))}
      </Sidebar>

      <div
        style={{
          marginLeft: "250px",
          transition: "margin 0.3s",
        }}
      ></div>
    </div>
  );
}

export default CustomSidebar;
