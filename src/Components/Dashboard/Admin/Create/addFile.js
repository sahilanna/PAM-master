import React, { useState } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';
import './Create.css';

function AddFile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const { projectName } = location.state || {};

  const [modalfile, setModalFile] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState('');

  let dataa = sessionStorage.getItem('item');
  let user = JSON.parse(dataa);
  const accessToken = user.token;
  const headers = {
    AccessToken: accessToken,
    'Content-Type': 'application/zip',
  };

  const onClose = () => {
    navigate('/adminDashboard');
  };

  const handleModelFileSelect = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /\.(png|jpg|pdf)$/i; 

    if (!allowedExtensions.test(file.name)) {
      setFileErrorMessage('Invalid file format. Only PNG, JPG, and PDF files are allowed.');
    } else {
      setModalFile(file);
      setFileErrorMessage('');
    }
  };

  const handleFileUpload = () => {
    const data = new FormData();
    data.append('projectFile', modalfile);

    const url = `https://${ngrokUrl}/projects/upload?projectId=${projectId}`;

    api
      .post(url, data, { headers })
      .then((response) => {
        console.log(response.data);
        resetFileInputs();
        navigate('/adminDashboard');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetFileInputs = () => {
    setModalFile(null);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      style={{ top: '170px', height: 'auto', width: '500px' }}
      className='create-Project-Modal'
    >
      <div style={{ paddingLeft: '820px', paddingTop: '5px' }}></div>
      <div style={{ paddingLeft: '442px' }}>
        <Button secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label style={{ textAlign: 'left' }}>Project Name</label>
            <input name="name" placeholder={projectName} readOnly />
          </Form.Field>
          <Form.Field>
            <div>
              <label>Add Help document<span style={{ color: 'red' }}>*</span></label>
              <input className="text-center" type="file" onChange={handleModelFileSelect} />
              {modalfile && <div>{modalfile.name}</div>}
              {fileErrorMessage && <div style={{ color: 'red' }}>{fileErrorMessage}</div>}
            </div>
          </Form.Field>
          <Button type="submit" onClick={handleFileUpload}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default AddFile;





