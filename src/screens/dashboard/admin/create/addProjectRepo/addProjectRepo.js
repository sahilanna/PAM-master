import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { NGROK_URL } from "../../../../../network/config";
import AddProjectRepoModal from "./addProjectRepoModal";
import api from "../../../../../network/api";
import logger from "../../../../../utils/logger.js";

const AddProjectRepo = () => {
  let navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const [repoId, setRepoId] = useState("");
  const [selectedRepo, setSelectedRepo] =
    useState("");
  const [temp, setTemp] = useState([]);
  const [projItem, setProjItem] = useState("");

  const handleRepoChange = (
    e,
    { value, options }
  ) => {
    const selectedRepo = options.find(
      (option) => option.value === value
    );
    setRepoId(value);
    setSelectedRepo(selectedRepo.text);
  };

  const handleProjectChange = (
    event,
    { value }
  ) => {
    setProjectId(value);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/repositories/get`
      );
      const repoOptions = response.data.map(
        (repo) => ({
          key: repo.repoId,
          text: repo.name,
          value: repo.repoId,
        })
      );
      setTemp(repoOptions);
      logger.info(
        "Repo's feetched successfully from fetchRepos"
      );
    } catch (error) {
      logger.error(
        "Error fetching Repositories:",
        error
      );
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        `https://${NGROK_URL}/projects/allProjects`
      );
      const projOptions = response.data.map(
        (proj) => ({
          key: proj.projectId,
          text: proj.projectName,
          value: proj.projectId,
        })
      );
      setProjItem(projOptions);
      logger.info(
        "Projects feetched successfully from fetchRepos"
      );
    } catch (error) {
      logger.error(
        "Error fetching Projects:",
        error
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onClose = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logger.info(
      "This is the selected repo-id",
      repoId
    );
    api.put(
      `https://${NGROK_URL}/projects/${projectId}/repository/${repoId}`
    );
    logger.info(
      "This is selected repo",
      selectedRepo
    );
    navigate("/repoRead");
  };

  return (
    <AddProjectRepoModal
      onSubmit={handleSubmit}
      onClose={onClose}
      projItem={projItem}
      temp={temp}
      handleProjectChange={handleProjectChange}
      handleRepoChange={handleRepoChange}
      selectedRepo={selectedRepo}
    />
  );
};
export default AddProjectRepo;
