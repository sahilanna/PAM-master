import React, {useEffect, useState} from 'react'
import { Form } from 'semantic-ui-react'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject } from '../../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import NavBarP from '../../PM/NavbarP';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Update() {
  // const getUrl =  "https://f0a1-106-51-70-135.ngrok-free.app/api/projects/allProjects"
  const getUrl =  "https://64267bccd24d7e0de470e2b7.mockapi.io/Crud"

  
  let navigate= useNavigate();
  const {id} = useParams();
  
  const dispatchU = useDispatch();
  const[user,setUser]=useState('');
  const[item,setItem]=useState('')
  const [pmList, setPmList] = useState([{'name':'','id':''}])
  const [selectedOption, setSelectedOption] = useState('');
  const [error,setError]=useState('false');
  const[file,setFile]=useState('');
  const[repo,setRepo]=useState('')
  
  // const project = useSelector(state => state.createReducer);//Allows u to extract data from Redux store state.
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const params = useParams();
  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };
  
  // useEffect(() => {
  //   getDetails();
  // },[]);

  // const getDetails = async() => {
  //   let result = await fetch(`https://64267bccd24d7e0de470e2b7.mockapi.io/Crud/${params.id}`);
  //   result = await result.json();
  //   setProjectName(result.projectName);
  //   setProjectDescription(result.projectDescription);
    
  // }


  function handleDropdownChange(event) {
    setSelectedOption(event.target.value);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const sendDataToAPIu = () => {
    
    dispatchU(updateProject({projectId, projectName, projectDescription, repo}));

    const loaditem = async () => {
      const result = await axios.get(`https://64267bccd24d7e0de470e2b7.mockapi.io/Crud/${params.id}`,{
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }}) .then((result) => {
          
            setProjectName(result.projectName);
            setProjectDescription(result.projectDescription);
          setItem(result.data);
          
          // console.log(res, "hello");
        })
        .catch((error)=>{
          console.log(error,'hi');
        })
      };
    navigate('/Read')
  };

  // useEffect(() => {
  //   loadUser();
  // }, []);

  // const loadUser = async () => {
  //   const result = await axios.get(`https://cc0f-106-51-70-135.ngrok-free.app/api/projects/allProjects`);
  //   setUser(result.data);
  // };

  return(
    <div>
      <NavBarP />
      <div>
      <div className = "form-dis">
      <Form className='form-style'>
      <h1>Update Project Details</h1>
      <Form.Field>
        <label>Project-Name</label>
        <input name='projectName' 
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
         />
      </Form.Field>

      <Form.Field>
        <label>Project-Description</label>
        <input name='projectDescription' value={projectDescription} onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
      </Form.Field>

      <select value={pmList} onChange={handleDropdownChange}>
          <option value="name">Choose PM</option>
          {pmList.map(option => (
              <option value={option.name} key={option.id}>{option.name}</option>))}
      </select>
      <br/>
      <select value={pmList} onChange={handleDropdownChange}>
          <option value="name">Choose USER</option>
          {pmList.map(option => (
              <option value={option.name} key={option.id}>{option.name}</option>))}
      </select>
    
         
      {/* <Form.Field className='form'>
        <label>Github Repo</label>
        <input name='repo' value={repo} onChange={(e)=>setRepo(e.target.value)} placeholder='Github Repo' />
      </Form.Field> */}

      {/* <div>
        <Form>
        <label>Select file</label>
        <input type="file" name='files' onChange={handleFileChange} />
      
       
        </Form>
      </div> */}

      <Button type='submit' onClick={sendDataToAPIu}>Submit</Button>

  </Form>
  <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button> 
        </div>
        </div>
        </div>
)
}



