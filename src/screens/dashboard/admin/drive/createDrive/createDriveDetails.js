import React, {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL } from "../../../../../network/config";
import api from "../../../../../network/api";
import CreateDriveDetailsUI from "./createDriveDetailsModal";
import logger from "../../../../../utils/logger.js";

function CreateDriveDetails() {
  const navigate = useNavigate();
  const [driveURL, setDriveUrl] = useState("");
  const [proj, setProj] = useState([]);
  let [item, setItem] = useState("");
  const [driveId, setDriveId] = useState(null);
  const [selectedProject, setSelectedProject] =
    useState("");
  const [isValidUrl, setIsValidUrl] =
    useState(true);

  const validateURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname === "drive.google.com"
      );
    } catch (_) {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setDriveUrl(url);
    setIsValidUrl(validateURL(url));
  };

  const handleProjChange = (event, { value }) => {
    setItem(value);
    setSelectedProject(value);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/projects/without-google-drive`
      );
      const driveProjects = response.data.map(
        (drive) => ({
          key: drive.projectId,
          text: drive.projectName,
          value: drive.projectId,
        })
      );
      setProj(driveProjects);
    } catch (error) {
      logger.error(
        "Error fetching Users:",
        error
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidUrl) {
      return;
    }
    try {
      const response = await api.post(
        `https://${NGROK_URL}/createGoogleDrive`,
        {
          projectDTO: {
            projectId: selectedProject,
            projectName: selectedProject,
          },
          driveLink: driveURL,
        }
      );
      const driveId = response.data.id;
      setDriveId(driveId);
      navigate("/driveDetails", {
        state: { driveId },
      });
    } catch (error) {
      logger.error("Error:", error);
    }
  };
  logger.info("This is item: ", item);
  logger.info("This is driveId: ", driveId);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <CreateDriveDetailsUI
      driveURL={driveURL}
      isValidUrl={isValidUrl}
      proj={proj}
      handleUrlChange={handleUrlChange}
      handleProjChange={handleProjChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}

export default CreateDriveDetails;
