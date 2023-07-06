import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './projectDetailsNew.css';
import AddUserProject from '../Create/addUserProject';
import DialogBox from '../../DialogBox/DialogBox';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';

const ProjectDetails = ({ project, onClose, showAddEmployeeButton, showAddFileButton, onAddFile, onDeleteProject }) => {
  const { projectId, projectName, projectDescription } = project;
  const [showAddUserProject, setShowAddUserProject] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const [fdata, setFdata] = useState();
  const [namesFile, setNamesFile] = useState([]);
  const[repoName, setRepoName]=useState('')

  const[repo, setRepo]= useState([])
  const[figmaLink, setFigmaLink]=useState([])

  const handleAddEmployee = () => {
    setShowAddUserProject(true);
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



  const viewFile = async (projectId) => {
    const result = await api.get(`https://${ngrokUrl}/api/projects/files?projectId=${projectId}`, {
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

  const loadItems = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`, {});
      setRepo(response.data);
      // console.log(repo)
      
    } catch (error) {
      console.log(error);
      
    }
  };
  
  useEffect(() => {
    loadItems();
  }, []);


  const loadRepo = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`, {});
      setRepo(response.data);
      setRepoName(response.data.name)
      console.log(repo)
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
  

  const downloadFile = (fdata, fileName) => {
    return new Promise(async (resolve) => {
      try {
        const response = await fetch(fdata);
        console.log(fdata)
        console.log(response)
        // const data = await response.blob();
        // const downloadUrl = window.URL.createObjectURL(data);
        const downloadUrl = window.URL.createObjectURL(new Blob([fdata]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        await new Promise(resolve => setTimeout(resolve, 1000));
        resolve();
      } catch (error) {
        console.log(`Error downloading file ${fileName}:`, error);
        resolve();
      }
    });
  };

  return (
    <>
      {showAddUserProject && (
        <Modal open={showAddUserProject} onClose={handleCloseAddUserProject}>
          <AddUserProject projectId={projectId} projectName={projectName} onClose={handleCloseAddUserProject} />
        </Modal>
      )}

      <Modal open={!showAddUserProject} onClose={onClose} style={{ width: '700px' }} className="centered-modal">
        <Modal.Header>
          Project Details
          {showAddEmployeeButton && (
            <Button color="green" floated="right" onClick={() => viewFile(projectId)}>
              Download
            </Button>
          )}
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
            {/* <p>
              <strong>Help Documents:</strong>
              {namesFile.map((obj, index) => (
                <p key={index}>{obj}</p>
              ))}
            </p> */}
            <p>
              <strong>Repo Name:</strong> {repo.length > 0 ? (
    <ul>
      {repo.map((repo, index) => (
        <li key={index}>{repo.name}</li>
      ))} 
    </ul>
    
  ) : (
    '-'
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






//Before Sachin Asked
// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const ProjectDetails = ({ project, onClose }) => {
//   if (!project) return null;

//   return (
//     <Modal show={true} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Project Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p><strong>Project ID:</strong> {project.projectId}</p>
//         <p><strong>Project Name:</strong> {project.projectName}</p>
//         <p><strong>Project Description:</strong> {project.projectDescription}</p>
//         {/* <p><strong>Repository Name:</strong> {project.repoName}</p>
//         <p><strong>PM Github:</strong> {project.pmGithubUsername}</p>
//         <p><strong>User Github:</strong> {project.userGithubUsername}</p> */}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ProjectDetails;