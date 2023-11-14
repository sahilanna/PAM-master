import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../sidebar/sidebar";
import { NGROK_URL } from "../../../../../network/config";
import LoadingPage from "../../../../../atoms/loadingPage/loadingPage";
import api from "../../../../../network/api";
import DialogBox from "../../../dialogBox/dialogBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../../../../utils/pagination";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CreateDriveDetails from "../createDrive/createDriveDetails";
import "../../figma/figmaRead/figmaRead.css";
import logger from '../../../../../utils/logger.js';

function DriveRead() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const driveURL = "";
  const [driveId, setDriveId] = useState("");
  const projectId = "";
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageData, setCurrentPageData] = useState([]);
  const itemsPerPage = 5;
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get(`https://${NGROK_URL}/getAllGoogleDrives`);
      setProjects(response.data);
      setDriveId(response.data[0].driveId);
      setIsLoading(false);
      setFilteredProjects(response.data);
    } catch (error) {
      logger.error("Error fetching projects:", error);
      setIsLoading(true);
    }
  };

  const createDrive = () => {
    navigate("/createDriveDetails", { state: { driveId } });
  };

  const handleDeleteUrl = async (driveId) => {
    try {
      await api.delete(`https://${NGROK_URL}/deleteGoogleDriveById/${driveId}`);
      navigate("/driveDetails");
      setShowConfirmDialog(false);
      fetchProjects();
    } catch (error) {
      logger.error("Error deleting driveLink:", error);
    }
  };

  logger.info(setShowModal);
  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageData(currentItems);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
  };

  const handleFilterItems = (searchQuery) => {
    setFilteredProjects(filteredItems);
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };

  const filteredItems = projects.filter((item) =>
    item.projectDTO.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    handlePaginate(1);
  }, [filteredProjects]);

  return (
    <div className="parent-admin">
      <Sidebar />
      <div className="admin-child">
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "30px",
            marginLeft: "40px",
            marginRight: "30px",
          }}
        >
          <div className="ui left icon input">
            <input
              type="text"
              placeholder="Search Project"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="users icon"></i>
          </div>
          <button
            data-testid="create-drive"
            className="ui button"
            onClick={createDrive}
          >
            Create Drive
          </button>
        </div>
        <div style={{ marginLeft: "20px", marginRight: "30px" }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              {filteredProjects.length === 0 ? (
                <p>No data available</p>
              ) : (
                <>
                  <table className="ui celled table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Project Name</th>
                        <th>Drive Link</th>
                        <th className="text-center">Delete Drive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageData.map((project, index) => (
                        <tr key={project.driveId}>
                          <td>{index + 1}</td>
                          <td>{project.projectDTO.projectName}</td>
                          <td>
                            <a
                              href={project.driveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.driveLink}
                            </a>
                          </td>
                          <td className="text-center">
                            <button
                              data-testid="delete"
                              className="btn btn-danger mx-2"
                              onClick={() =>
                                setShowConfirmDialog(project.driveId)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <DialogBox
                              show={showConfirmDialog === project.driveId}
                              onClose={() => setShowConfirmDialog(null)}
                              onConfirm={() => handleDeleteUrl(project.driveId)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div
                    className="pagination"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Pagination
                      data={filteredItems}
                      itemsPerPage={itemsPerPage}
                      paginate={handlePaginate}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="model-container">
        <div className="modal-content-container">
          {showModal && (
            <CreateDriveDetails
              driveURL={driveURL}
              driveId={driveId}
              projectId={projectId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default DriveRead;
