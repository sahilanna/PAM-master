import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reports from '../../../../../src/screens/Dashboard/Admin/Reports/Reports';
import api from '../../../../../src/network/api';
import { MemoryRouter } from 'react-router-dom';
import { ngrokUrl } from '../../../../../src/network/config';
import '@testing-library/jest-dom'

jest.mock('../../../../../src/network/api', () => ({
  get: jest.fn().mockResolvedValue([]),
}));

jest.mock('../../../../../src/network/api', () => ({
    get: jest.fn().mockRejectedValue(new Error('Test error')),
  }));

describe('Reports Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with initial data', async () => {
    api.get.mockResolvedValueOnce([
      { userId: 1, userName: 'User 1', projectNames: ['Project A', 'Project B'] },
      { userId: 2, userName: 'User 2', projectNames: ['Project C'] },
    ]);

    render(<MemoryRouter><Reports /></MemoryRouter>);

    expect(screen.getByText('Employees Project List')).toBeInTheDocument();
    expect(screen.getByText('Employees With Multiple Project Access')).toBeInTheDocument();
   
  });

  it('handles clicking on the "Employees Project List" button', async () => {
    api.get.mockResolvedValueOnce([]);
    
    render(<MemoryRouter><Reports /></MemoryRouter>);
    const projectListButton = screen.getByText('Employees Project List');

    fireEvent.click(projectListButton);

    expect(api.get).toHaveBeenCalledWith(`https://${ngrokUrl}/users/getAll`);
  });

  it('handles clicking on the "Employees With Multiple Project Access" button', async () => {
    api.get.mockResolvedValueOnce([]);

    render(<MemoryRouter><Reports /></MemoryRouter>);
    const multipleProjectsButton = screen.getByText('Employees With Multiple Project Access');

    fireEvent.click(multipleProjectsButton);

    expect(api.get).toHaveBeenCalledWith(`https://${ngrokUrl}/users/getMultiple`);
  });

it('handles error when fetching user project list', () => {
    render(<MemoryRouter><Reports /></MemoryRouter>);
    const projectListButton = screen.getByText('Employees Project List');

    fireEvent.click(projectListButton);
    waitFor(() => {
        expect(console.log).toHaveBeenCalledWith('Error fetching user project list:', expect.any(Error));
    });
  });

  it('handles error when fetching other table data', () => {
    render(<MemoryRouter><Reports /></MemoryRouter>);
    const multipleProjectsButton = screen.getByText('Employees With Multiple Project Access');

    fireEvent.click(multipleProjectsButton);
    waitFor(() => {
        expect(console.log).toHaveBeenCalledWith('Error fetching other table data:', expect.any(Error));
    });
    
  });
  

});
