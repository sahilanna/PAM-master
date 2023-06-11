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



  const handleRepoChange=(value,text)=>{
    setSelectedRepo(text)
    setItem(value)
    
console.log("repoValue",value)
console.log('repoText',text)
    // console.log(item)
    // console.log(selectedRepo)
   
   
  }
  const handleProjectChange=(event,{value})=>{
    setSelectedProject(value)
    
    setitem1(value)
    // const selectedProjectObj = project.find((proj) => proj.projectId === value);
    // const selectedProjectId = selectedProjectObj?.projectId;


      console.log('Selected Project ID:', selectedRepo);
    
  
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
     const repoObj=response.data
     const temp=[];
     const repoNames = response.data.map(repo => 
      // {name: repo.name, value: repo.id});
      temp.push({name: repo.name, value: repo.repoId}));
      console.log(temp)
    


     const repoid=response.data.map(repo=>repo.repoId)
     console.log(repoid)
     console.log(repoOptions)
     setRepoOptions(temp);
     console.log(repoObj)
   

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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const response=axios.put(`https://${ngrokUrlSwe}/api/repositories/add`,{selectedProject, selectedRepo})
    setClicked(true);
    if (projectName.length === 0 || projectDescription.length === 0 || repoOptions.length === 0) {
      return;
    }
    if (projectName && projectDescription && repo) {
      console.log(projectId);
      // dispatch(createProject({projectName, projectDescription, options}));
      // navigate('/addUser', { state: { projectName, repo } });
      navigate('/addPm', { state: { projectName, repo, projectDescription } });
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
            {/* <Form.Select
              options={projectNames.map((item) => ({ key: item.ProjectId, value: item.Projectid, text: item.projectName }))}
              onChange={(e, { value }) => setProjectId(value)}
              placeholder="Select Project"
              search
              selection
              dropdownDirection="down"
            />
            {clicked && projectName.length <= 0 ? <label style={{ color: 'red' }}>Project Name can't be Empty</label> : ''} */}
          </Form.Field>
{/*   
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project-Description</label>
            <input name='projectDescription' onChange={(e) => setProjectDescription(e.target.value)} placeholder='Project Description' />
            {clicked && projectDescription.length <= 0 ? <label style={{ color: 'red' }}>Project Description can't be Empty</label> : ''}
          </Form.Field> */}
  
          <Form.Field>
            <label style={{ textAlign: 'left' }}>REPO</label>
            {/* <Form.Select
              options={repoOptions.map((item) => ({ key: item.repoId, value: item.name, text: item.name }))}
              onChange={(e, { value }) => setRepo(value)}
              placeholder="Select Repository"
              search
              selection
              dropdownDirection="down"
            /> */}
            <Dropdown
              placeholder="Select Repo"
              fluid
              selection
              options={repoOptions.map((item, index) => ({
                key: index,
                text: item.name,
                value: item.repoId
              }))}
              value={item1
              }
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
  
























// import React, {useEffect, useState} from 'react'
// import { Form } from 'semantic-ui-react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { createProject } from '../../../../Login/redux-store/actions/action';
// import { useDispatch, useSelector } from 'react-redux';
// import Read from '../Read/Read';
// import PmCreate from '../../PM/pmCreate'; 
// import './Create.css'
// import AddPm from './addPm';
// import AddUser from './addUser';
// import { Button } from 'react-bootstrap';
// import NavBarA from '../NavbarA';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import '../Read/Read.css'
// import './Create.css'
// import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';

// const Create = () => {
//   let navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [projectId, setProjectId] = useState('');
//   const [projectName, setProjectName] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
//   const [projectManagerId, setProjectManagerId] = useState('')
//   const[userIds,setUserIds]=useState('');
//   const [error,setError]=useState('false');
//   const[file,setFile]=useState('');
//   const[gitRepoLink,setGitRepoLink]=useState('');
//   const[repo,setrepo]=useState('');
//   const[userName,setUserName]=useState('');
//   const [isValid, setIsValid] = useState(true);
//   const [options, setOptions] = useState([]);
//   const [formData, setFormData] = useState('');
//   const[clicked,setClicked]= useState(false);



  
//   const handleBack = () => {
//     navigate(-1); // Go back one page in history
//   };
//   useEffect(() => {
//     fetch(`https://${ngrokUrlSwe}/api/repositories/get`,{
//       headers: {
//         'ngrok-skip-browser-warning': 'true'
//       }}).then((response)=>response.json())
//     .then((data)=>setOptions(data))
//   }, []);
//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     setClicked(true);
//     if(projectName.length===0 || projectDescription.length===0 || options.length === 0){
//       return;
//   }
//   if(projectName && projectDescription && options)
//   {
//     console.log(projectId)
//     // dispatch(createProject({projectName, projectDescription, options}));
//    // navigate('/addUser', { state: { projectName, repo } });
//     navigate('/addPm', { state: { projectName, repo, projectDescription} });
//   }
//   }
//   return(
//     <div>
//       <NavBarA/>
//   <div  >
//   <Form className='form-style' onSubmit={handleSubmit}>
//   <Button className='back-button' onClick={handleBack}>
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </Button>
//   <h1>Add Git to project</h1>
 
     
//       <Form.Field>
//         <label style={{ textAlign: 'left' }}>Project-Name</label>
//         <input name='projectName' onChange={(e)=>setProjectName(e.target.value)} placeholder='ProjectName' />
//         {clicked&&projectName.length<=0?
//                <label style={{color:'red'}}>Project ID can't be Empty</label>: ""}
//       </Form.Field>
//       <Form.Field>
//         <label style={{ textAlign: 'left' }}>Project-Description</label>
//         <input name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)} placeholder='ProjectDescription' />
//         {clicked&&projectDescription.length<=0?
//                <label style={{color:'red'}}>Project Description can't be Empty</label>: ""}
//       </Form.Field>
     
//         <Form.Field>
//   <label style={{ textAlign: 'left' }}>REPO</label>
//   <Form.Select
//     options={options.map((item) => ({ key: item.name, value: item.name, text: item.name }))}
//     onChange={(e, { value }) => setrepo(value)}
//     placeholder="Select Repository"
//     search
//     selection
//     dropdownDirection="down"
//   />
// </Form.Field>
//       <Button type='submit' variant='primary' onClick={handleSubmit}>Next</Button>
//   </Form>
  
//   </div>
//   </div>
// )
// }
// export default Create;
