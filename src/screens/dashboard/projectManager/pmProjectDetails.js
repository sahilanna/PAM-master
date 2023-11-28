import React, { useState, useEffect } from "react";
import { Modal, Button } from "semantic-ui-react";
import { NGROK_URL } from "../../../network/config";
import { getUserFromSessionStorage } from "../../../utils/sessionStorage";
import CloseButton from "../../../atoms/closeButton/closeButton";
import ProjectDetailItem from "../../../utils/projectDetailItem";
import api from "../../../network/api";
import logger from "../../../utils/logger.js";

const PmProjectDetails = ({ project, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = getUserFromSessionStorage();
  const id = user ? user.id : null;

  const [result, setResult] = useState([]);
  const fetchprojectDetails = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/users/${id}/role/project_manager/projects`
      );
      const data = response.data;
      setIsLoading(false);
      setResult(data);
      logger.info("project Details fetched successfully", result);
    } catch (error) {
      logger.error("Error fetching prject details:", error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchprojectDetails();
  }, []);

  if (!project) return null;
  logger.error(isLoading);

  return (
    <Modal size="mini" className="form-modal" open={true} onClose={onClose}>
      <CloseButton onClick={onClose} />
      <Modal.Header>Project Details</Modal.Header>

      <Modal.Content>
        <ProjectDetailItem label="Project ID" value={project.projectId} />
        <ProjectDetailItem label="Project Name" value={project.projectName} />
        <ProjectDetailItem
          label="Figma URL"
          value={<a href={project.figma.figmaURL}>{project.figma.figmaURL}</a>}
        />
        <ProjectDetailItem
          label="Drive Link"
          value={<a href={project.googleDrive.driveLink}>{project.googleDrive.driveLink}</a>}
        />
        <ProjectDetailItem label="Project Description" value={project.projectDescription} />
      </Modal.Content>
    </Modal>
  );
};

export default PmProjectDetails;
