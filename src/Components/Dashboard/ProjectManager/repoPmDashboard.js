import React from 'react'
import PmSidebar from './pmSidebar'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon,faUser } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './pmDashboard.css'

function RepoPmDashboard() {
  const [repoid, setrepoid] = useState([]);
    
  
  useEffect(() => {
    const fetchPmid = async () => {
      try {
        const response = await axios.get('https://b305-106-51-70-135.ngrok-free.app/api/users/2/role/user/projects',{
          headers : {
            'ngrok-skip-browser-warning': 'true'
      }});
      
        const  data  = response.data;
        setrepoid(data);
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };

    fetchPmid();
  }, []);





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
            <th>Repository ID</th>
            <th>Repository Name</th>
            <th>Repository Description</th>
            
            {/* <th>Repository Name</th> */}
            {/* <th>PM Github</th>
            <th>User Github</th>  */}
            
            {/* <th>Edit</th> */}
            
        </thead>
        
        <tbody>
        
            <tr>
              <td></td>
              <td></td>
              {/* <td></td> */}
              
         
              <td>
  
        
        </td>
        </tr> 
        </tbody>
      </table>
      </div>
      </div>

    </div>
  )
}

export default RepoPmDashboard