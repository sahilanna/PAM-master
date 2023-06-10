
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
  const token = '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';

  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };

  let handleSubmit = (e) => {
    const description = 'i am sweda';
    e.preventDefault();
    setClicked(true);
    if (name.length === 0) {
      return;
    }
    if (name) {
      //  const response = axios.post(`https://${ngrokUrl}/api/repositories/add`, { name });
      const response=axios.post(`https://${ngrokUrlSwe}/api/repositories/add`,{name})
      console.log(name);
      navigate('/Create');
    }
  };

  return (
    <div>
      <NavBarA />
      <div>
        <div className='form-dis'>
          <div>
                    <Button className="back-button" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              </div>
          
        <Form className='form-style'>
        <h1 style={{ textAlign: 'left' }}>Create New Repository</h1>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Name</label>
            <input name='name' onChange={(e) => setname(e.target.value)} placeholder='Name' />
            {clicked && name.length <= 0 ? <label style={{ color: 'red' }}>Repo name can't be Empty</label> : ''}
            <br />
          </Form.Field>
          <br />
          <Button onClick={handleSubmit} variant='primary'>
            Submit
          </Button>
        </Form>
        
      </div>
    </div>
    {/* <div><FooterA/></div> */}
    </div>
    
    
  );
}

export default CreateRepo;
