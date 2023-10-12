import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CommonProjectDetailsUI from '../../../../../../../src/screens/Dashboard/Admin/Drive/createDrive/commonProjectDetailsUI';

describe('CommonProjectDetailsUI', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    isValidUrl: true,
    proj: [
      { key: 'project1', text: 'Project 1', value: 'Project 1' },
      { key: 'project2', text: 'Project 2', value: 'Project 2' },
    ],
    selectedProject: 'Project 1',
    url: 'https://example.com',
    handleProjChange: jest.fn(),
    handleUrlChange: jest.fn(),
    handleSubmit: jest.fn(),
    label: 'Add Project',
  };

  it('renders the component with the correct label and input placeholders', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <CommonProjectDetailsUI {...mockProps} />
    );

    expect(getByTestId('projects')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Drive Link')).toBeInTheDocument();
  });

  it('displays an error message for invalid URL', () => {
    const { getByText, getByPlaceholderText } = render(
      <CommonProjectDetailsUI {...mockProps} isValidUrl={false} />
    );

    const input = getByPlaceholderText('Enter Drive Link');
    fireEvent.change(input, { target: { value: 'invalid-url' } });

    expect(getByText('Invalid Drive URL')).toBeInTheDocument();
  });

  it('calls the handleSubmit function when the form is submitted', async () => {
    const { getByText, getByPlaceholderText } = render(
      <CommonProjectDetailsUI {...mockProps} />
    );

    const input = getByPlaceholderText('Enter Drive Link');
    const submitButton = getByText('Submit');

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('calls the onClose function when the X button is clicked', () => {
    const { getByText } = render(<CommonProjectDetailsUI {...mockProps} />);
    const closeButton = getByText('X');
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
});
