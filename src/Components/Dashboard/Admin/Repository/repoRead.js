// import React, { useState, useEffect} from 'react'
// import CreateRepo from '../Create/CreateRepo';
// import {Link, NavLink, useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios';


// function RepoRead() {
//   const getUrl='https://3ecb-106-51-70-135.ngrok-free.app/api/repositories/get'

//     const navigate = useNavigate();
//    const[name,setname]=useState('');
//    const[description, setdescription]=useState('');
//    const[id,setId]=useState('');
//    const[item,setItem]=useState('');
//    const [searchQuery, setSearchQuery] = useState('');
//    const [filteredProjects, setFilteredProjects] = useState([]);
   
//    const loaditem = async () => {
//     const result = await axios.get(getUrl,{
//         headers: {
//           'ngrok-skip-browser-warning': 'true'
//         }}) .then((result) => {
//         setItem(result.data);
       
//         // console.log(res, "hello");
//       })
//       .catch((error)=>{
//         console.log(error,'hi');
//       })
//     };

//     useEffect(() => {
//       const filteredProjects = item.filter((project) =>
//         project.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredProjects(filteredProjects);
//     }, [searchQuery, item]);

//     const createOnclick=()=>{
//         navigate('/CreateRepo')
//     }
    
//   return (
//     <div>
//       <h1 style={{textAlign:'center'}}>Repository</h1>
//       <hr/>
//         <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
//         <div class="ui left icon input">
//   <input type="text" placeholder="Search Repo..."  ></input>
//   <i class="users icon"></i>
// </div>


//     <button class="ui button" onClick={createOnclick} >Create Repository</button>
    
//     </div>
//     <div style={{marginLeft:'20px',marginRight:'30px'}}></div>
//     <table class="ui celled table">
//     <thead>
//             <th>Repo Name</th>
//             <th>Repo Description</th>
//             <th>Repo ID</th>
            
//          </thead>
//          <tbody>
//            {filteredProjects.map((item, index) => (
//     <tr key={index}>
          
//           {/* {currentPageData.map((item, index) => (
//             <tr> */}
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//               </tr>
//            ))}
//            </tbody>
           
             
              
        
//         </table>
//     </div>
//   )
// }

// export default RepoRead

import React, { useState, useEffect} from 'react';
import CreateRepo from '../Create/CreateRepo';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../SideBar/SideBar';

function RepoRead() {
  const getUrl = 'https://3ecb-106-51-70-135.ngrok-free.app/api/repositories/get';

  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [id, setId] = useState('');
  const [item, setItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const loaditem = async () => {
    try {
      const response = await axios.get(getUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loaditem();
  }, []);

  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);

  const createOnclick = () => {
    navigate('/CreateRepo');
  };

  return (
    <div className='parent-admin'>
      <div>
        <Sidebar/>
      </div>
      
    
    
      <div className='admin-child'>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
        <div className="ui left icon input">
          <input type="text" placeholder="Search Repo..." onChange={(e) => setSearchQuery(e.target.value)} />
          <i className="users icon"></i>
        </div>
        <button className="ui button" onClick={createOnclick}>Create Repository</button>
      </div>
      <div style={{ marginLeft: '20px', marginRight: '30px' }}></div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Repo ID</th>
            <th>Repo Name</th>
            <th>Repo Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default RepoRead;
