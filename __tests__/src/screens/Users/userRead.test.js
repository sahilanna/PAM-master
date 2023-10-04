import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import UserRead from '../../../../src/screens/Dashboard/Users/userRead';
import api from '../../../../src/network/api';
import { ngrokUrl } from '../../../../src/network/config';


jest.mock('../../../../src/network/api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  delete: jest.fn(() => Promise.resolve()),
}));


jest.mock('../../../../src/network/config', () => ({
  ngrokUrl: 'mocked-ngrok-url',
}));

describe('UserRead Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserRead />
      </MemoryRouter>
    );
  });

//   it('should render the UserRead component', () => {
    

//     expect(screen.getByText('S.No.')).toBeInTheDocument();
//     expect(screen.getByText('User Name')).toBeInTheDocument();
//     expect(screen.getByText('User Email')).toBeInTheDocument();
//     expect(screen.getByText('View')).toBeInTheDocument();
//     expect(screen.getByText('Activity')).toBeInTheDocument();
//     expect(screen.getByText('Delete')).toBeInTheDocument();
//   });

  it('should handle search input and display filtered results', async () => {
      

    // Type a search query into the input field
    const searchInput = screen.getByPlaceholderText('Search user...');
    fireEvent.change(searchInput, { target: { value: 'TestUser' } });

    // Ensure that the filtered result is displayed
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  
});
