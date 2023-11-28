import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../utils/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PmDetails from "./pmDetails";
import { NGROK_URL } from "../../../network/config";
import AdminSidebar from "../sidebar/adminSidebar/adminSidebar";
import LoadingPage from "../../../atoms/loadingPage/loadingPage";
import api from "../../../network/api";
import logger from "../../../utils/logger.js";
import DeleteDialogBox from "../../../atoms/deleteDialogBox/deleteDialogBox";


function PmReadNew() {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 4;
  logger.info(currentPageData);

  const loaditem = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${NGROK_URL}/users/role/project_manager`);
      setIsLoading(true);
      const data = response.data;
      setItem(data);
      setIsLoading(false);
      logger.info("PM info fetched successfully")
      setFilteredProjects(response.data);
    } catch (error) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loaditem();
  }, []);

  const addUserName = () => {
    navigate("/addPmUserName");
  };

  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
  };
  const handleFilterItems = (searchQuery) => {
    setFilteredProjects(filteredItems);
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };

  const filteredItems = item.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleCloseDetails = () => {
    setShowProjectDetails(false);
  };

  useEffect(() => {
    handlePaginate(1);
  }, [filteredProjects]);

  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`https://${NGROK_URL}/users/delete/${id}`);
      navigate("/pmReadNew");
      setShowConfirmDialog(false);
      loaditem();
      navigate("/pmReadNew");
      logger.info("User deleted successfully");
    } catch (error) {
      logger.error("Error in deleting user", error);
    }
  };

  const createOnclick = () => {
    navigate("/PmCreate");
  };

  const viewActivity = (id, username) => {
    navigate("/userActivity", {
      state: { id, username },
    });
  };

  return (
    <div className="admin-screen">
      <div>
        <AdminSidebar />
      </div>

      <div className="admin-child-screen">
        <div className="admin-read">
          <div class="ui left icon input">
            <input
              type="text"
              placeholder="Search PM..."
              value={searchQuery}
              onChange={handleSearchChange}
            ></input>
            <i class="users icon"></i>
          </div>
          <div>
            <button className="ui button" onClick={addUserName}>
              Add Github UserName
            </button>
            <button class="ui button" onClick={createOnclick}>
              Create PM
            </button>
          </div>
        </div>
        <div
         
        >
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table class="ui celled table">
              <thead>
                <th>S.No.</th>
                <th>PM-Name</th>
                <th>PM-Email</th>

                <th className="text-center">View</th>
                <th className="text-center">Activity</th>
                <th className="text-center">Delete</th>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td data-testid="view" colSpan="3">
                      No data available
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>

                      <td className="text-center">
                        <button
                          data-testid="view-icon"
                          className="btn btn-outline-primary mx-2"
                          onClick={() => handleViewDetails(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          data-testid="view-activity"
                          className="btn btn-outline-primary mx-2"
                          onClick={() => viewActivity(item.id, item.name)}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faUserCircle} />
                        </button>
                      </td>

                      <td className="text-center">
                        <button
                          data-testid="delete"
                          className="btn btn-danger mx-2"
                          onClick={() => setShowConfirmDialog(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        {showConfirmDialog === item.id && (
                          <div className="dialog-backdrop">
                            <div className="dialog-container">
                              <DeleteDialogBox
                                show={showConfirmDialog === item.id}
                                onClose={() => setShowConfirmDialog(null)}
                                onConfirm={() => deleteUser(item.id)}
                              />
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div
        
        >
          <Pagination
            data={filteredProjects}
            itemsPerPage={itemsPerPage}
            paginate={handlePaginate}
          />
        </div>
        {showProjectDetails && <PmDetails project={selectedProject} onClose={handleCloseDetails} />}
      </div>
    </div>
  );
}

export default PmReadNew;
