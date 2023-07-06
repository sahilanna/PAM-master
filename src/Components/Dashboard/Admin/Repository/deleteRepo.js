import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ngrokUrl, ngrokUrlSwe } from '../../../../Assets/config';
import api from '../../api';

function DeleteRepo() {

    const[repo,setRepo]=useState('');
    const[repoId,setRepoId]=useState('')
    const[selectedRepo, setSelectedRepo]=useState('')
    let navigate=useNavigate();
    const fetchProjects = async () => {
        try {
          const response = await api.get(`https://${ngrokUrl}/api/repositories/get`);
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
            if(!selectedRepo){
              return
            }
            const response=api.delete(`https://${ngrokUrl}/api/repositories/${repoId}`,)
            navigate('/repoRead')
         
          };


          const handleRepoChange=(e, { value, options})=>{
            const selectedRepo = options.find((option) => option.value === value);
            setRepoId(value)  
            console.log(repoId)
            setSelectedRepo(selectedRepo.text);
          }

          const onClose=()=>{
            navigate(-1);
          }
    
  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
        <div style={{ paddingTop: '5px' }}></div>
        <div style={{ paddingLeft: '442px' }}>
          <Button secondary onClick={onClose}>
            X
          </Button>
        </div>
        <Modal.Header>Delete Repo</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
           
           <Form.Field>
           <label style={{ textAlign: 'left' }}>Select Repo<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              placeholder="Select Repo"
              fluid
              selection
              options={repo}
              // value={item1}
              onChange={handleRepoChange}
            />
          </Form.Field>

          <Button type='submit' primary disabled={!selectedRepo}>Submit</Button>
        </Form>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
        </Modal>
  )
}

export default DeleteRepo
