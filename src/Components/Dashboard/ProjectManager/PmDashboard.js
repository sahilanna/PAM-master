import React, { Fragment } from 'react';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {Button,Icon} from 'semantic-ui-react'
import { Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon,faUser } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer, toast} from 'react-toastify'
import DialogBox from '../DialogBox/DialogBox';
import axios from 'axios';
import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
import PmSidebar from './pmSidebar';
import PmProjectDetails from './pmProjectDetails';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../../Login/Logout';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';


const PmDashboard = () => {
  const [item, setItem] = useState([]);
 
  const [showPmProjectDetails, setShowPmProjectDetails] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [pmid, setPmid] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate()
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 5;
  const [selectedProject, setSelectedProject] = useState(null);
  //const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)
  const  id=user.id
  const pmName=user.name
  
  
 
  console.log(pmName)
  console.log(id)
  
  useEffect(() => {
    handlePaginate(1);
  }, [item]);
  useEffect(() => {
    const fetchPmid = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        // const id = urlParams.get('id');
        const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`);

      console.log(response.data)
      console.log(response.id);
      setIsLoading(false);
      setItem(response.data)
        const  pmid  = response.data;
        setPmid(pmid);
      } catch (error) {
        console.log('Error fetching PMID:', error);
        setIsLoading(true);
      }
    };
    fetchPmid();
  }, []);

  const handleProjectDetails=(project)=>{
    setSelectedProject(project)
    setShowPmProjectDetails(true)

  }

 const handleCloseDetails=()=>{
    setShowPmProjectDetails(false)
  }

  
  // const fetchNotification = async () => {
  //   try {
  //     const response = await api.get(`https://${ngrokUrl}/api/request/notiPM?pmName=${pmName}`);
  //     console.log(response.data);

  //     const pmNotification = response.data;

     
  //       // Show each message as a toast notification
  //       toast.info(pmNotification[0], {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 4000,
  //       });
      
  //   } catch (error) {
  //     console.log('Error fetching PMID:', error);
  //     setIsLoading(true);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotification();
  // }, []);
  const navigateForm=(projectId, projectName)=>{
    navigate('/PmRequestForm',{ state: { projectId, projectName} })
  }
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

      const filteredItems = item && item.filter((item) =>
  item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };
  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='parent-admin'>
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
      <PmSidebar />
    </div>
    <div className='admin-child'>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
        <div class="ui left icon input">
          <input type="text" placeholder="Search Projects..." value={searchQuery} onChange={handleSearchChange}></input>
          <i class="users icon"></i>
        </div>
        <ToastContainer />
      </div>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          <table class="ui celled table">
            <thead>
              <tr>
                <th>Project-Name</th>
                <th>Project-Description</th>
                <th className='text-center'>View</th>
                <th>Add User</th>
              </tr>
            </thead>
            <tbody>
              {pmid && pmid.length > 0 ? (
                currentPageData.map((item, index) => (
                  <tr key={index}>
                    <>
                      <td>{item.projectName}</td>
                      <td>{item.projectDescription}</td>
                      <td className='text-center'>
                        <button
                          className="btn btn-outline-primary mx-2"
                          onClick={() => handleProjectDetails(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td>
                        <Button color="blue" icon labelPosition="left" onClick={() => navigateForm(item.projectId, item.projectName)}>
                          <Icon name="plus" />
                          Add
                        </Button>
                      </td>
                    </>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showPmProjectDetails && (
        <PmProjectDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>
  </div>
);
};
export default PmDashboard;