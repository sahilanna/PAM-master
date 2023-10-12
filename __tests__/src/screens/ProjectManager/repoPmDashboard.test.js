import React from 'react';
import { render, screen } from '@testing-library/react';
import RepoPmDashboard from '../../../../src/screens/Dashboard/ProjectManager/repoPmDashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('RepoPmDashboard', () => {
  it('should render RepoDashboard component with correct props', () => {
    render(<MemoryRouter><RepoPmDashboard /></MemoryRouter>);
    
    // Find the rendered RepoDashboard component
    const repoDashboardComponent = screen.getByTestId('repo-dashboard');
    
    // Assert that RepoDashboard was rendered with the correct props
    expect(repoDashboardComponent).toBeInTheDocument();
    expect(repoDashboardComponent).toHaveAttribute('role', 'project_manager');
    // You can also check that the SidebarComponent prop is passed correctly if needed
  });
});
