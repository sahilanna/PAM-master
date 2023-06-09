import React, { Fragment } from 'react';
import { useState,useEffect } from 'react';
// import Projects from '../Admin/Home';
import { NavLink } from 'react-router-dom';
// import './AdminDashboard.css';
import {Button,Icon} from 'semantic-ui-react'
import { Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon,faUser } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import DialogBox from '../DialogBox/DialogBox';
import axios from 'axios';
import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
import PmSidebar from './pmSidebar';
import PmProjectDetails from './pmProjectDetails';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../../Login/Logout';

  

const PmDashboard = () => {
 
  const [item, setItem] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedPmProject, setSelectedPmProject] = useState(null);
  const [showPmProjectDetails, setShowPmProjectDetails] = useState(false);
  const [pmid, setPmid] = useState([]);
  const navigate=useNavigate()
  const { id } = useParams();

  useEffect(() => {
    const fetchPmid = async () => {
      
      try {
        
        const urlParams = new URLSearchParams(window.location.search);
        // const id = urlParams.get('id');
        const response = await axios.get(`https://${ngrokUrlSwe}/api/users/6/role/user/projects`,{
          headers : {
            'ngrok-skip-browser-warning': 'true'
      }});
      console.log(response.id);

     
      
        const  pmid  = response.data;
        setPmid(pmid);
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };

    fetchPmid();
  }, []);

  const navigateForm=()=>{
    navigate('/PmRequestForm')

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
        
       
    
   <PmSidebar/>


     
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
            {/* <th>Repository Name</th> */}
            {/* <th>PM Github</th>
            <th>User Github</th>  */}
            <th>project Description</th>
            <th>Add User</th>
            {/* <th>Edit</th> */}
            
        </thead>
        
        <tbody>
           {pmid.map((item, index) => (
    <tr key={index}>
          
          {/* {currentPageData.map((item, index) => (
            <tr> */}
              <td>{item.projectId}</td>
              <td>{item.projectName}</td>
              <td>{item.projectDescription}</td>
           
              <td>
                    <Button color="blue" icon labelPosition="left" onClick={navigateForm}>
                      <Icon name="plus" />
                      Add
                    </Button>
                  </td>
      
              
            </tr>
           ))}
          
        </tbody>
     

      </table>
      </div>
      </div>
</div>
  )}
  
 
export default PmDashboard;