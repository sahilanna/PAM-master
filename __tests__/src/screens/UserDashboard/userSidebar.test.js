import React from 'react';
import { render, screen } from '@testing-library/react';
import UserSidebar from '../../../../src/screens/Dashboard/UserDashboard/userSidebar';
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';

describe('UserSidebar Component', () => {
  it('renders the UserSidebar component with links', () => {
    render(
    <Router>
    <UserSidebar />
    </Router>
    );
    
    
    const titleElement = screen.getByText('PAM');
    expect(titleElement).toBeInTheDocument();
    
    
    const links = [
        'My Profile',
        'Projects',
        'Repository',
        'Logout',
      ];

      for (const linkText of links) {
        const linkElement = screen.getByText(linkText);
        expect(linkElement).toBeInTheDocument();
      }
  });
});
