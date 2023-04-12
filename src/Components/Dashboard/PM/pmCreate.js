import React, {useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 function PmCreate(){
let navigate= useNavigate();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[enumRole,setEnumRole]=useState('2');
  const sendDataToAPI = () => {
    axios.post(`https://6429847d5a40b82da4d494b2.mockapi.io/PM`, {
        id,
        name,
      email,
      enumRole
      
    }).then(() => {
      navigate('/pmRead')
    })
  }
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
    <label>Role : Project Manager </label>
    </Form.Field>
      
     
    {/* <Form.Field> */}
      {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
    {/* </Form.Field> */}
    <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
  </Form>
)
}

export default PmCreate;