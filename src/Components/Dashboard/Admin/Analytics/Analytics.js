import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { ngrokUrl } from '../../../../Assets/config';
import Sidebar from '../../SideBar/SideBar';
import "./Analytics.css";
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function Analytics() {
  const [Data, setData] = useState([]);
  const navigate =useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  const fetchCount = async () => {
    try {
      const [adminResponse, pmResponse, userResponse] = await Promise.all([
        api.get(`https://${ngrokUrl}/api/users/count/admin`),
        api.get(`https://${ngrokUrl}/api/users/count/project_manager`),
        api.get(`https://${ngrokUrl}/api/users/count/user`),
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
                    fill="#8884d8"
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
                <Button primary onClick={handleNextClick}>Next</Button>
              </>
            
          </>
        )}
      </div>
    </div>
  </div>
  );
}

export default Analytics;