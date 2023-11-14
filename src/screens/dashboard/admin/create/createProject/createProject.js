import React,  { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { createProject } from '../../../../../redux/reduxStore/actions/projectActions.js' 
import '../create.css';
import CreateProjectModal from './createProjectModal.js';

function CreateProject() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.createProjectReducer);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectDescription || !projectName) {
      return;
    }
    dispatch(createProject(projectName, projectDescription));
    navigate('/AdminDashboard'); 
  }

  const onClose = () => {
    navigate(-1);
  }

  return (
    <CreateProjectModal
      loading={loading}
      success={success}
      error={error}
      onClose={onClose}
      projectName={projectName}
      projectDescription={projectDescription}
      setProjectName={setProjectName}
      setProjectDescription={setProjectDescription}
      handleSubmit={handleSubmit}
    />
  );
}
export default CreateProject
