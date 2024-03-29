import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';
import { useNavigate  } from 'react-router-dom';

const DriveCreate = ({ onClose, figmaURL, projectId, figmaId}) => {
  const navigate=useNavigate()
  console.log(figmaURL)
 
  let data = sessionStorage.getItem("item");
  let userr = JSON.parse(data);
  const accessToken=userr.token
  console.log(userr)
    console.log(userr.token)

    const headers={AccessToken:accessToken}


 console.log(figmaId)
  const [url, setUrl] = useState(figmaURL);
  let [selectedUser, setSelectedUser] = useState('');
  const [screenshotImage, setscreenshotImage] = useState(null);
  let[user, setUsers]=useState([])
  const[post,setPost]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `https://${ngrokUrl}/api/figmas/${figmaId}/user`,
        {
          user: selectedUser,
          screenshotImage: screenshotImage
        }, {headers}
      );
      
      navigate('/figmaRead')
      onClose(); 

    } catch (error) {
      console.log('Error Updating Figma User:', error);
    }
  };
  console.log(post);
  const handleUrlChange =  (e) => {
    setUrl(e.target.value);
  };
  const handleUserChange = (e, { value }) => {
    setSelectedUser(value);
  };
  
 
  useEffect(() => {
    fetchUsers();
  }, [projectId]);
  const fetchUsers = async () => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/projects/${projectId}/users`);
     console.log(response.data)
     const userNames = response.data.map(project => project.name);
     setUsers(userNames);
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };
  const onUpload =  (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async()=> {
      const result=reader.result;
      
      setscreenshotImage(result);
      
      console.log("hihit",figmaId);
      setPost(prevState => ({ ...prevState, image: result }));
     
    }; 
    }

  return (
    <Modal open={true} onClose={onClose} style={{ width: '500px' }} className='create-Project-Modal'>
      <div style={{paddingTop:'5px'}}>
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add User</Modal.Header>
    
       
      
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>URL<span style={{ color: 'red' }}>*</span></label>
            <input
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
          <label>Upload Screenshot<span style={{ color: 'red' }}>*</span></label>
          <div className="Feeds-uplaod-image">
            
            <label className="Photo" htmlFor="file-upload">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <i class="fa fa-2x fa-camera"></i>
              </label>
              <input
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
export default DriveCreate;