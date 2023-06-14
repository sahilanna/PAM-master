import React from 'react'
import UserSidebar from './userSidebar'
import { ngrokUrlSwe } from '../../../Assets/config';
import axios from 'axios';
import {useState, useEffect} from 'react'


function UserRepoRead() {

  const [result, setResult]=useState([])
  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`https://${ngrokUrlSwe}/api/users/302/role/user/projects`,{
          headers : {
            'ngrok-skip-browser-warning': 'true'
      }});
        const  data  = response.data;
        console.log('data',data)
        setResult(data);
        console.log('result',result)
      } catch (error) {
        console.log('Error fetching PMID:', error);
      }
    };
    fetchRepo();
  }, []);
  return (
    <div className='parent-admin'>
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <UserSidebar/>
        </div>
       <div className='admin-child'>
          <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search Projects..."  ></input>
  <i class="users icon"></i>
</div>
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <table class="ui celled table">
        <thead>
            <th>Repository Name</th>
            <th>Repository Description</th>
            {/* <th>Repository Name</th> */}
            {/* <th>PM Github</th>
            <th>User Github</th>  */}
            {/* <th>Edit</th> */}
        </thead>
        <tbody>
        {result && result.length > 0 ? (
           result.map((item, index) => (
    <tr key={index}>
         {item.projectName && item.figmaUrl > 0 ? (
          <>
              {console.log(item.repositories[0].repoId)}
              <td>{item.repositories[0].name}</td>
              <td>{item.repositories[0].description}</td>
              </>
         ):(
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
      </div>
      </div>
    </div>
)}
export default UserRepoRead