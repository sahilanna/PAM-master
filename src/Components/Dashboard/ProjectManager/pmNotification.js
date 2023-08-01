import React from 'react'
import PmSidebar from './pmSidebar'
import { useState, useEffect } from 'react'
import api from '../api'
import { ngrokUrl } from '../../../Assets/config'
import {toast, ToastContainer} from 'react-toastify'
import {Button} from 'semantic-ui-react'

function PmNotification() {
    const[notification, setNotification]=useState([])
    const[accessRequestId, setAccessRequestId]=useState([])
    let data = sessionStorage.getItem("item");
    let user = JSON.parse(data);
    const accessToken=user.token
    
    const  id=user.id
    const pmName=user.name
    const fetchNotification = async () => {
        try {
          const response = await api.get(`https://${ngrokUrl}/api/request/notiPM?pmName=${pmName}`);
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

  return (
    <div className='parent-admin'>
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
 <PmSidebar/>
    </div>
    
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <div style={{marginTop:'80px'}}>
    <table class="ui celled table">
        <thead>
           
            <th>Notification</th>
            <th>Close</th>
            
        </thead>
        <tbody>
          {notification && notification.length>0 ? (
           notification.map((item, index) => (
   
          
            <tr key={index}>
              <td>{item.response}</td>
              <td>
                <Button style={{color:'red'}} onClick={() => onDeleteNotification(item.accessRequestId)}>X</Button>
              </td>
            </tr>         
                 
            
           ))
          ):(
            <tr>
            <td colSpan="2">No data available</td>
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