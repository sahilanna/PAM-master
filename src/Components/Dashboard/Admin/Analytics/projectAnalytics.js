import React from 'react'
import { LineChart, Line, XAxis, YAxis,Tooltip,Legend} from 'recharts';
import { BarChart, Bar, CartesianGrid,ResponsiveContainer } from 'recharts';
import { ngrokUrl } from '../../../../Assets/config';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ProjectAnalytics() {
    const [activeProjects, setActiveProjects] = useState(0);
  const [inactiveProjects, setInactiveProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/active`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const inactiveResponse = await axios.get(`https://${ngrokUrl}/api/projects/count/inactive`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setActiveProjects(activeResponse.data);
        setInactiveProjects(inactiveResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  if (error) {
    return <div>{error}</div>;
  }
  const data = [
    { status: 'Active', ActiveProjects: activeProjects },
    { status: 'Inactive', InactiveProjects: inactiveProjects },
  ];
  return (
    <div className='parent-admin'>
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        {/* <Sidebar/> */}
      </div>
      <div style={{ textAlign: 'center' }}>
        <br/>
        <h2>Project Status</h2>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ActiveProjects" fill="#8884D8" />
          <Bar dataKey="InactiveProjects" fill="#82CA9D" />
        </BarChart>
      </div>
    </div>
  )
}

export default ProjectAnalytics