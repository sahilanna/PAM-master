import React, { useState, useEffect } from 'react';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';
import { Modal } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewUserVerification() {

  const [imageData, setImageData] = useState(null);
  const location = useLocation();
  const navigatee = useNavigate()
  const figmaId = location.state ? location.state.figmaId : null;

  
  const [showVerificationImage, setShowVerificationImage] = useState(false);
  const [showModall, setShowModall] = useState(false); // State for modal visibility
  const [modalImage, setModalImage] = useState(null); 
  const[figmaIdVerify, setFigmaIdVerify]=useState(null)

  console.log(figmaId)

  const fetchScreenshot = async() => {
    try {
      const response = await api.get(`https://${ngrokUrl}/api/figmas/${figmaId}/screenshots`, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust the type based on your response data
    setModalImage(URL.createObjectURL(blob));
     
    } catch (error) {
      console.log('Error fetching projects:', error);
    }
  };
  useEffect(() => {
    fetchScreenshot()
  }, []);
  const onClose=()=>{
    navigatee(-1);
  }

  return (
    <Modal open={true} onClose={onClose}  style={{ width: '700px' }} className='create-Project-Modal'>
    
      <div style={{paddingLeft:'642px'}}>
    <Button secondary onClick={onClose}>
        X
      </Button>
      </div>
    <Modal.Header>Screenshot</Modal.Header>
  
     
    
    <Modal.Content style={{display: 'flex', justifyContent: 'center'}} >
    {modalImage && <img src={modalImage} alt="No Image" height='250px' width='250px' />}
     
    </Modal.Content>
    
  </Modal>
  )
}

export default ViewUserVerification