import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
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
  const [csvData, setCSVData] = useState([]);
  const csvLinkRef = useRef(null);
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
  const handleDownloadCSV = () => {
    const csvData = data.map((entry) => ({ Status: entry.status, Projects: entry.ActiveProjects || entry.InactiveProjects }));
    setCSVData(csvData);
    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    csvLinkRef.current.href = encodedUri;
    csvLinkRef.current.target = "_blank";
    csvLinkRef.current.download = "project_status_data.csv";
    csvLinkRef.current.click();
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
              <Bar dataKey="ActiveProjects" fill="#8884D8" />
              <Bar dataKey="InactiveProjects" fill="#82CA9D" />
            </BarChart>
            <br />
            <Button primary onClick={handleBackClick}>Back</Button>
            <Button secondary onClick={handleDownloadCSV}>Download CSV</Button>
            <a href="#" ref={csvLinkRef} style={{ display: 'none' }}>Download CSV</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;