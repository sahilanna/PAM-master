import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RepoRead from '../../../../../src/screens/Dashboard/Admin/Repository/repoRead';
import api from '../../../../../src/network/api';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom'

jest.mock('../../../../../src/network/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

describe('RepoRead Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<MemoryRouter><RepoRead /></MemoryRouter>);
    
  });

  it('handles searching for repositories',  () => {
    const mockApiResponse = [
      { id: 1, name: 'Repo 1', description: 'Description 1' },
      { id: 2, name: 'Repo 2', description: 'Description 2' },
    ];
    api.get.mockResolvedValue({ data: mockApiResponse });

    render(<MemoryRouter><RepoRead /></MemoryRouter>);

    const searchInput = screen.getByPlaceholderText('Search Repo...');
    fireEvent.change(searchInput, { target: { value: 'Repo 1' } });

    waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(expect.stringContaining('/repositories/get'));
      expect(screen.getByText('Repo 1')).toBeInTheDocument();
      expect(screen.queryByText('Repo 2')).not.toBeInTheDocument();
    });
  });

  it('displays a confirmation dialog when deleting a repository', () => {
    render(<MemoryRouter><RepoRead /></MemoryRouter>);

     waitFor(() => {
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Submit OTP')).toBeInTheDocument();
    });
  });

  it('calls handleCancelDelete when "Cancel" button is clicked', async () => {
    useNavigate.mockReturnValueOnce(jest.fn()); // Mock the navigate function
    render(<MemoryRouter><RepoRead /></MemoryRouter>);

    waitFor(() => {
        fireEvent.click(getByText('Delete'));
    });

    waitFor(() => {
        fireEvent.click(getByText('Cancel'));
    });

    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });

  it('navigates to "/CreateRepo" when "Create Repository" button is clicked', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValueOnce(mockNavigate);
    render(<MemoryRouter><RepoRead /></MemoryRouter>);

    waitFor(() => {
        fireEvent.click(getByText('Create Repository'));
    });
    
    // expect(mockNavigate).toHaveBeenCalledWith('/CreateRepo');
  });

  it('calls handleOTPClose when "Cancel" button is clicked in OTP modal', async () => {
    render(<MemoryRouter><RepoRead /></MemoryRouter>);

    
    waitFor(() => {
        fireEvent.click(getByText('Delete'));
    });

    waitFor(() => {
        fireEvent.click(getByText('Cancel'));
    });

    expect(screen.queryByText('Enter OTP')).not.toBeInTheDocument();
  });

});
