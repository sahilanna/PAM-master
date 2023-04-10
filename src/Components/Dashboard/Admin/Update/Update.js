import React, {useState,useEffect} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { updateProject } from '../../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';


export default function Update() {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const[ID, setID] = useState(null)

  const sendDataToAPI = ({projectId, projectName, projectDescription}) => {

    dispatch(updateProject({projectId, projectName, projectDescription}));
    navigate('/Read')
    // axios.put(`https://6429847d5a40b82da4d494b2.mockapi.io/PAM/${ID}`, {ID,
    //     projectId, projectName, projectDesc
    // }).then(() => {
    //     navigate('/Read')
    // })
}


  useEffect(()=>
  {
    setProjectId(localStorage.getItem('projectId'));
    setProjectName(localStorage.getItem('projectName'));
    setProjectDescription(localStorage.getItem('projectDescription'));
    setID(localStorage.getItem('ID'))

  },[])
  
  return(

  <div>
  <Form>
    <Form.Field>
        <label>Project Id</label>
        <input name='projectId'
        value={projectId.projectId} onChange={(e)=>setProjectId(e.target.value)} placeholder='Project Id' />
    </Form.Field>

    <Form.Field>
      <label>Project-Name</label>
      <input name='projectName' 
       value={projectName.projectName} onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
    </Form.Field>

    <Form.Field>
      <label>Project-Description</label>
      <input name="projectDescription" value={projectDescription.projectDescription} onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
    </Form.Field>
    
    <Link to = '/AdminDashboard'>
    <Button type='submit' onClick={ () => sendDataToAPI()}>Update</Button>
    </Link>
  </Form>
  </div>
  )
}