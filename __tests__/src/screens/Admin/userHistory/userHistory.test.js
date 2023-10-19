import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserHistory from '../../../../../src/screens/Dashboard/Admin/userHistory/userHistory';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'
import api from '../../../../../src/network/api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ngrokUrl } from '../../../../../src/network/config';

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

    waitFor(() => {
        expect(getByText('7')).toBeInTheDocument();
    });
    waitFor(() => {
        expect(getByText('8')).toBeInTheDocument();
    });
    
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


  // test('should handle pagination correctly', async () => {
  //   const currentItems = [
  //         { projectId: 6, projectName: 'Project 6', projectDescription: 'Description 6', lastUpdated: '2023-10-11T16:31:31', status: false },
  //         { projectId: 7, projectName: 'Project 7', projectDescription: 'Description 7', lastUpdated: '2023-10-11T16:31:31', status: true },
  //         { projectId: 8, projectName: 'Project 8', projectDescription: 'Description 8', lastUpdated: '2023-10-11T16:31:31', status: false },
  //       ];
    
    
  //       const apiMockResponse = {
  //         data: currentItems,
  //       };
  //       const apiMock = require('../../../../../src/network/api');
  //       apiMock.default.get.mockResolvedValue(apiMockResponse);
    
        
  //       render(<MemoryRouter><UserHistory /></MemoryRouter>);
    
  //       await waitFor(() => {
  //       for (const item of currentItems) {
  //         expect(screen.getByText(item.projectName)).toBeInTheDocument();
  //         expect(screen.getByText(item.projectDescription)).toBeInTheDocument();
    
  //       }
  //     });
    
  
   
  //   const paginationButton = screen.getByText('2'); // Assuming you have pagination buttons with labels like '1', '2', '3', etc.
  //   fireEvent.click(paginationButton);

    

  //   expect(apiMock.default.get).toHaveBeenCalledWith(`https://${ngrokUrl}/projects/all`);
  //   expect(apiMock.default.handlePaginate).toHaveBeenCalledWith('2');

  //   // await waitFor(() => {
  //   //   const currentPage = screen.getByText('2');
  //   //   expect(currentPage).toHaveTextContent('2');
  //   // });
  
   
  // });

















   

//   it('fetches and displays project data', () => {
//     // Mock the API call
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       json: async () => ({
//         data: [
//           {
//             projectId: 1,
//             projectName: 'Project 1',
//             projectDescription: 'Description 1',
//             status: true,
//             lastUpdated: new Date(),
//           },
//         ],
//       }),
//     });

//     const { getByText, getByPlaceholderText } = render(<MemoryRouter><UserHistory /></MemoryRouter>);
    
    
//     expect(getByText('Project 1')).toBeInTheDocument();
//     expect(getByPlaceholderText('Search Project History')).toBeInTheDocument();
//   });

//   it('filters project data on search', async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       json: async () => ({
//         data: [
//           {
//             projectId: 1,
//             projectName: 'Project 1',
//             projectDescription: 'Description 1',
//             status: true,
//             lastUpdated: new Date(),
//           },
//           {
//             projectId: 2,
//             projectName: 'Project 2',
//             projectDescription: 'Description 2',
//             status: false,
//             lastUpdated: new Date(),
//           },
//         ],
//       }),
//     });

//     const { getByText, getByPlaceholderText } = render(<UserHistory />);
//     await waitFor(() => expect(getByText('Loading...')).not.toBeInTheDocument());

//     // Perform a search
//     const searchInput = getByPlaceholderText('Search Project History');
//     fireEvent.change(searchInput, { target: { value: 'Project 2' } });

//     // Ensure only filtered data is displayed
//     expect(getByText('Project 2')).toBeInTheDocument();
//     expect(queryByText('Project 1')).not.toBeInTheDocument();
//   });

//   it('handles pagination correctly', async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       json: async () => ({
//         data: Array.from({ length: 10 }, (_, i) => ({
//           projectId: i + 1,
//           projectName: `Project ${i + 1}`,
//           projectDescription: `Description ${i + 1}`,
//           status: i % 2 === 0, // Alternate statuses
//           lastUpdated: new Date(),
//         })),
//       }),
//     });

//     const { getByText, getByLabelText } = render(<UserHistory />);
//     await waitFor(() => expect(getByText('Loading...')).not.toBeInTheDocument());

//     // Pagination controls
//     const nextPageButton = getByLabelText('Next');
//     const prevPageButton = getByLabelText('Previous');

//     // Initial page
//     expect(getByText('Project 1')).toBeInTheDocument();
//     expect(queryByText('Project 6')).not.toBeInTheDocument();

//     // Go to the next page
//     fireEvent.click(nextPageButton);
//     await waitFor(() => expect(getByText('Project 6')).toBeInTheDocument());
//     expect(queryByText('Project 1')).not.toBeInTheDocument();

//     // Go to the previous page
//     fireEvent.click(prevPageButton);
//     await waitFor(() => expect(getByText('Project 1')).toBeInTheDocument());
//     expect(queryByText('Project 6')).not.toBeInTheDocument();
//   });
});
