import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import '../Read/Read.css';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';


const Create = () => {
  let navigate = useNavigate();
  const [projectId, setprojectId] = useState('');
  const[repoId,setrepoId]=useState('')
  const[selectedRepo,setSelectedRepo]=useState('')
  
  const[temp,setTemp]=useState([])
  const[projItem, setprojItem]=useState('')
  



  const handleRepoChange=(e, { value, options})=>{
    const selectedRepo = options.find((option) => option.value === value);
    setrepoId(value)  
    setSelectedRepo(selectedRepo.text);
  }

  const handleProjectChange=(event,{value})=>{
    
    setprojectId(value)
    
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
    api.put(`https://${ngrokUrl}/api/projects/${projectId}/repository/${repoId}`);
    console.log(selectedRepo);
    navigate('/repoRead')
    
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


