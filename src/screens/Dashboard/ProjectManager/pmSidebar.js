import React from 'react'
import '/home/nineleaps/Desktop/Pratap/PAM-master/src/screens/Dashboard/SideBar/SideBar.css'
import CustomSidebarPU from '../SideBar/pmUserSidebar';

  

function PmSidebar() {
  const title = 'PAM';

  const links = [
    { to: '/pmprofile', icon: 'user', text: 'My Profile' },
    { to: '/pmDashboard', icon: 'list', text: 'Projects' },
    { to: '/repoPmDashboard', icon: 'sticky note', text: 'Repository' },
    { to: '/pmNotification', icon: 'users', text: 'Notification' },
    { to: '/Logout', icon: 'arrow left', text: 'Logout' },
  ];

  return <CustomSidebarPU title={title} links={links} />;
}


export default PmSidebar