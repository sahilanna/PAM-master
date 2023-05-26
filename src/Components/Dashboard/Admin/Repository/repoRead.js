import React, { useState } from 'react'
import CreateRepo from '../Create/CreateRepo';
import {Link, NavLink, useNavigate, useParams } from 'react-router-dom'


function RepoRead() {

    const navigate = useNavigate();
   const[name,setname]=useState('');
   const[description, setdescription]=useState('');
   const[projectId,setProjectId]=useState('');
   


    const createOnclick=()=>{
        navigate('/CreateRepo')
    }
    
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Repository</h1>
      <hr/>
        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search Repo..."  ></input>
  <i class="users icon"></i>
</div>


    <button class="ui button" onClick={createOnclick} >Create Repository</button>
    
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}></div>
    <table class="ui celled table">
    <thead>
            <th>Repo Name</th>
            <th>Repo Description</th>
            <th>Project ID</th>
            
         </thead>
         {/* <tbody>
           {filteredProjects.map((item, index) => (
    <tr key={index}>
         
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
             
         
           </tr>
             ))}
           </tbody> */}
        </table>
    </div>
  )
}

export default RepoRead