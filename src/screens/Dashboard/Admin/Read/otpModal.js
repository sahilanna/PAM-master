import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

const OtpModal = ({ open, onClose, onSubmit, errorMessage }) => {
  const [otp, setOtp] = useState('');

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <Modal open={open} onClose={onClose} style={{ width: '500px' }} className="centered-modal-OTP">
      <Modal.Header>Enter OTP</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleOTPSubmit}>
          <div className="form-field">
            <label> OTP sent to '+91 9928931610'</label>
            <input data-testid='otp-input' type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
          </div>
          <p>{errorMessage}</p>
          <Button data-testid='submit' type="submit" primary>
            Submit OTP
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button data-testid='close-otp' onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OtpModal;
