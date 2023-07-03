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
    navigate('/addPm', { state: { selectedRepo } });

    setClicked(true);
    
    
  };

  return (
    
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
      <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
      
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



// const fetchRepos = async () => {
  //   try {
  //     const response = await axios.get(`https://${ngrokUrlSwe}/api/repositories/get`, {
  //       headers: {
  //         'ngrok-skip-browser-warning': 'true'
  //       }
  //     });
  //     // setitem(response.data)
  //    console.log(response.data)
  //    const repoObj=response.data
     
  //     response.data.map(repo => 
      
  //     temp.push({name: repo.name,text: repo.name, value: repo.repoId}));
  //      setTemp(temp)
  //     console.log(temp)
    


  //   //  const repoid=response.data.map(repo=>repo.repoId)
  //   //  console.log(repoid)
  //   //  console.log(repoOptions)
  //   //  setRepoOptions(temp);
  //   //  console.log(repoObj)
   

  //   } catch (error) {
  //     console.log('Error fetching Users:', error);
  //   }
  // };

  // const fetchProjects = async () => {
  //   try {
     
  //         const response = await axios.get(`https://${ngrokUrlSwe}/api/projects/allprojects`, {
  //           headers: {
  //             'ngrok-skip-browser-warning': 'true'
  //           }
  //         });
  //         // setitem(response.data)
  //        console.log(response.data)
  //        response.data.map(proj => 
      
  //         temp1.push({name: proj.projectName,text: proj.projectName, value: proj.projectId}));
  //          setprojItem(temp1)
  //         console.log(temp1)
       
  //       } catch (error) {
  //         console.log('Error fetching Users:', error);
  //       }
  //     };
  
























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
