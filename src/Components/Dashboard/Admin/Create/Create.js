  import React, { useEffect, useState } from 'react';
  import { Form , Dropdown} from 'semantic-ui-react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { createProject } from '../../../../Login/redux-store/actions/action';
  import { useDispatch, useSelector } from 'react-redux';
  import Read from '../Read/Read';
  import PmCreate from '../../PM/pmCreate';
  import './Create.css';
  import AddPm from './addPm';
  import AddUser from './addUser';
  import { Button } from 'react-bootstrap';
  import NavBarA from '../NavbarA';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  import '../Read/Read.css';
  import './Create.css';
  import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
  const Create = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [projectId, setProjectId] = useState('');
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
    const handleBack = () => {
      navigate(-1); // Go back one page in history
    };
    const handleRepoChange=(event,{value})=>{
      setSelectedRepo(value)
      setItem(value)
    }
    const handleProjectChange=(event,{value})=>{
      setSelectedProject(value)
      setitem1(value)
    }
    useEffect(()=>{
      fetchRepos()
    },[])
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://${ngrokUrlSwe}/api/repositories/get`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        // setitem(response.data)
      console.log(response.data)
      const repoNames = response.data.map(repo => repo.name);
      const repoid=response.data.map(repo=>repo.repoId)
      console.log(repoid)
      setRepoOptions(repoNames);
      } catch (error) {
        console.log('Error fetching Users:', error);
      }
    };
    const fetchProjects = async () => {
      try {
            const response = await axios.get(`https://${ngrokUrlSwe}/api/projects/allprojects`, {
              headers: {
                'ngrok-skip-browser-warning': 'true'
              }
            });
            // setitem(response.data)
          console.log(response.data)
          const projectNames = response.data.map(proj => proj.projectName);
          const projectId=response.data.map(proj=>proj.projectId)
          console.log(projectId)
          setProject(projectNames);
          } catch (error) {
            console.log('Error fetching Users:', error);
          }
        }
        useEffect(()=>{
          fetchProjects()
        },[])
  
        const handleSubmit = async (e) => {
          if (projectName.length === 0 || projectDescription.length === 0 || repoOptions.length === 0) {
            return;
          }
        
          try {
            const selectedProjectObj = project.find((proj, index) => index === item1);
        
            if (selectedProjectObj) {
              const { projectId } = selectedProjectObj;
        
              const selectedRepoObj = repoOptions.find((repo, index) => index === item);
        
              if (selectedRepoObj) {
                const { repoId } = selectedRepoObj;
        
                await axios.put(`https://${ngrokUrlSwe}/api/repositories/add`, {
                  projectId: projectId,
                  repoId: repoId
                });
        
                setClicked(true);
                console.log(projectId);
        
                navigate('/addPm', { state: { projectName, repo, projectDescription } });
              } else {
                console.log('Selected repo object not found.');
              }
            } else {
              console.log('Selected project object not found.');
            }
          } catch (error) {
            console.log('Error sending PUT request:', error);
          }
        };
        
        
    
    return (
      <div>
        <NavBarA />
        <div>
          <Form className='form-style' onSubmit={handleSubmit}>
            <Button className='back-button' onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <h1>Add Git to project</h1>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Project-Name</label>
              <Dropdown
                placeholder="Select project"
                fluid
                selection
                options={project.map((projectName, index) => ({
                  key: index,
                  text: projectName,
                  value: projectName
                }))}
                value={item1}
                onChange={handleProjectChange}
              />
              
            </Form.Field>

            <Form.Field>
              <label style={{ textAlign: 'left' }}>REPO</label>
              <Dropdown
                placeholder="Select Repo"
                fluid
                selection
                options={repoOptions.map((name, index) => ({
                  key: index,
                  text: name,
                  value: name
                }))}
                value={item}
                onChange={handleRepoChange}
              />
            </Form.Field>
            <Button type='submit' variant='primary' onClick={handleSubmit}>Next</Button>
          </Form>
        </div>
      </div>
    );
  }
  export default Create;