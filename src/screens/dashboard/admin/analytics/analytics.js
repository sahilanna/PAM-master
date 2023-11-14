import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { Button } from "semantic-ui-react";
import { CSVLink } from "react-csv";
import { NGROK_URL } from "../../../../network/config";
import Sidebar from "../../sidebar/sidebar";
import LoadingPage from "../../../../atoms/loadingPage/loadingPage";
import logger from "../../../../utils/logger.js";
import api from "../../../../network/api";
import "./analytics.css";

function Analytics() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const csvLinkRef = useRef(null);
  const COLORS = ["#FFBB28", "#FF8042", "#0088FE"];

  const fetchCount = async () => {
    try {
      const [adminResponse, pmResponse, userResponse] = await Promise.all([
        api.get(`https://${NGROK_URL}/users/count/admin`),
        api.get(`https://${NGROK_URL}/users/count/project_manager`),
        api.get(`https://${NGROK_URL}/users/count/user`),
      ]);
      setIsLoading(false);
      const adminCount = adminResponse.data;
      const pmCount = pmResponse.data;
      const userCount = userResponse.data;
      setData([
        { name: "Admins", count: adminCount },
        { name: "Users", count: userCount },
        { name: "Project Managers", count: pmCount },
      ]);
      logger.info("Successfuly got data from count api's");
    } catch (error) {
      logger.error("Error catching in count api's", error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchCount();
  }, []);

  const handleNextClick = () => {
    navigate("/projectAnalytics");
  };

  const handleDownloadCSV = () => {
    const csvData = data.map((entry) => ({
      Name: entry.name,
      Count: entry.count,
    }));
    setCSVData(csvData);
    csvLinkRef.current.link.click();
  };

  return (
    <div className="project-analytics">
      <Sidebar />
      <div className="main-content">
        <div className="analytics-components">
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <h2>Count of Admin, PMs, and Users</h2>
              <PieChart width={300} height={300}>
                <Pie
                  dataKey="count"
                  data={data}
                  cx={150}
                  cy={150}
                  outerRadius={80}
                  fill="#8884D8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              
              <div>
                <Button data-testid="next" primary onClick={handleNextClick}>
                  Next
                </Button>
                <Button
                  data-testid="download-csv"
                  secondary
                  onClick={handleDownloadCSV}
                >
                  Download CSV
                </Button>
                <CSVLink
                  data={csvData}
                  filename={"chart_data.csv"}
                  ref={csvLinkRef}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Analytics;
