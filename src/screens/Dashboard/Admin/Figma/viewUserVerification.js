import React, {  useEffect } from 'react';
import { ngrokUrl } from '../../../../network/config';
import api from '../../../../network/api';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewUserVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const figmaId = location.state ? location.state.figmaId : null;

  

  const downloadFile = async () => {
   
    const result = await api.get(`https://${ngrokUrl}/figmas/${figmaId}/screenshots`, {
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