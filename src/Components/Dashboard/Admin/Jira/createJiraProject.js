import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { Modal,Button, Form, Dropdown} from 'semantic-ui-react'
import { ngrokUrlSwe, ngrokUrl } from '../../../../Assets/config'

function CreateJiraProject() {

    const projectType=['software', 'business','service_desk']
    const[projectKey, setProjectKey]=useState()
    const[selectedProjectType, setSelectedProjectType]=useState()
    const[projectName, setProjectName]=useState()
    const[projectData, setProjectData]=useState([])
    const navigate=useNavigate()
    const[key,setKey]=useState()
    const[name, setName]=useState()
    const[projectTypeKey,setProjectTypeKey]=useState()
    const[selectedProjectId, setSelectedProjectId]=useState()
    const [isFormValid, setIsFormValid] = useState(false);
    const leadAccountId= '6412a5c6af3b93d8ecf20f2e'

    const handleProjectNameChange =  (e) => {
        setProjectName(e.target.value);
        setName(projectName)
        
      };

      const validateForm = () => {
        const isProjectKeyValid = projectKey.trim() !== '';
        const isProjectTypeValid = selectedProjectType !== '';
        const isProjectNameValid = projectName.trim() !== '';
        const isProjectIdValid = selectedProjectId !== '';
    
        setIsFormValid(isProjectKeyValid && isProjectTypeValid && isProjectNameValid && isProjectIdValid);
      };
      const fetchProjects = async () => {
        try {
          const response = await api.get(`https://${ngrokUrl}/api/projects/allProjects`);
          const projOptions = response.data.map(proj => ({
            key: proj.projectId,
            text: proj.projectName,
            value: proj.projectId
          }));
          setProjectData(projOptions);
        } catch (error) {
          console.log('Error fetching Projects:', error);
        }
      };
      
      useEffect(() => {
        fetchProjects();
      }, []);

      const handleProjectKeyChange =  (e) => {
        setProjectKey(e.target.value);
       setKey(projectKey)
        
      };

      const handleProjectTypeChange = (e, { value }) => {
        setSelectedProjectType(value);
        console.log(selectedProjectType)
        setProjectTypeKey(selectedProjectType)
      };

      const handleProjectIdChange=(e,{value})=>{
        const pid=value
        setSelectedProjectId(pid)
        console.log(selectedProjectId)
      }
      

    const handleSubmit= async ()=>{
        try{

          validateForm(); // Validate the form before submitting

          if (!isFormValid) {
            console.log('Form is not valid'); // You can handle this case as needed
            return;
          }
    
            
          const response=await api.post(`https://${ngrokUrl}/jira/create-project?projectId=${selectedProjectId}`,{key,name, projectTypeKey,leadAccountId})
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
            <label>Projects<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
  placeholder="Select Project"
  fluid
  selection
  options={projectData} // Use the array of project options here
  value={selectedProjectId} // Set the selected value
  onChange={handleProjectIdChange}
/>
          </Form.Field>
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
          <Button type="submit" disabled={!isFormValid}>Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
    </div>
  )
}

export default CreateJiraProject