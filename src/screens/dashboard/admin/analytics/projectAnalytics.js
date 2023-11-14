import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "../../sidebar/sidebar";
import logger from "../../../../utils/logger.js";
import { NGROK_URL } from "../../../../network/config";
import api from "../../../../network/api";

const ProjectAnalytics = () => {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState(0);
  const [inactiveProjects, setInactiveProjects] = useState(0);
  const [error, setError] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const csvLinkRef = useRef(null);

  const fetchData = async () => {
    try {
      const activeResponse = await api.get(
        `https://${NGROK_URL}/projects/count/active`
      );

      const inactiveResponse = await api.get(
        `https://${NGROK_URL}/projects/count/inactive`
      );

      setActiveProjects(activeResponse.data);
      setInactiveProjects(inactiveResponse.data);
      logger.info("Active and Inactive Projects Fetched Successfully");
    } catch (error) {
      logger.error("Error fetching active and inactive project data", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  const data = [
    { status: "Active", ActiveProjects: activeProjects },
    { status: "Inactive", InactiveProjects: inactiveProjects },
  ];
  logger.info(csvData);

  const handleBackClick = () => {
    navigate("/Analytics");
  };

  const handleDownloadCSV = () => {
    const csvData = data.map((entry) => ({
      Status: entry.status,
      Projects: entry.ActiveProjects || entry.InactiveProjects,
    }));
    setCSVData(csvData);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((e) => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    csvLinkRef.current.href = encodedUri;
    csvLinkRef.current.target = "_blank";
    csvLinkRef.current.download = "project_status_data.csv";
    csvLinkRef.current.click();
  };

  return (
    <div className="project-analytics">
      <Sidebar />
      <div className="main-content">
        <div className="analytics-components">
          <div style={{ textAlign: "center" }}>
            <h1> Project Status </h1>

            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ActiveProjects" fill="#8884d8" />
              <Bar dataKey="InactiveProjects" fill="#82ca9d" />
            </BarChart>

            <Button data-testid="back" primary onClick={handleBackClick}>
              Back
            </Button>
            <Button
              data-testid="download-csv"
              secondary
              onClick={handleDownloadCSV}
            >
              Download CSV
            </Button>
            <a href="#" ref={csvLinkRef} style={{ display: "none" }}>
              Download CSV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
