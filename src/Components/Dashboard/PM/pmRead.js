import React, {useEffect, useState} from 'react'
import { Button, Item, Sidebar, Table } from 'semantic-ui-react'
import axios from 'axios'
import {Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useReducer } from 'react'
import PmCreate from './pmCreate'
import NavBar from '../../NavBar'
import PmUpdate from './pmUpdate'
import DialogBox from '../DialogBox/DialogBox'
import Pagination from '../Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './Read.css'
import PmDetails from './PmDetails'
import Sidebar from '../SideBar/SideBar'


import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact'
import { ngrokUrl } from '../../../Assets/config'


export default function PmRead(){
  const navigate = useNavigate();
  // const getUrl =  "https://bc38-106-51-70-135.ngrok-free.app/api/users/role/project_manager";
  const getUrl =  `https://${ngrokUrl}/api/users/role/project_manager`;
  const delUrl = "https://77c8-106-51-70-135.ngrok-free.app/api/projects/delete/3";
  const [item, setItem] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enumRole,setEnumRole]=useState('2');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const[githubUsername,setgithubUsername]=useState('')
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
const [filteredProjects, setFilteredProjects] = useState([]);

  const itemsPerPage = 5;

  const { ID } = useParams();
  useEffect(() => {
    loaditem();
  }, []);
  const token = localStorage.getItem('token');

  const loaditem = async () => {
    const result = await axios.get(getUrl,{
        headers: {
          'ngrok-skip-browser-warning': 'true',
           'Authorization': token,
        }}) .then((result) => {
        setItem(result.data);
       
        // console.log(res, "hello");
      })
      .catch((error)=>{
        console.log(error,'hi');
        console.log(token);
      })
    };

    useEffect(() => {
      const filteredProjects = item.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filteredProjects);
    }, [searchQuery, item]);

    console.log(item);

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

    const handlePaginate = (pageNumber) => {
      const indexOfLastItem = pageNumber * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentPageData(currentItems);
    };
    

    const deleteUser = async (id) => {
      await axios.delete(`https://${ngrokUrl}/api/users/delete/${id}`);

      navigate('/pmRead')
      setShowConfirmDialog(false);
      loaditem();
      navigate('/pmRead')
    };

const createOnclick=()=>{
  navigate('/PmCreate')
}

const handleSearch = (event) => {
  setSearchQuery(event.target.value);
};

  return(
<div>
<Sidebar/>
<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
  
  </div>
  
   <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'20px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search PM..."  ></input>
  <i class="users icon"></i>
</div>

      <button className='ui button' onClick={addUserName}>Add Github UserName</button>
    <button class="ui button" >Create PM</button>
    
    </div>
   
     

     


    <div>
      <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <table class="ui celled table">
        {/* <thead colspan = '5'>
        </thead> */}
        <thead>
            <th>PM-ID</th>
            <th>PM-Name</th>
            <th>PM-Email</th>
            {/* <th>PM-Github-UserName</th> */}
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
         </thead>
         <tbody>
           {filteredProjects.map((item, index) => (
    <tr key={index}>
          
          {/* {currentPageData.map((item, index) => (
            <tr> */}
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
             
              <td>
  <button
    className="btn btn-outline-info mx-2"
    onClick={() => handleViewDetails(item)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>             
              <td>
        <Link className="btn btn-outline-primary mx-2" to={`/PmUpdate/${item.id}`}>
          <FontAwesomeIcon icon={faPen} /> 
        </Link>
      </td>
      <td>
      {/* <div className="dialog-backdrop"> */}
        <button className="btn btn-danger mx-2" onClick={() => setShowConfirmDialog(item.id)}>
          <FontAwesomeIcon icon={faTrash} />   
        </button>
        {showConfirmDialog === item.id && (
      <div className="dialog-backdrop">
        <div className="dialog-container">
          <DialogBox
          
            show={showConfirmDialog === item.id}
            onClose={() => setShowConfirmDialog(null)}
            onConfirm={() => deleteUser(item.id)}
          />
        </div>
      </div>
    )}
      </td>
      
              
            </tr>
          ))}
        </tbody>

      </table>
      </div>
     
    <div className='pagination'>
      {/* Display items for the current page */}
      <Pagination
      data={item} itemsPerPage={itemsPerPage} paginate={handlePaginate}
      />
    </div>
    {showProjectDetails && (
        <PmDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>
    </div>
   
    
  
)
}




{/* // export default function PmRead(){

//     const navigate = useNavigate();
//     const getUrl =  "https://b619-106-51-70-135.ngrok-free.app/api/users/role/project_manager";
//     const delUrl = "https://b619-106-51-70-135.ngrok-free.app/api/projects/delete/3";   
//     const [item, setItem] = useState([]);
//     const [id, setId] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [enumRole,setEnumRole]=useState('2');
//     const { ID } = useParams();

//     useEffect(() => {
//       loaditem();
//     }, []);

//     const loaditem = async () => {
//       const result = await axios.get(getUrl,{
//           headers: {
//             'ngrok-skip-browser-warning': 'true'
//           }}) .then((result) => {
//           setItem(result.data);
//           // console.log(res, "hello");
//         })
//         .catch((error)=>{
//           console.log(error,'hi');
//         })
//       };

//       const deleteUser = async (id) => {
//         await axios.delete(`https://cc0f-106-51-70-135.ngrok-free.app/api/users/delete/${id}`);
//         loaditem();
//       };

//     return(
// <div>
// <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
//     <CDBSidebar textColor="#fff" backgroundColor="#333">
//       <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//         </CDBSidebarHeader>
//       <CDBSidebarContent className="sidebar-content">
//           <CDBSidebarMenu>
//             <NavLink exact to="/" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/Roles" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user">Role</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/pmCreate" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="chart-line">Create PM</CDBSidebarMenuItem>
//             </NavLink>
//             </CDBSidebarMenu>
//             </CDBSidebarContent>
//             </CDBSidebar>
//       <div className="container">
//       <div className="py-4">
//         <table className="table border shadow">
//           {/* <thead colspan = '5'>
            
//           </thead> */}
{/* //           <tbody>
//           <tr>
//               <th className='col'>PM-ID</th>
//               <th className='col'>PM-Name</th>
//               <th className='col'>PM-Email</th>
//               <th className='col'>Update</th>
//               <th className='col'>Delete</th>
//             </tr>
//             {item.map((user, index) => ( */}
{/* //               <tr>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
                
//                 <td>
//                   <Link */}
{/* //                     className="btn btn-outline-primary mx-2"
//                     to={`/PmUpdate/${user.id}`} 
//                   >
//                     Update */}
//                 
//           