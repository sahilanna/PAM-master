import React, { useState, useEffect } from 'react'
import PmSidebar from './pmSidebar'
import { ngrokUrl } from '../../../network/config'
import api from '../../../network/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ClearAllDialogue from './clearAllDialogue'
import { useNavigate } from 'react-router-dom'

function ShowAllNotification() {
  const navigate=useNavigate()
    const[allNotification, setAllNotification]=useState([])
    const [showNotifyDialog, setShowNotifyDialog] = useState(false);
    let data = sessionStorage.getItem("item");
    let user = JSON.parse(data);
    
    const pmName=user.name

    const fetchNotification= async ()=>{
       
        try {
         const response= await api.get(`https://${ngrokUrl}/request/all/PM?pmName=${pmName}`);
          
         setAllNotification(response.data)
           
           
        } catch (error) {
          console.log(error);
        }   
    
  }
  useEffect(() => {
    fetchNotification();
  }, []);

  const clearNotification= async ()=>{
   
      await api.delete(`https://${ngrokUrl}/request/clearAll`);   
      navigate('/showAllNotification')
      setShowNotifyDialog(true);
       fetchNotification()
  }
  const handleDeleteProject = () => {
    setShowNotifyDialog(true);
  };
  const confirmDeleteProject = async () => {
    await clearNotification();
    setShowNotifyDialog(false);
  };
  const cancelDeleteProject = () => {
    setShowNotifyDialog(false);
  };
  



  return (
   
    <div className='parent-admin'>
    <div style={{ height: '100vh', overflow: 'scroll initial' }}>
 <PmSidebar/>
    </div>
    
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <div style={{marginTop:'80px', marginLeft:'280px'}}>
      <div style={{paddingLeft:'270px'}}>
      <button className="btn btn-danger mx-2" onClick={()=>handleDeleteProject()}>
    <FontAwesomeIcon icon={faTrash} /></button>
    <ClearAllDialogue
        show={showNotifyDialog} 
        onClose={()=>cancelDeleteProject()}
        onConfirm={()=>confirmDeleteProject()}
        
    />

      </div>

     
    <table class="ui celled table" >
        <thead>
           
            <th>Notification</th>
          
            
        </thead>
        <tbody>
          {allNotification && allNotification.length>0 ? (
           allNotification.map((item, index) => (
   
          
            <tr key={index}>
              <td>{item.response}</td>
             
            </tr>         
                 
            
           ))
          ):(
            <tr>
            <td colSpan="2">No notifications</td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
     
       

  
  
     
  )
}

export default ShowAllNotification