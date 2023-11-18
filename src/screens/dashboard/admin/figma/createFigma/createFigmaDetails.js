import React, {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL } from "../../../../../network/config";
import api from "../../../../../network/api";
import CreateFigmaDetailsUI from "./createFigmaDetailsModal";
import logger from "../../../../../utils/logger.js";
function CreateFigmaDetails() {
  const navigate = useNavigate();
  const [figmaURL, setFigmaUrl] = useState("");
  const [proj, setproj] = useState([]);
  const [item, setitem] = useState("");
  const [figmaId, setFigmaId] = useState(null);
  const [selectedProject, setSelectedProject] =
    useState("");
  const [isValidUrl, setIsValidUrl] =
    useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const validateURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname === "www.figma.com" &&
        parsedUrl.pathname.startsWith("/file/")
      );
    } catch (_) {
      //logger add kr
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  logger.info(item);

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/projects/without-figma-url`
      );
      const figmaProjects = response.data.map(
        (figma) => ({
          key: figma.projectId,
          text: figma.projectName,
          value: figma.projectId,
        })
      );
      setproj(figmaProjects);
    } catch (error) {
      logger.error(
        "Error fetching Users:",
        error
      );
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFigmaUrl(url);
    setIsValidUrl(validateURL(url));
  };

  const handleProjChange = (event, { value }) => {
    setitem(value);
    setSelectedProject(value);
  };
  logger.info(figmaId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidUrl) {
      return;
    }
    try {
      const response = await api.post(
        `https://${NGROK_URL}/figmas/create`,
        {
          projectDTO: {
            projectId: selectedProject,
            projectName: selectedProject,
          },
          figmaURL: figmaURL,
        }
      );
      const figmaId = response.data.id;
      setFigmaId(figmaId);
      navigate("/figmaRead", {
        state: { figmaId },
      });
      setFigmaUrl("");
    } catch (error) {
      logger.error("Error:", error);
    }
  };
  logger.info(setIsOpen);
  const onClose = () => {
    navigate(-1);
  };

  return (
    <CreateFigmaDetailsUI
      isOpen={isOpen}
      onClose={onClose}
      isValidUrl={isValidUrl}
      proj={proj}
      selectedProject={selectedProject}
      figmaURL={figmaURL}
      handleProjChange={handleProjChange}
      handleUrlChange={handleUrlChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default CreateFigmaDetails;
