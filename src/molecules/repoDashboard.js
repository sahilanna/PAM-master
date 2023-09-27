import React, { useState, useEffect } from 'react';
import { ngrokUrl } from '../network/config';
import LoadingPage from '../atoms/loadingPage';
import api from '../network/api';
import RepoTable from '../atoms/repoTable';

function RepoDashboard({ role, SidebarComponent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  let data = sessionStorage.getItem('item');
  let user = JSON.parse(data);
  const id = user.id;

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await api.get(
          `https://${ngrokUrl}/users/${id}/role/${role}/projects`
        );
        const data = response.data;
        setResult(data);
        setFilteredResult(data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching ${role} projects:`, error);
        setIsLoading(true);
      }
    };
    fetchRepo();
  }, [id, role]);

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
        <SidebarComponent />
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
            <RepoTable data={filteredResult} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RepoDashboard;