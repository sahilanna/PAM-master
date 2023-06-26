import React, { useState, useEffect } from 'react';
import { Form, Dropdown, Button, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ngrokUrlSwe } from '../../../Assets/config';
import './Read.css'


function AddUserName() {
    const navigate=useNavigate()
    const [users,setUsers]=useState([])
    const[githubUsername, setgithubUsername]=useState('')
    const handleSubmit=()=>{

    }
    const handleBack = () => {
        navigate(-1); // Go back one page in history
      };



  return (
    <div> <NavBarA/><div>
    <div className='form-dis'> 
        <Form lassName='form-style' onSubmit={handleSubmit}>
        <Button className="back-button" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
        <div className='backandheader'>
    <Form.Field>
          <label style={{textAlign:'left'}}>Users</label>
          <Dropdown
            placeholder="Select User"
            fluid
            selection
            options={users.map((name, index) => ({
              key: index,
              text: name,
              value: name
            }))}
            // value={}
            //  onChange={}
          />
          </Form.Field>
          <br/>
      <Form.Field>
        <label style={{textAlign:'left'}}>github Username</label>
        <input
          placeholder="Enter github username"
          value={githubUsername}
          onChange={(e) => setgithubUsername(e.target.value)}
        />
      </Form.Field>
      <Button primary type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </div>
    </Form>
    </div>
    </div>
    </div>
  )
}



*/