import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Create.css';
import '../../Read/Read.css';
import { ngrokUrl } from '../../../../../network/config';
import api from '../../../../../network/api';
import CreateUI from './addProjectRepoUI';
import logger from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js';

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
      const response = await api.get(`https://${ngrokUrl}/repositories/get`);
      const repoOptions = response.data.map((repo)=> ({
        key: repo.repoId,
        text: repo.name,
        value: repo.repoId
      }));
      setTemp(repoOptions);
    } catch (error) {
      logger.error('Error fetching Repositories:', error);
    }
  };


  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/projects/allProjects`);
      const projOptions = response.data.map((proj )=> ({
        key: proj.projectId,
        text: proj.projectName,
        value: proj.projectId
      }));
      setprojItem(projOptions);
    } catch (error) {
      logger.error('Error fetching Projects:', error);
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
    logger.info("repoid", repoId)
    api.put(`https://${ngrokUrl}/projects/${projectId}/repository/${repoId}`);
    logger.info(selectedRepo);
    navigate('/repoRead');
    
};

  return (
    <CreateUI
    onSubmit={handleSubmit}
    onClose={onClose}
    projItem={projItem}
    temp={temp}
    handleProjectChange={handleProjectChange}
    handleRepoChange={handleRepoChange}
    selectedRepo={selectedRepo}
  />
  );
}
export default Create;


