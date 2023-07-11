import React, {useEffect, useState} from 'react'
import { Button,  Table } from 'semantic-ui-react'
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
import Sidebar from '../SideBar/SideBar'
import LoadingPage from '../../../Assets/Loader/LoadingPage'
import api from '../api'



import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config'

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
  const itemsPerPage = 4;
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { ID } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loaditem();
  }, []);

  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)

    const headers={AccessToken:accessToken}


  const addUserName=()=>{
    navigate('/addUserName')
  }

  const loaditem = async () => {
    const result = await api.get(getUrl) .then((result) => {
        setItem(result.data);
        setIsLoading(false);
        navigate('/userRead')
      })
      .catch((error)=>{
        console.log(error,'hi');
        setIsLoading(true);
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

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

      const handlePaginate = (pageNumber) => {
      const indexOfLastItem = pageNumber * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentPageData(currentItems);
    };

    const deleteUser = async (id) => {
      await api.delete(`https://${ngrokUrl}/api/users/delete/${id}`);
      navigate('/userRead')
      setShowConfirmDialog(false);
      loaditem();
      navigate('/userRead')
    };

  return(
  <div className='parent-admin'>
  <div>
    <Sidebar/>
  </div>
 
  <div className='admin-child'>
     <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search user..." value={searchQuery}
            onChange={handleSearchChange} ></input>
  <i class="users icon"></i>
</div>
    
    <div>
    <button className='ui button' onClick={addUserName}>Add Github UserName</button>
    <button class="ui button" onClick={createOnclick} >Create User</button>
    </div>
    
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    {isLoading ? (
            <LoadingPage />
          ) : (
    <table class="ui celled table">
        
        <thead>
           
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            
            <th className='text-center'>View</th>
            
            <th className='text-center'>Delete</th>
          </thead>
          <tbody>
          {filteredProjects.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center">
        No data available
      </td>
    </tr>
  ) : (
          
          filteredProjects.map((user, index) => (
            <tr>
              {/* <td>{user.id}</td> */}
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.githubUsername}</td> */}
              <td className='text-center'>
  <button
    className="btn btn-primary mx-2"
    onClick={() => handleViewDetails(user)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>          
              
                 <td className='text-center'>
                 
    <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
    <DialogBox
     show={showConfirmDialog === user.id}
      onClose={() => setShowConfirmDialog(null)}
      onConfirm={()=>deleteUser(user.id)}/>

              </td>
            </tr>
          )))}
        </tbody>
      </table>
          )}
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
 </div>
// </div>
)
}
export default UserRead;


