import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function ClearAllDialogue(props) {
    const {show,onClose,onConfirm}=props
    return (
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Confirm Clear</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear all the notifications?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default ClearAllDialogue