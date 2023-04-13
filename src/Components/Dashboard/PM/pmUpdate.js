import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject } from '../../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import { updatePM } from '../../../redux-store/actions/action';

export default function PmUpdate() {
  const getUrl =  "https://cc0f-106-51-70-135.ngrok-free.app/api/users/role/project_manager"

  
  let navigate= useNavigate();
  const {ID} = useParams();

  const dispatchPMUpdate = useDispatch();
  const[user,setUser]=useState('')
  const[item,setItem]=useState('')
  
  // const project = useSelector(state => state.createReducer);//Allows u to extract data from Redux store state.
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  


  const sendDataToAPIPM = () => {
    dispatchPMUpdate(updatePM({id, name, email}));

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
    navigate('/pmRead')
  }
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  return(
  <Form>
      <Form.Field>
        <label>PM-ID</label>
        <input name='id'
         onChange={(e)=>setId(e.target.value)} 
         placeholder='id'
         />
      </Form.Field>

      <Form.Field>
        <label>PM-Name</label>
        <input name='name' 
        onChange={(e)=>setName(e.target.value)}
         placeholder='PM-Name' />
      </Form.Field>

      <Form.Field>
        <label>Email</label>
        <input name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
      </Form.Field>
    
      <Button type='submit' onClick={sendDataToAPIPM}>Submit</Button>

  </Form>
)
}



