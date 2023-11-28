import React from "react";
import CommonSidebar from "./commonSidebar";

function UserSidebar() {
  const title = "PAM";

  const links = [
    {
      to: "/userProfile",
      icon: "user",
      text: "My Profile",
    },
    {
      to: "/userProjects",
      icon: "list",
      text: "Projects",
    },
    {
      to: "/userRepoRead",
      icon: "sticky note",
      text: "Repository",
    },
    {
      to: "/Logout",
      icon: "arrow left",
      text: "Logout",
    },
  ];

  return <CommonSidebar title={title} links={links} />;
}

export default UserSidebar;
