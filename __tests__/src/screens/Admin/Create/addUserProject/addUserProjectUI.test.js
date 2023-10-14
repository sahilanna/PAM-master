import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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


  it('handles form submission', async () => {
    render(<AddUserProjectUI {...mockData} />);
    const submitButton = screen.getByText('Submit');
    
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(mockData.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test("renders OTP input and handles input change", () => {
    const mockSetOtpp = jest.fn();

    const { getByTestId } = render(
      <AddUserProjectUI
        projectName="Test Project"
        user={[]}
        errorMessage=""
        selectedUser={null}
        handleUserChange={() => {}}
        handleSubmit={() => {}}
        showOTPMoal={true}
        handleOTPClose={() => {}}
        setOtpp={mockSetOtpp}
        handleOTPSubmit={() => {}}
        onClose={() => {}}
      />
    );

    const otpInput = getByTestId("otp");
    fireEvent.change(otpInput, { target: { value: "123456" } });

    expect(otpInput.value).toBe("123456");
    expect(mockSetOtpp).toHaveBeenCalledWith("123456");
  });


});
