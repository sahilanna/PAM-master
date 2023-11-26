import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../network/api";
import logger from "../../../../utils/logger.js";
import UserReadTable from "./userReadTable";
import { NGROK_URL } from "../../../../network/config";


const UserRead = () => {
  const navigate = useNavigate();
  const URL = `https://${NGROK_URL}/users/role/user`;
  const [item, setItem] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 4;
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserRead();
  }, []);

  logger.info(currentPageData);

  const addUserName = () => {
    navigate("/addUserName");
  };

  const loadUserRead = async () => {
    setIsLoading(true);
    try {
      const result = await api.get(URL);
      setItem(result.data);
      setIsLoading(false);
      logger.info("Data successfully fetched for user");
      navigate("/userRead");
    } catch (error) {
      logger.error("Error occurred while fetching data", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const createOnclick = () => {
    navigate("/userCreate");
  };

  const handleCloseDetails = () => {
    setShowProjectDetails(false);
  };

  const viewActivity = (id, username) => {
    navigate("/userActivity", {
      state: { id, username },
    });
  };

  useEffect(() => {
    handlePaginate(1);
  }, [item]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPageData(filteredProjects.slice(0, itemsPerPage));
  };

  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`https://${NGROK_URL}/users/delete/${id}`);
      navigate("/userRead");
      setShowConfirmDialog(false);
      loadUserRead();
      navigate("/userRead");
      logger.info("User details successfully fetched")
    } catch (error) {
      logger.error("Error in deleting user",error);
    }
  };

  return (
    <UserReadTable
      isLoading={isLoading}
      filteredProjects={filteredProjects}
      currentPageData={currentPageData}
      handleViewDetails={handleViewDetails}
      viewActivity={viewActivity}
      deleteUser={deleteUser}
      showConfirmDialog={showConfirmDialog}
      setShowConfirmDialog={setShowConfirmDialog}
      handlePaginate={handlePaginate}
      itemsPerPage={itemsPerPage}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      addUserName={addUserName}
      createOnclick={createOnclick}
      showProjectDetails={showProjectDetails}
      selectedProject={selectedProject}
      handleCloseDetails={handleCloseDetails}
    />
  );
};

export default UserRead;
