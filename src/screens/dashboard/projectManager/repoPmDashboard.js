import React from "react";
import PmSidebar from "../sidebar/pmSidebar";
import "./pmDashboard/pmDashboard.css";
import RepoDashboard from "../../../molecules/repoDashboard";

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
