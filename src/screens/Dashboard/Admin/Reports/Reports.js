import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Sidebar from '../../SideBar/SideBar';
import '../AdminDashboard.css';
import { ngrokUrl } from '../../../../network/config';
import api from '../../../../network/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Pagination/Pagination';

function Reports() {
  const [item, setItem] = useState([]);
  const [mitem, setMItem] = useState([]);
  const [showOtherTable, setShowOtherTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchUserProjectList();
    
   
  }, []);
  useEffect(() => {
  
    fetchOtherTableData();
  }, []);

  async function fetchUserProjectList() {
    try {
      const response = await api.get(`https://${ngrokUrl}/users/getAll`);
      setItem(response.data);
    } catch (error) {
      console.log('Error fetching user project list:', error);
    }
  }

  async function fetchOtherTableData() {
    try {
      const response1 = await api.get(`https://${ngrokUrl}/users/getMultiple`);
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

  const handlePageChange = (pageNumber) => {
    console.log("hjdcjv");
    setCurrentPage(pageNumber);
  };
  

  const csvData = showOtherTable ? mitem : item;

  const generateSerialNumbers = () => {
    const startNumber = (currentPage - 1) * rowsPerPage;
    const dataToDisplay = showOtherTable ? mitem : item;
    return dataToDisplay.slice(startNumber, startNumber + rowsPerPage).map((entry, index) => ({
      SerialNo: startNumber + index + 1,
      ...entry,
    }));
  };

  const currentRows = showOtherTable ? mitem : item;

  return (
    <div className='parent-admin'>
      <div>
        <Sidebar />
      </div>
      <div className='admin-child'>
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '400px', marginBottom: '5px' }}>
          <button className='ui button' onClick={handleTableClick}>
            Employees Project List
          </button>
          <button className='ui button' onClick={handleOtherTableClick}>
            Employees With Multiple Project Access
          </button>
          {csvData.length > 0 && (
            <CSVLink data={csvData} filename={showOtherTable ? 'user_multiple_projects.csv' : 'user_project_list.csv'}>
              <FontAwesomeIcon icon={faDownload} size="2x" />
            </CSVLink>
          )}
        </div>
        <br /><br />
        {currentRows.length > 0 && (
          <div style={{ marginLeft: '40px', marginRight: '40px' }}>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Employee Name</th>
                  <th colSpan={2}>
                    Projects
                  </th>
                </tr>
              </thead>
              <tbody>
                {generateSerialNumbers().map((entry) => (
                  <tr key={entry.userId}>
                    <td>{entry.SerialNo}</td>
                    <td>{entry.userName}</td>
                    <td colSpan={2}>
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination data={currentRows} itemsPerPage={rowsPerPage} paginate={handlePageChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
