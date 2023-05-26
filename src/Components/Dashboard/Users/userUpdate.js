import React, {useEffect, useState} from 'react'
import { Form} from 'semantic-ui-react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import UserRead from './userRead';
import NavBarP from '../PM/NavbarP';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl } from '../../../Assets/config';


export default function UserUpdate() {
    const getUrl =  `https://${ngrokUrl}/api/users/role/3`

    let navigate= useNavigate();
    const {ID} = useParams();

    const dispatchUserUpdate = useDispatch();
    const[user,setUser]=useState('')
    const[item,setItem]=useState('')
  
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[githubUsername, setGithubUsername]=useState('');
    const [enumRole,setEnumRole]=useState('3');

    const handleBack = () => {
        navigate(-1); // Go back one page in history
      };
    
  

    const sendDataToAPIUser = () => {
    dispatchUserUpdate(updateUser({id, name, email, enumRole}));

    const loaditem = async () => {
        const result = await axios.get(getUrl,{
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }}) .then((result) => {
  
          setItem(result.data);
          setName(result.name);
          setEmail(result.email);
          
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
        <div>
      <NavBarP />
      <div>
      <div className = "form-dis">
      <Form className='form-style'>
      <h1>Update USER</h1>
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

        {/* <Form.Field>
        <label>User Github Username</label>
        <input name='githubUsername' value = {githubUsername} onChange={(e)=>setGithubUsername(e.target.value)} />
      </Form.Field> */}

        <Form.Field>
            <label>Role</label>
            <input name='enumRole' onChange={(e)=>setEnumRole(3)} value="3" disabled/>
        </Form.Field>
    
        <Button type='submit' variant='primary' onClick={sendDataToAPIUser}>Submit</Button>

  </Form>
  <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button> 
        </div>
        </div>
        </div>
)
}


