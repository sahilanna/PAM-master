import React, { useState, useEffect } from 'react';

import { Button, Form, Dropdown, Input, Icon } from 'semantic-ui-react';

import FigmaCreate from './FigmaCreate';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import './FigmaRead.css'
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../../Pagination/Pagination';


import { faTrash,  faUser, faStreetView } from '@fortawesome/free-solid-svg-icons';
import ViewUserVerification from './viewUserVerification';



function FigmaRead() {
  const [userData, setUserData] = useState({
    user: '',
    screenshotImageURL: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const[figmaURL, setFigmaURL]=useState('')
  const[figmaId, setFigmaId]=useState('')
  const[projectId, setProjectId]=useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 5;
  const[showConfirmDialog, setShowConfirmDialog]=useState(false)
  const [imageData, setImageData] = useState(null);
  const [showVerificationImage, setShowVerificationImage] = useState(false);
  const [showModall, setShowModall] = useState(false); // State for modal visibility
  const [modalImage, setModalImage] = useState(null); 
  const[figmaIdVerify, setFigmaIdVerify]=useState(null)
  


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/figmas/getAll`);
      setProjects(response.data);
      setFigmaId(response.data[0].figmaId);
      setIsLoading(false);
      setFilteredProjects(response.data);
    } catch (error) {
      console.log('Error fetching projects:', error);
      setIsLoading(true)
    }
  };




  
  const handleDisplayVerification = async (figmaId) => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/figmas/${figmaId}/screenshots`);
      const data = response.data; // Assuming response.data is the array of objects
  
      if (data.length > 0) {
        const screenshotImageURL = data[0].screenshotImageURL;
        const user = data[0].user;
  
        // Trigger image download
        const link = document.createElement('a');
        link.href = screenshotImageURL;
        link.download = `${user}_screenshot.png`;
        link.click();
      } else {
        console.error('No data found');
      }
    } catch (error) {
      console.error('Error handling display verification:', error);
    }
  };

// useEffect(() => {
//   downloadFile();
// }, []);





  const createFigma = () => {
    navigate('/createFigmaDetails', { state: { figmaId } });
  };

  const handleAddUser = (url, id, projectId, figmaId) => {
    setFigmaURL(url);
    setFigmaId(id);
    setProjectId(projectId);
    setShowModal(true);
  };

  const handleDeleteUrl = async (figmaId) => {
    try {
      await api.delete(`https://${ngrokUrlSwe}/api/figmas/${figmaId}`);
      navigate('/FigmaRead');
      setShowConfirmDialog(false);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModall(false)
  };
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
    const filteredItems = projects.filter((item) =>
      item.projectDTO.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredItems);
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };
  const filteredItems = projects.filter((item) =>
    item.projectDTO.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    handlePaginate(1);
  }, [filteredProjects]);

  
  return (
    <div className='parent-admin'>
      <Sidebar/>
      <div className='admin-child'>
        <br/>
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
          ) : filteredProjects.length === 0 ? (
            <p>No data available</p>
          ) : (
            <>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Project Name</th>
                    <th>Figma URL</th>
                    <th className="text-center">User verification</th>
                    <th className="text-center">Delete URL</th>
                    <th className="text-center">View User verification</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((project, index) => (
                    <tr key={project.figmaId}>
                      <td>{index + 1}</td>
                      <td>{project.projectDTO.projectName}</td>
                      <td>
                        <a href={project.figmaURL} target="_blank" rel="noopener noreferrer">
                          {project.figmaURL}
                        </a>
                      </td>
                      <td className="text-center">

                        <button className="btn btn-outline-primary mx-2" onClick={() => handleAddUser(project.figmaURL, project.figmaId, project.projectDTO.projectId)}>

                          <FontAwesomeIcon icon={faUser} />
                        </button>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-danger mx-2" onClick={() => setShowConfirmDialog(project.figmaId)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <DialogBox
                          show={showConfirmDialog === project.figmaId}
                          onClose={() => setShowConfirmDialog(null)}
                          onConfirm={() => handleDeleteUrl(project.figmaId)}
                        />
                      </td>
                      <td className="text-center">
  <button
    className="btn btn-outline-primary mx-2"
    onClick={() => handleDisplayVerification(project.figmaId)}
  >
    <FontAwesomeIcon icon={faStreetView} />
  </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className='pagination'>
                <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
              </div>
            </>
          )}
        </div>

      </div>
      <div className='model-container'>
        <div className="modal-content-container">
          {showModal && <FigmaCreate onClose={closeModal} figmaURL={figmaURL} figmaId={figmaId} projectId={projectId} />}
        </div>
       
       

      </div>
      
    </div>
  );
}

export default FigmaRead;
