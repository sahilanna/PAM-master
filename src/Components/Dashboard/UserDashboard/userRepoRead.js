import React from 'react'
import UserSidebar from './userSidebar'
import { ngrokUrlSwe } from '../../../Assets/config';
import axios from 'axios';
import {useState, useEffect} from 'react'


function UserRepoRead() {

const[repoUserData, setRepoUserData]=useState('')


  useEffect(() => {
       
    const fetchrepoid = async () => {
      try {
        const response = await axios.get(`https://${ngrokUrlSwe}/api/users/54/role/user/projects`,{
          headers : {
            'ngrok-skip-browser-warning': 'true'
      }});

      
        const  repoid  = response.data;
        setRepoUserData(repoid);
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };

    fetchrepoid();
  }, []);
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
<div style={{paddingLeft:'660px',paddingTop:'20px'}}>
  

</div>
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
         {repoUserData.map((item, index) => (
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
export default UserRepoRead