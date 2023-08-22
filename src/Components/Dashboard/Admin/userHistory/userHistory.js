import React, { useEffect, useState } from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import './userHistory.css';
import 'semantic-ui-css/semantic.min.css';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl } from '../../../../Assets/config';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import Pagination from '../../Pagination/Pagination';
import { CSVLink } from 'react-csv';
function UserHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [item, setItem] = useState([]);
  const [mitem, setMItem] = useState([]);
  const [showOtherTable, setShowOtherTable] = useState(false);
  const rowsPerPage = 5;
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/all`);
      const sortedData = response.data.slice().sort((a, b) => {
        if (a.status !== b.status) {
          return a.status ? 1 : -1;
        }
        return a.projectId - b.projectId;
      });
      setHistoryData(sortedData);
      setFilteredProjects(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching user history:', error);
      setIsLoading(true);
    }
  }
  useEffect(() => {
    const filteredData = historyData.filter((entry) =>
      entry.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentPage(1); // Reset the current page to 1 when the search query changes
    setFilteredProjects(filteredData);
  }, [searchQuery, historyData]);
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  const csvDataProj = historyData.map((entry) => ({
    'Project ID': entry.projectId,
    'Project Name': entry.projectName,
    'Project Description': entry.projectDescription,
    'Status':  entry.status ? 'Inactive' : 'Active',
  }));
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const generateSerialNumbers = () => {
    const startNumber = (currentPage - 1) * rowsPerPage;
    return currentItems.map((entry, index) => ({
      SerialNo: startNumber + index + 1,
      ...entry,
    }));
  };
  const pageNumbers = Math.ceil(filteredProjects.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="parent-admin-userHistory">
      <Sidebar />
      <div className="admin-child-userHistory">
      <br/><br/>
      <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          <div className="search-and-download-container">
            <div className='ui left icon input'>
              <input
                type='text'
                placeholder='Search Repo...'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className='users icon'></i>
            </div>
            <CSVLink data={csvDataProj} filename="project_history_data.csv">
              <button className="ui button">Download CSV</button>
            </CSVLink>
          </div>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <Table class="ui celled table">
                <Table.Header>
                  <Table.Row>
                  <Table.HeaderCell>S.No.</Table.HeaderCell>
                    <Table.HeaderCell>Project Name</Table.HeaderCell>
                    <Table.HeaderCell>Project Description</Table.HeaderCell>
                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
                    <Table.HeaderCell className="text-center">Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {generateSerialNumbers().map((entry) => (
                    <Table.Row key={entry.projectId}>
                      <Table.Cell>{entry.SerialNo}</Table.Cell>
                      <Table.Cell>{entry.projectName}</Table.Cell>
                      <Table.Cell>{entry.projectDescription}</Table.Cell>
                      <Table.Cell style={{ color: 'blue' }}>
                        {new Date(entry.lastUpdated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {entry.status ? <Icon name="close" color="red" /> : <Icon name="check" color="green" />}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
               <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                  data={filteredProjects}
                  itemsPerPage={rowsPerPage}
                  paginate={handlePaginate}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserHistory;