import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import Sidebar from '../../SideBar/SideBar';
import Create from '../Create/Create';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import { ngrokUrl } from '../../../../Assets/config';

function RepoRead() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/repositories/get`);
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const createOnclick = () => {
    navigate('/CreateRepo');
  };

  const createOnclickDel = () => {
    navigate('/deleteRepo');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate('/Create');
  };

  return (
    <div className='parent-admin'>
      <Sidebar />
      <div className='admin-child'>
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
          <div className='ui left icon input'>
            <input type='text' placeholder='Search Repo...' value={searchQuery} onChange={handleSearchChange} />
            <i className='users icon'></i>
          </div>
          <div>
            <button className='ui button' onClick={createOnclickDel}>
              Delete Repository
            </button>
            <button className='ui button' onClick={createOnclick}>
              Create Repository
            </button>
            <button className='ui button' onClick={toggleDrawer}>
              Add Project Git
            </button>
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table className='ui celled table'>
              <thead>
                <tr>
                  <th>Repo ID</th>
                  <th>Repo Name</th>
                  <th>Repo Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan='3'>No data available</td>
                  </tr>
                ) : (
                  filteredProjects.map((item, index) => (
                    <tr key={index}>
                      <td>{item.repoId}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default RepoRead;



















