import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import CustomSidebar from '../../../src/screens/Dashboard/SideBar/SideBar';
import "@testing-library/jest-dom";


describe('CustomSidebar Component', () => {
  it('renders CustomSidebar component with navigation links', () => {
    render(
      <Router> 
        <CustomSidebar />
      </Router>
    );

    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Repos')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('PMs')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
    expect(screen.getByText('G-Drive')).toBeInTheDocument();
    expect(screen.getByText('Project History')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('PM Requests')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

   
  });
});
