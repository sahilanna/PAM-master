// ProjectUsers.js
import React from "react";
import ProjectList from "../projectList";

function ProjectUsers({ open, onClose, projectId, projectName }) {
  return <ProjectList projectId={projectId} projectName={projectName} type="user" />;
}

export default ProjectUsers;
