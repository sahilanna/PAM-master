import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import PmSidebar from '../ProjectManager/pmSidebar';
import UserSidebar from './userSidebar';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../../Login/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';
import PmProjectDetails from '../ProjectManager/pmProjectDetails';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';


function UserProjects() {
  const [item, setItem] = useState([]);
  const [showUserProjectDetails, setShowUserProjectDetails] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const [userid, setUserid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)
  const  id=user.id
console.log(id)
  const navigate=useNavigate()
  const handleLogout=()=>{
    navigate('/Logout')
  }
  useEffect(() => {
    const fetchUserid = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/user/projects`);
      setIsLoading(false)
      console.log(response.data)
        const  userid  = response.data;
        setUserid(userid);
      } catch (error) {
        console.log('Error fetching PMID:', error);
        setIsLoading(true)
      }
    };
    fetchUserid();
  }, []);
  const filteredProjects = userid.filter((item) =>
  item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
);
const handleProjectDetails=(project)=>{
  setSelectedProject(project)
  setShowUserProjectDetails(true)

}

const handleCloseDetails=()=>{
  setShowUserProjectDetails(false)
}


  // const handleViewDetails = (pmid) => {
  //   setSelectedPmProject(pmid);
  //   setShowPmProjectDetails(true);
  // };
  // const handleCloseDetails = () => {
  //   setSelectedPmProject(null);
  //   setShowPmProjectDetails(false);
  // };
  return (
      <div className='parent-admin'>
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
   <UserSidebar/>
      </div>
       <div className='admin-child'>
          <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
        <input
  type="text"
  placeholder="Search Projects..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

  <i class="users icon"></i>
  <div style={{paddingLeft:'660px',paddingTop:'20px'}}>
  </div>
</div>
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    {isLoading ? (
          <LoadingPage />
        ) : (
    <table class="ui celled table">
        <thead>
            {/* <th>Project-ID</th> */}
            <th>Project-Name</th>
            <th>project Description</th>
            <th className='text-center'>View</th>
        </thead>
        <tbody>
  {filteredProjects.length > 0 ? (
    filteredProjects.map((item, index) => (
      <tr key={index}>
        {/* <td>{item.projectId}</td> */}
        <td>{item.projectName}</td>
        <td>{item.projectDescription}</td>
        <td className='text-center'>
                        <button
                          className="btn btn-outline-primary mx-2"
                          onClick={() => handleProjectDetails(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No matching projects found</td>
    </tr>
  )}
</tbody>

      </table>
      )}
      {showUserProjectDetails && (
        <PmProjectDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
      </div>
      </div>
</div>
  )}
export default UserProjects