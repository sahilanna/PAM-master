import React from 'react'
import '/home/nineleaps/Desktop/Pratap/PAM-master/src/screens/dashboard/sidebar/sidebar.css'
import CustomSidebarPU from '../sidebar/pmUserSidebar';


function UserSidebar() {
  const title = 'PAM';

  const links = [
    { to: '/userProfile', icon: 'user', text: 'My Profile' },
    { to: '/userProjects', icon: 'list', text: 'Projects' },
    { to: '/userRepoRead', icon: 'sticky note', text: 'Repository' },
    { to: '/Logout', icon: 'arrow left', text: 'Logout' },
  ];

  return <CustomSidebarPU title={title} links={links} />;
}

export default UserSidebar