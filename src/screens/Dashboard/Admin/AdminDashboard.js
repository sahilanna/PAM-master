import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Pagination from "../Pagination/Pagination";
import LoadingPage from "../../../atoms/loadingPage";
import { CSVLink } from "react-csv";
import CustomSidebar from "../SideBar/SideBar";
import { ngrokUrl } from "../../../network/config";
import "./AdminDashboard.css";
import api from "../../../network/api";
import AdminHeader from "./adminHeader";
import useApiData from "./PmRequests/interval";
import logger from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js";

const AdminDashboard = () => {
  const { requestData, Loading } = useApiData();
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const itemsPerPage = 5;

  logger.info('This is my requestData',requestData);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`https://${ngrokUrl}/request/allActive`);
      logger.info("Response Data:", response);
      setIsLoading(false);
    } catch (error) {
      logger.error("Error fetching Data:", error);
      setIsLoading(true);
    }
  };

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `https://${ngrokUrl}/projects/countPeople`,
        {}
      );
      setItem(response.data);
    } catch (error) {
      logger.error("Error fetching Count:", error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    loadItems();
    fetchData();
  }, []);
  useEffect(() => {
    handlePaginate(1);
  }, [item]);
  logger.info(Loading);
  const createOnclick = () => {
    navigate("/CreateProject");
  };
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
    setCurrentPageData(filteredItems.slice(0, itemsPerPage));
  };
  const filteredItems = item.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const csvDataProj = item.map((entry) => ({
    "Project ID": entry.projectId,
    "Project Name": entry.projectName,
  }));

  return (
    <div className="parent-admin">
      <div style={{ height: "100vh", overflow: "scroll initial" }}>
        <CustomSidebar />
      </div>
      <div className="admin-child">
        <AdminHeader />
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
              placeholder="Search Project..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="users icon"></i>
          </div>
          <div className="button-container">
            {
              <div>
                <button
                  className="ui button"
                  data-testid="create"
                  onClick={createOnclick}
                >
                  Create Project
                </button>
                <CSVLink data={csvDataProj} filename="projects_data.csv">
                  <button data-testid="csv-link" className="ui button">
                    Download CSV
                  </button>
                </CSVLink>
                <ToastContainer />
              </div>
            }
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
                    <th>Project-Name</th>
                    <th>Count of employees</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.length === 0 ? (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  ) : (
                    currentPageData.map((item, index) => (
                      <tr key={item.projectName}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <a
                            href={`/ProjectDetails/${item.projectId}/${item.projectName}`}
                            className="project-name-link"
                          >
                            {item.projectName}
                          </a>
                        </td>
                        <td>{item.countPeople}</td>
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
                  data={filteredItems}
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
};
export default AdminDashboard;
