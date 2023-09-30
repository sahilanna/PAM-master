import React from 'react';
import { Form, Button, Dropdown, Modal } from 'semantic-ui-react';

function CreateFigmaDetailsUI({
  isOpen,
  onClose,
  isValidUrl,
  proj,
  selectedProject,
  figmaURL,
  handleProjChange,
  handleUrlChange,
  handleSubmit,
}) {
  return (
    <Modal open={isOpen} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
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
              value={selectedProject}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Figma URL<span style={{ color: 'red' }}>*</span></label>
            <input
              type='text'
              placeholder="Enter Figma URL"
              value={figmaURL}
              onChange={handleUrlChange}
              className={!isValidUrl ? 'error' : ''}
            />
            {!isValidUrl && (
              <p className="error-message">Invalid Figma URL</p>
            )}
          </Form.Field>
          <Button type='submit' disabled={!isValidUrl}>Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default CreateFigmaDetailsUI;
