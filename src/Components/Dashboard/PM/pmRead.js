import React, {useEffect, useState} from 'react'
import { Button, Item, Table } from 'semantic-ui-react'
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


import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact'


export default function PmRead(){
  const navigate = useNavigate();
  // const getUrl =  "https://bc38-106-51-70-135.ngrok-free.app/api/users/role/project_manager";
  const getUrl =  "https://3a5e-106-51-70-135.ngrok-free.app/api/users/role/project_manager";
  const delUrl = "https://3a5e-106-51-70-135.ngrok-free.app/api/projects/delete/3";
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
  const itemsPerPage = 5;

  const { ID } = useParams();
  useEffect(() => {
    loaditem();
  }, []);
  const loaditem = async () => {
    const result = await axios.get(getUrl,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }}) .then((result) => {
        setItem(result.data);
        // console.log(res, "hello");
      })
      .catch((error)=>{
        console.log(error,'hi');
      })
    };

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
      await axios.delete(`https://3a5e-106-51-70-135.ngrok-free.app/api/users/delete/${id}`);
      navigate('/pmRead')
      setShowConfirmDialog(false);
      loaditem();
      navigate('/pmRead')
    };
  return(
<div>
 
<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
  <CDBSidebar textColor="#fff" backgroundColor="#333">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>Project Manager
      </CDBSidebarHeader>
    <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/Admindashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/pmCreate" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="chart-line">Create PM</CDBSidebarMenuItem>
          </NavLink>
          </CDBSidebarMenu>
          </CDBSidebarContent>
          </CDBSidebar>
    {/* <div className="container">
    <div className="py-4"> */}
      <table class="table">
        {/* <thead colspan = '5'>
        </thead> */}
        <thead>
            <th>PM-ID</th>
            <th>PM-Name</th>
            <th>PM-Email</th>
            {/* <th>PM-Github-UserName</th> */}
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
         </thead>
         <tbody>
          {currentPageData.map((item, index) => (
            <tr>
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
   
    
  
)
}


// export default function PmRead(){

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
//           <tbody>
//           <tr>
//               <th className='col'>PM-ID</th>
//               <th className='col'>PM-Name</th>
//               <th className='col'>PM-Email</th>
//               <th className='col'>Update</th>
//               <th className='col'>Delete</th>
//             </tr>
//             {item.map((user, index) => (
//               <tr>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
                
//                 <td>
//                   <Link
//                     className="btn btn-outline-primary mx-2"
//                     to={`/PmUpdate/${user.id}`} 
//                   >
//                     Update
//                   </Link>
//                   </td>
//                   <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(true)}>Delete</button>
//       <DialogBox
//        show={showConfirmDialog}
//         onClose={() => setShowConfirmDialog(false)}
//         onConfirm={()=>deleteUser(user.id)}/>
//         </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   </div>
// )
// }

