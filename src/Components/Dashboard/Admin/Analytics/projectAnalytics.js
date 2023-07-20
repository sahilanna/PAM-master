import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ngrokUrl } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const ProjectAnalytics = ({ onBackClick }) => {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState(0);
  const [inactiveProjects, setInactiveProjects] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeResponse = await api.get(`https://${ngrokUrl}/api/projects/count/active`);
        const inactiveResponse = await api.get(`https://${ngrokUrl}/api/projects/count/inactive`);
        setActiveProjects(activeResponse.data);
        setInactiveProjects(inactiveResponse.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const data = [
    { status: 'Active', ActiveProjects: activeProjects },
    { status: 'Inactive', InactiveProjects: inactiveProjects },
  ];

  const handleBackClick = () => {
    navigate('/Analytics');
  };

  return (
    <div className='parent-admin'>
      <Sidebar />
      <div className='main-content'>
        <div className='Analytics-components'>
          <div style={{ textAlign: 'center' }}>
            <h1> Project Status </h1>
            <br />
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ActiveProjects" fill="#8884d8" />
              <Bar dataKey="InactiveProjects" fill="#82ca9d" />
            </BarChart>
            <br />
            <Button primary onClick={handleBackClick}>Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
