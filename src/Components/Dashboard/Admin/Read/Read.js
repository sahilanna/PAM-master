import 'semantic-ui-css/semantic.min.css';
import React, {useEffect, useState, dispatch} from 'react'
import { Form,Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import Create from '../Create/Create'
// import Create from '../../Roles/Create/Create'
import {Link, Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import Update from '../Update/Update'
import Select from 'react-select'
import DialogBox from '../../DialogBox/DialogBox'
import PaginationComponent from '../../Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './Read.css'
import ProjectDetails from './ProjectDetails'
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';





export default function Read(){
  const navigate=useNavigate()
 // const getUrl =  `https://${ngrokUrl}/api/project-details/get`
  const delUrl = `https://${ngrokUrl}/api/projects/delete/3`
  const [item, setItem] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const[dataa,setDataa]=useState('')
  
  
  const [repoName, setRepoName] = useState('');
  const [pmGithubUsername, setPmGithubUsername] = useState('');
  const [userGithubUsername, setUserGithubUsername] = useState('');
  

  
  const itemsPerPage = 5;
  const { id } = useParams();

  const loaditem = async () => {
  const result = await axios.get(`https://${ngrokUrlSwe}/api/projecs/allProjects`,{
      headers: {
      
        'ngrok-skip-browser-warning': 'true'
      }}) .then((result) => {
      setDataa(result.data);
     
    })
    .catch((error)=>{
      console.log(error,'hi');
    })
  }
  useEffect(() => {
    loaditem();
}, []);

useEffect(() => {
  const filteredProjects = item.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredProjects(filteredProjects);
}, [searchQuery, item]);



const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

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

  
  const deleteUser = async (projectId) => {
    await axios.delete(`https://${ngrokUrl}/api/project-details/delete/${projectId}`);
    navigate('/Read')
    setShowConfirmDialog(false);
    loaditem();
};
  return(
  
    <div>
      <Sidebar/>
     
      <table class="table">
        <thead>
            <th>Project-ID</th>
            <th>Project-Name</th>
            {/* <th>Project-Description</th>
            <th>Repository Name</th>
            <th>PM Github</th>
            <th>User Github</th> */}
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
        </thead>
        
        <tbody>
          {dataa.map((item, index) => (
            <tr>
              <td>{item.projectId}</td>
              <td>{item.projectName}</td>
              {/* <td>{item.projectDescription}</td>
              <td>{item.repoName}</td>
              <td>{item.pmGithubUsername}</td>
              <td>{item.userGithubUsername}</td> */}
             
              {/* <td>
  <button
    className="btn btn-outline-info mx-2"
    onClick={() => loaditem(item.projectId)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td> */}
              <td>
  <button
    className="btn btn-outline-info mx-2"
    onClick={() => handleViewDetails(item)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>             
              <td>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to={`/Update/${item.projectId}`}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Link>
                </td>
                 <td>
                {/* <button className="btn btn-danger mx-2"
                  onClick={() => deleteUser(user.projectId)}
                  > */}
{/*
          <button onClick={() => setShowConfirmDialog(true)}>Delete Item</button>
    <ConfirmDialog
      show={showConfirmDialog}
      onClose={() => setShowConfirmDialog(false)}
      onConfirm={handleDelete}/> */}
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
      <PaginationComponent
      data={item} itemsPerPage={itemsPerPage} paginate={handlePaginate}
      />
    </div>
    {showProjectDetails && (
        <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>
 )
}
 