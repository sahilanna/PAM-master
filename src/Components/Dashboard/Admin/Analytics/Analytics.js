import React from 'react'
import { PieChart, Pie, Legend, Tooltip,Cell } from 'recharts';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { ngrokUrl } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';
import { LineChart, Line, XAxis, YAxis} from 'recharts';
import { BarChart, Bar, CartesianGrid,ResponsiveContainer } from 'recharts';
import ProjectAnalytics from './projectAnalytics';
import './Analytics.css'

function Analytics() {
  const[Data,setData]=useState([])
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
      <div className='parent-adm'>
        <div className='Analytics-side' style={{ height: '100vh', overflow: 'scroll initial' }}>
          <Sidebar/>
            </div>
         <div className='try'>
      <div style={{align: "center"}}>
      <br/>
      <div className='Analytics-components'>
          <h2>Count</h2>
          <PieChart width={300} height={300}>
      <Pie
        dataKey="count"
        data={Data}
        cx={150}
        cy={150}
        outerRadius={80}
        fill="#8884D8"
        label
      >
       {Data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    <div style={{ textAlign: 'center' }}>
          <ProjectAnalytics />
          </div>
          </div>
          </div>
        </div>
      </div>
  )
}

export default Analytics