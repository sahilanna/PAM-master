import React, {useEffect, useState} from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../../redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Create() {

  
  let navigate= useNavigate();
  const dispatch = useDispatch();
  // const project = useSelector(state => state.createReducer);//Allows u to extract data from Redux store state.
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  // useEffect(() => {
  //   console.log("project ", project);
  // }, [project])

  const sendDataToAPI = () => {
    dispatch(createProject({projectId, projectName, projectDescription}));
    navigate('/Read')
  }

  return(
  <Form>
      <Form.Field>
        <label>Project-Id</label>
        <input name='projectId' onChange={(e)=>setProjectId(e.target.value)} placeholder='ProjectId' />
      </Form.Field>

      <Form.Field>
        <label>Project-Name</label>
        <input name='projectName' onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
      </Form.Field>

      <Form.Field>
        <label>Project-Description</label>
        <input name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
      </Form.Field>
    
      <Button type='submit' onClick={sendDataToAPI}>Submit</Button>

  </Form>
)
}



