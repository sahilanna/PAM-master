import React, {useState, useEffect} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
  
function UserCreate(){
  const navigate=useNavigate();
  const dispatchUser = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[enumRole,setEnumRole] = useState('3');
  const [error,setError]=useState('false');
  const[tools,settools]=useState('');
 const handleSubmit=(e)=>{
    e.preventDefault();
    if(id.length==0 || name.length==0 || email.length==0||tools.length==0){
      setError(true)
  }
  if(id && name && email)
  {
   dispatchUser(createUser({id, name, email, enumRole}));
    navigate('/userRead')
  }
  }
return(
<Form onSubmit={handleSubmit}>
<Form.Field>
        <label>User ID</label>
        <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='User Id' />
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
        <label>Role</label>
        <input name='enumRole' onChange={(e)=>setEnumRole(3)} value="USER" disabled/>
    </Form.Field>
    <Form.Field>
        <label>Tools</label>
        <select>
          <option value='github'>gitHub</option>
          <opion>JIRA</opion>
          {error&&tools.length<=0?
               <label style={{color:'red'}}> Tools can't be Empty</label>: ""}
        </select>
        {/* <input name='enumRole' onChange={(e)=>setEnumRole(3)} value="3" disabled/> */}
    </Form.Field>
    <Button type='submit' onClick={handleSubmit}>Submit</Button>
  </Form>
)
}
export default UserCreate;