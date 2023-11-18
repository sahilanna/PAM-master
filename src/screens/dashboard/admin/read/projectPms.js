import React from "react";
import ProjectList from "./projectList";

function ProjectPms({
  open,
  onClose,
  projectId,
  projectName,
}) {
  return (
    <ProjectList
      projectId={projectId}
      projectName={projectName}
      type="pms"
    />
  );
}

export default ProjectPms;
