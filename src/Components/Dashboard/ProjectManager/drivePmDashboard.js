
import React, { useState,useEffect } from 'react'
import PmSidebar from './pmSidebar';
import { ngrokUrl} from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';


function DrivePmDashboard() {
    const [result, setResult]=useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageData, setCurrentPageData] = useState([]);
    const itemsPerPage = 5;
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
 
  console.log(user)
    console.log(user.token)
  const  id=user.id
  console.log(id)
  const fetchFigma = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/project_manager/projects`);
      const  data  = response.data;
      console.log('data',data)
      setIsLoading(false);
      setResult(data);
      console.log('result',result)
    } catch (error) {
      console.log('Error fetching PMID:', error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
  fetchFigma();
}, []);
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
  // const filteredItems = projects.filter((item) =>
  //   item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    const filteredItems = result && result.filter((item) =>
item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setCurrentPageData(filteredItems.slice(0, itemsPerPage));
};
const filteredItems = result.filter((item) =>
  item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
)
useEffect(() => {
handlePaginate(1);
}, [result]);
return (
  <div className='parent-admin'>
  <div style={{ height: '100vh', overflow: 'scroll initial' }}>
      <PmSidebar/>
      </div>
     <div className='admin-child'>
        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
      <div class="ui left icon input">
<input type="text" placeholder="Search Projects..." onChange={handleSearchChange} value={searchQuery} ></input>
<i class="users icon"></i>
</div>
  </div>
  <div style={{marginLeft:'20px',marginRight:'30px'}}>
  {isLoading ? (
            <LoadingPage />
          ) : (
  <table class="ui celled table">
      <thead>
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Figma URL</th>
      </thead>
      <tbody>
      {result && result.length > 0 ? (
         currentPageData.map((item, index) => (
  <tr key={index}>
        {/* {currentPageData.map((item, index) => (
          <tr> */}
           {item.projectName && item.figma ? (
            <>
            <td>{item.projectName}</td>
            <td>{item.projectDescription}</td>
           <td><a href={item.figma.figmaURL} target="_blank" rel="noopener noreferrer">{item.figma.figmaURL}
                  </a></td>
                  </>
                  
                  
        
        
        ) : (
          <>
            <td>{item.projectName}</td>
            <td>No URL</td>
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
      )
    }


export default DrivePmDashboard