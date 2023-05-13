import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddUser from './addUser.js';
import { useDispatch } from 'react-redux';
import { createPmGithubName } from '../../../../Login/redux-store/actions/action.js';


const AddPm = () => {
  
  
  const [options, setOptions] = useState([]);
  const [error,setError]=useState('false');
  let navigate = useNavigate()
  const { state } = useLocation();
  let{ projectName, repo } = state || {};
  const[username,setusername]= useState('');
  let[projectNameA,setProjectNameA]=useState('')
  // let[repoA,setRepoA]=useState('');

  // const handleSubmit=()=>{
  //   navigate('/addUser');
  // }
  useEffect(() => {
    fetch(`https://b1de-106-51-70-135.ngrok-free.app/api/users/role/project_manager`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }}).then((response)=>response.json())
    .then((data)=>setOptions(data))
  
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const owner='swe1304';
    const accessToken='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';
    if(!projectName || !options||projectName.length===0 ||  options.length === 0){
      setError(true)
  }
  if(projectName && options)
  {
    // dispatchPmGithub(createPmGithubName({projectName, repo, username}));
    const response= axios.post('https://b1de-106-51-70-135.ngrok-free.app/api/collaborators/add',{owner, repo,username,accessToken
    })
    projectNameA=projectName;
    console.log("hi",projectNameA)
    // repoA=repo;
    navigate('/addUser', { state: { projectNameA, repo } });
    console.log(projectName)
    console.log(repo)
  }
  }
  // const { projectName, repo } = useLocation();
 
  return (
    <div className="form-display">
      <Form className="form-style">
        <h1> Add Project-Manager to Repo</h1>

        <Form.Field>
          <label>Project Name</label>
          <input name="projectName" value={projectName || ''}  readOnly/>
        </Form.Field>

        <Form.Field>
          <label>Repository Name</label>
          <input name="repoName" value={repo|| ' '} readOnly />
        </Form.Field>

        <Form.Field>
          <label>PM Username</label>
          <select onChange={(e) => setusername(e.target.value)}>
            {options.map((item, index) => (
              <option key={item.githubUsername} value={item.githubUsername}>
                {item.githubUsername}
              </option>
            ))}
          </select>
        </Form.Field>


        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default AddPm;






// import React from 'react'
// import Create from './Create'
// import ParentComponent from './parentForm'

// const addPm = ({projectName}) => {
  
//   return (
//     <div>
//        <h2>Add Project Manager</h2>
//       <p>Project Name: {projectName}</p>
//        <form>
      
//       <label>
//         Name:
//         <input type="text"  />
//       </label>
//       {/* <label>
//         Email:
//         <input type="email" value={formData.email} readOnly />
//       </label> */}
//       {/* Additional form fields and logic for the second form */}
//     </form>
//     </div>
//   )
// }

// export default addPm


// import React, { useState } from "react";
// import "../css/Startupcard.css";
// import Pagination from "./pagination";
// import "../css/pagination.css";
// // import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// function AdminsearchResults(props) {
//     const navigate = useNavigate();
//     const role = localStorage.getItem('role');
//     const formData = useLocation();
//     const previousData = formData.state;
//     const { adminsearchResults } = props;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(6);
//     const [selectedStartups, setSelectedStartups] = useState([]);
//     const [previewData, setPreviewData] = useState(null);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = adminsearchResults.slice(
//         indexOfFirstItem,
//         indexOfLastItem
//     );
//     const handleStartupSelection = (id, name) => {
//         const existingStartup = selectedStartups.find((s) => s.id === id);
//         if (existingStartup) {
//             setSelectedStartups(selectedStartups.filter((s) => s.id !== id));
//         } else {
//             setSelectedStartups([...selectedStartups, { id, name }]);
//         }
//     };
//     const handleSelectAll = () => {
//         setSelectedStartups(
//             adminsearchResults.map((s) => ({ id: s.startUpId, name: s.startUpName }))
//         );
//     };
//     const handleSaveSelection = () => {
//         const selectedStartupsObj = selectedStartups.map((id) => ({
//             startUpId: id,
//         }));
//         const data = {
//             startDate:
//                 previousData.formData.startDate +
//                 "T" +
//                 previousData.formData.startTime +
//                 ":00",
//             title: previousData.formData.windowName,
//             endDate:
//                 previousData.formData.endDate +
//                 "T" +
//                 previousData.formData.endTime +
//                 ":00",
//             sector: previousData.formData.sector,
//             totalInvestment: "1000000",
//             startupDetails: selectedStartupsObj,
//         };
//         console.log(data);
//         setPreviewData(data);
//     };
//     const handleConfirm = () => {
//         const selectedStartupsObj = selectedStartups.map((startup) => ({
//             startUpId: startup.id,
//         }));
//         const data = {
//             startDate:
//                 previousData.formData.startDate +
//                 "T" +
//                 previousData.formData.startTime +
//                 ":00",
//             title: previousData.formData.windowName,
//             endDate:
//                 previousData.formData.endDate +
//                 "T" +
//                 previousData.formData.endTime +
//                 ":00",
//             sector: previousData.formData.sector,
//             totalInvestment: "1000000",
//             startupDetails: selectedStartupsObj,
//         };
//         console.log(data);
//         setPreviewData(data);
//         const jsonData = JSON.stringify(data);
//         fetch("http://192.168.1.128:8080/api/v1/createinvestment", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: jsonData,
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     console.log("Data sent to backend successfully");
//                 } else {
//                     console.error("Error sending data to backend");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error sending data to backend:", error);
//             });
//     };
//     const handleCancel = () => {
//         setPreviewData(null);
//     };
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     return (
//         <>
//         {/* {role === 'ADMIN' && ( */}
//             <button className="Selectall" onClick={handleSelectAll}>Select all</button>
//             {/* )} */}
//             <div className="main-container">
//                 {currentItems.map((item) => (
//                     <div className="card-container" key={item.startUpId}>
//                         <div className="card-photo">
//                             <img
//                                 src="https://scontent.fblr2-2.fna.fbcdn.net/v/t39.30808-6/326718397_524698639759373_9212873424182205737_n.png?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mxCWiAvE9-AAX8licR5&_nc_ht=scontent.fblr2-2.fna&oh=00_AfACoTSJjXtFede1XzthKz196OGNt37NRWz6IJ6qnNNzsg&oe=644518DC"
//                                 alt="user"
//                             />
//                         </div>
//                         <div className="cunt">
//                             <div className="card-name">
//                                 <h7>
//                                     <b>{item.startUpName}</b>
//                                 </h7>
//                             </div>
//                             <div className="card-location">
//                                 <h9>{item.price}</h9>
//                             </div>
//                         </div>
//                         <div className="card-bio">{item.summary}</div>
//                         <div className="card-btn-cont">
//                             <button className='card-button' onClick={() => navigate(`/profileStartup/${item.startUpId}`)}><b>Know More</b></button>
//                             {/* {role === 'ADMIN' && ( */}
//                                 <button
//                                     className="card-button"
//                                     onClick={() =>
//                                         handleStartupSelection(item.startUpId, item.startUpName)
//                                     }
//                                 >
//                                     <b>
//                                         {selectedStartups.some(
//                                             (startup) => startup.id === item.startUpId
//                                         )
//                                             ? "Deselect"
//                                             : "Select"}
//                                     </b>
//                                 </button>
//                             {/* )} */}
//                             {/* <button className='card-button' onClick={() => navigate(`/profileStartup?startupId=${item.startupId}`) }><b>Know More</b></button> */}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <Pagination
//                 itemsPerPage={itemsPerPage}
//                 totalItems={adminsearchResults.length}
//                 paginate={paginate}
//                 currentPage={currentPage}
//             />
//             {/* {role === 'ADMIN' && ( */}
//             <button className="Saveselection" onClick={handleSaveSelection}>Save selection</button>
//             {/* )} */}
//             {previewData && (
//                 <div className="preview-container">
//                     <h2>Investment Details Preview</h2>
//                     <p>
//                         <b>Start Date: </b>
//                         {previousData.formData.startDate} {previousData.formData.startTime}
//                     </p>
//                     <p>
//                         <b>Window Name: </b>
//                         {previousData.formData.windowName}
//                     </p>
//                     <p>
//                         <b>End Date: </b>
//                         {previousData.formData.endDate} {previousData.formData.endTime}
//                     </p>
//                     <p>
//                         <b>Minimum Ticket Size: </b>50000
//                     </p>
//                     <p>
//                         <b>Sector: </b>
//                         {previousData.formData.sector}
//                     </p>
//                     <p>
//                         <b>Total Investment: </b>1000000
//                     </p>
//                     <p>
//                         <b>Selected Startups: </b>
//                     </p>
//                     <ul>
//                         {selectedStartups.map((startup) => (
//                             <li key={startup.id}>{startup.name}</li>
//                         ))}
//                     </ul>
//                     <div className="prev-button">
//                         <button className="preview-button" onClick={handleCancel}>Cancel</button>
//                         <button className="preview-button" onClick={handleConfirm}>Confirm</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
// export default AdminsearchResults;
