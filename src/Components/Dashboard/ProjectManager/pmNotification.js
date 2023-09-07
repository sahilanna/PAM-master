import React, { useState, useEffect } from 'react'
import PmSidebar from './pmSidebar'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ngrokUrl } from '../../../Assets/config'
import {toast} from 'react-toastify'
import {Button} from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function PmNotification() {
  const navigate=useNavigate()
    const[notification, setNotification]=useState([])
    const[accessRequestId, setAccessRequestId]=useState([])
    let data = sessionStorage.getItem("item");
    let user = JSON.parse(data);
    
    
    
    const pmName=user.name
    const fetchNotification = async () => {
        try {
          const response = await api.get(`https://${ngrokUrl}/api/request/unread/PM?pmName=${pmName}`);
          console.log(response.data);
          setNotification(response.data)
          const requestId = response.data[0].accessRequestId;
          console.log(requestId)
    
        
        setAccessRequestId(requestId)
        console.log(accessRequestId)
        
    
         
            // Show each message as a toast notification
            toast.info(notification[0], {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 4000,
            });
          
        } catch (error) {
          console.log('Error fetching PMID:', error);
          
        }
      };
    
      useEffect(() => {
        fetchNotification();
      }, []);

      const onDeleteNotification= async (accessRequestId)=>{
       
            try {
              await api.put(`https://${ngrokUrl}/api/request/notifiedPM?accessRequestId=${accessRequestId}`);
              
             
               fetchNotification()
               
            } catch (error) {
              console.log(error);
            }   
        
      }

      const goToNotification=()=>{
        navigate('/showAllNotification')
      }

  return (
    <div className='parent-admin'>
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
 <PmSidebar/>
    </div>
    
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <div style={{marginTop:'80px', marginLeft:'280px'}}>
      <div style={{paddingLeft:'350px'}}> <Button onClick={goToNotification}>Show All</Button></div>
     
    <table class="ui celled table" >
        <thead>
           
            <th>Notification</th>
            <th>Mark as Read</th>
            
        </thead>
        <tbody>
          {notification && notification.length>0 ? (
           notification.map((item, index) => (
   
          
            <tr key={index}>
              <td><b>{item.response}</b></td>
              <td>
                <Button style={{color:'blue'}}  onClick={() => onDeleteNotification(item.accessRequestId)}>
                  <FontAwesomeIcon icon={faCheck} className="read-icon" /></Button>
              </td>
            </tr>         
                 
            
           ))
          ):(
            <tr>
            <td colSpan="2">No unread notifications</td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
     
       

  )
  }


export default PmNotification