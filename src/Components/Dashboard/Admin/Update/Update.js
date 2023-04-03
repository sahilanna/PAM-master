import React, {useState,useEffect} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Update() {

  let navigate = useNavigate();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const[ID, setID] = useState(null)

  const sendDataToAPI = (ID) => {
    axios.put(`https://6429847d5a40b82da4d494b2.mockapi.io/PAM/${ID}`, {ID,
        projectId, projectName, projectDesc
    }).then(() => {
        navigate('/Read')
    })
}






  // console.log(projectId);
  // console.log(projectName);

  // const sendDataToAPI = (event) => {
    // event.preventDefault()
    // const url="https://64267bccd24d7e0de470e2b7.mockapi.io/Crud";
  //  const data={projectId,projectName,projectDesc,returnSecureToken: true}
    // return axios.post(url,data)
    // axios.post('https://64267bccd24d7e0de470e2b7.mockapi.io/Crud', {projectId,
    // projectName,
    // projectDesc})
    // axios.put('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD/${ID}', {
        // projectId,
        // projectName,
        // projectDesc
    // })
    //  .then(response => { console.log(response.data); }) 
    //  .catch(error => { console.error(error); }); 

  useEffect(()=>
  {
    setProjectId(localStorage.getItem('projectId'));
    setProjectName(localStorage.getItem('projectName'));
    setProjectDesc(localStorage.getItem('projectDesc'));
    setID(localStorage.getItem('ID'))

  },[])
  
  return(

  <div>
  <Form>
    <Form.Field>
        <label>Project Id</label>
        <input name='ProjectId'
        value={projectId.projectId} onChange={(e)=>setProjectId(e.target.value)} placeholder='Project Id' />
    </Form.Field>

    <Form.Field>
      <label>Project-Name</label>
      <input name='ProjectName' 
       value={projectName.projectName} onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
    </Form.Field>

    <Form.Field>
      <label>Project-Description</label>
      <input name="projectDesc" value={projectDesc.projectDesc} onChange={(e)=>setProjectDesc(e.target.value)} placeholder='ProjectDescription' />
    </Form.Field>
    
    {/* <Form.Field> */}
      {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
    {/* </Form.Field> */}
    <Link to = '/AdminDashboard'>
    <Button type='submit' onClick={ () => sendDataToAPI()}>Update</Button>
    </Link>
  </Form>
  </div>
  )
}