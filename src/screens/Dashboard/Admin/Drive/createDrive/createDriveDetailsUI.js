
import React from 'react';
import { Form, Button, Dropdown, Modal } from 'semantic-ui-react';
import '../../Create/Create.css';

function CreateDriveDetailsUI({
  driveURL,
  isValidUrl,
  proj,
  handleUrlChange,
  handleProjChange,
  handleSubmit,
  onClose,
}) {
  return (
    <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
         <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
        </div>
        <div style={{paddingLeft:'442px'}}>
        <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add Project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Projects<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Project"
              fluid
              selection
              options={proj}
              onChange={handleProjChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Drive Link<span style={{ color: 'red' }}>*</span></label>
            <input
              type='text'
              placeholder="Enter Drive Link"
              value={driveURL}
              onChange={handleUrlChange}
              className={!isValidUrl ? 'error' : ''}
            />
            {!isValidUrl && (
              <p className="error-message">Invalid Drive URL</p>
            )}
          </Form.Field>
          <Button type='submit' disabled={!isValidUrl}>Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  );
}

export default CreateDriveDetailsUI;