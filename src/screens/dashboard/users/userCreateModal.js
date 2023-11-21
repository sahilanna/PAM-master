import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../redux/reduxStore/actions/action";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "semantic-ui-react";
import CloseButton from "../../../atoms/closeButton/closeButton";

function UserCreate() {
  let navigate = useNavigate();
  const dispatchUser = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const enumRole = 3;

  const [clicked, setClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true);
    if (name.length === 0 || email.length === 0) {
      return;
    }

    dispatchUser(createUser({ name, email, enumRole }));
    navigate("/userRead");
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal size="mini" open={true} onClose={onClose} className="form-modal">
      <CloseButton onClick={onClose} />
      <Modal.Header>Add User</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label data-testid="User">
              {" "}
              User Name
              <span className="red-text">*</span>
            </label>
            <input
              data-testid="User-Input"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
            />
            {clicked && name.length <= 0 ? (
              <label className="error-message"> Name can't be Empty</label>
            ) : (
              ""
            )}
          </Form.Field>
          <Form.Field>
            <label data-testid="Email">
              User Email-ID
              <span className="red-text">*</span>
            </label>
            <input
              data-testid="Email-ID"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
            />
            {clicked && email.length <= 0 ? (
              <label className="error-message"> Email can't be Empty</label>
            ) : (
              ""
            )}
          </Form.Field>

          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
export default UserCreate;
