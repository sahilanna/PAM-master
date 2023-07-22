import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../../Login/redux-store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import Read from '../Read/Read';
import PmCreate from '../../PM/pmCreate';
import './Create.css';
import AddPm from './addPm';
import AddUser from './addUser';
// import { Button } from 'react-bootstrap';
import NavBarA from '../NavbarA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../Read/Read.css';
import './Create.css';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import api from '../../api';


const Create = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [projectId, setprojectId] = useState('');
  const[repoId,setrepoId]=useState('')
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectManagerId, setProjectManagerId] = useState('');
  const [userIds, setUserIds] = useState('');
  const [error, setError] = useState('false');
  const [file, setFile] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [repo, setRepo] = useState('');
  const [userName, setUserName] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [projectOptions, setProjectOptions] = useState([]);
  const [repoOptions, setRepoOptions] = useState([]);
  const [formData, setFormData] = useState('');
  const [clicked, setClicked] = useState(false);
  const[item,setItem]=useState('')
  const[project,setProject]=useState([])
  const[item1,setitem1]=useState([])
  const[selectedProject,setSelectedProject]=useState('')

  const[selectedRepo,setSelectedRepo]=useState('')
  
  const[temp,setTemp]=useState([])
  const[temp1,setTemp1]=useState([])
  const[projItem, setprojItem]=useState('')


  const handleBack = () => {
    navigate(-1); 
  };

//   let data = sessionStorage.getItem("item");
//   let user = JSON.parse(data);
//   const accessToken=user.token
//   console.log(user)
//     console.log(user.token)

// const headers={AccessToken:accessToken}


  const handleRepoChange=(e, { value, options})=>{
    const selectedRepo = options.find((option) => option.value === value);
    setrepoId(value)  
    // console.log("repoValue",value)
    setSelectedRepo(selectedRepo.text);
  }
  const handleProjectChange=(event,{value})=>{
    
  const  projectId= projItem
    setprojectId(value)
    setSelectedProject(value)
    // console.log("projectValue",value) 
  
}

  useEffect(()=>{
    fetchRepos()
  },[])


  const fetchRepos = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/get`);
      const repoOptions = response.data.map(repo => ({
        key: repo.repoId,
        text: repo.name,
        value: repo.repoId
      }));
      setTemp(repoOptions);
    } catch (error) {
      console.log('Error fetching Repositories:', error);
    }
  };


  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/allProjects`);
      const projOptions = response.data.map(proj => ({
        key: proj.projectId,
        text: proj.projectName,
        value: proj.projectId
      }));
      setprojItem(projOptions);
    } catch (error) {
      console.log('Error fetching Projects:', error);
    }
  };


      useEffect(()=>{
        fetchProjects()
    
      },[])

      const onClose=()=>{
        navigate(-1)
      }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("repoid", repoId)
    const response=api.put(`https://${ngrokUrl}/api/projects/${projectId}/repository/${repoId}`)
    console.log("Check",selectedRepo);

    setClicked(true);
    navigate('/repoRead');
    
    
  };

  return (
    
    <Modal open={true} onClose={onClose}  style={{ width: '500px', height:'410px' }} className='create-Project-Modal'>
      <div style={{paddingTop:'6px'}}>
      
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add Project</Modal.Header>

   
  
          <Modal.Content>

          <Form onSubmit={handleSubmit}>
            <Form.Field>
            <label style={{ textAlign: 'left' }}>Project-Name<span style={{ color: 'red' }}>*</span></label>
           
            <Dropdown
              placeholder="Select project"
              fluid
              selection
              options={projItem}
              // value={item1}
              onChange={handleProjectChange}
            />
          </Form.Field>
           
  
          <Form.Field>
            <label style={{ textAlign: 'left' }}>REPO<span style={{ color: 'red' }}>*</span></label>
           
            <Dropdown
              placeholder="Select Repo"
              fluid
              selection
              options={temp}
              // value={item1}
              onChange={handleRepoChange}
            />
          </Form.Field>
  
          <Button type='submit' primary>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
     
  );
}
export default Create;


