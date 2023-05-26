import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import {Link}  from 'react-router-dom'
import { useReducer } from 'react'
import UserCreate from './userCreate'
import NavBar from '../../NavBar'
import Pagination from '../Pagination/Pagination'
import DialogBox from '../DialogBox/DialogBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import UserDetails from './UserDetails'

// import './Read.css'
import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact'
import { ngrokUrl } from '../../../Assets/config'

function UserRead(){
  const navigate = useNavigate();
  const getUrl =  `https://${ngrokUrl}/api/users/role/user`;
  const delUrl = "";
  const [item, setItem] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enumRole,setEnumRole]=useState('3');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 5;
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { ID } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
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
        navigate('/userRead')
      })
      .catch((error)=>{
        console.log(error,'hi');
      })
    };
    useEffect(() => {
      const filteredProjects = item.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filteredProjects);
    }, [searchQuery, item]);

    const handleViewDetails = (project) => {
      setSelectedProject(project);
      setShowProjectDetails(true);
    };
    const createOnclick=()=>{
      navigate('/userCreate')
    }
  
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
      navigate('/userRead')
      setShowConfirmDialog(false);
      loaditem();
      navigate('/userRead')
    };
  return(
<div>
  <h1>Users</h1>
  {/* <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
  <CDBSidebar textColor="#fff" backgroundColor="#333">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}> Users
      </CDBSidebarHeader>
    <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/AdminDashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/userCreate" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="chart-line">Create User</CDBSidebarMenuItem>
          </NavLink>
          </CDBSidebarMenu>
          </CDBSidebarContent>
          </CDBSidebar>
          </div> */}
          {/* <div className="container">
    <div className="py-4"> */}
     <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search PM..."  ></input>
  <i class="users icon"></i>
</div>


    <button class="ui button" onClick={createOnclick} >Create PM</button>
    
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <table class="ui celled table">
        {/* <thead colspan = '5'>
        </thead> */}
        <thead>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            {/* <th>User-Github-UserName</th> */}
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </thead>
          <tbody>
          {filteredProjects.map((user, index) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.githubUsername}</td> */}
              <td>
  <button
    className="btn btn-outline-info mx-2"
    onClick={() => handleViewDetails(user)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>          
              <td>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to={`/userUpdate/${user.id}`}
                >
                <FontAwesomeIcon icon={faPen} />
                </Link>
                </td>
                 <td>
                 <Link>
    <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
    <DialogBox
     show={showConfirmDialog === user.id}
      onClose={() => setShowConfirmDialog(null)}
      onConfirm={()=>deleteUser(user.id)}/>
      </Link>
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
        <UserDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
  </div>
// </div>
// </div>
)
}
export default UserRead;

// function UserRead(){

//     const navigate = useNavigate();
//     const getUrl =  "https://225f-106-51-70-135.ngrok-free.app/api/users/role/user";
    
//     // https://2063-106-51-70-135.ngrok-free.app/api/users/2
//     const delUrl = "";
//     const [item, setItem] = useState([]);
//     const [id, setId] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [enumRole,setEnumRole]=useState('3');
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
//         await axios.delete(`https://225f-106-51-70-135.ngrok-free.app/api/users/delete/${id}`);
//         loaditem();
//       };
//     return(
// <div>
//     <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
//     <CDBSidebar textColor="#fff" backgroundColor="#333">
//       <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>USERS
//         </CDBSidebarHeader>
//       <CDBSidebarContent className="sidebar-content">
//           <CDBSidebarMenu>
//             <NavLink exact to="/" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/Roles" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user">Role</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/userCreate" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="chart-line">Create User</CDBSidebarMenuItem>
//             </NavLink>
//             </CDBSidebarMenu>
//             </CDBSidebarContent>
//             </CDBSidebar>
//             <div className="container">
//       <div className="py-4">
//         <table className="table border shadow">
//           {/* <thead colspan = '5'>
//           </thead> */}
//           <tbody>
//           <tr>
//               <th className='col'>User ID</th>
//               <th className='col'>User Name</th>
//               <th className='col'>User Email</th>
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
//                     to={`/userUpdate/${user.id}`}
//                   >
//                     Update
//                   </Link>
//                   </td>
//                    <td>
//                   <button className="btn btn-danger mx-2"
//                     onClick={() => deleteUser(user.id)}>
//                     Delete
//                   </button>
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
// export default UserRead;
