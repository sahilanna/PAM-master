import React, { useState, useEffect } from 'react';
import { Button, Modal,Form } from 'semantic-ui-react';
import './projectDetailsNew.css';
import AddUserProject from '../Create/addUserProject';
import DialogBox from '../../DialogBox/DialogBox';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';



const ProjectDetails = ({ project, onClose, showAddEmployeeButton, showAddFileButton, onAddFile, deleteProject }) => {
  const { projectId, projectName, projectDescription } = project;
  const [showAddUserProject, setShowAddUserProject] = useState(false);
  const [driveData, setDriveData] = useState('');
  const[driveLink, setDriveLink]=useState('')
  const[count, setCount]=useState('')
   const [otp, setOtp] = useState('');
  const [showOTPMoal, setShowOTPMoal] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
  


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

  useEffect(() => {
    displayFile();
  }, []);
  useEffect(() => {
    fetchProjects();
  }, []);
  const countEmp = async (projectId) => {
    try {
      const result = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/count`,{});
       setCount(result.data)
       console.log(count)
    } catch (error) {
      console.log(error);
    }
  };
    const handleOTPClose = () => {
    setShowOTPMoal(false);
  };
  const handleModalClose = () => {
    onClose();
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
  
    return <>{count !== null ? count : '-'}</>// Display count or loading message
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



  const displayFile=async()=>{
    try{
    const result = await api.get(`https://${ngrokUrl}/api/projects/files?projectId=${projectId}`)
    setNamesFile(result.data)
    console.log(namesFile)
    }
    catch(error){
      console.log('error', error)
    }
  }

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
      <Modal open={!showAddUserProject} onClose={onClose} style={{top: '105px', left:'280px', width: '600px' }} className="centered-modal">
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
            header="Delete Project"
            content="Are you sure you want to delete this project?"
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
      {repo.map((repo, index) => (
        <li key={index}>{repo.name}</li>
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
            <li key={index}>
              <b> 

<a href="#" onClick={() => downloadFile(filename)}>
            {filename}
          </a>
          </b>
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
      </Modal>
    </>
  );
};
export default ProjectDetails;





// import React, { useState, useEffect } from 'react';
// import { Button, Modal,Form } from 'semantic-ui-react';
// import './projectDetailsNew.css';
// import AddUserProject from '../Create/addUserProject';
// import DialogBox from '../../DialogBox/DialogBox';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api';
// import { ngrokUrl } from '../../../../Assets/config';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';


// const ProjectDetails = ({ project, onClose, showAddEmployeeButton, showAddFileButton, onAddFile, deleteProject }) => {
//   const { projectId, projectName, projectDescription } = project;
//   const [showAddUserProject, setShowAddUserProject] = useState(false);
//   const [driveData, setDriveData] = useState('');
//   const[driveLink, setDriveLink]=useState('')
//   const[count, setCount]=useState('')
//    const [otp, setOtp] = useState('');
//   const [showOTPMoal, setShowOTPMoal] = useState(false);
//    const [errorMessage, setErrorMessage] = useState('');
  
  


//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const navigate = useNavigate();
//   const [namesFile, setNamesFile] = useState([]);
//   const[repo, setRepo]= useState([])
//   const[figmaLink, setFigmaLink]=useState([])

 
//   useEffect(() => {
//     displayFile();
//   }, []);
//   useEffect(() => {
//     fetchProjects();
//   }, []);
//   const countEmp = async (projectId) => {
//     try {
//       const result = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/count`,{});
//        setCount(result.data)
//        console.log(count)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//     const handleOTPClose = () => {
//     setShowOTPMoal(false);
//   };
//   const handleModalClose = () => {
//     onClose();
//   };
 
//   function CountCell({ projectId }) {
//     const [count, setCount] = useState(null);
  
//     useEffect(() => {
//       fetchCount(projectId); // Fetch count when the projectId changes
//     }, [projectId]);
  
//     async function fetchCount(projectId) {
//       try {
//         const result = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/count`, {});
//         setCount(result.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
  
//     return <>{count !== null ? count : '-'}</>// Display count or loading message
//   }



//   const handleConfirmDelete = async () => {
//     try {
//       const otpResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/send`, {
//         phoneNumber: '+91 9928931610',
//       });
//       console.log(otpResponse);
//       if (otpResponse.data === 'OTP sent') {
//         setShowConfirmDialog(false);
//         setShowOTPMoal(true);
//       } else if (otpResponse.response === false) {
//         console.log('OTP generation failed');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleCancelDelete = () => {
//     setShowConfirmDialog(false);
//   };
//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const otpSubmissionResponse = await api.post(`https://${ngrokUrl}/api/v1/OTP/verify`, {
//         otp: otp,
//       });
//       console.log(otpSubmissionResponse);
//       if (otpSubmissionResponse.data === true) {
//         await api.delete(`https://${ngrokUrl}/api/projects/delete/${projectId}`);
//         setShowOTPMoal(false);
      
//       } else if (!otpSubmissionResponse.data) {
//         setErrorMessage('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       setErrorMessage('Something went wrong. Please try again.');
//     }
//   };


  
//   const owner="Bindushree-0906"
 
//   const fetchProjects = async () => {
//     try {
//       const response = await api.get(`https://${ngrokUrl}/getGoogleDriveByProjectId/${projectId}`);
//       // setDriveData(response.data)
//     const driveDataa=response.data
//       setDriveData(driveDataa)

//       console.log('drive', driveDataa.driveLink)
//       setDriveLink(driveDataa.driveLink)
//       console.log(driveLink)
      
//     } catch (error) {
//       console.log('Error fetching projects:', error);
     
//     }
//   };


//   const displayFile = async () => {
//     try {
//       const result = await api.get(`https://${ngrokUrl}/api/projects/files?projectId=${projectId}`);
//       if (Array.isArray(result.data)) {
//         setNamesFile(result.data);
//         console.log(namesFile);
//       } else {
//         console.log('Invalid data format: ', result.data);
//       }
//     } catch (error) {
//       console.log('Error retrieving files: ', error);
//     }
//   };
  

//   const handleCloseAddUserProject = () => {
//     setShowAddUserProject(false);
//   };
//   const handleDeleteProject = () => {
//      console.log('Deleting project...');
//     setShowConfirmDialog(true);
//   };
//   const confirmDeleteProject = async () => {
//     await deleteProject(projectId);
//     setShowConfirmDialog(false);
//   };
//   const cancelDeleteProject = () => {
//     setShowConfirmDialog(false);
//   };

//   const downloadFile = async (filename) => {

//     const result = await api.get(`https://${ngrokUrl}/api/projects/files/${filename}?projectId=${projectId}`, {

//       responseType: 'blob',
//       contentType: 'application/zip',
//     })
//       .then((result) => {
//         const downloadUrl = window.URL.createObjectURL(new Blob([result.data]));
//         const link = document.createElement('a');
//         link.href = downloadUrl;
//         link.setAttribute('download', 'file.data');
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//         navigate('/adminDashboard');
//       })
//       .catch((error) => {
//         console.log(error, 'hi');
//       });
//   };

//   // const handleDeleteFile = async (fileId) => {
//   //   try {
//   //     await api.delete(`https://${ngrokUrl}/api/projects/files/${fileId}`);
//   //     displayFile();
//   //   } catch (error) {
//   //     console.log('Error deleting file: ', error);
//   //   }
//   // };

//   const handleDeleteFile = async (helpDocumentId) => {
//     try {
//       await api.delete(`https://${ngrokUrl}/api/projects/files/${helpDocumentId}`);
//       // Remove the deleted file from the namesFile list
//       setNamesFile(prevNamesFile => prevNamesFile.filter(file => file.helpDocumentId !== helpDocumentId));
//     } catch (error) {
//       console.log('Error deleting file: ', error);
//     }
//   };
  

  
//   const loadRepo = async () => {
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/repositories/project/${projectId}`, {});
//       setRepo(response.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     loadRepo();
//   }, []);
//   const loadFigma = async () => {
//     try {
//       const response = await api.get(`https://${ngrokUrl}/api/figmas/project/${projectId}`, {});
//       setFigmaLink(response.data);
//       console.log(figmaLink)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     loadFigma();
//   }, []);
  

//   return (
//     <>
//       {showAddUserProject && (
//         <Modal open={showAddUserProject} onClose={handleCloseAddUserProject}>
//           <AddUserProject projectId={projectId} projectName={projectName} onClose={handleCloseAddUserProject} />
//         </Modal>
//       )}
//       <Modal open={!showAddUserProject} onClose={onClose} style={{top: '120px', left:'280px', width: '600px' }} className="centered-modal">
//         <Modal.Header>
//           Project Details

//           {showAddFileButton && (
//             <Button color="blue" floated="right" onClick={() => onAddFile(projectId, projectName)}>
//               Add File
//             </Button>
//           )}
//           <Button color="red" floated="right" onClick={handleDeleteProject}>
//             Delete
//           </Button>
//           {showConfirmDialog &&(
//           <DialogBox
//             show={showConfirmDialog}
//             onClose={cancelDeleteProject}
//             onConfirm={confirmDeleteProject}
//             title="Delete Project"
//             message="Are you sure you want to delete this project?"
//             afterConfirm={() => navigate('/adminDashboard')}
//           />)}
//           <Modal
//     open={showOTPMoal}
//     onClose={handleOTPClose}
//     style={{ width: '500px', height:'320px' }}
//     className="centered-modal-OTP"
//   >
//     <Modal.Header>Enter OTP</Modal.Header>
//     <Modal.Content>
//       <Form onSubmit={handleOTPSubmit}>
//         <div className="form-field">
//           <label>OTP sent to '+91 9928931610'</label>
//           <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
//         </div>
//         <p>{errorMessage}</p>
//         <Button type="submit" primary>
//           Submit OTP
//         </Button>
//       </Form>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button onClick={handleOTPClose}>Cancel</Button>
//     </Modal.Actions>
//   </Modal>
//         </Modal.Header>
//         <Modal.Content>
//           <Modal.Description>
//           <p>
//               <strong>Project ID:</strong> {projectId}
//             </p>
//             <p>
//               <strong>Project Name:</strong> {projectName}
//             </p>
//             <p><strong>Count of employees: </strong><CountCell projectId={projectId} /></p>
//             <p>
//               <strong>Project Description:</strong> {projectDescription}
//             </p>

//                        <p>

//               <strong>Repo Name:</strong> {repo.length > 0 ? (
//     <ul>
//       {repo.map((repoItem) => (
//         <li key={repoItem.id}>{repoItem.name}</li>
//       ))} 
//     </ul>
    
//   ) : (
//     ''
//   )}
//             </p>
//             <p>
//               <strong>Figma Link:</strong> {figmaLink.length > 0 ? (
//     <ul>
//       <a href={figmaLink}>
//           <li>{figmaLink}</li>
//         </a>
//     </ul>
//   ) : (
//     '-'
//   )}
//             </p>

//             <p>
//   <strong>Help Documents:</strong>
//   {namesFile.length > 0 ? (
//     <ul>
//       {namesFile.map((filename, index) => (
//         <li key={index} className="file-item">
//           <div className="file-info">
//             <a href="#" onClick={() => downloadFile(filename.fileName)}>
//               {filename.fileName}
//             </a>
//           </div>
//           <div className="delete-button">
//             <button
//               className="btn btn-danger"
//               onClick={() => handleDeleteFile(filename.helpDocumentId
//                 )}
//             >
//               <FontAwesomeIcon icon={faTimes} />
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     '-'
//   )}
// </p>


//     <p>
//   <strong>Drive Link</strong> {driveLink ? (
//     <ul>
//       <a href={driveLink}>
//         <li>{driveLink}</li>
//       </a>
//     </ul>
//   ) : (
//     '-'
//   )}
// </p>
//           </Modal.Description>
//         </Modal.Content>
       
//         <Modal.Actions>
//         <Button onClick={handleModalClose}>Close</Button>
//       </Modal.Actions>
//       <Modal open={showOTPMoal} onClose={handleOTPClose} style={{ width: '500px' }} className="centered-modal-OTP">
//         <Modal.Header>Enter OTP </Modal.Header>
//         <Modal.Content>
//           <Form onSubmit={handleOTPSubmit}>
//             <div className="form-field">
//               <label>OTP sent to '+91 9928931610'</label>
//               <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} />
//             </div>
//             <p>{errorMessage}</p>
//             <Button type="submit" primary>
//               Submit OTP
//             </Button>
//           </Form>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button onClick={handleOTPClose}>Cancel</Button>
//         </Modal.Actions>
//       </Modal>
//       <DialogBox show={showConfirmDialog} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} />
//       </Modal>
//     </>
//   );
// };
// export default ProjectDetails;


