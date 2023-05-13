import React, { useState } from 'react'
import { Form} from 'semantic-ui-react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import './Create.css'

function CreateRepo() {
  const navigate=useNavigate();

    let[name,setname]=useState('');
    const [isValid, setIsValid] = useState(true);
    const [error,setError]=useState('false');
    const[clicked,setClicked]= useState(false);
    const token = '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'

      
  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };

    
    let handleSubmit=(e)=>{

      const description='i am sweda'
      e.preventDefault();
      setClicked(true);
      if(name.length===0){
        return;
      }
      if(name){
      const response= axios.post('https://118b-106-51-70-135.ngrok-free.app/api/repositories/add',{name
      })
      console.log(name);
      navigate('/AdminDashboard')  
    }}


    return (
      <div>
        
        <h1>Create new Repository</h1>
      
        <div className='form-display'>
        <Button className="back-button" onClick={handleBack}>Back</Button>

          <Form className='form-style'>
            
          <br/>
          <Form.Field>
          <label style={{ textAlign: 'left' }}>Name</label>
          <br/>
          <input name='name' onChange={(e)=>setname(e.target.value)} placeholder='name' />   
          {clicked&&name.length<=0?
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