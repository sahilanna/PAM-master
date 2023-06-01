import React from 'react'
import { useState,useEffect } from 'react'
import { Button, Item, Sidebar, Table } from 'semantic-ui-react'
import axios from 'axios'
import {Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useReducer } from 'react'
import PmCreate from './pmCreate'
import NavBar from '../../NavBar'
import PmUpdate from './pmUpdate'
import DialogBox from '../DialogBox/DialogBox'
import Pagination from '../Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './Read.css'
import PmDetails from './PmDetails'
import { ngrokUrl } from '../../../Assets/config'
import  {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact'



function PmReadNew() {

    const navigate = useNavigate();
    // const getUrl =  "https://bc38-106-51-70-135.ngrok-free.app/api/users/role/project_manager";
    const getUrl =  `https://${ngrokUrl}/api/users/role/project_manager`;
    const delUrl = "https://77c8-106-51-70-135.ngrok-free.app/api/projects/delete/3";
    const [item, setItem] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enumRole,setEnumRole]=useState('2');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentPageData, setCurrentPageData] = useState([]);
    const[githubUsername,setgithubUsername]=useState('')
    const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
    const itemsPerPage = 5;
    
  
    const { ID } = useParams();
    useEffect(() => {
      loaditem();
    }, []);
    // const tokenData = localStorage.getItem('userData').replaceAll('"','');
    const tokenData=localStorage.getItem('userData')
    console.log(tokenData)

    const loaditem = async () => {
      const result = await axios.get(getUrl,{
          headers: {
            Authorization: `Bearer ${tokenData}`,
            'ngrok-skip-browser-warning': 'true'
          
          }}) .then((result) => {
          setItem(result.data);
          console.log(tokenData)
         
          // console.log(res, "hello");
        })
        .catch((error)=>{
          console.log(error,'hi');
          

        })
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
  
      console.log(item);
  
      useEffect(() => {
        loaditem();
    }, []);
  
    const handleViewDetails = (project) => {
      setSelectedProject(project);
      setShowProjectDetails(true);
    };
  
    const handleCloseDetails = () => {
      setShowProjectDetails(false);
    };
    
  
      React.useEffect(() => {
        handlePaginate(1);
      }, [item]);
  
      const handlePaginate = (pageNumber) => {
        const indexOfLastItem = pageNumber * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentPageData(currentItems);
      };
      
  
      const deleteUser = async (id) => {
        await axios.delete(`https://${ngrokUrl}/api/users/delete/${id}`);
        navigate('/pmReadNew')
        setShowConfirmDialog(false);
        loaditem();
        navigate('/pmReadNew')
      };
  
  const createOnclick=()=>{
    navigate('/PmCreate')
  }
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (

<div>
    
   <div>
    <Sidebar/>
    </div>
     
       
    
    <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">
  <input type="text" placeholder="Search PM..." value={searchQuery}
            onChange={handleSearchChange} ></input>
  <i class="users icon"></i>
</div>


    <button class="ui button" onClick={createOnclick} >Create PM</button>
    
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <table class="ui celled table">
        {/* <thead colspan = '5'>
        </thead> */}
        <thead>
            <th>PM-ID</th>
            <th>PM-Name</th>
            <th>PM-Email</th>
            {/* <th>PM-Github-UserName</th> */}
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
         </thead>
         <tbody>
           {filteredProjects.map((item, index) => (
    <tr key={index}>
          
          {/* {currentPageData.map((item, index) => (
            <tr> */}
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
             
              <td>
  <button
    className="btn btn-outline-info mx-2"
    onClick={() => handleViewDetails(item)}
  >
    <FontAwesomeIcon icon={faEye} />
  </button>
</td>             
              <td>
        <Link className="btn btn-outline-primary mx-2" to={`/PmUpdate/${item.id}`}>
          <FontAwesomeIcon icon={faPen} /> 
        </Link>
      </td>
      <td>
      {/* <div className="dialog-backdrop"> */}
        <button className="btn btn-danger mx-2" onClick={() => setShowConfirmDialog(item.id)}>
          <FontAwesomeIcon icon={faTrash} />   
        </button>
        {showConfirmDialog === item.id && (
      <div className="dialog-backdrop">
        <div className="dialog-container">
          <DialogBox
          
            show={showConfirmDialog === item.id}
            onClose={() => setShowConfirmDialog(null)}
            onConfirm={() => deleteUser(item.id)}
          />
        </div>
      </div>
    )}
      </td>
      
              
            </tr>
          ))}
        </tbody>

      </table>
    
    <div className='pagination'>
      
      <Pagination
      data={item} itemsPerPage={itemsPerPage} paginate={handlePaginate}
      />
    </div>
    {showProjectDetails && (
        <PmDetails project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>
    </div>

    
  )
}

export default PmReadNew;