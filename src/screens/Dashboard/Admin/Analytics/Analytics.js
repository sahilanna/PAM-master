import React, { useEffect, useState, useRef  } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { ngrokUrl } from '../../../../network/config';
import Sidebar from '../../SideBar/SideBar';
import "./Analytics.css";
import LoadingPage from '../../../../atoms/loadingPage';
import api from '../../../../network/api';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

function Analytics() {
  const [Data, setData] = useState([]);
  const navigate =useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const csvLinkRef = useRef(null);

  const fetchCount = async () => {
    try {
      const [adminResponse, pmResponse, userResponse] = await Promise.all([
        api.get(`https://${ngrokUrl}/users/count/admin`),
        api.get(`https://${ngrokUrl}/users/count/project_manager`),
        api.get(`https://${ngrokUrl}/users/count/user`),
      ]);
      setIsLoading(false);
      const adminCount = adminResponse.data;
      const pmCount = pmResponse.data;
      const userCount = userResponse.data;
      setData([
        { name: 'Admins', count: adminCount },
        { name: 'Users', count: userCount },
        { name: 'Project Managers', count: pmCount }
      ]);
    } catch (error) {
      console.error(error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchCount();
  }, []);
  const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];
  const handleNextClick = () => {
    navigate('/projectAnalytics')
  };
  const handleDownloadCSV = () => {
    const csvData = Data.map((entry) => ({ Name: entry.name, Count: entry.count }));
    setCSVData(csvData);
    csvLinkRef.current.link.click();
  };
  return (
    <div className='parent-adm'>
    <Sidebar />
    <div className='main-content'>
      <div className='Analytics-components'>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
              <>
                <h2>Count of Admin, PMs, and Users</h2>
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
                      <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
                <br/>
                <div >
                <Button data-testid='next' primary onClick={handleNextClick}>Next</Button>
                <Button data-testid="download-csv" secondary onClick={handleDownloadCSV}>Download CSV</Button>
                <CSVLink
                  data={csvData}
                  filename={"chart_data.csv"}
                  className="hidden"
                  ref={csvLinkRef}
                />
                </div>
              </>
          </>
        )}
      </div>
    </div>
  </div>
  );
}
export default Analytics;