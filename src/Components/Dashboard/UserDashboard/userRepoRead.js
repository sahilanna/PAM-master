import React, { useState, useEffect } from 'react';
import UserSidebar from './userSidebar';
import { ngrokUrl } from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';

function UserRepoRead() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let data = sessionStorage.getItem('item');
  let user = JSON.parse(data);
 
  console.log(user);
  console.log(user.token);
  const id = user.id;
  console.log(id);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await api.get(
          `https://${ngrokUrl}/api/users/${id}/role/user/projects`
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
      <UserSidebar />
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
                <th>Repository Name</th>
                <th>Repository Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredResult && filteredResult.length > 0 ? (
                filteredResult.map((item) => (
                  item.repositories && item.repositories.length > 0 ? (
                    item.repositories.map((repo) => (
                      <tr key={repo.id}>
                        <td>{repo.name}</td>
                        <td>{repo.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key={item.id}>
                      <td colSpan="2">No repositories available</td>
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

export default UserRepoRead;



