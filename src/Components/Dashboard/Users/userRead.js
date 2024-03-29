import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'
import DialogBox from '../DialogBox/DialogBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import UserDetails from './UserDetails'
import Sidebar from '../SideBar/SideBar'
import LoadingPage from '../../../Assets/Loader/LoadingPage'
import api from '../api'




import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config'
import UserActivity from './userActivity'

function UserRead(){
  const navigate = useNavigate();
  const getUrl =  `https://${ngrokUrl}/api/users/role/user`;
  const [item, setItem] = useState([]);
  const[showUserActivity, setShowUserActivity]=useState(false)
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enumRole,setEnumRole]=useState('3');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 4;
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loaditem();
  }, []);

  console.log(currentPageData)
  const addUserName=()=>{
    navigate('/addUserName')
  }

  const loaditem = async () => {
    await api.get(getUrl).then((result) => {
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
    // const viewActivity=(id)={
    //   setShowUserActivity()
    // }
    const createOnclick=()=>{
      navigate('/userCreate')
    }
  
    const handleCloseDetails = () => {
      setShowProjectDetails(false);
    };

    const viewActivity=(id ,username)=>{
      // setShowUserActivity(true)
      
      navigate('/userActivity',  { state: { id,username } })

    }

    React.useEffect(() => {
      handlePaginate(1);
    }, [item]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

      const handlePaginate = (pageNumber) => {
      const indexOfLastItem = pageNumber * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems =filteredProjects.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setCurrentPageData(currentItems);
    };
    const handleCloseUserActivity = () => {
      setShowUserActivity(false);
    }

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
            
            <th className='text-center'>Activity</th>
            <th className='text-center'>Delete</th>
          </thead>
          <tbody>
          {filteredProjects.length === 0 ? (
    <tr>
      <td colSpan='1' className="text-center">
        No data available
      </td>
    </tr>
  ) : (
          
          currentPageData.map((user, index) => (
            <tr key={user.id}>
             
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className='text-center'>
  <button

    className="btn btn-outline-primary mx-2" 

    onClick={() => handleViewDetails(user)}
    
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>        
<td className='text-center'><button className="btn btn-outline-primary mx-2" 
              onClick={()=>viewActivity(user.id, user.name)}  > <FontAwesomeIcon icon={faUserCircle} /></button>
           
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
      
      <Pagination
      data={filteredProjects} itemsPerPage={itemsPerPage} paginate={handlePaginate}
      />
    </div>
    {showProjectDetails && (
        <UserDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
  </div>
 </div>

)
}
export default UserRead;


