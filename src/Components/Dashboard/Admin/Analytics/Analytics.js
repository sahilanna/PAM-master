import React from 'react'
import { PieChart, Pie, Legend, Tooltip,Cell } from 'recharts';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { ngrokUrl } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';
import { LineChart, Line, XAxis, YAxis} from 'recharts';
import { BarChart, Bar, CartesianGrid,ResponsiveContainer } from 'recharts';

function Analytics() {
const[Data,setData]=useState([])
const [projectCount, setProjectCount]=useState('')




useEffect(() => {
  fetchProjectCount();
}, []);

async function fetchProjectCount() {
  try {
    const response = await axios.get(`https://${ngrokUrl}/api/projects/count`,{headers: {
      'ngrok-skip-browser-warning': 'true'
    }});
    setProjectCount(response.data);
  } catch (error) {
    console.log('Error fetching project count:', error);
  }
}

const fetchCount = async () => {
    try {
      const [adminResponse, pmResponse, userResponse] = await Promise.all([
        axios.get(`https://${ngrokUrl}/api/users/count/admin`,{
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          }),
          axios.get(`https://${ngrokUrl}/api/users/count/user`,{
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          }),
        axios.get(`https://${ngrokUrl}/api/users/count/project_manager`,{
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          }),
       
      ]);

      const adminCount = adminResponse.data;
      const pmCount = pmResponse.data;
      const userCount = userResponse.data;
      console.log(adminCount)
      console.log(pmCount)
      console.log(userCount)

      setData([
        { name: 'Admins', count: adminCount },
        { name: 'Project Managers', count: pmCount },
        { name: 'Users', count: userCount }
      ]);
      console.log(Data)
    } catch (error) {
      console.error(error);
    }


}
    



useEffect(()=>{
fetchCount();
}, []);

 

      const COLORS = ['#FFBB28', '#FF8042', '#0088FE']; 
  return (
    <div className='parent-admin'>
        
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <Sidebar/>
          </div>
          
          {/* <div className='admin-child'></div> */}
    <div style={{align: "center"}}> 
        <h3>Count of all Admin, Project Manager and User in platform</h3>
        
        <PieChart width={440} height={400}>
            
    <Pie
      dataKey="count"
      data={Data}
      cx={200}
      cy={200}
      outerRadius={80}
      fill="#8884d8"
      label
    >
     {Data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
    <Tooltip />
    <Legend />
  </PieChart></div>
  <div style={{ width: '100%', height: 300 }}>
  <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={projectCount}>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  )
}

export default Analytics