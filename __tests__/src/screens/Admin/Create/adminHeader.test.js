import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import AdminHeader from '../../../../../src/screens/Dashboard/Admin/adminHeader';


jest.mock('../../../../../src/network/api', () => ({
  get: jest.fn((url) => {
    if (url.includes('count/user')) {
      return Promise.resolve({ data: 42 }); // Mock user count data
    } else if (url.includes('count/project_manager')) {
      return Promise.resolve({ data: 10 }); // Mock project manager count data
    } else if (url.includes('count/active')) {
      return Promise.resolve({ data: 20 }); // Mock active projects count data
    }
  }),
}));

describe('AdminHeader Component', () => {
  it('should render the component', () => {
    render(<AdminHeader />);
    
    // Assert that the component renders without errors
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Project Managers')).toBeInTheDocument();
  });

  it('should fetch and display the user count', async () => {
    render(<AdminHeader />);
    
    // Wait for the user count to be fetched and displayed
    await waitFor(() => expect(screen.getByText('42')).toBeInTheDocument());
  });

  it('should fetch and display the project manager count', async () => {
    render(<AdminHeader />);
    
    // Wait for the project manager count to be fetched and displayed
    await waitFor(() => expect(screen.getByText('10')).toBeInTheDocument());
  });

  it('should fetch and display the active projects count', async () => {
    render(<AdminHeader />);
    
    // Wait for the active projects count to be fetched and displayed
    await waitFor(() => expect(screen.getByText('20')).toBeInTheDocument());
  });
});
