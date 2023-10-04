import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddUserProjectUI from '../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/addUserProjectUI';
import '@testing-library/jest-dom';

describe('AddUserProjectUI', () => {
  const mockData = {
    projectName: 'Test Project',
    user: [
      { key: '1', text: 'User 1', value: '1' },
      { key: '2', text: 'User 2', value: '2' },
    ],
    errorMessage: '',
    selectedUser: '',
    handleUserChange: jest.fn(),
    handleSubmit: jest.fn(),
    showOTPMoal: false,
    handleOTPClose: jest.fn(),
    setOtpp: jest.fn(),
    handleOTPSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  it('renders the AddUserProjectUI component', () => {
    render(<AddUserProjectUI {...mockData} />);
    const addUserProjectUI = screen.getByText('Add User to project');
    expect(addUserProjectUI).toBeInTheDocument();
  });

  it('handles user selection change', async () => {
    render(<AddUserProjectUI {...mockData} />);
    
    // Use getByTestId to find the Dropdown by its data-testid attribute
    const selectUserDropdown = screen.getByTestId('userDropdown');
    
    // Open the dropdown to make the options visible
    userEvent.click(selectUserDropdown);
    
    // Now, select the option by its text
    const userOption = screen.getByText('User 2');
    userEvent.click(userOption);
  
    expect(mockData.handleUserChange).toHaveBeenCalledWith(expect.anything(), { value: '2' });
  });
  
  

  it('handles form submission', async () => {
    render(<AddUserProjectUI {...mockData} />);
    const submitButton = screen.getByText('Submit');
    
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(mockData.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('displays OTP modal and handles OTP submission', async () => {
    mockData.showOTPMoal = true;
    render(<AddUserProjectUI {...mockData} />);
    
    // Use getByLabelText to find the input element associated with the label
    const otpInput = screen.getByLabelText('OTP sent to +91 9928931610');
    
    userEvent.type(otpInput, '123456');
    
    const submitOTPButton = screen.getByText('Submit OTP');
    userEvent.click(submitOTPButton);
    
    // Ensure that handleOTPSubmit is called with the expected OTP value
    expect(mockData.handleOTPSubmit).toHaveBeenCalledWith('123456');
  
    // Ensure that setOtpp is called with the expected OTP value
    expect(mockData.setOtpp).toHaveBeenCalledWith('123456');
  });
  
  
  
  
  
  
  

  it('handles OTP modal close', async () => {
    mockData.showOTPMoal = true;
    render(<AddUserProjectUI {...mockData} />);
    
    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);
    
    expect(mockData.handleOTPClose).toHaveBeenCalledWith(expect.anything());
  });

  it('handles modal close', () => {
    render(<AddUserProjectUI {...mockData} />);
    const closeButton = screen.getByText('X');

    
    userEvent.click(closeButton);
    expect(mockData.onClose).toHaveBeenCalled();
  });
});
