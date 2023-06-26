import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ngrokUrl } from '../../../../Assets/config';
import { Modal, Button } from 'semantic-ui-react';
import Sidebar from '../../SideBar/SideBar';
import Create from '../Create/Create';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';

function RepoRead() {
  const [isLoading, setIsLoading] = useState(true);
  const getUrl = `https://${ngrokUrl}/api/repositories/get`;
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);
  const accessToken=user.token
  console.log(user)
    console.log(user.token)

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const response = await axios.get(getUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          AccessToken: accessToken
        }
      });
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const createOnclick = () => {
    navigate('/CreateRepo');
  };
 const createOnclickDel=()=>{
  navigate('/deleteRepo')
 }


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate('/Create')
  };

  return (

       
    
    <div className='parent-admin'>
     
      <Sidebar/>
     
           
      <div className='admin-child'>
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div className="ui left icon input">
            <input type="text" placeholder="Search Repo..." value={searchQuery} onChange={handleSearchChange} />
            <i className="users icon"></i>
          </div>
          <div>
          <button className="ui button" onClick={createOnclickDel}>Delete Repository</button>
            <button className="ui button" onClick={createOnclick}>Create Repository</button>
            <button className="ui button" onClick={toggleDrawer}>Create Project</button>
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}></div>
        {isLoading ? (
            <LoadingPage />
          ) : (
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
                <td>{item.repoId}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
          )}
      </div>
         
      <Modal open={isDrawerOpen} onClose={toggleDrawer} closeIcon style={{ position: 'fixed', right: 0, top: 0 }}>
        <Modal.Header>Create Project</Modal.Header>
        <Modal.Content>
          <Create onClose={toggleDrawer} />
        </Modal.Content>
      </Modal>
      
      
    </div>
  );
}

export default RepoRead;














//Before drawer

// import React, { useState, useEffect} from 'react';
// // import CreateRepo from '../Create/CreateRepo';
// import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '../../SideBar/SideBar';
// import { ngrokUrlSwe } from '../../../../Assets/config';
// import { Modal, Button } from 'semantic-ui-react';


// function RepoRead() {
//   const getUrl = `https://${ngrokUrlSwe}/api/repositories/get`;
//   const navigate = useNavigate();
//   const [name, setname] = useState('');
//   const [description, setdescription] = useState('');
//   const [id, setId] = useState('');
//   const [item, setItem] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   useEffect(() => {
//     loaditem();
//   }, []);
//   const loaditem = async () => {
//     try {
//       const response = await axios.get(getUrl, {
//         headers: {
//           'ngrok-skip-browser-warning': 'true'
//         }
//       });
//       setItem(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
 
//   const openDrawer = () => {
//     setIsDrawerOpen(true);
//   };
  
//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };


//   useEffect(() => {
//     const filteredProjects = item.filter((project) =>
//       project.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProjects(filteredProjects);
//   }, [searchQuery, item]);
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   const createOnclick = () => {
//     navigate('/CreateRepo');
//   };
//   const createOnclickProj=()=>{
//     navigate('/Create')
//   }
//   return (
//     <div className='parent-admin'>
//       <div>
//         <Sidebar/>
//       </div>
//       <div className='admin-child'>
//      <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
//         <div class="ui left icon input">
//   <input type="text" placeholder="Search Repo..." value={searchQuery}
//             onChange={handleSearchChange} ></input>
//   <i class="users icon"></i>
// </div>
//         <div>
//         <button className="ui button" onClick={createOnclick}>Create Repository</button>
//         <button  class="ui button" onClick={createOnclickProj} >Create Project</button>
//         </div>
//       </div>
//       <div style={{marginLeft:'20px',marginRight:'30px'}}></div>
//       <table className="ui celled table">
//         <thead>
//           <tr>
//             <th>Repo ID</th>
//             <th>Repo Name</th>
//             <th>Repo Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProjects.map((item, index) => (
//             <tr key={index}>
//               <td>{item.repoId}</td>
//               <td>{item.name}</td>
//               <td>{item.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// }

// export default RepoRead;

