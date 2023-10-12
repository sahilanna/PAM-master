import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import OtpModal from '../../../../../src/screens/Dashboard/Admin/Read/otpModal';
import '@testing-library/jest-dom';

describe('OtpModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    errorMessage: '',
  };

  it('renders without errors', () => {
    const { container } = render(<OtpModal {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the OTP modal with the correct label', () => {
    const { getByText } = render(<OtpModal {...defaultProps} />);
    expect(getByText('Enter OTP')).toBeInTheDocument();
  });


  it('calls onClose when the "Cancel" button is clicked', () => {
    const { getByText } = render(<OtpModal {...defaultProps} />);
    fireEvent.click(getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays an error message when errorMessage prop is provided', () => {
    const { getByText } = render(<OtpModal {...defaultProps} errorMessage="Invalid OTP" />);
    expect(getByText('Invalid OTP')).toBeInTheDocument();
  });


   it('calls onSubmit when the form is submitted with OTP', async () => {
    const { getByTestId } = render(<OtpModal {...defaultProps} />);
    const otpInput = getByTestId('otp-input');
    fireEvent.change(otpInput, { target: { value: '123456' } });

    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('123456');
    });
  });

});
