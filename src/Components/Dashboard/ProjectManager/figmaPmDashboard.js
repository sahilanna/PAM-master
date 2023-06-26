import React from 'react'
import PmSidebar from './pmSidebar';
import axios from 'axios';
import { ngrokUrl} from '../../../Assets/config';
import { useState,useEffect } from 'react';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';


function FigmaPmDashboard() {
  const [result, setResult]=useState([])
  const [isLoading, setIsLoading] = useState(true);
  const fetchFigma = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/552/role/project_manager/projects`);
      const  data  = response.data;
      console.log('data',data)
      setIsLoading(false);
      setResult(data);
      console.log('result',result)
    } catch (error) {
      console.log('Error fetching PMID:', error);
      setIsLoading(true);
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
  {isLoading ? (
            <LoadingPage />
          ) : (
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
    )}
    </div>
    </div>
  </div>
      )
    }
export default FigmaPmDashboard;