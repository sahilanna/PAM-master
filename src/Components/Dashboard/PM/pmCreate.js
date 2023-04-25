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
    const[error,setError]=useState('false');
   const handleSubmit=(e)=>{
      e.preventDefault();
      if(id.length==0 ||name.length==0 || email.length==0){
        setError(true)
    }
    if(id && name && email)
    {
      dispatchPM(createPM({id, name, email, enumRole}));
      navigate('/pmRead')
    }
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
  <Form onSubmit={handleSubmit}>
  <Form.Field>
          <label>Project-Manager ID</label>
          <input name='id' onChange={(e)=>setId(e.target.value)} placeholder='PM Id' />
          {error&&id.length<=0?
                 <label style={{color:'red'}}> ID can't be Empty</label>: ""}
      </Form.Field>
      <Form.Field>
          <label>Project-Manager Name</label>
          <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='PM Name' />
          {error&&name.length<=0?
                 <label style={{color:'red'}}> Name can't be Empty</label>: ""}
      </Form.Field>
      <Form.Field>
          <label>Email-ID</label>
          <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
          {error&&email.length<=0?
                 <label style={{color:'red'}}> Email can't be Empty</label>: ""}
      </Form.Field>
      <Form.Field>
          <label>Role</label>
          <input name='enumRole' onChange={(e)=>setEnumRole(2)} value="2" disabled/>
          {/* <input type="text" name="name" value="2" disabled></input> */}
      </Form.Field>
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
  )
  }
  export default PmCreate;
