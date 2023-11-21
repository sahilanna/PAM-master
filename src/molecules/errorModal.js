import React from "react";
import { Modal, Button } from "semantic-ui-react";

function ErrorModal({ open, header, content, onClose }) {
  return (
    <Modal open={open} size="mini" className="form-modal">
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={onClose}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ErrorModal;
