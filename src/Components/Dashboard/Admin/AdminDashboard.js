import React, {useEffect, useState, dispatch} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import DialogBox from '../DialogBox/DialogBox';
import ProjectDetails from './Read/ProjectDetails';
import 'semantic-ui-css/semantic.min.css';
import Pagination from '../Pagination/Pagination';



import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import NavBarA from './NavbarA';
import Read from './Read/Read';
import { ngrokUrl } from '../../../Assets/config';

const AdminDashboard = () => {

  const navigate=useNavigate()
  const getUrl =  `https://${ngrokUrl}/api/project-details/get`
  const delUrl = `https:/${ngrokUrl}/api/projects/delete/3`
  const [item, setItem] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const[file,setFile]=useState(null);
  
  const [repoName, setRepoName] = useState('');
  const [pmGithubUsername, setPmGithubUsername] = useState('');
  const [userGithubUsername, setUserGithubUsername] = useState('');

  
  const itemsPerPage = 5;
  const { id } = useParams();

  const loaditem = async () => {
  const result = await axios.get(getUrl,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }}) .then((result) => {
      setItem(result.data);
      // handleViewDetails(result.data);
      // setSelectedProject(result.data);
      // console.log(res, "hello");
    })
    .catch((error)=>{
      console.log(error,'hi');
    })
  }
  useEffect(() => {
    loaditem();
}, []);

const handleViewDetails = (project) => {
  setSelectedProject(project);
  setShowProjectDetails(true);
};

const handleCloseDetails = () => {
  setShowProjectDetails(false);
};

React.useEffect(() => {
  handlePaginate(1);
}, [item]);

console.log(item);
const handlePaginate = (pageNumber) => {
  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
  setCurrentPageData(currentItems);
};
//posts=item

  
  const deleteUser = async (projectId) => {
    await axios.delete(`https://${ngrokUrl}/api/project-details/delete/${projectId}`);
    navigate('/AdminDashboard')
    setShowConfirmDialog(false);
    loaditem();
};



  return (
      <div>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        {/* Set flex: 1 to create a container for the sidebar */}
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/LandingPage" className="text-decoration-none" style={{ color: 'inherit' }}>
                PAM
              </a>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
                </NavLink>

                {/* <NavLink exact to="/tables" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Notifications</CDBSidebarMenuItem>
                </NavLink> */}

                {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
                </NavLink> */}
                <NavLink exact to="/CreateRepo" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chart-line">Create Repository</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/Create" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Create Project</CDBSidebarMenuItem>
                </NavLink>

                <div className='row'>
                  <NavDropdown title="Role">
                    <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/pmRead">Project Manager</NavDropdown.Item>
                    <NavDropdown.Item style={{ color: 'black' }} as={Link} to="/userRead">User</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              ></div>
            </CDBSidebarFooter>
          </CDBSidebar>
       
        <table class="table">
        <thead>
            <th>Project-ID</th>
            <th>Project-Name</th>
            <th>Project-Description</th>
            <th>File</th>
            {/* <th>Repository Name</th> */}
            {/* <th>PM Github</th>
            <th>User Github</th>  */}
            <th>View</th>
            {/* <th>Edit</th> */}
            <th>Delete</th>
        </thead>
        
        <tbody>
          {currentPageData.map((item, index) => (
            <tr>
              <td>{item.projectId}</td>
              <td>{item.projectName}</td>
              <td>{item.projectDescription}</td>
              <td>{item.file}</td>
         
              <td>
  <button
    className="btn btn-outline-info mx-2"
    onClick={() => handleViewDetails(item)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>             
              {/* <td>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to={`/Update/${item.projectId}`}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Link>
                </td> */}
                 <td>
              <Link>
      <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(item.projectId)}><FontAwesomeIcon icon={faTrash} /></button>
      <DialogBox
       show={showConfirmDialog === item.projectId}
        onClose={() => setShowConfirmDialog(null)}
        onConfirm={()=>deleteUser(item.projectId)}/>
        </Link>
        </td>
        </tr> ))}
        </tbody>
      </table>
      <div>
      {/* Display items for the current page */}
      {/* <div className='pagination'>
      <Pagination
      data={item} itemsPerPage={itemsPerPage} paginate={handlePaginate}
      />
    </div> */}
    {showProjectDetails && (
        <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>


        </div>  
      </div>
    
  );
};

export default AdminDashboard;
