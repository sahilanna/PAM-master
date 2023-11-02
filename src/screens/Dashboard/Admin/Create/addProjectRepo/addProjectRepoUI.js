import React from 'react';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';
import '../Create.css';

const CreateUI = ({ onSubmit, onClose, projItem, temp, handleProjectChange, handleRepoChange }) => {
  

  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px', height: '410px' }} className='create-Project-Modal'>
      <div style={{ paddingTop: '6px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button data-testid="close" secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add Project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            
            <label style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              data-testid="project-dropdown"
              placeholder="Select project"
              fluid
              selection
              options={projItem}
              onChange={handleProjectChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>REPO<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              data-testid="repo-dropdown"
              placeholder="Select Repo"
              fluid
              selection
              options={temp}
              onChange={handleRepoChange}
            />
          </Form.Field>
          <Button data-testid="submit" type='submit' primary>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};

export default CreateUI;