import React from "react";
import CommonSidebar from "./commonSidebar";
import "./adminSidebar/adminSidebar.css";

function PmSidebar() {
  const title = "PAM";

  const links = [
    {
      to: "/pmprofile",
      icon: "user",
      text: "My Profile",
    },
    {
      to: "/pmDashboard",
      icon: "list",
      text: "Projects",
    },
    {
      to: "/repoPmDashboard",
      icon: "sticky note",
      text: "Repository",
    },
    {
      to: "/pmNotification",
      icon: "users",
      text: "Notification",
    },
    {
      to: "/Logout",
      icon: "arrow left",
      text: "Logout",
    },
  ];

  return <CommonSidebar title={title} links={links} />;
}

export default PmSidebar;
