import React from "react";
import {
  Form,
  Button,
  Modal,
} from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import LoadingPage from "../../../../../atoms/loadingPage/loadingPage";
import CloseButton from "../../../../../atoms/closeButton/closeButton";
import "../addPmGit/addPm.css";

function CreateProjectModal({
  loading,
  success,
  error,
  onClose,
  projectName,
  projectDescription,
  handleSubmit,
  setProjectName,
  setProjectDescription,
}) {
  return (
    <>
      <ToastContainer />

      <Modal
        size="mini"
        open={true}
        onClose={onClose}
        className="form-modal"
      >
        {loading && <LoadingPage />}
        {success && (
          <div>Project created successfully!</div>
        )}
        {error && (
          <div>Error: {error.message}</div>
        )}

        <CloseButton onClick={onClose} />

        <Modal.Header>
          Create Project
        </Modal.Header>
        <Modal.Content>
          <Form
            data-testid="submit"
            onSubmit={handleSubmit}
          >
            <Form.Field>
              <label>
                Project-Name
                <span className="red-text">
                  *
                </span>
              </label>
              <input
                data-testid="PName"
                name="name"
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
                placeholder="Name"
              />
            </Form.Field>
            <Form.Field>
              <label>
                Project Description
                <span className="red-text">
                  *
                </span>
              </label>
              <input
                data-testid="PDesc"
                name="description"
                value={projectDescription}
                onChange={(e) =>
                  setProjectDescription(
                    e.target.value
                  )
                }
                placeholder="description"
              />
            </Form.Field>
            <Button
              data-testid="submit1"
              type="submit"
              primary
              disabled={
                !projectName ||
                !projectDescription
              }
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
}

export default CreateProjectModal;
