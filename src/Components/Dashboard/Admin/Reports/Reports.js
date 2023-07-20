import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import Sidebar from '../../SideBar/SideBar';
import '../AdminDashboard.css';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';


function Reports() {
  const [item, setItem] = useState([]);
  const [mitem, setMItem] = useState([]);
  const [showOtherTable, setShowOtherTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  useEffect(() => {
    fetchUserProjectList();
    fetchOtherTableData();
  }, []);
  async function fetchUserProjectList() {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/getAll`);
      setItem(response.data);
    } catch (error) {
      console.log('Error fetching user project list:', error);
    }
  }
  async function fetchOtherTableData() {
    try {
      const response1 = await api.get(`https://${ngrokUrl}/api/users/getMultiple`);
      setMItem(response1.data);
    } catch (error) {
      console.log('Error fetching other table data:', error);
    }
  }
  const handleTableClick = () => {
    setShowOtherTable(false);
  };
  const handleOtherTableClick = () => {
    setShowOtherTable(true);
  };
  const csvData1 = item.map((entry) => ({
    'User Id': entry.userId,
    'User Name': entry.userName,
    Projects: entry.projectNames.join(', '),
  }));
  const csvData2 = mitem.map((entry) => ({
    'User Id': entry.userId,
    'User Name': entry.userName,
    Projects: entry.projectNames.join(', '),
  }));
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = item.slice(indexOfFirstRow, indexOfLastRow);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = Math.ceil(item.length / rowsPerPage);
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pageNumbers; i++) {
      buttons.push(
        <Button
          key={i}
          primary={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };
  return (
    <div className='parent-admin'>
      <div>
        <Sidebar />
      </div>
      <div className='admin-child'>
        <br />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className='ui button' onClick={handleTableClick}>
            Employees Project List
          </button>
          <button className='ui button' onClick={handleOtherTableClick}>
            Employees With Multiple Project Access

          </button>
          {item.length > 0 && (
            <CSVLink data={csvData1} filename="user_project_list.csv">
              <button className='ui button'>Download CSV</button>
            </CSVLink>
          )}
        </div>
        <br /><br />
        {item.length > 0 && !showOtherTable && (
          <div style={{ marginLeft: '40px', marginRight: '40px' }}>
            <table className="ui celled table">
              <thead>
                <tr>
                
                  <th>Employee Name</th>
                  <th>Projects</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((entry, index) => (
                  <tr key={entry.userId}>
                    {/* <td>{entry.userId}</td> */}
                    <td>{entry.userName}</td>
                    <td>
                      {entry.projectNames.length > 0 ? (
                        entry.projectNames.join(', ')
                      ) : (
                        <span style={{ fontStyle: 'italic' }}>No projects</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
              {renderPaginationButtons()}
            </div>
          </div>
        )}
        {mitem.length > 0 && showOtherTable && (
          <div style={{ marginLeft: '40px', marginRight: '40px' }}>
            <table className="ui celled table">
              <thead>
                <tr>
                 
                  <th>Employee Name</th>
                  <th>Projects</th>
                </tr>
              </thead>
              <tbody>
                {mitem.map((entry, index) => (
                  <tr key={entry.userId}>
                    {/* <td>{entry.userId}</td> */}
                    <td>{entry.userName}</td>
                    <td>{entry.projectNames.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {mitem.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <CSVLink data={csvData2} filename="user_project_list.csv">
                  <button className='ui button'>Download CSV</button>
                </CSVLink>
              </div>
            )}
            <div style={{ marginTop: '20px' }}>
              {renderPaginationButtons()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports

