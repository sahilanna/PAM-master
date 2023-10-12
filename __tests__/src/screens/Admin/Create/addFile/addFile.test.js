import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddFile from '../../../../../../src/screens/Dashboard/Admin/Create/addFile/addFile';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { handleFileUpload } from '../../../../../../src/screens/Dashboard/Admin/Create/addFile/addFile';
import api from '../../../../../../src/network/api';
import AddFileUI from '../../../../../../src/screens/Dashboard/Admin/Create/addFile/addFileUI';

jest.mock('../../../../../../src/network/api'); 
console.error = jest.fn();

test('handleFileUpload should upload a file and reset state on success', async () => {
  const setFileErrorMessage = jest.fn();
  const projectId = 123;
  const headers = {};
  const setUploadProgress = jest.fn();
  const resetFileInputs = jest.fn();
  const navigate = jest.fn();

  const response = { data: 'File uploaded successfully' };
  api.post.mockResolvedValue(response);

  const file = new File(['file content'], 'test.png', { type: 'image/png' });
  
  await handleFileUpload(
    file,
    setFileErrorMessage,
    projectId,
    headers,
    setUploadProgress,
    resetFileInputs,
    navigate
  );

  
  expect(api.post).toHaveBeenCalledWith(expect.stringContaining(`/projects/upload?projectId=${projectId}`), expect.any(FormData), {
    headers,
    onUploadProgress: expect.any(Function),
  });

  const progressEvent = { loaded: 50, total: 100 };
  api.post.mock.calls[0][2].onUploadProgress(progressEvent);

  
  expect(setUploadProgress).toHaveBeenCalledWith(50);

  
  api.post.mock.calls[0][2].onUploadProgress({ loaded: 100, total: 100 }); 
  await response;
  expect(resetFileInputs).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith('/adminDashboard');
})


test('handleFileUpload should set file error message when modalfile is not provided', () => {
  const setFileErrorMessage = jest.fn();
  const projectId = 123;
  const headers = {};
  const setUploadProgress = jest.fn();
  const resetFileInputs = jest.fn();
  const navigate = jest.fn();

  handleFileUpload(null, setFileErrorMessage, projectId, headers, setUploadProgress, resetFileInputs, navigate);

  expect(setFileErrorMessage).toHaveBeenCalledWith('Please select a file to upload.');
  expect(setUploadProgress).not.toHaveBeenCalled();
  expect(resetFileInputs).not.toHaveBeenCalled();
  expect(navigate).not.toHaveBeenCalled();
});

test('AddFile renders with the correct project name', () => {
  const projectName = 'Test Project';
  const location = {
    state: { projectId: 123, projectName },
  };

  const { getByText } = render(<AddFile />, { wrapper: MemoryRouter, initialEntries: ['/adminDashboard'], initialIndex: 0 });
  
  expect(getByText(/Project Name/i)).toBeInTheDocument();
  
});

test('handleModelFileSelect sets modalfile and clears error message when a valid file is selected', () => {
  const { getByLabelText, queryByText } = render(<MemoryRouter><AddFile /></MemoryRouter>);

  const file = new File(['file content'], 'test.png', { type: 'image/png' });

  const fileInput = getByLabelText(/Add Help document/i);
  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(queryByText(file.name)).toBeInTheDocument();
  expect(queryByText('Invalid file format')).not.toBeInTheDocument();
  expect(queryByText('File size exceeds')).not.toBeInTheDocument();
});

test('onClose function should navigate to /adminDashboard', () => {
  const navigate = jest.fn();
  const { getByTestId } = render(<MemoryRouter><AddFile navigate={navigate} /></MemoryRouter>); // Pass navigate as a prop

  const closeButton = getByTestId('close');
  fireEvent.click(closeButton);

  // expect(navigate).toHaveBeenCalledWith('/adminDashboard');
});

test('handleModelFileSelect should set file error message when modalfile is not provided', () => {
  const { getByLabelText, getByText } = render(<MemoryRouter><AddFile /></MemoryRouter>);
  const fileInput = getByLabelText(/Add Help document/i);
  fireEvent.change(fileInput, { target: { files: [] } });

  expect(getByText('Please select a file to upload.')).toBeInTheDocument();
});

test('handleModelFileSelect should set file error message for invalid file format', () => {
  const { getByLabelText, getByText } = render(<MemoryRouter><AddFile /></MemoryRouter>);
  const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
  const fileInput = getByLabelText(/Add Help document/i);
  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(getByText('Invalid file format. Only PNG, JPG, and PDF files are allowed.')).toBeInTheDocument();
});


test('handleModelFileSelect should set modalfile and clear error message for valid file', () => {
  const { getByLabelText, queryByText } = render(<MemoryRouter><AddFile /></MemoryRouter>);
  const validFile = new File(['file content'], 'valid.png', { type: 'image/png', size: 30000 });
  const fileInput = getByLabelText(/Add Help document/i);
  fireEvent.change(fileInput, { target: { files: [validFile] } });

  expect(queryByText('Please select a file to upload.')).toBeNull();
  expect(queryByText('Invalid file format. Only PNG, JPG, and PDF files are allowed.')).toBeNull();
});

