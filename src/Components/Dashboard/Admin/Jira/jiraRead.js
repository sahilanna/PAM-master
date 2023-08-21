import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../../api'
import { ngrokUrlSwe } from '../../../../Assets/config'
import {  Button, Table } from 'semantic-ui-react'
import DialogBox from '../../DialogBox/DialogBox'
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '/home/nineleaps/PAM-master/src/Components/Dashboard/SideBar/SideBar.js'

function JiraRead() {
    const [jiraData, setJiraData]=useState([])
    const[showConfirmDialog, setShowConfirmDialog]=useState(false)
    const navigate=useNavigate()

    const fetchJira=async()=>{
        try  {        
            const response=await api.get(`https://${ngrokUrlSwe}/api/jira-read`)
            setJiraData(response.data)

    }
    catch(error){
        console.log(error)
    }
    }

    useEffect(() => {
        fetchJira();
      }, []);

   const handleDeleteProjectJira=()=>{

      }

      const navigateToJira=()=>{
        navigate('/createJiraProject')
      }
    

  return (
    <div>
        <div>
            <Sidebar/>
        </div>
        <div style={{paddingLeft:'270px'}}>
            <br/>
            <div style={{paddingLeft:'830px'}}>
                <Button onClick={navigateToJira}>Create JIRA Project</Button>
            </div>
       <table className="ui celled table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Project Name</th>
                <th>Jira Project Name</th>
              
                <th className="text-center">Delete Jira Project</th>
              </tr>
            </thead>
            <tbody>
              {jiraData.map((project, index) => (
                <tr key={project.projectId}>
                  <td>{index + 1}</td>
                  <td>{project.projectName}</td>
                  <td> {project.jiraName}</td>
                  
                  <td className="text-center">
                    <button className="btn btn-danger mx-2" >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <DialogBox
                      show={showConfirmDialog === project.driveId}
                      onClose={() => setShowConfirmDialog(null)}
                      onConfirm={() => handleDeleteProjectJira(project.projectId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

    </div>
  )
}

export default JiraRead