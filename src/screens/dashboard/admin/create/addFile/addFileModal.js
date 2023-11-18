import React from "react";
import {
  Form,
  Modal,
  Button,
} from "semantic-ui-react";
import CloseButton from "../../../../../atoms/closeButton/closeButton";
import "./addFileModal.css";

function AddFileModal({
  projectName,
  modalfile,
  fileErrorMessage,
  handleModelFileSelect,
  handleFileUpload,
  onClose,
}) {
  return (
    <Modal
      size="mini"
      open={true}
      className="form-modal"
      onClose={onClose}
    >
      <CloseButton onClick={onClose} />

      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Project Name</label>
            <input
              name="name"
              placeholder={projectName}
              readOnly
            />
          </Form.Field>

          <Form.Field>
            <label>
              Add Help document
              <span className="red-text">*</span>
              <input
                type="file"
                onChange={handleModelFileSelect}
              />
            </label>
            {modalfile && (
              <div>{modalfile.name}</div>
            )}
            {fileErrorMessage && (
              <div className="error-message">
                {fileErrorMessage}
              </div>
            )}
          </Form.Field>

          <Button
            type="submit"
            onClick={handleFileUpload}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddFileModal;
