import React, {useState,useEffect} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';


export default function Update() {


  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const[ID, setID] = useState(null)

  console.log(projectId);
  console.log(projectName);

  const sendDataToAPI = (event) => {
    event.preventDefault()
    // const url="https://64267bccd24d7e0de470e2b7.mockapi.io/Crud";
   const data={projectId,projectName,projectDesc,returnSecureToken: true}
    // return axios.post(url,data)
    // axios.post('https://64267bccd24d7e0de470e2b7.mockapi.io/Crud', {projectId,
    // projectName,
    // projectDesc})
    axios.put('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD/${ID}', {
        projectId,
        projectName,
        projectDesc
    })
    //  .then(response => { console.log(response.data); }) 
    //  .catch(error => { console.error(error); }); 
  }

  useEffect(()=>
  {
    setProjectId(localStorage.getItem('projectId'));
    setProjectName(localStorage.getItem('projectName'));
    setProjectDesc(localStorage.getItem('projectDesc'));
    setID(localStorage.getItem('ID'))

  },[])
  
  return(
<Form>
    <Form.Field>
        <label>Project-Id</label>
        <input name='ProjectId'
        value={projectId} onChange={(e)=>setProjectId(e.target.value)} placeholder='ProjectId' />
    </Form.Field>

    <Form.Field>
      <label>Project-Name</label>
      <input name='ProjectName' 
       value={projectName} onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
    </Form.Field>

    <Form.Field>
      <label>Project-Description</label>
      <input value={projectDesc} name='ProjectDesc' onChange={(e)=>setProjectDesc(e.target.value)} placeholder='ProjectDescription' />
    </Form.Field>
    
    {/* <Form.Field> */}
      {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
    {/* </Form.Field> */}
    <Button type='submit' onClick={sendDataToAPI}>Update</Button>
  </Form>
)
}