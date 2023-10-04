import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import api from '../../../../../../src/network/api';
import AddFile from '../../../../../../src/screens/Dashboard/Admin/Create/addFiile/addFile';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock the api.post function
jest.mock('../../../../../../src/network/api', () => ({
  post: jest.fn(),
}));

describe('AddFile Component', () => {
  // Mock the useNavigate function
  const mockNavigate = jest.fn();

  it('renders AddFile component without errors', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/adminDashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/create" element={<AddFile />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('handles file selection and upload', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/adminDashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/create" element={<AddFile />} />
        </Routes>
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText('Select a file');

    // Simulate selecting a file
    const mockFile = new File(['file contents'], 'example.pdf', {
      type: 'application/pdf',
    });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Ensure that the selected file is displayed
    expect(screen.getByText('Selected File: example.pdf')).toBeInTheDocument();

    // Simulate clicking the upload button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Simulate the successful upload response
    api.post.mockResolvedValueOnce({ data: 'upload successful' });

    await waitFor(() => {
      // Ensure that the component returns to the initial state
      expect(screen.getByText('Upload File')).toBeInTheDocument();

      // Ensure that navigation occurs after a successful upload
      expect(mockNavigate).toHaveBeenCalledWith('/adminDashboard');
    });
  });

  it('handles file selection and upload with error', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/adminDashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/create" element={<AddFile />} />
        </Routes>
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText('Select a file');

    // Simulate selecting a file with an unsupported format
    const mockFile = new File(['file contents'], 'example.txt', {
      type: 'text/plain',
    });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Ensure that the error message is displayed
    expect(screen.getByText('Invalid file format. Only PNG, JPG, and PDF files are allowed.')).toBeInTheDocument();

    // Simulate clicking the upload button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Ensure that the error message remains and no upload is attempted
    expect(screen.getByText('Invalid file format. Only PNG, JPG, and PDF files are allowed.')).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('handles file selection and upload without selecting a file', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/adminDashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/create" element={<AddFile />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate clicking the upload button without selecting a file
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Ensure that the error message is displayed
    expect(screen.getByText('Please select a file to upload.')).toBeInTheDocument();

    // Ensure that no upload is attempted
    expect(api.post).not.toHaveBeenCalled();
  });
});
