import React from 'react'
import PmSidebar from './pmSidebar';
import axios from 'axios';
import { ngrokUrlSwe } from '../../../Assets/config';
import { useState,useEffect } from 'react';
function FigmaPmDashboard() {
  const [result, setResult]=useState([])
  const fetchFigma = async () => {
    try {
      const response = await axios.get(`https://${ngrokUrlSwe}/api/users/403/role/project_manager/projects`,{
        headers : {
          'ngrok-skip-browser-warning': 'true'
    }});
      const  data  = response.data;
      console.log('data',data)
      setResult(data);
      console.log('result',result)
    } catch (error) {
      console.log('Error fetching PMID:', error);
    }
  };
  useEffect(() => {
  fetchFigma();
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
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Figma URL</th>
      </thead>
      <tbody>
         {result.map((item, index) => (
  <tr key={index}>
        {/* {currentPageData.map((item, index) => (
          <tr> */}
            {console.log(item.figma.figmaUrl)}
            <td>{item.projectName}</td>
            <td>{item.projectDescription}</td>
            <a href={item.figma.figmaURL} target="_blank" rel="noopener noreferrer">{item.figma.figmaURL}
                  </a>
          </tr>
         ))}
      </tbody>
    </table>
    </div>
    </div>
  </div>
      )
    }
export default FigmaPmDashboard;