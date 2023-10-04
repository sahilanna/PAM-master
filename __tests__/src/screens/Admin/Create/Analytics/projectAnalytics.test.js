import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ProjectAnalytics from '../../../../../../src/screens/Dashboard/Admin/Analytics/projectAnalytics';
import React from 'react';
// Mock dependencies and imports
jest.mock('../../../../../../src/network/api', () => ({
  get: jest.fn((url) => {
    if (url.endsWith('/projects/count/active')) {
      return Promise.resolve({ data: 5 }); // Mock active projects count
    } else if (url.endsWith('/projects/count/inactive')) {
      return Promise.resolve({ data: 3 }); // Mock inactive projects count
    }
  }),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('ProjectAnalytics Component', () => {
//     it('renders without errors', async () => {
//         const { getByTestId } = render(ProjectAnalytics);
//         expect(getByTestId('back-button')).toBeInTheDocument();
//         expect(getByTestId('download-button')).toBeInTheDocument();
//       });
      

//   it('displays error message when data fetching fails', async () => {
    
//     jest.spyOn(require('../../../../../../src/network/api'), 'get').mockRejectedValueOnce(new Error('Network error'));

//     const { getByText } = render(<ProjectAnalytics />);
    
    
//     await waitFor(() => getByText('Error fetching data'));

    
//     expect(getByText('Error fetching data')).toBeInTheDocument();
//   });

//   it('navigates to /Analytics on Back button click', async () => {
//     const navigateMock = jest.fn();
//     require('react-router-dom').useNavigate.mockReturnValueOnce(navigateMock);

//     const { getByText } = render(<ProjectAnalytics />);
    
//     // Wait for data to load
//     await waitFor(() => getByText('Project Status'));

//     // Simulate a click on the Back button
//     fireEvent.click(getByText('Back'));

//     // Check if navigate function was called with the expected path
//     expect(navigateMock).toHaveBeenCalledWith('/Analytics');
//   });

  it('generates and downloads CSV on Download CSV button click', async () => {
    const { getByText, getByTestId } = render(ProjectAnalytics);
    
    // Wait for data to load
   
    // Simulate a click on the Download CSV button
    fireEvent.click(getByTestId('download-button'));

    // Check if CSV link attributes are set correctly
    const csvLink = getByTestId('csv-link');
    expect(csvLink.href).toMatch(/^data:text\/csv/);
    expect(csvLink.target).toBe('_blank');
    expect(csvLink.download).toBe('project_status_data.csv');
  });
});
