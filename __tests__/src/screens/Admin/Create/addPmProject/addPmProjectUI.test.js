import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddPmProjectUI from '../../../../../../src/screens/Dashboard/Admin/Create/addPmProject/addPmProjectUI';
import '@testing-library/jest-dom';

describe('AddPmProjectUI Component', () => {
  const mockProps = {
    projectName: 'Test Project',
    user: [
      { key: '1', value: 'pm1', text: 'PM 1' },
      { key: '2', value: 'pm2', text: 'PM 2' },
    ],
    errorMessage: '',
    selectedUser: 'pm1',
    handleUserChange: jest.fn(),
    handleSubmit: jest.fn(),
    showOTPMoal: false,
    handleOTPClose: jest.fn(),
    setOtpp: jest.fn(),
    handleOTPSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  it('renders the component with initial props', () => {
    render(<AddPmProjectUI {...mockProps} />);
    // Add more assertions based on your component's initial state
    expect(screen.getByText('Add PM to project')).toBeInTheDocument();
  });
  
  it('calls handleUserChange when selecting a PM', () => {
    const mockHandleUserChange = jest.fn();
    const updatedProps = {
      ...mockProps,
      handleUserChange: mockHandleUserChange,
    };
  
    render(<AddPmProjectUI {...updatedProps} />);
    const dropdown = screen.getByTestId('userDropdown');
  
    // Open the dropdown
    fireEvent.click(dropdown);
  
    // Select an option from the dropdown by text
    const option = screen.getByText('PM 2');
    fireEvent.click(option);
  
    // Ensure that the mockHandleUserChange function is called with the selected value
    expect(mockHandleUserChange).toHaveBeenCalledWith(expect.anything(), {
      value: 'pm2',
    });
  
    // Ensure that the selectedUser state is updated
    expect(screen.getByPlaceholderText('Select PM')).toHaveValue('pm2');
  });
  

  it('calls handleSubmit when submitting the form', async () => {
    render(<AddPmProjectUI {...mockProps} />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockProps.handleSubmit).toHaveBeenCalled();
    });
  });

  
});
