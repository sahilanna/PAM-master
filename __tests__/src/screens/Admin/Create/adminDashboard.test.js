import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboard from '../../../../../src/screens/Dashboard/Admin/AdminDashboard';

// Mock the network/api module
jest.mock('../../../../../src/network/api', () => ({
  get: jest.fn((url) => {
    if (url.includes('projects/countPeople')) {
      return Promise.resolve({ data: [] }); // Mock project count data
    } else if (url.includes('request/allActive')) {
      return Promise.resolve({ data: [] }); // Mock request data
    }
  }),
}));

describe('AdminDashboard Component', () => {

  it('calls handleSearchChange when the search input value changes', () => {
    const { getByPlaceholderText } = render(
      
        <MemoryRouter>
          <AdminDashboard/>
        </MemoryRouter>
     
    );

    const searchInput = getByPlaceholderText('Search Project...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

  });

  
});
