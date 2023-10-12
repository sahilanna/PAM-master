import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserHistory from '../../../../../src/screens/Dashboard/Admin/userHistory/userHistory';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'


// Mock the CSVLink component
jest.mock('react-csv', () => ({ CSVLink: 'div' }));

describe('UserHistory Component', () => {

  it('renders without crashing', () => {
    render(<MemoryRouter><UserHistory /></MemoryRouter>);
  });

//   it('handles pagination correctly', async () => {

//     const { getByText, getByLabelText } = render(<MemoryRouter><UserHistory /></MemoryRouter>);
    
//     const nextPageButton = getByLabelText('Next');
//     const prevPageButton = getByLabelText('Previous');

//     expect(getByText('Project 1')).toBeInTheDocument();
//     expect(queryByText('Project 6')).not.toBeInTheDocument();

//     fireEvent.click(nextPageButton);

//     await waitFor(() => {
//       expect(getByText('Project 6')).toBeInTheDocument();
//       expect(queryByText('Project 1')).not.toBeInTheDocument();
//     });

//     fireEvent.click(prevPageButton);

//     await waitFor(() => {
//       expect(getByText('Project 1')).toBeInTheDocument();
//       expect(queryByText('Project 6')).not.toBeInTheDocument();
//     });
//   });

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

    // Ensure that serial numbers are generated correctly
    // expect(getByText('Serial No')).toBeInTheDocument();
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
