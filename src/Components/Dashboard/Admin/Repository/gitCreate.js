import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form,Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import '@fortawesome/fontawesome-free'
import NavBarA from '../NavbarA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function GitCreate() {
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
      fetch(`https://${ngrokUrlSwe}/api/repositories/get`,{
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
    <Button className='back-button' onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
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
    <Form.Select
      options={options.map((item) => ({ key: item.name, value: item.name, text: item.name }))}
      onChange={(e, { value }) => setrepo(value)}
      placeholder="Select Repository"
      search
      selection
      dropdownDirection="down"
    />
  </Form.Field>
        <Button type='submit' variant='primary' onClick={handleSubmit}>Next</Button>
    </Form>
    </div>
    </div>
)
}

export default GitCreate