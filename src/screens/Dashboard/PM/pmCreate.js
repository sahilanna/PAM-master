import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { createPM } from '../../../redux/redux-store/actions/action';
import { useDispatch } from 'react-redux';

function PmCreate() {
  let navigate = useNavigate();
  const dispatchPM = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const enumRole = 2;
  const [clicked, setClicked] = useState(false);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true);
    if (name.length === 0 || email.length === 0) {
      return;
    }
    dispatchPM(createPM({ name, email, enumRole }));
    navigate('/pmReadNew');
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>X</Button>
      </div>

      <Modal.Header>Add PM</Modal.Header>

      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>
              Project-Manager Name<span style={{ color: 'red' }}>*</span>
            </label>
            <input name='name' onChange={(e) => setName(e.target.value)} placeholder='PM Name' />
            {clicked && name.length <= 0 ? <label style={{ color: 'red' }}> Name can't be Empty</label> : ''}
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>
              Email-ID<span style={{ color: 'red' }}>*</span>
            </label>
            <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} placeholder='EMAIL' />
            {clicked && email.length <= 0 ? <label style={{ color: 'red' }}> Email can't be Empty</label> : ''}
          </Form.Field>
         

          <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Content>

      <Modal.Actions></Modal.Actions>
    </Modal> 
  );
}

export default PmCreate;

