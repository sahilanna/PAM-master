import React, {useState, useEffect} from 'react'
import { Form} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import NavBarA from '../Admin/NavbarA';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '/home/nineleaps/Downloads/PAM-master-master/src/Components/Dashboard/PM/PmCreate.css'
  
function UserCreate(){
  let navigate=useNavigate();
  const dispatchUser = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[enumRole,setEnumRole] = useState('3');
  const [error,setError]=useState('false');
  const [githubUsername, setgithubUsername] = useState('');
  const[tools,settools]=useState('');
  const[clicked,setClicked]= useState(false);

  const handleBack = () =>{
    navigate(-1);
  }
 const handleSubmit=(e)=>{
    e.preventDefault();
    setClicked(true);
    if(name.length==0 || email.length==0 ){
      return;
  }
 
   dispatchUser(createUser({name, email, enumRole}));
    navigate('/userRead')
  
  }
return(
  <div>
  <NavBarA />
  <div >
<div className='form-dis'>
<Form className = 'form-style' onSubmit={handleSubmit}>
 <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
         <div className='backandheader'>
        


  <h1>Add User</h1>
  </div>
    {/* <Form.Field>
          <label style={{ textAlign: 'left' }}>USER ID</label>
          <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='PM Id' />
          {clicked&&id.length<=0?
                 <label style={{color:'red'}}> ID can't be Empty</label>: ""}
    </Form.Field> */}
    <Form.Field>
        <label style={{ textAlign: 'left' }}> User Name</label>
        <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='User Name' />
        {clicked&&name.length<=0?
               <label style={{color:'red'}}> Name can't be Empty</label>: ""}
    </Form.Field>
    <Form.Field>
        <label style={{ textAlign: 'left' }}>User Email-ID</label>
        <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
        {clicked&&email.length<=0?
               <label style={{color:'red'}}>  Email can't be Empty</label>: ""}
    </Form.Field>
    {/* <Form.Field>
          <label style={{ textAlign: 'left' }}>User's Github Name</label>
          <input type='text' name='githubUsername' onChange={(e)=>setgithubUsername(e.target.value)} placeholder='User Github githubUsername' />
          {clicked&&githubUsername.length<=0?
                 <label style={{color:'red'}}> User's githubname can't be Empty</label>: ""}
    </Form.Field> */}

   
    <Button type='submit' onClick={handleSubmit}>Submit</Button>
  </Form>
  
  </div>
  </div>
  </div>
)
}
export default UserCreate;