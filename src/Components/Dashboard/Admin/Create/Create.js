import React, {useEffect, useState} from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import Read from '../Read/Read';
import PmCreate from '../../PM/pmCreate'; 
<<<<<<< HEAD
import './Create.css'
import AddPm from './addPm';
import AddUser from './addUser';
import { Button } from 'react-bootstrap';
import NavBarA from '../NavbarA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
=======
import '../Read/Read.css'
import AddPm from './addPm';
import AddUser from './addUser';
import { Button } from 'react-bootstrap';
import NavBarA from '../NavbarA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Create.css'

const Create = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectManagerId, setProjectManagerId] = useState('')
  const[userIds,setUserIds]=useState('');
  const [error,setError]=useState('false');
  const[file,setFile]=useState('');
  const[gitRepoLink,setGitRepoLink]=useState('');
  const[repo,setrepo]=useState('');
  const[userName,setUserName]=useState('');
  const [isValid, setIsValid] = useState(true);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState('');
  const[clicked,setClicked]= useState(false);



  
  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };
  useEffect(() => {
    fetch(`https://3a5e-106-51-70-135.ngrok-free.app/api/repositories/get`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }}).then((response)=>response.json())
    .then((data)=>setOptions(data))
  }, []);
  const handleSubmit=(e)=>{
    e.preventDefault();
    setClicked(true);
    if(projectName.length===0 || projectDescription.length===0 || options.length === 0){
      return;
  }
  if(projectName && projectDescription && options)
  {
    console.log(projectId)
    // dispatch(createProject({projectName, projectDescription, options}));
   // navigate('/addUser', { state: { projectName, repo } });
    navigate('/addPm', { state: { projectName, repo, projectDescription} });
  }
  }
  return(
    <div>
      <NavBarA/>
  <div  >
  <Form className='form-style' onSubmit={handleSubmit}>
      <h1><Button className="back-button" onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} /> </Button>Create Project</h1>
      <Form.Field>
        <label style={{ textAlign: 'left' }}>Project-Name</label>
        <input name='projectName' onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
        {clicked&&projectName.length<=0?
               <label style={{color:'red'}}>Project ID can't be Empty</label>: ""}
      </Form.Field>
      <Form.Field>
        <label style={{ textAlign: 'left' }}>Project-Description</label>
        <input name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
        {clicked&&projectDescription.length<=0?
               <label style={{color:'red'}}>Project Description can't be Empty</label>: ""}
      </Form.Field>
      <Form.Field>
          <label style={{ textAlign: 'left' }}>REPO</label>
          <select onChange={(e) => setrepo(e.target.value)}>
            {options.map((item, index) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </Form.Field>
      <Button type='submit' variant='primary' onClick={handleSubmit}>Next</Button>
  </Form>
  </div>
  </div>
)
}
export default Create;

