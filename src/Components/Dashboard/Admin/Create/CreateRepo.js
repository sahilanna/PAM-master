import React, { useState } from 'react'
import { Form} from 'semantic-ui-react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreateRepo() {
  const navigate=useNavigate();

    let[name,setname]=useState('');
    const [isValid, setIsValid] = useState(true);
    const [error,setError]=useState('false');
    const token = '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'
    
    let handleSubmit=(e)=>{

      const description='i am sweda'
      e.preventDefault();
      if(name.length===0){
        setError(true)
      }
      if(name){
      const response= axios.post('https://b1de-106-51-70-135.ngrok-free.app/api/repositories/add',{name
      })
      console.log(name);
      navigate('/AdminDashboard')  
    }}


    return (
      <div>
        <h1>Create new Repository</h1>
      
        <div className='form-display'>
          <Form className='form-style'>
          <br/>
          <Form.Field>
          <label>Name</label>
          <br/>
          <input name='name' onChange={(e)=>setname(e.target.value)} placeholder='name' />   
          {error&&name.length<=0?
               <label style={{color:'red'}}>Repo name can't be Empty</label>: ""} 
          <br/> 
          </Form.Field>
          <br/>
          <Button onClick={handleSubmit} variant='primary'>Submit</Button>
          
          </Form>
          </div>

        </div>
    )
}


export default CreateRepo;
