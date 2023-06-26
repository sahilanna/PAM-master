import React from 'react'
import UserSidebar from './userSidebar'
import { useState,useEffect } from 'react';
import {Button,Icon} from 'semantic-ui-react'
import { Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon,faUser } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
import axios from 'axios';
import LoadingPage from '../../../Assets/Loader/LoadingPage';


function UserFigmaRead() { 


  const[figmaUser,setfigmaUser]=useState('')
  const [isLoading, setIsLoading] = useState(true);

  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)
    const  id=user.id
  console.log(id)
    


  const fetchPmid = async () => {

 
      
  try {
    
    const urlParams = new URLSearchParams(window.location.search);
    // const id = urlParams.get('id');
    const response = await axios.get(`https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`,{
      headers : {
        'ngrok-skip-browser-warning': 'true',
        AccessToken: accessToken
  }});
  console.log(response.data)
  console.log(response.id);
  setIsLoading(false);

    setfigmaUser(response.data);
  } catch (error) {
    console.log('Error fetching PMID:', error);
    setIsLoading(true);
  }
};


useEffect(() => {
  fetchPmid();
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
    </div>
    
    
      
        
        </div>
        
        <div style={{marginLeft:'20px',marginRight:'30px'}}>
        {isLoading ? (
            <LoadingPage />
          ) : (
           
        <table class="ui celled table">
       
            <thead>
                <th>Project Name</th>
                <th>Figma URL</th>
                
                
                {/* <th>Repository Name</th> */}
                {/* <th>PM Github</th>
                <th>User Github</th>  */}
                
                {/* <th>Edit</th> */}
                
            </thead>
            <tbody>
  {figmaUser && figmaUser.length > 0 ? (
    figmaUser.map((item, index) => (
      <tr key={index}>
        {item.projectName && item.figmaUrl > 0 ? (
          <>
            <td>{item.projectName}</td>
            <td>{item.figmaUrl}</td>
          </>
        ) : (
          <>
            <td></td>
            <td></td>
          </>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2">No data available</td>
    </tr>
  )}
</tbody>
            
           
          </table>
          )}
          </div>
          </div>
    
        </div>
  )
}

export default UserFigmaRead