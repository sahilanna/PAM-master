import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import Read from '../Read/Read';
import PmCreate from '../../PM/pmCreate'; 
import '../Read/Read.css'
import AddPm from './addPm';
import AddUser from './addUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


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
    fetch(`https://118b-106-51-70-135.ngrok-free.app/api/repositories/get`,{
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
  <div className='form-display'>
  <Form className='form-style' onSubmit={handleSubmit}>
      <h1>Create Project</h1>
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

      
        
      <Button type='submit' onClick={handleSubmit}>Next</Button>

  </Form>
  <Button className="back-button" onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} /> </Button>
  </div>
)
}

export default Create;

  // const MultiSelectDropdown = () => {
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  
  //   const handleOptionSelect = (e) => {
  //     const options = userIds.from(e.target.selectedOptions).map((option) => option.value);
  //     setSelectedOptions(options);
  //   };
  
  // useEffect(() =>{
  //     const fetchData = async ()=>{
  //         const response = await fetch(`https://64267bccd24d7e0de470e2b7.mockapi.io/Crud`);
  //         const newData = await response.json();
  //         setProjectManagerId(newData);
  //         // console.log(newData);
  //     };
  //     fetchData();
  // }, [])
// useEffect(() => {
  //   console.log("project ", project);
  // }, [project])
   // const sendDataToAPI = () => {
  //   dispatch(createProject({projectId, projectName, projectDescription}));
  //   navigate('/Read');
  // }

      {/* <select value={pmList} onChange={handleDropdownChange}>
          <option value="name">Choose PM</option>
          {pmList.map(option => (
              <option value={option.name} key={option.id}>{option.name}</option>))}
      </select> */}
      <br/>
      {/* <select value={projectManagerId} onChange={handleDropdownChange}>
          <option value="name">Choose USER</option>
          {projectManagerId.map(option => (
              <option value={option.name} key={option.id}>{option.name}</option>))}
      </select>
      <br/>
          */}
        {/* <Form.Field>
          <label>Project Manager ID</label>
          <select>
          {userIds.map((item,index) => (
          <option key={index.id} value={item.id}>
            {item.id}
          </option>
          ))}
          </select>
        </Form.Field> */}
          {/* <Form.Field>
        <label>Github Repo</label>
        <input name='projectId' onChange={(e)=>setProjectId(e.target.value)} placeholder='Repo Name'/>
        {error&&projectId.length<=0?
               <label style={{color:'red'}}>Github Repo Can't Be Empty</label>: ""}
        </Form.Field> */}


      {/* <Form.Field>
      <label>User Id : </label>
      <select multiple={true} value={selectedOptions} onChange={handleOptionSelect}>
      <option value="option4">Option 4</option>
      </select>
      </Form.Field> */}
      
      {/* <Form.Field>
      <label>Github Repo</label>
      <input name='repo' onChange={(e)=>setGitRepoLink(e.target.value)} placeholder='Github Repo' value = {link} />
      {error&&gitRepoLink.length<=0?
               <label>Repo Link can't be Empty</label>: ""}
      </Form.Field> */}

      {/* <Form.Field>
      <label htmlFor="link">Enter a link:</label>
      <input
        type="link"
        id="gitRepoLink"
        name="gitRepoLink"
        value={gitRepoLink}
        onChange={handleLinkChange}
        placeholder='Repository'
      />
     
      </Form.Field> */}

      



      {/* <div>
        <Form>
        <label>Select file</label>
        <input type="file" name='files' onChange={handleFileChange} />
        {error&&file.length<=0?
               <label>Add a file</label>:""}
        <button onClick={handleFileChange}>Upload</button>
        </Form>
      </div> */}
       {/* <Form.Field>
        <label>Project-Id</label>
        <input name='projectId' onChange={(e)=>setProjectId(e.target.value)} placeholder='ProjectId' />
        {error&&projectId.length<=0?
               <label style={{color:'red'}}>Project ID can't be Empty</label>: ""}
      </Form.Field> */}
      // const validateLink = (value) => {
      //   try {
      //     new URL(value);
      //     return true;
      //   } catch (error) {
      //     return false;
      //   }
      // };
      // const handleLinkChange = (event) => {
      //   setGitRepoLink(event.target.value);
      // };


