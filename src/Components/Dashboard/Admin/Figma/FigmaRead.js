


import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown, Input, Icon } from 'semantic-ui-react';
import FigmaCreate from './FigmaCreate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import './FigmaRead.css'
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import DialogBox from '../../DialogBox/DialogBox';

function FigmaRead() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const[figmaURL, setFigmaURL]=useState('')
  const[figmaId, setFigmaId]=useState('')
  const[projectId, setProjectId]=useState('');
  const [currentPageData, setCurrentPageData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
   const itemsPerPage = 5;
   
   
  

 


  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)

    const headers={AccessToken:accessToken}



  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/figmas/getAll`);
      
      console.log(response.data)
      setIsLoading(false)
      setProjects(response.data);
      // console.log(projects)
      // console.log(projects.figmaId)
      // console.log(response.data.figmaId)
      setFigmaId(projects.figmaId)
     
      const projectFigmaId=response.data[0].projectDTO.projectId
      console.log(projectFigmaId)
      
       
      // console.log(figmaId)
      setFilteredProjects(response.data);
    } catch (error) {
      console.log('Error fetching projects:', error); 
      setIsLoading(true)
      
    }
  };

  const handleDeleteUrl=async (figmaId)=>{
    try {
      await api.delete(`https://${ngrokUrl}/api/figmas/${figmaId}`);
      navigate('/FigmaRead');
      setShowConfirmDialog(false);
       fetchProjects()
    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {
    handlePaginate(1);
  }, [projects]);


  useEffect(() => {
    fetchProjects();
  }, []);

  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
  };
  const handleFilterItems = (searchQuery) => {
    // const filteredItems = projects.filter((item) =>
    //   item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      const filteredItems = projects && projects.filter((item) =>
  item.projectDTO.projectName.toLowerCase().includes(searchQuery.toLowerCase())

    );
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };
  const filteredItems = projects.filter((item) =>
    item.projectDTO.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  )
   

    
  // useEffect(() => {
  //   const filteredProjects = projects.filter((project) =>
  //     project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   setFilteredProjects(filteredProjects);
  // }, [searchQuery, projects]);
  const createFigma = () => {
    navigate('/createFigmaDetails', { state: { figmaId } });
  };
  const handleAddUser = (url, id, projectId, figmaId) => {
    setFigmaURL(url);
    setFigmaId(id);
    setProjectId(projectId);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className='parent-admin'>
      <Sidebar/>
      <div className='admin-child'>
        <br/>
        <h1 style={{ textAlign: 'center' }}>Figma</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginBottom: '30px',
            marginLeft: '40px',
            marginRight: '30px',
          }}
        >
          
          <div className="ui left icon input">
            <input type="text" placeholder="Search repo..." value={searchQuery} onChange={handleSearchChange} />
            <i className="users icon"></i>
          </div>
          <button className="ui button" onClick={createFigma}>
            Create Figma
          </button>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
        {isLoading ? (
            <LoadingPage />
          ) : (
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Figma Id</th>
                <th>Project Name</th>
                <th>Figma URL</th>
                <th>ADD User</th>
                <th>Delete URL</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((project, index) => (
                <tr key={project.figmaId}>
                  <td>{project.figmaId}</td>
                  <td>{project.projectDTO.projectName}</td>
                  <td>
                    <a href={project.figmaURL} target="_blank" rel="noopener noreferrer">
                      {project.figmaURL}
                    </a>
                  </td>
                  <td>
                    <Button color="blue" icon labelPosition="left" onClick={() => handleAddUser(project.figmaURL, project.figmaId, project.projectDTO.projectId)}>
                      <Icon name="plus" />
                      
                    </Button>
                  </td>
                  <td>
                    <Button color="red" icon labelPosition="left" onClick={() => setShowConfirmDialog( project.figmaId)}>
                      <Icon name="minus" />
                      
                    </Button>
                    <DialogBox
                          show={showConfirmDialog === project.figmaId}
                          onClose={() => setShowConfirmDialog(null)}
                          onConfirm={() => handleDeleteUrl(project.figmaId)}
                        />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           )} 
        </div>
      </div>
      <div className='model-container'>
      <div className="modal-content-container">
      {showModal && <FigmaCreate onClose={closeModal} figmaURL={figmaURL} figmaId={figmaId} projectId={projectId} />}

      {/* {showModal && <FigmaCreate onClose={closeModal} figmaURL={figmaURL} figmaId={figmaId} />} */}
    </div>
      </div>
    </div>
  );
}

export default FigmaRead;
