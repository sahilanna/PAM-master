import React from "react";
import { Form, Button, Modal, Dropdown } from "semantic-ui-react";
import OtpModal from "../../../../../molecules/otpModal";
import CloseButton from "../../../../../atoms/closeButton/closeButton";
import "./addUserProjectModal.css";
function AddUserProjectModal({
  projectName,
  user,
  errorMessage,
  selectedUser,
  handleUserChange,
  handleSubmit,
  showOTPModal,
  handleOTPClose,
  setOtpp,
  handleOTPSubmit,
  onClose,
}) {
  return (
    <Modal size="mini" open={true} onClose={onClose} className="add-user-project">
      <CloseButton onClick={onClose} />

      <Modal.Header>Add User to project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              Project-Name
              <span className="red-text">*</span>
            </label>
            <input name="name" placeholder={projectName} readOnly />
          </Form.Field>
          <Form.Field>
            <label>
              {" "}
              User <span className="red-text">*</span>
            </label>
            <Dropdown
              data-testid="userDropdown"
              placeholder="Select User"
              fluid
              selection
              options={user}
              onChange={handleUserChange}
            />
          </Form.Field>

          <Button type="submit" primary>
            Submit
          </Button>
        </Form>
      </Modal.Content>

      {/* OTP Modal */}
      <OtpModal
        open={showOTPModal}
        onClose={handleOTPClose}
        onSubmit={handleOTPSubmit}
        errorMessage={errorMessage}
      />
    </Modal>
  );
}

export default AddUserProjectModal;
