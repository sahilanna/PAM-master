import React, { useEffect,useState } from 'react'
import PmSidebar from './pmSidebar'
import './pmDashboard.css'
import { ngrokUrl } from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';

function RepoPmDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageData, setCurrentPageData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const itemsPerPage = 5;
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const id = user.id;

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`, {
          
        });
        const data = response.data;
        setResult(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching PMID:', error);
        setIsLoading(true);
      }
    };
    fetchRepo();
  }, []);

  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
  };

  const handleFilterItems = (searchQuery) => {
    const filteredItems = result.filter((item) =>
      item.repositories && item.repositories.length > 0 &&
      item.repositories[0].name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredItems);
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };

  useEffect(() => {
    handlePaginate(1);
  }, [result]);

  return (
    <div className="parent-admin">
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <PmSidebar />
      </div>
      <div className="admin-child">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div className="ui left icon input">
            <input type="text" placeholder="Search Projects..." onChange={handleSearchChange} value={searchQuery} />
            <i className="users icon"></i>
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Repository Name</th>
                  <th>Repository Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects && filteredProjects.length > 0 ? (
                  currentPageData.map((item) => (
                    <tr key={item.projectId}>
                      {item.repositories && item.repositories.length > 0 ? (
                        item.repositories.map((repo) => (
                          <React.Fragment key={repo.repositoyId}>
                            <td>{repo.name}</td>
                            <td>{repo.description}</td>
                          </React.Fragment>
                        ))
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
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
