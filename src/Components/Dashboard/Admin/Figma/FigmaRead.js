import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FigmaCreate from './FigmaCreate';
import { Button, Icon } from 'semantic-ui-react';


function FigmaRead() {
    const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  
   
    
   
  return (
    <div>
      <h1>Figma</h1>
         <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
        <div class="ui left icon input">

  <input type="text" placeholder="Search repo..."  ></input>
  <i class="users icon"></i>
  </div>
  <button class="ui button"> Create Figma</button>


    
    </div>
    <div style={{marginLeft:'20px',marginRight:'30px'}}>
    <table class="ui celled table">
        {/* <thead colspan = '5'>
        </thead> */}
        <thead>
            <th>Project Name</th>
            <th>Figma URL</th>
            <th>ADD User</th>
           
         </thead>
         <tbody>
            <td>1</td>
            <td>www.figma.com</td>
            <td>
            
    
                
            <Button Link='figmaCreate' color="blue" icon labelPosition="left">
      <Icon name="plus" />
      Add
    </Button>
  </td>
         </tbody>
         </table>
         </div>
    </div>
  )
}

export default FigmaRead;