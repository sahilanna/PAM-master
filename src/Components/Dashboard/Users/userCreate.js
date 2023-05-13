import React, {useState, useEffect} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
  
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

  const handleBack = () =>{
    navigate(-1);
  }
 const handleSubmit=(e)=>{
    e.preventDefault();
    if(name.length==0 || email.length==0 || githubUsername.length==0){
      setError(true)
  }
  if(name && email)
  {
   dispatchUser(createUser({id,name, email, githubUsername, enumRole}));
    navigate('/userRead')
  }
  }
return(
<div className='form-display'>
<Form className = 'form-style' onSubmit={handleSubmit}>
  <h1>Add User</h1>
    <Form.Field>
          <label>USER ID</label>
          <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='PM Id' />
          {error&&id.length<=0?
                 <label style={{color:'red'}}> ID can't be Empty</label>: ""}
    </Form.Field>
    <Form.Field>
        <label>User Name</label>
        <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='User Name' />
        {error&&name.length<=0?
               <label style={{color:'red'}}> Name can't be Empty</label>: ""}
    </Form.Field>
    <Form.Field>
        <label>User Email-ID</label>
        <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
        {error&&email.length<=0?
               <label style={{color:'red'}}>  Email can't be Empty</label>: ""}
    </Form.Field>
    <Form.Field>
          <label>User's Github Name</label>
          <input type='text' name='githubUsername' onChange={(e)=>setgithubUsername(e.target.value)} placeholder='User Github githubUsername' />
          {error&&githubUsername.length<=0?
                 <label style={{color:'red'}}> User's githubname can't be Empty</label>: ""}
    </Form.Field>

    <Form.Field>
        <label>Role</label>
        <input name='enumRole' onChange={(e)=>setEnumRole(3)} value="3" disabled/>
    </Form.Field>
    <Button type='submit' onClick={handleSubmit}>Submit</Button>
  </Form>
  <Button className = 'back-button' onClick={handleBack}> Back </Button>
  </div>
)
}
export default UserCreate;