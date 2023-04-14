import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createPM, updateUser } from '../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';


export default function UserUpdate() {
    const getUrl =  "https://cc0f-106-51-70-135.ngrok-free.app/api/users/role/user"

    let navigate= useNavigate();
    const {ID} = useParams();

    const dispatchUserUpdate = useDispatch();
    const[user,setUser]=useState('')
    const[item,setItem]=useState('')
  
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enumRole,setEnumRole]=useState('3');
  

    const sendDataToAPIUser = () => {
    dispatchUserUpdate(updateUser({id, name, email, enumRole}));

    const loaditem = async () => {
        const result = await axios.get(getUrl,{
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }}) .then((result) => {
  
          setItem(result.data);
          // console.log(res, "hello");
        })
        .catch((error)=>{
            console.log(error,'hi');
        })
      };
    navigate('/userRead')
    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    return(
    <Form>
        <Form.Field>
            <label>USER-ID</label>
            <input name='id'
            onChange={(e)=>setId(e.target.value)} 
            placeholder='USER-ID'
            />
        </Form.Field>

        <Form.Field>
            <label>USER-NAME</label>
            <input name='name' 
            onChange={(e)=>setName(e.target.value)}
            placeholder='User-Name' />
        </Form.Field>

        <Form.Field>
            <label>EMAIL</label>
            <input name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
        </Form.Field>

        <Form.Field>
            <label>Role</label>
            <input name='enumRole' onChange={(e)=>setEnumRole(3)} value="3" disabled/>
        </Form.Field>
    
        <Button type='submit' onClick={sendDataToAPIUser}>Submit</Button>

  </Form>
)
}


