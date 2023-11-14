import React from 'react'
import '/home/nineleaps/Desktop/Pratap/PAM-master/src/screens/dashboard/sidebar/sidebar.css'
import CustomSidebarPU from '../sidebar/pmUserSidebar';

  

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