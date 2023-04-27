import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject } from '../../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';

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


  
  

  function handleDropdownChange(event) {
    setSelectedOption(event.target.value);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const sendDataToAPIu = () => {
    
    dispatchU(updateProject({projectId, projectName, projectDescription}));

    const loaditem = async () => {
      const result = await axios.get(getUrl,{
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }}) .then((result) => {
  
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
  <Form>
      {/* <Form.Field>
        <label>Project-Id</label>
       

        
      </Form.Field> */}

      <Form.Field>
        <label>Project-Name</label>
        <input name='projectName' 
        onChange={(e) => setProjectName(e.target.value)}
         />
      </Form.Field>

      <Form.Field>
        <label>Project-Description</label>
        <input name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
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
      <br/>
         
      
      <Form.Field className='form'>
        <label>Github Repo</label>
        <input name='repo' onChange={(e)=>setRepo(e.target.value)} placeholder='Github Repo' />
      </Form.Field>

      <div>
        <Form>
        <label>Select file</label>
        <input type="file" name='files' onChange={handleFileChange} />
      
        {/* <button onClick={handleFileChange}>Upload</button> */}
        </Form>
      </div>

      <Button type='submit' onClick={sendDataToAPIu}>Submit</Button>

  </Form>
)
}



