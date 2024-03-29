import React, { useState,useEffect } from 'react'
import UserSidebar from './userSidebar'
import { ngrokUrl} from '../../../Assets/config';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import api from '../api';

function UserFigmaRead() {
  const [searchQuery, setSearchQuery] = useState('');
   const[figmaUser,setfigmaUser]=useState([])
   const [isLoading, setIsLoading] = useState(true);
    const [currentPageData, setCurrentPageData] = useState([]);
 const itemsPerPage=5;
   let data = sessionStorage.getItem("item");
   let user = JSON.parse(data);
  
   console.log(user)
     console.log(user.token)
     const  id=user.id
   console.log(id)
   const fetchPmid = async () => {
   try {
      new URLSearchParams(window.location.search);
     
     const response = await api.get(`https://${ngrokUrl}/api/users/${id}/role/user/projects`);
   console.log(response.data)
   console.log(response.id);
   setIsLoading(false);
     setfigmaUser(response.data);
   } catch (error) {
     console.log('Error fetching PMID:', error);
     setIsLoading(true);
   }
 };
 useEffect(() => {
   fetchPmid();
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
      const filteredItems = figmaUser?.filter((item) =>
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCurrentPageData(filteredItems?.slice(0, itemsPerPage));
    };
     const filteredItems = figmaUser.filter((item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
     )
   useEffect(() => {
     handlePaginate(1);
   }, [figmaUser]);
     return (
         <div className='parent-admin'>
         <div style={{ height: '100vh', overflow: 'scroll initial' }}>
             <UserSidebar/>
             </div>
            <div className='admin-child'>
               <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
             <div class="ui left icon input">
       <input type="text" placeholder="Search Projects..." value={searchQuery} onChange={handleSearchChange} ></input>
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
                 <th>Figma URL</th>
               
             </thead>
             <tbody>
  {figmaUser && figmaUser.length > 0 ? (
    currentPageData.map((item, index) => (
      <tr key={item.id}>
        {item.projectName && item.figma && item.figma.figmaURL ? (
          <>
            <td>{item.projectName}</td>
            <td>
              <a href={item.figma.figmaURL} target="_blank" rel="noopener noreferrer">
                {item.figma.figmaURL}
              </a>
            </td>
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
 export default UserFigmaRead
