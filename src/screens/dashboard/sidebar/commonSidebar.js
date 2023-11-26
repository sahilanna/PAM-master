import React from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import "./adminSidebar/adminSidebar.css";

function CommonSidebar({ title, links }) {
  return (
    <div>
      <Sidebar className="sidebar-title" as={Menu} animation="overlay" visible vertical inverted>
        <Menu.Item className="custom-menu-item">
          <a href="/adminDashboard" className="text-decoration-none">
            <span className="sidebar-title">{title}</span>
          </a>
        </Menu.Item>

        {links.map((link) => (
          <NavLink key={link.to} exact to={link.to} activeClassName="activeClicked">
            <div>
              <span className="sidebar-icons">
                <Icon name={link.icon} />
              </span>
              <span>{link.text}</span>
            </div>
          </NavLink>
        ))}
      </Sidebar>
    </div>
  );
}

export default CommonSidebar;
