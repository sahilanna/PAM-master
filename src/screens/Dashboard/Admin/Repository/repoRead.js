import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../SideBar/SideBar";
import LoadingPage from "../../../../atoms/loadingPage";
import api from "../../../../network/api";
import { ngrokUrl } from "../../../../network/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "../../DialogBox/DialogBox";
import Pagination from "../../Pagination/Pagination";
import "../Figma/FigmaRead.css";
import logger from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js";

function RepoRead(onClose) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const itemsPerPage = 4;

  const data = sessionStorage.getItem("item");
  const user = data ? JSON.parse(data) : null;
  
  useEffect(() => {
    loadItem();
  }, []);

  useEffect(() => {
    handlePaginate(1);
  }, [item]);

  const loadItem = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${ngrokUrl}/repositories/get`);
      setItem(response.data);
      setIsLoading(false);
      setFilteredProjects(response.data);
    } catch (error) {
      setIsLoading(true);
    }
  };
  logger.info("Checking user:",user);
  logger.info("Checking current page:",currentPageData);
  
  useEffect(() => {
    const filteredProjects = item.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filteredProjects);
  }, [searchQuery, item]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    setCurrentPageData(filteredProjects.slice(0, itemsPerPage));
  };
  const createOnclick = () => {
    navigate("/CreateRepo");
  };
  logger.info(setSelectedRepoId);
  const handlePaginate = (pageNumber) => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentPageData(currentItems);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/Create");
  };
  const toggleDrawer1 = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/AddPm");
  };
  const deleteUser = async (repoId) => {
    try {
      await api.delete(
        `https://${ngrokUrl}/repositories/delete/${selectedRepoId}`
      );

      setShowConfirmDialog(false);
      loadItem();
      navigate("/repoRead");
    } catch (error) {
      logger.error("Error while calling delete api",error);
    }
  };

  return (
    <div className="parent-admin">
      <Sidebar />
      <div className="admin-child">
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
              placeholder="Search Repo..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="users icon"></i>
          </div>
          <div>
            <button
              data-testid="createOnClick"
              className="ui button"
              onClick={createOnclick}
            >
              Create Repository
            </button>
            <button
              data-testid="add-project"
              className="ui button"
              onClick={toggleDrawer}
            >
              Add Project Git
            </button>
            <button
              data-testid="add-collab"
              className="ui button"
              onClick={toggleDrawer1}
            >
              Add Collaborators
            </button>
          </div>
        </div>
        <div style={{ marginLeft: "20px", marginRight: "30px" }}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Repo Name</th>
                    <th>Repo Description</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="4">No data available</td>
                    </tr>
                  ) : (
                    currentPageData.map((item, index) => (
                      <tr key={item.repoId}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className="text-center">
                          <button
                            data-testid="delete"
                            className="btn btn-danger mx-2"
                            onClick={() => setShowConfirmDialog(item.repoId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          {showConfirmDialog === item.repoId && (
                            <div className="dialog-backdrop">
                              <div className="dialog-container">
                                <DialogBox
                                  show={showConfirmDialog === item.repoId}
                                  onClose={() => setShowConfirmDialog(null)}
                                  onConfirm={() => deleteUser(item.repoId)}
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
              <div
                className="pagination"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Pagination
                  data={filteredProjects}
                  itemsPerPage={itemsPerPage}
                  paginate={handlePaginate}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default RepoRead;
