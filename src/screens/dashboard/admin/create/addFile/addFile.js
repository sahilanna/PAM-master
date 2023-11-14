import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddFileModal from "./addFileModal";
import logger from "../../../../../utils/logger.js";
import { NGROK_URL } from "../../../../../network/config";
import api from "../../../../../network/api";

export function handleFileUpload(
  modalfile,
  setFileErrorMessage,
  projectId,
  headers,
  setUploadProgress,
  resetFileInputs,
  navigate
) {
  if (!modalfile) {
    setFileErrorMessage("Please select a file to upload.");
    logger.warn("No file was selected");
    return;
  }

  const data = new FormData();
  data.append("projectFile", modalfile);

  const URL = `https://${NGROK_URL}/projects/upload?projectId=${projectId}`;

  api
    .post(URL, data, {
      headers,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(percentCompleted);
      },
    })
    .then((response) => {
      resetFileInputs();
      navigate("/adminDashboard");
    });
}

function AddFile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const { projectName } = location.state || {};
  logger.info(projectId);
  const [modalfile, setModalFile] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  logger.info(setUploadProgress);

  const accessToken = useMemo(() => {
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    return user ? user.token : null;
  }, []);

  const headers = {
    AccessToken: accessToken,
    "Content-Type": "application/zip",
  };
  logger.info(headers);

  const onClose = () => {
    navigate("/adminDashboard");
  };

  const handleModelFileSelect = (e) => {
    const file = e.target.files[0];
    const allowedMimeTypes = ["image/png", "image/jpeg", "application/pdf"];
    const maxFileSize = 60 * 1024;

    if (!file) {
      setFileErrorMessage("Please select a file to upload.");
      logger.warn("No file was selected");
    }
    else if (!allowedMimeTypes.includes(file.type)) {
      logger.warn("Invalid File Format");
      setFileErrorMessage(
        "Invalid file format. Only PNG, JPG, and PDF files are allowed."
      );
    } 
    else if (file.size > maxFileSize) {
      setFileErrorMessage("File size exceeds the maximum allowed (60 KB).");
      logger.warn("File size exceeds 60KB");
    } 
    else {
      setModalFile(file);
      setFileErrorMessage("");
      logger.error("Error upoading file");
    }
  };

  return (
    <AddFileModal
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
