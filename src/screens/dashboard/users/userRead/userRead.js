import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../../utils/pagination";
import DialogBox from "../../dialogBox/dialogBox";
import UserDetails from "../userDetails";
import Sidebar from "../../sidebar/sidebar";
import LoadingPage from "../../../../atoms/loadingPage/loadingPage";
import api from "../../../../network/api";
import logger from "../../../../utils/logger.js";
import { NGROK_URL } from "../../../../network/config";
import "./userRead.css";

function UserRead() {
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
      logger.error("Error occured while fetching data", error);
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
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="user-read-screen">
      <div>
        <Sidebar />
      </div>

      <div className="user-child">
        <div className="user-read">
          <div className="ui left icon input">
            <input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={handleSearchChange}
            ></input>
            <i className="users icon"></i>
          </div>

          <div>
            <button className="ui button" onClick={addUserName}>
              Add Github UserName
            </button>
            <button className="ui button" onClick={createOnclick}>
              Create User
            </button>
          </div>
        </div>
        <div className="user-table">
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table class="ui celled table">
              <thead>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>

                <th className="text-center">View</th>

                <th className="text-center">Activity</th>
                <th className="text-center">Delete</th>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="1" className="text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>

                      <td className="text-center">
                        <button
                          data-testid="view-icon"
                          className="btn btn-outline-primary mx-2"
                          onClick={() => handleViewDetails(user)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          data-testid="view-activity"
                          className="btn btn-outline-primary mx-2"
                          onClick={() => viewActivity(user.id, user.name)}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faUserCircle} />
                        </button>
                      </td>

                      <td className="text-center">
                        <button
                          data-testid="delete"
                          className="btn btn-danger mx-2"
                          onClick={() => setShowConfirmDialog(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />{" "}
                        </button>
                        <DialogBox
                          show={showConfirmDialog === user.id}
                          onClose={() => setShowConfirmDialog(null)}
                          onConfirm={() => deleteUser(user.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="pagination">
          <Pagination
            data={filteredProjects}
            itemsPerPage={itemsPerPage}
            paginate={handlePaginate}
          />
        </div>
        {showProjectDetails && (
          <UserDetails project={selectedProject} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
}
export default UserRead;
