import React, { useState,useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import DialogBox from '../DialogBox/DialogBox'
import Pagination from '../Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './Read.css'
import PmDetails from './PmDetails'
import { ngrokUrl } from '../../../Assets/config'
import Sidebar from '../SideBar/SideBar'
import LoadingPage from '../../../Assets/Loader/LoadingPage'
import api from '../api'


function PmReadNew() {

    const navigate = useNavigate();
    const [item, setItem] = useState([]);
  
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentPageData, setCurrentPageData] = useState([]);
    
    const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
    const itemsPerPage = 4;
    console.log(currentPageData);
  
    useEffect(() => {
      loaditem();
    }, []);
   
   

    const loaditem = async () => {
     await api.get(`https://${ngrokUrl}/api/users/role/project_manager`)
       .then((result) => {
          setItem(result.data);
          setIsLoading(false);
        
        
        })
        .catch((error)=>{
          console.log(error,'hi');
          setIsLoading(true);
        })
      };

      const addUserName=()=>{
        navigate('/addPmUserName')
      }
  
      useEffect(() => {
        const filteredProjects = item.filter((project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProjects(filteredProjects);
      }, [searchQuery, item]);

      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
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
        const currentItems =filteredProjects.slice(
          indexOfFirstItem,
          indexOfLastItem
        );
       
        setCurrentPageData(currentItems);
      };
      
  
      const deleteUser = async (id) => {
        await api.delete(`https://${ngrokUrl}/api/users/delete/${id}`);
        navigate('/pmReadNew')
        setShowConfirmDialog(false);
        loaditem();
        navigate('/pmReadNew')
      };
  
  const createOnclick=()=>{
    navigate('/PmCreate')
  }
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const viewActivity=(id ,username)=>{
    // setShowUserActivity(true)
    
    navigate('/userActivity',  { state: { id,username } })

  }

  
  return (

<div className='parent-admin'>
    
   <div >
    <Sidebar/>
    </div>
     
       
    <div className='admin-child'>
    <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search PM..." value={searchQuery}
            onChange={handleSearchChange} ></input>
  <i class="users icon"></i>
</div>
<div>

<button className='ui button' onClick={addUserName}>Add Github UserName</button>
    <button class="ui button" onClick={createOnclick} >Create PM</button>
    </div>
    
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    {isLoading ? (
            <LoadingPage />
          ) : (
    <table class="ui celled table">
       
        <thead>
           
            <th>S.No.</th>
            <th>PM-Name</th>
            <th>PM-Email</th>
          
            <th className='text-center'>View</th>
            
            
            <th className='text-center'>Delete</th>
            <th className='text-center'>Activity</th>
         </thead>
         <tbody>
          {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan='3'>No data available</td>
                  </tr>
          ):(
           currentPageData.map((item, index) => (
    <tr key={item.id}>
          
          
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
             
              <td className='text-center'>
  <button

    className="btn btn-outline-primary mx-2"

    onClick={() => handleViewDetails(item)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>             
         
      <td className='text-center'>
      
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
      <td className='text-center'><button className="btn btn-outline-primary mx-2" 
              onClick={()=>viewActivity(item.id, item.name)}  > <FontAwesomeIcon icon={faEye} /></button>
           
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
        <PmDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>
    </div>

    
  )
}

export default PmReadNew;