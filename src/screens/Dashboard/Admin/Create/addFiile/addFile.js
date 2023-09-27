import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ngrokUrl } from '../../../../../network/config';
import api from '../../../../../network/api';
import '../Create.css';
import AddFileUI from './addFileUI';

function AddFile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const { projectName } = location.state || {};

  const [modalfile, setModalFile] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

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
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const maxFileSize = 60 * 1024;

    if (!file) {
      setFileErrorMessage('Please select a file to upload.');
    } else if (!allowedMimeTypes.includes(file.type)) {
      setFileErrorMessage('Invalid file format. Only PNG, JPG, and PDF files are allowed.');
    } else if (file.size > maxFileSize) {
      setFileErrorMessage('File size exceeds the maximum allowed (60 KB).');
    } else {
      setModalFile(file);
      setFileErrorMessage('');
    }
  };

  const handleFileUpload = () => {
    if (!modalfile) {
      setFileErrorMessage('Please select a file to upload.');
      return;
    }

    const data = new FormData();
    data.append('projectFile', modalfile);

    const url = `https://${ngrokUrl}/projects/upload?projectId=${projectId}`;

    api
      .post(url, data, {
        headers,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(percentCompleted);
        },
      })
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
    setUploadProgress(0);
  };

  return (
    <AddFileUI
      projectName={projectName}
      modalfile={modalfile}
      fileErrorMessage={fileErrorMessage}
      handleModelFileSelect={handleModelFileSelect}
      handleFileUpload={handleFileUpload}
      uploadProgress={uploadProgress}
      onClose={onClose}
    />
  );
}

export default AddFile;
