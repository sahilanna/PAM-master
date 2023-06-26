import React from 'react'
import { useState, useEffect } from 'react';
import { ngrokUrl } from '../../../../Assets/config';
import LoadingPage from '../../../../Assets/Loader/LoadingPage';
import Sidebar from '../../SideBar/SideBar';
import api from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import './projectUsers.css'
import DialogBox from '../../DialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ProjectUsers() {
    const { state } = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const {projectName}= location.state|| {};
  console.log(projectName)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
    const navigate=useNavigate()
    const getUrl =  `https://${ngrokUrl}/api/projects/${projectId}/users`;
    const[item,setItem]=useState([])
    const[isLoading,setIsLoading]=useState(false)

    let data = sessionStorage.getItem("item");
    let user = JSON.parse(data);
    const accessToken=user.token
      const headers={AccessToken:accessToken}

    const deleteUser = async (id) => {
        await axios.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${id}`,{headers});
        navigate('/projectUsers')
        setShowConfirmDialog(false);
        userList();
        navigate('/projectUsers')
      };

    const createOnclick=()=>{
        console.log('proo',projectName)
        navigate('/addUserProject', { state: { projectId, projectName } });
    }

    


    const userList = async () => {
        const result = await api.get(getUrl) .then((result) => {
            setItem(result.data);
            setIsLoading(false);
          })
          .catch((error)=>{
            console.log(error,'hi');
            setIsLoading(true);
          })
        };
        useEffect(() => {
            userList();
          }, []);
  return (
    <div className='parent-admin'>
      <Sidebar/>
    
    <div className='admin-child'>
    <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
      
      
           
              <div style={{ marginTop: '20px' }}>
                <button className='ui button' onClick={()=>createOnclick(item.projectId,item.projectName)}>Add Employee</button>
               
              </div>
            
        
      </div>

      <div style={{marginLeft:'20px',marginRight:'30px'}}>
      {isLoading ? (
              <LoadingPage />
            ) : (
      <table class="ui celled table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Delete User</th>
              </tr>
              </thead>
              <tbody>
              {item && item.length > 0 ? (
          item.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <button className='btn btn-danger mx-2' onClick={() => setShowConfirmDialog(user.id)}><FontAwesomeIcon icon={faTrash} /> </button>
    <DialogBox
     show={showConfirmDialog === user.id}
      onClose={() => setShowConfirmDialog(null)}
      onConfirm={()=>deleteUser(user.id)}/> </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan='4'>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    )}
  </div>
</div>
</div>
  )
}
export default ProjectUsers;

/*
function ProjectUsers() {
  const { state } = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const { projectName } = location.state || {};
  const navigate = useNavigate();
  const getUrl = `https://${ngrokUrl}/api/projects/${projectId}/users`;
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  let data = sessionStorage.getItem('item');
  let user = JSON.parse(data);
  const accessToken = user.token;
  const headers = { AccessToken: accessToken };
  const deleteUser = async (id) => {
    await axios.delete(`https://${ngrokUrl}/api/projects/${projectId}/users/${id}`, { headers });
    setShowConfirmDialog(false);
    userList();
  };
  const userList = async () => {
    try {
      const result = await api.get(getUrl);
      setItem(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    userList();
  }, []);
  return (
    <div className='parent-admin'>
      <Sidebar />
      <div className='admin-child'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginBottom: '30px',
            marginLeft: '40px',
            marginRight: '30px',
          }}
        ></div>
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table className='ui celled table'>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {item && item.length > 0 ? (
                  item.map((user, index) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className='btn btn-danger mx-2'
                          onClick={() => setShowConfirmDialog(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <DialogBox
                          show={showConfirmDialog === user.id}
                          onClose={() => setShowConfirmDialog(null)}
                          onConfirm={() => deleteUser(user.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='4'>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
*/