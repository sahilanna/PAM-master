import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateProjectUI from '../../../../../../src/screens/Dashboard/Admin/Create/createProject/createProjectUI';
import '@testing-library/jest-dom';

describe('CreateProjectUI Component', () => {
  const mockProps = {
    loading: false,
    success: false,
    error: null,
    onClose: jest.fn(),
    projectName: '',
    projectDescription: '',
    handleSubmit: jest.fn(),
    setProjectName: jest.fn(),
    setProjectDescription: jest.fn(),
  };

  it('renders the CreateProjectUI component with initial state', () => {
    const { getByText, getByPlaceholderText } = render(
      <CreateProjectUI {...mockProps} />
    );

    
    const nameLabel = getByText(/Project-Name\*/);
    const descriptionLabel = getByText('Project Description*');
    const nameInput = getByPlaceholderText('Name');
    const descriptionInput = getByPlaceholderText('description');
    const submitButton = getByText('Submit');

    expect(nameLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('calls handleSubmit function when the form is submitted', () => {
    const { getByText } = render(<CreateProjectUI {...mockProps} />);
    const submitButton = getByText('Submit');

    fireEvent.click(submitButton);

    
    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });

  it('displays success message when success prop is true', () => {
    const propsWithSuccess = { ...mockProps, success: true };
    const { getByText } = render(<CreateProjectUI {...propsWithSuccess} />);

    const successMessage = getByText('Project created successfully!');
    expect(successMessage).toBeInTheDocument();
  });

  it('displays error message when error prop is not null', () => {
    const propsWithError = { ...mockProps, error: { message: 'Test Error' } };
    const { getByText } = render(<CreateProjectUI {...propsWithError} />);

    const errorMessage = getByText('Error: Test Error');
    expect(errorMessage).toBeInTheDocument();
  });

  
});
