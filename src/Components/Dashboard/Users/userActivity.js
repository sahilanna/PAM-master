import React, {useEffect,useState} from 'react'
import { Button, Modal, Table } from 'semantic-ui-react';
import { ngrokUrl } from '../../../Assets/config';
import api from '../api';
import UserRead from './userRead';
import { useNavigate, useLocation } from 'react-router-dom';

function UserActivity(open, userName) {
  
  let navigate=useNavigate();
  const location = useLocation();
  const { id} = location.state || {};
  const[activityData, setActivityData]=useState([])


  const onClose =()=>{
    navigate(-1);
  }


  const displayActivity=async()=>{
    try{
    const result = await api.get(`https://${ngrokUrl}/api/users/${id}`)
    setActivityData([result.data])
    console.log(result.data)
   
    }
    catch(error){
      console.log('error', error)
    }
  }

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString();
  };

  useEffect(() => {
    displayActivity();
    
  }, []);
  
  
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
    <div style={{ paddingLeft: '442px' }}>
      <div style={{paddingTop:'20px'}}>
    <Button secondary onClick={onClose}  >X</Button>
    </div>
    </div>
    <Modal.Header>User Activity</Modal.Header>
    <Modal.Content>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th> Last LoggedIn Time</th>
            <th>Last LoggedOut Time</th>
            </tr>
        </thead>
        <tbody>
          {activityData.map((item,index)=>(
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{formatDate(item.lastUpdated)}</td>
              <td>{formatDate(item.lastLogout)}</td>
            </tr>
))}
        </tbody>

      </table>
    </Modal.Content>

    </Modal>

 
 
 
    ) 

}

export default UserActivity