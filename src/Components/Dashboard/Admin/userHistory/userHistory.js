import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Icon, Button } from 'semantic-ui-react';
import './userHistory.css';
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../SideBar/SideBar';
import { ngrokUrl } from '../../../../Assets/config';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import api from '../../api';
import Pagination from '../../Pagination/Pagination';

function UserHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

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
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching user history:', error);
      setIsLoading(true);
    }
  }

  // Calculate the index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(historyData.length / rowsPerPage);

  return (
    <div className='parent-admin'>
      <Sidebar />
      <br />
      <br />
      <div className='admin-child'>
        <h1 style={{ fontFamily: 'sans-serif' }}>Project History</h1>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <Table class='ui celled table'>
                {/* Table Header */}
                <Table.Header>
                  <Table.Row>
                    {/* <Table.HeaderCell>Project Id</Table.HeaderCell> */}
                    <Table.HeaderCell>Project Name</Table.HeaderCell>
                    <Table.HeaderCell>Project Description</Table.HeaderCell>
                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
                    <Table.HeaderCell className='text-center'>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {/* Table Body */}
                <Table.Body>
                  {currentItems.map((entry) => (
                    <Table.Row key={entry.projectId}>
                      {/* <Table.Cell>{entry.projectId}</Table.Cell> */}
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
                      <Table.Cell className='text-center'>
                        {entry.status ? (
                          <Icon name='close' color='red' />
                        ) : (
                          <Icon name='check' color='green' />
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

             
              <div className='pagination'>
              <div style={{ marginTop: '20px', textAlign: 'center' }} >
                {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((pageNumber) => (
                  <Button primary
                    key={pageNumber}
                    className={` ${pageNumber === currentPage ? 'active' : ''}`}
                    style={{ color: pageNumber === currentPage ? '' : 'white' }}
                    onClick={() => handlePaginate(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHistory;



