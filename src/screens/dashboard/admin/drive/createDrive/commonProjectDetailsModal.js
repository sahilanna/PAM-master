import React from "react";
import {
  Form,
  Button,
  Dropdown,
  Modal,
} from "semantic-ui-react";
import CloseButton from "../../../../../atoms/closeButton/closeButton";

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
      size="mini"
      open={isOpen}
      onClose={onClose}
      className="form-modal"
    >
      <CloseButton onClick={onClose} />

      <Modal.Header>{label}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              Projects
              <span className="red-text">*</span>
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
            <label>
              {label === "Add Project"
                ? "Drive Link"
                : "Figma URL"}
              <span className="red-text">*</span>
            </label>
            <input
              data-testid="URL"
              type="text"
              placeholder={`Enter ${
                label === "Add Project"
                  ? "Drive Link"
                  : "Figma URL"
              }`}
              value={url}
              onChange={handleUrlChange}
            />
            {!isValidUrl && (
              <p className="error-message">{`Invalid ${
                label === "Add Project"
                  ? "Drive URL"
                  : "Figma URL"
              }`}</p>
            )}
          </Form.Field>
          <Button
            data-testid="submit"
            type="submit"
            disabled={!isValidUrl}
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default CommonProjectDetailsUI;
