import React, {useEffect, useState} from 'react'
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios'
import Create from '../Create/Create'
// import Create from '../../Roles/Create/Create'
import {Link, Navigate, useParams}  from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import Update from '../Update/Update'
import "./Read.css"

export default function Read(){

    const navigate=useNavigate()
    const getUrl =  "https://64267bccd24d7e0de470e2b7.mockapi.io/Crud"
    const delUrl = "https://225f-106-51-70-135.ngrok-free.app/api/projects/delete/2"
    const [item, setItem] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const[gitRepoLink,setGitRepoLink]=useState('')

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
        await axios.delete(`https://6429847d5a40b82da4d494b2.mockapi.io/PAM/${id}`);
        loaditem();
      };

    const viewUser = async (id) => {
        await axios.get(`https://6429847d5a40b82da4d494b2.mockapi.io/PAM/${id}`);
        loaditem();
      }
      

   

    return(

      <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          {/* <thead colspan = '5'>
            
          </thead> */}
          <tbody>
          <tr>
              <th className='col' >Project-ID</th>
              <th className='col'>Project-Name</th>
              <th className='col'>Project-Description</th>
              <th className='col'>Github Repo</th>
              {/* <th className='col'>View</th> */}
              <th className='col'>Update</th>
              <th className='col'>Delete</th>
            </tr>
            {item.map((user, index) => (
              <tr>
                <td>{user.projectId}</td>
                <td>{user.projectName}</td>
                <td>{user.projectDescription}</td>
                <td><a href={user.gitRepoLink}>{user.gitRepoLink}</a></td>
                {/* <td>
                  
                  <Link className="btn btn-danger mx-2" to={'/View'}
                    onClick={() => viewUser(user.projectId)}>
                    View
                  </Link>
                </td>
                 */}
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/Update/${user.projectId}`} >
                    Update
                  </Link>
                  </td>
                   <td>
                  <button className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.projectId)}>
                    Delete
                  </button>
                  {/* <button onClick={() => setShowConfirm(true)}>
                    Delete
                  </button>
                  {showConfirm && (
                  <div>
                    <p>Are you sure you want to delete?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={() => setShowConfirm(false)}>No</button>
                  </div>
                  )} */}

                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
   )
}
