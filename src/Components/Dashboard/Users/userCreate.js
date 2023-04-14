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
   const sendDataToAPI = () => {
    dispatchUser(createUser({id, name, email, enumRole}));
    navigate('/userRead')
  }
 
return(
<Form>
<Form.Field>
        <label>User ID</label>
        <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='User Id' />
    </Form.Field>
    <Form.Field>
        <label>User Name</label>
        <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='User Name' />
    </Form.Field>
    <Form.Field>
        <label>User Email-ID</label>
        <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
    </Form.Field>
    <Form.Field>
        <label>Role</label>
        <input name='enumRole' onChange={(e)=>setEnumRole(3)} value="3" disabled/>
    </Form.Field>
    <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
  </Form>
)
}

export default UserCreate;
