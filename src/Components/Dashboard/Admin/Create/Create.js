import React, {useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';

export default function Create() {

  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  console.log(projectId);
  console.log(projectName);

  const sendDataToAPI = (event) => {
    event.preventDefault()
    const data={projectId,projectName,projectDesc,returnSecureToken: true}
    // return axios.post(url,data)
    // axios.post('https://64267bccd24d7e0de470e2b7.mockapi.io/Crud', {projectId,
    // projectName,
    // projectDesc})
    axios.post('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD', data)
     .then(response => { console.log(response.data); }) 
     .catch(error => { console.error(error); }); 

  }
  
  return(
  <Form>
      <Form.Field>
        <label>Project-Id</label>
        <input name='ProjectId' onChange={(e)=>setProjectId(e.target.value)} placeholder='ProjectId' />
      </Form.Field>

      <Form.Field>
        <label>Project-Name</label>
        <input name='ProjectName' onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
      </Form.Field>

      <Form.Field>
        <label>Project-Description</label>
        <input name='ProjectName' onChange={(e)=>setProjectDesc(e.target.value)} placeholder='ProjectDescription' />
      </Form.Field>
    
      <Button type='submit' onClick={sendDataToAPI}>Submit</Button>

  </Form>
)
}



