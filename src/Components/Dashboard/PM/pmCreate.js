import React, {useState, useEffect} from 'react'
import { Form} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createPM } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import NavBarP from './NavbarP';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//import '../Read/Read.css'



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
      dispatchPM(createPM({id, name, email, enumRole}));
      navigate('/pmReadNew')
     
    }
  
    return(
      <div>
      <NavBarP />
      <div>
  <div className = "form-dis">
  <Form className='form-style' onSubmit={handleSubmit}>
      <h1>Add PM</h1>
      <Form.Field>
          <label style={{ textAlign: 'left' }}>Project-Manager ID</label>
          <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='PM Id' />
          {clicked&&id.length<=0?
                 <label style={{color:'red'}}> ID can't be Empty</label>: ""}
      </Form.Field>
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
      <Form.Field>
          <label style={{ textAlign: 'left' }}>Role</label>
          <input name='enumRole' onChange={(e)=>setEnumRole(2)} value="2" disabled/>
          {/* <input type="text" name="name" value="2" disabled></input> */}
      </Form.Field>
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
    <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button> 
    </div>
    </div>
    </div>
  )
  }
  export default PmCreate;
