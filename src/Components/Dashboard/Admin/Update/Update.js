import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject } from '../../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Update() {
  const getUrl =  "https://cc0f-106-51-70-135.ngrok-free.app/api/projects/allProjects"

  
  let navigate= useNavigate();
  const {id} = useParams();

  const dispatchU = useDispatch();
  const[user,setUser]=useState('')
  const[item,setItem]=useState('')
  
  // const project = useSelector(state => state.createReducer);//Allows u to extract data from Redux store state.
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  


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
  }
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
      <Form.Field>
        <label>Project-Id</label>
        <input name='projectId'
         onChange={(e)=>setProjectId(e.target.value)} 
         placeholder='ProjectId'
         />
      </Form.Field>

      <Form.Field>
        <label>Project-Name</label>
        <input name='projectName' 
        onChange={(e)=>setProjectName(e.target.value)}
         placeholder='ProjectName' />
      </Form.Field>

      <Form.Field>
        <label>Project-Description</label>
        <input name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
      </Form.Field>
    
      <Button type='submit' onClick={sendDataToAPIu}>Submit</Button>

  </Form>
)
}



