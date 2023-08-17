import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';

function CreateRepo() {
  const navigate = useNavigate();
  let [name, setname] = useState('');
  const [clicked, setClicked] = useState(false);
  let [description, setDescription] = useState('');

  let handleSubmit =async (e) => {
    if (!name || !description) {
      return;
    }
    e.preventDefault();
    if(!name || !description){
      return
    }
    setClicked(true);
    if (name.length === 0) {
      return;
    }
    if (name) {
      await api.post(`https://${ngrokUrl}/api/repositories/add`, { name, description });
      console.log(name);
      navigate('/repoRead');
    }
  };

  const onClose = () => {
    navigate(-1);
  }

  return (
    <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{ paddingTop: '6px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>X</Button>
      </div>
      <Modal.Header>Create New Repository</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Name<span style={{ color: 'red' }}>*</span></label>
            <input name='name' onChange={(e) => setname(e.target.value)} placeholder='Name' />
            {clicked && name.length <= 0 ? <label style={{ color: 'red' }}>Repo name can't be Empty</label> : ''}
            <br />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Description<span style={{ color: 'red' }}>*</span></label>
            <input name='description' onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            {clicked && description.length <= 0 ? <label style={{ color: 'red' }}>Repo description can't be Empty</label> : ''}
            <br />
          </Form.Field>
          <Button type='submit' primary disabled={!name || !description}>Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default CreateRepo;
