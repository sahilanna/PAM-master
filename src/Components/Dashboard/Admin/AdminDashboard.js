import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import Pagination from '../Pagination/Pagination';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import { CSVLink } from 'react-csv';
import CustomSidebar from '../SideBar/SideBar';
import { ngrokUrl } from '../../../Assets/config';
import './AdminDashboard.css';
import api from '../api';

import AdminHeader from './adminHeader';

import useApiData from './PmRequests/interval';



const AdminDashboard = () => {

  const { requestData, Loading } = useApiData();
   const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
console.log(requestData)
console.log(Loading)
  const[count, setCount]=useState('')

  const navigate = useNavigate();
  const itemsPerPage = 5;
  
  useEffect(() => {
    loadItems();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
       await api.get(`https://${ngrokUrl}/api/request/allActive`);  
    }

    catch (error) {
      console.log('Error fetching Users:', error);
    }
  };


  const loadItems = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/countPeople`, {});
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
      
    }
  };
  
  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    handlePaginate(1);
  }, [item]);





  const createOnclick = () => {
    navigate('/CreateProject');
  };

  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
  };



  const handleFilterItems = (searchQuery) => {
    const filteredItems = item.filter((item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };

  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    countEmp()
  }, []);


  const countEmp = async (projectId) => {
    try {
      const result = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/count`,{});
       setCount(result.data)
       console.log(count)
    } catch (error) {
      console.log(error);
    }
  };





  const csvDataProj = item.map((entry) => ({
    'Project ID': entry.projectId,
    'Project Name': entry.projectName,

    
  }));
  

  


  return (
    <div className="parent-admin">
     


      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
      <CustomSidebar/>

      </div>
      <div className="admin-child">
      
      <AdminHeader/>
      

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div className="ui left icon input">
            <input type="text" placeholder="Search Project..." value={searchQuery} onChange={handleSearchChange} />
            <i className="users icon"></i>
          </div>
          <div className="button-container">
            {item.length > 0 && (
              <div>
                <button className="ui button" onClick={createOnclick}>Create Project</button>

               
                <CSVLink data={csvDataProj} filename="projects_data.csv">
                <button className="ui button">Download CSV</button>
              </CSVLink>
                

                <ToastContainer/>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
            
              <table className="ui celled table">
                <thead>
                  <tr>
                    
                    <th>S.No.</th>
                    <th>Project-Name</th>
                    <th>Count of employees</th>
                  
                    
                 
                  </tr>
                </thead>
                <tbody>
                {currentPageData.length === 0 ? (
    <tr>
      <td colSpan="5" >
        No data available
      </td>
    </tr>
  ) : (
                  currentPageData.map((item, index) => (
                    <tr key={item.projectName}>
                      
                      <td>{index+1}</td>
                     <td> <a
    href={`/ProjectDetails/${item.projectId}/${item.projectName}`}
    className="project-name-link"
  >
    {item.projectName}
  </a></td>
                      <td>{item.countPeople}</td>
                                           
                    </tr>
                  )))}
                </tbody>
              </table>
              
              <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
</div>

             
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

























































