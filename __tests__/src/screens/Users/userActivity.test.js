import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserActivity from '../../../../src/screens/Dashboard/Users/userActivity';
import "@testing-library/jest-dom";
import api from '../../../../src/network/api';

jest.mock('../../../../src/network/api');
describe('UserActivity Component', () => {
  it('should render UserActivity component', () => {
    render(
      <BrowserRouter>
        <UserActivity open={true} userName="TestUser" />
      </BrowserRouter>
    );

    expect(screen.getByText('User Activity')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
   
  });

    it('should display user activity data', async () => {
    
    const mockUserData = {
      id: 1,
      name: 'TestUser',
      lastUpdated: '2023-10-04T12:00:00.000Z',
      lastLogout: '2023-10-04T14:00:00.000Z',
    };

    
    api.get.mockResolvedValue({ data: mockUserData });

    render(
      <BrowserRouter>
        <UserActivity open={true} userName="TestUser" />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('User Activity'));

    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('Last LoggedIn Time')).toBeInTheDocument();
    expect(screen.getByText('Last LoggedOut Time')).toBeInTheDocument();
    
  });

  it('should call onClose when the "X" button is clicked', () => {
    const onClose = jest.fn(); 
    render(
      <BrowserRouter>
        <UserActivity open={true} userName="TestUser" onClose={onClose} />
      </BrowserRouter>
    );

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
  });
  
});
