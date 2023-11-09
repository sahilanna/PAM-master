import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import LoadingPage from '../../../../../atoms/LoadingPage/loadingPage';
import { ToastContainer } from 'react-toastify';

function CreateProjectUI({ loading, success, error, onClose, projectName, projectDescription, handleSubmit, setProjectName, setProjectDescription }) {
  return (
    <>
      <ToastContainer />

      <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
        {loading && <LoadingPage />}
        {success && <div>Project created successfully!</div>}
        {error && <div>Error: {error.message}</div>}
        <div style={{ paddingTop: '6px' }}></div>
        <div style={{ paddingLeft: '442px' }}>
          <Button data-testid='close' secondary onClick={onClose}>
            X
          </Button>
        </div>
        <Modal.Header>Create Project</Modal.Header>
        <Modal.Content>
          <Form data-testid='submit' onSubmit={handleSubmit}>
            <Form.Field>
              <label  style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
              <input data-testid='PName' name='name' value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder='Name' />
              <br />
            </Form.Field>
            <Form.Field>
              <label  style={{ textAlign: 'left' }}>Project Description<span style={{ color: 'red' }}>*</span></label>
              <input data-testid='PDesc' name='description' value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder='description' />
            </Form.Field>
            <Button data-testid='submit1' type='submit' primary disabled={!projectName || !projectDescription}>Submit</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default CreateProjectUI;
