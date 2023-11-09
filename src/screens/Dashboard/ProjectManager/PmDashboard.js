import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { ngrokUrl } from "../../../network/config";
import PmSidebar from "./pmSidebar";
import LoadingPage from "../../../atoms/LoadingPage/loadingPage";
import api from "../../../network/api";
import PmProjectDetails from "./pmProjectDetails";
import logger from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js';

const PmDashboard = () => {
  const [item, setItem] = useState([]);

  const [showPmProjectDetails, setShowPmProjectDetails] = useState(false);
  const [pmid, setPmid] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  let data = sessionStorage.getItem("item");
  let user = data ? JSON.parse(data) : null;

 
  logger.info(pmid);
  
  let id = null;
  if (user !== null) {
    id = user.id;
    const pmName = user.name;
    logger.info(pmName);
  }

 

  const fetchPmid = async () => {
    setIsLoading(true);
    try {
      new URLSearchParams(window.location.search);
      const response = await api.get(
        `https://${ngrokUrl}/users/${id}/role/project_manager/projects`
      );

      setItem(response.data);
      setPmid(response.data);
      setIsLoading(false);
      const filteredItems = response.data.filter((item) =>
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      logger.info("Checking",filteredItems);
      
    } catch (error) {
      logger.error("Error fetching PMID:", error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
  
    fetchPmid();
  }, []);

  const filteredItems = item.filter((item) =>
  item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
);

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowPmProjectDetails(true);
  };

  const handleCloseDetails = () => {
    setShowPmProjectDetails(false);
  };

  const navigateForm = (projectId, projectName) => {
    navigate("/PmRequestForm", { state: { projectId, projectName } });
  };
 
  

  return (
    <div className="parent-admin">
      <div style={{ height: "100vh", overflow: "scroll initial" }}>
        <PmSidebar />
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
            ></input>
            <i class="users icon"></i>
          </div>
          <ToastContainer />
        </div>
        {isLoading ? (
          <div>
            <LoadingPage />
          </div>
        ) : (
          <div style={{ marginLeft: "20px", marginRight: "30px" }}>
            <table class="ui celled table">
              <thead>
                <tr>
                  <th>Project-Name</th>
                  <th>Project-Description</th>
                  <th className="text-center">View</th>
                  <th>Add User</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems && filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <>
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
                        <td>
                          <Button
                          data-testid="add-user"
                            color="blue"
                            icon
                            labelPosition="left"
                            onClick={() =>
                              navigateForm(item.projectId, item.projectName)
                            }
                          >
                            <Icon name="plus" />
                            Add
                          </Button>
                        </td>
                      </>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {showPmProjectDetails && (
          <PmProjectDetails
            project={selectedProject}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
};
export default PmDashboard;
