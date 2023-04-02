// import React,{useEffect, useState} from 'react'
// import { Table,Button} from 'semantic-ui-react'
// import axios from 'axios'

// export default function Read() {
//     const[apiData, setApiData]=useState([])
    

//     useEffect(() => {
//         axios.get('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD',).then((getData)=>{
//              setApiData(getData.data)
//         })
   
//     })
    
//     return(
// <Table singleLine>
//     <Table.Header>
//       <Table.Row>
//         <Table.HeaderCell>Name</Table.HeaderCell>
//         <Table.HeaderCell>Registration Date</Table.HeaderCell>
//         <Table.HeaderCell>E-mail address</Table.HeaderCell>
//         <Table.HeaderCell>Premium Plan</Table.HeaderCell>
//       </Table.Row>
//     </Table.Header>

//     <Table.Body>
//         {apiData.map((data)=>{
//             <Table.Row>
//             <Table.Cell>{data.ProjectId}</Table.Cell>
//             <Table.Cell>{data.ProjectName}</Table.Cell>
//             <Table.Cell>{data.ProjectDesc}</Table.Cell>
//             <Table.Cell>
//                 <Button>Update</Button>

//             </Table.Cell>
//             <Table.Cell>
//                 <Button>Delete</Button>
//             </Table.Cell>
//           </Table.Row>

//         })}
      
//       </Table.Body>
//       </Table>
//     )
// }
import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import Create from '../Create/Create'
import './Read.css'
import {Link}  from 'react-router-dom'

export default function Read(){

    const[apiData, setApiData]=useState([])
        useEffect(() => {
        axios.get('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD').then((getData)=>{
             setApiData(getData.data)
        })
    },[])

    const setData = (id, projectId, projectName, projectDesc) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('projectId', projectId)
        localStorage.setItem('projectName', projectName)
        localStorage.setItem('projectDesc', projectDesc)
    }
    
    const getData = () => {
        axios.get('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD')
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const OnDelete = (id) => {
        axios.delete('https://6426a3c1d24d7e0de474780a.mockapi.io/CRUD/${id}')
        .then(() => {
            getData();
        })
    }



    return(
    <div> 
  <Table celled className = 'tc'> 
    <Table.Header className='th'>
      <Table.Row colspan='3'>
        <Table.HeaderCell colspan>Project Name</Table.HeaderCell>
        <Table.HeaderCell>Project Description</Table.HeaderCell>
        <Table.HeaderCell>Update</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {apiData.map((data) => {
            const setID = (id)=>{
                console.log(id);
                localStorage.setItem('ID', id);
            }
            return(
                <Table.Row>
                <Table.Cell className='td'>{data.projectId}</Table.Cell>
                <Table.Cell >{data.projectName}</Table.Cell>
                <Table.Cell>{data.projectDesc}</Table.Cell>
                <Table.Cell>
                    <Link to='/Update'>
                    <Button onClick={() => setID(data.id)}>Update</Button>
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to='/Delete'>
                    <Button onClick={() => OnDelete(data.id)}>Delete</Button>
                    </Link>
                </Table.Cell>
              </Table.Row>

            )
        })}
     
     
    </Table.Body>
  </Table>
  </div>
)

}
