import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboard from '../../../../../src/screens/Dashboard/Admin/AdminDashboard';
import api from '../../../../../src/network/api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock the network/api module
jest.mock('../../../../../src/network/api')



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

  it('calls createProject function', async () => {
  
    render(
      
        <MemoryRouter>
          <AdminDashboard/>
        </MemoryRouter>
     
    );

    await waitFor(() =>{
      const searchInput = screen.getByTestId('create')
      fireEvent.click(searchInput);
  
    })
 
  });

  it('calls handleSearchChange when the search input value changes', async () => {
    
    const initialState = 
    [
         {
           projectId: 402,
           ProjectName: "Sahil Mehar",
           countPeople: 3,
          
         },
         {
          projectId: 403,
          ProjectName: "Sahil",
          countPeople: 4,
          
         },
       ];
     const apiMockResponse = {
       data: initialState,
     };
    
    const apiMock = require('../../../../../src/network/api');
    apiMock.default.get.mockRejectedValue("Sample Error");

    render(
      
        <MemoryRouter>
          <AdminDashboard/>
        </MemoryRouter>
     
    );
 
  });

  it('calls createProject function', async () => {
  
    render(
      
        <MemoryRouter>
          <AdminDashboard/>
        </MemoryRouter>
     
    );

  
      const searchInput = screen.getByTestId('csv-link')
      fireEvent.click(searchInput);
  
    screen.debug();
 
  });

  

  
});
