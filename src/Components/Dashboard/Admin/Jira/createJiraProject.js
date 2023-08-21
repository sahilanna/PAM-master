import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { Modal,Button, Form, Dropdown} from 'semantic-ui-react'
import { ngrokUrlSwe } from '../../../../Assets/config'

function CreateJiraProject() {

    const projectType=['software', 'business','service_desk']
    const[projectKey, setProjectKey]=useState()
    const[selectedProjectType, setSelectedProjectType]=useState()
    const[projectName, setProjectName]=useState()
    const navigate=useNavigate()
    const[key,setKey]=useState()
    const[name, setName]=useState()
    const[projectTypeKey,setProjectTypeKey]=useState()
    const leadAccountId= '6412a5c6af3b93d8ecf20f2e'

    const handleProjectNameChange =  (e) => {
        setProjectName(e.target.value);
        setName(projectName)
        
      };

      const handleProjectKeyChange =  (e) => {
        setProjectKey(e.target.value);
       setKey(projectKey)
        
      };

      const handleProjectTypeChange = (e, { value }) => {
        setSelectedProjectType(value);
        console.log(selectedProjectType)
        setProjectTypeKey(selectedProjectType)
      };
      

    const handleSubmit= async ()=>{
        try{
            const response=await api.post(`https://${ngrokUrlSwe}/jira/create-project`,{key,name, projectTypeKey,leadAccountId})
        
        }
        catch(error){
            console.log(error)
        }
       
        }
        const onClose=()=>{
            navigate(-1)

    }

   
  return (

    <div>
        <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
      <div >
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Create a project in jira</Modal.Header>
    
       
      
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Unique Project Key<span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="Enter Project Key"
              value={projectKey}
              onChange={handleProjectKeyChange}
              
            />
          </Form.Field>
          <Form.Field>
            <label>Project Type<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Project Type"
              fluid
              selection
              options={projectType.map((name, index) => ({
                key: index,
                text: name,
                value: name
              }))}
              value={selectedProjectType}
              onChange={handleProjectTypeChange}
            />
          </Form.Field>
          <Form.Field>
          <label>Project Name<span style={{ color: 'red' }}>*</span></label>
          <input
              type="text"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={handleProjectNameChange}
              
            />
            
            
           
            </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
    </div>
  )
}

export default CreateJiraProject