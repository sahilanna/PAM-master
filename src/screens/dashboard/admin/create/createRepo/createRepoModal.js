import React from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseButton from "../../../../../atoms/closeButton/closeButton";


function CreateRepoUI({
  name,
  description,
  handleChange,
  handleSubmit,
  clicked,
  onClose,
}) {
  return (
    <>
      <ToastContainer />
      <Modal size="mini" open={true} onClose={onClose} className="form-modal">
        <CloseButton onClick={onClose} />
        <Modal.Header>Create New Repository</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>
                Name<span className="red-text">*</span>
              </label>
              <input
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Name"
                data-testid="name-input"
              />
              {clicked && name.length <= 0 ? (
                <label className="error-message">
                  Repo name can't be Empty
                </label>
              ) : (
                ""
              )}
             
            </Form.Field>
            <Form.Field>
              <label>
                Description<span className="red-text">*</span>
              </label>
              <input
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
                data-testid="description-input"
              />
              {clicked && description.length <= 0 ? (
                <label className="error-message">
                  Repo description can't be Empty
                </label>
              ) : (
                ""
              )}
             
            </Form.Field>
            <Button
              data-testid="submit-button"
              type="submit"
              primary
              disabled={!name || !description}
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default CreateRepoUI;
