import React from 'react';
import { Form, Dropdown, Modal, Button } from 'semantic-ui-react';

function AddUserUI({ selectedRepo, options, username, handleUserNameBChange, handleSubmit, onClose }) {
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px', height: '450px' }} className='create-Project-Modal'>
      <div style={{ paddingTop: '6px' }}></div>
      <div style={{ paddingLeft: '440px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>Add User</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Repository Name</label>
            <input name="repoName" value={selectedRepo || ''} readOnly />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>User Username<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Username"
              fluid
              selection
              options={options.map((name, index) => ({
                key: index,
                text: name,
                value: name
              }))}
              value={username}
              onChange={handleUserNameBChange}
            />
          </Form.Field>
          <Button type='submit' primary>Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  );
}

export default AddUserUI;