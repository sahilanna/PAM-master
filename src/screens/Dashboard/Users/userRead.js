import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import DialogBox from "../DialogBox/DialogBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import UserDetails from "./UserDetails";
import Sidebar from "../SideBar/SideBar";
import LoadingPage from "../../../atoms/loadingPage";
import api from "../../../network/api";
import { ngrokUrl } from "../../../network/config";
import "./Read.css";
import logger from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js';
function UserRead() {
  const navigate = useNavigate();
  const getUrl = `https://${ngrokUrl}/users/role/user`;
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
    loaditem();
  }, []);

  logger.info(currentPageData);

  const addUserName = () => {
    navigate("/addUserName");
  };

const loaditem = async() => {
  setIsLoading(true);
    try {
      
      const result = await api.get(getUrl)
      setIsLoading(true);
        setItem(result.data);
        
        setFilteredProjects(result.data);
        setIsLoading(false);
        navigate("/userRead");
     
    } catch (error) {
      logger.error('Error', error);
      setIsLoading(true);
    }
  }
  
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
    navigate("/userActivity", { state: { id, username } });
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
    const currentItems = filteredProjects.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentPageData(currentItems);
  };
  const deleteUser = async (id) => {
    try{
    await api.delete(`https://${ngrokUrl}/users/delete/${id}`);
    navigate("/userRead");
    setShowConfirmDialog(false);
    loaditem();
    navigate("/userRead");
    }
    catch(error){
      logger.error(error);
    }
  };

  return (
    <div className="parent-admin">
      <div>
        <Sidebar />
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
              placeholder="Search user..."
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
              Create User
            </button>
          </div>
        </div>
        <div style={{ marginLeft: "20px", marginRight: "30px" }}>
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
        {showProjectDetails && (
          <UserDetails project={selectedProject} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
}
export default UserRead;
