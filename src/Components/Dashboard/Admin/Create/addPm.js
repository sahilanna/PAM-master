import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Modal, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { ngrokUrl, gitAccessToken } from '../../../../Assets/config.js';
import api from '../../api.js';



const AddPm = () => {
  const [options, setOptions] = useState([]);
  const [repo, setRepo] = useState('');
  
  let navigate = useNavigate()
  const[username,setusername]= useState([]);
  const[repoId,setRepoId]=useState('')
  const[selectedRepo, setSelectedRepo]=useState('')

  const accessToken=gitAccessToken
  const handleUserNameChange=(event,{value})=>{
    setusername(value)
  }
 

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/usernames/role/project_manager`);
        setOptions(response.data);
        const res = await api.get(`https://${ngrokUrl}/api/repositories/get`);
          const repoOptions = res.data.map(rep => ({
            key: rep.repoId,
            text: rep.name,
            value: rep.repoId
          }));
          setRepo(repoOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!selectedRepo){
      return
    }
    const owner='Bindushree-0906';
    let repo = selectedRepo
      api.post(`https://${ngrokUrl}/api/collaborators/add`,{owner, repo,username,accessToken
    })
    navigate('/addUser', { state: { selectedRepo } });
  }
  const handleRepoChange=(e, { value, options})=>{
    const selectedRepo = options.find((option) => option.value === value);
    setRepoId(value)
    console.log(repoId)
    setSelectedRepo(selectedRepo.text);
  }

  const handleSkip=()=>{
    navigate('/addUser', { state: { selectedRepo } });


  }


  
  const onClose=()=>{
    navigate(-1);
  }
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px', height:'450px' }} className='create-Project-Modal'>
    <div style={{paddingTop:'6px'}}>

      </div>
      <div style={{paddingLeft:'440px'}}>
    <Button secondary  onClick={onClose}>
        X
      </Button>
      </div>
      <Modal.Header>Add PM</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
        <Form.Field>
           <label style={{ textAlign: 'left' }}>Select Repo<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Repo"
              fluid
              selection
              options={repo}
              
              onChange={handleRepoChange}
            />
          </Form.Field>

        <Form.Field>
  <label style={{ textAlign: 'left' }}>PM Username<span style={{ color: 'red' }}>*</span></label>

  <Dropdown
              placeholder="Select Username"
              fluid
              selection
              options={options.map((name, index) => ({
                key: index,
                text: name,
                value: name
              }))}
              value={username}
               onChange={handleUserNameChange}
            />
            </Form.Field>
         

<Button type='submit' primary disabled={!selectedRepo}>Submit</Button>
<Button style={{marginLeft:'295px'}} type='submit' primary onClick={handleSkip}>Skip</Button>

        
        
        </Form>
       

        </Modal.Content>
        <Modal.Actions>
        </Modal.Actions>
        </Modal>
  );
};
export default AddPm;






