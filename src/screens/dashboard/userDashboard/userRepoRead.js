import React from "react";
import UserSidebar from "./userSidebar";
import RepoDashboard from "../../../molecules/repoDashboard";

function UserRepoRead() {
  return (
    <RepoDashboard
      role="user"
      SidebarComponent={UserSidebar}
    />
  );
}

export default UserRepoRead;
