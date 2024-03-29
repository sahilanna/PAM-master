import React, { useState, useEffect } from 'react';
import { ngrokUrl } from '../../../../Assets/config';
import api from '../../api';
import { Modal } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';
const ViewUserVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const figmaId = location.state ? location.state.figmaId : null;

  const [figmaScreenshots, setFigmaScreenshots] = useState([]);

  const downloadFile = async () => {
   
    const result = await api.get(`https://${ngrokUrl}/api/figmas/${figmaId}/screenshots`, {
      responseType: 'blob',
      contentType: 'application/zip',
    })
    const scdata=result.data
      .then((result) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([scdata[0].screeshotImage]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'file.data');
        document.body.appendChild(link);
        link.click();
        link.remove();
        navigate('/adminDashboard');
      })
      .catch((error) => {
        console.log(error, 'hi');
      });
  };

  useEffect(() => {
    downloadFile();
  }, []);

  return (
    <div>
      <h1>View User Verification</h1>
     
    </div>
  );
};

export default ViewUserVerification;