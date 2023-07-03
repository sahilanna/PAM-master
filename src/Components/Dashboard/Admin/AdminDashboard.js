import React, {useEffect, useState, dispatch} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye, faUpload, faFile, faUser } from '@fortawesome/free-solid-svg-icons';
import DialogBox from '../DialogBox/DialogBox';
import ProjectDetails from './Read/ProjectDetails';
import 'semantic-ui-css/semantic.min.css';
import Pagination from '../Pagination/Pagination';
import PmReadNew from '../PM/PmReadNew';
import userHistory from './userHistory/userHistory';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import { CSVLink } from 'react-csv';
import Sidebar from '../SideBar/SideBar';
import NavBarA from './NavbarA';
import Read from './Read/Read';
import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
import "./AdminDashboard.css"
import { Button } from 'semantic-ui-react';
import api from '../api';
import AddFile from './Create/addFile';
import ProjectUsers from './Read/projectUsers';



const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileDialog, setShowFileDialog]=useState(false)
  const [viewUserBox, setViewUserBox]=useState(false)


  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)
  
  // let data = sessionStorage.getItem("item");
  // let user = JSON.parse(data);
  // const accessToken=user.token
  // console.log(user)
  //   console.log(user.token)
  const navigate = useNavigate();
  // const getUrl = `https://${ngrokUrl}/api/projects/allProjects`;
  const itemsPerPage = 5;
  const { id } = useParams();  

  const loadItems = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/allProjects`, {
      });

      
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

  const addFile=async (projectId, projectName)=>{
    console.log(projectId)
    setShowFileDialog(true);
  navigate('/addFile' , { state: { projectId , projectName} })
}
  const csvDataProj = item.map((entry) => ({
    'project Id': entry.projectId,
    'project Name': entry.projectName,
    'project Description': entry.projectDescription
  }));
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };
  const handleCloseDetails = () => {
    setShowProjectDetails(false);
  };
  const createOnclick = () => {
    navigate('/CreateProject');
  };

  const projectUsers=async(projectId)=>{
    console.log(projectId)
    setViewUserBox(true);
  navigate('/projectUsers' , { state: { projectId } })

  }

  const viewFile= async (projectId)=>{

    
      const result = await api.get(`https://${ngrokUrl}/api/projects/files?projectId=${projectId}`,{
      responseType: "blob",
      contentType: 'application/zip'
    }) .then((result) => {
      console.log(result.data)
      const downloadUrl = window.URL.createObjectURL(
        new Blob([result.data])
        
      );
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "file.data");
      document.body.appendChild(link);
      link.click();
      link.remove();

      
         
          // console.log(res, "hello");
          navigate('/adminDashboard')
        })
        .catch((error)=>{
          console.log(error,'hi');
          
        })
      
      
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
    const filteredItems = item.filter((item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };
  const deleteUser = async (projectId) => {
    try {
      await api.delete(`https://${ngrokUrl}/api/projects/delete/${projectId}`);
      navigate('/AdminDashboard');
      setShowConfirmDialog(false);
       loadItems();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className='parent-admin'>
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <Sidebar />
      </div>
      <div className='admin-child'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div className='ui left icon input'>
            <input type='text' placeholder='Search Project...' value={searchQuery} onChange={handleSearchChange} />
            <i className='users icon'></i>
          </div>
          <div>
            {item.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <button className='ui button' onClick={createOnclick}>Create Project</button>
               <Button> <CSVLink data={csvDataProj} filename='user_project_list.csv' >
                  Download CSV
                </CSVLink> </Button>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <table className='ui celled table'>
                <thead>
                  <tr>
                    <th>Project-ID</th>
                    <th>Project-Name</th>
                    <th>Project-Description</th>
                    {/* <th className='text-center'>View</th> */}
                    <th className='text-center'>Delete</th>
                    <th className='text-center'>Add Files</th>
                    <th className='text-center'>View File</th>
                    <th className='text-center'>View Users</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((item, index) => (
                    <tr key={item.projectId}>
                      <td>{item.projectId}</td>
                      <td>{item.projectName}</td>
                      <td>{item.projectDescription}</td>
                      {/* <td className='text-center'>
                        <button
                          className='btn btn-outline-info mx-2'
                          onClick={() => handleViewDetails(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td> */}
                      <td className='text-center'>
                        <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(item.projectId)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <DialogBox
                          show={showConfirmDialog === item.projectId}
                          onClose={() => setShowConfirmDialog(null)}
                          onConfirm={() => deleteUser(item.projectId)}
                        />
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-primary mx-2' onClick={()=>addFile(item.projectId, item.projectName)}>
                         <FontAwesomeIcon icon={faUpload} />
                         </button>
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-primary mx-2' onClick={()=>viewFile(item.projectId)}>
                         <FontAwesomeIcon icon={faFile} />
                         </button>
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-primary mx-2' onClick={()=>projectUsers(item.projectId)}>
                         <FontAwesomeIcon icon={faUser} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <div className='pagination'>
                  <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
                </div>
                {showProjectDetails && (
                  <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;






