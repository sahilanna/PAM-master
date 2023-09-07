import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Analytics from './Analytics';


jest.mock('../../api', () => ({
  get: jest.fn((url) => {
    if (url.includes('/users/count/admin')) {
      return Promise.resolve({ data: 5 }); 
    }
    if (url.includes('/users/count/project_manager')) {
      return Promise.resolve({ data: 10 }); 
    }
    if (url.includes('/users/count/user')) {
      return Promise.resolve({ data: 15 }); 
    }
    return Promise.reject(new Error('Invalid URL'));
  }),
}));

jest.mock('../../../../Assets/config', () => ({
  ngrokUrl: 'mocked-ngrok-url',
}));

test('renders the Analytics component with pie chart and "Next" button', async () => {
  render(<Analytics />);

  
  expect(screen.getByTestId('loading-page')).toBeInTheDocument();

 
  await waitFor(() => {
    expect(screen.queryByTestId('loading-page')).not.toBeInTheDocument();
  });

  
  expect(screen.getByText('Count of Admin, PMs, and Users')).toBeInTheDocument();
  expect(screen.getByText('Admins')).toBeInTheDocument();
  expect(screen.getByText('Users')).toBeInTheDocument();
  expect(screen.getByText('Project Managers')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument(); // Admin count
  expect(screen.getByText('10')).toBeInTheDocument(); // PM count
  expect(screen.getByText('15')).toBeInTheDocument(); // User count

  
  expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
});

test('clicking the "Next" button should navigate to "/projectAnalytics"', async () => {
  render(<Analytics />);

 
  await waitFor(() => {
    expect(screen.queryByTestId('loading-page')).not.toBeInTheDocument();
  });

  
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));

 
  expect(mockNavigate).toHaveBeenCalledWith('/projectAnalytics');
});
