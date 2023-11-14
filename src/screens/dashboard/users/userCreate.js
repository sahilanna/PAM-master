import React, {useState} from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../redux/reduxStore/actions/action';
import { useDispatch } from 'react-redux';

  
function UserCreate() {
  let navigate=useNavigate();
  const dispatchUser = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const enumRole = 3;
 
  const[clicked,setClicked]= useState(false);

 const handleSubmit=(e)=>{
    e.preventDefault();
    setClicked(true);
    if(name.length===0 || email.length===0 ){
      return;
  }
 
   dispatchUser(createUser({name, email, enumRole}));
    navigate('/userRead')
  
  }

  const onClose =()=>{
    navigate(-1);
  }
   
return(
   <Modal open={true} onClose={onClose}  style={{ width: '500px' }} className='form-modal'>
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
        <label data-testid='User' style={{ textAlign: 'left' }}> User Name<span style={{ color: 'red' }}>*</span></label>
        <input data-testid='User-Input' name='name' onChange={(e)=>setName(e.target.value)} placeholder='User Name' />
        {clicked&&name.length<=0?
               <label style={{color:'red'}}> Name can't be Empty</label>: ""}
    </Form.Field>
    <Form.Field>
        <label data-testid='Email' style={{ textAlign: 'left' }}>User Email-ID<span style={{ color: 'red' }}>*</span></label>
        <input data-testid='Email-ID' type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='EMAIL' />
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