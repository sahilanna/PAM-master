import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {Link}  from 'react-router-dom'
import { useReducer } from 'react'
import PmCreate from './pmCreate'
import NavBar from '../../NavBar'

import  {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact'
 function PmRead(){
    // function reducer(state,action)
    // {
    //     if (action.type == 'setprojectid') {
    //         axios.post(`243ew`,{})
    //         return (
    //         );
    //       }
    // }
    // const initialstate={projectId,projectDesc,projectName}
    // const[state,dispatch]=useReducer(reducer,initialstate)
    const[apiData, setApiData]=useState([])
        useEffect(() => {
        axios.get('https://6429847d5a40b82da4d494b2.mockapi.io/PM').then((response)=>{
        console.log(response.data)
        setApiData(response.data)
        })
    },[])
    const setData = (data) => {
        let {id,pmId, pmName, projectDesc,projectId,projectName}=data;
        // dispatch({type:'setprojectid'})
        localStorage.setItem('id',id)
        localStorage.setItem('pmId',pmId)
        localStorage.setItem('projectId', projectId)
        localStorage.setItem('projectName', projectName)
        localStorage.setItem('projectDesc', projectDesc)
    }
    const getData = () => {
        axios.get('https://6429847d5a40b82da4d494b2.mockapi.io/PM')
            .then((getData) => {
                setApiData(getData.data);
            })
    }
    const OnDelete = (id) => {
        axios.delete('https://6429847d5a40b82da4d494b2.mockapi.io/PM')
        .then((getData) => {
            console.log(id.getData());
        })
    }
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
  <Table celled className = 'tc'>
    <Table.Header className='th'>
      <Table.Row colspan='3'>
        <Table.HeaderCell colspan>Project-Manager id</Table.HeaderCell>
        <Table.HeaderCell >Project-Manager-Name</Table.HeaderCell>
        <Table.HeaderCell>Project Id</Table.HeaderCell>
        <Table.HeaderCell>Project Name</Table.HeaderCell>
        <Table.HeaderCell>Project Description</Table.HeaderCell>
        <Table.HeaderCell>Update</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
        {apiData.map((data) => {
            return(
                <Table.Row>
                <Table.Cell className='td'>{data.pmId}</Table.Cell>
                <Table.Cell >{data.pmName}</Table.Cell>
                <Table.Cell>{data.projectId}</Table.Cell>
                <Table.Cell>{data.projectName}</Table.Cell>
                <Table.Cell>{data.projectDesc}</Table.Cell>
                <Table.Cell>
                    <Link to='/Update'>
                    <Button onClick={() => setData(data.id,data.projectId,data.projectName,data.projectDesc)}>Update</Button>
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Button onClick={() => OnDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            )
        })}
    </Table.Body>
  </Table>
  </div>
  </div>
)
}

export default PmRead;