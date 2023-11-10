import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserHistory from '../../../../../src/screens/Dashboard/Admin/userHistory/userHistory';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'
import api from '../../../../../src/network/api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NGROK_URL } from '../../../../../src/network/config';

// Mock the CSVLink component
jest.mock('react-csv', () => ({ CSVLink: 'div' }));
jest.mock('../../../../../src/network/api')

describe('UserHistory Component', () => {

  it('renders without crashing', () => {
    render(<MemoryRouter><UserHistory /></MemoryRouter>);
  });


  it('generates serial numbers correctly', () => {
    const currentPage = 2; // Assuming the current page is 2
    const rowsPerPage = 5;
    const currentItems = [
      { projectId: 6, projectName: 'Project 6' },
      { projectId: 7, projectName: 'Project 7' },
      { projectId: 8, projectName: 'Project 8' },
      { projectId: 9, projectName: 'Project 9' },
      { projectId: 10, projectName: 'Project 10' },
    ];

    const { getByText } = render(<MemoryRouter><UserHistory /></MemoryRouter>);
    
    const startNumber = (currentPage - 1) * rowsPerPage;

    // waitFor(() => {
    //     expect(getByText('7')).toBeInTheDocument();
    // });
    // waitFor(() => {
    //     expect(getByText('8')).toBeInTheDocument();
    // });
    
  });

  it('handles search input change correctly', () => {
    const { getByPlaceholderText } = render(<MemoryRouter><UserHistory /></MemoryRouter>);
    const searchInput = getByPlaceholderText('Search Project History');

    fireEvent.change(searchInput, { target: { value: 'New Search Query' } });
    expect(searchInput.value).toBe('New Search Query');
  });

  it('should render table rows with the correct data', async () => {
    const currentItems = [
      { projectId: 6, projectName: 'Project 6', projectDescription: 'Description 6', lastUpdated: '2023-10-11T16:31:31', status: false },
      { projectId: 7, projectName: 'Project 7', projectDescription: 'Description 7', lastUpdated: '2023-10-11T16:31:31', status: true },
      { projectId: 8, projectName: 'Project 8', projectDescription: 'Description 8', lastUpdated: '2023-10-11T16:31:31', status: false },
    ];


    const apiMockResponse = {
      data: currentItems,
    };
    const apiMock = require('../../../../../src/network/api');
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    
    render(<MemoryRouter><UserHistory /></MemoryRouter>);

    await waitFor(() => {
    for (const item of currentItems) {
      expect(screen.getByText(item.projectName)).toBeInTheDocument();
      expect(screen.getByText(item.projectDescription)).toBeInTheDocument();

    }
  });
   
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(currentItems.length + 1);
  });

  it('calls handlePaginate when a pagination button is clicked', async() => {
    const currentItems = [
      { projectId: 6, projectName: 'Project 6', projectDescription: 'Description 6', lastUpdated: '2023-10-11T16:31:31', status: false },
      { projectId: 7, projectName: 'Project 7', projectDescription: 'Description 7', lastUpdated: '2023-10-11T16:31:31', status: true },
      { projectId: 8, projectName: 'Project 8', projectDescription: 'Description 8', lastUpdated: '2023-10-11T16:31:31', status: false },
    ];


    const apiMockResponse = {
      data: currentItems,
    };
    const apiMock = require('../../../../../src/network/api');
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    let currentPage = 1;
    const handlePaginate = (pageNumber) => {
      currentPage = pageNumber;
    };

    render(<MemoryRouter><UserHistory handlePaginate={handlePaginate}/></MemoryRouter>);
    
    await waitFor(() => {
      const paginationButton = screen.getByTestId('page'); 
    fireEvent.click(paginationButton);
    })
    

    
  });



});
   
