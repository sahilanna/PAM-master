import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CSVLink } from "react-csv";
import Pagination from "../../../../utils/pagination";
import LoadingPage from "../../../../atoms/loadingPage/loadingPage";
import CustomSidebar from "../../sidebar/sidebar";
import AdminHeader from "./adminHeader";
import useApiData from "../pmRequests/interval";
import logger from "../../../../utils/logger.js";
import api from "../../../../network/api";
import { NGROK_URL } from "../../../../network/config";
import "semantic-ui-css/semantic.min.css";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const { requestData, Loading } = useApiData();
  const [isLoading, setIsLoading] =
    useState(false);
  const [item, setItem] = useState([]);
  const [currentPageData, setCurrentPageData] =
    useState([]);
  const [searchQuery, setSearchQuery] =
    useState("");
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;

  logger.info(
    "This is my requestData:",
    requestData
  );
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `https://${NGROK_URL}/request/allActive`
      );
      setIsLoading(false);
      logger.info("Response Data:", response);
    } catch (error) {
      setIsLoading(true);
      logger.error(
        "Error fetching Response data:",
        error
      );
    }
  };

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `https://${NGROK_URL}/projects/countPeople`,
        {}
      );
      setItem(response.data);
      logger.info("Count of People:", response);
    } catch (error) {
      setIsLoading(true);
      logger.error(
        "Error fetching Count:",
        error
      );
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
    const indexOfLastItem =
      pageNumber * ITEMS_PER_PAGE;
    const indexOfFirstItem =
      indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentPageData(currentItems);
    logger.info("Pagination Function Called");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterItems(e.target.value);
    logger.info("Search Function Called");
  };

  const handleFilterItems = (searchQuery) => {
    setCurrentPageData(
      filteredItems.slice(0, ITEMS_PER_PAGE)
    );
  };
  const filteredItems = item.filter((item) =>
    item.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const csvDataProj = item.map((entry) => ({
    "Project ID": entry.projectId,
    "Project Name": entry.projectName,
  }));

  return (
    <div className="parent-admin">
      <div className="custom-sidebar">
        <CustomSidebar />
      </div>
      <div className="admin-child">
        <AdminHeader />
        <div className="dashboard-button">
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
                <CSVLink
                  data={csvDataProj}
                  filename="projects_data.csv"
                >
                  <button
                    data-testid="csv-link"
                    className="ui button"
                  >
                    Download CSV
                  </button>
                </CSVLink>
                <ToastContainer />
              </div>
            }
          </div>
        </div>
        <div className="admin-table">
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
                  {currentPageData.length ===
                  0 ? (
                    <tr>
                      <td colSpan="5">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    currentPageData.map(
                      (item, index) => (
                        <tr
                          key={item.projectName}
                        >
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            <a
                              href={`/ProjectDetails/${item.projectId}/${item.projectName}`}
                            >
                              {item.projectName}
                            </a>
                          </td>
                          <td>
                            {item.countPeople}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>

              <div className="admin-pagination">
                <Pagination
                  data={filteredItems}
                  itemsPerPage={ITEMS_PER_PAGE}
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
