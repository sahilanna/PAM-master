import React, { useState, useEffect } from "react";
import { ngrokUrl } from "../../../network/config";
import api from "../../../network/api";
import { Grid, Placeholder, Segment } from "semantic-ui-react";
import "./AdminDashboard.css";
import document from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/document.gif";
import user from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/user.gif";
import presentation from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/presentation.gif";
import logger from "/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js";

function AdminHeader() {
  const [users, setUsers] = useState("");
  const [pms, setPms] = useState("");
  const [projects, setProjects] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`https://${ngrokUrl}/users/count/user`);
        setUsers(response.data);
      } catch (error) {
        logger.error("Error fetching PMID:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPms = async () => {
      try {
        const response = await api.get(
          `https://${ngrokUrl}/users/count/project_manager`
        );
        setPms(response.data);
      } catch (error) {
        logger.error("Error fetching PMID:", error);
      }
    };
    fetchPms();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(
          `https://${ngrokUrl}/projects/count/active`
        );
        setProjects(response.data);
      } catch (error) {
        logger.error("Error fetching PMID:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Grid columns={3} stackable>
      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <img
                src={document}
                alt="Icon"
                style={{ width: "40px", height: "40px" }}
              />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line
                length="medium"
                style={{ color: "blue", fontWeight: "bold" }}
              />
              <span style={{ color: "blue", fontWeight: "bold" }}>
                Projects
              </span>
              <Placeholder.Line length="short" style={{ color: "blue" }} />
              <span
                style={{ color: "blue", fontSize: "24px", fontWeight: "bold" }}
              >
                {projects}
              </span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <img
                src={user}
                alt="Icon"
                style={{ width: "50px", height: "40px" }}
              />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line
                length="medium"
                style={{ color: "green", fontWeight: "bold" }}
              />
              <span style={{ color: "green", fontWeight: "bold" }}>Users</span>
              <Placeholder.Line length="short" style={{ color: "green" }} />
              <span
                style={{ color: "green", fontSize: "24px", fontWeight: "bold" }}
              >
                {users}
              </span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <img
                src={presentation}
                alt="Icon"
                style={{ width: "50px", height: "40px" }}
              />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <span style={{ color: "orange", fontWeight: "bold" }}>
                Project Managers
              </span>

              <Placeholder.Line style={{ color: "orange" }} />
              <span
                style={{
                  color: "orange",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {pms}
              </span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default AdminHeader;
