import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';
import { NGROK_URL } from '../../../../network/config';
import api from '../../../../network/api';
import { useNavigate  } from 'react-router-dom';
import logger from '../../../../utils/logger.js';

const FigmaCreate = ({ onClose, figmaURL, projectId, figmaId}) => {
  const[figmaUser, setFigmaUser]=useState('')
  const navigate=useNavigate()
 
 
  let data = sessionStorage.getItem("item");
  let userr = JSON.parse(data);
  const accessToken= userr ? userr.token : null;
 
  
  let headers = null;
  if(userr !== null)
  {
    headers={AccessToken:accessToken}
  }

  const [url, setUrl] = useState(figmaURL);
  let [selectedUser, setSelectedUser] = useState('');
  const [screenshotImage, setscreenshotImage] = useState(null);
  let[user, setUsers]=useState([])
  const[post,setPost]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `https://${NGROK_URL}/figmas/${figmaId}/user`,
        {
          user: figmaUser,
          screenshotImage: screenshotImage
        }, {headers}
      );
      
      navigate('/figmaRead')
      onClose(); 

    } catch (error) {
      logger.error('Error Updating Figma User:', error);
    }
  };
  logger.info(post);
  const handleUrlChange =  (e) => {
    setUrl(e.target.value);
  };
  const handleUserChange = (e, { value }) => {
    setSelectedUser(value)
    setFigmaUser(value)

  };
  

  useEffect(() => {
    fetchUsers();
  }, [projectId]);
  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/projects/${projectId}/users`);
     const userNames = response.data.map(project => project.name);
     setUsers(userNames);
    } catch (error) {
      logger.error('Error fetching Users:', error);
    }
  };
  const onUpload =  (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async()=> {
      const result=reader.result;
      
      setscreenshotImage(result);
      
      
      setPost(prevState => ({ ...prevState, image: result }));
     
    }; 
    }

  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{paddingTop:'5px'}}>
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button data-testid="close" secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add User</Modal.Header>
    
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>URL<span style={{ color: 'red' }}>*</span></label>
            <input
              data-testid="url-select"
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={handleUrlChange}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label>User<span style={{ color: 'red' }}>*</span></label>
            <Dropdown
              data-testid='User'
              placeholder="Select User"
              fluid
              selection
              options={user.map((name, index) => ({
                key: index,
                text: name,
                value: name
              }))}
              value={selectedUser}
              onChange={handleUserChange}
            />
          </Form.Field>
          <Form.Field>
          <label data-testid='ss'>Upload Screenshot<span style={{ color: 'red' }}>*</span></label>
          <div className="Feeds-uplaod-image">
            
            <label className="Photo" htmlFor="file-upload">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <i class="fa fa-2x fa-camera"></i>
              </label>
              <input
              data-testid='Upload'
              id="file-upload"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => onUpload(e)}
              style={{ display: 'none' }}
              name="screenshotImage"
              />
            </div>
            </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  );
};
export default FigmaCreate;