import React, { useState,useEffect} from 'react';
import {Button,Icon} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../Assets/config';
import PmSidebar from './pmSidebar';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';

const PmDashboard = () => {
  const [item, setItem] = useState([]);
  const [pmid, setPmid] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate()
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 5;

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
 
  console.log(user)
    console.log(user.token)
  const  id=user.id
  console.log(id)
  useEffect(() => {
    handlePaginate(1);
  }, [item]);
  useEffect(() => {
    const fetchPmid = async () => {
      try {
       new URLSearchParams(window.location.search);
        const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`);

      console.log(response.data)
      console.log(response.id);
      setIsLoading(false);
      setItem(response.data)
        const  pmid  = response.data;
        setPmid(pmid);
      } catch (error) {
        console.log('Error fetching PMID:', error);
        setIsLoading(true);
      }
    };
    fetchPmid();
  }, []);
  const navigateForm=(projectId, projectName)=>{
    navigate('/PmRequestForm',{ state: { projectId, projectName} })
  }
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
    const filteredItems = item?.filter((item) =>
      item?.projectName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setCurrentPageData(filteredItems?.slice(0, itemsPerPage));
  };
  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
      <div className='parent-admin'>
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
   <PmSidebar/>
      </div>
       <div className='admin-child'>
          <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search Projects..." value={searchQuery} onChange={handleSearchChange}  ></input>
  <i class="users icon"></i>
</div>
    </div>
    {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <table class="ui celled table">
        <thead>
            {/* <th>Project-ID</th> */}
            <th>Project-Name</th>
           
            <th>Project-Description</th>
            <th>Add User</th>
           
        </thead>
        <tbody>
          {pmid && pmid.length>0 ? (
           currentPageData.map((item) => (
    <tr key={item.projectId}>
         
             <>
              {/* <td>{item.projectId}</td> */}
              <td>{item.projectName}</td>
              <td>{item.projectDescription}</td>
              <td>
                    <Button color="blue" icon labelPosition="left" onClick={()=>navigateForm(item.projectId, item.projectName)}>
                      <Icon name="plus" />
                      Add
                    </Button>
                  </td>
                  </>
                  <>
                  </>
            </tr>
           ))
          ):(
            <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
      )}
      </div>
</div>
  )}
export default PmDashboard;