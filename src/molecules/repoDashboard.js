import React, { useState, useEffect } from "react";
import { ngrokUrl } from "../network/config";
import LoadingPage from "../atoms/LoadingPage/loadingPage";
import api from "../network/api";
import RepoTable from "../atoms/repoTable";
import logger from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js';

function RepoDashboard({ role, SidebarComponent }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let data = sessionStorage.getItem("item");
  const user = data ? JSON.parse(data) : null; // Check if userData is null
  const id = user ? user.id : null; // Check if user is null

  const fetchRepo = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `https://${ngrokUrl}/users/${id}/role/${role}/projects`
      );
      const data = response.data;
      setResult(data);
      setFilteredResult(data);
      setIsLoading(false);
    } catch (error) {
      logger.error(`Error fetching ${role} projects:`, error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchRepo();
  }, [id, role]);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = result.filter((item) =>
      item.repositories.some((repo) =>
        repo.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredResult(filtered);
  };

  return (
    <div className="parent-admin">
      <div style={{ height: "100vh", overflow: "scroll initial" }}>
        <SidebarComponent />
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
          <div className="ui left icon input">
            <input
              type="text"
              data-testid="filtered-data"
              placeholder="Search Projects..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <i className="users icon"></i>
          </div>
        </div>
        <div style={{ marginLeft: "20px", marginRight: "30px" }}>
          {isLoading ? <LoadingPage /> : <RepoTable data={filteredResult} />}
        </div>
      </div>
    </div>
  );
}

export default RepoDashboard;
