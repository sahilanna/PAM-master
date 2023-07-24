import React, {useEffect,useState} from 'react'
import { Button, Modal, Table } from 'semantic-ui-react';
import { ngrokUrl } from '../../../Assets/config';
import api from '../api';
import UserRead from './userRead';
import { useNavigate } from 'react-router-dom';

function UserActivity(open,userId, userName) {
  let navigate=useNavigate();
  const[activityData, setActivityData]=useState([])

  useEffect(() => {
    displayActivity();
  }, []);
  
  const onClose =()=>{
    navigate(-1);
  }


  const displayActivity=async(userId)=>{
    try{
    const result = await api.get(`https://${ngrokUrl}/api/projects/files?projectId=${userId}`)
    setActivityData(result.data)
    console.log(activityData)
    }
    catch(error){
      console.log('error', error)
    }
  }
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
    <div style={{ paddingLeft: '442px' }}>
    <Button secondary onClick={onClose}>X</Button>
    </div>
    <Modal.Header>User Activity</Modal.Header>
    <Modal.Content>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th> </tr>
        </thead>

      </table>
    </Modal.Content>

    </Modal>

 
 
 
    ) 

}

export default UserActivity