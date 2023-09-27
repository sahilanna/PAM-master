import React from 'react';
import { Form, Button, Modal, Dropdown } from 'semantic-ui-react';

function AddPmProjectUI({
  projectName,
  user,
  errorMessage,
  selectedUser,
  handleUserChange,
  handleSubmit,
  showOTPMoal,
  handleOTPClose,
  setOtpp,
  handleOTPSubmit,
  onClose,
}) {
  return (
    <Modal open onClose={onClose} style={{ width: '500px', height: '400px' }} className='create-Project-Modal'>
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add PM to project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
            <input name="name" placeholder={projectName} readOnly />
            <br />
          </Form.Field>
          <Form.Field>
            <label>PM<span style={{ color: 'red' }}>*</span></label>
            <Dropdown placeholder="Select PM" fluid selection options={user} onChange={handleUserChange} />
          </Form.Field>

          <Button type="submit" primary onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>

      {/* OTP Modal */}
      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to +91 9928931610</label>
              <input type="text" name="otp" onChange={(e) => setOtpp(e.target.value)} />

            </div>
            <p>{errorMessage}</p>
            <Button type="submit" primary>
              Submit OTP
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleOTPClose}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </Modal>
  );
}

export default AddPmProjectUI;
