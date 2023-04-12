import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import Create from '../Create/Create'
// import Create from '../../Roles/Create/Create'
import './Read.css'
import {Link, Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import Update from '../Update/Update'

export default function Read(){
    
   const navigate=useNavigate()
    const getUrl =  "https://cc0f-106-51-70-135.ngrok-free.app/api/projects/allProjects"
    const delUrl = "https://cc0f-106-51-70-135.ngrok-free.app/api/projects/delete/3"
    const [item, setItem] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const { id } = useParams();

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
        await axios.delete(`https://cc0f-106-51-70-135.ngrok-free.app/api/projects/delete/${id}`);
        loaditem();
      };





    

    return(
        <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
            <th scope="col">Project-ID</th>
              <th scope="col">Project-Name</th>
              <th scope="col">Project-Description</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {item.map((user, index) => (
              <tr>
                <td>{user.projectId}</td>
                <td>{user.projectName}</td>
                <td>{user.projectDescription}</td>
                <td>
                  {/* <Link className="btn btn-primary mx-2" to={`/Read/${user.id}`}>
                    View
                  </Link>  */}


                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/Update/${user.projectId}`}
                  >
                    Update
                  </Link>
                  
                  <button className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.projectId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
   )
}

    // const[apiData, setApiData]=useState([])
    //     useEffect(() => {
    //     axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/').then((response)=>{
    //     console.log(response.data)  
    //     setApiData(response.data)
    //     })
    // },[])

    // const setData = (data) => {
    //     let {id,projectId, projectName, projectDescription}=data;
    //     localStorage.setItem('id',id)
    //     localStorage.setItem('projectId', projectId)
    //     localStorage.setItem('projectName', projectName)
    //     localStorage.setItem('projectDescription', projectDescription)
    // }
    
    // const getData = () => {
    //     axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/')
    //         .then((getData) => {
    //             setApiData(getData.data);
    //         })
    // }

    // const OnDelete = (id) => {
    //     axios.delete('https://6429847d5a40b82da4d494b2.mockapi.io/PAM')
    //     .then((getData) => {
    //         console.log(id.getData());



   

    // return(
    //     <div> 
    //   <Table celled className = 'tc'> 
    //     <Table.Header className='th'>
    //       <Table.Row colspan='3'>
    //         <Table.HeaderCell colspan>Project ID</Table.HeaderCell>
    //         <Table.HeaderCell >Project Name</Table.HeaderCell>
    //         <Table.HeaderCell>Project Description</Table.HeaderCell>
    //         <Table.HeaderCell>Update</Table.HeaderCell>
    //         <Table.HeaderCell>Delete</Table.HeaderCell>
    //       </Table.Row>
    //     </Table.Header>
    
    //     <Table.Body>
    //         {item.map((data) => {
                
    //             return(
    //                 <Table.Row>
    //                 <Table.Cell className='td'>{data.projectId}</Table.Cell>
    //                 <Table.Cell >{data.projectName}</Table.Cell>
    //                 <Table.Cell>{data.projectDescription}</Table.Cell>
    //                 <Table.Cell>
    //                     <Link to='/Update'>
    //                     <Button onClick={() => setData(apiData)}>Update</Button>
    //                     </Link>
    //                 </Table.Cell>
    //                 <Table.Cell>
                        
    //                 <Button onClick={() => OnDelete(data.id)}>Delete</Button>
                       
    //                    </Table.Cell>
    //                  </Table.Row>
               
       
    //                )
    //            })}
            
            
    //        </Table.Body>
    //      </Table>
    //      </div>
    //    )
       
    //    }
    
        // const[apiData, setApiData]=useState([])
        //     useEffect(() => {
        //     axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/').then((response)=>{
        //     console.log(response.data)  
        //     setApiData(response.data)
        //     })
        // },[])
    
        // const setData = (data) => {
        //     let {id,projectId, projectName, projectDescription}=data;
        //     localStorage.setItem('id',id)
        //     localStorage.setItem('projectId', projectId)
        //     localStorage.setItem('projectName', projectName)
        //     localStorage.setItem('projectDescription', projectDescription)
        // }
        
        // const getData = () => {
        //     axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/')
        //         .then((getData) => {
        //             setApiData(getData.data);
        //         })
        // }
    
        // const OnDelete = (id) => {
        //     axios.delete('https://6429847d5a40b82da4d494b2.mockapi.io/PAM')
        //     .then((getData) => {
        //         console.log(id.getData());
                
        //     })
        // }
    
    //     })
    // }
