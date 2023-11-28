import React from "react";
import PmSidebar from "../sidebar/pmSidebar";
import RepoDashboard from "../../../molecules/repoDashboard";
import "./pmDashboard/pmDashboard.css";


function RepoPmDashboard() {
  return (
    <RepoDashboard
      data-testid="repo-dashboard"
      role="project_manager"
      SidebarComponent={PmSidebar}
    />
  );
}
export default RepoPmDashboard;
