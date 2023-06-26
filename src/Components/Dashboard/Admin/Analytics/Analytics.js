 import React from 'react'
import { PieChart, Pie, Legend, Tooltip,Cell } from 'recharts';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { ngrokUrl } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';
import ProjectAnalytics from './projectAnalytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import "./Analytics.css"
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';

function Analytics() {
const[Data,setData]=useState([])
const [isLoading, setIsLoading] = useState(true);

let dataa = sessionStorage.getItem("item");
let user = JSON.parse(dataa);
const accessToken=user.token
console.log(user)
  console.log(user.token)
const fetchCount = async () => {
    try {
      const [adminResponse, pmResponse, userResponse] = await Promise.all([
        api.get(`https://${ngrokUrl}/api/users/count/admin`),
          api.get(`https://${ngrokUrl}/api/users/count/user`),
        api.get(`https://${ngrokUrl}/api/users/count/project_manager`),
       
      ]);
     
      setIsLoading(false);
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
      setIsLoading(true);
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


        
       {isLoading ? (
            <LoadingPage />
          ) : (
    <div style={{align: "center"}}> 
    <br/>
    <div className='Analytics-components'>
        <h2>Count of Admin, PMs and Users</h2>
        
        <PieChart width={300} height={300}>
            
    <Pie
      dataKey="count"
      data={Data}
      cx={150}
      cy={150}
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
  </PieChart>
  <div style={{ textAlign: 'center' }}>
       
        <ProjectAnalytics />
        </div>
        </div>
        </div>
          )}
      </div>
    </div>
 
  
  )
}

export default Analytics