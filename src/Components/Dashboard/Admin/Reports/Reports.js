import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Sidebar from '../../SideBar/SideBar';
import '../AdminDashboard.css';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload,  } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Pagination/Pagination';

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          {item.length > 0 && !showOtherTable && (
            <CSVLink data={csvData1} filename="user_project_list.csv">
               <FontAwesomeIcon icon={faDownload} size="2x" />
            </CSVLink>
          )}
          {mitem.length > 0 && showOtherTable && (
            <CSVLink data={csvData2} filename="user_multiple_projects.csv">
               <FontAwesomeIcon icon={faDownload} size="2x" />
            </CSVLink>
          )}
       
      </div>

      <br /><br />
        {currentRows.length > 0 && !showOtherTable && (
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
              <Pagination  data={currentRows} itemsPerPage={rowsPerPage} paginate={handlePageChange} />
            </div>
          </div>
        )}
        {currentRows.length > 0 && showOtherTable && (
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
                    <td colSpan={2}>{entry.projectNames.join(', ')}</td>
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
