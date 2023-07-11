import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Dropdown, Input} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import NavBarA from '../Admin/NavbarA';
// import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import '/home/nineleaps/Downloads/PAM-master-master/src/Components/Dashboard/PM/PmCreate.css'
  
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
  const[clicked,setClicked]= useState(false);

  const handleBack = () =>{
    navigate(-1);
  }
 const handleSubmit=(e)=>{
    e.preventDefault();
    setClicked(true);
    if(name.length==0 || email.length==0 ){
      return;
  }
 
   dispatchUser(createUser({name, email, enumRole}));
    navigate('/userRead')
  
  }

  const onClose =()=>{
    navigate(-1);
  }
   
return(
   <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
      
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add User</Modal.Header>

   
  
          <Modal.Content>

          <Form onSubmit={handleSubmit}>
    <Form.Field>
        <label style={{ textAlign: 'left' }}> User Name<span style={{ color: 'red' }}>*</span></label>
        <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='User Name' />
        {clicked&&name.length<=0?
               <label style={{color:'red'}}> Name can't be Empty</label>: ""}
    </Form.Field>
    <Form.Field>
        <label style={{ textAlign: 'left' }}>User Email-ID<span style={{ color: 'red' }}>*</span></label>
        <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
        {clicked&&email.length<=0?
               <label style={{color:'red'}}>  Email can't be Empty</label>: ""}
    </Form.Field>
  
  
          <Button type='submit'>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
)
}
export default UserCreate;