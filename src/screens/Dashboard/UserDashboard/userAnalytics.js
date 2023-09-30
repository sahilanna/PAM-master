import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend  } from 'recharts';
import { ngrokUrl } from '../../../network/config';
import api from '../../../network/api';
import UserSidebar from './userSidebar';



function UserAnalytics() {
    let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);
 
  const id=pdata.id
    
        const [projectCount, setProjectCount] = useState('');
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await api.get(`https://${ngrokUrl}/projects/count/user/${id}`);
              setProjectCount(response.data);
              console.log(projectCount)
            } catch (error) {
              console.error('Error fetching project count:', error);
            }
          };
      
          fetchData();
        }, [id]);
        
        const data = [{ name: 'Projects', count: projectCount }];

    
      
  return (
    <div className='parent-admin'>
         <div style={{ height: '100vh', overflow: 'scroll initial' }}>
             <UserSidebar/>
             </div>
            <div className='admin-child'>
              <h2>Number Of Projects Assigned</h2>
              <br/>
              <div style={{paddingLeft:'320px'}}>
         <BarChart width={300} height={400} data={data}>
      <CartesianGrid strokeDasharray="2 2 " />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 5]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
    </div>
    </div>
    </div>
  )
}

export default UserAnalytics