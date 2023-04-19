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
  const [pmList, setPmList] = useState([{'name':'','id':''}])
  const [selectedOption, setSelectedOption] = useState('');
  const [error,setError]=useState('false');
  const[file,setFile]=useState('');
  const[repo,setRepo]=useState('')

  useEffect(() =>{
      const fetchData = async ()=>{
          const response = await fetch(`https://6429847d5a40b82da4d494b2.mockapi.io/PAM`);
          const newData = await response.json();
          setPmList(newData);
          // console.log(newData);
      };
      fetchData();
  }, [])

  // useEffect(() => {
  //   console.log("project ", project);
  // }, [project])

  function handleDropdownChange(event) {
    setSelectedOption(event.target.value);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(projectId.length===0 || projectName.length===0 || projectDescription.length===0||file.length===0||repo.length===0){
      setError(true)
  }
  if(projectId && projectName && projectDescription && file && repo)
  {
    console.log(projectId)
    dispatch(createProject({projectId, projectName, projectDescription}));
    navigate('/Read')
  }
}

  // const sendDataToAPI = () => {
  //   dispatch(createProject({projectId, projectName, projectDescription}));
  //   navigate('/Read')
  // }

  return(
  <Form>
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
      <br/>


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
      <br/>
         
      
      <Form.Field className='form'>
        <label>Github Repo</label>
        <input name='repo' onChange={(e)=>setRepo(e.target.value)} placeholder='Github Repo' />
        {error&&repo.length<=0?
               <label>Repo Link can't be Empty</label>: ""}

    
      </Form.Field>



      <div>
        <Form>
        <label>Select file</label>
        <input type="file" name='files' onChange={handleFileChange} />
        {error&&file.length<=0?
               <label>Add a file</label>:""}
        <button onClick={handleFileChange}>Upload</button>
        </Form>
      </div>
      
      <Button type='submit' onClick={handleSubmit}>Submit</Button>

  </Form>
)
}



