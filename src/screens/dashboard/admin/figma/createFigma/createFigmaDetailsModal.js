import React from 'react';
import CommonProjectDetailsUI from '../../drive/createDrive/commonProjectDetailsModal';

function CreateFigmaDetailsUI({
  isOpen,
  onClose,
  isValidUrl,
  proj,
  selectedProject,
  figmaURL,
  handleProjChange,
  handleUrlChange,
  handleSubmit,
}) {
  return (
    <CommonProjectDetailsUI
    isOpen={isOpen}
    onClose={onClose}
    isValidUrl={isValidUrl}
    proj={proj}
    url={figmaURL}
    handleProjChange={handleProjChange}
    handleUrlChange={handleUrlChange}
    handleSubmit={handleSubmit}
    label="Add Figma Project"
  />
  );
}

export default CreateFigmaDetailsUI;
