import React from 'react'
import { useNavigate } from 'react-router-dom'
import './projectDetailsNew.css'
import { Button } from 'semantic-ui-react';



function ProjectDetailsNew() {
  let navigate = useNavigate();

const handleClick =()=>{
  navigate('/CreateRepo')
  
}

  return (
    <div>
    <h1 className="project-heading">Project Details</h1>
    <div className="project-box">
      <div className="project-info">
        <p>Project name: xyz</p>
        <p>Project Description: hjskjsjjsss</p>
        <p>Figma link: <a href="www.figma.com">www.figma.com</a></p>
        <Button onClick={handleClick}>Add Repo</Button>
      </div>
    </div>
  </div>
  
  )
}

export default ProjectDetailsNew