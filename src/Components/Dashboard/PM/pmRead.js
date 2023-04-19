import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import {Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useReducer } from 'react'
import PmCreate from './pmCreate'
import NavBar from '../../NavBar'
import './Display.css'
import PmUpdate from './pmUpdate'
import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact'


export default function PmRead(){

    const navigate = useNavigate();
    const getUrl =  "https://b619-106-51-70-135.ngrok-free.app/api/users/role/project_manager";
    const delUrl = "https://b619-106-51-70-135.ngrok-free.app/api/projects/delete/3";   
    const [item, setItem] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enumRole,setEnumRole]=useState('2');
    const { ID } = useParams();

    useEffect(() => {
      loaditem();
    }, []);

    const loaditem = async () => {
      const result = await axios.get(getUrl,{
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }}) .then((result) => {
          setItem(result.data);
          // console.log(res, "hello");
        })
        .catch((error)=>{
          console.log(error,'hi');
        })
      };

      const deleteUser = async (id) => {
        await axios.delete(`https://b619-106-51-70-135.ngrok-free.app/api/users/delete/${id}`);
        loaditem();
      };

    return(
<div>
<div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader>
      <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Roles" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Role</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/pmCreate" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Create PM</CDBSidebarMenuItem>
            </NavLink>
            </CDBSidebarMenu>
            </CDBSidebarContent>
            </CDBSidebar>
      <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          {/* <thead colspan = '5'>
            
          </thead> */}
          <tbody>
          <tr>
              <th className='col'>PM-ID</th>
              <th className='col'>PM-Name</th>
              <th className='col'>PM-Email</th>
              <th className='col'>Update</th>
              <th className='col'>Delete</th>
            </tr>
            {item.map((user, index) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/PmUpdate/${user.id}`} 
                  >
                    Update
                  </Link>
                  </td>
                   <td>
                  <button className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
)
}

