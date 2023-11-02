import React from "react";
import { Form, Button, Dropdown, Modal } from "semantic-ui-react";
import "../../Create/Create.css";

function CommonProjectDetailsUI({
  isOpen,
  onClose,
  isValidUrl,
  proj,
  selectedProject,
  url,
  handleProjChange,
  handleUrlChange,
  handleSubmit,
  label,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{ width: "500px" }}
      className="create-Project-Modal"
    >
      <div style={{ paddingLeft: "820px", paddingTop: "5px" }}></div>
      <div style={{ paddingLeft: "442px" }}>
        <Button data-testid="X" secondary onClick={onClose}>
          X
        </Button>
      </div>
      <Modal.Header>{label}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ textAlign: "left" }}>
              Projects<span style={{ color: "red" }}>*</span>
            </label>
            <Dropdown
              data-testid="projects"
              placeholder="Select Project"
              fluid
              selection
              options={proj}
              onChange={handleProjChange}
              value={selectedProject}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: "left" }}>
              {label === "Add Project" ? "Drive Link" : "Figma URL"}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              data-testid="URL"
              type="text"
              placeholder={`Enter ${
                label === "Add Project" ? "Drive Link" : "Figma URL"
              }`}
              value={url}
              onChange={handleUrlChange}
              className={!isValidUrl ? "error" : ""}
            />
            {!isValidUrl && (
              <p className="error-message">{`Invalid ${
                label === "Add Project" ? "Drive URL" : "Figma URL"
              }`}</p>
            )}
          </Form.Field>
          <Button data-testid="submit" type="submit" disabled={!isValidUrl}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default CommonProjectDetailsUI;
