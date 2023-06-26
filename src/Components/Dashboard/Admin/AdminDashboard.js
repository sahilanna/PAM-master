import React, {useEffect, useState, dispatch} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon,faUser } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import DialogBox from '../DialogBox/DialogBox';
import ProjectDetails from './Read/ProjectDetails';
import 'semantic-ui-css/semantic.min.css';
import Pagination from '../Pagination/Pagination';
import PmReadNew from '../PM/PmReadNew';
import userHistory from './userHistory/userHistory';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LoadingPage from '../../../Assets/Loader/LoadingPage';
import { CSVLink } from 'react-csv';
import Sidebar from '../SideBar/SideBar';
import NavBarA from './NavbarA';
import Read from './Read/Read';
import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const getUrl = `https://${ngrokUrlSwe}/api/projects/allProjects`;

  const itemsPerPage = 5;
  const { id } = useParams();

  const loadItems = async () => {
    try {
      const response = await axios.get(getUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
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
    loadItems();
  }, []);

  useEffect(() => {
    handlePaginate(1);
  }, [item]);

  const csvDataProj = item.map((entry) => ({
    'project Id': entry.projectId,
    'project Name': entry.projectName,
    'project Description': entry.projectDescription
  }));

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleCloseDetails = () => {
    setShowProjectDetails(false);
  };

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

  const deleteUser = async (projectId) => {
    try {
      await axios.delete(`https://${ngrokUrlSwe}/api/projects/delete/${projectId}`);
      navigate('/AdminDashboard');
      setShowConfirmDialog(false);
      loadItems();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='parent-admin'>
      <div style={{ height: '100vh', overflow: 'scroll initial' }}>
        <Sidebar />
      </div>

      <div className='admin-child'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
          <div className='ui left icon input'>
            <input type='text' placeholder='Search Project...' value={searchQuery} onChange={handleSearchChange} />
            <i className='users icon'></i>
          </div>

          <div>
            {item.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <button className='ui button' onClick={createOnclick}>Create Project</button>
                <CSVLink data={csvDataProj} filename='user_project_list.csv' className='btn btn-primary'>
                  Download CSV
                </CSVLink>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <table className='ui celled table'>
                <thead>
                  <tr>
                    <th>Project-ID</th>
                    <th>Project-Name</th>
                    <th>Project-Description</th>
                    <th className='text-center'>View</th>
                    <th className='text-center'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((item, index) => (
                    <tr key={item.projectId}>
                      <td>{item.projectId}</td>
                      <td>{item.projectName}</td>
                      <td>{item.projectDescription}</td>
                      <td className='text-center'>
                        <button
                          className='btn btn-outline-info mx-2'
                          onClick={() => handleViewDetails(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(item.projectId)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <DialogBox
                          show={showConfirmDialog === item.projectId}
                          onClose={() => setShowConfirmDialog(null)}
                          onConfirm={() => deleteUser(item.projectId)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <div className='pagination'>
                  <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
                </div>
                {showProjectDetails && (
                  <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

















// import React, {useEffect, useState, dispatch} from 'react';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// import { Navigate, useParams}  from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon,faUser } from '@fortawesome/react-fontawesome';
// import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
// import DialogBox from '../DialogBox/DialogBox';
// import ProjectDetails from './Read/ProjectDetails';
// import 'semantic-ui-css/semantic.min.css';
// import Pagination from '../Pagination/Pagination';
// import PmReadNew from '../PM/PmReadNew';
// import userHistory from './userHistory/userHistory';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import LoadingPage from '../../../Assets/Loader/LoadingPage';
// import { CSVLink } from 'react-csv';
// import Sidebar from '../SideBar/SideBar';
// import NavBarA from './NavbarA';
// import Read from './Read/Read';
// import { ngrokUrl, ngrokUrlSwe } from '../../../Assets/config';
// import "./AdminDashboard.css"
// const AdminDashboard = () => {

//   const navigate=useNavigate()
//   const getUrl =  `https://${ngrokUrlSwe}/api/projects/allProjects`
//   const delUrl = `https:/${ngrokUrlSwe}/api/projects/delete/`
//   const [item, setItem] = useState([]);
//   const [projectId, setProjectId] = useState('');
//   const [projectName, setProjectName] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [currentPageData, setCurrentPageData] = useState([]);
//   const [showProjectDetails, setShowProjectDetails] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const[file,setFile]=useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [repoName, setRepoName] = useState('');
//   const [pmGithubUsername, setPmGithubUsername] = useState('');
//   const [userGithubUsername, setUserGithubUsername] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   setTimeout(() => {
//     setIsLoading(false);
//   }, 2000);

  
//   const itemsPerPage = 5;
//   const { id } = useParams();

//   const loaditem = async () => {
//   const result = await axios.get(getUrl,{
//       headers: {
//         'ngrok-skip-browser-warning': 'true'
//       }}) .then((result) => {
//       setItem(result.data);
//       setIsLoading(false);
//       // handleViewDetails(result.data);
//       // setSelectedProject(result.data);
//       // console.log(res, "hello");
//     })
//     .catch((error)=>{
//       console.log(error,'hi');
//       setIsLoading(false);
//     })
//   }





//   useEffect(() => {
//     loaditem();
// }, []);

// const csvDataProj = item.map((entry) => ({
//   'project Id': entry.projectId,
//   'project Name': entry.projectName,
//   'project Description': entry.projectDescription
 
// }));



// const handleViewDetails = (project) => {
//   setSelectedProject(project);
//   setShowProjectDetails(true);
// };

// const handleCloseDetails = () => {
//   setShowProjectDetails(false);
// };

// React.useEffect(() => {
//   handlePaginate(1);
// }, [item]);



// const createOnclick=()=>{
//   navigate('/CreateProject')
// }

// console.log(item);
// // const handlePaginate = (pageNumber) => {
// //   const indexOfLastItem = pageNumber * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
// //   setCurrentPageData(currentItems);
// // };
// const handlePaginate = (pageNumber) => {
//   const indexOfLastItem = pageNumber * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//   setCurrentPageData(currentItems);
// };

// const handleSearchChange = (e) => {
//   setSearchQuery(e.target.value);
//   handleFilterItems(e.target.value);
// };

// const handleFilterItems = (searchQuery) => {
//   const filteredItems = item.filter((item) =>
//     item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   setCurrentPageData(filteredItems.slice(0, itemsPerPage));
// };



  
//   const deleteUser = async (projectId) => {
//     await axios.delete(`https://${ngrokUrlSwe}/api/projects/delete/${projectId}`);
//     navigate('/AdminDashboard')
//     setShowConfirmDialog(false);
//     loaditem();
// };

// const filteredItems = item.filter((item) =>
// item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
// );

// return (

//   <div className='parent-admin'>
//     <div style={{ height: '100vh', overflow: 'scroll initial' }}>
//       <Sidebar />
//     </div>

//     <div className='admin-child'>
//       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', marginLeft: '40px', marginRight: '30px' }}>
//         <div class="ui left icon input">
//           <input type="text" placeholder="Search Project..." value={searchQuery} onChange={handleSearchChange} />
//           <i class="users icon"></i>
//         </div>

//         <div> 
//           {item.length > 0 && (
//             <div style={{ marginTop: '20px' }}>
//               <button class="ui button" onClick={createOnclick}>Create Project</button>
//               <CSVLink data={csvDataProj} filename="user_project_list.csv" className="btn btn-primary">
//                 Download CSV
//               </CSVLink>
//             </div>
//           )}
//         </div>
//       </div>
//       {isLoading ? (
//         <div>
//           <LoadingPage />
//         </div>
//       ) : (

//       <div style={{ marginLeft: '20px', marginRight: '30px' }}>
//         <table class="ui celled table">
//           <thead>
//             <tr>
//               <th>Project-ID</th>
//               <th>Project-Name</th>
//               <th>Project-Description</th>
//               <th className='text-center'>View</th>
//               <th className='text-center'>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPageData.map((item, index) => (
//               <tr key={item.projectId}>
//                 <td>{item.projectId}</td>
//                 <td>{item.projectName}</td>
//                 <td>{item.projectDescription}</td>
//                 <td className="text-center">
//                   <button
//                     className="btn btn-outline-info mx-2"
//                     onClick={() => handleViewDetails(item)}
//                   >
//                     <FontAwesomeIcon icon={faEye} />
//                   </button>
//                 </td>
//                 <td className='text-center'>
//                   <Link>
//                     <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(item.projectId)}>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                     <DialogBox
//                       show={showConfirmDialog === item.projectId}
//                       onClose={() => setShowConfirmDialog(null)}
//                       onConfirm={() => deleteUser(item.projectId)}
//                     />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div>
//           <div className='pagination'>
//             <Pagination data={filteredItems} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
//           </div>
//           {showProjectDetails && (
//             <ProjectDetails project={selectedProject} onClose={handleCloseDetails} />
//           )}
//         </div>
//       </div>
//       )}
//     </div>
      
    
//   </div>
// );


// };

// export default AdminDashboard;
