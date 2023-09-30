import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddPmProjectUI from '../../../../../../src/screens/Dashboard/Admin/Create/addPmProject/addPmProjectUI';
import '@testing-library/jest-dom';


describe('AddPmProjectUI Component', () => {
  const projectName = 'Test Project';
  const userOptions = [
    { key: '1', value: 'pm1', text: 'PM 1' },
    { key: '2', value: 'pm2', text: 'PM 2' },
   
  ];

  const handleUserChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleOTPClose = jest.fn();
  const setOtpp = jest.fn();
  const handleOTPSubmit = jest.fn();
  const onClose = jest.fn();

  const errorMessage = 'Invalid OTP'; 
  const selectedUser = 'pm1'; 
  const showOTPMoal = true; 

  it('handles user selection change', async() => {
    render(
      <AddPmProjectUI
        projectName={projectName}
        user={userOptions}
        errorMessage={errorMessage}
        selectedUser={selectedUser}
        handleUserChange={handleUserChange}
        handleSubmit={handleSubmit}
        showOTPMoal={showOTPMoal}
        handleOTPClose={handleOTPClose}
        setOtpp={setOtpp}
        handleOTPSubmit={handleOTPSubmit}
        onClose={onClose}
      />
    );

    const dropdown = screen.getByPlaceholderText('Select PM');
  fireEvent.click(dropdown);

 
  const selectedValue = 'pm2';
  const option = screen.getByText(selectedValue);
  fireEvent.click(option);

  
  expect(handleUserChange).toHaveBeenCalledWith(
    expect.objectContaining({ target: { value: selectedValue } })
  );
});
 
});
