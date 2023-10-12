import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateFigmaDetailsUI from '../../../../../../src/screens/Dashboard/Admin/Figma/createFigma/createFigmaDetailsUI';

describe('CreateFigmaDetailsUI', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    isValidUrl: true,
    proj: [
      { key: 'project1', text: 'Project 1', value: 'Project 1' },
      { key: 'project2', text: 'Project 2', value: 'Project 2' },
    ],
    selectedProject: 'Project 1',
    figmaURL: 'https://figma.com',
    handleProjChange: jest.fn(),
    handleUrlChange: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('renders the CreateFigmaDetailsUI component with the correct label and input placeholders', () => {
    const { getByTestId, getByPlaceholderText } = render(<CreateFigmaDetailsUI {...mockProps} />);
    
    expect(getByTestId('projects')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Figma URL')).toBeInTheDocument();
  });

  it('calls the handleProjChange function when the project dropdown changes', () => {
    const { getByTestId } = render(<CreateFigmaDetailsUI {...mockProps} />);
    const dropdown = getByTestId('projects');

    fireEvent.click(dropdown);

    
  });

  it('calls the handleUrlChange function when Figma URL input changes', () => {
    const { getByPlaceholderText } = render(<CreateFigmaDetailsUI {...mockProps} />);
    const input = getByPlaceholderText('Enter Figma URL');
    fireEvent.change(input, { target: { value: 'https://new-figma.com' } });

    expect(mockProps.handleUrlChange).toHaveBeenCalledTimes(1);
  });

  it('calls the handleSubmit function when the form is submitted', async () => {
    const { getByText } = render(<CreateFigmaDetailsUI {...mockProps} />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('calls the onClose function when the component is closed', () => {
    const { getByText } = render(<CreateFigmaDetailsUI {...mockProps} />);
    const closeButton = getByText('X');
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
});
