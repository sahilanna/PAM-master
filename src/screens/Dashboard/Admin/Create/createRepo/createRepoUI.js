import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateRepoUI({ name, description, handleChange, handleSubmit, clicked, onClose }) {
  return (
    <>
      <ToastContainer />
      <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
        <div style={{ paddingTop: '6px' }}></div>
        <div style={{ paddingLeft: '442px' }}>
          <Button data-testid='close' secondary onClick={onClose}>X</Button>
        </div>
        <Modal.Header>Create New Repository</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Name<span style={{ color: 'red' }}>*</span></label>
              <input name='name' value={name} onChange={handleChange} placeholder='Name' />
              {clicked && name.length <= 0 ? <label style={{ color: 'red' }}>Repo name can't be Empty</label> : ''}
              <br />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Description<span style={{ color: 'red' }}>*</span></label>
              <input name='description' value={description} onChange={handleChange} placeholder='Description' />
              {clicked && description.length <= 0 ? <label style={{ color: 'red' }}>Repo description can't be Empty</label> : ''}
              <br />
            </Form.Field>
            <Button type='submit' primary disabled={!name || !description}>Submit</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
}

export default CreateRepoUI;
