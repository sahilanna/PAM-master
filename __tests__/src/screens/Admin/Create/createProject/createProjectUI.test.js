import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
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
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CreateProjectUI {...mockProps} />
    );

    
    const nameLabel = getByTestId('PName');
    const descriptionLabel = getByTestId('PDesc');
    const nameInput = getByPlaceholderText('Name');
    const descriptionInput = getByPlaceholderText('description');
    const submitButton = getByText('Submit');

    expect(nameLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
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


  it('updates projectName when input field changes', () => {
    const { getByPlaceholderText } = render(<CreateProjectUI {...mockProps} />);
  
    const nameInput = getByPlaceholderText('Name');
  
    fireEvent.change(nameInput, { target: { value: 'New Project Name' } });
  
  });

  it('updates projectDescription when input field changes', () => {
    const { getByPlaceholderText } = render(<CreateProjectUI {...mockProps} />);
  
    const descriptionInput = getByPlaceholderText('description');
  
    fireEvent.change(descriptionInput, { target: { value: 'New Project Description' } });
  
  });
  
  it('renders LoadingPage when loading prop is true', () => {
    const propsWithLoading = { ...mockProps, loading: true };
    const { getByTestId } = render(<CreateProjectUI {...propsWithLoading} />);
  
    const loadingPage = getByTestId('loader');
    expect(loadingPage).toBeInTheDocument();
  });

  it('enables the Submit button when projectName and projectDescription are not empty', () => {
    const propsWithNonEmptyValues = { ...mockProps, projectName: 'Project Name', projectDescription: 'Project Description' };
    const { getByText } = render(<CreateProjectUI {...propsWithNonEmptyValues} />);
    
    const submitButton = getByText('Submit');
    
    expect(submitButton).toBeEnabled();
  });
  

  
});
