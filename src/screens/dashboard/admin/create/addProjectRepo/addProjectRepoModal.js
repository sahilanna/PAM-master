import React from "react";
import { Modal, Button, Form, Dropdown } from "semantic-ui-react";
import CloseButton from "../../../../../atoms/closeButton/closeButton";
import "../addPmGit/addPm.css";

const AddProjectRepoModal = ({
  onSubmit,
  onClose,
  projItem,
  temp,
  handleProjectChange,
  handleRepoChange,
}) => {
  return (
    <Modal size="mini" open={true} onClose={onClose} className="form-modal">
      <CloseButton onClick={onClose} />

      <Modal.Header>Add Project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>
              Project-Name
              <span className="red-text">*</span>
            </label>
            <Dropdown
              data-testid="project-dropdown"
              placeholder="Select project"
              fluid
              selection
              options={projItem}
              onChange={handleProjectChange}
            />
          </Form.Field>
          <Form.Field>
            <label>
              REPO
              <span className="red-text">*</span>
            </label>
            <Dropdown
              data-testid="repo-dropdown"
              placeholder="Select Repo"
              fluid
              selection
              options={temp}
              onChange={handleRepoChange}
            />
          </Form.Field>
          <Button data-testid="submit" type="submit" primary>
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AddProjectRepoModal;
