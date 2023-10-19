import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';
import './pmDashboard.css'

function ClearAllDialogue(props) {
    const { show, onClose, onConfirm } = props;

    return (
        <Modal className="custom-dialog3" open={show} onClose={onClose}>
            <Header icon="exclamation triangle" content="Confirm Clear" />
            <Modal.Content>
                <p>Are you sure you want to clear all the notifications?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button data-testid='onClose'color="grey" onClick={onClose}>
                    Cancel
                </Button>
                <Button data-testid='onConfirm' color="red" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ClearAllDialogue;
