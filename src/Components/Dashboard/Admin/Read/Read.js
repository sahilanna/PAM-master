
import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import Create from '../Create/Create'
import './Read.css'
import {Link}  from 'react-router-dom'

export default function Read(){
    //Create this as a funct..call that here..while creating api use this as callback..

    const[apiData, setApiData]=useState([])
    useEffect(() => {
    axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/').then((response)=>{
    console.log(response.data)
    setApiData(response.data)
    })
},[])

    const setData = (data) => {
        let {id, projectId, projectName, projectDescription} = data; 
        localStorage.setItem('id', id)
        localStorage.setItem('projectId', projectId)
        localStorage.setItem('projectName', projectName)
        localStorage.setItem('projectDescription', projectDescription)
    }
    
    const getData = () => {
        axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/')
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const OnDelete = (id) => {
        axios.delete('https://6429847d5a40b82da4d494b2.mockapi.io/PAM/3')
        .then((getData) => {
            console.log(id.getData());
        })
    }



    return(
    <div> 
  <Table celled className = 'tc'> 
    <Table.Header className='table border shadow'>
        <Table.HeaderCell>Project ID</Table.HeaderCell>
        <Table.HeaderCell>Project Name</Table.HeaderCell>
        <Table.HeaderCell>Project Description</Table.HeaderCell>
        <Table.HeaderCell>Update</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
    </Table.Header>

    <Table.Body>
        {apiData.map((data) => {
            return(
                <Table.Row>
                <Table.Cell>{data.projectId}</Table.Cell>
                <Table.Cell >{data.projectName}</Table.Cell>
                <Table.Cell>{data.projectDescription}</Table.Cell>
                {/* <Table.Cell>
                    <Link to='/Update'>
                    <Button onClick={() => setID(data.id)}>Update</Button>
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to='/Delete'>
                    <Button onClick={() => OnDelete(data.id)}>Delete</Button>
                    </Link>
                </Table.Cell>
              </Table.Row> */}

                <Table.Cell>
                    <Link to='/Update'>
                    <Button onClick={() => setData(apiData)}>Update</Button>
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
)

}
