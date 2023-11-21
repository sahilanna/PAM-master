import React, { useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { createPM } from "../../../redux/reduxStore/actions/action";
import { useDispatch } from "react-redux";
import CloseButton from "../../../atoms/closeButton/closeButton";

function PmCreate() {
  let navigate = useNavigate();
  const dispatchPM = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const enumRole = 2;
  const [clicked, setClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true);
    if (name.length === 0 || email.length === 0) {
      return;
    }
    dispatchPM(createPM({ name, email, enumRole }));
    navigate("/pmReadNew");
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal size="mini" open={true} onClose={onClose} className="form-modal">
      <CloseButton onClick={onClose} />

      <Modal.Header>Add PM</Modal.Header>

      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label data-testid="PM">
              Project-Manager Name
              <span className="red-text">*</span>
            </label>
            <input
              data-testid="PMI"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="PM Name"
            />
            {clicked && name.length <= 0 ? (
              <label className="error-message"> Name can't be Empty</label>
            ) : (
              ""
            )}
          </Form.Field>
          <Form.Field>
            <label data-testid="Email-ID" className="red-text">
              Email-ID
              <span className="red-text">*</span>
            </label>
            <input
              data-testid="EMI"
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

          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default PmCreate;
