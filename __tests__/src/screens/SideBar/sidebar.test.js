import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomSidebar from '/home/nineleaps/Desktop/Pratap/PAM-master/src/screens/Dashboard/SideBar/SideBar.js'
import "@testing-library/jest-dom";

describe('CustomSidebar Component', () => {
  it('renders the CustomSidebar component with links and title', () => {
    const links = [
      { to: '/profile', icon: 'user', text: 'Profile' },
      { to: '/AdminDashboard', icon: 'list', text: 'Projects' },
      { to: '/repoRead', icon: 'sticky note', text: 'Repos' },
      { to: '/userRead', icon: 'users', text: 'Users' },
      { to: '/pmReadNew', icon: 'users', text: 'PMs' },
      { to: '/figmaRead', icon: 'book', text: 'Figma' },
      { to: '/driveDetails', icon: 'shopping bag', text: 'G-Drive' },
      { to: '/userHistory', icon: 'sticky note', text: 'Project History' },
      { to: '/reports', icon: 'file', text: 'Reports' },
      { to: '/PmRequestUser', icon: 'bell', text: 'PM Requests' },
      { to: '/Analytics', icon: 'cog', text: 'Analytics' },
      { to: '/Logout', icon: 'arrow left', text: 'Logout' },
    ];

    render(
      <Router>
        <CustomSidebar links={links} title="PAM" />
      </Router>
    );

   
    const titleElement = screen.getByText('PAM');
    expect(titleElement).toBeInTheDocument();

    
    for (const link of links) {
      const linkText = screen.getByText(link.text);
      expect(linkText).toBeInTheDocument();
    }
  });
});
