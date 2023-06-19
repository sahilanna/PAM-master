

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import CreateFigmaDetails from './createFigmaDetails';
import { ngrokUrlSwe } from '../../../../Assets/config';

import { useLocation } from 'react-router-dom';
import { number } from 'prop-types';

const FigmaCreate = ({ onClose, figmaURL,Id}) => {
  console.log(figmaURL)
  console.log(Id)

  // const figmaId = location && location.state && location.state.figmaId;
  
 
  const [url, setUrl] = useState(figmaURL);
  let [selectedUser, setSelectedUser] = useState('');
  const [screenshotImage, setscreenshotImage] = useState(null);
  let[user, setUsers]=useState([])
  const[post,setPost]=useState('')
  const[figmaId, setFigmaId]=useState(Id)
 
 
  const handleIdChange = (e) => {
    setFigmaId(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUserChange = (e, { value }) => {
    setSelectedUser(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setscreenshotImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    // const formData = new FormData();
    // formData.append('image', image);

  selectedUser=user;    
    // try {
     
    //   const response =  axios.post(`https://${ngrokUrlSwe}/api/users`,user );

    //   const names = response.data.map(project => project.projectName);
    //   setUsers(names);
    //   console.log(response.data);

      
    //   setUrl('');
    //   setSelectedUser('');
    //   setscreenshotImage(null);
    //   onClose();
    // } catch (error) {
     
    //   console.error(error);
    // }
  
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://${ngrokUrlSwe}/api/users/get`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
     console.log(response.data)
     const userNames = response.data.map(project => project.name);
     setUsers(userNames);
  
    } catch (error) {
      console.log('Error fetching Users:', error);
    }
  };
  const onUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =()=> {
      const result=reader.result;
      console.log(result);
       console.log(figmaId)
      console.log(selectedUser)
      setscreenshotImage(result)
      console.log(screenshotImage)
      setPost(prevState => ({ ...prevState, image: result }));
      try {
        const response = axios.post(`https://${ngrokUrlSwe}/api/figmas/adduser`, figmaId, user, screenshotImage
       );
       console.log(response.data)
       
    
      } catch (error) {
        console.log('Error fetching Users:', error);
      }
    };
      
      // setuserregisteration.profileImage(result);
      
      // console.log('RESULT', reader.result)
      // setProfilePic(reader.result.toString());
    }

    

  return (
    <Modal open={true} onClose={onClose} style={{ position: 'fixed', right: '-80px', top: '0' , width:'500px', height:'600px' }}>
      <div style={{paddingLeft:'820px', paddingTop:'5px'}}>
      
        </div>
        <div style={{paddingLeft:'442px'}}>
      <Button secondary onClick={onClose}>
          X
        </Button>
        </div>
      <Modal.Header>Add Project</Modal.Header>
    
       
      
      <Modal.Content>
     
        <Form onSubmit={handleSubmit}>
        <Form.Field>
            <label>Figma Id</label>
            <input
              type='number'
              placeholder='enter id'
              value={figmaId}
              onChange={handleIdChange}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label>URL</label>
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={handleUrlChange}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label>User</label>
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
            <label>Image</label>
          <div className="Feeds-upload-image">
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
        {/* <Button secondary onClick={onClose}>
          Close
        </Button> */}
      </Modal.Actions>
    </Modal>
  );
};

export default FigmaCreate;


