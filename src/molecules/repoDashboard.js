import React, { useState, useEffect } from "react";
import { NGROK_URL } from "../network/config";
import LoadingPage from "../atoms/loadingPage/loadingPage";
import api from "../network/api";
import RepoTable from "../atoms/repoTable";
import logger from "../utils/logger.js";

function RepoDashboard({ role, SidebarComponent }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let data = sessionStorage.getItem("item");
  const user = data ? JSON.parse(data) : null;
  const id = user ? user.id : null;

  const fetchRepo = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`https://${NGROK_URL}/users/${id}/role/${role}/projects`);
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
      item.repositories.some((repo) => repo.name.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredResult(filtered);
  };

  return (
    <div className="user-read-screen">
      <div>
        <SidebarComponent />
      </div>
      <div className="user-child">
        <div className="user-read">
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
        <div>{isLoading ? <LoadingPage /> : <RepoTable data={filteredResult} />}</div>
      </div>
    </div>
  );
}

export default RepoDashboard;
