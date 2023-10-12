import React from 'react';
import '../../Create/Create.css';
import CommonProjectDetailsUI from '/home/nineleaps/Desktop/Pratap/PAM-master/src/screens/Dashboard/Admin/Drive/createDrive/commonProjectDetailsUI.js'

function CreateDriveDetailsUI({
  driveURL,
  isValidUrl,
  proj,
  handleUrlChange,
  handleProjChange,
  handleSubmit,
  onClose,
}) {
  return (
    <CommonProjectDetailsUI
    isOpen={true}
    onClose={onClose}
    isValidUrl={isValidUrl}
    proj={proj}
    url={driveURL}
    handleProjChange={handleProjChange}
    handleUrlChange={handleUrlChange}
    handleSubmit={handleSubmit}
    label="Add Project"
    />
  );
}

export default CreateDriveDetailsUI;