import React from 'react';
import CommonProjectDetailsUI from './commonProjectDetailsModal.js'

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