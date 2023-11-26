import React from "react";
import AdminSidebar from "../../sidebar/adminSidebar/adminSidebar";
import LoadingPage from "../../../../atoms/loadingPage/loadingPage";
import Pagination from "../../../../utils/pagination";
import DialogBox from "../../dialogBox/dialogBox";
import UserDetails from "../userDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./userRead.css";

const UserReadTable = ({
  isLoading,
  filteredProjects,
  currentPageData,
  handleViewDetails,
  viewActivity,
  deleteUser,
  showConfirmDialog,
  setShowConfirmDialog,
  handlePaginate,
  itemsPerPage,
  searchQuery,
  handleSearchChange,
  addUserName,
  createOnclick,
  showProjectDetails,
  selectedProject,
  handleCloseDetails,
}) => (
  <div className="user-read-screen">
    <div>
      <AdminSidebar />
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
          <table className="ui celled table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th className="text-center">View</th>
                <th className="text-center">Activity</th>
                <th className="text-center">Delete</th>
              </tr>
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
        <Pagination data={filteredProjects} itemsPerPage={itemsPerPage} paginate={handlePaginate} />
      </div>
      {showProjectDetails && <UserDetails project={selectedProject} onClose={handleCloseDetails} />}
    </div>
  </div>
);

export default UserReadTable;
