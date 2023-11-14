import React, { useState, useEffect } from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";
import { NGROK_URL } from "../../../../network/config";
import api from "../../../../network/api";
import project from "../../../../assets/project.gif";
import user from "../../../../assets/user.gif";
import manager from "../../../../assets/manager.gif";
import logger from "../../../../utils/logger.js";
import "./adminDashboard.css";

function AdminHeader() {
  const [users, setUsers] = useState("");
  const [pms, setPms] = useState("");
  const [projects, setProjects] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`https://${NGROK_URL}/users/count/user`);
        setUsers(response.data);
        logger.info("Count user api is succesfully fetching  data");
      } catch (error) {
        logger.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPms = async () => {
      try {
        const response = await api.get(
          `https://${NGROK_URL}/users/count/project_manager`
        );
        setPms(response.data);
        logger.info("Count pm api is succesfully fetching  data");
      } catch (error) {
        logger.error("Error fetching PM:", error);
      }
    };
    fetchPms();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(
          `https://${NGROK_URL}/projects/count/active`
        );
        setProjects(response.data);
        logger.info("Count project api is succesfully fetching  data");
      } catch (error) {
        logger.error("Error fetching Projects:", error);
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
              <img className="project-image" src={project} alt="Icon" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line className="project-tile" length="medium" />
              <span className="project-tile">Projects</span>
              <Placeholder.Line length="short" />
              <span className="project-count">{projects}</span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <img className="user-image" src={user} alt="Icon" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line className="user-tile" length="medium" />
              <span className="user-tile">Users</span>
              <Placeholder.Line length="short" />
              <span className="user-count">{users}</span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <div>
            <Placeholder.Header>
              <img className="user-image" src={manager} alt="Icon" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <span className="manager-tile">Project Managers</span>

              <Placeholder.Line />
              <span className="manager-count">{pms}</span>
            </Placeholder.Paragraph>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default AdminHeader;
