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
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './Read.css'
import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact'

function UserRead(){
  const navigate = useNavigate();
  const getUrl =  "https://f44c-106-51-70-135.ngrok-free.app/api/users/role/user";
  const delUrl = "";
  const [item, setItem] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enumRole,setEnumRole]=useState('3');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
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
        navigate('/userRead')
      })
      .catch((error)=>{
        console.log(error,'hi');
      })
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
      await axios.delete(`https://f44c-106-51-70-135.ngrok-free.app/api/users/delete/${id}`);
      navigate('/userRead')
      setShowConfirmDialog(false);
      loaditem();
      navigate('/userRead')
    };
  return(
<div>
  <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
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
          {/* <div className="container">
    <div className="py-4"> */}
      <table class = "table">
        {/* <thead colspan = '5'>
        </thead> */}
        <thead>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User-Github-UserName</th>
            <th>Update</th>
            <th>Delete</th>
          </thead>
          <tbody>
          {currentPageData.map((user, index) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.githubUsername}</td>
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
    <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(true)}><FontAwesomeIcon icon={faTrash} /> </button>
    <DialogBox
     show={showConfirmDialog}
      onClose={() => setShowConfirmDialog(false)}
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
