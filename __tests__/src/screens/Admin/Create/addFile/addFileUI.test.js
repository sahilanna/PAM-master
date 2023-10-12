import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddFileUI from '../../../../../../src/screens/Dashboard/Admin/Create/addFile/addFileUI';

describe('AddFileUI Component', () => {
  const projectName = 'Test Project';
  const fileErrorMessage = 'Invalid file format.';
  const modalfile = { name: 'example.pdf' };
  const uploadProgress = 50;
  const onClose = jest.fn();
  const handleModelFileSelect = jest.fn();
  const handleFileUpload = jest.fn();

  it('renders AddFileUI component without errors', () => {
    render(
      <AddFileUI
        projectName={projectName}
        modalfile={modalfile}
        fileErrorMessage={fileErrorMessage}
        handleModelFileSelect={handleModelFileSelect}
        handleFileUpload={handleFileUpload}
        uploadProgress={uploadProgress}
        onClose={onClose}
      />
    );

   
    expect(screen.getByText('Project Name')).toBeInTheDocument();
    expect(screen.getByText('Add Help document')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('displays project name in the input field', () => {
    render(
      <AddFileUI
        projectName={projectName}
        modalfile={modalfile}
        fileErrorMessage={fileErrorMessage}
        handleModelFileSelect={handleModelFileSelect}
        handleFileUpload={handleFileUpload}
        uploadProgress={uploadProgress}
        onClose={onClose}
      />
    );

   
    expect(screen.getByPlaceholderText('Test Project')).toBeInTheDocument();
  });

  it('handles file selection and displays file name', () => {
    render(
      <AddFileUI
        projectName={projectName}
        modalfile={modalfile}
        fileErrorMessage={fileErrorMessage}
        handleModelFileSelect={handleModelFileSelect}
        handleFileUpload={handleFileUpload}
        uploadProgress={uploadProgress}
        onClose={onClose}
      />
    );

   
    const fileInput = screen.getByLabelText('Add Help document*');
    expect(fileInput).toBeInTheDocument();

    
    fireEvent.change(fileInput, { target: { files: [modalfile] } });

    
    expect(screen.getByText('example.pdf')).toBeInTheDocument();
  });

  it('displays file error message', () => {
    render(
      <AddFileUI
        projectName={projectName}
        modalfile={modalfile}
        fileErrorMessage={fileErrorMessage}
        handleModelFileSelect={handleModelFileSelect}
        handleFileUpload={handleFileUpload}
        uploadProgress={uploadProgress}
        onClose={onClose}
      />
    );

   
    expect(screen.getByText('Invalid file format.')).toBeInTheDocument();
  });

  it('handles file upload', () => {
    render(
      <AddFileUI
        projectName={projectName}
        modalfile={modalfile}
        fileErrorMessage={fileErrorMessage}
        handleModelFileSelect={handleModelFileSelect}
        handleFileUpload={handleFileUpload}
        uploadProgress={uploadProgress}
        onClose={onClose}
      />
    );

    
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();

   
    fireEvent.click(submitButton);

    
    expect(handleFileUpload).toHaveBeenCalledTimes(1);
  });
});
