import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  Menu,
  Icon,
} from "semantic-ui-react";
import "./sidebar.css";

function CustomSidebar() {
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
              {" "}
              PAM
            </span>
          </a>
        </Menu.Item>
        <br />

        <br />

        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/profile"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="user" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Profile
          </span>
        </NavLink>
        <br />
        <br />

        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/AdminDashboard"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="list" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Projects
          </span>
        </NavLink>
        <br />
        <br />

        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/repoRead"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="sticky note" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Repos
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/userRead"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            {" "}
            <Icon name="users" />{" "}
          </span>
          <span style={{ marginLeft: "10px" }}>
            Users
          </span>
        </NavLink>

        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/pmReadNew"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            {" "}
            <Icon name="users" />{" "}
          </span>
          <span style={{ marginLeft: "10px" }}>
            PMs
          </span>
        </NavLink>

        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/figmaRead"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="book" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Figma
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/driveDetails"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="shopping bag" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            G-Drive
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/userHistory"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="sticky note" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Project History
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/reports"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="file" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Reports
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/PmRequestUser"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            {" "}
            <Icon name="bell" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            PM Requests
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/Analytics"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="cog" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Analytics
          </span>
        </NavLink>
        <br />
        <br />
        <NavLink
          style={{
            fontSize: "16px",
            color: "white",
          }}
          exact
          to="/Logout"
          activeClassName="activeClicked"
        >
          <span style={{ marginLeft: "30px" }}>
            <Icon name="arrow left" />
          </span>
          <span style={{ marginLeft: "10px" }}>
            Logout
          </span>
        </NavLink>
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
