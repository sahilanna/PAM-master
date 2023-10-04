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
  it('renders loading page when isLoading is true', () => {
    // Mocking isLoading as true
    const { container } = render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    const loadingPage = screen.getByText('Loading...');
    expect(loadingPage).toBeInTheDocument();
    expect(container.querySelector('.ui.table')).toBeEmptyDOMElement();
  });

  it('renders project table when isLoading is false', async () => {
    // Mocking isLoading as false
    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);

    const { container } = render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Ensure the project table is rendered
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    // Ensure the Search Project input is rendered
    const searchInput = screen.getByPlaceholderText('Search Project...');
    expect(searchInput).toBeInTheDocument();

    // Ensure the "Create Project" button is rendered
    const createProjectButton = screen.getByText('Create Project');
    expect(createProjectButton).toBeInTheDocument();

    // Ensure the "Download CSV" button is rendered
    const downloadCSVButton = screen.getByText('Download CSV');
    expect(downloadCSVButton).toBeInTheDocument();
  });

  it('filters projects based on search input', async () => {
    // Mocking isLoading as false
    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);

    const { container } = render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Ensure the Search Project input is rendered
    const searchInput = screen.getByPlaceholderText('Search Project...');

    // Enter a search query
    fireEvent.change(searchInput, { target: { value: 'project1' } });

    // Wait for the table to update with filtered data
    await waitFor(() => {
      const projectRow = screen.getByText('Project 1');
      expect(projectRow).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    // Mocking isLoading as false
    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);

    const { container } = render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Ensure the project table is rendered
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    // Ensure there are navigation buttons
    const nextPageButton = screen.getByText('Next');
    const prevPageButton = screen.getByText('Previous');
    expect(nextPageButton).toBeInTheDocument();
    expect(prevPageButton).toBeInTheDocument();

    // Simulate clicking the "Next" button
    fireEvent.click(nextPageButton);

    // Wait for the table to update with the next page data
    await waitFor(() => {
      const projectRow = screen.getByText('Project 6'); // Adjust this based on your pagination logic
      expect(projectRow).toBeInTheDocument();
    });

    // Simulate clicking the "Previous" button
    fireEvent.click(prevPageButton);

    // Wait for the table to update with the previous page data
    await waitFor(() => {
      const projectRow = screen.getByText('Project 1'); // Adjust this based on your pagination logic
      expect(projectRow).toBeInTheDocument();
    });
  });

  // Add more test cases for interactions, edge cases, etc.
});
