import React from "react";
import {
  Form,
  Dropdown,
  Modal,
  Button,
} from "semantic-ui-react";
import CloseButton from "../../../../../atoms/closeButton/closeButton";
import "./addUserModal.css";

function AddUserModal({
  selectedRepo,
  options,
  username,
  handleUserNameChange,
  handleSubmitUser,
  onClose,
}) {
  return (
    <Modal
      size="mini"
      open={true}
      onClose={onClose}
      className="create-user-modal"
    >
      <CloseButton onClick={onClose} />

      <Modal.Header>Add User</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmitUser}>
          <Form.Field>
            <label
              style={{ textAlign: "left" }}
              data-testid="repoNameLabel"
            >
              Repository Name
            </label>
            <input
              data-testid="repoNameInput"
              name="repoName"
              value={selectedRepo || ""}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: "left" }}>
              User Username
              <span style={{ color: "red" }}>
                *
              </span>
            </label>
            <Dropdown
              data-testid="dropdown"
              placeholder="Select Username"
              fluid
              selection
              options={options.map(
                (name, index) => ({
                  key: index,
                  text: name.name,
                  value: name.name,
                })
              )}
              value={username}
              onChange={handleUserNameChange}
            />
          </Form.Field>
          <Button
            data-testid="submit"
            type="submit"
            primary
          >
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddUserModal;
