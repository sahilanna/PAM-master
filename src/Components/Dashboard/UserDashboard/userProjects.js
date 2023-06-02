import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import PmSidebar from '../ProjectManager/pmSidebar';
import UserSidebar from './userSidebar';


function UserProjects() {
    const [item, setItem] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [selectedPmProject, setSelectedPmProject] = useState(null);
    const [showPmProjectDetails, setShowPmProjectDetails] = useState(false);
    const [userid, setUserid] = useState([]);
    
  
    useEffect(() => {
      const fetchUserid = async () => {
        try {
          const response = await axios.get('https://5713-106-51-70-135.ngrok-free.app/api/users/2/role/user/projects',{
            headers : {
              'ngrok-skip-browser-warning': 'true'
        }});
        
          const  userid  = response.data;
          setUserid(userid);
        } catch (error) {
          console.log('Error fetching PMID:', error);
        }
      };
  
      fetchUserid();
    }, []);
  
  
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
    <input type="text" placeholder="Search Projects..."  ></input>
    <i class="users icon"></i>
  </div>
  
  
    
      
      </div>
      
      <div style={{marginLeft:'20px',marginRight:'30px'}}>
      <table class="ui celled table">
         
          <thead>
              <th>Project-ID</th>
              <th>Project-Name</th>
              {/* <th>Project-Description</th> */}
              
              {/* <th>Repository Name</th> */}
              {/* <th>PM Github</th>
              <th>User Github</th>  */}
              <th>project Description</th>
              {/* <th>Edit</th> */}
              
          </thead>
          
          <tbody>
             {userid.map((item, index) => (
      <tr key={index}>
            
            {/* {currentPageData.map((item, index) => (
              <tr> */}
                <td>{item.projectId}</td>
                <td>{item.projectName}</td>
                <td>{item.projectDescription}</td>
               
                
  
       
        
                
              </tr>
             ))}
            
          </tbody>
          {/* {selectedPmProject && (
        <PmProjectDetails
          project={selectedPmProject}
          onClose={handleCloseDetails}
        />
      )}
   */}
        </table>
        </div>
        </div>
  </div>
    )}

export default UserProjects