import React from "react";
import CommonSidebar from "../commonSidebar";



function AdminSidebar() {

   const title = "PAM";

   const links = [
     {
       to: "/profile",
       icon: "user",
       text: "Profile",
     },
     {
       to: "/adminDashboard",
       icon: "list",
       text: "Projects",
     },
     {
       to: "/repoRead",
       icon: "sticky note",
       text: "Repository",
     },
     {
       to: "/userRead",
       icon: "users",
       text: "Users",
     },
     {
       to: "/pmReadNew",
       icon: "users",
       text: "PMs",
     },
     {
       to: "/figmaRead",
       icon: "book",
       text: "Figma",
     },
     {
       to: "/driveDetails",
       icon: "shopping bag",
       text: "G-Drive",
     },
     {
       to: "/userHistory",
       icon: "sticky note",
       text: "Project History",
     },
     {
       to: "/reports",
       icon: "file",
       text: "Reports",
     },
     {
       to: "/pmRequestUser",
       icon: "bell",
       text: "PM Requests",
     },
     {
       to: "/analytics",
       icon: "cog",
       text: "Analytics",
     },

     {
       to: "/logout",
       icon: "arrow left",
       text: "Logout",
     },
   ];

  return <CommonSidebar title={title} links={links} />;
}

export default AdminSidebar;
