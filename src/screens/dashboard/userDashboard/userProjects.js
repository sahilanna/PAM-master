import React, { useState, useEffect } from "react";
import { NGROK_URL } from "../../../network/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { getUserFromSessionStorage } from "../../../utils/sessionStorage";
import LoadingPage from "../../../atoms/loadingPage/loadingPage";
import UserSidebar from "../sidebar/userSidebar";
import PmProjectDetails from "../projectManager/pmProjectDetails";
import logger from "../../../utils/logger.js";
import api from "../../../network/api";
import "./userDashboard.css";

function UserProjects() {
  const [showUserProjectDetails, setShowUserProjectDetails] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [userid, setUserid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = getUserFromSessionStorage();
  const id = user ? user.id : null;

  const fetchUserid = async () => {
    setIsLoading(true);
    try {
      const result = await api.get(`https://${NGROK_URL}/users/${id}/role/user/projects`);
      setUserid(result.data);
      setIsLoading(false);
      const filteredProjects = result.data.filter((item) =>
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      logger.info("Successfully fetched user info:", filteredProjects);
    } catch (error) {
      logger.error("Error fetching Projects:", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchUserid();
  }, []);

  const filteredProjects = userid.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowUserProjectDetails(true);
  };

  const handleCloseDetails = () => {
    setShowUserProjectDetails(false);
  };

  return (
    <div className="user-read-screen">
      <div>
        <UserSidebar />
      </div>
      <div className="user-child">
        <div className="user-read">
          <div class="ui left icon input">
            <input
              type="text"
              placeholder="Search Projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <i class="users icon"></i>
            <div></div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <table class="ui celled table">
              <thead>
                <th>Project-ID</th>
                <th>Project-Name</th>
                <th>project Description</th>
                <th className="text-center">View</th>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.projectId}</td>
                      <td>{item.projectName}</td>
                      <td>{item.projectDescription}</td>
                      <td className="text-center">
                        <button
                          data-testid="view-icon"
                          className="btn btn-outline-primary mx-2"
                          onClick={() => handleProjectDetails(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No matching projects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {showUserProjectDetails && (
            <PmProjectDetails
              data-testid="check-again"
              project={selectedProject}
              onClose={handleCloseDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default UserProjects;
