import React, {useEffect, useState} from 'react'
import { Form} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createPM, updatePM } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NavBarP from './NavbarP';

export default function PmUpdate() {
  const getUrl =  "https://3a5e-106-51-70-135.ngrok-free.app/api/users/role/project_manager"

  
  let navigate= useNavigate();
  const {ID} = useParams();

  const dispatchPMUpdate = useDispatch();
  const[user,setUser]=useState('')
  const[item,setItem]=useState('')
  
  // const project = useSelector(state => state.createReducer);//Allows u to extract data from Redux store state.
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[githubUsername, setGithubUsername]=useState('');
  const [enumRole,setEnumRole]=useState('2');

  const params = useParams();

  // useEffect(() => {
  //   loaditem();
  // },[])
  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };

  const sendDataToAPIPM = () => {
    dispatchPMUpdate(updatePM({id, name, email, githubUsername, enumRole}));

    const loaditem = async () => {
      const result = await axios.get(`https://3a5e-106-51-70-135.ngrok-free.app/api/users/role/project_manager/${params.id}`,{
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }}).then((result) => {
          console(result.name);
          setName(result.name);
          setEmail(result.email);
          setGithubUsername(result.gitbubUsername);
          // setItem(result.data);
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
    <div>
      <NavBarP />
      <div>
      <div className = "form-dis">
      <Form className='form-style'>
      <h1>Update PM</h1>
      <Form.Field>
        <label>PM-ID</label>
        <input name='id'
         onChange={(e)=>setId(e.target.value)} 
         placeholder='PM-ID'
         />
      </Form.Field>

      <Form.Field>
        <label>PM-Name</label>
        <input name='name'
        value = {name} 
        onChange={(e)=>setName(e.target.value)}
       />
      </Form.Field>

      <Form.Field>
        <label>Email</label>
        <input name='email' value = {email} onChange={(e)=>setEmail(e.target.value)} />
      </Form.Field>

      <Form.Field>
        <label>PM Github Username</label>
        <input name='githubUsername' value = {githubUsername} onChange={(e)=>setGithubUsername(e.target.value)} />
      </Form.Field>

      <Form.Field>
        <label>Role</label>
        <input name='enumRole' onChange={(e)=>setEnumRole(2)} value="2" disabled/>
        {/* <input type="text" name="name" value="2" disabled></input> */}
    </Form.Field>
    
      <Button type='submit' variant='primary' onClick={sendDataToAPIPM}>Submit</Button>

  </Form>
  <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button> 
        </div>
        </div>
        </div>
  
)
}


