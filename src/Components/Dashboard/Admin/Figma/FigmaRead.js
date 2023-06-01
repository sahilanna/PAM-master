// import React from 'react'
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import FigmaCreate from './FigmaCreate';
// import { Button, Icon } from 'semantic-ui-react';
// import { Modal } from 'semantic-ui-react';

// function FigmaRead() {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

   
//   return (
//     <div>
//       <h1>Figma</h1>
//          <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
//         <div class="ui left icon input">

//   <input type="text" placeholder="Search repo..."  ></input>
//   <i class="users icon"></i>
//   </div>
//   <button class="ui button"> Create Figma</button>
    
//     </div>
//     <div style={{marginLeft:'20px',marginRight:'30px'}}>
//     <table class="ui celled table">
//         {/* <thead colspan = '5'>
//         </thead> */}
//         <thead>
//             <th>Project Name</th>
//             <th>Figma URL</th>
//             <th>ADD User</th>
           
//          </thead>
//          <tbody>
//             <td>1</td>
//             <td>www.figma.com</td>
//             <td>
                
//             <Button color="blue" icon labelPosition="left" onClick={openModal}>
//       <Icon name="plus" />
//       Add
//     </Button>
//   </td>
//          </tbody>
//          </table>
//          </div>
//           {showModal && (
//         <Modal onOpen={true} onClose={closeModal}>
//           <Modal.Header>Add Project</Modal.Header>
//           <Modal.Content>
//             <FigmaCreate open={true} onClose={closeModal} />
//           </Modal.Content>
//         </Modal>
//       )}
        
      
//     </div>
//   );
// }

// export default FigmaRead;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown, Input,Icon } from 'semantic-ui-react';
import FigmaCreate from './FigmaCreate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function FigmaRead() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [item,setitem]=useState([])

  const[list,setlist]=useState([])
  const navigate=useNavigate();

  const openModal = () => {
    setShowModal(true);
  };


useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  try {
    const response = await axios.get('https://7db4-106-51-70-135.ngrok-free.app/api/figmas/getAll',{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }});
      
    setlist(response.data);
  } catch (error) {
    console.log('Error fetching projects:', error);
  }
};
useEffect(() => {
  const filteredProjects = list.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredProjects(filteredProjects);
}, [searchQuery, list]);

const CreateFigma=()=>{
  navigate('/createFigmaDetails')
}

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Figma</h1>
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
      >
        <div className="ui left icon input">
          <input type="text" placeholder="Search repo..." value={searchQuery}
            onChange={handleSearchChange}/>
          <i className="users icon"></i>
        </div>
        <button className="ui button" onClick={CreateFigma} >
          Create Figma
        </button>
      </div>
      <div style={{ marginLeft: '20px', marginRight: '30px' }}>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Figma URL</th>
              <th>ADD User</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project,index) => (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                
                {/* <td>{project.figmaURL}</td> */}
                <a href={project.figmaURL} target="_blank" rel="noopener noreferrer">
                    {project.figmaURL}
                    
                    
                  </a>
                <td>
                  <Button
                    color="blue"
                    icon
                    labelPosition="left"
                    onClick={openModal}
                  >
                    <Icon name="plus" />
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <FigmaCreate onClose={closeModal} />
      )}
    </div>
  );
}

export default FigmaRead;
