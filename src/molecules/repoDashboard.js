import React, { useState, useEffect } from "react";
import { ngrokUrl } from "../network/config";
import LoadingPage from "../atoms/loadingPage";
import api from "../network/api";
import RepoTable from "../atoms/repoTable";

function RepoDashboard({ role, SidebarComponent }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let data = sessionStorage.getItem("item");
  const user = data ? JSON.parse(data) : null; 
  const id = user ? user.id : null; 
  console.log(data);
  useEffect(() => {
    if (id) {
      const fetchRepo = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(
            `https://${ngrokUrl}/users/${id}/role/${role}/projects`
          );
          const data = response.data;
          setResult(data);
          console.log("bggcasvuvulcvdsa", data);
          setFilteredResult(data);
          setIsLoading(false);
        } catch (error) {
          console.log(`Error fetching ${role} projects:`, error);
          setIsLoading(true);
        }
      };
      fetchRepo();
    } else {
      console.log("error");
    }
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
    console.log("ceck", filteredResult);
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
          {console.log("hwwww", isLoading)}
          {console.log("cxxxxxxxxeck", filteredResult)}
          {isLoading ? <LoadingPage /> : <RepoTable data={filteredResult} />}
          {console.log("cxxxxssssssxxxxeck", filteredResult)}
        </div>
      </div>
    </div>
  );
}

export default RepoDashboard;
