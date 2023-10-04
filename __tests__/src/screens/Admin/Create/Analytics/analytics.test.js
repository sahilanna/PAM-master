import React from 'react';
import { MemoryRouter, Router  } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom'; 
import Analytics from '../../../../../../src/screens/Dashboard/Admin/Analytics/Analytics';



// Mock Dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-csv', () => ({
  CSVLink: ({ data, filename }) => (
    <a href={`data:text/csv;charset=utf-8,${encodeURI(JSON.stringify(data))}`} download={filename}>
      Download CSV
    </a>
  ),
}));

jest.mock('../../../../../../src/network/api', () => ({
  get: jest.fn(),
}));

const mockData = [
  { name: 'Admins', count: 3 },
  { name: 'Users', count: 5 },
  { name: 'Project Managers', count: 2 },
];

describe('Analytics Component', () => {
  it('renders loading page when isLoading is true', async () => {
    const history = createMemoryHistory();
  
    render(
      <Router history={history}> {/* Wrap your component in Router */}
        <Analytics />
      </Router>
    );
  
    await waitFor(() => {
      const loadingPage = screen.getByText('Loading...');
      expect(loadingPage).toBeInTheDocument();
    });
  
    // Your additional assertions here
  });
  });

  it('renders chart and buttons when isLoading is false', async () => {
    // Mocking isLoading as false
    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);

    // Mock the API response
    jest.spyOn(require('../../../../../../src/network/api'), 'get').mockResolvedValue({ data: mockData });

    const { container } = render(
      <MemoryRouter>
        <Analytics />
      </MemoryRouter>
    );

    // Ensure the chart is rendered
    const pieChart = screen.getByTestId('analytics-chart');
    expect(pieChart).toBeInTheDocument();

    // Ensure the data is displayed correctly on the chart (you can write specific assertions here)

    // Ensure the Next button is rendered
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();

    // Ensure the Download CSV button is rendered
    const downloadCSVButton = screen.getByText('Download CSV');
    expect(downloadCSVButton).toBeInTheDocument();
  });

