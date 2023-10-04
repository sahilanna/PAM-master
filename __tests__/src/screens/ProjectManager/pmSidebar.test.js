import React from 'react';
import { render, screen } from '@testing-library/react';
import PmSidebar from '../../../../src/screens/Dashboard/ProjectManager/pmSidebar';
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';

describe('PmSidebar Component', () => {
  it('renders the UserSidebar component with links', () => {
    render(
    <Router>
    <PmSidebar />
    </Router>
    );
    
    
    const titleElement = screen.getByText('PAM');
    expect(titleElement).toBeInTheDocument();
    
    
    const links = [
        'My Profile',
        'Projects',
        'Repository',
        'Notification',
        'Logout',
      ];

      for (const linkText of links) {
        const linkElement = screen.getByText(linkText);
        expect(linkElement).toBeInTheDocument();
      }
  });
});
