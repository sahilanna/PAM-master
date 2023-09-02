import React, { useState, useEffect } from 'react';
import { Button, Modal,Form } from 'semantic-ui-react';
import './projectDetailsNew.css';
import AddUserProject from '../Create/addUserProject';
import DialogBox from '../../DialogBox/DialogBox';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { useParams } from 'react-router-dom';
import { ngrokUrl } from '../../../../Assets/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Header, Segment, Container, List, Tab, Icon } from 'semantic-ui-react';
import CustomSidebar from '../../SideBar/SideBar';
import ProjectUsers from './projectUsers';
import ProjectPms from './projectPms';



const ProjectDetails = ({ project, onClose, showAddEmployeeButton, showAddFileButton, onAddFile }) => {
  
  const { projectId } = useParams();
  const{projectName}=useParams()
  const [showAddUserProject, setShowAddUserProject] = useState(false);
  const [driveData, setDriveData] = useState('');
  const[driveLink, setDriveLink]=useState('')
  const[count, setCount]=useState('')
   const [otp, setOtp] = useState('');
  const [showOTPMoal, setShowOTPMoal] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const addFile = async (projectId, projectName) => {
    
    navigate('/addFile', { state: { projectId, projectName } });
  };


  const panes = [
    {
      menuItem: 'Users',
      render: () => <Tab.Pane ><ProjectUsers 
      projectId={projectId} projectName={projectName} /></Tab.Pane>,
    },
  //   {
  //     menuItem: 'Repositories',
  //     render: () => <Tab.Pane >{repo.map((repoItem) => (
  // <ol key={repoItem.id}>
  //   <br/>{repoItem.name}</ol>
  // ))} </Tab.Pane>,
  //   },
    { menuItem: 'PM', render: () => <Tab.Pane><ProjectPms
    projectId={projectId} projectName={projectName} /></Tab.Pane> },

    {menuItem: 'Help Documents', render: () => <Tab.Pane>
    <div className="help-documents">
      <Button color="blue" floated="left" onClick={() => addFile(projectId, projectName)}>
        Add File
      </Button>
      {namesFile.length > 0 ? (
        <ul className="file-list">
          {namesFile.map((filename, index) => (
            <li key={index} className="file-item">
              <div className="file-info">
                <a href="#" onClick={() => downloadFile(filename.fileName)}>
                  {filename.fileName}
                </a>
              </div>
              <div className="delete-button">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteFile(filename.helpDocumentId)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-files">No files available</div>
      )}
    </div>
  </Tab.Pane>}
  ,
  
  ]
  const TabExampleLoading = () => <Tab panes={panes} /> 
  

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const [namesFile, setNamesFile] = useState([]);
  const[repo, setRepo]= useState([])
  const[figmaLink, setFigmaLink]=useState([])
  const[projectData, setProjectData]=useState([])

  const deleteProject = async (projectId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/delete/${projectId}`);
      navigate('/adminDashboard')
   
       
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    displayFile();
  }, []);
  useEffect(() => {
    Details();
  }, []);
  const Details = async () => {
    try {
      const result = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/details`,{});
       setProjectData(result.data)
       console.log(projectData)
       console.log(count)
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPClose = () => {
    setShowOTPMoal(false);
  };

  function CountCell({ projectId }) {
    const [count, setCount] = useState(null);
  
    useEffect(() => {
      fetchCount(projectId); // Fetch count when the projectId changes
    }, [projectId]);
  
    async function fetchCount(projectId) {
      try {
        const result = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/count`, {});
        setCount(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    return <>{count !== null ? count : '-'}</>
  }



  const handleConfirmDelete = async () => {
    try {
      const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
        phoneNumber: '+91 9928931610',
      });
      console.log(otpResponse);
      if (otpResponse.data === 'OTP sent') {
        setShowConfirmDialog(false);
        setShowOTPMoal(true);
      } else if (otpResponse.response === false) {
        console.log('OTP generation failed');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
        otp: otp,
      });
      console.log(otpSubmissionResponse);
      if (otpSubmissionResponse.data === true) {
        await api.delete(`https://${ngrokUrl}/api/projects/delete/${projectId}`);
        setShowOTPMoal(false);
      
      } else if (!otpSubmissionResponse.data) {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };


  
  const owner="Bindushree-0906"
 
  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/getGoogleDriveByProjectId/${projectId}`);
      // setDriveData(response.data)
    const driveDataa=response.data
      setDriveData(driveDataa)

      console.log('drive', driveDataa.driveLink)
      setDriveLink(driveDataa.driveLink)
      console.log(driveLink)
      
    } catch (error) {
      console.log('Error fetching projects:', error);
     
    }
  };


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
    await deleteProject(projectId);
    setShowConfirmDialog(false);
  };
  const cancelDeleteProject = () => {
    setShowConfirmDialog(false);
  };

  const downloadFile = async (filename) => {

    const result = await api.get(`https://${ngrokUrl}/api/projects/files/${filename}?projectId=${projectId}`, {

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

  // const handleDeleteFile = async (fileId) => {
  //   try {
  //     await api.delete(`https://${ngrokUrl}/api/projects/files/${fileId}`);
  //     displayFile();
  //   } catch (error) {
  //     console.log('Error deleting file: ', error);
  //   }
  // };

  const handleDeleteFile = async (helpDocumentId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/files/${helpDocumentId}`);
      // Remove the deleted file from the namesFile list
      setNamesFile(prevNamesFile => prevNamesFile.filter(file => file.helpDocumentId !== helpDocumentId));
    } catch (error) {
      console.log('Error deleting file: ', error);
    }
  };
  function formatDate(isoDate) {
    const dateObject = new Date(isoDate);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      
    };
  
    return dateObject.toLocaleString('en-US', options);
  }
 

  
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
    {/* {projectId}: */}
    <div className="parent-admin">
  <div style={{ display: 'flex' }}>
    <div style={{ flex: '0 0 auto', width: '250px' }}>
      <CustomSidebar />
    </div>
   <div >
   <Container >
   
  
      <Header as='h1' attached='top' block className='project-heading1'>
     
    <div>{projectName}</div>
    <Button color="red" onClick={handleDeleteProject} className="delete-button">
  <FontAwesomeIcon icon={faTrash} /> 
  </Button>
 
          <DialogBox
            show={showConfirmDialog}
            onClose={cancelDeleteProject}
            onConfirm={confirmDeleteProject}
            title="Delete Project"
            message="Are you sure you want to delete this project?"
            afterConfirm={()=>navigate('/AdminDashboard')}
          />
      </Header>
      <Segment attached className="left-aligned-segment">
        
     
        
        {/* <Header as='h3'>{projectName} Details: </Header> */}
        
        <List divided relaxed>
          
            <List.Item key={projectId}>
              <List.Content>
                
                <List.Header>
                Description:{' '} 
                <span className="description-value">{projectData.projectDescription}</span>
                </List.Header>
                <br/>


                <List.Header>Project Manager: {' '}
                <span className="description-value">{projectData.pmName} </span>
                </List.Header>
                <br/>

                <List.Header>
                Repositories:{' '}
                <span className='description-value'>
                {projectData.repositories && projectData.repositories.length > 0 ? (
                projectData.repositories.map((repo, index) => (
                  <span key={index}>
                    {repo.name}
                    {index < projectData.repositories.length - 1 ? ', ' : ''}
                  </span>
                ))
                ) : (
                <span>N/A</span>
                )}
              </span>
              </List.Header>
                <br/> 


                <List.Header>
                Figma Link: {projectData && projectData.figma && projectData.figma.figmaURL ? (
                <a href={projectData.figma.figmaURL} target="_blank" rel="noopener noreferrer">
                {projectData.figma.figmaURL}
                </a>
                ) : (
                  <span className="description-value">N/A</span>
                )}
                </List.Header>
                <br/>



                <List.Header>
                  Drive Link :  {projectData && projectData.googleDrive && projectData.googleDrive.driveLink ? (
                    <a href={projectData.googleDrive.driveLink} target="_blank" rel="noopener noreferrer">
                      {projectData.googleDrive.driveLink}
                    </a>
                  ) : (
                    <span className="description-value">N/A</span>
                  )}
                </List.Header>    
                <br/>   
                  
                 
                <List.Header>
                Created on :{' '} 
                <span className='description-value'>{formatDate(projectData.lastUpdated)} </span>
                </List.Header>
                <br/>  


              </List.Content>
            </List.Item>
  
        </List>
      </Segment>



      <Tab menu={{ fluid: true, horizontal: true, tabular: true }} panes={panes} />
      </Container>
      </div>
      </div>
    <DialogBox show={showConfirmDialog} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
  <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to '+91 9928931610'</label>
              <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
            </div>
            <p>{errorMessage}</p>
            <Button type="submit" primary>
              Submit OTP
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleOTPClose}>Cancel</Button>
        </Modal.Actions>
      </Modal>
</div>
     
    </>
  );
};
export default ProjectDetails;











{/* <br/>
             
<List.Header>
  Status: {projectData.status ? <Icon name='close' color='red' /> : <Icon name='checkmark' color='green' />}
</List.Header> */}


 {/* {showAddUserProject && (
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
          <Modal
    open={showOTPMoal}
    onClose={handleOTPClose}
    style={{ width: '500px', height:'320px' }}
    className="centered-modal-OTP"
  >
    <Modal.Header>Enter OTP</Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleOTPSubmit}>
        <div className="form-field">
          <label>OTP sent to '+91 9928931610'</label>
          <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
        </div>
        <p>{errorMessage}</p>
        <Button type="submit" primary>
          Submit OTP
        </Button>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={handleOTPClose}>Cancel</Button>
    </Modal.Actions>
  </Modal>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <p>
              <strong>Project ID:</strong> {projectId}
            </p>
            <p>
              <strong>Project Name:</strong> {projectName}
            </p>
            <p><strong>Count of employees: </strong><CountCell projectId={projectId} /></p>
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
      {namesFile.map((filename, index) => (
        <li key={index} className="file-item">
          <div className="file-info">
            <a href="#" onClick={() => downloadFile(filename.fileName)}>
              {filename.fileName}
            </a>
          </div>
          <div className="delete-button">
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteFile(filename.helpDocumentId
                )}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    '-'
  )}
</p>


    <p>
  <strong>Drive Link</strong> {driveLink ? (
    <ul>
      <a href={driveLink}>
        <li>{driveLink}</li>
      </a>
    </ul>
  ) : (
    '-'
  )}
</p>
          </Modal.Description>
        </Modal.Content>
       
        <Modal.Actions>
        <Button onClick={handleModalClose}>Close</Button>
      </Modal.Actions>
      <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
        <Modal.Header>Enter OTP </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleOTPSubmit}>
            <div className="form-field">
              <label>OTP sent to '+91 9928931610'</label>
              <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
            </div>
            <p>{errorMessage}</p>
            <Button type="submit" primary>
              Submit OTP
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleOTPClose}>Cancel</Button>
        </Modal.Actions>
      </Modal>
      <DialogBox show={showConfirmDialog} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
      </Modal> */}


