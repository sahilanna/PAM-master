import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import Read from '../Read/Read';
import PmCreate from '../../PM/pmCreate'; 

export default function Create() {

  let navigate= useNavigate();
  const dispatch = useDispatch();
  // const project = useSelector(state => state.createReducer);//Allows u to extract data from Redux store state.
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectManagerId, setProjectManagerId] = useState('')
  const[userIds,setUserIds]=useState([]);
  const [error,setError]=useState('false');
  const[file,setFile]=useState('');
  const[gitRepoLink,setGitRepoLink]=useState('');
  //const [link, setLink] = useState('');
  const [isValid, setIsValid] = useState(true);


  const handleLinkChange = (event) => {
    setGitRepoLink(event.target.value);
  };


  const validateLink = (value) => {
    try {
      new URL(value);
      return true;
    } catch (error) {
      return false;
    }
  };



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

  useEffect(() => {
    fetch("https://64267bccd24d7e0de470e2b7.mockapi.io/Crud")
      .then((response) => response.json())
      .then((data) => setUserIds(data));
  }, []);


  // useEffect(() => {
  //   console.log("project ", project);
  // }, [project])

  function handleDropdownChange(event) {
    setUserIds(event.target.value);
  }

 

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(projectId.length===0 || projectName.length===0 || projectDescription.length===0||gitRepoLink.length===0){
      setError(true)
  }
  if(projectId && projectName && projectDescription  && gitRepoLink)
  {
    console.log(projectId)
    dispatch(createProject({projectId, projectName, projectDescription,projectManagerId,gitRepoLink}));
    navigate('/Read')
  }
  }

  // const sendDataToAPI = () => {
  //   dispatch(createProject({projectId, projectName, projectDescription}));
  //   navigate('/Read');
  // }

  return(
  <Form.Field>
      <Form.Field className='form'>
        <label>Project-Id</label>
        <input name='projectId' onChange={(e)=>setProjectId(e.target.value)} placeholder='ProjectId' />
        {error&&projectId.length<=0?
               <label>Project ID can't be Empty</label>: ""}
      </Form.Field>

      <Form.Field className='form'>
        <label>Project-Name</label>
        <input name='projectName' onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
        {error&&projectName.length<=0?
               <label>Project ID can't be Empty</label>: ""}
      </Form.Field>

      <Form.Field className='form'>
        <label>Project-Description</label>
        <input name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
        {error&&projectDescription.length<=0?
               <label>Project ID can't be Empty</label>: ""}
      </Form.Field>

     

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
        <Form.Field>
          <label>Project Manager ID</label>
          <select>
          {userIds.map((item,index) => (
          <option key={index.id} value={item.id}>
            {item.id}
          </option>
          ))}
          </select>
        </Form.Field>


      {/* <Form.Field>
      <label>User Id : </label>
      <select multiple={true} value={selectedOptions} onChange={handleOptionSelect}>
      <option value="option4">Option 4</option>
      </select>
      </Form.Field> */}
      
      {/* <Form.Field className='form'>
      <label>Github Repo</label>
      <input name='repo' onChange={(e)=>setGitRepoLink(e.target.value)} placeholder='Github Repo' value = {link} />
      {error&&gitRepoLink.length<=0?
               <label>Repo Link can't be Empty</label>: ""}
      </Form.Field> */}

      <Form.Field>
      <label htmlFor="link">Enter a link:</label>
      <input
        type="link"
        id="gitRepoLink"
        name="gitRepoLink"
        value={gitRepoLink}
        onChange={handleLinkChange}
        placeholder='Repository'
      />
     
      </Form.Field>

      



      {/* <div>
        <Form>
        <label>Select file</label>
        <input type="file" name='files' onChange={handleFileChange} />
        {error&&file.length<=0?
               <label>Add a file</label>:""}
        <button onClick={handleFileChange}>Upload</button>
        </Form>
      </div> */}
      
      <Button type='submit' onClick={handleSubmit}>Submit</Button>

  </Form.Field>
)
}





