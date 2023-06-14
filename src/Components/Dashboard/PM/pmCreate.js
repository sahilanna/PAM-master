import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createPM } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import NavBarP from './NavbarP';
// import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import '/home/nineleaps/Downloads/PAM-master-master/src/Components/Dashboard/Read/Read.css'
// import '/home/nineleaps/Downloads/PAM-master-master/src/Components/Dashboard/PM/PmCreate.css'



  function PmCreate(){

    let navigate= useNavigate();
    const dispatchPM = useDispatch();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [githubUsername, setgithubUsername] = useState('');
    const [email, setEmail] = useState('');
    const[enumRole,setEnumRole]=useState('2');
    const[error,setError]=useState('false');
    const [clicked, setClicked] = useState(false);
    
    const handleBack = () => {
      navigate(-1); // Go back one page in history
    };

    const handleSubmit=(e)=>{
      e.preventDefault();
      setClicked(true);
      if(name.length==0 || email.length==0){
        return;
    }
      dispatchPM(createPM({ name, email, enumRole}));
      navigate('/pmReadNew')
     
    }

    const onClose = ()=>{
      navigate(-1);
    }
  
    return(
      <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
      <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
      
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
 
  <Modal.Header>Add PM</Modal.Header>
  
  <Modal.Content>
  <Form onSubmit={handleSubmit}>

      <Form.Field>
          <label style={{ textAlign: 'left' }}>Project-Manager Name</label>
          <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='PM Name' />
          {clicked&&name.length<=0?
                 <label style={{color:'red'}}> Name can't be Empty</label>: ""}
      </Form.Field>
      <Form.Field>
          <label style={{ textAlign: 'left' }}>Email-ID</label>
          <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
          {clicked&&email.length<=0?
                 <label style={{color:'red'}}> Email can't be Empty</label>: ""}
      </Form.Field>
      {/* <Form.Field>
          <label style={{ textAlign: 'left' }}>PM UserName</label>
          <input type='text' name='githubUsername' onChange={(e)=>setgithubUsername(e.target.value)} placeholder='PM UserName' />
          {clicked&&githubUsername.length<=0?
                 <label style={{color:'red'}}> PM UserName can't be Empty</label>: ""}
      </Form.Field> */}
     
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
    
    </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
  )
  }
  export default PmCreate;
