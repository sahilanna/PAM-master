import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
// import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBarA from '../NavbarA';
// import './Create.css';
import FooterA from '../FooterA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { gitAccessToken, ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import api from '../../api';

function CreateRepo() {
  const navigate = useNavigate();
  let [name, setname] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('false');
  const [clicked, setClicked] = useState(false);
  let [description, setDescription] = useState('');
  const token = gitAccessToken;

  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };

  let handleSubmit = (e) => {
    if (!name || !description) {
      return;
    }
    e.preventDefault();
    setClicked(true);
    if (name.length === 0) {
      return;
    }
    if (name) {
      // const response = axios.post(`https://${ngrokUrl}/api/repositories/add`, { name });
      const response = api.post(`https://${ngrokUrl}/api/repositories/add`, { name, description });
      console.log(name);
      navigate('/repoRead');
    }
  };

  const onClose = () => {
    navigate(-1);
  }

  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}>
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
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
