import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';

function AddFileUI({
  projectName,
  modalfile,
  fileErrorMessage,
  handleModelFileSelect,
  handleFileUpload,
  onClose,
}) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{ top: '170px', height: 'auto', width: '500px' }}
      className='create-Project-Modal'
    >
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button data-testid='close'secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project Name</label>
            <input name="name" placeholder={projectName} readOnly />
          </Form.Field>
          <Form.Field>
            <div>
              <label>Add Help document<span style={{ color: 'red' }}>*</span>
              <input className="text-center" type="file" onChange={handleModelFileSelect} /></label>
              {modalfile && <div>{modalfile.name}</div>}
              {fileErrorMessage && <div style={{ color: 'red' }}>{fileErrorMessage}</div>}
            </div>
          </Form.Field>
          <Button type="submit" onClick={handleFileUpload}>
            Submit
          </Button>
         
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default AddFileUI;