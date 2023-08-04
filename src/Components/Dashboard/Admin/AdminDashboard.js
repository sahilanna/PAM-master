import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faUserCircle,faUserAstronaut} from '@fortawesome/free-solid-svg-icons';
import ProjectDetails from './Read/ProjectDetails';
import 'semantic-ui-css/semantic.min.css';
import Pagination from '../Pagination/Pagination';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import { CSVLink } from 'react-csv';
import Sidebar from '../SideBar/SideBar';
import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
import './AdminDashboard.css';
import { Button } from 'semantic-ui-react';
import api from '../api';
import ProjectPms from './Read/projectPms';
import ProjectUsers from './Read/projectUsers';
import AdminHeader from './adminHeader';
import PmRequestUser from './PmRequests/PmRequestUser';
import useApiData from './PmRequests/interval';



const AdminDashboard = () => {

  const { requestData, Loading } = useApiData();
   const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addEmployeeButtonVisible, setAddEmployeeButtonVisible] = useState(false);
  const [addFileButtonVisible, setAddFileButtonVisible] = useState(false);
  const [showProjectUsersModal, setShowProjectUsersModal] = useState(false);
  const [showProjectPmModal, setshowProjectPmModal]=useState(false)

  const navigate = useNavigate();
  const itemsPerPage = 3;
  
  useEffect(() => {
    loadItems();
  }, []);


  const loadItems = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/allProjects`, {});
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
      
    }
  };
  
  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    handlePaginate(1);
  }, [item]);

  const csvDataProj =

 item.map((entry) => ({
    'project Id': entry.projectId,
    'project Name': entry.projectName,
    'project Description': entry.projectDescription,
  }));

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
    setAddEmployeeButtonVisible(true);
    setAddFileButtonVisible(true);
  };

  const handleCloseDetails = () => {
    setShowProjectDetails(false);
    setAddEmployeeButtonVisible(false);
    setAddFileButtonVisible(false);
  };
  const addFile = async (projectId, projectName) => {
    
    navigate('/addFile', { state: { projectId, projectName } });
  };

  const createOnclick = () => {
    navigate('/CreateProject');
  };

  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };

  const handleOpenProjectUsers = (project) => {
    setSelectedProject(project);
    setShowProjectUsersModal(true);
  };

  const handleCloseProjectUsers = () => {
    setShowProjectUsersModal(false);
  }

  const handleCloseProjectPms=()=>{
    setshowProjectPmModal(false)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
  };

  const handleOpenProjectPms=(project)=>{
    setSelectedProject(project);
    setshowProjectPmModal(true);

  }

  const handleFilterItems = (searchQuery) => {
    const filteredItems = item.filter((item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };

  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteUser = async (projectId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/delete/${projectId}`);
      navigate('/adminDashboard')
      loadItems();
       
    } catch (error) {
      console.log(error);
    }
  };

  


  return (
    <div className="parent-admin">
     


      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <Sidebar />
      </div>
      <div className="admin-child">
      
      <AdminHeader/>
      
      
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div className="ui left icon input">
            <input type="text" placeholder="Search Project..." value={searchQuery} onChange={handleSearchChange} />
            <i className="users icon"></i>
          </div>
          <div className="button-container">
            {item.length > 0 && (
              <div>
                <button className="ui button" onClick={createOnclick}>Create Project</button>
                <Button>
                  <CSVLink data={csvDataProj} filename="user_project_list.csv">
                    Download CSV
                  </CSVLink>
                </Button>
                <ToastContainer/>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <table className="ui celled table">
                <thead>
                  <tr>
                    
                    <th>S.No.</th>
                    <th>Project-Name</th>
                    
                    <th className="text-center">View</th>
                    <th className="text-center">Users</th>
                    <th className="text-center">PMs</th>
            
                  </tr>
                </thead>
                <tbody>
                {currentPageData.length === 0 ? (
    <tr>
      <td colSpan="5" >
        No data available
      </td>
    </tr>
  ) : (
                  currentPageData.map((item, index) => (
                    <tr key={item.projectId}>
                      
                      <td>{index+1}</td>
                      <td>{item.projectName}</td>
                      
                      <td className="text-center">
                        <button className="btn btn-primary mx-2" onClick={() => handleViewDetails(item)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      
                      <td className="text-center">
                      <button className="btn btn-primary mx-2" onClick={() =>  handleOpenProjectUsers(item)}>
                      <FontAwesomeIcon icon={faUserAstronaut} />
                      </button>
                          
                      <ProjectUsers
        open={showProjectUsersModal}
        onClose={handleCloseProjectUsers}
        projectId={selectedProject?.projectId}
        projectName={selectedProject?.projectName}
      />
                     
                      
                       </td>

                        
                      <td className="text-center">
                      <button className="btn btn-primary mx-2" onClick={() =>  handleOpenProjectPms(item)}>
                      <FontAwesomeIcon icon={faUserCircle} />
                      </button>
                          
                      <ProjectPms
        open={showProjectPmModal}
        onClose={handleCloseProjectPms}
        projectId={selectedProject?.projectId}
        projectName={selectedProject?.projectName}
      />
                     
                      
                       </td>
                    </tr>
                  )))}
                </tbody>
              </table>
              <div className="pagination">
                <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
              </div>
              {showProjectDetails && (
  <ProjectDetails
    project={selectedProject}
    onClose={handleCloseDetails}
    showAddEmployeeButton={addEmployeeButtonVisible}
    showAddFileButton={addFileButtonVisible}
    onAddFile={addFile}
    onDeleteProject={deleteUser}
  />
)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

























































