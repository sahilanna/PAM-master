import React, { useState, useEffect } from "react";
import UserSidebar from "./userSidebar";
import { NGROK_URL } from "../../../network/config";
import LoadingPage from "../../../atoms/LoadingPage/loadingPage";
import api from "../../../network/api";
import PmProjectDetails from "../ProjectManager/pmProjectDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import logger from '../../../utils/logger.js';

function UserProjects() {
  const [showUserProjectDetails, setShowUserProjectDetails] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [userid, setUserid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;

  

  let id = null;
  if (user !== null) {
    id = user.id;
  }

  
  const fetchUserid = async () => {
    setIsLoading(true);
    try {
      const result = await api.get(`https://${NGROK_URL}/users/${id}/role/user/projects`);
      setUserid(result.data);
      setIsLoading(false);
      const filteredProjects = result.data.filter((item) =>
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      logger.info(filteredProjects); 
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
    <div className="parent-admin">
      <div style={{ height: "100vh", overflow: "scroll initial" }}>
        <UserSidebar />
      </div>
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
          <div class="ui left icon input">
            <input
              type="text"
              placeholder="Search Projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <i class="users icon"></i>
            <div style={{ paddingLeft: "660px", paddingTop: "20px" }}></div>
          </div>
        </div>
        <div style={{ marginLeft: "20px", marginRight: "30px" }}>
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
