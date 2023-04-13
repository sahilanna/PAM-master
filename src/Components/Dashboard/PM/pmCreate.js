import React, {useState, useEffect} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createPM } from '../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';


  function PmCreate(){

  let navigate= useNavigate();
  const dispatchPM = useDispatch();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[enumRole,setEnumRole]=useState('2');


   const sendDataToAPI = () => {
    dispatchPM(createPM({id, name, email, enumRole}));
    navigate('/pmRead')
  }
  // const sendDataToAPI = () => {
  //   axios.post(`https://cc0f-106-51-70-135.ngrok-free.app/api/users/`, {
  //       id,
  //       name,
  //     email,
  //     enumRole
      
  //   }).then(() => {
  //     navigate('/pmRead')
  //   })
  // }


  return(
<Form>
<Form.Field>
        <label>Project-Manager ID</label>
        <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='PM Id' />
    </Form.Field>
    <Form.Field>
        <label>Project-Manager Name</label>
        <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='PM Name' />
    </Form.Field>
    <Form.Field>
        <label>Email-ID</label>
        <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
    </Form.Field>
    <Form.Field>
        <label>Role</label>
        <input name='enumRole' onChange={(e)=>setEnumRole(2)} value="2" disabled/>
        {/* <input type="text" name="name" value="2" disabled></input> */}
    </Form.Field>
    
    <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
  </Form>
)
}

export default PmCreate;