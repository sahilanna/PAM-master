import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';

function DeleteRepo() {

    const[repo,setRepo]=useState('');
    const[repoId,setRepoId]=useState('')
    const[selectedRepo, setSelectedRepo]=useState('')
    let navigate=useNavigate();
    const fetchProjects = async () => {
        try {
          const response = await axios.get(`https://${ngrokUrlSwe}/api/repositories/get`, {
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          });
          const repoOptions = response.data.map(rep => ({
            key: rep.repoId,
            text: rep.name,
            value: rep.repoId
          }));
          setRepo(repoOptions);
        } catch (error) {
          console.log('Error fetching Projects:', error);
        }
      };
    
    
          useEffect(()=>{
            fetchProjects()
        
          },[])

          const handleSubmit = (e) => {
            e.preventDefault();
            const response=axios.delete(`https://${ngrokUrlSwe}/api/repositories/${repoId}`,)
          
          
            
            
          };


          const handleRepoChange=(e, { value, options})=>{
            const selectedRepo = options.find((option) => option.value === value);
            setRepoId(value)  
            console.log(repoId)
            // console.log("repoValue",value)
            setSelectedRepo(selectedRepo.text);
          }

          const onClose=()=>{
            navigate(-1);
          }
    
  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0', width: '500px', height: '600px' }}>
        <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
        <div style={{ paddingLeft: '442px' }}>
          <Button secondary onClick={onClose}>
            X
          </Button>
        </div>
        <Modal.Header>REPO</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
           
           <Form.Field>
            <Dropdown
              placeholder="Select Repo"
              fluid
              selection
              options={repo}
              // value={item1}
              onChange={handleRepoChange}
            />
          </Form.Field>

          <Button type='submit'>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
  )
}

export default DeleteRepo
