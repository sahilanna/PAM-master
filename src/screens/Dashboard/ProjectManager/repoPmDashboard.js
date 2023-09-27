import React from 'react'
import PmSidebar from './pmSidebar'
import './pmDashboard.css'
import RepoDashboard from '../../../molecules/repoDashboard';


function RepoPmDashboard() {
  return (
    <RepoDashboard role="project_manager"  SidebarComponent={PmSidebar} />
  );

}
export default RepoPmDashboard;
