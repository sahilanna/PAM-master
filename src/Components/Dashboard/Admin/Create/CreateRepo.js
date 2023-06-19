import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBarA from '../NavbarA';
import './Create.css';
import FooterA from '../FooterA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';


function CreateRepo() {
  const navigate = useNavigate();

  let [name, setname] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('false');
  const [clicked, setClicked] = useState(false);
  let[description, setDescription]=useState('')
  const token = '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';

  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };

  let handleSubmit = (e) => {
   // const description = 'i am sweda';
    e.preventDefault();
    setClicked(true);
    if (name.length === 0) {
      return;
    }
    if (name) {
      //  const response = axios.post(`https://${ngrokUrl}/api/repositories/add`, { name });
      const response=axios.post(`https://${ngrokUrlSwe}/api/repositories/add`,{name,description})
      console.log(name);
      navigate('/repoRead');
    }
  };

  return (
    <div>
    <div>
    <NavBarA />
    <div>
      <Form className='form-style' onSubmit={handleSubmit}>
        <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <h1>Create Project</h1>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Name</label>
            <input name='name' onChange={(e) => setname(e.target.value)} placeholder='Name' />
            {clicked && name.length <= 0 ? <label style={{ color: 'red' }}>Repo name can't be Empty</label> : ''}
            <br />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Description</label>
            <input name='description' onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            {clicked && description.length <= 0 ? <label style={{ color: 'red' }}>Repo descrio can't be Empty</label> : ''}
            <br />
          </Form.Field>
          <br />
          <Button onClick={handleSubmit} variant='primary'>
            Submit
          </Button>
        </Form>
        
      </div>
    </div>
   
    </div>
    
    
  );
}

export default CreateRepo;
