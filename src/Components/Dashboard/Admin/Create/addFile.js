import React from 'react'
import { Form, Modal,Button } from 'semantic-ui-react'
import {useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { ngrokUrlSwe } from '../../../../Assets/config';


function AddFile() {

    const { state } = useLocation();
  let{ projectId } = state || {};

 const navigate=useNavigate()

    const onClose=()=>{
        navigate('/adminDashboard')
    }

    console.log(projectId)

   


    const handleSubmit = async (event) => {
        event.preventDefault();
        const file = event.target.file.files[0];
    
        // Create a new FormData object and append the file and project ID
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', projectId);
    
        try {
          // Make a POST request to your backend API
          const response = await axios.post(`http://${ngrokUrlSwe}/api/projects/uploadpdf?projectId=${projectId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          navigate('/adminDashboard')
          console.log(response.data);
        } catch (error) {
          // Handle any errors
          console.log(error);
        }
      };
  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
    <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
    
      </div>
      <div style={{paddingLeft:'442px'}}>
    <Button secondary onClick={onClose}>
        X
      </Button>
      </div>
    <Modal.Header>Add File</Modal.Header>

 

        <Modal.Content>

        <Form onSubmit={handleSubmit}>
  <Form.Field>
      <label style={{ textAlign: 'left' }} >Project ID </label>
      <input name='name' placeholder={projectId} readOnly />
      
  </Form.Field>
  <Form.Field>
      <label style={{ textAlign: 'left' }}>ADD File</label>
      <input type='file' name='file'  placeholder='FILE' />
      
  </Form.Field>


        <Button type='submit'>Submit</Button>
      </Form>
      </Modal.Content>
      <Modal.Actions>

      </Modal.Actions>
      </Modal>
  )
}

export default AddFile