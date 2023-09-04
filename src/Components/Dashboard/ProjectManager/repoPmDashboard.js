import React, { useEffect,useState } from 'react'
import PmSidebar from './pmSidebar'
import './pmDashboard.css'
import { ngrokUrl } from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function RepoPmDashboard() {
  const navigate=useNavigate()
const [searchQuery, setSearchQuery] = useState('');
const [result, setResult] = useState([]);
const [filteredResult, setFilteredResult] = useState([]);
const [isLoading, setIsLoading] = useState(true);
let data = sessionStorage.getItem('item');
let user = JSON.parse(data);
const accessToken = user.token;
console.log(user);
console.log(user.token);
const id = user.id;
console.log(id);

useEffect(() => {
  const fetchRepo = async () => {
    try {
      const response = await api.get(
        `https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`
      );
      const data = response.data;
      console.log('data', data);
      setResult(data);
      setFilteredResult(data);
      setIsLoading(false);
      console.log('result', result);
    } catch (error) {
      console.log('Error fetching PMID:', error);
      setIsLoading(true);
    }
  };
  fetchRepo();
}, []);

const navigateRepoForm=()=>{
  navigate('/pmRequestRepoForm')
}

const handleSearchInputChange = (event) => {
  const query = event.target.value;
  setSearchQuery(query);

  const filtered = result.filter((item) =>
    item.repositories.some((repo) =>
      repo.name.toLowerCase().includes(query.toLowerCase())
    )
  );

  setFilteredResult(filtered);
};

  return (
    <div className="parent-admin">
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
      <PmSidebar /> 
    </div>
    <div className="admin-child">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '30px',
          marginLeft: '40px',
          marginRight: '30px',
        }}
      >
        <div class="ui left icon input">
          <input
            type="text"
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <i class="users icon"></i>
         
         
        </div>
      </div>
      <div style={{ marginLeft: '20px', marginRight: '30px' }}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <table class="ui celled table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Repository Name</th>
                <th>Repository Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredResult && filteredResult.length > 0 ? (
                filteredResult.map((item, index) => (
                  
                  item.repositories && item.repositories.length > 0 ? (
                    item.repositories.map((repo, repoIndex) => (
                      <tr key={repoIndex}>
                        <td>{item.projectName}</td>
                        <td>{repo.name}</td>
                        <td>{repo.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key={index}>
                     
                    </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan="2">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
  
  );
}


export default RepoPmDashboard;
