import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './projectDetailsNew.css';
import AddUserProject from '../Create/addUserProject';
import DialogBox from '../../DialogBox/DialogBox';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';


const ProjectDetails = ({ project, onClose, showAddEmployeeButton, showAddFileButton, onAddFile, onDeleteProject }) => {
  const { projectId, projectName, projectDescription } = project;
  const [showAddUserProject, setShowAddUserProject] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const [namesFile, setNamesFile] = useState([]);
  const[repo, setRepo]= useState([])
  const[figmaLink, setFigmaLink]=useState([])

 
  useEffect(() => {
    displayFile();
  }, []);


  const displayFile = async () => {
    try {
      const result = await api.get(`https://${ngrokUrl}/api/projects/files?projectId=${projectId}`);
      if (Array.isArray(result.data)) {
        setNamesFile(result.data);
        console.log(namesFile);
      } else {
        console.log('Invalid data format: ', result.data);
      }
    } catch (error) {
      console.log('Error retrieving files: ', error);
    }
  };

  const handleCloseAddUserProject = () => {
    setShowAddUserProject(false);
  };
  const handleDeleteProject = () => {
    setShowConfirmDialog(true);
  };
  const confirmDeleteProject = async () => {
    await onDeleteProject(projectId);
    setShowConfirmDialog(false);
  };
  const cancelDeleteProject = () => {
    setShowConfirmDialog(false);
  };

  const downloadFile = async (filename) => {
   
    await api.get(`https://${ngrokUrl}/api/projects/files/${filename}?projectId=${projectId}`, {
      responseType: 'blob',
      contentType: 'application/zip',
    })
      .then((result) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'file.data');
        document.body.appendChild(link);
        link.click();
        link.remove();
        navigate('/adminDashboard');
      })
      .catch((error) => {
        console.log(error, 'hi');
      });
  };
  const loadRepo = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`, {});
      setRepo(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadRepo();
  }, []);
  const loadFigma = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/figmas/project/${projectId}`, {});
      setFigmaLink(response.data);
      console.log(figmaLink)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadFigma();
  }, []);
  

  return (
    <>
      {showAddUserProject && (
        <Modal open={showAddUserProject} onClose={handleCloseAddUserProject}>
          <AddUserProject projectId={projectId} projectName={projectName} onClose={handleCloseAddUserProject} />
        </Modal>
      )}
      <Modal open={!showAddUserProject} onClose={onClose} style={{top: '120px', left:'280px', width: '600px' }} className="centered-modal">
        <Modal.Header>
          Project Details
         
          {showAddFileButton && (
            <Button color="blue" floated="right" onClick={() => onAddFile(projectId, projectName)}>
              Add File
            </Button>
          )}
          <Button color="red" floated="right" onClick={handleDeleteProject}>
            Delete
          </Button>
          <DialogBox
            show={showConfirmDialog}
            onClose={cancelDeleteProject}
            onConfirm={confirmDeleteProject}
            title="Delete Project"
            message="Are you sure you want to delete this project?"
            afterConfirm={() => navigate('/adminDashboard')}
          />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <p>
              <strong>Project ID:</strong> {projectId}
            </p>
            <p>
              <strong>Project Name:</strong> {projectName}
            </p>
            <p>
              <strong>Project Description:</strong> {projectDescription}
            </p>
           
            <p>
              <strong>Repo Name:</strong> {repo.length > 0 ? (
    <ul>
      {repo.map((repoItem) => (
        <li key={repoItem.id}>{repoItem.name}</li>
      ))} 
    </ul>
    
  ) : (
    ''
  )}
            </p>
            <p>
              <strong>Figma Link:</strong> {figmaLink.length > 0 ? (
    <ul>
      <a href={figmaLink}>
          <li>{figmaLink}</li>
        </a>
    </ul>
  ) : (
    '-'
  )}
            </p>
            
            <p>
      <strong>Help Documents:</strong>
      {namesFile.length > 0 ? (
        <ul>
          {namesFile.map((file) => (
            <li key={file.id}>

              <span onClick={() => downloadFile(file.filename)}>{file.filename}</span>

            </li>
          ))}
        </ul>
      ) : (
        '-'
      )}
    </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default ProjectDetails;


